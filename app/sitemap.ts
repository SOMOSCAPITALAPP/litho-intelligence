import type { MetadataRoute } from "next";
import { intentionPages } from "@/data/intentions";
import { stones } from "@/lib/stones";

const baseUrl = "https://www.litho-intelligence.com";

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

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...intentionPages.map((page) => ({ url: `${baseUrl}/intention/${page.slug}`, lastModified: new Date() })),
    ...stones.map((stone) => ({ url: `${baseUrl}/stone/${stone.slug}`, lastModified: new Date() }))
  ];
}
