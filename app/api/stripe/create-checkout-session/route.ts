import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { trackEvent } from "@/lib/analytics";

export async function POST() {
  const stripe = getStripe();
  const supabase = createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!stripe || !supabase || !admin || !priceId || !appUrl) {
    return NextResponse.json({ error: "Billing is not configured" }, { status: 500 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await admin.from("profiles").select("*").eq("id", user.id).maybeSingle();
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
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    metadata: { user_id: user.id, plan: "premium" },
    subscription_data: {
      metadata: { user_id: user.id, plan: "premium" }
    }
  });

  await trackEvent("checkout_started", { priceId }, user.id);
  return NextResponse.json({ url: session.url });
}
