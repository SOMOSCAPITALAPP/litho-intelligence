import { NextResponse } from "next/server";
import { isAuthorizedIndexNowRequest, normalizeIndexNowUrls, submitUrlsToIndexNow } from "@/lib/indexnow";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type IndexNowBody = {
  urls?: unknown;
};

function parseUrls(body: IndexNowBody) {
  if (!Array.isArray(body.urls)) return undefined;
  return body.urls.filter((url): url is string => typeof url === "string");
}

async function storeIndexNowEvent(payload: Record<string, unknown>) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  await supabase.from("events").insert({
    event_name: "seo_indexnow_submitted",
    payload: {
      ...payload,
      captured_at: new Date().toISOString()
    }
  });
}

export async function POST(request: Request) {
  if (!isAuthorizedIndexNowRequest(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as IndexNowBody;
  const urls = normalizeIndexNowUrls(parseUrls(body));
  const result = await submitUrlsToIndexNow(urls);

  await storeIndexNowEvent({
    status: result.status,
    submitted: result.submitted,
    ok: result.ok
  });

  return NextResponse.json(result, { status: result.ok ? 200 : result.status || 500 });
}
