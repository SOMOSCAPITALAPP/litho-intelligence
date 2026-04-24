import { NextResponse } from "next/server";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

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

  const { data: existing } = await admin.from("profiles").select("id").eq("id", user.id).maybeSingle();
  const profilePayload = {
    email: user.email,
    full_name: body.fullName ?? user.user_metadata?.full_name ?? null,
    newsletter_opt_in: Boolean(body.newsletterOptIn ?? user.user_metadata?.newsletter_opt_in ?? false)
  };

  if (existing) {
    await admin.from("profiles").update(profilePayload).eq("id", user.id);
  } else {
    await admin.from("profiles").insert({
      id: user.id,
      ...profilePayload,
      plan: "free"
    });
  }

  return NextResponse.json({ ok: true, mode: "supabase" });
}
