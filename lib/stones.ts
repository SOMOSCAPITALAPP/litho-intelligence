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
  products: {
    label: string;
    brand: "Felicidade" | "Vera Mentis" | "KDP";
    url: string;
  }[];
};

export const stones: Stone[] = [
  {
    slug: "amethyste",
    name: "Amethyste",
    visual: "Violet profond, parfois translucide, avec des nuances calmes et minerales.",
    origin: "Bresil, Uruguay, Madagascar",
    description:
      "Pierre traditionnellement associee a l'apaisement mental, a l'intuition et aux rituels du soir.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Am%C3%A9thyste_300.3.7317.JPG?width=1000",
      alt: "Cristaux d'amethyste violets",
      credit: "Gery Parent, Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Am%C3%A9thyste_300.3.7317.JPG"
    },
    properties: ["calme", "clarte", "sommeil", "intuition"],
    chakra: "Couronne",
    emotions: ["stress", "anxiete", "peur", "surcharge mentale"],
    goals: ["sommeil", "serenite", "spiritualite"],
    usage: "A garder pres du lit ou a porter en bracelet lors des periodes de tension.",
    compatibilities: ["quartz-rose", "labradorite", "cristal-de-roche"],
    incompatibilities: ["cornaline"],
    purification: "Fumigation douce, bol chantant ou repos sur amas de quartz. Eviter le soleil direct prolonge.",
    wear: "Bracelet main gauche pour une intention d'apaisement, ou pierre roulee pres de l'oreiller.",
    products: [
      { label: "Voir bracelets amethyste", brand: "Felicidade", url: "https://www.amazon.fr/s?k=bracelet+amethyste+pierre+naturelle" },
      { label: "Livres lithotherapie debutant", brand: "KDP", url: "https://www.amazon.fr/s?k=livre+lithotherapie+debutant" }
    ]
  },
  {
    slug: "quartz-rose",
    name: "Quartz rose",
    visual: "Rose pale laiteux, doux et lumineux.",
    origin: "Bresil, Madagascar, Inde",
    description:
      "Symbole de tendresse, d'amour de soi et de reconfort dans de nombreuses traditions energetiques.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Rose_quartz_%2832132819430%29.jpg?width=1000",
      alt: "Quartz rose brut",
      credit: "James St. John, Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rose_quartz_(32132819430).jpg"
    },
    properties: ["amour", "douceur", "reconfort", "acceptation"],
    chakra: "Coeur",
    emotions: ["tristesse", "solitude", "colere", "stress"],
    goals: ["amour", "confiance", "relations"],
    usage: "A porter pres du coeur ou a utiliser dans un rituel d'intention du matin.",
    compatibilities: ["amethyste", "aventurine", "cristal-de-roche"],
    incompatibilities: ["obsidienne"],
    purification: "Eau claire rapide, fumigation ou fleur de vie. Rechargement doux a la lumiere lunaire.",
    wear: "Collier court, bracelet ou pierre dans la poche lors des journees emotionnelles.",
    products: [
      { label: "Voir bracelets quartz rose", brand: "Vera Mentis", url: "https://www.amazon.fr/s?k=bracelet+quartz+rose+pierre+naturelle" },
      { label: "Livres pierres et intentions", brand: "KDP", url: "https://www.amazon.fr/s?k=livre+pierres+intentions+lithotherapie" }
    ]
  },
  {
    slug: "citrine",
    name: "Citrine",
    visual: "Jaune dore a miel, aspect solaire et chaleureux.",
    origin: "Bresil, Madagascar",
    description:
      "Pierre traditionnellement reliee a l'elan personnel, a l'abondance symbolique et a la motivation.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Quartz_Citrine_Crystals_in_Their_Natural_Form.jpg?width=1000",
      alt: "Cristaux de citrine",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Citrine"
    },
    properties: ["energie", "abondance", "optimisme", "confiance"],
    chakra: "Plexus solaire",
    emotions: ["fatigue", "doute", "demotivation"],
    goals: ["argent", "confiance", "reussite", "energie"],
    usage: "A utiliser pendant les sessions de travail, de creation ou de planification financiere.",
    compatibilities: ["oeil-de-tigre", "cornaline", "cristal-de-roche"],
    incompatibilities: ["amethyste"],
    purification: "Fumigation ou geode. Rechargement a la lumiere naturelle douce.",
    wear: "Bracelet main droite pour une intention d'action et de concretisation.",
    products: [
      { label: "Voir bracelets citrine", brand: "Felicidade", url: "https://www.amazon.fr/s?k=bracelet+citrine+pierre+naturelle" },
      { label: "Carnets intentions abondance", brand: "KDP", url: "https://www.amazon.fr/s?k=carnet+intentions+abondance" }
    ]
  },
  {
    slug: "labradorite",
    name: "Labradorite",
    visual: "Gris sombre avec reflets bleus, verts ou dores.",
    origin: "Canada, Madagascar, Finlande",
    description:
      "Souvent choisie comme pierre de protection symbolique et de recuperation energetique.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pietra_di_labradorite.jpg?width=1000",
      alt: "Labradorite aux reflets bleus et verts",
      credit: "Anna.Massini, Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Pietra_di_labradorite.jpg"
    },
    properties: ["protection", "intuition", "recuperation", "frontieres"],
    chakra: "Troisieme oeil",
    emotions: ["fatigue", "stress", "surcharge mentale", "empathie excessive"],
    goals: ["protection", "equilibre", "spiritualite"],
    usage: "A porter lors des interactions intenses ou des environnements tres sollicitants.",
    compatibilities: ["amethyste", "obsidienne", "cristal-de-roche"],
    incompatibilities: ["citrine"],
    purification: "Fumigation reguliere ou bol chantant. Rechargement lunaire recommande.",
    wear: "Bracelet ou pendentif pendant les journees chargees.",
    products: [
      { label: "Voir bracelets labradorite", brand: "Vera Mentis", url: "https://www.amazon.fr/s?k=bracelet+labradorite+pierre+naturelle" }
    ]
  },
  {
    slug: "oeil-de-tigre",
    name: "Oeil de tigre",
    visual: "Bandes brunes, dorees et lumineuses a effet chatoyant.",
    origin: "Afrique du Sud, Australie, Inde",
    description:
      "Pierre associee a la confiance, a l'ancrage et au passage a l'action dans les usages traditionnels.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Tiger_eye.JPG?width=1000",
      alt: "Pierres oeil de tigre brunes et dorees",
      credit: "Weissanna, Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tiger_eye.JPG"
    },
    properties: ["confiance", "courage", "ancrage", "decision"],
    chakra: "Plexus solaire",
    emotions: ["peur", "doute", "stress"],
    goals: ["confiance", "argent", "reussite", "protection"],
    usage: "A porter avant un rendez-vous, une negociation ou une decision importante.",
    compatibilities: ["citrine", "cornaline", "hematite"],
    incompatibilities: ["quartz-rose"],
    purification: "Fumigation, son ou passage rapide sous l'eau selon la qualite de la pierre.",
    wear: "Bracelet main droite pour une intention d'assurance et de mouvement.",
    products: [
      { label: "Voir bracelets oeil de tigre", brand: "Felicidade", url: "https://www.amazon.fr/s?k=bracelet+oeil+de+tigre+pierre+naturelle" }
    ]
  },
  {
    slug: "cornaline",
    name: "Cornaline",
    visual: "Orange chaud a rouge translucide.",
    origin: "Inde, Bresil, Uruguay",
    description:
      "Traditionnellement liee a la vitalite, a la creativite et a l'expression personnelle.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Carnelian_Agate%2C_Oregon.jpg?width=1000",
      alt: "Cornaline orange",
      credit: "Bobjgalindo, Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Carnelian_Agate,_Oregon.jpg"
    },
    properties: ["vitalite", "creation", "desir", "elan"],
    chakra: "Sacre",
    emotions: ["fatigue", "blocage", "demotivation"],
    goals: ["energie", "creativite", "confiance"],
    usage: "A utiliser lors des periodes de relance, de creation ou de reprise d'activite.",
    compatibilities: ["citrine", "oeil-de-tigre", "hematite"],
    incompatibilities: ["amethyste"],
    purification: "Fumigation ou eau claire rapide. Rechargement solaire court.",
    wear: "Bracelet main droite ou pierre de poche pendant les phases d'action.",
    products: [
      { label: "Voir bracelets cornaline", brand: "Vera Mentis", url: "https://www.amazon.fr/s?k=bracelet+cornaline+pierre+naturelle" }
    ]
  },
  {
    slug: "cristal-de-roche",
    name: "Cristal de roche",
    visual: "Transparent a blanc, eclat clair et neutre.",
    origin: "Bresil, Alpes, Madagascar",
    description:
      "Pierre d'amplification symbolique, souvent utilisee pour clarifier une intention ou accompagner d'autres pierres.",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Quartz_crystals_%28geode%29_%286390459075%29.jpg?width=1000",
      alt: "Cristaux de quartz clair dans une geode",
      credit: "Mauro Cateb, Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Quartz_crystals_(geode)_(6390459075).jpg"
    },
    properties: ["clarte", "amplification", "neutralite", "focus"],
    chakra: "Tous chakras",
    emotions: ["confusion", "surcharge mentale"],
    goals: ["clarte", "spiritualite", "focus"],
    usage: "A associer avec une pierre principale pour renforcer une intention precise.",
    compatibilities: ["amethyste", "quartz-rose", "citrine", "labradorite", "oeil-de-tigre"],
    incompatibilities: [],
    purification: "Fumigation, eau claire rapide ou geode. Rechargement lumiere douce.",
    wear: "En bracelet neutre ou pose sur un bureau pendant une intention de concentration.",
    products: [
      { label: "Voir bracelets cristal de roche", brand: "Felicidade", url: "https://www.amazon.fr/s?k=bracelet+cristal+de+roche+pierre+naturelle" }
    ]
  }
];

export const getStone = (slug: string) => stones.find((stone) => stone.slug === slug);
