import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getConsultationAdvice } from "@/lib/consultation";

export async function POST(request: Request) {
  const stripe = getStripe();
  const supabase = createSupabaseServerClient();

  if (!stripe || !supabase) {
    return NextResponse.json({ error: "La consultation n'est pas disponible pour le moment." }, { status: 500 });
  }

  const body = await request.json();
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const question = typeof body.question === "string" ? body.question : "";

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté pour utiliser la consultation." }, { status: 401 });
  }

  if (!sessionId || !question.trim()) {
    return NextResponse.json({ error: "Question incomplète." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const userId = session.metadata?.user_id;
  const kind = session.metadata?.kind;

  if (session.payment_status !== "paid" || userId !== user.id || kind !== "consultation") {
    return NextResponse.json({ error: "Cette consultation n'est pas accessible." }, { status: 403 });
  }

  const advice = await getConsultationAdvice(question);
  return NextResponse.json(advice);
}
