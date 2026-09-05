export type EditorialGuide = {
  slug: string;
  title: string;
  description: string;
  category: "guide" | "entretien" | "comparatif" | "journal";
  updatedAt: string;
  sections: Array<{
    title: string;
    body?: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
  relatedLinks: Array<{ href: string; label: string }>;
};

export const editorialGuides: EditorialGuide[] = [
  {
    slug: "guide-pierres-naturelles",
    title: "Guide des pierres naturelles",
    description:
      "Comprendre les pierres naturelles sans confusion : minéralogie, traditions symboliques, usages en bijouterie et critères de choix.",
    category: "guide",
    updatedAt: "2026-09-05",
    sections: [
      {
        title: "Comprendre une pierre naturelle avec deux lectures",
        paragraphs: [
          "Une pierre naturelle peut être regardée sous deux angles complémentaires. Le premier est observable : famille minérale, couleur, dureté, aspect, sensibilité à l'eau, traitements possibles et qualité du polissage. Le second relève des traditions symboliques : certaines pierres sont associées depuis longtemps à des intentions comme le calme, la protection, l'amour, la confiance ou l'ancrage.",
          "Litho Intelligence sépare volontairement ces deux niveaux. Une fiche pierre ne doit pas confondre une caractéristique minéralogique avec une promesse de résultat. Une labradorite peut être décrite comme un feldspath à reflets, et elle peut aussi être présentée comme une pierre traditionnellement associée à la protection symbolique. Ces deux informations n'ont pas la même nature, et cette distinction renforce la confiance du lecteur."
        ]
      },
      {
        title: "Les critères concrets avant d'acheter",
        body: "Avant de choisir un bracelet, vérifiez les informations qui permettent de comparer les offres sans se laisser guider uniquement par une photo séduisante.",
        bullets: [
          "nom exact de la pierre et synonymes commerciaux éventuels ;",
          "photo nette des perles ou du produit réellement vendu ;",
          "diamètre des perles, taille du bracelet et type de montage ;",
          "mention claire des traitements, teintures ou reconstitutions ;",
          "conseils d'entretien compatibles avec la pierre ;",
          "conditions de livraison, retour, stock et vendeur."
        ]
      },
      {
        title: "Choisir par intention sans tomber dans la promesse",
        paragraphs: [
          "La recherche par intention est utile parce qu'elle part d'un besoin humain simple : se sentir plus posé, marquer un nouveau départ, offrir une attention ou garder un rappel visible d'une décision. La pierre agit alors comme support de rituel personnel, pas comme solution médicale ou garantie de transformation.",
          "Pour une intention de calme, on peut comparer l'améthyste, la howlite ou le quartz rose. Pour la protection symbolique, la labradorite, l'obsidienne noire ou la tourmaline noire sont souvent citées. Pour la confiance, l'œil de tigre, la cornaline et la citrine sont des repères lisibles. Le bon choix est celui qui reste cohérent avec l'intention, l'esthétique, le confort et la prudence."
        ]
      },
      {
        title: "Le rôle du bracelet",
        paragraphs: [
          "Le bracelet est la forme la plus simple pour transformer une intention en geste quotidien. Il se voit, se touche, s'enlève facilement et peut servir de rappel discret avant une réunion, un trajet ou un moment de fatigue. Ce n'est pas la pierre qui impose une conduite ; c'est l'utilisateur qui associe l'objet à une phrase courte et concrète.",
          "Un bon bracelet doit rester confortable. La taille des perles, l'élasticité du fil, la finition et le poids comptent autant que le symbole. Une pierre fragile ou poreuse demande plus d'attention qu'un quartz. Pour un premier achat, mieux vaut choisir une pierre lisible et facile d'entretien."
        ]
      }
    ],
    relatedLinks: [
      { href: "/pierres", label: "Explorer les pierres de A à Z" },
      { href: "/guides/reconnaitre-vraie-pierre", label: "Reconnaître une vraie pierre" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "debuter-lithotherapie-symbolique",
    title: "Débuter en lithothérapie symbolique",
    description:
      "Un guide responsable pour découvrir la lithothérapie comme pratique culturelle, spirituelle et symbolique, sans allégation médicale.",
    category: "guide",
    updatedAt: "2026-09-05",
    sections: [
      {
        title: "Commencer simplement",
        paragraphs: [
          "Débuter ne consiste pas à acheter beaucoup de pierres. Il vaut mieux choisir une intention claire, une pierre facile à reconnaître et un rituel court que l'on peut réellement pratiquer. Une seule pierre portée régulièrement peut avoir plus de sens qu'une collection achetée sans repère.",
          "La lithothérapie est présentée ici comme une tradition symbolique. Elle peut accompagner un moment de recentrage, de méditation ou de choix personnel, mais elle ne remplace jamais une démarche médicale, psychologique ou professionnelle. Cette limite est saine : elle permet de profiter de la dimension culturelle et émotionnelle des pierres sans créer de fausse promesse."
        ]
      },
      {
        title: "Une méthode en quatre questions",
        body: "Avant de choisir, posez quatre questions simples. Elles aident à passer d'une envie vague à une sélection plus utile.",
        bullets: [
          "Quelle intention ai-je envie de soutenir aujourd'hui ?",
          "Quelle couleur, texture ou forme m'attire naturellement ?",
          "Est-ce une pierre adaptée au port quotidien ?",
          "Le vendeur donne-t-il assez d'informations pour acheter avec discernement ?"
        ]
      },
      {
        title: "Le rituel minimal",
        paragraphs: [
          "Un rituel efficace côté usage n'a pas besoin d'être spectaculaire. Tenez la pierre ou le bracelet, respirez lentement pendant deux minutes, puis formulez une intention courte : je pose mes limites, je parle avec clarté, j'avance pas à pas, je me traite avec douceur. Le geste devient un point d'ancrage.",
          "Ce rituel peut être répété le matin ou avant un moment précis. Il n'a pas vocation à produire un effet certain. Son intérêt est d'organiser l'attention et de rendre l'intention visible dans le quotidien."
        ]
      }
    ],
    relatedLinks: [
      { href: "/intentions", label: "Choisir par intention" },
      { href: "/guides/purification-rechargement-pierres", label: "Entretenir ses pierres" },
      { href: "/formation", label: "Formation gratuite" }
    ]
  },
  {
    slug: "reconnaitre-vraie-pierre",
    title: "Comment reconnaître une vraie pierre ?",
    description:
      "Repères simples pour observer une pierre naturelle, repérer les imitations courantes et poser les bonnes questions avant achat.",
    category: "entretien",
    updatedAt: "2026-09-05",
    sections: [
      {
        title: "Aucun test isolé ne suffit",
        paragraphs: [
          "Reconnaître une pierre naturelle demande de croiser plusieurs indices. La couleur, la température au toucher, le poids, les inclusions et le prix donnent des repères, mais aucun signe ne suffit à lui seul. Beaucoup de pierres naturelles peuvent être chauffées, teintées, stabilisées ou vendues sous un nom commercial.",
          "La meilleure protection reste la transparence du vendeur. Une annonce fiable précise le nom de la pierre, le type de produit, les dimensions, les traitements connus et montre des photos suffisamment nettes. Une annonce qui promet des effets garantis, qui utilise seulement un nom vague ou qui affiche une couleur trop parfaite mérite plus de prudence."
        ]
      },
      {
        title: "Signaux d'alerte fréquents",
        body: "Ces signaux n'interdisent pas l'achat, mais ils invitent à poser des questions avant de payer.",
        bullets: [
          "couleur extrêmement vive sans mention de teinture ;",
          "motifs identiques sur toutes les perles ;",
          "prix très bas pour une pierre annoncée rare ;",
          "photos floues ou trop retouchées ;",
          "promesses trop fortes ou effets annoncés comme certains ;",
          "absence d'information sur la taille et la matière réelle."
        ]
      },
      {
        title: "Questions utiles à poser",
        paragraphs: [
          "Demandez si la pierre est naturelle, traitée, teintée, synthétique ou reconstituée. Demandez aussi si les photos représentent le produit envoyé ou seulement un exemple. Pour les pierres très imitées, comme la turquoise, la malachite, la howlite teintée, certaines agates très colorées ou les verres irisés, cette question change tout.",
          "Pour un bracelet, la qualité du montage compte autant que la pierre. Un fil fragile, une taille imprécise ou des perles mal percées peuvent transformer un achat séduisant en déception rapide."
        ]
      }
    ],
    relatedLinks: [
      { href: "/entretien", label: "Authenticité et entretien" },
      { href: "/boutique-pierres-naturelles", label: "Voir les bracelets recommandés" }
    ]
  },
  {
    slug: "purification-rechargement-pierres",
    title: "Purification et rechargement des pierres",
    description:
      "Méthodes d'entretien prudentes pour les pierres naturelles : eau, sel, soleil, lune, fumigation et précautions selon la sensibilité des minéraux.",
    category: "entretien",
    updatedAt: "2026-09-05",
    sections: [
      {
        title: "Distinguer entretien matériel et rituel symbolique",
        paragraphs: [
          "Dans les traditions de lithothérapie, on parle souvent de purification ou de rechargement. Sur Litho Intelligence, ces gestes sont présentés comme des rituels symboliques et des habitudes d'entretien, pas comme une nécessité mesurable. L'objectif est de garder un objet propre, respecté et relié à une intention personnelle.",
          "Toutes les pierres ne supportent pas les mêmes méthodes. L'eau peut abîmer certains minéraux ou fragiliser un bracelet. Le sel est abrasif et risqué pour beaucoup de surfaces polies. Le soleil peut altérer certaines couleurs. Quand on ne connaît pas précisément la pierre, la méthode douce est la plus raisonnable."
        ]
      },
      {
        title: "Méthodes généralement douces",
        body: "Ces gestes limitent les risques matériels tout en conservant la dimension rituelle recherchée.",
        bullets: [
          "essuyer avec un chiffon doux ;",
          "poser la pierre sur un tissu propre ;",
          "utiliser une fumigation légère dans un espace ventilé ;",
          "préférer une lumière indirecte à une exposition solaire forte ;",
          "formuler une intention courte plutôt que multiplier les méthodes."
        ]
      },
      {
        title: "Pierres sensibles",
        paragraphs: [
          "Les pierres poreuses, tendres, métalliques ou solubles demandent davantage de prudence. La pyrite doit rester au sec. La sélénite et l'angélite sont sensibles à l'eau. La calcite, la fluorite et l'apatite sont moins dures que le quartz et peuvent se rayer plus facilement.",
          "Pour un bracelet porté tous les jours, retirez-le avant la douche, le sport, la piscine et le parfum. Ce conseil est simple, mais il protège les perles, le fil et les éventuelles pièces métalliques."
        ]
      }
    ],
    relatedLinks: [
      { href: "/pierres", label: "Consulter les fiches pierres" },
      { href: "/guides/reconnaitre-vraie-pierre", label: "Reconnaître une vraie pierre" }
    ]
  },
  {
    slug: "choisir-bracelet-pierre-naturelle",
    title: "Comment choisir un bracelet en pierre naturelle ?",
    description:
      "Critères pratiques pour choisir un bracelet : pierre, intention, taille des perles, confort, destination d'achat et transparence commerciale.",
    category: "comparatif",
    updatedAt: "2026-09-05",
    sections: [
      {
        title: "Partir de l'usage réel",
        paragraphs: [
          "Un bracelet est fait pour être porté. Avant de choisir la pierre, regardez l'usage : quotidien discret, cadeau symbolique, bijou pour un événement, rappel d'intention au travail ou accessoire plus spirituel. Le meilleur bracelet est celui qui sera réellement utilisé sans gêne.",
          "Les perles de 6 mm sont souvent discrètes, les 8 mm plus présentes, les 10 mm plus marquées. Le style compte aussi : labradorite sombre pour une protection symbolique élégante, quartz rose pour une intention tendre, œil de tigre pour une énergie solaire, howlite pour une sobriété calme."
        ]
      },
      {
        title: "Comparer sans se perdre",
        body: "Un produit bien présenté doit répondre à des questions simples.",
        bullets: [
          "quelle pierre est utilisée ;",
          "quelle taille de perles et de bracelet ;",
          "quelles photos montrent le produit ;",
          "quel vendeur expédie et sous quelles conditions ;",
          "quelle politique de retour existe ;",
          "la description évite-t-elle les allégations médicales."
        ]
      },
      {
        title: "Lien Amazon et responsabilité",
        paragraphs: [
          "Les liens recommandés peuvent rediriger vers Amazon. Le prix, le stock, les avis et les conditions dépendent toujours du vendeur et peuvent changer. Litho Intelligence ne doit donc pas inventer de disponibilité ni afficher de promesse commerciale non vérifiée.",
          "La bonne expérience consiste à proposer une sélection claire, à expliquer l'intention associée et à laisser l'utilisateur comparer avant d'acheter. Cette transparence protège la marque et améliore la confiance."
        ]
      }
    ],
    relatedLinks: [
      { href: "/boutique-pierres-naturelles", label: "Boutique recommandée" },
      { href: "/intentions", label: "Choisir selon son besoin" }
    ]
  },
  {
    slug: "pierres-intentions-emotions",
    title: "Pierres, intentions et émotions : guide de choix",
    description:
      "Méthode pour choisir une pierre selon une intention émotionnelle, avec une formulation responsable et non médicale.",
    category: "guide",
    updatedAt: "2026-09-05",
    sections: [
      {
        title: "Nommer l'intention",
        paragraphs: [
          "Une intention bien formulée est plus utile qu'une liste de vertus. Dire « je veux être moins stressé » peut être transformé en « je veux créer un rituel de calme avant de dormir » ou « je veux me recentrer avant une journée dense ». Cette précision aide à choisir la pierre, mais aussi le geste qui l'accompagne.",
          "Les pierres ne remplacent pas une aide adaptée si la situation est médicale, psychologique ou professionnelle. Elles peuvent en revanche servir de rappel symbolique : respirer, poser une limite, écrire une pensée, faire une pause ou offrir un message de soutien."
        ]
      },
      {
        title: "Quelques associations lisibles",
        body: "Ces associations reposent sur des usages symboliques courants en lithothérapie.",
        bullets: [
          "calme : améthyste, howlite, quartz rose ;",
          "protection symbolique : labradorite, obsidienne noire, tourmaline noire ;",
          "confiance : œil de tigre, cornaline, citrine ;",
          "amour et douceur : quartz rose, rhodonite, pierre de lune ;",
          "communication : apatite bleue, lapis-lazuli, calcédoine bleue."
        ]
      }
    ],
    relatedLinks: [
      { href: "/intentions/stress", label: "Pierres pour le stress" },
      { href: "/intentions/protection", label: "Pierres de protection" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  }
];

export function getEditorialGuide(slug: string) {
  return editorialGuides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: EditorialGuide["category"]) {
  return editorialGuides.filter((guide) => guide.category === category);
}
