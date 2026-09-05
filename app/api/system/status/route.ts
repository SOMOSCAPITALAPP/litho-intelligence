import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { getAuthProvider } from "@/lib/auth-provider";
import { isNeonConfigured } from "@/lib/neon";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { isIndexNowConfigured } from "@/lib/indexnow";
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
  const { user } = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = createSupabaseAdminClient();
  const tableStatus: Record<string, boolean> = {};
  const tableErrors: Record<string, string> = {};

  if (supabase) {
    await Promise.all(
      requiredTables.map(async (table) => {
        const { error } = await supabase.from(table).select(tableChecks[table] ?? "*").limit(1);
        tableStatus[table] = !error;
        if (error) tableErrors[table] = error.message;
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
      neon: isNeonConfigured(),
      authProvider: getAuthProvider(),
      openai: Boolean(process.env.OPENAI_API_KEY),
      stripe: Boolean(getStripe() && process.env.STRIPE_PREMIUM_PRICE_ID),
      stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
      appUrl: Boolean(process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL),
      indexNow: isIndexNowConfigured(),
      seoSubmitSecret: Boolean(process.env.SEO_SUBMIT_SECRET ?? process.env.INDEXNOW_SUBMIT_SECRET)
    },
    tables: tableStatus,
    tableErrors,
    requiredTables
  });
}
