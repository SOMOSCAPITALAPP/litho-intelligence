import type { User } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/auth";

export async function ensureProfile(user: User, overrides: Partial<UserProfile> = {}) {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data: existing } = await admin.from("profiles").select("*").eq("id", user.id).maybeSingle();
  const overrideName = typeof overrides.full_name === "string" ? overrides.full_name.trim() : overrides.full_name;
  const metadataName =
    typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name.trim() : user.user_metadata?.full_name;

  const payload = {
    id: user.id,
    email: user.email ?? null,
    full_name: overrideName || existing?.full_name || metadataName || null,
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
