import { getBirthstone } from "@/lib/getBirthstone";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";
import { stoneWithDefiniteArticle, stonesWithDefiniteArticles } from "@/lib/french";

export function getGiftRecommendation(date: string, relationType: string, occasion: string, budget?: string) {
  const birthstone = getBirthstone(date);
  if (!birthstone) return null;

  const relation = relationType || "cette personne";
  const event = occasion || "un moment important";
  const budgetLine = budget ? `Budget indiqué : ${budget}. ` : "";
  const stones = stonesWithDefiniteArticles([birthstone.alternativeStone, birthstone.mainStone]);
  const message =
    `Pour une personne née en ${birthstone.monthName.toLowerCase()}, ${stones} ` +
    `symbolisent ${birthstone.themes.slice(0, 3).join(", ")}. C’est un cadeau délicat pour ${relation}, ` +
    `à offrir pour ${event}, afin d’accompagner symboliquement une intention de ${birthstone.emotion}.`;

  return {
    birthstone,
    title: `${stoneWithDefiniteArticle(birthstone.alternativeStone)} ou ${stoneWithDefiniteArticle(birthstone.mainStone)}`,
    emotionalText: `${budgetLine}${message}`,
    recommendedJewelry: birthstone.productTypes[0] ?? "bracelet",
    copyMessage:
      `J’ai choisi ${stoneWithDefiniteArticle(birthstone.alternativeStone)} pour toi parce que cette pierre symbolise ${birthstone.themes.slice(0, 2).join(" et ")}. ` +
      "Qu’elle t’accompagne comme un rappel doux de ta force intérieure.",
    meditation: getMeditationSuggestion(birthstone.alternativeStone, birthstone.meditationTheme)
  };
}
