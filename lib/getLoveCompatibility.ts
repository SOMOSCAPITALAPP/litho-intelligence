import { loveHarmonizationStones, relationTensionByContext } from "@/data/loveStones";
import { getBirthstone } from "@/lib/getBirthstone";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";

export function getLoveCompatibility(dateA: string, dateB: string, relationContext: string, firstNameA?: string, firstNameB?: string) {
  const birthstoneA = getBirthstone(dateA);
  const birthstoneB = getBirthstone(dateB);
  if (!birthstoneA || !birthstoneB) return null;

  const sharedThemes = birthstoneA.themes.filter((theme) => birthstoneB.themes.includes(theme));
  const harmonizer = chooseHarmonizer([...birthstoneA.themes, ...birthstoneB.themes], relationContext);
  const nameA = firstNameA || "Personne A";
  const nameB = firstNameB || "Personne B";

  return {
    birthstoneA,
    birthstoneB,
    harmonizer,
    title: `${nameA} + ${nameB} : ${birthstoneA.mainStone} et ${birthstoneB.mainStone}`,
    reading:
      `Votre duo associe ${birthstoneA.mainStone} et ${birthstoneB.mainStone} : une énergie entre ` +
      `${birthstoneA.themes[0]} et ${birthstoneB.themes[0]}. Selon les traditions de lithothérapie, ` +
      `${birthstoneA.mainStone} apporte une nuance de ${birthstoneA.emotion}, tandis que ${birthstoneB.mainStone} ` +
      `ouvre une intention de ${birthstoneB.emotion}.`,
    strengths:
      sharedThemes.length > 0
        ? [`Vous partagez une vibration autour de ${sharedThemes.join(", ")}.`]
        : [
            `${birthstoneA.mainStone} apporte ${birthstoneA.themes[0]}, tandis que ${birthstoneB.mainStone} amène ${birthstoneB.themes[0]}.`,
            "La différence peut devenir complémentaire si elle est vécue avec écoute."
          ],
    tensions: [relationTensionByContext[relationContext] ?? relationTensionByContext.couple],
    coupleRitual:
      `Tenez ou visualisez ${harmonizer.name} pendant 3 minutes. Chacun formule une phrase simple : “voici ce que j’aimerais nourrir dans notre lien”.`,
    romanticGift: `${harmonizer.name} peut être proposé comme pierre d’union, symbole de ${harmonizer.themes.slice(0, 2).join(" et ")}.`,
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
