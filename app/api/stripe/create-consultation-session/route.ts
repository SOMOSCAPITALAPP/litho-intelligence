import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/profile";

export async function POST() {
  const stripe = getStripe();
  const supabase = createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const priceId = process.env.STRIPE_CONSULTATION_PRICE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!stripe || !supabase || !admin || !priceId || !appUrl) {
    return NextResponse.json({ error: "La consultation n'est pas encore configurée côté paiement." }, { status: 500 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await ensureProfile(user);
  let customerId = profile?.stripe_customer_id as string | undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      metadata: { user_id: user.id }
    });
    customerId = customer.id;
    await admin.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/consultation?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/consultation?payment=cancelled`,
    metadata: { user_id: user.id, kind: "consultation" }
  });

  return NextResponse.json({ url: session.url });
}
