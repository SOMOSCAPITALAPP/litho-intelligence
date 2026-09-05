export type StoneEditorialDetail = {
  slug: string;
  mineralogy: {
    family: string;
    composition: string;
    crystalSystem: string;
    mohs: string;
    appearance: string;
  };
  care: {
    water: string;
    salt: string;
    sun: string;
    daily: string;
  };
  imitations: {
    common: string[];
    checkpoints: string[];
  };
  sources: Array<{ label: string; href: string }>;
};

export const priorityStoneEditorialDetails: StoneEditorialDetail[] = [
  {
    slug: "labradorite",
    mineralogy: {
      family: "Feldspath plagioclase",
      composition: "(Ca,Na)(Al,Si)4O8, avec une composition variable entre albite et anorthite",
      crystalSystem: "Triclinique",
      mohs: "6 à 6,5",
      appearance: "Base grise à sombre avec labradorescence bleue, verte, dorée ou multicolore selon l'orientation."
    },
    care: {
      water: "Nettoyage rapide possible avec chiffon légèrement humide, puis séchage immédiat.",
      salt: "À éviter : le sel peut ternir les surfaces polies et fragiliser les montages.",
      sun: "Préférer une lumière douce indirecte pour préserver les reflets.",
      daily: "Ranger séparément pour limiter les frottements avec des minéraux plus durs."
    },
    imitations: {
      common: ["verre irisé", "résine avec reflets imprimés", "pierres grises vendues sous un nom flou"],
      checkpoints: [
        "Observer si les reflets changent réellement avec l'angle.",
        "Chercher de petites variations naturelles plutôt qu'un motif parfaitement répétitif.",
        "Demander une photo nette du bracelet complet et d'une perle en gros plan."
      ]
    },
    sources: [
      { label: "Mindat - Labradorite", href: "https://www.mindat.org/min-2308.html" }
    ]
  },
  {
    slug: "amethyste",
    mineralogy: {
      family: "Quartz",
      composition: "SiO2, variété violette du quartz",
      crystalSystem: "Trigonal",
      mohs: "7",
      appearance: "Violet pâle à profond, parfois zoné, translucide ou plus opaque en perles."
    },
    care: {
      water: "Eau tiède savonneuse possible, puis séchage doux.",
      salt: "Éviter le sel direct et les nettoyages agressifs.",
      sun: "Éviter les expositions longues et intenses, qui peuvent altérer certaines couleurs.",
      daily: "Ne pas exposer à des chocs thermiques ; ranger séparément des pierres plus dures."
    },
    imitations: {
      common: ["verre violet", "quartz teinté", "améthyste très chauffée ou couleur artificiellement homogène"],
      checkpoints: [
        "Se méfier des violets parfaitement uniformes sur toutes les perles.",
        "Vérifier la transparence et les zones de couleur naturelles.",
        "Demander si la pierre a subi un traitement thermique ou une teinture."
      ]
    },
    sources: [
      { label: "GIA - Amethyst", href: "https://www.gia.edu/amethyst" },
      { label: "GIA - Amethyst care", href: "https://www.gia.edu/amethyst-care-cleaning" }
    ]
  },
  {
    slug: "quartz-rose",
    mineralogy: {
      family: "Quartz",
      composition: "SiO2, variété rose du quartz",
      crystalSystem: "Trigonal",
      mohs: "7",
      appearance: "Rose pâle à plus soutenu, souvent laiteux, avec nuances douces et parfois de petites inclusions."
    },
    care: {
      water: "Eau tiède savonneuse recommandée pour un nettoyage simple.",
      salt: "Éviter le sel prolongé, surtout sur bracelet élastique ou métal.",
      sun: "Lumière douce plutôt que plein soleil durable.",
      daily: "Protéger des rayures en le séparant des gemmes plus dures."
    },
    imitations: {
      common: ["verre rose", "résine", "quartz coloré artificiellement"],
      checkpoints: [
        "Chercher une couleur douce avec variations naturelles.",
        "Éviter les roses fluorescents ou trop saturés sans explication.",
        "Comparer les perles : une homogénéité parfaite peut être un signal commercial."
      ]
    },
    sources: [
      { label: "GIA - Rose quartz care", href: "https://www.gia.edu/articles/rose-quartz-care-cleaning" },
      { label: "Mindat - Quartz", href: "https://www.mindat.org/min-3337.html" }
    ]
  },
  {
    slug: "oeil-de-tigre",
    mineralogy: {
      family: "Quartz microcristallin chatoyant",
      composition: "Quartz silicifié avec fibres remplacées et oxydes de fer responsables des reflets bruns dorés",
      crystalSystem: "Trigonal pour la matrice quartz",
      mohs: "Environ 7",
      appearance: "Bandes brunes, miel et dorées avec effet chatoyant mobile."
    },
    care: {
      water: "Nettoyage bref à l'eau tiède possible si le bracelet est bien séché.",
      salt: "Éviter le sel direct pour protéger le poli et l'élastique.",
      sun: "Exposition douce possible, sans chaleur excessive.",
      daily: "Essuyer après port et ranger dans une pochette pour préserver la brillance."
    },
    imitations: {
      common: ["verre chatoyant", "fibres synthétiques", "pierres teintées à effet trop régulier"],
      checkpoints: [
        "Faire tourner la perle : la bande lumineuse doit bouger avec l'angle.",
        "Observer des variations de brun et de doré plutôt qu'une seule couleur plate.",
        "Vérifier la cohérence entre prix, photo réelle et description."
      ]
    },
    sources: [
      { label: "Mindat glossary - Tiger's-eye", href: "https://www.mindat.org/glossary/tiger%27s-eye" },
      { label: "Mindat - Quartz", href: "https://www.mindat.org/min-3337.html" }
    ]
  },
  {
    slug: "obsidienne-noire",
    mineralogy: {
      family: "Verre volcanique naturel",
      composition: "Verre silicaté riche en silice, sans structure cristalline organisée",
      crystalSystem: "Amorphe",
      mohs: "5 à 6 selon les références et la composition",
      appearance: "Noir vitreux, parfois brun sombre en bord fin, cassure conchoïdale si la pierre est brute."
    },
    care: {
      water: "Nettoyage rapide au chiffon humide, sans immersion prolongée du bracelet.",
      salt: "Éviter le sel et les frottements abrasifs.",
      sun: "Aucune nécessité d'exposition forte ; privilégier un repos à l'abri.",
      daily: "Attention aux chocs : l'obsidienne est dure mais cassante."
    },
    imitations: {
      common: ["verre noir industriel", "résine noire", "onyx vendu comme obsidienne"],
      checkpoints: [
        "Demander des photos nettes : l'aspect doit être vitreux, pas plastique.",
        "Éviter les descriptions qui promettent un effet garanti.",
        "Vérifier si la pierre est vendue comme obsidienne naturelle ou verre décoratif."
      ]
    },
    sources: [
      { label: "ScienceDirect - Obsidian glass overview", href: "https://www.sciencedirect.com/topics/earth-and-planetary-sciences/obsidian-glass" },
      { label: "The Mineral Classroom - Obsidian", href: "https://azmineraleducation.org/lessons/obsidian-and-volcanic-glass/" }
    ]
  },
  {
    slug: "apatite-bleue",
    mineralogy: {
      family: "Groupe de l'apatite",
      composition: "Ca5(PO4)3(F,Cl,OH), phosphates de calcium avec variantes fluorées, chlorées ou hydroxylées",
      crystalSystem: "Hexagonal pour les principales espèces du groupe",
      mohs: "5",
      appearance: "Bleu à bleu-vert, parfois translucide, avec variations naturelles et inclusions possibles."
    },
    care: {
      water: "Nettoyage à sec ou chiffon à peine humide recommandé.",
      salt: "Éviter le sel et les bains prolongés.",
      sun: "Éviter la chaleur forte et les longues expositions.",
      daily: "Pierre plus sensible que le quartz : limiter les chocs et frottements."
    },
    imitations: {
      common: ["verre bleu", "apatite reconstituée", "calcédoine ou quartz teinté"],
      checkpoints: [
        "Se méfier d'un bleu trop uniforme et très saturé.",
        "Demander si les perles sont naturelles, traitées ou reconstituées.",
        "Vérifier que la photo produit montre bien les nuances de chaque perle."
      ]
    },
    sources: [
      { label: "Mindat - Apatite", href: "https://www.mindat.org/min-29229.html" }
    ]
  },
  {
    slug: "howlite",
    mineralogy: {
      family: "Borate de calcium",
      composition: "Ca2B5SiO9(OH)5",
      crystalSystem: "Monoclinique",
      mohs: "3,5 à 6,5 selon la forme massive ou cristallisée",
      appearance: "Blanc à crème, veiné de gris, aspect sobre et légèrement marbré."
    },
    care: {
      water: "Préférer un chiffon sec ou très légèrement humide.",
      salt: "Éviter le sel direct et les immersions.",
      sun: "Lumière douce uniquement, sans chaleur prolongée.",
      daily: "Retirer avant douche, sport ou parfum pour préserver le bracelet."
    },
    imitations: {
      common: ["magnésite vendue comme howlite", "howlite teintée en fausse turquoise", "résine veinée"],
      checkpoints: [
        "Une howlite blanche présente souvent des veines grises irrégulières.",
        "La couleur turquoise vive correspond souvent à une pierre teintée.",
        "Demander la nature exacte si le nom commercial est ambigu."
      ]
    },
    sources: [
      { label: "Mindat - Howlite", href: "https://www.mindat.org/min-1936.html" }
    ]
  },
  {
    slug: "cornaline",
    mineralogy: {
      family: "Calcédoine, quartz microcristallin",
      composition: "SiO2 avec coloration liée à des oxydes de fer",
      crystalSystem: "Trigonal pour la famille quartz",
      mohs: "Environ 7",
      appearance: "Orange, rouge orangé ou brun rouge, translucide à opaque selon la qualité."
    },
    care: {
      water: "Eau tiède savonneuse possible, puis séchage rapide.",
      salt: "Éviter le sel prolongé et les bains abrasifs.",
      sun: "Éviter les fortes chaleurs ; une lumière indirecte suffit.",
      daily: "Essuyer après port pour préserver l'éclat des perles."
    },
    imitations: {
      common: ["agate teintée", "verre orangé", "cornaline chauffée non indiquée"],
      checkpoints: [
        "Une couleur très uniforme peut évoquer une teinture.",
        "Les nuances naturelles vont souvent de l'orange au brun rouge.",
        "Demander si la couleur résulte d'un chauffage ou d'un traitement."
      ]
    },
    sources: [
      { label: "Mindat - Quartz", href: "https://www.mindat.org/min-3337.html" },
      { label: "Universalis Junior - Cornaline", href: "https://junior.universalis.fr/encyclopedie/cornaline" }
    ]
  },
  {
    slug: "tourmaline-noire",
    mineralogy: {
      family: "Tourmaline, variété schorl",
      composition: "NaFe3Al6(Si6O18)(BO3)3(OH)3OH",
      crystalSystem: "Trigonal",
      mohs: "7",
      appearance: "Noir à noir bleuté, souvent strié en brut, mat à vitreux selon le poli."
    },
    care: {
      water: "Chiffon doux recommandé ; éviter l'immersion du bracelet.",
      salt: "Éviter le sel direct, surtout sur perles percées ou montages élastiques.",
      sun: "Lumière indirecte suffisante.",
      daily: "Ranger séparément pour éviter les chocs sur les perles."
    },
    imitations: {
      common: ["verre noir", "onyx noir", "résine sombre"],
      checkpoints: [
        "Chercher un noir profond mais pas plastique.",
        "Les bruts présentent souvent des stries longitudinales.",
        "Demander si le vendeur parle de schorl ou tourmaline noire naturelle."
      ]
    },
    sources: [
      { label: "Mindat - Schorl", href: "https://www.mindat.org/min-3578.html" }
    ]
  },
  {
    slug: "pyrite",
    mineralogy: {
      family: "Sulfure de fer",
      composition: "FeS2",
      crystalSystem: "Isométrique",
      mohs: "6 à 6,5",
      appearance: "Doré métallique, parfois cubique ou granuleux, éclat brillant."
    },
    care: {
      water: "Éviter l'eau : préférer un chiffon sec.",
      salt: "Éviter absolument le sel et l'humidité prolongée.",
      sun: "Pas de besoin de recharge solaire ; garder au sec.",
      daily: "Conserver dans un endroit sec, loin des produits chimiques et de l'humidité."
    },
    imitations: {
      common: ["métal doré", "résine métallisée", "chalcopyrite vendue sous un nom simplifié"],
      checkpoints: [
        "La pyrite est lourde, froide au toucher et métallique.",
        "Un doré trop jaune et léger peut indiquer une imitation décorative.",
        "Vérifier la mention pyrite naturelle et la photo réelle du bracelet."
      ]
    },
    sources: [
      { label: "Mindat - Pyrite", href: "https://www.mindat.org/min-3314.html" }
    ]
  }
];

export function getStoneEditorialDetail(slug: string) {
  return priorityStoneEditorialDetails.find((detail) => detail.slug === slug);
}

