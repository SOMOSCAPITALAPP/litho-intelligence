import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const requiredTables = [
  "profiles",
  "subscriptions",
  "usage_limits",
  "favorites",
  "recommendation_history",
  "native_stones",
  "stones",
  "products",
  "ai_cache",
  "ai_usage_logs",
  "events",
  "leads"
];

const tableChecks: Record<string, string> = {
  profiles: "id",
  subscriptions: "id",
  usage_limits: "id",
  favorites: "id",
  recommendation_history: "id",
  native_stones: "slug",
  stones: "id",
  products: "id",
  ai_cache: "id",
  ai_usage_logs: "id",
  events: "id",
  leads: "id"
};

export async function GET() {
  const supabase = createSupabaseAdminClient();
  const tableStatus: Record<string, boolean> = {};

  if (supabase) {
    await Promise.all(
      requiredTables.map(async (table) => {
        const { error } = await supabase.from(table).select(tableChecks[table] ?? "*").limit(1);
        tableStatus[table] = !error;
      })
    );
  }

  return NextResponse.json({
    ok: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.SUPABASE_SERVICE_ROLE_KEY &&
        process.env.OPENAI_API_KEY &&
        process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_PREMIUM_PRICE_ID &&
        process.env.STRIPE_WEBHOOK_SECRET
    ),
    services: {
      supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      supabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      openai: Boolean(process.env.OPENAI_API_KEY),
      stripe: Boolean(getStripe() && process.env.STRIPE_PREMIUM_PRICE_ID),
      stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      appUrl: Boolean(process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL)
    },
    tables: tableStatus,
    requiredTables
  });
}
