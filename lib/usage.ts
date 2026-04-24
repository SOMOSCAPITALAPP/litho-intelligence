import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { MembershipPlan } from "@/lib/plans";
import { plans } from "@/lib/plans";

export type UsageFeature = "recommendations" | "combinations" | "favorites";

export async function checkUsageLimit(userId: string, plan: MembershipPlan, feature: UsageFeature) {
  if (plan === "premium" || plan === "elite") {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { allowed: true, remaining: plans.free.recommendationLimit, limit: plans.free.recommendationLimit };

  if (feature === "favorites") {
    const { count } = await supabase.from("favorites").select("*", { count: "exact", head: true }).eq("user_id", userId);
    const used = count ?? 0;
    return { allowed: used < plans.free.favoriteLimit, remaining: Math.max(0, plans.free.favoriteLimit - used), limit: plans.free.favoriteLimit };
  }

  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from("usage_limits")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  const field = feature === "recommendations" ? "recommendations_count" : "combinations_count";
  const limit = feature === "recommendations" ? plans.free.recommendationLimit : plans.free.combinationLimit;
  const used = data?.[field] ?? 0;
  return { allowed: used < limit, remaining: Math.max(0, limit - used), limit };
}

export async function incrementUsage(userId: string, feature: Exclude<UsageFeature, "favorites">) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;
  const today = new Date().toISOString().slice(0, 10);
  await supabase.rpc("increment_usage_limit", {
    p_user_id: userId,
    p_date: today,
    p_feature: feature
  });
}
