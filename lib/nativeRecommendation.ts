import { nativeStones, normalizeNativeValue, type NativeStone } from "@/lib/nativeStones";
import type { RecommendationInput } from "@/lib/recommendation";

export type NativeRecommendation = {
  stone: NativeStone;
  score: number;
  matchedKeywords: string[];
};

const fieldWeights = {
  emotional_keywords: 30,
  intentions: 34,
  physical_wellbeing_keywords: 24,
  traditional_uses: 18
} as const;

const intentAliases: Record<string, string[]> = {
  anxiete: ["stress", "calme", "serenite"],
  angoisse: ["stress", "calme", "protection"],
  fatigue: ["energie", "elan", "recuperation"],
  amour: ["coeur", "reconfort", "tendresse"],
  argent: ["abondance", "reussite", "action"],
  manque: ["abondance", "confiance", "securite"],
  protection: ["ancrage", "securite", "limites"],
  confiance: ["courage", "affirmation", "action"],
  sommeil: ["repos", "calme", "serenite"],
  communication: ["expression", "parole", "verite"]
};

export function recommendNativeStones(input: RecommendationInput | string): NativeRecommendation[] {
  const normalized = normalizeRecommendationInput(input);
  if (!normalized) return [];

  const terms = expandTerms(normalized);

  return nativeStones
    .map((stone) => scoreStone(stone, terms))
    .filter((result) => result.score >= 45)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function normalizeRecommendationInput(input: RecommendationInput | string) {
  if (typeof input === "string") return normalizeNativeValue(input);
  return normalizeNativeValue([input.physical, input.emotional, input.goal].filter(Boolean).join(" "));
}

function expandTerms(normalized: string) {
  const terms = new Set(normalized.split(" ").filter((term) => term.length > 2));

  Object.entries(intentAliases).forEach(([trigger, aliases]) => {
    if (normalized.includes(trigger)) {
      aliases.forEach((alias) => terms.add(alias));
    }
  });

  return Array.from(terms);
}

function scoreStone(stone: NativeStone, terms: string[]): NativeRecommendation {
  let score = 20;
  const matchedKeywords = new Set<string>();

  (Object.keys(fieldWeights) as Array<keyof typeof fieldWeights>).forEach((field) => {
    stone[field].forEach((keyword) => {
      const normalizedKeyword = normalizeNativeValue(keyword);
      const matched = terms.some((term) => normalizedKeyword.includes(term) || term.includes(normalizedKeyword));
      if (matched) {
        score += fieldWeights[field];
        matchedKeywords.add(keyword);
      }
    });
  });

  return {
    stone,
    score: Math.min(98, score),
    matchedKeywords: Array.from(matchedKeywords)
  };
}
