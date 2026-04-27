import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { ConsultationProfile, ConsultationResponse } from "@/lib/consultation";

export const CONSULTATION_DURATION_MINUTES = 30;
export const CONSULTATION_WARNING_MINUTES = 25;
export const CONSULTATION_INACTIVITY_MINUTES = 10;
export const CONSULTATION_MAX_USER_MESSAGES = 20;
export const CONSULTATION_MIN_MESSAGE_INTERVAL_SECONDS = 5;
export const CONSULTATION_MAX_MESSAGE_CHARACTERS = 1000;
export const CONSULTATION_MAX_TOKEN_ESTIMATE = 40000;

export type ConsultationSessionRecord = {
  id: string;
  user_id: string;
  stripe_checkout_session_id: string;
  is_test: boolean;
  status: "active" | "warning" | "completed" | "expired" | "cancelled";
  started_at: string;
  warning_at: string;
  expires_at: string;
  ended_at: string | null;
  last_activity_at: string;
  user_message_count: number;
  assistant_message_count: number;
  token_estimate: number;
  summary_json: Record<string, unknown>;
  profile_json: Record<string, unknown>;
  latest_question: string | null;
  created_at: string;
  updated_at: string;
};

export type ConsultationWindow = {
  closed: boolean;
  closingReason?: "expired" | "inactive" | "message_limit" | "token_limit";
  warningDue: boolean;
  remainingMinutes: number;
  secondsUntilNextMessage: number;
  messagesRemaining: number;
};

function admin() {
  return createSupabaseAdminClient();
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

export async function getOrCreateConsultationSession({
  userId,
  sessionKey,
  testMode,
  profile
}: {
  userId: string;
  sessionKey: string;
  testMode: boolean;
  profile?: ConsultationProfile;
}) {
  const supabase = admin();
  if (!supabase) return null;

  const { data: existing } = await supabase
    .from("consultation_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("stripe_checkout_session_id", sessionKey)
    .maybeSingle();

  if (existing) {
    return existing as ConsultationSessionRecord;
  }

  const now = new Date();
  const payload = {
    user_id: userId,
    stripe_checkout_session_id: sessionKey,
    is_test: testMode,
    status: "active",
    started_at: now.toISOString(),
    warning_at: addMinutes(now, CONSULTATION_WARNING_MINUTES).toISOString(),
    expires_at: addMinutes(now, CONSULTATION_DURATION_MINUTES).toISOString(),
    last_activity_at: now.toISOString(),
    profile_json: profile ?? {}
  };

  const { data } = await supabase.from("consultation_sessions").insert(payload).select("*").single();
  return (data ?? null) as ConsultationSessionRecord | null;
}

export function getConsultationWindow(session: ConsultationSessionRecord, now = new Date()): ConsultationWindow {
  const expiresAt = new Date(session.expires_at);
  const warningAt = new Date(session.warning_at);
  const lastActivityAt = new Date(session.last_activity_at);
  const messageCount = Number(session.user_message_count ?? 0);
  const tokenEstimate = Number(session.token_estimate ?? 0);
  const remainingMinutes = Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / 60_000));
  const secondsUntilNextMessage = Math.max(
    0,
    Math.ceil((CONSULTATION_MIN_MESSAGE_INTERVAL_SECONDS * 1000 - (now.getTime() - lastActivityAt.getTime())) / 1000)
  );

  if (session.status === "completed" || session.status === "expired" || session.status === "cancelled") {
    return {
      closed: true,
      closingReason: session.status === "completed" ? "message_limit" : "expired",
      warningDue: false,
      remainingMinutes,
      secondsUntilNextMessage,
      messagesRemaining: Math.max(0, CONSULTATION_MAX_USER_MESSAGES - messageCount)
    };
  }

  if (now.getTime() >= expiresAt.getTime()) {
    return {
      closed: true,
      closingReason: "expired",
      warningDue: false,
      remainingMinutes: 0,
      secondsUntilNextMessage,
      messagesRemaining: Math.max(0, CONSULTATION_MAX_USER_MESSAGES - messageCount)
    };
  }

  if (now.getTime() - lastActivityAt.getTime() >= CONSULTATION_INACTIVITY_MINUTES * 60_000) {
    return {
      closed: true,
      closingReason: "inactive",
      warningDue: false,
      remainingMinutes,
      secondsUntilNextMessage,
      messagesRemaining: Math.max(0, CONSULTATION_MAX_USER_MESSAGES - messageCount)
    };
  }

  if (messageCount >= CONSULTATION_MAX_USER_MESSAGES) {
    return {
      closed: true,
      closingReason: "message_limit",
      warningDue: false,
      remainingMinutes,
      secondsUntilNextMessage,
      messagesRemaining: 0
    };
  }

  if (tokenEstimate >= CONSULTATION_MAX_TOKEN_ESTIMATE) {
    return {
      closed: true,
      closingReason: "token_limit",
      warningDue: false,
      remainingMinutes,
      secondsUntilNextMessage,
      messagesRemaining: Math.max(0, CONSULTATION_MAX_USER_MESSAGES - messageCount)
    };
  }

  return {
    closed: false,
    warningDue: now.getTime() >= warningAt.getTime() || remainingMinutes <= 5,
    remainingMinutes,
    secondsUntilNextMessage,
    messagesRemaining: Math.max(0, CONSULTATION_MAX_USER_MESSAGES - messageCount)
  };
}

export async function updateConsultationSessionAfterTurn({
  session,
  profile,
  question,
  consultation,
  tokenDelta,
  assistantMessages,
  closed
}: {
  session: ConsultationSessionRecord;
  profile: ConsultationProfile;
  question: string;
  consultation: ConsultationResponse;
  tokenDelta: number;
  assistantMessages: number;
  closed: boolean;
}) {
  const supabase = admin();
  if (!supabase) return null;

  const now = new Date().toISOString();
  const nextUserMessages = Number(session.user_message_count ?? 0) + 1;
  const nextAssistantMessages = Number(session.assistant_message_count ?? 0) + assistantMessages;
  const nextTokens = Number(session.token_estimate ?? 0) + tokenDelta;
  const nextStatus =
    closed || nextUserMessages >= CONSULTATION_MAX_USER_MESSAGES || nextTokens >= CONSULTATION_MAX_TOKEN_ESTIMATE
      ? "completed"
      : getConsultationWindow(
            {
              ...session,
              user_message_count: nextUserMessages,
              token_estimate: nextTokens,
              last_activity_at: now
            } as ConsultationSessionRecord,
            new Date(now)
          ).warningDue
        ? "warning"
        : "active";

  const { data } = await supabase
    .from("consultation_sessions")
    .update({
      status: nextStatus,
      ended_at: nextStatus === "completed" ? now : null,
      last_activity_at: now,
      user_message_count: nextUserMessages,
      assistant_message_count: nextAssistantMessages,
      token_estimate: nextTokens,
      summary_json: consultation,
      profile_json: profile,
      latest_question: question
    })
    .eq("id", session.id)
    .select("*")
    .single();

  return (data ?? null) as ConsultationSessionRecord | null;
}

export async function expireConsultationSession(
  session: ConsultationSessionRecord,
  reason: "expired" | "inactive" | "cancelled" = "expired"
) {
  const supabase = admin();
  if (!supabase) return null;

  const now = new Date().toISOString();
  const { data } = await supabase
    .from("consultation_sessions")
    .update({
      status: reason === "cancelled" ? "cancelled" : "expired",
      ended_at: now,
      last_activity_at: now
    })
    .eq("id", session.id)
    .select("*")
    .single();

  return (data ?? null) as ConsultationSessionRecord | null;
}

export function estimateConsultationTokens(parts: Array<string | undefined | null>) {
  const totalCharacters = parts.reduce((count, part) => count + (part?.length ?? 0), 0);
  return Math.max(250, Math.ceil(totalCharacters / 4));
}

export function buildConsultationClosingMessage(reason: ConsultationWindow["closingReason"]) {
  switch (reason) {
    case "inactive":
      return "Notre échange s’est arrêté après une longue pause. La consultation est maintenant clôturée, mais votre synthèse reste disponible en dessous ainsi qu’en PDF.";
    case "message_limit":
      return "Nous arrivons au terme de cette consultation. Je vous laisse relire la synthèse complète ci-dessous et conserver votre PDF pour revenir à l’essentiel.";
    case "token_limit":
      return "Nous avons atteint la limite prévue pour garder cette consultation claire et maîtrisée. La synthèse complète reste disponible juste en dessous, avec le PDF associé.";
    case "expired":
    default:
      return "Notre créneau de 30 minutes est maintenant terminé. La synthèse complète reste disponible ci-dessous, ainsi qu’un PDF élégant à conserver.";
  }
}

export function buildConsultationWarningMessage(remainingMinutes: number) {
  if (remainingMinutes <= 1) {
    return "Nous arrivons au tout dernier moment de la consultation. Allons à l’essentiel pour vous laisser une synthèse vraiment utile.";
  }

  return `Il nous reste environ ${remainingMinutes} minutes. Je vais vous aider à aller droit à l’essentiel, et la synthèse complète restera visible juste en dessous.`;
}
