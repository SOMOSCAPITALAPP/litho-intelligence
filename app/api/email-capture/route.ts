import { NextResponse } from "next/server";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  const ipLimit = checkRateLimit({
    key: `email-capture:ip:${ip}`,
    limit: 12,
    windowMs: 10 * 60 * 1000
  });

  if (!ipLimit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "unknown").trim().slice(0, 120) || "unknown";
  const fullName = String(body.fullName ?? body.name ?? "").trim().slice(0, 160);
  const metadata = typeof body.metadata === "object" && body.metadata ? body.metadata : {};
  const consent = typeof body.consent === "boolean" ? body.consent : true;

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const emailLimit = checkRateLimit({
    key: `email-capture:email:${email}`,
    limit: 5,
    windowMs: 60 * 60 * 1000
  });

  if (!emailLimit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
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
    consent,
    metadata: {
      ...metadata,
      latest_source: source,
      captured_at: new Date().toISOString()
    },
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase.from("leads").upsert(leadPayload, { onConflict: "email" });

  if (error) {
    const fallback = await supabase.from("leads").upsert(
      {
        email,
        source,
        consent
      },
      { onConflict: "email" }
    );

    if (fallback.error) {
      await supabase.from("events").insert({
        event_name: "lead_capture_failed",
        payload: {
          email,
          fullName: fullName || null,
          source,
          metadata,
          enriched_error: error.message,
          fallback_error: fallback.error.message
        }
      });

      return NextResponse.json(
        {
          ok: true,
          stored: false,
          degraded: true,
          downloadUrl: "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf"
        },
        { status: 202 }
      );
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
