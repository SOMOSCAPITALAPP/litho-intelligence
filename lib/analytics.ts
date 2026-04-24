import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function trackEvent(eventName: string, payload: Record<string, unknown> = {}, userId?: string | null) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;
  await supabase.from("events").insert({
    user_id: userId ?? null,
    event_name: eventName,
    payload
  });
}
