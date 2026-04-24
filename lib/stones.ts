export type Stone = {
  slug: string;
  name: string;
  visual: string;
  origin: string;
  description: string;
  image: {
    url: string;
    alt: string;
    credit: string;
    sourceUrl: string;
  };
  properties: string[];
  chakra: string;
  emotions: string[];
  goals: string[];
  usage: string;
  compatibilities: string[];
  incompatibilities: string[];
  purification: string;
  wear: string;
  products: Product[];
};

export type Product = {
  label: string;
  brand: "Felicidade" | "Vera Mentis" | "KDP";
  url: string;
  asin?: string;
  sku?: string;
  rating?: string;
  reviewCount?: number;
  heliumScore?: string;
  monthlySales?: number;
  price?: string;
  stock?: number;
  badge?: string;
};

type StoneSeed = {
  slug: string;
  name: string;
  productUrl: string;
  properties: string[];
  emotions: string[];
  goals: string[];
  chakra: string;
  visual: string;
  description: string;
  origin?: string;
  usage?: string;
  brand?: "Felicidade" | "Vera Mentis";
  compatibilities?: string[];
  incompatibilities?: string[];
  badge?: string;
};

const product = (name: string, url: string, brand: "Felicidade" | "Vera Mentis" = "Felicidade", badge?: string): Product => ({
  label: `Bracelet ${name}`,
  brand,
  url,
  badge: badge ?? "Produit direct"
});

const image = (slug: string, name: string) => ({
  url: `/images/stones/${slug}.png`,
  alt: `${name} en pierre naturelle`,
  credit: "Image generee par ChatGPT",
  sourceUrl: "/"
});

const createStone = (seed: StoneSeed): Stone => ({
  slug: seed.slug,
  name: seed.name,
  visual: seed.visual,
  origin: seed.origin ?? "Origines variables selon les gisements",
  description: seed.description,
  image: image(seed.slug, seed.name),
  properties: seed.properties,
  chakra: seed.chakra,
  emotions: seed.emotions,
  goals: seed.goals,
  usage:
    seed.usage ??
    `A porter en bracelet lorsque l'intention ${seed.goals[0] ?? "bien-etre"} est importante dans la journee.`,
  compatibilities: seed.compatibilities ?? ["cristal-de-roche", "quartz-rose", "labradorite"],
  incompatibilities: seed.incompatibilities ?? [],
  purification: "Fumigation douce, son ou repos sur fleur de vie. Eviter les methodes agressives sans verifier la durete de la pierre.",
  wear: "Bracelet au poignet selon le ressenti: main gauche pour accueillir, main droite pour agir.",
  products: [product(seed.name, seed.productUrl, seed.brand, seed.badge)]
});

const seeds: StoneSeed[] = [
  {
    slug: "labradorite-foncee-larvikite",
    name: "Labradorite foncee (Larvikite)",
    productUrl: "https://amzn.eu/d/01zLtXoD",
    properties: ["protection", "stabilite", "ancrage", "intuition"],
    emotions: ["stress", "peur", "surcharge mentale", "dispersion"],
    goals: ["protection", "stabilite", "confiance"],
    chakra: "Racine / Troisieme oeil",
    visual: "Noir gris profond, reflets argentés ou bleutes, presence tres ancree.",
    description: "Pierre associee a la protection calme, aux limites personnelles et a la stabilite interieure.",
    brand: "Vera Mentis",
    badge: "Protection stable"
  },
  {
    slug: "apatite-bleue",
    name: "Apatite bleue",
    productUrl: "https://amzn.eu/d/09lQ0omu",
    properties: ["expression", "clarte", "motivation", "serenite"],
    emotions: ["blocage", "doute", "stress", "tristesse"],
    goals: ["clarte", "communication", "motivation"],
    chakra: "Gorge",
    visual: "Bleu profond a turquoise, lumineux et frais.",
    description: "Traditionnellement reliee a l'expression personnelle, a la clarte et a l'envie d'avancer.",
    badge: "Clarte & expression"
  },
  {
    slug: "labradorite",
    name: "Labradorite",
    productUrl: "https://amzn.eu/d/03nqLs0J",
    properties: ["protection", "intuition", "recuperation", "frontieres"],
    emotions: ["fatigue", "stress", "surcharge mentale", "empathie excessive"],
    goals: ["protection", "equilibre", "spiritualite"],
    chakra: "Troisieme oeil",
    visual: "Gris sombre avec reflets bleus, verts ou dores.",
    description: "Pierre de protection symbolique, souvent choisie pour les personnes sensibles aux ambiances.",
    brand: "Vera Mentis",
    badge: "Protection intuitive"
  },
  {
    slug: "obsidienne-oeil-celeste",
    name: "Obsidienne oeil celeste",
    productUrl: "https://amzn.eu/d/0gmfb5rl",
    properties: ["protection", "verite", "ancrage", "liberation"],
    emotions: ["peur", "colere", "stress", "blocage"],
    goals: ["protection", "courage", "clarte"],
    chakra: "Racine",
    visual: "Noir profond avec reflets circulaires subtils.",
    description: "Pierre intense, traditionnellement associee a la protection et au retour a soi.",
    incompatibilities: ["quartz-rose"],
    badge: "Protection forte"
  },
  {
    slug: "calcedoine-bleue",
    name: "Calcedoine bleue",
    productUrl: "https://amzn.eu/d/01234ZUc",
    properties: ["douceur", "communication", "apaisement", "harmonie"],
    emotions: ["stress", "colere", "hypersensibilite"],
    goals: ["serenite", "communication", "relations"],
    chakra: "Gorge",
    visual: "Bleu pale laiteux, texture douce et rassurante.",
    description: "Pierre associee a la parole douce, a l'apaisement emotionnel et a l'harmonie.",
    brand: "Vera Mentis",
    badge: "Apaisement relationnel"
  },
  {
    slug: "oeil-de-tigre",
    name: "Oeil de tigre",
    productUrl: "https://amzn.eu/d/0gcKGhLS",
    properties: ["confiance", "courage", "ancrage", "decision"],
    emotions: ["peur", "doute", "stress"],
    goals: ["confiance", "argent", "reussite", "protection"],
    chakra: "Plexus solaire",
    visual: "Bandes brunes, dorees et lumineuses a effet chatoyant.",
    description: "Pierre associee a la confiance, a l'ancrage et au passage a l'action.",
    compatibilities: ["jaspe-rouge", "cornaline", "onyx"],
    incompatibilities: ["quartz-rose"],
    badge: "Confiance & force"
  },
  {
    slug: "jaspe-rouge",
    name: "Jaspe rouge",
    productUrl: "https://amzn.eu/d/06Ckfi9B",
    properties: ["ancrage", "courage", "vitalite", "stabilite"],
    emotions: ["fatigue", "peur", "dispersion"],
    goals: ["energie", "ancrage", "courage"],
    chakra: "Racine",
    visual: "Rouge terreux, dense et chaleureux.",
    description: "Pierre d'ancrage traditionnellement reliee a la force tranquille et a l'endurance.",
    badge: "Ancrage"
  },
  {
    slug: "quartz-rose",
    name: "Quartz rose",
    productUrl: "https://amzn.eu/d/04WjJOpA",
    properties: ["amour", "douceur", "reconfort", "acceptation"],
    emotions: ["tristesse", "solitude", "colere", "stress"],
    goals: ["amour", "confiance", "relations"],
    chakra: "Coeur",
    visual: "Rose pale laiteux, doux et lumineux.",
    description: "Symbole de tendresse, d'amour de soi et de reconfort.",
    compatibilities: ["amethyste", "aventurine-verte", "rhodonite"],
    incompatibilities: ["obsidienne-oeil-celeste"],
    badge: "Amour & douceur"
  },
  {
    slug: "agate-du-botswana",
    name: "Agate du Botswana",
    productUrl: "https://amzn.eu/d/0cuJCJKe",
    properties: ["stabilite", "reconfort", "patience", "transition"],
    emotions: ["tristesse", "stress", "confusion"],
    goals: ["stabilite", "apaisement", "changement"],
    chakra: "Racine",
    visual: "Bandes grises, roses ou brunes, aspect doux et stratifie.",
    description: "Pierre traditionnellement associee aux periodes de transition et au reconfort progressif.",
    badge: "Transitions"
  },
  {
    slug: "jade-emeraude",
    name: "Jade emeraude",
    productUrl: "https://amzn.eu/d/0bjy729l",
    properties: ["harmonie", "chance", "coeur", "equilibre"],
    emotions: ["stress", "jalousie", "agitation"],
    goals: ["amour", "abondance", "equilibre"],
    chakra: "Coeur",
    visual: "Vert intense a emeraude, aspect elegant et protecteur.",
    description: "Pierre associee a l'harmonie, a la chance symbolique et a l'equilibre du coeur.",
    badge: "Harmonie"
  },
  {
    slug: "fluorite",
    name: "Fluorite",
    productUrl: "https://amzn.eu/d/0gLFmf2t",
    properties: ["clarte", "organisation", "focus", "discernement"],
    emotions: ["confusion", "surcharge mentale", "dispersion"],
    goals: ["clarte", "focus", "decision"],
    chakra: "Troisieme oeil",
    visual: "Bandes vertes, violettes ou translucides, tres structurees.",
    description: "Pierre traditionnellement associee a l'ordre mental, au tri et a la concentration.",
    badge: "Focus"
  },
  {
    slug: "howlite",
    name: "Howlite",
    productUrl: "https://amzn.eu/d/0gJSNeon",
    properties: ["calme", "patience", "sommeil", "relachement"],
    emotions: ["stress", "colere", "anxiete"],
    goals: ["sommeil", "serenite", "patience"],
    chakra: "Couronne",
    visual: "Blanc veine de gris, sobre et mineral.",
    description: "Pierre douce, souvent associee a la patience, au sommeil et au ralentissement.",
    badge: "Calme"
  },
  {
    slug: "angelite",
    name: "Angelite",
    productUrl: "https://amzn.eu/d/00a0r4Pn",
    properties: ["paix", "douceur", "spiritualite", "reconfort"],
    emotions: ["tristesse", "solitude", "stress"],
    goals: ["serenite", "spiritualite", "reconfort"],
    chakra: "Gorge / Couronne",
    visual: "Bleu tres pale, doux et presque celeste.",
    description: "Pierre associee a la paix interieure, au reconfort et a la douceur spirituelle.",
    badge: "Paix interieure"
  },
  {
    slug: "lapis-lazuli",
    name: "Lapis lazuli",
    productUrl: "https://amzn.eu/d/0f9b1aSP",
    properties: ["verite", "expression", "sagesse", "confiance"],
    emotions: ["doute", "blocage", "peur"],
    goals: ["communication", "confiance", "clarte"],
    chakra: "Gorge / Troisieme oeil",
    visual: "Bleu royal, parfois parseme de pyrite doree.",
    description: "Pierre symbolique de verite, de parole juste et de confiance dans son expression.",
    badge: "Expression"
  },
  {
    slug: "labradorite-de-madagascar",
    name: "Labradorite de Madagascar",
    productUrl: "https://amzn.eu/d/0jbrLvpi",
    properties: ["protection", "intuition", "elegance", "recuperation"],
    emotions: ["fatigue", "stress", "hypersensibilite"],
    goals: ["protection", "intuition", "equilibre"],
    chakra: "Troisieme oeil",
    visual: "Reflets bleus ou verts lumineux, aspect premium.",
    description: "Variante de labradorite recherchee pour ses reflets et sa symbolique protectrice.",
    brand: "Vera Mentis",
    badge: "Madagascar"
  },
  {
    slug: "rhodonite",
    name: "Rhodonite",
    productUrl: "https://amzn.eu/d/0dRHPu8I",
    properties: ["coeur", "reparation", "pardon", "securite affective"],
    emotions: ["tristesse", "colere", "blessure affective", "solitude"],
    goals: ["amour", "relations", "reconfort"],
    chakra: "Coeur",
    visual: "Rose soutenu veine de noir, presence forte et tendre.",
    description: "Pierre du coeur blesse, traditionnellement associee a la reparation emotionnelle.",
    compatibilities: ["quartz-rose", "aventurine-verte", "cristal-de-roche"],
    badge: "Coeur blesse"
  },
  {
    slug: "aventurine-verte",
    name: "Aventurine verte",
    productUrl: "https://amzn.eu/d/0jgKsV3H",
    properties: ["chance", "coeur", "croissance", "apaisement"],
    emotions: ["stress", "doute", "frustration"],
    goals: ["abondance", "amour", "opportunite"],
    chakra: "Coeur",
    visual: "Vert tendre avec eclats subtils.",
    description: "Pierre traditionnellement associee a l'ouverture du coeur, a la chance et aux nouveaux departs.",
    badge: "Chance douce"
  },
  {
    slug: "sodalite-du-bresil",
    name: "Sodalite du Bresil",
    productUrl: "https://amzn.eu/d/00ImK7Yk",
    properties: ["logique", "calme mental", "expression", "clarte"],
    emotions: ["surcharge mentale", "stress", "confusion"],
    goals: ["clarte", "focus", "communication"],
    chakra: "Gorge / Troisieme oeil",
    visual: "Bleu profond veine de blanc.",
    description: "Pierre associee a la clarte intellectuelle, au calme mental et a l'expression posee.",
    badge: "Mental clair"
  },
  {
    slug: "lepidolite",
    name: "Lepidolite",
    productUrl: "https://amzn.eu/d/09MOxfGm",
    properties: ["apaisement", "transition", "relachement", "sommeil"],
    emotions: ["anxiete", "stress", "tristesse"],
    goals: ["serenite", "sommeil", "changement"],
    chakra: "Coeur / Couronne",
    visual: "Violet pale a lilas, texture douce.",
    description: "Pierre traditionnellement reliee a l'apaisement, aux transitions et au repos interieur.",
    badge: "Apaisement profond"
  },
  {
    slug: "jaspe",
    name: "Jaspe",
    productUrl: "https://amzn.eu/d/0iNjLB8L",
    properties: ["ancrage", "stabilite", "endurance", "presence"],
    emotions: ["dispersion", "fatigue", "stress"],
    goals: ["ancrage", "energie", "constance"],
    chakra: "Racine",
    visual: "Variations terreuses, rouges, brunes ou ocres.",
    description: "Famille de pierres associee a l'ancrage, a la stabilite et a la presence au quotidien.",
    badge: "Stabilite"
  },
  {
    slug: "onyx",
    name: "Onyx",
    productUrl: "https://amzn.eu/d/0aGhOHac",
    properties: ["force", "discipline", "protection", "ancrage"],
    emotions: ["peur", "doute", "dispersion"],
    goals: ["protection", "discipline", "confiance"],
    chakra: "Racine",
    visual: "Noir profond, lisse et sobre.",
    description: "Pierre associee a la force interieure, a la discipline et a la protection symbolique.",
    incompatibilities: ["quartz-rose"],
    badge: "Force calme"
  },
  {
    slug: "pierre-de-lune",
    name: "Pierre de lune",
    productUrl: "https://amzn.eu/d/0h4MtOHt",
    properties: ["intuition", "feminin", "cycles", "douceur"],
    emotions: ["hypersensibilite", "tristesse", "stress"],
    goals: ["intuition", "amour", "equilibre"],
    chakra: "Sacre / Couronne",
    visual: "Blanc nacre, reflets doux et lunaires.",
    description: "Pierre associee aux cycles, a l'intuition et a la douceur emotionnelle.",
    badge: "Intuition"
  },
  {
    slug: "chrysoprase-citron",
    name: "Chrysoprase citron",
    productUrl: "https://amzn.eu/d/0dTyJSbX",
    properties: ["renouveau", "joie", "coeur", "optimisme"],
    emotions: ["tristesse", "fatigue", "frustration"],
    goals: ["joie", "amour", "renouveau"],
    chakra: "Coeur",
    visual: "Vert citron lumineux, frais et vivant.",
    description: "Pierre associee au renouveau, a la joie douce et a l'ouverture du coeur.",
    badge: "Renouveau"
  },
  {
    slug: "grenat",
    name: "Grenat",
    productUrl: "https://amzn.eu/d/09r5D11i",
    properties: ["energie", "passion", "courage", "vitalite"],
    emotions: ["fatigue", "blocage", "demotivation"],
    goals: ["energie", "confiance", "desir"],
    chakra: "Racine",
    visual: "Rouge profond, parfois sombre et intense.",
    description: "Pierre associee a la vitalite, au courage et au feu interieur.",
    badge: "Energie intense"
  },
  {
    slug: "cristal-de-roche",
    name: "Cristal de roche",
    productUrl: "https://amzn.eu/d/05I8kdHa",
    properties: ["clarte", "amplification", "neutralite", "focus"],
    emotions: ["confusion", "surcharge mentale"],
    goals: ["clarte", "spiritualite", "focus"],
    chakra: "Tous chakras",
    visual: "Transparent a blanc, eclat clair et neutre.",
    description: "Pierre d'amplification symbolique, souvent utilisee pour clarifier une intention.",
    compatibilities: ["quartz-rose", "labradorite", "oeil-de-tigre"],
    badge: "Amplificateur"
  },
  {
    slug: "turquoise",
    name: "Turquoise",
    productUrl: "https://amzn.eu/d/0hGqPisd",
    properties: ["protection", "communication", "voyage", "apaisement"],
    emotions: ["stress", "peur", "blocage"],
    goals: ["protection", "communication", "serenite"],
    chakra: "Gorge",
    visual: "Bleu turquoise a vert, veines minerales sombres.",
    description: "Pierre associee a la protection, a la parole vraie et a l'apaisement.",
    badge: "Protection douce"
  },
  {
    slug: "cornaline",
    name: "Cornaline",
    productUrl: "https://amzn.eu/d/0ekcqK2r",
    properties: ["vitalite", "creation", "desir", "elan"],
    emotions: ["fatigue", "blocage", "demotivation"],
    goals: ["energie", "creativite", "confiance"],
    chakra: "Sacre",
    visual: "Orange chaud a rouge translucide.",
    description: "Pierre traditionnellement liee a la vitalite, a la creativite et a l'expression personnelle.",
    compatibilities: ["oeil-de-tigre", "grenat", "jaspe-rouge"],
    incompatibilities: ["amethyste"],
    badge: "Vitalite"
  },
  {
    slug: "calcite-jaune",
    name: "Calcite jaune",
    productUrl: "https://amzn.eu/d/0cs2tF8H",
    properties: ["optimisme", "confiance", "energie douce", "clarte"],
    emotions: ["fatigue", "doute", "demotivation"],
    goals: ["confiance", "energie", "reussite"],
    chakra: "Plexus solaire",
    visual: "Jaune lumineux, doux et solaire.",
    description: "Pierre associee a l'optimisme, a la confiance et au rayonnement personnel.",
    badge: "Solaire"
  },
  {
    slug: "pierre-de-soleil",
    name: "Pierre de soleil",
    productUrl: "https://amzn.eu/d/0iE8Hf1Q",
    properties: ["joie", "confiance", "rayonnement", "elan"],
    emotions: ["fatigue", "tristesse", "doute"],
    goals: ["confiance", "joie", "reussite"],
    chakra: "Plexus solaire",
    visual: "Orange dore, reflets lumineux et chaleureux.",
    description: "Pierre associee a la joie, au rayonnement personnel et a l'envie d'avancer.",
    badge: "Rayonnement"
  }
];

export const stones: Stone[] = seeds.map(createStone);

export const getStone = (slug: string) => stones.find((stone) => stone.slug === slug);
