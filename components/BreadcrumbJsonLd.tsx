import { siteUrl } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  href: string;
};

function absoluteHref(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  return `${siteUrl.replace(/\/$/, "")}${href.startsWith("/") ? href : `/${href}`}`;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteHref(item.href)
    }))
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

