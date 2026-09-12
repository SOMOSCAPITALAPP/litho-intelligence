import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadLocalEnvFile(fileName) {
  const path = resolve(process.cwd(), fileName);
  if (!existsSync(path)) return;

  const content = readFileSync(path, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const name = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    if (!name || process.env[name] !== undefined) continue;

    process.env[name] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

loadLocalEnvFile(".env");
loadLocalEnvFile(".env.local");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://litho-intelligence.com";
const key = process.env.INDEXNOW_KEY;
const explicitUrls = process.argv.slice(2);

if (!key) {
  console.error("INDEXNOW_KEY est manquant.");
  process.exit(1);
}

function absoluteUrl(value) {
  return new URL(value, siteUrl).toString();
}

async function getUrlsFromSitemap() {
  const response = await fetch(`${siteUrl.replace(/\/$/, "")}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Impossible de lire le sitemap: HTTP ${response.status}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

const urls = explicitUrls.length ? explicitUrls.map(absoluteUrl) : await getUrlsFromSitemap();
const uniqueUrls = [...new Set(urls)].filter((url) => new URL(url).host === new URL(siteUrl).host);

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl.replace(/\/$/, "")}/indexnow-key.txt`,
    urlList: uniqueUrls.slice(0, 10000)
  })
});

if (!response.ok) {
  console.error(`IndexNow a refusé la soumission: HTTP ${response.status}`);
  console.error(await response.text().catch(() => ""));
  process.exit(1);
}

console.log(`IndexNow: ${uniqueUrls.length} URL(s) soumise(s).`);
