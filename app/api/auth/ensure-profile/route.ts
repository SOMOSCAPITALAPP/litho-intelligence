import { NextResponse } from "next/server";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/profile";

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  const admin = createSupabaseAdminClient();

  if (!supabase || !admin) {
    return NextResponse.json({ ok: true, mode: "local" });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  await ensureProfile(user, {
    full_name: body.fullName ?? user.user_metadata?.full_name ?? null,
    newsletter_opt_in: Boolean(body.newsletterOptIn ?? user.user_metadata?.newsletter_opt_in ?? false)
  });

  return NextResponse.json({ ok: true, mode: "supabase" });
}
