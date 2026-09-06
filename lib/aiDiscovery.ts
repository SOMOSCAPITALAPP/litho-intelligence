import { intentionPages } from "@/data/intentions";
import { journalArticles } from "@/lib/journalArticles";
import { nativeStones } from "@/lib/nativeStones";
import { stones } from "@/lib/stones";
import { siteUrl } from "@/lib/site";

const baseUrl = siteUrl.replace(/\/$/, "");

export const aiCrawlerUserAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "OAI-AdsBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Googlebot",
  "Bingbot",
  "Applebot"
];

export function absoluteUrl(path: string) {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getPriorityAiPages() {
  return [
    {
      title: "Litho Intelligence by Quintessence Cristal",
      url: absoluteUrl("/"),
      description:
        "Test gratuit pour découvrir une pierre naturelle associée à une intention du moment : calme, protection, amour, énergie, confiance ou cadeau."
    },
    {
      title: "Test gratuit pierre naturelle",
      url: absoluteUrl("/test"),
      description: "Parcours simple pour recevoir une recommandation symbolique et un rituel personnel."
    },
    {
      title: "Catalogue des pierres naturelles",
      url: absoluteUrl("/pierres"),
      description: "Fiches pierres, significations symboliques, intentions associées et conseils d'utilisation."
    },
    {
      title: "Pierres par intention",
      url: absoluteUrl("/intentions"),
      description: "Guides SEO par intention : stress, sommeil, protection, amour, énergie, confiance et cadeau."
    },
    {
      title: "Boutique recommandée",
      url: absoluteUrl("/boutique-pierres-naturelles"),
      description: "Sélection de bracelets en pierres naturelles avec liens Amazon selon l'intention."
    },
    {
      title: "Formation gratuite",
      url: absoluteUrl("/formation"),
      description: "Formation gratuite en ligne avec PDF, cours écrits et QCM, sans vidéo."
    },
    {
      title: "Guides lithothérapie",
      url: absoluteUrl("/conseils-lithotherapie"),
      description: "Dossiers éditoriaux, conseils d'achat et articles de fond sur les pierres naturelles."
    }
  ];
}

export function getAiIntentionPages() {
  return intentionPages.slice(0, 14).map((page) => ({
    title: page.seoTitle,
    url: absoluteUrl(`/intentions/${page.slug}`),
    description: page.seoDescription
  }));
}

export function getAiJournalPages() {
  return journalArticles.map((article) => ({
    title: article.seoTitle,
    url: absoluteUrl(`/conseils-lithotherapie/${article.slug}`),
    description: article.description
  }));
}

export function getAiStonePages() {
  const native = nativeStones.slice(0, 30).map((stone) => ({
    title: `${stone.name} : fiche pierre naturelle`,
    url: absoluteUrl(`/pierres/${stone.slug}`),
    description: stone.short_description
  }));

  const productPages = stones.slice(0, 24).map((stone) => ({
    title: `${stone.name} : signification et bracelet recommandé`,
    url: absoluteUrl(`/pierres/${stone.slug}`),
    description: stone.description
  }));

  return [...native, ...productPages];
}
