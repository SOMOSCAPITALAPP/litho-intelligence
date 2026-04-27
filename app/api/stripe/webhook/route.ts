import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { trackEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  const stripe = getStripe();
  const supabase = createSupabaseAdminClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !supabase || !webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (userId && session.customer && session.metadata?.plan === "premium") {
        await supabase.from("profiles").update({ plan: "premium", stripe_customer_id: String(session.customer) }).eq("id", userId);
        await trackEvent("subscription_activated", { sessionId: session.id }, userId);
      }
      if (userId && session.metadata?.kind === "consultation") {
        await trackEvent("consultation_checkout_completed", { sessionId: session.id }, userId);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "invoice.payment_succeeded":
    case "invoice.payment_failed":
    case "customer.subscription.deleted": {
      const object = event.data.object as any;
      const subscriptionId = object.object === "subscription" ? object.id : object.subscription;
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await upsertSubscription(subscription);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function upsertSubscription(subscription: Stripe.Subscription) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  const userId = subscription.metadata.user_id;
  if (!userId) return;

  const active = ["active", "trialing"].includes(subscription.status);
  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: String(subscription.customer),
      plan: "premium",
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end
    },
    { onConflict: "stripe_subscription_id" }
  );

  await supabase
    .from("profiles")
    .update({ plan: active ? "premium" : "free", stripe_customer_id: String(subscription.customer) })
    .eq("id", userId);
}
