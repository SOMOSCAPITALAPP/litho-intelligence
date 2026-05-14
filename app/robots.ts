import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl.replace(/\/$/, "");

  return {
    rules: [
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
