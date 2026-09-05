import type { MetadataRoute } from "next";
import { intentionPages } from "@/data/intentions";
import { nativeStones } from "@/lib/nativeStones";
import { editorialGuides } from "@/lib/editorialGuides";
import { stones } from "@/lib/stones";
import { siteUrl } from "@/lib/site";

const baseUrl = siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/journal"
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: now, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...editorialGuides.map((guide) => ({ url: `${baseUrl}/guides/${guide.slug}`, lastModified: new Date(guide.updatedAt), changeFrequency: "monthly" as const, priority: 0.82 })),
    ...intentionPages.map((page) => ({ url: `${baseUrl}/intentions/${page.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...Array.from(new Set([...nativeStones.map((stone) => stone.slug), ...stones.map((stone) => stone.slug)])).map((slug) => ({
      url: `${baseUrl}/pierres/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  ];
}
