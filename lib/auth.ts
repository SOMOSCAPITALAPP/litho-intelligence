import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/profile";
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
  const existingProfile = profile as UserProfile | null;
  const metadataName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name.trim() : "";

  if (!existingProfile || (!existingProfile.full_name?.trim() && metadataName)) {
    return { user, profile: await ensureProfile(user) };
  }

  return { user, profile: existingProfile };
}

export async function requireUser() {
  const { user, profile } = await getCurrentUser();
  if (!user) redirect("/login");
  return { user, profile };
}

export function isPremium(profile?: UserProfile | null) {
  return profile?.plan === "premium" || profile?.plan === "elite";
}
