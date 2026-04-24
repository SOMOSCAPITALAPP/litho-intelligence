export type Stone = {
  id: string;
  slug: string;
  name: string;
  category: string;
  visual: string;
  origin: string;
  origins: string[];
  colors: string[];
  description: string;
  image: {
    url: string;
    alt: string;
    credit: string;
    sourceUrl: string;
  };
  properties: string[];
  chakra: string;
  chakraList: string[];
  elements: string[];
  emotions: string[];
  intentions: string[];
  goals: string[];
  usage: string;
  usageTips: string[];
  rituals: string[];
  compatibilities: string[];
  incompatibilities: string[];
  combinations_positive: string[];
  combinations_negative: string[];
  purification: string;
  purificationMethods: string[];
  recharge: string[];
  price_range: string;
  seo_keywords: string[];
  scores: Record<string, number>;
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
  productUrl?: string;
  category?: string;
  properties: string[];
  emotions: string[];
  goals: string[];
  chakra: string;
  chakraList?: string[];
  elements?: string[];
  visual: string;
  description: string;
  origin?: string;
  origins?: string[];
  colors?: string[];
  usage?: string;
  usageTips?: string[];
  rituals?: string[];
  purificationMethods?: string[];
  recharge?: string[];
  price_range?: string;
  seo_keywords?: string[];
  scores?: Record<string, number>;
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
  credit: "Image générée par ChatGPT",
  sourceUrl: "/"
});

const createStone = (seed: StoneSeed): Stone => ({
  id: seed.slug,
  slug: seed.slug,
  name: seed.name,
  category: seed.category ?? seed.goals[0] ?? "bien-être",
  visual: seed.visual,
  origin: seed.origin ?? "Origines variables selon les gisements",
  origins: seed.origins ?? [seed.origin ?? "Origines variables selon les gisements"],
  colors: seed.colors ?? [],
  description: seed.description,
  image: image(seed.slug, seed.name),
  properties: seed.properties,
  chakra: seed.chakra,
  chakraList: seed.chakraList ?? seed.chakra.split("/").map((item) => item.trim()),
  elements: seed.elements ?? [],
  emotions: seed.emotions,
  intentions: seed.goals,
  goals: seed.goals,
  usage:
    seed.usage ??
    `À porter en bracelet lorsque l'intention ${seed.goals[0] ?? "bien-être"} est importante dans la journée.`,
  usageTips:
    seed.usageTips ??
    [
      "Porter en bracelet pendant la journée.",
      "Tenir la pierre quelques minutes avant une décision ou un moment sensible."
    ],
  rituals:
    seed.rituals ??
    [
      "Respirer profondément en tenant la pierre.",
      "Formuler une intention courte, concrète et positive."
    ],
  compatibilities: seed.compatibilities ?? ["cristal-de-roche", "quartz-rose", "labradorite"],
  incompatibilities: seed.incompatibilities ?? [],
  combinations_positive: seed.compatibilities ?? ["cristal-de-roche", "quartz-rose", "labradorite"],
  combinations_negative: seed.incompatibilities ?? [],
  purification: "Fumigation douce, son ou repos sur fleur de vie. Éviter les méthodes agressives sans vérifier la dureté de la pierre.",
  purificationMethods: seed.purificationMethods ?? ["fumigation", "son", "lune"],
  recharge: seed.recharge ?? ["lune", "géode de quartz"],
  price_range: seed.price_range ?? "10-30€",
  seo_keywords:
    seed.seo_keywords ??
    [`${seed.name.toLowerCase()} signification`, `${seed.name.toLowerCase()} bracelet`, `pierre ${seed.goals[0] ?? "bien-être"}`],
  scores: seed.scores ?? {},
  wear: "Bracelet au poignet selon le ressenti : main gauche pour accueillir, main droite pour agir.",
  products: seed.productUrl ? [product(seed.name, seed.productUrl, seed.brand, seed.badge)] : []
});

const seeds: StoneSeed[] = [
  {
    slug: "labradorite-foncee-larvikite",
    name: "Labradorite foncée (Larvikite)",
    productUrl: "https://amzn.eu/d/01zLtXoD",
    properties: ["protection", "stabilité", "ancrage", "intuition"],
    emotions: ["stress", "peur", "surcharge mentale", "dispersion"],
    goals: ["protection", "stabilité", "confiance"],
    chakra: "Racine / Troisième œil",
    visual: "Noir gris profond, reflets argentés ou bleutés, présence très ancrée.",
    description: "Pierre associée à la protection calme, aux limites personnelles et à la stabilité intérieure.",
    brand: "Vera Mentis",
    badge: "Protection stable"
  },
  {
    slug: "apatite-bleue",
    name: "Apatite bleue",
    productUrl: "https://amzn.eu/d/09lQ0omu",
    properties: ["expression", "clarté", "motivation", "sérénité"],
    emotions: ["blocage", "doute", "stress", "tristesse"],
    goals: ["clarté", "communication", "motivation"],
    chakra: "Gorge",
    visual: "Bleu profond à turquoise, lumineux et frais.",
    description: "Traditionnellement reliée à l'expression personnelle, à la clarté et à l'envie d'avancer.",
    badge: "Clarté & expression"
  },
  {
    slug: "labradorite",
    name: "Labradorite",
    productUrl: "https://amzn.eu/d/03nqLs0J",
    properties: ["protection", "intuition", "récupération", "frontières"],
    emotions: ["fatigue", "stress", "surcharge mentale", "empathie excessive"],
    goals: ["protection", "équilibre", "spiritualité"],
    chakra: "Troisième œil",
    visual: "Gris sombre avec reflets bleus, verts ou dorés.",
    description: "Pierre de protection symbolique, souvent choisie pour les personnes sensibles aux ambiances.",
    brand: "Vera Mentis",
    badge: "Protection intuitive"
  },
  {
    slug: "obsidienne-oeil-celeste",
    name: "Obsidienne œil céleste",
    productUrl: "https://amzn.eu/d/0gmfb5rl",
    properties: ["protection", "vérité", "ancrage", "libération"],
    emotions: ["peur", "colère", "stress", "blocage"],
    goals: ["protection", "courage", "clarté"],
    chakra: "Racine",
    visual: "Noir profond avec reflets circulaires subtils.",
    description: "Pierre intense, traditionnellement associée à la protection et au retour à soi.",
    incompatibilities: ["quartz-rose"],
    badge: "Protection forte"
  },
  {
    slug: "calcedoine-bleue",
    name: "Calcédoine bleue",
    productUrl: "https://amzn.eu/d/01234ZUc",
    properties: ["douceur", "communication", "apaisement", "harmonie"],
    emotions: ["stress", "colère", "hypersensibilité"],
    goals: ["sérénité", "communication", "relations"],
    chakra: "Gorge",
    visual: "Bleu pâle laiteux, texture douce et rassurante.",
    description: "Pierre associée à la parole douce, à l'apaisement émotionnel et à l'harmonie.",
    brand: "Vera Mentis",
    badge: "Apaisement relationnel"
  },
  {
    slug: "oeil-de-tigre",
    name: "Œil de tigre",
    productUrl: "https://amzn.eu/d/0gcKGhLS",
    properties: ["confiance", "courage", "ancrage", "décision"],
    emotions: ["peur", "doute", "stress"],
    goals: ["confiance", "argent", "réussite", "protection"],
    chakra: "Plexus solaire",
    visual: "Bandes brunes, dorées et lumineuses à effet chatoyant.",
    description: "Pierre associée à la confiance, à l'ancrage et au passage à l'action.",
    compatibilities: ["jaspe-rouge", "cornaline", "onyx"],
    incompatibilities: ["quartz-rose"],
    badge: "Confiance & force"
  },
  {
    slug: "jaspe-rouge",
    name: "Jaspe rouge",
    productUrl: "https://amzn.eu/d/06Ckfi9B",
    properties: ["ancrage", "courage", "vitalité", "stabilité"],
    emotions: ["fatigue", "peur", "dispersion"],
    goals: ["énergie", "ancrage", "courage"],
    chakra: "Racine",
    visual: "Rouge terreux, dense et chaleureux.",
    description: "Pierre d'ancrage traditionnellement reliée à la force tranquille et à l'endurance.",
    badge: "Ancrage"
  },
  {
    slug: "quartz-rose",
    name: "Quartz rose",
    productUrl: "https://amzn.eu/d/04WjJOpA",
    properties: ["amour", "douceur", "réconfort", "acceptation"],
    emotions: ["tristesse", "solitude", "colère", "stress"],
    goals: ["amour", "confiance", "relations"],
    chakra: "Cœur",
    visual: "Rose pâle laiteux, doux et lumineux.",
    description: "Symbole de tendresse, d'amour de soi et de réconfort.",
    compatibilities: ["améthyste", "aventurine-verte", "rhodonite"],
    incompatibilities: ["obsidienne-oeil-celeste"],
    badge: "Amour & douceur"
  },
  {
    slug: "agate-du-botswana",
    name: "Agate du Botswana",
    productUrl: "https://amzn.eu/d/0cuJCJKe",
    properties: ["stabilité", "réconfort", "patience", "transition"],
    emotions: ["tristesse", "stress", "confusion"],
    goals: ["stabilité", "apaisement", "changement"],
    chakra: "Racine",
    visual: "Bandes grises, roses ou brunes, aspect doux et stratifié.",
    description: "Pierre traditionnellement associée aux périodes de transition et au réconfort progressif.",
    badge: "Transitions"
  },
  {
    slug: "jade-emeraude",
    name: "Jade émeraude",
    productUrl: "https://amzn.eu/d/0bjy729l",
    properties: ["harmonie", "chance", "cœur", "équilibre"],
    emotions: ["stress", "jalousie", "agitation"],
    goals: ["amour", "abondance", "équilibre"],
    chakra: "Cœur",
    visual: "Vert intense à émeraude, aspect élégant et protecteur.",
    description: "Pierre associée à l'harmonie, à la chance symbolique et à l'équilibre du cœur.",
    badge: "Harmonie"
  },
  {
    slug: "fluorite",
    name: "Fluorite",
    productUrl: "https://amzn.eu/d/0gLFmf2t",
    properties: ["clarté", "organisation", "focus", "discernement"],
    emotions: ["confusion", "surcharge mentale", "dispersion"],
    goals: ["clarté", "focus", "décision"],
    chakra: "Troisième œil",
    visual: "Bandes vertes, violettes ou translucides, très structurées.",
    description: "Pierre traditionnellement associée à l'ordre mental, au tri et à la concentration.",
    badge: "Focus"
  },
  {
    slug: "howlite",
    name: "Howlite",
    productUrl: "https://amzn.eu/d/0gJSNeon",
    properties: ["calme", "patience", "sommeil", "relâchement"],
    emotions: ["stress", "colère", "anxiété"],
    goals: ["sommeil", "sérénité", "patience"],
    chakra: "Couronne",
    visual: "Blanc veiné de gris, sobre et minéral.",
    description: "Pierre douce, souvent associée à la patience, au sommeil et au ralentissement.",
    badge: "Calme"
  },
  {
    slug: "angelite",
    name: "Angélite",
    productUrl: "https://amzn.eu/d/00a0r4Pn",
    properties: ["paix", "douceur", "spiritualité", "réconfort"],
    emotions: ["tristesse", "solitude", "stress"],
    goals: ["sérénité", "spiritualité", "réconfort"],
    chakra: "Gorge / Couronne",
    visual: "Bleu très pâle, doux et presque céleste.",
    description: "Pierre associée à la paix intérieure, au réconfort et à la douceur spirituelle.",
    badge: "Paix intérieure"
  },
  {
    slug: "lapis-lazuli",
    name: "Lapis lazuli",
    productUrl: "https://amzn.eu/d/0f9b1aSP",
    properties: ["vérité", "expression", "sagesse", "confiance"],
    emotions: ["doute", "blocage", "peur"],
    goals: ["communication", "confiance", "clarté"],
    chakra: "Gorge / Troisième œil",
    visual: "Bleu royal, parfois parsemé de pyrite dorée.",
    description: "Pierre symbolique de vérité, de parole juste et de confiance dans son expression.",
    badge: "Expression"
  },
  {
    slug: "labradorite-de-madagascar",
    name: "Labradorite de Madagascar",
    productUrl: "https://amzn.eu/d/0jbrLvpi",
    properties: ["protection", "intuition", "élégance", "récupération"],
    emotions: ["fatigue", "stress", "hypersensibilité"],
    goals: ["protection", "intuition", "équilibre"],
    chakra: "Troisième œil",
    visual: "Reflets bleus ou verts lumineux, aspect premium.",
    description: "Variante de labradorite recherchée pour ses reflets et sa symbolique protectrice.",
    brand: "Vera Mentis",
    badge: "Madagascar"
  },
  {
    slug: "rhodonite",
    name: "Rhodonite",
    productUrl: "https://amzn.eu/d/0dRHPu8I",
    properties: ["cœur", "réparation", "pardon", "sécurité affective"],
    emotions: ["tristesse", "colère", "blessure affective", "solitude"],
    goals: ["amour", "relations", "réconfort"],
    chakra: "Cœur",
    visual: "Rose soutenu veiné de noir, présence forte et tendre.",
    description: "Pierre du cœur blessé, traditionnellement associée à la réparation émotionnelle.",
    compatibilities: ["quartz-rose", "aventurine-verte", "cristal-de-roche"],
    badge: "Cœur blessé"
  },
  {
    slug: "aventurine-verte",
    name: "Aventurine verte",
    productUrl: "https://amzn.eu/d/0jgKsV3H",
    properties: ["chance", "cœur", "croissance", "apaisement"],
    emotions: ["stress", "doute", "frustration"],
    goals: ["abondance", "amour", "opportunité"],
    chakra: "Cœur",
    visual: "Vert tendre avec éclats subtils.",
    description: "Pierre traditionnellement associée à l'ouverture du cœur, à la chance et aux nouveaux départs.",
    badge: "Chance douce"
  },
  {
    slug: "sodalite-du-bresil",
    name: "Sodalite du Brésil",
    productUrl: "https://amzn.eu/d/00ImK7Yk",
    properties: ["logique", "calme mental", "expression", "clarté"],
    emotions: ["surcharge mentale", "stress", "confusion"],
    goals: ["clarté", "focus", "communication"],
    chakra: "Gorge / Troisième œil",
    visual: "Bleu profond veine de blanc.",
    description: "Pierre associée à la clarté intellectuelle, au calme mental et à l'expression posée.",
    badge: "Mental clair"
  },
  {
    slug: "lepidolite",
    name: "Lépidolite",
    productUrl: "https://amzn.eu/d/09MOxfGm",
    properties: ["apaisement", "transition", "relâchement", "sommeil"],
    emotions: ["anxiété", "stress", "tristesse"],
    goals: ["sérénité", "sommeil", "changement"],
    chakra: "Cœur / Couronne",
    visual: "Violet pâle à lilas, texture douce.",
    description: "Pierre traditionnellement reliée à l'apaisement, aux transitions et au repos intérieur.",
    badge: "Apaisement profond"
  },
  {
    slug: "jaspe",
    name: "Jaspe",
    productUrl: "https://amzn.eu/d/0iNjLB8L",
    properties: ["ancrage", "stabilité", "endurance", "présence"],
    emotions: ["dispersion", "fatigue", "stress"],
    goals: ["ancrage", "énergie", "constance"],
    chakra: "Racine",
    visual: "Variations terreuses, rouges, brunes ou ocres.",
    description: "Famille de pierres associée à l'ancrage, à la stabilité et à la présence au quotidien.",
    badge: "Stabilité"
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
    description: "Pierre associée à la force intérieure, à la discipline et à la protection symbolique.",
    incompatibilities: ["quartz-rose"],
    badge: "Force calme"
  },
  {
    slug: "pierre-de-lune",
    name: "Pierre de lune",
    productUrl: "https://amzn.eu/d/0h4MtOHt",
    properties: ["intuition", "féminin", "cycles", "douceur"],
    emotions: ["hypersensibilité", "tristesse", "stress"],
    goals: ["intuition", "amour", "équilibre"],
    chakra: "Sacré / Couronne",
    visual: "Blanc nacré, reflets doux et lunaires.",
    description: "Pierre associée aux cycles, à l'intuition et à la douceur émotionnelle.",
    badge: "Intuition"
  },
  {
    slug: "chrysoprase-citron",
    name: "Chrysoprase citron",
    productUrl: "https://amzn.eu/d/0dTyJSbX",
    properties: ["renouveau", "joie", "cœur", "optimisme"],
    emotions: ["tristesse", "fatigue", "frustration"],
    goals: ["joie", "amour", "renouveau"],
    chakra: "Cœur",
    visual: "Vert citron lumineux, frais et vivant.",
    description: "Pierre associée au renouveau, à la joie douce et à l'ouverture du cœur.",
    badge: "Renouveau"
  },
  {
    slug: "grenat",
    name: "Grenat",
    productUrl: "https://amzn.eu/d/09r5D11i",
    properties: ["énergie", "passion", "courage", "vitalité"],
    emotions: ["fatigue", "blocage", "démotivation"],
    goals: ["énergie", "confiance", "désir"],
    chakra: "Racine",
    visual: "Rouge profond, parfois sombre et intense.",
    description: "Pierre associée à la vitalité, au courage et au feu intérieur.",
    badge: "Énergie intense"
  },
  {
    slug: "cristal-de-roche",
    name: "Cristal de roche",
    productUrl: "https://amzn.eu/d/05I8kdHa",
    properties: ["clarté", "amplification", "neutralité", "focus"],
    emotions: ["confusion", "surcharge mentale"],
    goals: ["clarté", "spiritualité", "focus"],
    chakra: "Tous chakras",
    visual: "Transparent à blanc, éclat clair et neutre.",
    description: "Pierre d'amplification symbolique, souvent utilisée pour clarifier une intention.",
    compatibilities: ["quartz-rose", "labradorite", "oeil-de-tigre"],
    badge: "Amplificateur"
  },
  {
    slug: "turquoise",
    name: "Turquoise",
    productUrl: "https://amzn.eu/d/0hGqPisd",
    properties: ["protection", "communication", "voyage", "apaisement"],
    emotions: ["stress", "peur", "blocage"],
    goals: ["protection", "communication", "sérénité"],
    chakra: "Gorge",
    visual: "Bleu turquoise à vert, veines minérales sombres.",
    description: "Pierre associée à la protection, à la parole vraie et à l'apaisement.",
    badge: "Protection douce"
  },
  {
    slug: "cornaline",
    name: "Cornaline",
    productUrl: "https://amzn.eu/d/0ekcqK2r",
    properties: ["vitalité", "création", "désir", "élan"],
    emotions: ["fatigue", "blocage", "démotivation"],
    goals: ["énergie", "créativité", "confiance"],
    chakra: "Sacré",
    visual: "Orange chaud à rouge translucide.",
    description: "Pierre traditionnellement liée à la vitalité, à la créativité et à l'expression personnelle.",
    compatibilities: ["oeil-de-tigre", "grenat", "jaspe-rouge"],
    incompatibilities: ["améthyste"],
    badge: "Vitalité"
  },
  {
    slug: "calcite-jaune",
    name: "Calcite jaune",
    productUrl: "https://amzn.eu/d/0cs2tF8H",
    properties: ["optimisme", "confiance", "énergie douce", "clarté"],
    emotions: ["fatigue", "doute", "démotivation"],
    goals: ["confiance", "énergie", "réussite"],
    chakra: "Plexus solaire",
    visual: "Jaune lumineux, doux et solaire.",
    description: "Pierre associée à l'optimisme, à la confiance et au rayonnement personnel.",
    badge: "Solaire"
  },
  {
    slug: "pierre-de-soleil",
    name: "Pierre de soleil",
    productUrl: "https://amzn.eu/d/0iE8Hf1Q",
    properties: ["joie", "confiance", "rayonnement", "élan"],
    emotions: ["fatigue", "tristesse", "doute"],
    goals: ["confiance", "joie", "réussite"],
    chakra: "Plexus solaire",
    visual: "Orange doré, reflets lumineux et chaleureux.",
    description: "Pierre associée à la joie, au rayonnement personnel et à l'envie d'avancer.",
    badge: "Rayonnement"
  },
  {
    slug: "obsidienne-noire",
    name: "Obsidienne noire",
    productUrl: "https://amzn.eu/d/0gmfb5rl",
    category: "protection",
    properties: ["protection", "ancrage", "lucidité", "limites"],
    emotions: ["peur", "colère", "stress", "blocage"],
    goals: ["protection", "ancrage", "clarté"],
    chakra: "Racine",
    visual: "Noir profond, dense, sobre et très ancré.",
    description: "Pierre traditionnellement associée à la protection, aux limites personnelles et au retour au réel.",
    compatibilities: ["tourmaline-noire", "jaspe-rouge", "cristal-de-roche"],
    incompatibilities: ["quartz-rose"],
    badge: "Protection"
  },
  {
    slug: "tourmaline-noire",
    name: "Tourmaline noire",
    category: "protection",
    properties: ["protection", "ancrage", "stabilité", "nettoyage symbolique"],
    emotions: ["stress", "peur", "dispersion", "surcharge"],
    goals: ["protection", "ancrage", "stabilité"],
    chakra: "Racine",
    visual: "Noir mat à strié, présence minérale très stable.",
    description: "Pierre de protection et d'ancrage, utilisée dans les traditions pour se sentir plus stable face aux influences extérieures.",
    compatibilities: ["obsidienne-noire", "jaspe-rouge", "quartz-clair"],
    badge: "Ancrage protecteur"
  },
  {
    slug: "citrine",
    name: "Citrine",
    category: "énergie",
    properties: ["motivation", "abondance", "optimisme", "confiance"],
    emotions: ["fatigue", "doute", "démotivation", "manque"],
    goals: ["énergie", "argent", "réussite", "confiance"],
    chakra: "Plexus solaire",
    visual: "Jaune doré à miel, lumière chaude et solaire.",
    description: "Pierre solaire associée à l'élan, à l'abondance symbolique et à la confiance dans l'action.",
    compatibilities: ["oeil-de-tigre", "cornaline", "pyrite"],
    badge: "Élan solaire"
  },
  {
    slug: "amethyste",
    name: "Améthyste",
    category: "calme",
    properties: ["calme", "spiritualité", "apaisement", "intuition"],
    emotions: ["stress", "anxiété", "confusion", "tension"],
    goals: ["sérénité", "sommeil", "spiritualité", "clarté"],
    chakra: "Troisième œil / Couronne",
    visual: "Violet translucide à profond, vibration douce et contemplative.",
    description: "Pierre traditionnellement associée au calme intérieur, à la méditation et à la clarté spirituelle.",
    compatibilities: ["quartz-rose", "quartz-clair", "labradorite"],
    incompatibilities: ["cornaline"],
    badge: "Calme profond"
  },
  {
    slug: "sodalite",
    name: "Sodalite",
    productUrl: "https://amzn.eu/d/00ImK7Yk",
    category: "calme",
    properties: ["calme mental", "logique", "expression", "clarté"],
    emotions: ["confusion", "stress", "surcharge mentale"],
    goals: ["clarté", "focus", "communication"],
    chakra: "Gorge / Troisième œil",
    visual: "Bleu profond veiné de blanc, aspect posé et structuré.",
    description: "Pierre associée à la clarté intellectuelle, au recul et à l'expression calme.",
    badge: "Mental clair"
  },
  {
    slug: "amazonite",
    name: "Amazonite",
    category: "équilibre",
    properties: ["équilibre", "communication", "apaisement", "authenticité"],
    emotions: ["stress", "frustration", "peur de dire", "tension relationnelle"],
    goals: ["équilibre", "communication", "sérénité"],
    chakra: "Cœur / Gorge",
    visual: "Vert d'eau à turquoise, doux et frais.",
    description: "Pierre d'apaisement relationnel, reliée aux traditions de parole authentique et de calme émotionnel.",
    compatibilities: ["quartz-rose", "calcedoine-bleue", "sodalite"],
    badge: "Parole apaisée"
  },
  {
    slug: "pyrite",
    name: "Pyrite",
    category: "puissance",
    properties: ["abondance", "structure", "action", "rayonnement"],
    emotions: ["doute", "manque", "démotivation"],
    goals: ["argent", "réussite", "confiance", "action"],
    chakra: "Plexus solaire",
    visual: "Doré métallique, géométrique et très lumineux.",
    description: "Pierre symbolique de structure, de prospérité et de passage à l'action.",
    compatibilities: ["citrine", "oeil-de-tigre", "grenat"],
    incompatibilities: ["labradorite"],
    badge: "Abondance"
  },
  {
    slug: "malachite",
    name: "Malachite",
    category: "puissance",
    properties: ["transformation", "courage", "cœur", "libération symbolique"],
    emotions: ["peur", "frustration", "blocage", "blessure affective"],
    goals: ["transformation", "courage", "amour", "protection"],
    chakra: "Cœur",
    visual: "Vert intense avec bandes concentriques hypnotiques.",
    description: "Pierre puissante des traditions, associée aux changements profonds et au courage émotionnel.",
    compatibilities: ["quartz-rose", "rhodonite", "tourmaline-noire"],
    badge: "Transformation"
  },
  {
    slug: "quartz-clair",
    name: "Quartz clair",
    productUrl: "https://amzn.eu/d/05I8kdHa",
    category: "équilibre",
    properties: ["clarté", "amplification", "neutralité", "harmonie"],
    emotions: ["confusion", "fatigue", "dispersion"],
    goals: ["clarté", "énergie", "spiritualité", "équilibre"],
    chakra: "Tous chakras",
    visual: "Transparent à blanc, éclat clair, pur et minimal.",
    description: "Pierre polyvalente utilisée pour clarifier une intention et amplifier symboliquement une pratique de bien-être.",
    compatibilities: ["amethyste", "quartz-rose", "labradorite"],
    badge: "Clarté"
  }
];

export const stones: Stone[] = seeds.map(createStone);

export const getStone = (slug: string) => stones.find((stone) => stone.slug === slug);
