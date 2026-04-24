import { stones, type Stone } from "@/lib/stones";

export type RecommendationInput = {
  physical?: string;
  emotional?: string;
  goal?: string;
};

export type Recommendation = {
  stone: Stone;
  score: number;
  reason: string;
  usage: string;
  intention: string;
};

const normalize = (value?: string) =>
  value
    ?.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") ?? "";

export function recommendStones(input: RecommendationInput): Recommendation[] {
  const physical = normalize(input.physical);
  const emotional = normalize(input.emotional);
  const goal = normalize(input.goal);

  return stones
    .map((stone) => {
      let points = 20;
      const matches: string[] = [];

      if (physical && stone.emotions.some((emotion) => physical.includes(normalize(emotion)) || normalize(emotion).includes(physical))) {
        points += 24;
        matches.push("votre état physique ressenti");
      }

      if (emotional && stone.emotions.some((emotion) => emotional.includes(normalize(emotion)) || normalize(emotion).includes(emotional))) {
        points += 30;
        matches.push("votre état émotionnel");
      }

      if (goal && stone.goals.some((item) => goal.includes(normalize(item)) || normalize(item).includes(goal))) {
        points += 34;
        matches.push("votre objectif");
      }

      const normalizedGoals = stone.goals.map(normalize);
      if (physical.includes("sommeil") && normalizedGoals.includes("sommeil")) points += 20;
      if (physical.includes("fatigue") && normalizedGoals.includes("energie")) points += 18;
      if (goal.includes("amour") && normalizedGoals.includes("amour")) points += 18;
      if (goal.includes("argent") && normalizedGoals.includes("argent")) points += 18;

      const score = Math.min(98, points);

      return {
        stone,
        score,
        reason:
          matches.length > 0
            ? `${stone.name} ressort pour ${matches.join(", ")} selon les traditions énergétiques.`
            : `${stone.name} est une option polyvalente pour clarifier votre intention.`,
        usage: stone.usage,
        intention: buildIntention(stone, { physical, emotional, goal })
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function buildIntention(stone: Stone, input: { physical: string; emotional: string; goal: string }) {
  if (input.emotional.includes("stress") || input.emotional.includes("anxiete")) {
    return `Aujourd'hui, je reviens doucement à mon calme avec ${stone.name}.`;
  }

  if (input.emotional.includes("peur") || input.emotional.includes("doute")) {
    return "J'avance pas à pas, avec plus de sécurité intérieure et de confiance.";
  }

  if (input.goal.includes("amour") || input.emotional.includes("solitude")) {
    return "Je mérite la douceur, le respect et un lien qui me nourrit.";
  }

  if (input.goal.includes("argent") || input.goal.includes("abondance")) {
    return "Je sors de la peur du manque et je choisis une action claire.";
  }

  if (input.physical.includes("fatigue")) {
    return "Je respecte mon rythme et je rallume mon énergie sans me brusquer.";
  }

  return "Je choisis une intention simple et je la garde vivante aujourd'hui.";
}

export function analyzeCombination(slugs: string[]) {
  const selected = stones.filter((stone) => slugs.includes(stone.slug));
  const warnings: string[] = [];
  const synergies: string[] = [];

  selected.forEach((stone) => {
    stone.compatibilities.forEach((slug) => {
      const match = selected.find((item) => item.slug === slug);
      if (match) synergies.push(`${stone.name} + ${match.name}`);
    });

    stone.incompatibilities.forEach((slug) => {
      const match = selected.find((item) => item.slug === slug);
      if (match) warnings.push(`${stone.name} peut être perçue comme énergétiquement moins fluide avec ${match.name}.`);
    });
  });

  const uniqueSynergies = Array.from(new Set(synergies));
  const uniqueWarnings = Array.from(new Set(warnings));
  const score = Math.max(35, Math.min(96, 70 + uniqueSynergies.length * 8 - uniqueWarnings.length * 12));

  return {
    selected,
    score,
    synergies: uniqueSynergies,
    warnings: uniqueWarnings,
    verdict:
      uniqueWarnings.length > 0
        ? "Association intéressante, mais à utiliser avec une intention claire et peu de pierres à la fois."
        : "Association harmonieuse pour un rituel simple et lisible."
  };
}
