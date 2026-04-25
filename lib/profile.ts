import type { User } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/auth";

export async function ensureProfile(user: User, overrides: Partial<UserProfile> = {}) {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data: existing } = await admin.from("profiles").select("*").eq("id", user.id).maybeSingle();

  const payload = {
    id: user.id,
    email: user.email ?? null,
    full_name: overrides.full_name ?? user.user_metadata?.full_name ?? null,
    plan: overrides.plan ?? existing?.plan ?? "free",
    stripe_customer_id: overrides.stripe_customer_id ?? existing?.stripe_customer_id ?? null,
    newsletter_opt_in:
      overrides.newsletter_opt_in ?? existing?.newsletter_opt_in ?? Boolean(user.user_metadata?.newsletter_opt_in ?? false)
  };

  const { data, error } = await admin
    .from("profiles")
    .upsert(payload, { onConflict: "id", ignoreDuplicates: false })
    .select("*")
    .single();

  if (error) return null;
  return data as UserProfile;
}
