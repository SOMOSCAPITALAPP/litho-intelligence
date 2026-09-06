import type { MetadataRoute } from "next";
import { intentionPages } from "@/data/intentions";
import { editorialGuides } from "@/lib/editorialGuides";
import { journalArticles } from "@/lib/journalArticles";
import { nativeStones } from "@/lib/nativeStones";
import { siteUrl } from "@/lib/site";
import { stones } from "@/lib/stones";

const baseUrl = siteUrl.replace(/\/$/, "");

const staticRoutes = [
  "",
  "/test",
  "/recommendation",
  "/pierres",
  "/intentions",
  "/formation",
  "/idee-cadeau",
  "/boutique-pierres-naturelles",
  "/pierre-de-naissance",
  "/lithotherapie",
  "/guides",
  "/entretien",
  "/comparatifs",
  "/conseils-lithotherapie"
];

export function getCanonicalSeoUrls(now = new Date()): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...editorialGuides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.82
    })),
    ...journalArticles.map((article) => ({
      url: `${baseUrl}/conseils-lithotherapie/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.84
    })),
    ...intentionPages.map((page) => ({
      url: `${baseUrl}/intentions/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85
    })),
    ...Array.from(new Set([...nativeStones.map((stone) => stone.slug), ...stones.map((stone) => stone.slug)])).map((slug) => ({
      url: `${baseUrl}/pierres/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}

export function getCanonicalSeoUrlStrings() {
  return getCanonicalSeoUrls().map((entry) => entry.url);
}
