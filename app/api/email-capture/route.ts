import { NextResponse } from "next/server";
import { syncLeadToBrevo } from "@/lib/brevo";
import { saveLeadToNeon, trackEventToNeon } from "@/lib/neon-store";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";
import { syncLeadToSysteme } from "@/lib/systeme";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const guideDownloadUrl = "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf";

function withTimeout<T>(promise: PromiseLike<T>, milliseconds = 4500): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("DATABASE_TIMEOUT")), milliseconds);
    Promise.resolve(promise)
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeout));
  });
}

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
  const consent = body.consent === true;

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

  const brevoResult = await syncLeadToBrevo({
    email,
    fullName,
    source,
    consent,
    metadata
  });
  const systemeResult = await syncLeadToSysteme({
    email,
    fullName,
    source,
    consent,
    metadata
  });
  const leadMetadata = {
    ...metadata,
    latest_source: source,
    marketing_consent: consent,
    brevo_sync: brevoResult,
    systeme_sync: systemeResult,
    captured_at: new Date().toISOString()
  };

  const neonResult = await saveLeadToNeon({
    email,
    fullName,
    source,
    consent,
    metadata: leadMetadata
  });

  if (neonResult.ok && !neonResult.skipped) {
    await trackEventToNeon({
      eventName: "lead_capture",
      payload: {
        email,
        fullName: fullName || null,
        source,
        metadata,
        brevo: brevoResult,
        systeme: systemeResult,
        database: "neon"
      }
    });

    return NextResponse.json({
      ok: true,
      stored: true,
      database: "neon",
      neon: neonResult,
      brevo: brevoResult,
      systeme: systemeResult,
      downloadUrl: guideDownloadUrl
    });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({
      ok: true,
      stored: false,
      degraded: !neonResult.ok,
      neon: neonResult,
      brevo: brevoResult,
      systeme: systemeResult,
      downloadUrl: guideDownloadUrl
    });
  }

  const leadPayload = {
    email,
    full_name: fullName || null,
    source,
    consent,
    metadata: leadMetadata,
    updated_at: new Date().toISOString()
  };

  try {
    const { error } = await withTimeout<{ error: { message: string } | null }>(
      supabase.from("leads").upsert(leadPayload, { onConflict: "email" })
    );

    if (error) {
      const fallback = await withTimeout<{ error: { message: string } | null }>(
        supabase.from("leads").upsert(
          {
            email,
            source,
            consent
          },
          { onConflict: "email" }
        )
      );

      if (fallback.error) {
        await withTimeout(
          supabase.from("events").insert({
            event_name: "lead_capture_failed",
            payload: {
              email,
              fullName: fullName || null,
              source,
              metadata,
              neon: neonResult,
              brevo: brevoResult,
              systeme: systemeResult,
              enriched_error: error.message,
              fallback_error: fallback.error.message
            }
          })
        ).catch(() => null);

        return NextResponse.json(
          {
            ok: true,
            stored: false,
            degraded: true,
            neon: neonResult,
            brevo: brevoResult,
            systeme: systemeResult,
            downloadUrl: guideDownloadUrl
          },
          { status: 202 }
        );
      }

      await withTimeout(
        supabase.from("events").insert({
          event_name: "lead_capture",
          payload: {
            email,
            fullName: fullName || null,
            source,
            metadata,
            neon: neonResult,
            brevo: brevoResult,
            systeme: systemeResult,
            fallback: true
          }
        })
      ).catch(() => null);

      return NextResponse.json({
        ok: true,
        stored: true,
        database: "supabase",
        neon: neonResult,
        brevo: brevoResult,
        systeme: systemeResult,
        fallback: true,
        downloadUrl: guideDownloadUrl
      });
    }

    await withTimeout(
      supabase.from("events").insert({
        event_name: "lead_capture",
        payload: {
          email,
          fullName: fullName || null,
          source,
          metadata,
          neon: neonResult,
          brevo: brevoResult,
          systeme: systemeResult
        }
      })
    ).catch(() => null);

    return NextResponse.json({
      ok: true,
      stored: true,
      database: "supabase",
      neon: neonResult,
      brevo: brevoResult,
      systeme: systemeResult,
      downloadUrl: guideDownloadUrl
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: true,
        stored: false,
        degraded: true,
        neon: neonResult,
        supabase: { ok: false, error: error instanceof Error ? error.message : "Supabase timeout" },
        brevo: brevoResult,
        systeme: systemeResult,
        downloadUrl: guideDownloadUrl
      },
      { status: 202 }
    );
  }
}
