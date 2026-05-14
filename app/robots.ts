import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/system", "/api/"]
    },
    sitemap: "https://www.litho-intelligence.com/sitemap.xml"
  };
}
