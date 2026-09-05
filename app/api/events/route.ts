import { NextResponse } from "next/server";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const allowedEventPattern = /^[a-z0-9_:-]{2,80}$/i;

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  const limit = checkRateLimit({
    key: `events:ip:${ip}`,
    limit: 90,
    windowMs: 10 * 60 * 1000
  });

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const eventName = String(body.eventName ?? "").trim();
  const payload = typeof body.payload === "object" && body.payload ? body.payload : {};

  if (!allowedEventPattern.test(eventName)) {
    return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("events").insert({
    event_name: eventName.slice(0, 80),
    payload: {
      ...payload,
      captured_at: new Date().toISOString()
    }
  });

  if (error) {
    return NextResponse.json({ ok: true, stored: false, degraded: true }, { status: 202 });
  }

  return NextResponse.json({ ok: true, stored: true });
}

