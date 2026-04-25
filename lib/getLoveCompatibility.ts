import { loveHarmonizationStones, relationTensionByContext } from "@/data/loveStones";
import { getBirthstone } from "@/lib/getBirthstone";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";
import { stoneWithDefiniteArticle, stonesWithDefiniteArticles } from "@/lib/french";

export function getLoveCompatibility(dateA: string, dateB: string, relationContext: string, firstNameA?: string, firstNameB?: string) {
  const birthstoneA = getBirthstone(dateA);
  const birthstoneB = getBirthstone(dateB);
  if (!birthstoneA || !birthstoneB) return null;

  const sharedThemes = birthstoneA.themes.filter((theme) => birthstoneB.themes.includes(theme));
  const harmonizer = chooseHarmonizer([...birthstoneA.themes, ...birthstoneB.themes], relationContext);
  const nameA = firstNameA || "Personne A";
  const nameB = firstNameB || "Personne B";
  const birthstones = stonesWithDefiniteArticles([birthstoneA.mainStone, birthstoneB.mainStone]);

  return {
    birthstoneA,
    birthstoneB,
    harmonizer,
    title: `${nameA} + ${nameB} : ${birthstones}`,
    reading:
      `Votre duo associe ${birthstones} : une énergie entre ` +
      `${birthstoneA.themes[0]} et ${birthstoneB.themes[0]}. Selon les traditions de lithothérapie, ` +
      `${stoneWithDefiniteArticle(birthstoneA.mainStone)} apporte une nuance de ${birthstoneA.emotion}, tandis que ${stoneWithDefiniteArticle(birthstoneB.mainStone)} ` +
      `ouvre une intention de ${birthstoneB.emotion}.`,
    strengths:
      sharedThemes.length > 0
        ? [`Vous partagez une vibration autour de ${sharedThemes.join(", ")}.`]
        : [
            `${stoneWithDefiniteArticle(birthstoneA.mainStone)} apporte ${birthstoneA.themes[0]}, tandis que ${stoneWithDefiniteArticle(birthstoneB.mainStone)} amène ${birthstoneB.themes[0]}.`,
            "La différence peut devenir complémentaire si elle est vécue avec écoute."
          ],
    tensions: [relationTensionByContext[relationContext] ?? relationTensionByContext.couple],
    coupleRitual:
      `Tenez ou visualisez ${stoneWithDefiniteArticle(harmonizer.name)} pendant 3 minutes. Chacun formule une phrase simple : “voici ce que j’aimerais nourrir dans notre lien”.`,
    romanticGift: `${stoneWithDefiniteArticle(harmonizer.name)} peut être proposé comme pierre d’union, symbole de ${harmonizer.themes.slice(0, 2).join(" et ")}.`,
    meditation: getMeditationSuggestion(harmonizer.name, harmonizer.themes[0])
  };
}

function chooseHarmonizer(themes: string[], relationContext: string) {
  if (relationContext === "réconciliation") return loveHarmonizationStones.find((stone) => stone.slug === "rhodonite")!;
  if (relationContext === "relation compliquée") return loveHarmonizationStones.find((stone) => stone.slug === "amethyste")!;
  if (themes.some((theme) => ["passion", "énergie", "force intérieure"].includes(theme))) {
    return loveHarmonizationStones.find((stone) => stone.slug === "quartz-rose")!;
  }
  if (themes.some((theme) => ["protection", "voyage"].includes(theme))) {
    return loveHarmonizationStones.find((stone) => stone.slug === "labradorite")!;
  }
  return loveHarmonizationStones.find((stone) => stone.slug === "quartz-rose")!;
}
