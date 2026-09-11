export type TrendKeywordType =
  | "stone"
  | "intention"
  | "care"
  | "shopping"
  | "seasonal";

export type TrendKeywordPriority = 1 | 2 | 3;

export type TrendKeyword = {
  keyword: string;
  type: TrendKeywordType;
  priority: TrendKeywordPriority;
  articleAngle: string;
  relatedStoneSlugs?: string[];
  productStoneSlugs?: string[];
  internalLinks?: string[];
  complianceNote?: string;
};

export const trendEditorialWatchlist: TrendKeyword[] = [
  {
    keyword: "howlite",
    type: "stone",
    priority: 1,
    articleAngle:
      "Expliquer pourquoi la howlite revient souvent dans les recherches liées au calme, au sommeil et aux bijoux blancs faciles à porter.",
    relatedStoneSlugs: ["howlite", "amethyste", "quartz-rose"],
    productStoneSlugs: ["howlite"],
    internalLinks: ["/pierres/howlite", "/intention/sommeil", "/intention/stress"],
  },
  {
    keyword: "agate bleue",
    type: "stone",
    priority: 1,
    articleAngle:
      "Présenter l'agate bleue comme une pierre douce, décorative et symboliquement associée à l'apaisement de l'expression.",
    relatedStoneSlugs: ["agate-bleue", "quartz-rose", "amethyste"],
    productStoneSlugs: ["agate-bleue"],
    internalLinks: ["/pierres/agate-bleue", "/intention/stress"],
  },
  {
    keyword: "oeil de tigre",
    type: "stone",
    priority: 1,
    articleAngle:
      "Traiter l'oeil de tigre sous l'angle protection, confiance et choix d'un bracelet pour homme ou femme.",
    relatedStoneSlugs: ["oeil-de-tigre", "oeil-de-taureau", "obsidienne"],
    productStoneSlugs: ["oeil-de-tigre"],
    internalLinks: ["/pierres/oeil-de-tigre", "/intention/protection", "/boutique-pierres-naturelles"],
  },
  {
    keyword: "quartz rose",
    type: "stone",
    priority: 1,
    articleAngle:
      "Construire un guide amour de soi, cadeau et douceur relationnelle autour du quartz rose.",
    relatedStoneSlugs: ["quartz-rose", "jade-vert", "amethyste"],
    productStoneSlugs: ["quartz-rose"],
    internalLinks: ["/pierres/quartz-rose", "/intention/amour", "/idee-cadeau"],
  },
  {
    keyword: "labradorite",
    type: "stone",
    priority: 1,
    articleAngle:
      "Expliquer le succès de la labradorite dans les recherches protection, hypersensibilite et bracelet premium.",
    relatedStoneSlugs: ["labradorite", "tourmaline-noire", "obsidienne"],
    productStoneSlugs: ["labradorite", "labradorite-foncee-larvikite"],
    internalLinks: ["/pierres/labradorite", "/intention/hypersensibilite", "/intention/protection"],
  },
  {
    keyword: "amethyste",
    type: "stone",
    priority: 1,
    articleAngle:
      "Raconter l'amethyste comme pierre culturelle de calme, de rituel du soir et de cadeau accessible.",
    relatedStoneSlugs: ["amethyste", "howlite", "quartz-rose"],
    productStoneSlugs: ["amethyste"],
    internalLinks: ["/pierres/amethyste", "/intention/sommeil", "/intention/stress"],
  },
  {
    keyword: "pyrite",
    type: "stone",
    priority: 1,
    articleAngle:
      "Positionner la pyrite sur l'organisation, l'abondance symbolique et le bracelet de bureau.",
    relatedStoneSlugs: ["pyrite", "oeil-de-tigre", "citrine"],
    productStoneSlugs: ["pyrite"],
    internalLinks: ["/pierres/pyrite", "/intention/argent-abondance"],
  },
  {
    keyword: "pierre pour le stress",
    type: "intention",
    priority: 1,
    articleAngle:
      "Créer un guide journalistique sur les pierres traditionnellement associées au recentrage, sans promesse médicale.",
    relatedStoneSlugs: ["howlite", "amethyste", "quartz-rose", "labradorite"],
    productStoneSlugs: ["howlite", "amethyste", "quartz-rose"],
    internalLinks: ["/intention/stress", "/guides/quelle-pierre-pour-le-stress-guide-complet"],
    complianceNote:
      "Ne pas utiliser de vocabulaire de traitement de l'anxiété. Parler de stress quotidien, de rituel personnel et de tradition symbolique.",
  },
  {
    keyword: "pierre pour dormir",
    type: "intention",
    priority: 1,
    articleAngle:
      "Répondre à l'intention sommeil avec un guide de rituel du soir, de choix de bracelet et de prudence.",
    relatedStoneSlugs: ["amethyste", "howlite", "quartz-rose"],
    productStoneSlugs: ["amethyste", "howlite"],
    internalLinks: ["/intention/sommeil"],
    complianceNote:
      "Ne jamais promettre d'amélioration du sommeil ni remplacer un avis médical.",
  },
  {
    keyword: "pierre de protection",
    type: "intention",
    priority: 1,
    articleAngle:
      "Comparer labradorite, obsidienne, tourmaline noire et oeil de tigre pour un choix clair.",
    relatedStoneSlugs: ["labradorite", "obsidienne", "tourmaline-noire", "oeil-de-tigre"],
    productStoneSlugs: ["labradorite", "obsidienne", "tourmaline-noire", "oeil-de-tigre"],
    internalLinks: ["/intention/protection", "/guides/pierres-de-protection-guide-labradorite-obsidienne-tourmaline"],
  },
  {
    keyword: "bracelet pierre naturelle femme",
    type: "shopping",
    priority: 1,
    articleAngle:
      "Créer un guide d'achat élégant par intention, style et budget, avec livres et bracelets en mise en avant discrete.",
    relatedStoneSlugs: ["quartz-rose", "amethyste", "jade-vert", "labradorite"],
    productStoneSlugs: ["quartz-rose", "amethyste", "jade-vert", "labradorite"],
    internalLinks: ["/boutique-pierres-naturelles", "/idee-cadeau"],
  },
  {
    keyword: "bracelet pierre naturelle homme",
    type: "shopping",
    priority: 1,
    articleAngle:
      "Construire un guide achat masculin sobre autour de l'oeil de tigre, l'obsidienne, la lave et l'hematite.",
    relatedStoneSlugs: ["oeil-de-tigre", "obsidienne", "pierre-de-lave", "hematite"],
    productStoneSlugs: ["oeil-de-tigre", "obsidienne", "pierre-de-lave", "hematite"],
    internalLinks: ["/boutique-pierres-naturelles", "/pierres/oeil-de-tigre"],
  },
  {
    keyword: "purifier ses pierres",
    type: "care",
    priority: 2,
    articleAngle:
      "Expliquer les traditions d'entretien des pierres, les erreurs courantes et les precautions selon la fragilite minerale.",
    relatedStoneSlugs: ["amethyste", "quartz-rose", "labradorite", "pyrite"],
    internalLinks: ["/pierres", "/guides"],
  },
  {
    keyword: "recharger ses pierres",
    type: "care",
    priority: 2,
    articleAngle:
      "Faire un guide clair sur lune, lumiere douce, amas de quartz et limites selon les mineraux.",
    relatedStoneSlugs: ["amethyste", "quartz-rose", "labradorite"],
    internalLinks: ["/pierres", "/guides"],
  },
  {
    keyword: "idee cadeau pierre naturelle",
    type: "seasonal",
    priority: 1,
    articleAngle:
      "Faire un dossier cadeau par relation, occasion, budget et intention avec recommandations Amazon et livres.",
    relatedStoneSlugs: ["quartz-rose", "amethyste", "oeil-de-tigre", "jade-vert"],
    productStoneSlugs: ["quartz-rose", "amethyste", "oeil-de-tigre", "jade-vert"],
    internalLinks: ["/idee-cadeau", "/boutique-pierres-naturelles"],
  },
];

export const trendSignalRules = {
  market: "France",
  minimumTrendSignal:
    "Terme en forte hausse sur Google Trends, breakout, ou progression nette sur plusieurs jours avec intention commerciale ou editoriale claire.",
  publishWhen:
    "Le sujet a une intention de recherche identifiable, un lien interne existant ou creable, un produit ou livre pertinent, et aucun article recent ne couvre deja le meme angle.",
  avoidWhen:
    "Le sujet implique une promesse medicale, une pathologie lourde, une actualite sensible, ou une requete trop eloignee de l'univers des pierres naturelles.",
};

export const trendArticleBlueprint = {
  targetLength: "1500 a 2200 mots",
  requiredBlocks: [
    "Introduction journalistique qui explique pourquoi le sujet interesse maintenant.",
    "Rappel de conformite sur les traditions symboliques et l'absence de promesse medicale.",
    "Analyse de l'intention de recherche et des questions que se posent les lecteurs.",
    "Selection de 3 a 5 pierres avec signification symbolique, usage rituel et lien interne.",
    "Conseils de choix d'un bracelet, d'un livre ou d'un guide, avec mise en avant commerciale sobre.",
    "FAQ SEO de 4 a 6 questions formulees naturellement.",
    "Conclusion avec appel au test gratuit, au guide email et a la boutique recommandee.",
  ],
  llmSeoChecklist: [
    "Definir clairement les concepts des le debut.",
    "Utiliser des titres descriptifs qui peuvent etre cites par les IA.",
    "Repondre aux questions principales en paragraphes autonomes.",
    "Ajouter des liens internes vers pierres, intentions, guides et boutique.",
    "Eviter les allegations medicales et les effets garantis.",
  ],
};
