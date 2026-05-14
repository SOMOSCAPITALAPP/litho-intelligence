import { getStone } from "@/lib/stones";

export type RecommendedProduct = {
  id: string;
  title: string;
  stone: string;
  stoneSlug: string;
  intentions: string[];
  price: string;
  imageUrl: string;
  amazonUrl: string;
  badge?: string;
  description: string;
};

const productSeeds: Array<Omit<RecommendedProduct, "imageUrl" | "amazonUrl"> & { fallbackUrl?: string }> = [
  {
    id: "bracelet-labradorite-foncee-8mm",
    title: "Bracelet Labradorite Foncée 8mm",
    stone: "Labradorite foncée",
    stoneSlug: "labradorite-foncee-larvikite",
    intentions: ["protection", "confiance", "femme", "homme"],
    price: "Prix variable",
    badge: "Protection",
    description: "Un bracelet sombre et minéral pour symboliser l'ancrage, les limites personnelles et la protection intérieure."
  },
  {
    id: "bracelet-labradorite-pochette",
    title: "Bracelet Labradorite avec pochette artisanale",
    stone: "Labradorite",
    stoneSlug: "labradorite",
    intentions: ["protection", "hypersensibilite", "cadeau"],
    price: "Prix variable",
    badge: "Meilleur choix",
    description: "Un choix lisible pour les personnes sensibles aux ambiances, dans une intention de recentrage symbolique."
  },
  {
    id: "bracelet-jade-vert-naturel",
    title: "Bracelet Jade Vert Naturel 8mm",
    stone: "Jade vert",
    stoneSlug: "jade-emeraude",
    intentions: ["equilibre", "abondance", "cadeau"],
    price: "Prix variable",
    badge: "Équilibre",
    description: "Une pierre verte traditionnellement associée à l'harmonie, à l'équilibre et à la croissance personnelle."
  },
  {
    id: "bracelet-quartz-rose",
    title: "Bracelet Quartz Rose",
    stone: "Quartz rose",
    stoneSlug: "quartz-rose",
    intentions: ["amour", "calme", "cadeau", "femme"],
    price: "Prix variable",
    badge: "Amour",
    description: "Un bracelet doux pour accompagner une intention de tendresse, d'amour de soi et d'ouverture du cœur."
  },
  {
    id: "bracelet-obsidienne-oeil-celeste",
    title: "Bracelet Obsidienne Œil Céleste",
    stone: "Obsidienne œil céleste",
    stoneSlug: "obsidienne-oeil-celeste",
    intentions: ["protection", "ancrage", "homme"],
    price: "Prix variable",
    badge: "Protection forte",
    description: "Une pierre intense, à présenter avec prudence, pour les rituels symboliques de protection et de retour à soi."
  },
  {
    id: "bracelet-oeil-de-tigre",
    title: "Bracelet Œil de Tigre",
    stone: "Œil de tigre",
    stoneSlug: "oeil-de-tigre",
    intentions: ["confiance", "protection", "energie", "homme"],
    price: "Prix variable",
    badge: "Confiance",
    description: "Un classique solaire pour symboliser le courage, la posture et l'action calme."
  },
  {
    id: "bracelet-amethyste",
    title: "Bracelet Améthyste",
    stone: "Améthyste",
    stoneSlug: "amethyste",
    intentions: ["stress", "sommeil", "calme"],
    price: "Prix variable",
    badge: "Calme",
    description: "Une pierre violette traditionnellement associée au recul, au calme et au rituel du soir."
  },
  {
    id: "bracelet-howlite",
    title: "Bracelet Howlite",
    stone: "Howlite",
    stoneSlug: "howlite",
    intentions: ["stress", "sommeil", "calme", "cadeau"],
    price: "Prix variable",
    badge: "Stress & calme",
    description: "Une pierre claire et sobre pour symboliser la patience, la douceur et le ralentissement."
  },
  {
    id: "bracelet-apatite-bleue",
    title: "Bracelet Apatite Bleue",
    stone: "Apatite bleue",
    stoneSlug: "apatite-bleue",
    intentions: ["communication", "energie", "confiance"],
    price: "Prix variable",
    badge: "Expression",
    description: "Un bleu profond pour accompagner une intention de parole claire, de motivation et d'élan personnel."
  },
  {
    id: "bracelet-cornaline",
    title: "Bracelet Cornaline",
    stone: "Cornaline",
    stoneSlug: "cornaline",
    intentions: ["energie", "confiance", "creativite"],
    price: "Prix variable",
    badge: "Énergie",
    description: "Une pierre chaude pour symboliser l'élan, la créativité et le passage à l'action."
  },
  {
    id: "bracelet-tourmaline-noire",
    title: "Bracelet Tourmaline Noire",
    stone: "Tourmaline noire",
    stoneSlug: "tourmaline-noire",
    intentions: ["protection", "ancrage", "homme"],
    price: "Prix variable",
    badge: "Ancrage",
    description: "Une pierre sombre et sobre pour les intentions de stabilité et de protection symbolique."
  },
  {
    id: "bracelet-pyrite",
    title: "Bracelet Pyrite",
    stone: "Pyrite",
    stoneSlug: "pyrite",
    intentions: ["argent-abondance", "confiance", "energie"],
    price: "Prix variable",
    badge: "Abondance",
    description: "Une pierre dorée associée symboliquement à la clarté, à l'organisation et à l'abondance responsable."
  }
];

export const recommendedProducts: RecommendedProduct[] = productSeeds.map((product) => {
  const stone = getStone(product.stoneSlug);
  return {
    ...product,
    imageUrl: stone?.image.url ?? "/brand/litho-intelligence-og-v3.png",
    amazonUrl: stone?.products[0]?.url ?? product.fallbackUrl ?? "https://www.amazon.fr/"
  };
});

export function getProductsByIntention(intention: string, limit = 6) {
  return recommendedProducts.filter((product) => product.intentions.includes(intention)).slice(0, limit);
}

export function getProductByStone(stoneSlug: string) {
  return recommendedProducts.find((product) => product.stoneSlug === stoneSlug);
}
