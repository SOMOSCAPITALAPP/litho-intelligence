import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getConsultationExperience } from "@/lib/consultation";
import {
  CONSULTATION_MAX_MESSAGE_CHARACTERS,
  buildConsultationClosingMessage,
  buildConsultationWarningMessage,
  estimateConsultationTokens,
  expireConsultationSession,
  getConsultationWindow,
  getOrCreateConsultationSession,
  updateConsultationSessionAfterTurn
} from "@/lib/consultation-session";
import { trackEvent } from "@/lib/analytics";

type ConsultationApiResponse = {
  chatMessages: string[];
  consultation: Record<string, unknown>;
  closed: boolean;
  session: {
    id: string;
    remainingMinutes: number;
    messagesRemaining: number;
    reportUrl: string;
  };
};

function buildSessionPayload(
  sessionId: string,
  remainingMinutes: number,
  messagesRemaining: number
): ConsultationApiResponse["session"] {
  return {
    id: sessionId,
    remainingMinutes,
    messagesRemaining,
    reportUrl: `/api/consultation/report/${sessionId}`
  };
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: "La consultation n'est pas disponible pour le moment." }, { status: 500 });
  }

  const body = await request.json();
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const question = typeof body.question === "string" ? body.question : "";
  const testMode = Boolean(body.testMode);
  const profile = typeof body.profile === "object" && body.profile ? body.profile : {};
  const history = Array.isArray(body.history) ? body.history : [];

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté pour utiliser la consultation." }, { status: 401 });
  }

  if (!question.trim()) {
    return NextResponse.json({ error: "Question incomplète." }, { status: 400 });
  }

  if (question.trim().length > CONSULTATION_MAX_MESSAGE_CHARACTERS) {
    return NextResponse.json(
      {
        error: `Merci de garder chaque message sous ${CONSULTATION_MAX_MESSAGE_CHARACTERS} caractères pour préserver une consultation claire et fluide.`
      },
      { status: 400 }
    );
  }

  const sessionKey = testMode ? `test:${user.id}` : sessionId;
  if (!sessionKey) {
    return NextResponse.json({ error: "Session de consultation manquante." }, { status: 400 });
  }

  if (!testMode) {
    if (!stripe) {
      return NextResponse.json({ error: "Le paiement consultation n'est pas encore configuré." }, { status: 500 });
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    const ownerId = checkoutSession.metadata?.user_id;
    const kind = checkoutSession.metadata?.kind;

    if (checkoutSession.payment_status !== "paid" || ownerId !== user.id || kind !== "consultation") {
      return NextResponse.json({ error: "Cette consultation n'est pas accessible." }, { status: 403 });
    }
  }

  const consultationSession = await getOrCreateConsultationSession({
    userId: user.id,
    sessionKey,
    testMode,
    profile
  });

  if (!consultationSession) {
    return NextResponse.json({ error: "Impossible d’ouvrir votre consultation." }, { status: 500 });
  }

  const windowState = getConsultationWindow(consultationSession);
  if (windowState.closed) {
    await expireConsultationSession(consultationSession, windowState.closingReason === "inactive" ? "expired" : "expired");
    const consultation = (consultationSession.summary_json ?? {}) as Record<string, unknown>;
    return NextResponse.json({
      chatMessages: [buildConsultationClosingMessage(windowState.closingReason)],
      consultation,
      closed: true,
      session: buildSessionPayload(consultationSession.id, 0, 0)
    });
  }

  if (windowState.secondsUntilNextMessage > 0) {
    return NextResponse.json(
      {
        error: `Merci de laisser un petit espace entre vos messages. Vous pourrez écrire à nouveau dans ${windowState.secondsUntilNextMessage} seconde${windowState.secondsUntilNextMessage > 1 ? "s" : ""}.`
      },
      { status: 429 }
    );
  }

  const advice = await getConsultationExperience(question, profile, history);
  const chatMessages = [advice.chatMessage];
  if (windowState.warningDue) {
    chatMessages.push(buildConsultationWarningMessage(windowState.remainingMinutes));
  }

  const tokenDelta = estimateConsultationTokens([
    question,
    JSON.stringify(history),
    advice.chatMessage,
    advice.consultation.answer,
    JSON.stringify(advice.consultation.insights)
  ]);

  const updatedSession = await updateConsultationSessionAfterTurn({
    session: consultationSession,
    profile,
    question,
    consultation: advice.consultation,
    tokenDelta,
    assistantMessages: chatMessages.length,
    closed: false
  });

  const nextWindow = updatedSession ? getConsultationWindow(updatedSession) : windowState;
  await trackEvent("consultation_message", { testMode }, user.id);

  return NextResponse.json({
    chatMessages,
    consultation: advice.consultation,
    closed: nextWindow.closed,
    session: buildSessionPayload(updatedSession?.id ?? consultationSession.id, nextWindow.remainingMinutes, nextWindow.messagesRemaining)
  } satisfies ConsultationApiResponse);
}
