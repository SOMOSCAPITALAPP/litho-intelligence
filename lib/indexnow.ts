import { getCanonicalSeoUrlStrings } from "@/lib/seoUrls";
import { siteUrl } from "@/lib/site";

const indexNowEndpoint = "https://api.indexnow.org/IndexNow";

function getHost() {
  return new URL(siteUrl).host;
}

export function getIndexNowKey() {
  return (process.env.INDEXNOW_KEY ?? "").trim();
}

export function getIndexNowKeyLocation() {
  return `${siteUrl.replace(/\/$/, "")}/indexnow-key.txt`;
}

export function isIndexNowConfigured() {
  return Boolean(getIndexNowKey());
}

export function getIndexNowSubmitSecret() {
  return (process.env.SEO_SUBMIT_SECRET ?? process.env.INDEXNOW_SUBMIT_SECRET ?? "").trim();
}

export function isAuthorizedIndexNowRequest(request: Request) {
  const configuredSecret = getIndexNowSubmitSecret();

  if (!configuredSecret) {
    return process.env.NODE_ENV !== "production" || process.env.INDEXNOW_ALLOW_PUBLIC_SUBMIT === "true";
  }

  const authorization = request.headers.get("authorization") ?? "";
  const bearer = authorization.startsWith("Bearer ") ? authorization.slice("Bearer ".length).trim() : "";
  const headerSecret = request.headers.get("x-seo-submit-secret")?.trim() ?? "";
  const urlSecret = new URL(request.url).searchParams.get("secret")?.trim() ?? "";

  return [bearer, headerSecret, urlSecret].includes(configuredSecret);
}

export function normalizeIndexNowUrls(urls: string[] | undefined) {
  const host = getHost();
  const candidates = urls?.length ? urls : getCanonicalSeoUrlStrings();

  return Array.from(
    new Set(
      candidates
        .map((url) => {
          try {
            return new URL(url, siteUrl).toString();
          } catch {
            return "";
          }
        })
        .filter((url) => {
          if (!url) return false;
          const parsed = new URL(url);
          return parsed.host === host && parsed.protocol === "https:";
        })
    )
  );
}

export async function submitUrlsToIndexNow(urls: string[]) {
  const key = getIndexNowKey();
  if (!key) {
    return { ok: false, status: 400, submitted: 0, error: "INDEXNOW_KEY_MISSING" };
  }

  const urlList = normalizeIndexNowUrls(urls).slice(0, 10000);
  if (!urlList.length) {
    return { ok: false, status: 400, submitted: 0, error: "NO_VALID_URLS" };
  }

  const response = await fetch(indexNowEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: getHost(),
      key,
      keyLocation: getIndexNowKeyLocation(),
      urlList
    })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return {
      ok: false,
      status: response.status,
      submitted: 0,
      error: text || `INDEXNOW_HTTP_${response.status}`
    };
  }

  return { ok: true, status: response.status, submitted: urlList.length };
}
