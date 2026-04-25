import { getBirthstone } from "@/lib/getBirthstone";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";

export function getGiftRecommendation(date: string, relationType: string, occasion: string, budget?: string) {
  const birthstone = getBirthstone(date);
  if (!birthstone) return null;

  const relation = relationType || "cette personne";
  const event = occasion || "un moment important";
  const budgetLine = budget ? `Budget indiqué : ${budget}. ` : "";
  const message =
    `Pour une personne née en ${birthstone.monthName.toLowerCase()}, ${birthstone.alternativeStone} ou ${birthstone.mainStone} ` +
    `symbolisent ${birthstone.themes.slice(0, 3).join(", ")}. C’est un cadeau délicat pour ${relation}, ` +
    `à offrir pour ${event}, afin d’accompagner symboliquement une intention de ${birthstone.emotion}.`;

  return {
    birthstone,
    emotionalText: `${budgetLine}${message}`,
    recommendedJewelry: birthstone.productTypes[0] ?? "bracelet",
    copyMessage:
      `J’ai choisi cette pierre pour toi parce qu’elle symbolise ${birthstone.themes.slice(0, 2).join(" et ")}. ` +
      "Qu’elle t’accompagne comme un rappel doux de ta force intérieure.",
    meditation: getMeditationSuggestion(birthstone.alternativeStone, birthstone.meditationTheme)
  };
}
