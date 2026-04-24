import { getStone } from "@/lib/stones";
import type { AIRecommendationSource, AIStoneRecommendation } from "@/lib/openai-recommendation";
import type { RecommendationInput } from "@/lib/recommendation";

export type StoneRule = {
  stone: string;
  slug: string;
  score: number;
};

export const stoneRules: Record<string, StoneRule[]> = {
  stress: [
    { stone: "Howlite", slug: "howlite", score: 95 },
    { stone: "Labradorite", slug: "labradorite", score: 90 },
    { stone: "Calcédoine bleue", slug: "calcedoine-bleue", score: 88 }
  ],
  anxiete: [
    { stone: "Lépidolite", slug: "lepidolite", score: 94 },
    { stone: "Howlite", slug: "howlite", score: 90 }
  ],
  fatigue: [
    { stone: "Pierre de soleil", slug: "pierre-de-soleil", score: 92 },
    { stone: "Cornaline", slug: "cornaline", score: 90 },
    { stone: "Cristal de roche", slug: "cristal-de-roche", score: 88 }
  ],
  protection: [
    { stone: "Labradorite", slug: "labradorite", score: 96 },
    { stone: "Obsidienne œil céleste", slug: "obsidienne-oeil-celeste", score: 93 },
    { stone: "Œil de tigre", slug: "oeil-de-tigre", score: 90 }
  ],
  amour: [
    { stone: "Quartz rose", slug: "quartz-rose", score: 97 },
    { stone: "Rhodonite", slug: "rhodonite", score: 91 },
    { stone: "Aventurine verte", slug: "aventurine-verte", score: 86 }
  ],
  confiance: [
    { stone: "Œil de tigre", slug: "oeil-de-tigre", score: 94 },
    { stone: "Calcite jaune", slug: "calcite-jaune", score: 89 },
    { stone: "Pierre de soleil", slug: "pierre-de-soleil", score: 88 }
  ],
  argent: [
    { stone: "Jade émeraude", slug: "jade-emeraude", score: 91 },
    { stone: "Aventurine verte", slug: "aventurine-verte", score: 89 },
    { stone: "Œil de tigre", slug: "oeil-de-tigre", score: 87 }
  ],
  sommeil: [
    { stone: "Howlite", slug: "howlite", score: 93 },
    { stone: "Angélite", slug: "angelite", score: 88 },
    { stone: "Lépidolite", slug: "lepidolite", score: 87 }
  ],
  clarte: [
    { stone: "Fluorite", slug: "fluorite", score: 92 },
    { stone: "Sodalite du Brésil", slug: "sodalite-du-bresil", score: 89 },
    { stone: "Cristal de roche", slug: "cristal-de-roche", score: 88 }
  ]
};

const aliases: Record<string, string> = {
  anxiété: "anxiete",
  angoisse: "anxiete",
  énergie: "fatigue",
  energie: "fatigue",
  épuisement: "fatigue",
  epuisement: "fatigue",
  peur: "protection",
  sécurité: "protection",
  securite: "protection",
  relation: "amour",
  solitude: "amour",
  tristesse: "amour",
  coeur: "amour",
  cœur: "amour",
  doute: "confiance",
  courage: "confiance",
  abondance: "argent",
  manque: "argent",
  prosperite: "argent",
  prospérité: "argent",
  calme: "stress",
  serenite: "stress",
  sérénité: "stress",
  clarté: "clarte",
  confusion: "clarte",
  mental: "clarte",
  focus: "clarte"
};

export function normalizeInput(input: RecommendationInput | string) {
  const raw =
    typeof input === "string"
      ? input
      : [input.physical, input.emotional, input.goal].filter(Boolean).join(" ");

  return raw
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function getInputHash(input: RecommendationInput | string) {
  return normalizeInput(input);
}

export function getLocalMatch(input: RecommendationInput | string) {
  const normalized = normalizeInput(input);
  const keys = new Set<string>();

  Object.keys(stoneRules).forEach((key) => {
    if (normalized.includes(key)) keys.add(key);
  });

  Object.entries(aliases).forEach(([alias, key]) => {
    const normalizedAlias = normalizeInput(alias);
    if (normalized.includes(normalizedAlias)) keys.add(key);
  });

  const merged = new Map<string, StoneRule>();
  keys.forEach((key) => {
    stoneRules[key]?.forEach((rule) => {
      const current = merged.get(rule.slug);
      if (!current || rule.score > current.score) merged.set(rule.slug, rule);
    });
  });

  const rules = Array.from(merged.values()).sort((a, b) => b.score - a.score).slice(0, 5);
  if (!rules.length || rules[0].score < 70) return null;

  return buildRecommendationResponse(rules, "local");
}

export function getGlobalFallback() {
  return buildRecommendationResponse(
    [
      { stone: "Cristal de roche", slug: "cristal-de-roche", score: 88 },
      { stone: "Labradorite", slug: "labradorite", score: 84 },
      { stone: "Quartz rose", slug: "quartz-rose", score: 82 }
    ],
    "fallback"
  );
}

function buildRecommendationResponse(rules: StoneRule[], source: AIRecommendationSource) {
  const recommendations: AIStoneRecommendation[] = rules.map((rule) => {
    const stone = getStone(rule.slug);
    return {
      name: stone?.name ?? rule.stone,
      slug: stone?.slug ?? rule.slug,
      score: rule.score,
      emotional_message: buildEmotionalMessage(stone?.name ?? rule.stone),
      reason: stone
        ? `${stone.name} correspond à votre besoin selon les traditions de bien-être et les usages symboliques.`
        : `${rule.stone} est proposée comme soutien symbolique doux et accessible.`,
      usage: stone?.usage ?? "Portez-la en bracelet ou gardez-la près de vous pendant quelques minutes.",
      ritual: "Respirez pendant 2 minutes en gardant une intention simple et concrète.",
      warning: "Basé sur des pratiques traditionnelles de bien-être non scientifiques."
    };
  });

  return { stones: recommendations, source };
}

function buildEmotionalMessage(stoneName: string) {
  return `${stoneName} peut vous aider à poser une intention claire et à revenir à vous avec douceur.`;
}
