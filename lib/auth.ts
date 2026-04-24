import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MembershipPlan } from "@/lib/plans";

export type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  plan: MembershipPlan;
  stripe_customer_id: string | null;
  newsletter_opt_in?: boolean | null;
};

export async function getCurrentUser() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { user: null, profile: null };

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  return { user, profile: profile as UserProfile | null };
}

export async function requireUser() {
  const { user, profile } = await getCurrentUser();
  if (!user) redirect("/login");
  return { user, profile };
}

export function isPremium(profile?: UserProfile | null) {
  return profile?.plan === "premium" || profile?.plan === "elite";
}
