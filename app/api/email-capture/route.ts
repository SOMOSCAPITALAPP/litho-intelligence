import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "unknown").trim().slice(0, 120) || "unknown";
  const fullName = String(body.fullName ?? body.name ?? "").trim().slice(0, 160);
  const metadata = typeof body.metadata === "object" && body.metadata ? body.metadata : {};

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

  const leadPayload = {
    email,
    full_name: fullName || null,
    source,
    consent: true,
    metadata: {
      ...metadata,
      latest_source: source,
      captured_at: new Date().toISOString()
    },
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase.from("leads").upsert(leadPayload, { onConflict: "email" });

  if (error && (error.message.includes("full_name") || error.message.includes("metadata") || error.message.includes("updated_at"))) {
    const fallback = await supabase.from("leads").upsert(
      {
        email,
        source,
        consent: true
      },
      { onConflict: "email" }
    );

    if (fallback.error) {
      return NextResponse.json({ error: "Supabase insert failed" }, { status: 500 });
    }

    await supabase.from("events").insert({
      event_name: "lead_capture",
      payload: {
        email,
        fullName: fullName || null,
        source,
        metadata,
        fallback: true
      }
    });

    return NextResponse.json({
      ok: true,
      stored: true,
      fallback: true,
      downloadUrl: "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf"
    });
  }

  if (error) {
    return NextResponse.json({ error: "Supabase insert failed" }, { status: 500 });
  }

  await supabase.from("events").insert({
    event_name: "lead_capture",
    payload: {
      email,
      fullName: fullName || null,
      source,
      metadata
    }
  });

  return NextResponse.json({
    ok: true,
    stored: true,
    downloadUrl: "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf"
  });
}
