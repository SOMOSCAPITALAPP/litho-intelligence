import { trackEventToNeon } from "@/lib/neon-store";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function trackEvent(eventName: string, payload: Record<string, unknown> = {}, userId?: string | null) {
  const neonResult = await trackEventToNeon({ eventName, payload, userId });
  if (neonResult.ok && !neonResult.skipped) return;

  const supabase = createSupabaseAdminClient();
  if (!supabase) return;
  await supabase.from("events").insert({
    user_id: userId ?? null,
    event_name: eventName,
    payload
  });
}
