import { defaultShareDescription, defaultShareTitle, shareImage, siteUrl } from "@/lib/site";

const baseUrl = siteUrl.replace(/\/$/, "");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseUrl}/#organization`,
  name: "Quintessence Cristal",
  url: baseUrl,
  logo: `${baseUrl}/brand/litho-intelligence-icon.png`,
  sameAs: [],
  brand: {
    "@type": "Brand",
    name: "Litho Intelligence",
    slogan: "Trouvez la pierre qui correspond à votre énergie du moment."
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Litho Intelligence by Quintessence Cristal",
  alternateName: ["Litho Intelligence", "Quintessence Cristal"],
  url: baseUrl,
  inLanguage: "fr-FR",
  publisher: {
    "@id": `${baseUrl}/#organization`
  },
  description: defaultShareDescription,
  image: shareImage,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/recommendation?goal={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${baseUrl}/#app`,
  name: "Litho Intelligence",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web, iOS, Android",
  url: baseUrl,
  image: shareImage,
  description: defaultShareTitle,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    category: "Free"
  },
  publisher: {
    "@id": `${baseUrl}/#organization`
  }
};

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd, websiteJsonLd, webApplicationJsonLd]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
