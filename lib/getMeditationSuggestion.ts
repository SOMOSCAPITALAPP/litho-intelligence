export type MeditationSuggestion = {
  stoneName: string;
  durationFree: string;
  durationPremium: string;
  intention: string;
  anchorPhrase: string;
  miniScript: string;
};

const templates: Record<string, Pick<MeditationSuggestion, "intention" | "anchorPhrase" | "miniScript">> = {
  "Quartz rose": {
    intention: "douceur du cœur",
    anchorPhrase: "Je m’ouvre à l’amour avec calme, respect et confiance.",
    miniScript:
      "Installez-vous confortablement. Tenez votre pierre dans la main ou posez-la près de vous. Inspirez doucement. Imaginez une lumière rose très douce autour de votre poitrine. À chaque respiration, laissez cette lumière créer un espace de calme intérieur."
  },
  Améthyste: {
    intention: "calme intérieur",
    anchorPhrase: "Je ralentis, je respire, je retrouve mon centre.",
    miniScript:
      "Fermez les yeux quelques instants. Tenez l’améthyste ou visualisez sa couleur violette. Inspirez lentement, puis laissez le mental se poser. À chaque souffle, revenez à une pensée simple et paisible."
  },
  Citrine: {
    intention: "confiance rayonnante",
    anchorPhrase: "J’avance avec clarté, chaleur et confiance.",
    miniScript:
      "Posez votre attention sur le plexus solaire. Imaginez une lumière dorée qui s’allume doucement. À chaque inspiration, accueillez une énergie plus confiante. À chaque expiration, relâchez la peur du manque."
  }
};

export function getMeditationSuggestion(stoneName: string, intention?: string): MeditationSuggestion {
  const template = templates[stoneName] ?? {
    intention: intention || "présence et intention claire",
    anchorPhrase: `J’accueille l’énergie symbolique de ${stoneName} avec calme et discernement.`,
    miniScript:
      "Installez-vous dans une position confortable. Tenez la pierre ou visualisez-la près de vous. Respirez lentement pendant quelques minutes, puis formulez une intention simple, réaliste et respectueuse de votre rythme."
  };

  return {
    stoneName,
    durationFree: "3 à 5 minutes",
    durationPremium: "15 à 30 minutes",
    ...template
  };
}
