import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/profile";

export async function POST() {
  const stripe = getStripe();
  const supabase = createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!stripe || !supabase || !admin || !appUrl) {
    return NextResponse.json({ error: "Billing is not configured" }, { status: 500 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ensuredProfile = await ensureProfile(user);
  const { data: profile } = ensuredProfile
    ? { data: ensuredProfile }
    : await admin.from("profiles").select("stripe_customer_id").eq("id", user.id).maybeSingle();
  if (!profile?.stripe_customer_id) return NextResponse.json({ error: "No Stripe customer" }, { status: 400 });

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${appUrl}/account`
  });

  return NextResponse.json({ url: session.url });
}
