import { getScoreForStone, stoneMappings } from "@/lib/stoneKnowledge";
import { getStone } from "@/lib/stones";
import type { AIRecommendationSource, AIStoneRecommendation } from "@/lib/openai-recommendation";
import type { RecommendationInput } from "@/lib/recommendation";

export type StoneRule = {
  stone: string;
  slug: string;
  score: number;
};

const aliases: Record<string, string> = {
  angoisse: "anxiete",
  anxiete: "anxiete",
  energie: "energie",
  epuisement: "fatigue",
  manque: "argent",
  abondance: "argent",
  prosperite: "argent",
  peur: "protection",
  securite: "protection",
  calme: "stress",
  serenite: "stress",
  relation: "amour",
  coeur: "amour",
  solitude: "amour",
  tristesse: "amour",
  doute: "confiance",
  courage: "confiance",
  focus: "clarte",
  mental: "clarte",
  confusion: "clarte",
  meditation: "spiritualite",
  intuition: "spiritualite"
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
  const intents = new Set<string>();

  Object.keys(stoneMappings).forEach((key) => {
    if (normalized.includes(key)) intents.add(key);
  });

  Object.entries(aliases).forEach(([alias, intent]) => {
    if (normalized.includes(normalizeInput(alias))) intents.add(intent);
  });

  const merged = new Map<string, StoneRule>();
  intents.forEach((intent) => {
    stoneMappings[intent]?.forEach((slug, index) => {
      const stone = getStone(slug);
      const score = Math.max(getScoreForStone(slug, intent), 90 - index * 4);
      const current = merged.get(slug);
      if (!current || score > current.score) {
        merged.set(slug, { stone: stone?.name ?? slug, slug, score });
      }
    });
  });

  const rules = Array.from(merged.values()).sort((a, b) => b.score - a.score).slice(0, 5);
  if (!rules.length || rules[0].score < 70) return null;

  return buildRecommendationResponse(rules, "local");
}

export function getGlobalFallback() {
  return buildRecommendationResponse(
    [
      { stone: "Quartz clair", slug: "quartz-clair", score: 88 },
      { stone: "Améthyste", slug: "amethyste", score: 86 },
      { stone: "Labradorite", slug: "labradorite", score: 84 }
    ],
    "fallback"
  );
}

function buildRecommendationResponse(rules: StoneRule[], source: AIRecommendationSource) {
  const recommendations: AIStoneRecommendation[] = rules.map((rule) => {
    const stone = getStone(rule.slug);
    const name = stone?.name ?? rule.stone;

    return {
      name,
      slug: stone?.slug ?? rule.slug,
      score: rule.score,
      emotional_message: buildEmotionalMessage(name),
      reason: stone
        ? `${name} correspond à votre besoin selon les traditions de bien-être et les usages symboliques.`
        : `${name} est proposée comme soutien symbolique doux et accessible.`,
      usage: stone?.usage ?? "Portez-la en bracelet ou gardez-la près de vous pendant quelques minutes.",
      ritual: stone?.rituals[0] ?? "Respirez pendant 2 minutes en gardant une intention simple et concrète.",
      warning: "Basé sur des pratiques traditionnelles de bien-être non scientifiques."
    };
  });

  return { stones: recommendations, source };
}

function buildEmotionalMessage(stoneName: string) {
  return `${stoneName} peut vous aider à poser une intention claire et à revenir à vous avec douceur.`;
}
