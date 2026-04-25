export type Birthstone = {
  month: number;
  monthName: string;
  mainStone: string;
  mainStoneSlug: string;
  alternativeStone: string;
  alternativeStoneSlug: string;
  themes: string[];
  emotion: string;
  giftAngle: string;
  meditationTheme: string;
  productTypes: string[];
};

export const birthstones: Birthstone[] = [
  {
    month: 1,
    monthName: "Janvier",
    mainStone: "Grenat",
    mainStoneSlug: "grenat",
    alternativeStone: "Jaspe rouge",
    alternativeStoneSlug: "jaspe-rouge",
    themes: ["force", "courage", "vitalité", "stabilité"],
    emotion: "énergie intérieure",
    giftAngle: "un cadeau symbolique pour encourager la force et la confiance",
    meditationTheme: "activer la force intérieure",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 2,
    monthName: "Février",
    mainStone: "Améthyste",
    mainStoneSlug: "amethyste",
    alternativeStone: "Lépidolite",
    alternativeStoneSlug: "lepidolite",
    themes: ["calme", "intuition", "spiritualité", "apaisement"],
    emotion: "calme intérieur",
    giftAngle: "un cadeau délicat pour inviter à ralentir et à se recentrer",
    meditationTheme: "retrouver un calme profond",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 3,
    monthName: "Mars",
    mainStone: "Aigue-marine",
    mainStoneSlug: "aigue-marine",
    alternativeStone: "Apatite bleue",
    alternativeStoneSlug: "apatite-bleue",
    themes: ["communication", "fluidité", "clarté", "douceur"],
    emotion: "expression apaisée",
    giftAngle: "un cadeau sensible pour accompagner la parole douce et la clarté",
    meditationTheme: "ouvrir une parole fluide",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 4,
    monthName: "Avril",
    mainStone: "Diamant",
    mainStoneSlug: "diamant",
    alternativeStone: "Cristal de roche",
    alternativeStoneSlug: "cristal-de-roche",
    themes: ["pureté", "amplification", "lumière", "clarté"],
    emotion: "clarté personnelle",
    giftAngle: "un cadeau lumineux pour symboliser la clarté et l’intention pure",
    meditationTheme: "clarifier son intention",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 5,
    monthName: "Mai",
    mainStone: "Émeraude",
    mainStoneSlug: "emeraude",
    alternativeStone: "Aventurine verte",
    alternativeStoneSlug: "aventurine-verte",
    themes: ["amour", "harmonie", "cœur", "équilibre"],
    emotion: "ouverture du cœur",
    giftAngle: "un cadeau tendre pour symboliser l’harmonie, la chance et l’affection",
    meditationTheme: "ouvrir le cœur avec équilibre",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 6,
    monthName: "Juin",
    mainStone: "Pierre de lune",
    mainStoneSlug: "pierre-de-lune",
    alternativeStone: "Labradorite blanche",
    alternativeStoneSlug: "labradorite-blanche",
    themes: ["intuition", "féminité", "cycles", "douceur"],
    emotion: "intuition douce",
    giftAngle: "un cadeau intime pour accompagner les transitions et la tendresse",
    meditationTheme: "écouter son intuition",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 7,
    monthName: "Juillet",
    mainStone: "Rubis",
    mainStoneSlug: "rubis",
    alternativeStone: "Cornaline",
    alternativeStoneSlug: "cornaline",
    themes: ["passion", "énergie", "force intérieure", "courage"],
    emotion: "feu intérieur",
    giftAngle: "un cadeau intense pour encourager l’élan, l’audace et la passion",
    meditationTheme: "réveiller son courage",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 8,
    monthName: "Août",
    mainStone: "Péridot",
    mainStoneSlug: "peridot",
    alternativeStone: "Aventurine verte",
    alternativeStoneSlug: "aventurine-verte",
    themes: ["joie", "chance", "renouveau", "optimisme"],
    emotion: "renouveau joyeux",
    giftAngle: "un cadeau frais pour symboliser l’optimisme et les nouveaux départs",
    meditationTheme: "accueillir le renouveau",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 9,
    monthName: "Septembre",
    mainStone: "Saphir",
    mainStoneSlug: "saphir",
    alternativeStone: "Lapis-lazuli",
    alternativeStoneSlug: "lapis-lazuli",
    themes: ["sagesse", "concentration", "vérité", "discipline"],
    emotion: "discernement calme",
    giftAngle: "un cadeau élégant pour soutenir symboliquement la vérité et la concentration",
    meditationTheme: "installer une clarté stable",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 10,
    monthName: "Octobre",
    mainStone: "Opale",
    mainStoneSlug: "opale",
    alternativeStone: "Quartz rose",
    alternativeStoneSlug: "quartz-rose",
    themes: ["créativité", "émotion", "amour", "sensibilité"],
    emotion: "sensibilité créative",
    giftAngle: "un cadeau doux pour honorer la sensibilité et la créativité",
    meditationTheme: "adoucir le cœur créatif",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 11,
    monthName: "Novembre",
    mainStone: "Citrine",
    mainStoneSlug: "citrine",
    alternativeStone: "Œil de tigre",
    alternativeStoneSlug: "oeil-de-tigre",
    themes: ["abondance", "confiance", "succès", "énergie solaire"],
    emotion: "confiance rayonnante",
    giftAngle: "un cadeau solaire pour accompagner la confiance et les projets",
    meditationTheme: "rayonner avec confiance",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  },
  {
    month: 12,
    monthName: "Décembre",
    mainStone: "Turquoise",
    mainStoneSlug: "turquoise",
    alternativeStone: "Apatite bleue",
    alternativeStoneSlug: "apatite-bleue",
    themes: ["protection", "voyage", "communication", "chance"],
    emotion: "protection douce",
    giftAngle: "un cadeau protecteur pour symboliser la chance, le lien et le voyage intérieur",
    meditationTheme: "se sentir protégé en douceur",
    productTypes: ["bracelet", "pendentif", "pierre roulée"]
  }
];
