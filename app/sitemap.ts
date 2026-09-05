import type { MetadataRoute } from "next";
import { getCanonicalSeoUrls } from "@/lib/seoUrls";

export default function sitemap(): MetadataRoute.Sitemap {
  return getCanonicalSeoUrls();
}
