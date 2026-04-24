import { getStone, stones } from "@/lib/stones";

export const essentialStoneSlugs = [
  "labradorite",
  "obsidienne-noire",
  "oeil-de-tigre",
  "tourmaline-noire",
  "quartz-rose",
  "rhodonite",
  "pierre-de-lune",
  "citrine",
  "cornaline",
  "jaspe-rouge",
  "amethyste",
  "lapis-lazuli",
  "sodalite",
  "aventurine-verte",
  "amazonite",
  "fluorite",
  "pyrite",
  "malachite",
  "grenat",
  "quartz-clair"
] as const;

export const stoneMappings: Record<string, string[]> = {
  stress: ["amethyste", "quartz-rose", "labradorite", "sodalite"],
  anxiete: ["amethyste", "lepidolite", "quartz-rose", "howlite"],
  fatigue: ["citrine", "quartz-clair", "cornaline", "grenat"],
  confiance: ["oeil-de-tigre", "citrine", "pierre-de-soleil", "pyrite"],
  amour: ["quartz-rose", "pierre-de-lune", "rhodonite", "aventurine-verte"],
  protection: ["labradorite", "obsidienne-noire", "tourmaline-noire", "oeil-de-tigre"],
  ancrage: ["jaspe-rouge", "tourmaline-noire", "obsidienne-noire", "onyx"],
  argent: ["pyrite", "citrine", "aventurine-verte", "oeil-de-tigre"],
  sommeil: ["amethyste", "howlite", "lepidolite", "angelite"],
  clarte: ["fluorite", "sodalite", "quartz-clair", "lapis-lazuli"],
  energie: ["citrine", "cornaline", "jaspe-rouge", "grenat"],
  spiritualite: ["amethyste", "lapis-lazuli", "labradorite", "quartz-clair"]
};

export const stoneScores: Record<string, Record<string, number>> = {
  labradorite: { protection: 95, stress: 85, fatigue: 80, intuition: 90 },
  "obsidienne-noire": { protection: 94, ancrage: 92, peur: 88 },
  "oeil-de-tigre": { confiance: 94, protection: 88, argent: 84, courage: 92 },
  "tourmaline-noire": { protection: 96, ancrage: 95, stress: 78 },
  "quartz-rose": { amour: 97, stress: 82, tristesse: 88, reconfort: 92 },
  rhodonite: { amour: 90, tristesse: 88, pardon: 86 },
  "pierre-de-lune": { amour: 84, intuition: 92, equilibre: 82 },
  citrine: { fatigue: 92, argent: 90, confiance: 88, energie: 94 },
  cornaline: { energie: 92, fatigue: 90, creativite: 92, confiance: 84 },
  "jaspe-rouge": { ancrage: 94, fatigue: 82, courage: 86, energie: 84 },
  amethyste: { stress: 95, sommeil: 92, spiritualite: 90, clarte: 82 },
  "lapis-lazuli": { clarte: 86, communication: 92, confiance: 82 },
  sodalite: { clarte: 90, stress: 82, communication: 86, focus: 90 },
  "aventurine-verte": { amour: 84, argent: 82, equilibre: 88, chance: 90 },
  amazonite: { stress: 86, communication: 90, equilibre: 88 },
  fluorite: { clarte: 94, focus: 92, stress: 78 },
  pyrite: { argent: 96, confiance: 88, action: 90 },
  malachite: { transformation: 94, amour: 82, courage: 88 },
  grenat: { energie: 92, confiance: 84, courage: 86 },
  "quartz-clair": { clarte: 90, fatigue: 88, spiritualite: 86, equilibre: 84 }
};

export const stonesContext = stones
  .filter((stone) => essentialStoneSlugs.includes(stone.slug as (typeof essentialStoneSlugs)[number]))
  .map((stone) => ({
    name: stone.name,
    slug: stone.slug,
    use_cases: Array.from(new Set([...stone.emotions, ...stone.goals])).slice(0, 8),
    summary: `${stone.name} accompagne symboliquement ${stone.goals.slice(0, 3).join(", ")} selon les traditions de lithothérapie.`
  }));

export const productCatalog = stones.flatMap((stone) =>
  stone.products.map((product) => ({
    id: `bracelet-${stone.slug}`,
    stone_id: stone.slug,
    title: product.label,
    brand: product.brand,
    price: product.price ? Number(product.price.replace(",", ".").replace(/[^\d.]/g, "")) : null,
    amazon_url: product.url,
    image_url: stone.image.url,
    margin_estimate: 0.5
  }))
);

export function getScoreForStone(slug: string, intent: string) {
  const normalizedIntent = intent
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return stoneScores[slug]?.[normalizedIntent] ?? getStone(slug)?.scores?.[normalizedIntent] ?? 75;
}
