import type { NativeStone } from "@/lib/nativeStones";
import type { Stone } from "@/lib/stones";

const list = (items: string[], fallback = "ses usages symboliques") => {
  const clean = items.filter(Boolean);
  if (!clean.length) return fallback;
  if (clean.length === 1) return clean[0];
  return `${clean.slice(0, -1).join(", ")} et ${clean[clean.length - 1]}`;
};

const lowerFirst = (value: string) => (value ? value.charAt(0).toLowerCase() + value.slice(1) : value);

export function productStoneVirtueSummary(stone: Stone) {
  const properties = list(stone.properties.slice(0, 5));
  const emotions = list(stone.emotions.slice(0, 4), "les moments de transition");
  const intentions = list(stone.intentions.slice(0, 4), "une intention de mieux-être");
  const compatibilities = list(stone.compatibilities.slice(0, 3), "des pierres douces et complémentaires");
  const recharge = list(stone.recharge.slice(0, 3), "une recharge douce");
  const chakra = stone.chakra || "les centres énergétiques traditionnellement associés";

  return [
    `${stone.name} est traditionnellement associée à ${properties}. Dans une lecture symbolique, cette pierre peut accompagner les personnes qui cherchent à soutenir ${intentions}, sans se disperser dans une pratique trop compliquée. Sa présence visuelle, décrite par ${lowerFirst(stone.visual)}, en fait aussi un repère concret : on peut la porter, la poser près de soi ou la tenir quelques instants pour revenir à une intention simple.`,
    `Sur le plan émotionnel, ${stone.name} est souvent reliée à ${emotions}. Elle peut servir de support lorsque l'on souhaite ralentir, clarifier une décision, poser une limite ou retrouver une forme de stabilité intérieure. Le chakra indiqué pour cette pierre est ${chakra}, ce qui donne une piste de travail symbolique : respiration, attention au corps, parole plus posée ou recentrage selon le besoin du moment. L'idée n'est pas de promettre un effet automatique, mais de créer un rituel sobre qui aide à observer son état et à agir avec plus de conscience.`,
    `Pour l'utiliser au quotidien, le plus pertinent est de relier la pierre à un geste précis : ${stone.usageTips.slice(0, 2).join(" ")} Elle peut aussi être associée à ${compatibilities} lorsque l'on veut nuancer son intention. Côté entretien, privilégiez ${lowerFirst(stone.purification)} Pour la recharge, ${recharge} reste une approche simple. Ces indications relèvent des traditions de lithothérapie et doivent rester complémentaires à l'écoute de soi, au bon sens et, si nécessaire, à un accompagnement professionnel.`
  ];
}

export function nativeStoneVirtueSummary(stone: NativeStone) {
  const uses = list(stone.traditional_uses.slice(0, 4));
  const emotions = list(stone.emotional_keywords.slice(0, 4), "les états émotionnels sensibles");
  const intentions = list(stone.intentions.slice(0, 4), "une intention personnelle");
  const wellbeing = list(stone.physical_wellbeing_keywords.slice(0, 3), "le ressenti corporel");
  const forms = list(stone.recommended_forms.slice(0, 3), "une forme facile à porter");
  const chakras = list(stone.chakras.slice(0, 3), "les chakras traditionnellement associés");
  const combinations = list(stone.positive_combinations.slice(0, 3), "des pierres complémentaires");

  return [
    `${stone.name} est une pierre naturelle que les traditions de lithothérapie relient à ${uses}. Sa fiche met en avant une intention principale autour de ${intentions}, ce qui permet de la comprendre comme un support symbolique plutôt que comme une solution automatique. Elle peut devenir un repère simple dans une routine personnelle : un objet que l'on voit, que l'on porte ou que l'on tient pour revenir à une qualité intérieure que l'on souhaite cultiver.`,
    `Ses vertus symboliques sont particulièrement intéressantes lorsque l'on traverse des états comme ${emotions}. Dans ce contexte, ${stone.name} peut aider à donner une forme concrète à une intention : prendre du recul, se sentir plus stable, apaiser une tension ou clarifier une parole. Les correspondances avec ${chakras} offrent une grille de lecture supplémentaire, utile pour choisir un geste de respiration, une méditation courte ou une phrase d'ancrage. Les mots-clés de bien-être associés, comme ${wellbeing}, doivent être compris comme des repères de ressenti et non comme des indications médicales.`,
    `Pour une pratique quotidienne, les formes recommandées sont ${forms}. La fiche conseille notamment : ${stone.usage_advice.slice(0, 2).join(" ")} Cette pierre peut aussi se combiner avec ${combinations} si l'on souhaite créer une association plus complète. Pour garder une pratique saine, il est préférable de choisir une intention, de tester la pierre quelques jours et de noter ce que l'on observe. Les informations proposées restent issues des usages symboliques et ne remplacent jamais un avis médical, psychologique ou professionnel.`
  ];
}
