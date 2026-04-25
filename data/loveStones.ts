export type LoveStone = {
  name: string;
  slug: string;
  themes: string[];
  description: string;
  tensionSupport: string;
  ritualAngle: string;
};

export const loveHarmonizationStones: LoveStone[] = [
  {
    name: "Quartz rose",
    slug: "quartz-rose",
    themes: ["douceur", "amour", "réconciliation"],
    description: "Symbole de tendresse et d’ouverture du cœur dans les traditions de lithothérapie.",
    tensionSupport: "utile symboliquement lorsque la relation demande plus de douceur et d’écoute",
    ritualAngle: "poser une intention de respect, de tendresse et de dialogue"
  },
  {
    name: "Rhodonite",
    slug: "rhodonite",
    themes: ["pardon", "blessures émotionnelles", "réparation"],
    description: "Pierre associée aux mémoires affectives et au pardon dans une démarche de bien-être.",
    tensionSupport: "adaptée aux relations où une parole blessante ou une distance affective pèse encore",
    ritualAngle: "nommer ce qui doit être apaisé, sans forcer l’autre"
  },
  {
    name: "Pierre de lune",
    slug: "pierre-de-lune",
    themes: ["tendresse", "intuition", "cycles"],
    description: "Pierre douce, traditionnellement liée aux cycles émotionnels et à l’écoute subtile.",
    tensionSupport: "utile lorsque la relation demande plus d’intuition, de patience et de délicatesse",
    ritualAngle: "s’écouter chacun pendant une minute avant de répondre"
  },
  {
    name: "Grenat",
    slug: "grenat",
    themes: ["passion", "désir", "intensité"],
    description: "Pierre intense, associée au feu intérieur, à la présence et à la passion.",
    tensionSupport: "à doser quand le lien manque d’élan ou de présence charnelle",
    ritualAngle: "raviver une intention de présence et d’envie partagée"
  },
  {
    name: "Aventurine verte",
    slug: "aventurine-verte",
    themes: ["équilibre du cœur", "chance", "ouverture"],
    description: "Pierre verte, souvent utilisée comme symbole d’ouverture affective et d’équilibre.",
    tensionSupport: "utile symboliquement lorsque le couple cherche une énergie plus légère et équilibrée",
    ritualAngle: "choisir ensemble une petite action qui rouvre le cœur"
  },
  {
    name: "Labradorite",
    slug: "labradorite",
    themes: ["protection du couple", "limites", "intuition"],
    description: "Pierre associée à la protection symbolique et aux limites émotionnelles.",
    tensionSupport: "utile lorsque le couple se sent influencé par l’extérieur ou trop exposé",
    ritualAngle: "visualiser une bulle de respect autour du lien"
  },
  {
    name: "Améthyste",
    slug: "amethyste",
    themes: ["calme", "conflits", "spiritualité"],
    description: "Pierre de calme intérieur, traditionnellement associée à la paix et au recul.",
    tensionSupport: "adaptée aux relations où l’émotion monte vite et demande plus d’apaisement",
    ritualAngle: "respirer ensemble avant d’aborder un sujet sensible"
  },
  {
    name: "Citrine",
    slug: "citrine",
    themes: ["joie", "optimisme", "rayonnement"],
    description: "Pierre solaire, utilisée pour symboliser l’optimisme et la confiance dans le lien.",
    tensionSupport: "utile lorsque la relation a besoin de légèreté, de projets et de joie",
    ritualAngle: "choisir une action simple qui remet du sourire dans le quotidien"
  }
];

export const relationTensionByContext: Record<string, string> = {
  couple: "Le lien semble pouvoir se construire autour d’une dynamique stable, à condition de garder un dialogue vivant.",
  rencontre: "La rencontre porte une énergie de découverte : le plus important est de ne pas projeter trop vite.",
  "relation compliquée": "Cette configuration demande de la douceur, du recul et une intention claire avant toute décision.",
  attirance: "L’attirance peut être stimulante, mais gagne à être accompagnée par une pierre qui ramène de la clarté.",
  réconciliation: "La réconciliation demande un symbole de pardon, d’écoute et de respect du rythme de chacun."
};
