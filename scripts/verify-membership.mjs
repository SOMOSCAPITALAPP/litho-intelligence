import fs from "node:fs";

const requiredFiles = [
  "app/login/page.tsx",
  "app/register/page.tsx",
  "app/account/page.tsx",
  "app/dashboard/page.tsx",
  "app/pricing/page.tsx",
  "app/api/stripe/create-checkout-session/route.ts",
  "app/api/stripe/create-portal-session/route.ts",
  "app/api/stripe/webhook/route.ts",
  "components/PremiumGate.tsx",
  "lib/stoneRules.ts",
  "lib/openai-recommendation.ts",
  "lib/usage.ts",
  "lib/analytics.ts",
  "supabase/migrations/20260424190000_membership.sql",
  "supabase/migrations/20260424213000_ai_hybrid_engine.sql"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(file));
if (missing.length) {
  throw new Error(`Missing membership files: ${missing.join(", ")}`);
}

const migration = fs.readFileSync("supabase/migrations/20260424190000_membership.sql", "utf8");
for (const table of ["profiles", "subscriptions", "usage_limits", "favorites", "recommendation_history", "downloads", "events"]) {
  if (!migration.includes(`public.${table}`)) {
    throw new Error(`Missing table in migration: ${table}`);
  }
}

const aiMigration = fs.readFileSync("supabase/migrations/20260424213000_ai_hybrid_engine.sql", "utf8");
for (const table of ["ai_cache", "ai_usage_logs"]) {
  if (!aiMigration.includes(`public.${table}`)) {
    throw new Error(`Missing AI table in migration: ${table}`);
  }
}

const env = fs.readFileSync(".env.example", "utf8");
for (const key of ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "STRIPE_PREMIUM_PRICE_ID", "MAX_DAILY_AI_CALLS"]) {
  if (!env.includes(`${key}=`)) {
    throw new Error(`Missing env key: ${key}`);
  }
}

console.log("membership static checks OK");
