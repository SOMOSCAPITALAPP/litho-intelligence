import { redirect } from "next/navigation";
import { auth as getNextAuthSession } from "@/auth";
import { isNextAuthProvider } from "@/lib/auth-provider";
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
  if (isNextAuthProvider()) {
    const session = await getNextAuthSession();
    const sessionUser = session?.user as { id?: string; email?: string | null; name?: string | null; plan?: MembershipPlan } | undefined;

    if (!sessionUser?.id || !sessionUser.email) return { user: null, profile: null };

    return {
      user: {
        id: sessionUser.id,
        email: sessionUser.email,
        user_metadata: {
          full_name: sessionUser.name ?? ""
        }
      },
      profile: {
        id: sessionUser.id,
        email: sessionUser.email,
        full_name: sessionUser.name ?? null,
        plan: sessionUser.plan ?? "free",
        stripe_customer_id: null,
        newsletter_opt_in: null
      } satisfies UserProfile
    };
  }

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
