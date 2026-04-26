import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "unknown");

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      stored: false,
      downloadUrl: "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf"
    });
  }

  const { error } = await supabase.from("leads").upsert(
    {
      email,
      source,
      consent: true
    },
    { onConflict: "email" }
  );

  if (error) {
    return NextResponse.json({ error: "Supabase insert failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    stored: true,
    downloadUrl: "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf"
  });
}
