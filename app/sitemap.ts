import type { MetadataRoute } from "next";
import { intentionPages } from "@/data/intentions";
import { nativeStones } from "@/lib/nativeStones";
import { stones } from "@/lib/stones";
import { siteUrl } from "@/lib/site";

const baseUrl = siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/test",
    "/recommendation",
    "/stones",
    "/intention",
    "/formation",
    "/idee-cadeau",
    "/boutique-pierres-naturelles",
    "/pierre-de-naissance",
    "/lithotherapie"
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: now, changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...intentionPages.map((page) => ({ url: `${baseUrl}/intention/${page.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...nativeStones.map((stone) => ({ url: `${baseUrl}/stones/${stone.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...stones.map((stone) => ({ url: `${baseUrl}/stone/${stone.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 }))
  ];
}
