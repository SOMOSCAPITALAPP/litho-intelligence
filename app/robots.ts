import type { MetadataRoute } from "next";
import { aiCrawlerUserAgents } from "@/lib/aiDiscovery";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: aiCrawlerUserAgents,
        allow: ["/", "/llms.txt", "/sitemap.xml", "/pierres/", "/intentions/", "/guides/", "/formation", "/boutique-pierres-naturelles"],
        disallow: ["/admin", "/system", "/api/", "/account", "/profile", "/dashboard"]
      },
      {
        userAgent: ["facebookexternalhit", "Facebot", "Twitterbot", "LinkedInBot", "WhatsApp", "Slackbot"],
        allow: ["/", "/brand/", "/images/", "/icon.png", "/apple-icon.png"]
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/system", "/api/"]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
