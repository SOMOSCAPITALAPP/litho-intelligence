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
    asin?: string;
    sku?: string;
    rating?: string;
    reviewCount?: number;
    heliumScore?: string;
    monthlySales?: number;
    price?: string;
    stock?: number;
    badge?: string;
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
      {
        label: "Bracelet Quartz Rose 8MM - douceur et harmonie",
        brand: "Felicidade",
        url: "https://amzn.eu/d/0bifqsoC",
        asin: "B0C6L1LBY6",
        sku: "F_BRACELETQUARTZROSETAILLE8MM",
        rating: "4,1",
        reviewCount: 22,
        heliumScore: "10",
        monthlySales: 2,
        price: "8,54 EUR",
        stock: 186,
        badge: "Best-seller quartz rose"
      },
      {
        label: "Bracelet Quartz Rose fil rouge 8MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/08pBYyoW",
        asin: "B0CCJTJ6RV",
        sku: "F_BRACELETQUARTZROSE8MMFILROUGE",
        rating: "4,1",
        reviewCount: 8,
        heliumScore: "8,8",
        monthlySales: 2,
        price: "10,90 EUR",
        stock: 63
      },
      {
        label: "Bracelet Quartz Rose Vera Mentis 8MM",
        brand: "Vera Mentis",
        url: "https://amzn.eu/d/0eYz8Pml",
        asin: "B0DH3TS81Q",
        sku: "4M-KUNA-7521",
        rating: "5",
        reviewCount: 2,
        heliumScore: "8,8",
        monthlySales: 1,
        price: "12,90 EUR",
        stock: 45
      },
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
      {
        label: "Bracelet Labradorite 8MM + pochette artisanale",
        brand: "Felicidade",
        url: "https://amzn.eu/d/0eXwx6am",
        asin: "B0D2VG6D3Z",
        sku: "E9-7BJ7-P3HO",
        rating: "4,2",
        reviewCount: 54,
        heliumScore: "10",
        monthlySales: 30,
        price: "15,90 EUR",
        stock: 198,
        badge: "Top ventes labradorite"
      },
      {
        label: "Bracelet Labradorite foncee 8MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/06bhTerM",
        asin: "B0D2VFSL94",
        sku: "Z8-369G-TY3P",
        rating: "4,6",
        reviewCount: 32,
        heliumScore: "10",
        monthlySales: 30,
        price: "14,90 EUR",
        stock: 133,
        badge: "Meilleure note"
      },
      {
        label: "Bracelet Labradorite foncee arbre de vie",
        brand: "Felicidade",
        url: "https://amzn.eu/d/0cVOpLyI",
        asin: "B0DPXNKDTV",
        sku: "4E-9I7S-CHOZ",
        rating: "5",
        reviewCount: 10,
        heliumScore: "10",
        monthlySales: 10,
        price: "17,90 EUR",
        stock: 38
      },
      {
        label: "Bracelet Larvikite Vera Mentis 8MM",
        brand: "Vera Mentis",
        url: "https://amzn.eu/d/0fwZ8k4Z",
        asin: "B0DH3QTYXJ",
        sku: "E4-DQ3B-X6LO",
        rating: "4,7",
        reviewCount: 5,
        heliumScore: "8,8",
        monthlySales: 5,
        price: "16,90 EUR",
        stock: 69
      }
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
      {
        label: "Bracelet Homme Oeil de Tigre 8MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/0gWKB6CY",
        asin: "B0C6B7TH96",
        sku: "F_BRACELETOEILDETIGRE8MM",
        rating: "4,3",
        reviewCount: 34,
        heliumScore: "10",
        monthlySales: 5,
        price: "8,50 EUR",
        stock: 336,
        badge: "Best-seller protection"
      },
      {
        label: "Bracelet Oeil de Tigre 6MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/0eJvVWx2",
        asin: "B0C9R82J58",
        sku: "PI-X273-FOM4",
        rating: "3,5",
        reviewCount: 6,
        heliumScore: "7,5",
        monthlySales: 2,
        price: "12,90 EUR",
        stock: 47
      },
      {
        label: "Bracelet 7 chakras Oeil de Tigre 6MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/09KxuCQB",
        asin: "B0CQPHXY7B",
        sku: "BRACELET7CHAKRASOEILDETIGRE6MM",
        rating: "4,2",
        reviewCount: 6,
        heliumScore: "8,8",
        monthlySales: 4,
        price: "12,90 EUR",
        stock: 41
      },
      {
        label: "Bracelet 3 yeux Vera Mentis 8MM",
        brand: "Vera Mentis",
        url: "https://amzn.eu/d/0gZrX26b",
        asin: "B0DN1ZGT3L",
        sku: "ET-U1PH-0IS9",
        rating: "4,6",
        reviewCount: 6,
        heliumScore: "8,8",
        monthlySales: 2,
        price: "17,90 EUR",
        stock: 46
      }
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
      {
        label: "Bracelet Cornaline 8MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/01aHc9gY",
        asin: "B0CG2BVN75",
        sku: "F_BRACELETCORNALINE8MM",
        rating: "4,2",
        reviewCount: 36,
        heliumScore: "9,9",
        monthlySales: 10,
        price: "13,80 EUR",
        stock: 82,
        badge: "Top vitalite"
      },
      {
        label: "Bracelet Agate Cornaline 8MM",
        brand: "Felicidade",
        url: "https://amzn.eu/d/00ktgVmC",
        asin: "B0FP2XK4F7",
        sku: "KX-U4KR-ZFOE",
        rating: "5",
        reviewCount: 1,
        heliumScore: "8,8",
        monthlySales: 4,
        price: "15,90 EUR",
        stock: 35
      }
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
