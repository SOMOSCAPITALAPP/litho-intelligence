export type EditorialGuide = {
  slug: string;
  title: string;
  description: string;
  category: "guide" | "entretien" | "comparatif" | "journal";
  updatedAt: string;
  productStoneSlug?: string;
  bookTag?: string;
  sections: Array<{
    title: string;
    body?: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
  faq?: Array<{ question: string; answer: string }>;
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
  },
  {
    slug: "quelle-pierre-pour-le-stress-guide-complet",
    title: "Quelle pierre pour le stress ? Guide complet et responsable",
    description:
      "Guide long pour choisir une pierre traditionnellement associée au calme, au recentrage et aux rituels personnels face au stress du quotidien.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "amethyste",
    bookTag: "fondamentaux",
    sections: [
      {
        title: "Comprendre la demande derrière le mot stress",
        paragraphs: [
          "La requête « quelle pierre pour le stress » est l'une des plus fréquentes dans l'univers des pierres naturelles. Elle ne traduit pas seulement une curiosité minérale : elle révèle souvent un besoin de pause, de simplicité et de rituel. La bonne réponse ne doit donc pas promettre un effet certain, mais aider la personne à choisir un support symbolique cohérent avec son vécu.",
          "Sur Litho Intelligence, le stress est abordé comme une expérience humaine du quotidien, pas comme un diagnostic. Une pierre peut accompagner un geste de respiration, un moment d'écriture, une routine du soir ou une transition entre le travail et la maison. Elle devient un rappel visible : ralentir, poser le téléphone, boire un verre d'eau, respirer plus lentement, revenir à une phrase courte."
        ]
      },
      {
        title: "Les pierres les plus lisibles pour le calme",
        paragraphs: [
          "L'améthyste est souvent associée au calme, au recul et au rituel du soir. Sa couleur violette la rend facilement identifiable et son image est bien installée dans les traditions contemporaines de lithothérapie. La howlite, plus claire et veinée, porte une symbolique de patience, de sobriété et de ralentissement. Le quartz rose ajoute une dimension plus tendre, utile lorsque le besoin dominant est la douceur envers soi.",
          "La labradorite peut aussi être pertinente lorsque le stress vient surtout d'une surcharge relationnelle ou d'un sentiment d'absorption des ambiances. Elle est alors choisie comme pierre de protection symbolique, avec une intention de limite personnelle. Le choix dépend donc du contexte : fatigue mentale, agitation du soir, hypersensibilité, besoin de tendresse ou recherche d'un objet discret à porter."
        ],
        bullets: [
          "Améthyste : rituel du soir, recul, calme symbolique.",
          "Howlite : patience, simplicité, ralentissement.",
          "Quartz rose : douceur, tendresse, relation à soi.",
          "Labradorite : limite personnelle, protection symbolique, recentrage.",
          "Apatite bleue : parole plus claire lorsque le stress vient d'un non-dit."
        ]
      },
      {
        title: "Comment porter la pierre sans créer d'attente excessive",
        paragraphs: [
          "Le bracelet reste le format le plus pratique pour une intention de calme. Il est visible, facile à toucher et peut devenir un signal discret dans la journée. Avant une réunion, un trajet ou une soirée chargée, poser deux doigts sur les perles et respirer pendant trente secondes suffit à transformer l'objet en rappel concret.",
          "L'essentiel est de garder une méthode simple. Choisissez une seule pierre principale, une phrase d'intention et un moment d'usage. Par exemple : « je ralentis avant de répondre », « je reviens à ma respiration », « je m'accorde une pause ». La pierre ne fait pas le travail à votre place ; elle donne une forme matérielle au choix que vous voulez pratiquer."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Pour une première pierre associée au stress, l'améthyste est un choix équilibré : connue, esthétique, facile à offrir et compatible avec une routine de fin de journée. Pour une personne qui préfère un style clair et minimaliste, la howlite sera souvent plus discrète. Pour un cadeau doux, le quartz rose reste très compréhensible.",
          "Avant d'acheter, vérifiez la photo, la taille des perles, les conditions de retour et la cohérence du vendeur. Évitez les annonces qui promettent des effets certains ou utilisent un vocabulaire médical. Une bonne annonce doit expliquer le produit, pas vendre une certitude."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre choisir en premier pour une intention de calme ?",
        answer: "L'améthyste, la howlite et le quartz rose sont des choix simples pour commencer, selon que vous recherchez recul, sobriété ou douceur symbolique."
      },
      {
        question: "Une pierre peut-elle remplacer une aide professionnelle ?",
        answer: "Non. Les pierres sont présentées comme des supports symboliques et culturels. Elles ne remplacent jamais un avis médical, psychologique ou professionnel."
      },
      {
        question: "Quel format choisir pour le quotidien ?",
        answer: "Le bracelet est souvent le plus pratique, car il reste visible et peut rappeler une intention de respiration ou de pause."
      }
    ],
    relatedLinks: [
      { href: "/intentions/stress", label: "Page intention stress" },
      { href: "/pierres/amethyste", label: "Fiche améthyste" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "pierres-de-protection-guide-labradorite-obsidienne-tourmaline",
    title: "Pierres de protection : labradorite, obsidienne ou tourmaline ?",
    description:
      "Guide long pour comparer les pierres de protection symbolique et choisir un bracelet cohérent avec son intention du moment.",
    category: "comparatif",
    updatedAt: "2026-09-07",
    productStoneSlug: "labradorite",
    bookTag: "protection",
    sections: [
      {
        title: "La protection comme intention de limite",
        paragraphs: [
          "Dans les recherches autour de la lithothérapie, la protection est un mot très puissant. Il attire parce qu'il parle de fatigue relationnelle, de lieux chargés, de surcharge émotionnelle et de besoin de revenir à soi. Pour rester responsable, il faut toutefois préciser le cadre : ici, la protection est symbolique. Elle ne constitue pas une barrière objective, mais une intention personnelle de limite, d'ancrage et de discernement.",
          "Une pierre de protection peut devenir un rappel : ne pas tout absorber, ne pas répondre trop vite, choisir ses espaces, garder une distance saine. Cette lecture est plus solide que la promesse spectaculaire, parce qu'elle rend l'utilisateur acteur de son rituel."
        ]
      },
      {
        title: "Trois pierres, trois tempéraments",
        paragraphs: [
          "La labradorite est la plus nuancée. Ses reflets bleus, verts ou dorés changent avec la lumière, ce qui nourrit sa réputation de pierre frontière. Elle convient bien aux personnes sensibles, aux métiers d'écoute, aux créatifs et à celles et ceux qui cherchent une protection élégante au quotidien.",
          "L'obsidienne noire est plus intense dans son imaginaire. Son aspect sombre et volcanique évoque la lucidité, la vérité personnelle et le retour au réel. La tourmaline noire, plus sobre, parle d'ancrage et de stabilité. Elle convient à un style minimaliste, notamment en bracelet noir facile à porter."
        ],
        bullets: [
          "Labradorite : protection symbolique douce, reflets, sensibilité.",
          "Obsidienne noire : introspection, clarté, geste plus affirmé.",
          "Tourmaline noire : ancrage, sobriété, stabilité visuelle.",
          "Œil de tigre : posture, courage et protection solaire.",
          "Hématite : présence, densité, rappel du corps."
        ]
      },
      {
        title: "Quel bracelet choisir ?",
        paragraphs: [
          "Pour un premier achat, la labradorite est souvent la meilleure porte d'entrée. Elle est connue, esthétique et plus facile à associer qu'une pierre très noire ou très brillante. Elle se porte avec des vêtements sobres, fonctionne en cadeau et permet de raconter une histoire simple : poser ses limites sans se fermer.",
          "Pour un style masculin ou très minimaliste, la tourmaline noire et l'obsidienne noire peuvent être plus évidentes. Le choix doit aussi tenir compte de la taille des perles, de la solidité du fil et de la réalité des photos produit. Une fiche claire vaut mieux qu'une annonce qui multiplie les promesses."
        ]
      },
      {
        title: "Rituel responsable de protection symbolique",
        paragraphs: [
          "Le rituel peut tenir en deux minutes. Tenez le bracelet, inspirez lentement, puis formulez une limite concrète : « je choisis ce qui m'appartient », « je laisse dehors ce qui ne me concerne pas », « je reviens à mon centre ». Cette phrase donne une direction au geste.",
          "La pierre n'a pas besoin d'être portée tout le temps. Certaines personnes préfèrent la mettre seulement au travail, en déplacement ou dans les moments de forte sollicitation. Cette liberté est importante : l'objet doit soutenir une intention, pas devenir une contrainte."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle est la pierre de protection la plus facile pour débuter ?",
        answer: "La labradorite est souvent la plus accessible, car elle combine une forte symbolique de protection avec une esthétique nuancée et élégante."
      },
      {
        question: "Obsidienne et tourmaline noire signifient-elles la même chose ?",
        answer: "Non. L'obsidienne évoque davantage l'introspection, tandis que la tourmaline noire est souvent associée à l'ancrage sobre."
      },
      {
        question: "Peut-on porter plusieurs pierres de protection ensemble ?",
        answer: "Oui, mais mieux vaut commencer simplement afin de garder une intention claire et un bracelet confortable."
      }
    ],
    relatedLinks: [
      { href: "/intentions/protection", label: "Guide intention protection" },
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/boutique-pierres-naturelles", label: "Bracelets recommandés" }
    ]
  },
  {
    slug: "bracelet-labradorite-guide-achat",
    title: "Bracelet labradorite : guide d'achat, signification et entretien",
    description:
      "Guide complet pour choisir un bracelet en labradorite : reflets, qualité visuelle, taille des perles, entretien et intention de protection symbolique.",
    category: "comparatif",
    updatedAt: "2026-09-07",
    productStoneSlug: "labradorite",
    bookTag: "labradorite",
    sections: [
      {
        title: "Pourquoi le bracelet labradorite est si recherché",
        paragraphs: [
          "Le bracelet labradorite réunit plusieurs qualités rares : une pierre visuellement changeante, une couleur facile à porter et une symbolique très forte de protection intérieure. Les reflets de la labradorite créent un effet vivant, parfois bleu, vert, doré ou gris selon l'angle de la lumière. Cette dimension rend chaque bracelet un peu différent.",
          "Dans les traditions symboliques, la labradorite est souvent choisie par les personnes sensibles aux ambiances, aux échanges denses ou aux environnements très sollicitants. Elle ne doit pas être présentée comme une solution, mais comme un rappel élégant : poser ses limites, revenir à soi, choisir ce que l'on absorbe."
        ]
      },
      {
        title: "Les critères à regarder avant d'acheter",
        paragraphs: [
          "Une bonne annonce de bracelet labradorite doit montrer les perles clairement. Les reflets ne sont pas toujours visibles sur toutes les pierres, et c'est normal : la labradorescence dépend de la coupe, de la lumière et de l'orientation. Méfiez-vous des photos trop parfaites ou des perles toutes identiques.",
          "La taille des perles influence beaucoup le style. En 6 mm, le bracelet est discret. En 8 mm, il devient plus présent sans être massif. En 10 mm, l'effet bijou est plus marqué. Le fil, la taille du poignet, les pièces métalliques et les avis du vendeur comptent autant que la pierre elle-même."
        ],
        bullets: [
          "Regarder si les reflets sont visibles mais naturels.",
          "Vérifier la taille des perles et du bracelet.",
          "Comparer plusieurs photos plutôt qu'une seule image retouchée.",
          "Lire les conditions de retour avant l'achat.",
          "Éviter les annonces qui promettent un effet certain."
        ]
      },
      {
        title: "Comment porter un bracelet labradorite",
        paragraphs: [
          "Le bracelet labradorite se porte très bien au quotidien, mais il gagne à être associé à une intention précise. Par exemple : « je garde ma limite », « je ne porte pas tout », « je reviens à mon calme ». Ce type de phrase aide à transformer le bijou en repère concret.",
          "Côté style, la labradorite accompagne facilement les tenues neutres, le blanc, le noir, le beige, les verts minéraux et les dorés doux. Elle peut être portée seule ou avec un bracelet plus clair, comme le quartz clair, si l'on souhaite une association plus lumineuse."
        ]
      },
      {
        title: "Entretien prudent",
        paragraphs: [
          "La labradorite demande un entretien doux. Retirez le bracelet avant la douche, le sport, la piscine, le parfum ou les produits ménagers. Un chiffon sec suffit le plus souvent pour nettoyer les perles. Les rituels de fumigation ou de lumière indirecte peuvent être utilisés comme gestes symboliques, sans exposer la pierre à des conditions agressives.",
          "Un bracelet bien entretenu conserve mieux son poli et son confort. C'est aussi une manière de respecter l'objet, ce qui renforce la relation symbolique que l'on construit avec lui."
        ]
      }
    ],
    faq: [
      {
        question: "Une labradorite sans reflet est-elle forcément fausse ?",
        answer: "Non. Les reflets dépendent de l'angle, de la lumière et de la coupe. Il faut comparer plusieurs indices avant de juger."
      },
      {
        question: "Quelle taille de perles choisir ?",
        answer: "Le 8 mm est souvent le meilleur compromis entre présence visuelle, confort et lisibilité des reflets."
      },
      {
        question: "Peut-on offrir un bracelet labradorite ?",
        answer: "Oui, c'est une idée cadeau forte lorsque le message porte sur la protection symbolique, le recentrage ou les limites personnelles."
      }
    ],
    relatedLinks: [
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/intentions/protection", label: "Pierres de protection" },
      { href: "/boutique-pierres-naturelles", label: "Voir la boutique" }
    ]
  },
  {
    slug: "quartz-rose-amour-soi-guide",
    title: "Quartz rose : amour de soi, douceur et bracelet à offrir",
    description:
      "Guide SEO pour comprendre le quartz rose, son association symbolique à l'amour de soi, les idées cadeaux et le choix d'un bracelet.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "quartz-rose",
    bookTag: "quartz-rose",
    sections: [
      {
        title: "Pourquoi le quartz rose touche autant",
        paragraphs: [
          "Le quartz rose est l'une des pierres les plus faciles à comprendre. Sa couleur douce, son lien culturel avec le cœur et son image de tendresse en font une pierre souvent choisie pour soi ou pour offrir. Elle parle moins de performance que de délicatesse, de lien et d'attention.",
          "Dans les traditions symboliques de lithothérapie, le quartz rose est associé à l'amour de soi, à la douceur relationnelle et à l'ouverture affective. Il ne s'agit pas d'une promesse, mais d'un langage : porter une pierre rose peut rappeler que la fermeté n'empêche pas la tendresse, et qu'un objet simple peut soutenir une intention quotidienne."
        ]
      },
      {
        title: "Pour quelles intentions choisir le quartz rose",
        paragraphs: [
          "Le quartz rose convient aux intentions liées à l'amour, au pardon symbolique, à la douceur envers soi, au besoin de lien ou à un cadeau affectif. Il fonctionne bien lorsque l'on veut offrir un bijou avec un message simple, sans vocabulaire compliqué ni symbolique trop intense.",
          "Il peut aussi accompagner une période où l'on souhaite ralentir le jugement intérieur. Dans ce cas, le bracelet devient un rappel : parler plus doucement, ne pas tout exiger de soi, choisir une phrase bienveillante avant de commencer la journée."
        ],
        bullets: [
          "Amour de soi : se parler avec plus de douceur.",
          "Cadeau : transmettre un message tendre et facile à comprendre.",
          "Relation : symboliser le lien, l'écoute et la délicatesse.",
          "Rituel du soir : déposer la journée avec plus de calme.",
          "Style : porter une couleur lumineuse et discrète."
        ]
      },
      {
        title: "Bracelet, pierre roulée ou livre ?",
        paragraphs: [
          "Le bracelet quartz rose est le choix le plus naturel pour un usage quotidien. Il garde la pierre visible, accompagne les gestes ordinaires et s'intègre facilement à une tenue claire, dorée, blanche ou pastel. La pierre roulée est plus intime, plutôt destinée à un bureau, une table de nuit ou une poche.",
          "Le livre consacré au quartz rose peut être intéressant lorsqu'on veut offrir plus qu'un bijou : une petite histoire, une lecture, un moment pour comprendre la symbolique. C'est une combinaison simple pour un cadeau : bracelet, livre et carte d'intention courte."
        ]
      },
      {
        title: "Choisir avec élégance",
        paragraphs: [
          "Pour acheter un bracelet quartz rose, regardez la régularité des perles, la transparence de la couleur, le montage et la taille. Le quartz rose peut être très pâle, légèrement laiteux ou plus soutenu. Une couleur uniforme et trop vive doit inviter à vérifier la description.",
          "Le bon produit est celui qui reste cohérent avec la personne : discret pour un usage quotidien, plus visible pour un cadeau affirmé, simple si l'on veut éviter l'effet trop chargé. La meilleure vente, ici, vient de la justesse du message."
        ]
      }
    ],
    faq: [
      {
        question: "Le quartz rose est-il une bonne pierre à offrir ?",
        answer: "Oui, car sa symbolique de tendresse et d'amour de soi est facile à comprendre et convient à de nombreuses occasions."
      },
      {
        question: "Avec quelle pierre associer le quartz rose ?",
        answer: "Il s'associe souvent avec l'améthyste pour une intention calme ou avec le quartz clair pour une lecture plus lumineuse."
      },
      {
        question: "Quel message écrire avec un bracelet quartz rose ?",
        answer: "Un message simple suffit : « une pierre douce pour te rappeler de prendre soin de toi »."
      }
    ],
    relatedLinks: [
      { href: "/intentions/amour", label: "Pierres pour l'amour" },
      { href: "/pierres/quartz-rose", label: "Fiche quartz rose" },
      { href: "/idee-cadeau", label: "Trouver une idée cadeau" }
    ]
  },
  {
    slug: "oeil-de-tigre-confiance-protection-guide",
    title: "Œil de tigre : confiance, protection symbolique et bracelet",
    description:
      "Guide pour comprendre l'œil de tigre, sa symbolique solaire, les intentions de confiance et les critères d'achat d'un bracelet.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "oeil-de-tigre",
    sections: [
      {
        title: "Une pierre solaire très lisible",
        paragraphs: [
          "L'œil de tigre se reconnaît immédiatement à ses reflets bruns, dorés et chatoyants. Cette présence visuelle explique son succès : la pierre raconte déjà quelque chose avant même qu'on lise sa fiche. Elle évoque la posture, la vigilance, la chaleur et le courage tranquille.",
          "Dans les traditions symboliques, l'œil de tigre est souvent associé à la confiance, à la protection solaire et au passage à l'action. C'est une pierre utile dans un parcours éditorial parce qu'elle se comprend vite : elle ne parle pas seulement de calme, mais d'élan maîtrisé."
        ]
      },
      {
        title: "Quand le choisir",
        paragraphs: [
          "L'œil de tigre convient lorsqu'une personne cherche à affirmer une décision, préparer une prise de parole, retrouver une posture plus stable ou offrir un bijou avec une symbolique forte. Il est aussi très demandé en bracelet homme, car ses couleurs chaudes restent sobres et faciles à porter.",
          "Il peut être préféré à la labradorite lorsque l'intention dominante n'est pas la protection des ambiances, mais la confiance dans l'action. Là où la labradorite rappelle la limite, l'œil de tigre rappelle la direction."
        ],
        bullets: [
          "Confiance : posture, décision, affirmation.",
          "Protection symbolique : énergie solaire et limite active.",
          "Cadeau professionnel : encouragement, passage à l'action.",
          "Style homme : brun, doré, sobre et minéral.",
          "Association : hématite ou jaspe pour une présence plus ancrée."
        ]
      },
      {
        title: "Le bracelet œil de tigre au quotidien",
        paragraphs: [
          "En bracelet, l'œil de tigre est très visible. Les perles de 8 mm sont souvent le bon compromis : assez grandes pour montrer les reflets, mais pas trop imposantes. Une finition mate donne un style plus discret ; une finition brillante accentue l'effet bijou.",
          "Le rituel peut être orienté vers une action concrète : envoyer un message, prendre la parole, classer une décision, poser un cadre. La pierre devient le rappel de cette action, pas son substitut."
        ]
      },
      {
        title: "Acheter sans se laisser hypnotiser par la couleur",
        paragraphs: [
          "Les reflets de l'œil de tigre peuvent être superbes en photo. Il faut pourtant garder des critères simples : taille, montage, vendeur, retours, avis, cohérence du prix. Une bonne annonce décrit le bracelet avant de parler de symbolique.",
          "Pour renforcer la conversion, la page produit doit rassurer : disponible sur Amazon selon les conditions du vendeur, choix personnel, intention symbolique et absence de promesse excessive."
        ]
      }
    ],
    faq: [
      {
        question: "L'œil de tigre convient-il aux hommes ?",
        answer: "Oui, ses teintes brunes et dorées en font l'une des pierres les plus faciles à porter dans un style masculin sobre."
      },
      {
        question: "Quelle différence avec la labradorite ?",
        answer: "La labradorite est davantage associée à la protection intérieure, tandis que l'œil de tigre évoque la confiance et l'action."
      },
      {
        question: "Peut-on offrir un bracelet œil de tigre ?",
        answer: "Oui, notamment pour encourager une personne dans une décision, un projet ou une étape professionnelle."
      }
    ],
    relatedLinks: [
      { href: "/intentions/confiance", label: "Pierres pour la confiance" },
      { href: "/pierres/oeil-de-tigre", label: "Fiche œil de tigre" },
      { href: "/boutique-pierres-naturelles", label: "Bracelets recommandés" }
    ]
  },
  {
    slug: "amethyste-sommeil-calme-rituel-soir",
    title: "Améthyste : sommeil, calme et rituel du soir",
    description:
      "Guide responsable sur l'améthyste, sa symbolique de calme, son usage dans un rituel du soir et le choix d'un bracelet.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "amethyste",
    sections: [
      {
        title: "Une pierre violette associée au recul",
        paragraphs: [
          "L'améthyste est l'une des pierres les plus connues du grand public. Sa couleur violette, parfois claire, parfois profonde, lui donne une identité immédiatement reconnaissable. Dans les traditions symboliques, elle est souvent associée au calme, au recul intérieur, à la sobriété et au rituel du soir.",
          "Pour rester juste, il faut parler de sommeil avec prudence. L'améthyste ne doit pas être présentée comme une solution au trouble du sommeil. Elle peut en revanche accompagner une routine personnelle : baisser l'intensité, ranger l'écran, respirer, écrire quelques lignes, poser le bracelet ou la pierre près du lit."
        ]
      },
      {
        title: "Créer un rituel du soir simple",
        paragraphs: [
          "Le rituel du soir fonctionne mieux lorsqu'il est court. Une pierre posée sur une table de nuit ou un bracelet retiré lentement peut marquer la transition entre la journée et le repos. L'utilisateur peut formuler une phrase : « je dépose ce qui appartient à la journée » ou « je reviens à une présence plus douce ».",
          "Ce type de geste n'a pas besoin de décor complexe. C'est même sa simplicité qui le rend durable. Une personne qui répète le même geste plusieurs soirs garde une continuité, et cette continuité peut renforcer son sentiment d'organisation personnelle."
        ],
        bullets: [
          "Éteindre ou éloigner l'écran quelques minutes.",
          "Tenir la pierre ou le bracelet dans la main.",
          "Respirer lentement pendant deux minutes.",
          "Formuler une phrase courte et apaisante.",
          "Poser le bracelet au même endroit chaque soir."
        ]
      },
      {
        title: "Bracelet ou pierre de chevet ?",
        paragraphs: [
          "Le bracelet améthyste convient si l'on veut porter l'intention dans la journée puis la déposer le soir. Une pierre roulée ou un petit galet convient mieux à une table de nuit. Les deux usages peuvent se compléter, mais il vaut mieux commencer avec un seul objet pour éviter l'accumulation.",
          "Un bracelet doit rester confortable. Si les perles sont trop grandes ou trop lourdes, elles peuvent gêner. La qualité du montage est donc essentielle, surtout pour un bijou porté régulièrement."
        ]
      },
      {
        title: "Entretien et prudence",
        paragraphs: [
          "L'améthyste appartient à la famille du quartz, mais elle mérite tout de même un entretien doux. Évitez les expositions prolongées au soleil intense, qui peuvent altérer certaines couleurs. Retirez le bracelet avant la douche, la piscine, le sport et le parfum.",
          "La dimension symbolique est plus claire lorsque l'objet est bien entretenu. Un chiffon doux, un rangement simple et une intention sobre suffisent souvent."
        ]
      }
    ],
    faq: [
      {
        question: "L'améthyste est-elle une pierre pour dormir ?",
        answer: "Elle est traditionnellement associée au calme et au rituel du soir, mais elle ne remplace jamais un avis professionnel en cas de difficulté durable."
      },
      {
        question: "Peut-on porter l'améthyste tous les jours ?",
        answer: "Oui, si le bracelet est confortable et retiré avant l'eau, le sport et les produits parfumés."
      },
      {
        question: "Avec quelle pierre l'associer ?",
        answer: "La howlite ou le quartz rose peuvent compléter une intention de douceur et de ralentissement symbolique."
      }
    ],
    relatedLinks: [
      { href: "/intentions/sommeil", label: "Pierres pour le sommeil" },
      { href: "/pierres/amethyste", label: "Fiche améthyste" },
      { href: "/guides/purification-rechargement-pierres", label: "Entretien des pierres" }
    ]
  },
  {
    slug: "howlite-stress-sommeil-guide",
    title: "Howlite : pierre blanche pour calme, patience et rituel doux",
    description:
      "Guide long sur la howlite, sa symbolique de patience, son usage dans les intentions de stress, sommeil et simplicité.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "howlite",
    sections: [
      {
        title: "La force discrète de la howlite",
        paragraphs: [
          "La howlite est une pierre blanche veinée de gris, souvent choisie par les personnes qui recherchent une esthétique simple et une symbolique douce. Contrairement aux pierres très colorées, elle ne cherche pas à attirer le regard. Elle évoque plutôt le silence, la patience, le ralentissement et la clarté d'un espace allégé.",
          "Cette sobriété la rend intéressante pour les requêtes autour du stress et du sommeil. Elle permet de proposer une alternative à l'améthyste : moins mystique visuellement, plus minimaliste, plus facile à porter pour celles et ceux qui aiment les bijoux clairs."
        ]
      },
      {
        title: "Intentions associées",
        paragraphs: [
          "Dans les croyances de lithothérapie, la howlite est souvent reliée à la patience, au calme mental symbolique et à la capacité de ralentir. Ces mots doivent rester au niveau culturel et personnel : la pierre accompagne un rituel, elle ne promet pas de modifier un état à elle seule.",
          "Elle convient bien aux personnes qui veulent rendre leur pratique plus simple. Un bracelet howlite peut servir de rappel pour faire moins, parler moins vite, écouter plus longtemps ou prendre une pause avant de réagir."
        ],
        bullets: [
          "Stress du quotidien : créer un rappel de ralentissement.",
          "Sommeil : installer un rituel du soir sobre.",
          "Patience : choisir une phrase d'intention avant une discussion.",
          "Cadeau : offrir une pierre claire au message délicat.",
          "Style : blanc minéral, facile à associer."
        ]
      },
      {
        title: "Attention aux imitations et teintures",
        paragraphs: [
          "La howlite est parfois teintée pour imiter d'autres pierres, notamment la turquoise. Ce n'est pas nécessairement problématique si le vendeur l'indique clairement. Le sujet central est la transparence : l'acheteur doit savoir ce qu'il reçoit.",
          "Pour un bracelet howlite blanche, cherchez des photos nettes, une description précise et des perles dont les veines restent naturelles. Une couleur trop uniforme ou un nom commercial ambigu doit inviter à lire plus attentivement."
        ]
      },
      {
        title: "Rituel minimaliste",
        paragraphs: [
          "Le rituel howlite peut être très simple : poser le bracelet dans la main, expirer lentement, puis choisir une seule action de calme pour les dix prochaines minutes. Cela peut être ranger le bureau, marcher sans téléphone, écrire une phrase ou fermer une conversation inutile.",
          "Cette approche convient bien à la marque Litho Intelligence : concrète, responsable, accessible et sans promesse excessive. La pierre devient un support de décision, pas un argument spectaculaire."
        ]
      }
    ],
    faq: [
      {
        question: "La howlite est-elle adaptée pour un cadeau ?",
        answer: "Oui, son esthétique blanche et sa symbolique de calme en font un cadeau facile à comprendre et à porter."
      },
      {
        question: "La howlite peut-elle être teintée ?",
        answer: "Oui. Il faut vérifier si le vendeur mentionne une teinture ou une imitation, surtout pour les couleurs très vives."
      },
      {
        question: "Quelle différence avec l'améthyste ?",
        answer: "L'améthyste est plus expressive et violette ; la howlite est plus sobre, blanche et minimaliste."
      }
    ],
    relatedLinks: [
      { href: "/pierres/howlite", label: "Fiche howlite" },
      { href: "/intentions/stress", label: "Pierres pour le stress" },
      { href: "/intentions/sommeil", label: "Pierres pour le sommeil" }
    ]
  },
  {
    slug: "pyrite-abondance-organisation-guide",
    title: "Pyrite : abondance symbolique, organisation et énergie de projet",
    description:
      "Guide sur la pyrite, sa symbolique dorée, son usage autour de l'abondance responsable, du travail et du bracelet recommandé.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "pyrite",
    sections: [
      {
        title: "L'abondance comme intention responsable",
        paragraphs: [
          "La pyrite attire parce qu'elle ressemble à une matière précieuse : éclat métallique, reflets dorés, présence presque architecturale. Dans les traditions symboliques, elle est souvent associée à l'abondance, à la clarté mentale, à l'organisation et à l'énergie de projet.",
          "Pour rester conforme et crédible, il faut parler d'abondance avec maturité. Une pierre ne crée pas un résultat financier. Elle peut en revanche accompagner une posture : clarifier ses priorités, structurer son bureau, tenir un budget, préparer une proposition, avancer avec régularité."
        ]
      },
      {
        title: "Pourquoi la pyrite fonctionne bien en contenu business",
        paragraphs: [
          "La pyrite relie l'univers des pierres naturelles à des sujets concrets : travail, ambition, organisation, entrepreneuriat, concentration symbolique, cadeau professionnel. Elle permet donc de créer des pages qui parlent à un public plus large que les passionnés de lithothérapie.",
          "Un bracelet pyrite peut être présenté comme un rappel doré d'intention : garder le cap, structurer son action, faire une chose importante avant de se disperser. Le vocabulaire doit rester sobre et adulte."
        ],
        bullets: [
          "Abondance symbolique : ouverture, clarté, rapport responsable à la valeur.",
          "Projet : organisation, priorité, passage à l'action.",
          "Cadeau professionnel : encouragement élégant et minéral.",
          "Style : éclat doré, présence forte, bijou visible.",
          "Entretien : garder la pyrite au sec et éviter l'eau prolongée."
        ]
      },
      {
        title: "Choisir un bracelet pyrite",
        paragraphs: [
          "La pyrite peut être plus fragile qu'elle n'en a l'air lorsqu'elle est exposée à l'humidité. Pour un bracelet, il faut donc vérifier le montage, la qualité des perles, la présence éventuelle de pièces métalliques et les conseils d'entretien. Un vendeur sérieux ne se contente pas d'un discours inspirant : il donne des informations pratiques.",
          "Visuellement, la pyrite est forte. Elle convient aux personnes qui aiment les bijoux affirmés, dorés ou minéraux. Pour un style plus discret, il peut être préférable de choisir de petites perles ou de la porter seule."
        ]
      },
      {
        title: "Rituel de projet en deux minutes",
        paragraphs: [
          "Posez le bracelet sur le bureau, notez une tâche importante, puis formulez une phrase : « je choisis une action claire ». Ensuite, réalisez uniquement cette tâche pendant dix minutes. Le bracelet sert de repère visuel pour revenir à la priorité.",
          "Cette approche relie la symbolique à une action vérifiable. Elle évite la promesse vague et renforce la valeur perçue du produit : le bijou accompagne une décision concrète."
        ]
      }
    ],
    faq: [
      {
        question: "La pyrite est-elle associée à l'argent ?",
        answer: "Elle est traditionnellement associée à l'abondance symbolique, mais elle ne garantit aucun résultat financier."
      },
      {
        question: "Peut-on mouiller un bracelet pyrite ?",
        answer: "Il vaut mieux éviter l'eau prolongée et privilégier un chiffon doux et sec."
      },
      {
        question: "À qui offrir de la pyrite ?",
        answer: "Elle convient bien à une personne qui lance un projet, cherche à s'organiser ou aime les bijoux dorés à forte présence."
      }
    ],
    relatedLinks: [
      { href: "/intentions/argent-abondance", label: "Pierres pour abondance symbolique" },
      { href: "/pierres/pyrite", label: "Fiche pyrite" },
      { href: "/boutique-pierres-naturelles", label: "Voir le bracelet pyrite" }
    ]
  },
  {
    slug: "bracelet-pierre-naturelle-femme-cadeau",
    title: "Bracelet pierre naturelle femme : idées cadeau par intention",
    description:
      "Guide cadeau pour choisir un bracelet en pierre naturelle pour femme selon l'intention : amour, protection, calme, énergie ou confiance.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "quartz-rose",
    bookTag: "cadeau",
    sections: [
      {
        title: "Un cadeau qui porte un message",
        paragraphs: [
          "Offrir un bracelet en pierre naturelle n'est pas seulement offrir un bijou. C'est souvent transmettre une intention : douceur, protection, encouragement, calme, confiance ou nouveau départ. C'est pour cela que ce type de cadeau fonctionne bien : il donne un sens simple à un objet facile à porter.",
          "Pour une femme, le bon choix dépend moins d'une règle universelle que du message que l'on veut envoyer. Le quartz rose parle de tendresse. La labradorite parle de protection symbolique. L'améthyste évoque le calme. L'œil de tigre apporte une note plus solaire. La pyrite donne une présence dorée liée aux projets."
        ]
      },
      {
        title: "Choisir selon la relation",
        paragraphs: [
          "Pour une mère, un bracelet quartz rose ou améthyste peut transmettre une attention douce et reconnaissante. Pour une amie, la labradorite ou la howlite peuvent accompagner une période intense avec délicatesse. Pour une conjointe, le quartz rose reste évident si le message est affectif, tandis que la pierre de lune ou l'améthyste peuvent donner une nuance plus intime.",
          "Pour une collègue, mieux vaut rester sobre : howlite, labradorite ou œil de tigre, avec un message d'encouragement non intrusif. Le cadeau doit rester élégant, pas trop personnel si la relation ne s'y prête pas."
        ],
        bullets: [
          "Amour et tendresse : quartz rose.",
          "Protection symbolique : labradorite.",
          "Calme et rituel du soir : améthyste ou howlite.",
          "Confiance et action : œil de tigre.",
          "Projet ou réussite symbolique : pyrite."
        ]
      },
      {
        title: "La combinaison livre et bracelet",
        paragraphs: [
          "Pour augmenter la valeur perçue du cadeau, la combinaison bracelet + livre fonctionne très bien. Le bracelet donne l'objet à porter, le livre donne l'histoire à lire. Cette association est particulièrement pertinente pour la labradorite et le quartz rose, deux pierres faciles à raconter.",
          "Une carte courte peut suffire : « une pierre choisie pour t'accompagner avec douceur », « un bracelet pour te rappeler ta force tranquille », « un petit repère pour ton nouveau départ ». L'élégance vient de la justesse, pas de l'excès."
        ]
      },
      {
        title: "Acheter avec attention",
        paragraphs: [
          "Regardez la taille du bracelet, les photos, les avis, les délais et les conditions de retour. Si le cadeau doit arriver pour une date précise, Amazon peut être pratique, mais il faut vérifier la disponibilité réelle avant de commander.",
          "Évitez les descriptions trop fortes. Un cadeau en pierre naturelle doit rester un geste symbolique, culturel et esthétique. Cette sobriété protège la personne qui offre et celle qui reçoit."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre offrir à une femme ?",
        answer: "Le quartz rose est le choix le plus doux, la labradorite le plus protecteur symboliquement, et l'améthyste le plus lié au calme."
      },
      {
        question: "Quel bracelet choisir si je connais peu la personne ?",
        answer: "La howlite ou la labradorite sont de bons choix sobres, faciles à porter et moins intimes que le quartz rose."
      },
      {
        question: "Faut-il ajouter un message avec le bracelet ?",
        answer: "Oui, une phrase simple augmente fortement la valeur émotionnelle du cadeau."
      }
    ],
    relatedLinks: [
      { href: "/idee-cadeau", label: "Tunnel idée cadeau" },
      { href: "/intentions/cadeau", label: "Pierres à offrir" },
      { href: "/boutique-pierres-naturelles", label: "Boutique recommandée" }
    ]
  },
  {
    slug: "bracelet-pierre-naturelle-homme-style-protection",
    title: "Bracelet pierre naturelle homme : style, protection et confiance",
    description:
      "Guide pour choisir un bracelet en pierre naturelle pour homme selon le style, l'intention symbolique et le confort au quotidien.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "oeil-de-tigre",
    sections: [
      {
        title: "Le bracelet homme doit d'abord être portable",
        paragraphs: [
          "Un bracelet en pierre naturelle pour homme doit trouver le bon équilibre entre style, confort et signification. Trop massif, il risque de rester dans un tiroir. Trop discret, il perd son impact visuel. Les pierres brunes, noires, grises ou dorées sont souvent les plus faciles à porter au quotidien.",
          "L'œil de tigre, la tourmaline noire, l'obsidienne, l'hématite, la pierre de lave et la labradorite foncée sont des choix fréquents. Leur intérêt vient autant de leur esthétique que de leur symbolique : protection, confiance, ancrage, présence ou énergie de projet."
        ]
      },
      {
        title: "Choisir selon l'intention",
        paragraphs: [
          "Pour une intention de confiance, l'œil de tigre est très lisible. Ses reflets dorés parlent d'action, de posture et de décision. Pour une intention de protection sobre, la tourmaline noire ou l'obsidienne noire donnent un style minimaliste. Pour une énergie plus urbaine, la pierre de lave apporte une texture mate et volcanique.",
          "La labradorite foncée convient à ceux qui veulent une pierre plus nuancée, avec des reflets discrets. Elle peut être portée au travail sans donner une impression trop ésotérique."
        ],
        bullets: [
          "Œil de tigre : confiance et présence solaire.",
          "Tourmaline noire : ancrage et sobriété.",
          "Obsidienne noire : intensité et retour à soi.",
          "Pierre de lave : texture mate et style urbain.",
          "Labradorite foncée : protection symbolique élégante."
        ]
      },
      {
        title: "Taille, confort et usage",
        paragraphs: [
          "Les perles de 8 mm sont souvent un bon standard pour homme. Elles restent visibles sans devenir trop imposantes. Les perles de 10 mm conviennent à un poignet large ou à un style affirmé. Les montages réglables peuvent être utiles si l'on ne connaît pas précisément la taille.",
          "Le confort doit primer. Un bracelet porté toute la journée doit résister aux gestes ordinaires, mais il vaut mieux le retirer avant le sport, la douche ou les travaux manuels. Cette précaution prolonge la durée de vie du bijou."
        ]
      },
      {
        title: "Le bon message cadeau",
        paragraphs: [
          "Pour offrir un bracelet à un homme, évitez les phrases trop chargées. Préférez un message clair : « pour t'accompagner dans ton projet », « pour garder le cap », « pour symboliser force calme et protection ». Le cadeau reste élégant parce qu'il respecte la personne.",
          "La page d'achat doit ensuite faire le travail pratique : produit visible, prix, disponibilité, conditions du vendeur et lien Amazon. L'émotion ouvre la porte, la clarté commerciale rassure."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre naturelle choisir pour un bracelet homme ?",
        answer: "L'œil de tigre, la tourmaline noire, l'obsidienne, l'hématite et la labradorite foncée sont des choix sobres et faciles à porter."
      },
      {
        question: "Quelle taille de perles choisir ?",
        answer: "Le 8 mm est souvent le format le plus polyvalent pour un bracelet homme."
      },
      {
        question: "Quel bracelet homme offrir pour la protection symbolique ?",
        answer: "La labradorite foncée, l'obsidienne noire ou la tourmaline noire sont les choix les plus cohérents."
      }
    ],
    relatedLinks: [
      { href: "/boutique-pierres-naturelles", label: "Bracelets homme" },
      { href: "/intentions/protection", label: "Pierres de protection" },
      { href: "/pierres/oeil-de-tigre", label: "Fiche œil de tigre" }
    ]
  },
  {
    slug: "formation-lithotherapie-debutant-pdf",
    title: "Formation lithothérapie débutant : cours, PDF et QCM gratuits",
    description:
      "Guide pour apprendre la lithothérapie symbolique avec une formation débutant structurée, des PDF, des cours écrits et des QCM.",
    category: "guide",
    updatedAt: "2026-09-07",
    bookTag: "formation",
    sections: [
      {
        title: "Pourquoi une formation écrite peut être plus efficace qu'une vidéo",
        paragraphs: [
          "Une formation en lithothérapie n'a pas forcément besoin de vidéo pour être utile. Le format écrit oblige à clarifier les définitions, à relire les passages importants et à garder des supports. Pour un débutant, les PDF et les QCM sont même très pratiques : ils permettent de progresser à son rythme et de vérifier ce que l'on a compris.",
          "Litho Intelligence privilégie une approche structurée : distinguer minéralogie, traditions symboliques, choix par intention, entretien prudent et communication responsable. Cette méthode évite de réduire les pierres à une liste de promesses ou à une accumulation d'informations floues."
        ]
      },
      {
        title: "Ce qu'un débutant doit apprendre en premier",
        paragraphs: [
          "Le premier objectif n'est pas de connaître cinquante pierres. Il est de comprendre comment choisir, observer et utiliser une pierre sans confusion. Une personne qui sait formuler une intention, lire une fiche produit, entretenir un bracelet et reconnaître les limites du discours symbolique possède déjà une base solide.",
          "Les modules gratuits doivent donc être progressifs : définition responsable, choix par intention, grandes familles de pierres, entretien, association, cadeau, puis communication claire. Le QCM à chaque étape aide à transformer la lecture en apprentissage actif."
        ],
        bullets: [
          "Comprendre la différence entre fait minéralogique et tradition symbolique.",
          "Choisir une pierre selon une intention précise.",
          "Éviter les promesses excessives.",
          "Entretenir les pierres avec prudence.",
          "Savoir conseiller sans dépasser le cadre du bien-être symbolique."
        ]
      },
      {
        title: "Le rôle des livres dans l'apprentissage",
        paragraphs: [
          "Les livres papier complètent bien une formation gratuite. Ils permettent d'approfondir une pierre comme la labradorite ou le quartz rose, de prendre des notes et de construire une bibliothèque personnelle. Ils sont aussi utiles pour les personnes qui aiment apprendre loin des écrans.",
          "L'association formation gratuite + guide PDF + livre recommandé est intéressante commercialement : elle respecte l'utilisateur, donne de la valeur avant la vente et propose ensuite un approfondissement naturel."
        ]
      },
      {
        title: "Passer ensuite à la formation certifiante",
        paragraphs: [
          "La formation gratuite doit donner les bases. La formation certifiante peut ensuite aller plus loin : études de cas, posture de conseil, fiches détaillées, QCM final, certificat, et méthode pour construire une recommandation responsable. Le passage au payant devient légitime si la partie gratuite est déjà utile.",
          "Cette logique freemium est saine : l'utilisateur reçoit d'abord une vraie valeur, puis choisit d'approfondir s'il veut structurer sa pratique."
        ]
      }
    ],
    faq: [
      {
        question: "Peut-on apprendre la lithothérapie sans vidéo ?",
        answer: "Oui. Des cours écrits, des PDF et des QCM peuvent offrir un apprentissage clair, progressif et facile à relire."
      },
      {
        question: "La formation gratuite suffit-elle pour débuter ?",
        answer: "Elle suffit pour acquérir les bases responsables. La formation certifiante peut ensuite approfondir la méthode et la posture de conseil."
      },
      {
        question: "Pourquoi demander un email pour la formation ?",
        answer: "L'email permet d'envoyer les ressources, de reprendre le parcours et de proposer des contenus complémentaires avec consentement."
      }
    ],
    relatedLinks: [
      { href: "/formation", label: "Accéder à la formation gratuite" },
      { href: "/guides/debuter-lithotherapie-symbolique", label: "Débuter en lithothérapie" },
      { href: "/guides/guide-pierres-naturelles", label: "Guide des pierres naturelles" }
    ]
  },
  {
    slug: "purification-pierres-eau-sel-soleil-guide",
    title: "Purification des pierres : eau, sel, soleil ou méthode douce ?",
    description:
      "Guide pratique pour entretenir les pierres naturelles avec prudence et choisir des rituels symboliques sans abîmer les minéraux.",
    category: "entretien",
    updatedAt: "2026-09-07",
    sections: [
      {
        title: "Pourquoi la prudence doit passer avant le rituel",
        paragraphs: [
          "La purification des pierres est un sujet très recherché, mais aussi très propice aux erreurs. Eau, sel, soleil, pleine lune, fumigation : les méthodes circulent vite, souvent sans tenir compte de la nature réelle des minéraux. Or un bracelet est aussi un objet matériel, avec des perles, un fil, parfois du métal, parfois des traitements.",
          "La première règle est donc simple : préserver l'objet avant d'appliquer une méthode symbolique. Une pierre abîmée, rayée ou fragilisée par l'eau perd de son intérêt. Le rituel le plus responsable est celui qui respecte la matière."
        ]
      },
      {
        title: "Les méthodes à risque",
        paragraphs: [
          "L'eau prolongée peut fragiliser certaines pierres ou certains montages. Le sel peut rayer, corroder ou altérer les surfaces. Le soleil intense peut modifier certaines couleurs. Les ultrasons, la vapeur ou les produits chimiques sont rarement adaptés aux bijoux en pierres naturelles du quotidien.",
          "Quand on ne connaît pas précisément la pierre, le chiffon doux reste la meilleure base. On peut ensuite ajouter un geste symbolique sans risque : poser la pierre sur un tissu, ouvrir une fenêtre, respirer et formuler une intention courte."
        ],
        bullets: [
          "Éviter l'eau prolongée si la pierre ou le montage sont incertains.",
          "Éviter le sel direct sur les pierres polies.",
          "Éviter le soleil fort pour les pierres sensibles à la couleur.",
          "Retirer les bracelets avant douche, piscine, sport et parfum.",
          "Préférer le chiffon doux et le rangement sec."
        ]
      },
      {
        title: "Méthode douce universelle",
        paragraphs: [
          "La méthode la plus simple consiste à essuyer le bracelet avec un chiffon doux, puis à le poser quelques minutes sur un tissu propre. Si l'on souhaite garder une dimension rituelle, on peut respirer lentement et reformuler l'intention associée à la pierre. Ce geste est sûr, sobre et facile à répéter.",
          "La fumigation légère peut aussi être utilisée dans un espace ventilé, à condition de respecter les personnes sensibles aux odeurs et les règles de sécurité. Là encore, le rituel doit rester un choix personnel."
        ]
      },
      {
        title: "Adapter selon la pierre",
        paragraphs: [
          "La pyrite doit rester au sec. La sélénite, l'angélite, la calcite ou certaines pierres plus tendres demandent une prudence particulière. Le quartz, l'améthyste ou l'œil de tigre sont plus résistants, mais cela ne justifie pas les expositions agressives.",
          "Pour un site e-commerce ou affilié, ces conseils renforcent la confiance. Une marque qui explique comment ne pas abîmer le produit vend mieux qu'une marque qui promet sans prévenir."
        ]
      }
    ],
    faq: [
      {
        question: "Peut-on purifier toutes les pierres dans l'eau ?",
        answer: "Non. Certaines pierres et certains montages supportent mal l'eau prolongée. En cas de doute, privilégiez un chiffon doux."
      },
      {
        question: "Le sel est-il recommandé ?",
        answer: "Le sel direct est souvent risqué pour les surfaces polies. Il vaut mieux utiliser une méthode douce."
      },
      {
        question: "Quelle méthode choisir quand on débute ?",
        answer: "Essuyer la pierre, la poser sur un tissu propre et reformuler une intention courte est une méthode simple et prudente."
      }
    ],
    relatedLinks: [
      { href: "/entretien", label: "Authenticité et entretien" },
      { href: "/guides/purification-rechargement-pierres", label: "Guide entretien existant" },
      { href: "/pierres", label: "Fiches pierres" }
    ]
  },
  {
    slug: "quelle-pierre-offrir-anniversaire",
    title: "Quelle pierre offrir pour un anniversaire ? Idées par intention",
    description:
      "Guide cadeau pour choisir une pierre naturelle ou un bracelet d'anniversaire selon le message : amour, protection, confiance, calme ou énergie.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "quartz-rose",
    bookTag: "cadeau",
    sections: [
      {
        title: "Un anniversaire appelle un message clair",
        paragraphs: [
          "Offrir une pierre pour un anniversaire fonctionne lorsque le message est simple. L'objectif n'est pas d'impressionner avec une liste de propriétés, mais de choisir une intention juste pour la personne : tendresse, encouragement, protection symbolique, énergie de nouveau cycle ou calme.",
          "Le bracelet est souvent le format le plus facile à offrir. Il se porte immédiatement, se glisse dans une boîte, et permet d'ajouter une carte courte. Une pierre roulée peut être plus intime ; un livre peut compléter le cadeau si la personne aime comprendre l'histoire des pierres."
        ]
      },
      {
        title: "Choisir selon le message",
        paragraphs: [
          "Pour un message affectif, le quartz rose reste le choix le plus évident. Pour soutenir une personne très sollicitée, la labradorite donne une intention de protection intérieure. Pour encourager un projet, l'œil de tigre ou la pyrite sont plus dynamiques. Pour une personne qui a besoin de douceur et de calme, l'améthyste ou la howlite sont plus adaptées.",
          "Cette logique rend la page cadeau très utile pour le SEO : l'utilisateur ne cherche pas seulement une pierre, il cherche une décision d'achat rapide et rassurante."
        ],
        bullets: [
          "Amour et affection : quartz rose.",
          "Protection symbolique : labradorite.",
          "Confiance : œil de tigre.",
          "Projet : pyrite.",
          "Calme : améthyste ou howlite."
        ]
      },
      {
        title: "Le trio gagnant : bracelet, carte, livre",
        paragraphs: [
          "Pour rendre le cadeau plus premium, associez un bracelet à une carte d'intention et, si le budget le permet, à un livre court sur la pierre. Cette combinaison crée une expérience : la personne reçoit un objet, une phrase et une histoire.",
          "Par exemple, un bracelet quartz rose avec un livre sur le quartz rose convient à un cadeau tendre. Un bracelet labradorite avec le livre associé convient mieux à une personne sensible, créative ou très exposée aux échanges."
        ]
      },
      {
        title: "Éviter les faux pas",
        paragraphs: [
          "Ne choisissez pas une pierre avec un message trop intime si la relation ne s'y prête pas. Pour une collègue ou une connaissance, préférez une intention neutre : calme, protection symbolique ou confiance. Pour une personne très proche, le quartz rose ou la labradorite peuvent porter un message plus personnel.",
          "Enfin, vérifiez la livraison, la taille du bracelet et la politique de retour. Un cadeau réussi doit arriver à temps et pouvoir être porté."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre offrir pour un anniversaire ?",
        answer: "Le quartz rose, la labradorite, l'améthyste, l'œil de tigre et la pyrite sont de bons choix selon le message souhaité."
      },
      {
        question: "Un bracelet est-il mieux qu'une pierre roulée ?",
        answer: "Pour un cadeau, le bracelet est souvent plus simple à porter et plus immédiatement valorisant."
      },
      {
        question: "Quel message écrire avec une pierre ?",
        answer: "Une phrase courte suffit, par exemple : « une pierre choisie pour accompagner ton nouveau cycle »."
      }
    ],
    relatedLinks: [
      { href: "/idee-cadeau", label: "Trouver une idée cadeau" },
      { href: "/intentions/cadeau", label: "Pierres à offrir" },
      { href: "/boutique-pierres-naturelles", label: "Voir les cadeaux" }
    ]
  },
  {
    slug: "pierre-hypersensibilite-labradorite-guide",
    title: "Pierre pour hypersensibilité : pourquoi la labradorite revient souvent",
    description:
      "Guide responsable sur les pierres traditionnellement associées à l'hypersensibilité, au recentrage et à la protection symbolique.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "labradorite",
    bookTag: "labradorite",
    sections: [
      {
        title: "Nommer l'hypersensibilité sans l'enfermer",
        paragraphs: [
          "Beaucoup de personnes cherchent une pierre pour l'hypersensibilité lorsqu'elles se sentent traversées par les ambiances, les émotions des autres ou la densité des échanges. Il faut traiter cette demande avec délicatesse : elle touche à l'intime, mais elle ne doit pas être transformée en diagnostic.",
          "Dans le cadre de Litho Intelligence, l'hypersensibilité est abordée comme une expérience personnelle. Les pierres proposées sont des supports symboliques pour se recentrer, poser une limite et ritualiser un retour à soi."
        ]
      },
      {
        title: "La labradorite comme symbole de frontière",
        paragraphs: [
          "La labradorite revient souvent parce que sa présence visuelle raconte déjà une frontière : sombre puis lumineuse, discrète puis irisée, stable puis changeante. Cette ambivalence nourrit son association à la protection symbolique des personnes sensibles.",
          "Porter une labradorite peut rappeler une phrase simple : « je n'ai pas à tout absorber ». Cette phrase est plus importante que l'objet lui-même. Le bracelet agit comme signal de retour au centre."
        ],
        bullets: [
          "Pour les environnements relationnels denses.",
          "Pour les métiers d'écoute ou d'accompagnement.",
          "Pour les périodes où l'on veut poser davantage de limites.",
          "Pour un style discret mais vivant.",
          "Pour associer protection symbolique et élégance."
        ]
      },
      {
        title: "Autres pierres possibles",
        paragraphs: [
          "La tourmaline noire peut accompagner une intention d'ancrage plus sobre. La howlite peut aider à construire un rituel de ralentissement. Le quartz rose peut apporter une dimension de douceur envers soi lorsque la sensibilité devient dure à vivre intérieurement.",
          "Le choix dépend donc du ton recherché : protection, ancrage, calme ou tendresse. Une seule pierre bien choisie vaut mieux que plusieurs pierres portées sans intention claire."
        ]
      },
      {
        title: "Transformer l'achat en rituel utile",
        paragraphs: [
          "Le bracelet labradorite peut être porté dans les moments où l'on anticipe une forte sollicitation : travail, transport, réunions, événements. Avant de le mettre, choisissez une phrase d'intention. Après l'avoir retiré, prenez quelques secondes pour déposer mentalement la journée.",
          "La vente devient plus saine lorsqu'elle accompagne cette pratique concrète. On ne vend pas une certitude ; on vend un objet porteur de sens, de beauté et de rappel personnel."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre est souvent associée à l'hypersensibilité ?",
        answer: "La labradorite est souvent citée pour une intention de protection symbolique et de recentrage."
      },
      {
        question: "La labradorite convient-elle aux débutants ?",
        answer: "Oui, elle est connue, facile à porter et suffisamment nuancée pour une première pierre de protection symbolique."
      },
      {
        question: "Faut-il porter la pierre toute la journée ?",
        answer: "Non. Il est possible de la porter seulement dans les moments où l'intention est utile."
      }
    ],
    relatedLinks: [
      { href: "/intentions/hypersensibilite", label: "Pierres pour hypersensibilité" },
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/guides/bracelet-labradorite-guide-achat", label: "Choisir un bracelet labradorite" }
    ]
  },
  {
    slug: "pierres-fatigue-emotionnelle-guide",
    title: "Pierres et fatigue émotionnelle : choisir un support symbolique",
    description:
      "Guide responsable pour choisir une pierre associée au recentrage, à la douceur et à la protection symbolique en période de fatigue émotionnelle.",
    category: "guide",
    updatedAt: "2026-09-07",
    productStoneSlug: "labradorite",
    sections: [
      {
        title: "Une requête sensible à traiter avec prudence",
        paragraphs: [
          "La fatigue émotionnelle est une expression forte. Elle peut désigner une période de surcharge, de lassitude, de trop-plein relationnel ou de difficulté à récupérer. Un site responsable ne doit pas transformer cette demande en promesse. Il doit proposer des repères symboliques tout en rappelant les limites du sujet.",
          "Une pierre peut accompagner un rituel de retour à soi : se poser, respirer, écrire une phrase, demander de l'aide si nécessaire, clarifier ce qui pèse. Elle n'est pas une solution unique, mais un objet qui rend visible une intention de soin personnel au sens ordinaire du terme."
        ]
      },
      {
        title: "Pierres souvent associées à ce thème",
        paragraphs: [
          "La labradorite est intéressante lorsque la fatigue vient d'une exposition aux autres ou d'une impression d'absorption. Le quartz rose convient lorsque la personne a besoin de douceur envers elle-même. L'améthyste et la howlite peuvent soutenir un rituel de calme, notamment le soir.",
          "Il ne s'agit pas de choisir la pierre la plus forte, mais la plus juste pour l'intention. Une personne qui a besoin de limite ne choisira pas forcément la même pierre qu'une personne qui cherche de la tendresse."
        ],
        bullets: [
          "Labradorite : protection symbolique et limite.",
          "Quartz rose : douceur et bienveillance envers soi.",
          "Améthyste : recul et rituel du soir.",
          "Howlite : ralentissement et simplicité.",
          "Tourmaline noire : ancrage sobre."
        ]
      },
      {
        title: "Créer une routine légère",
        paragraphs: [
          "La routine doit être courte. Le matin, porter le bracelet en formulant une intention. Dans la journée, toucher les perles avant de répondre à une sollicitation. Le soir, retirer le bracelet et écrire une chose à déposer. Cette structure transforme le bijou en repère.",
          "Si la fatigue est durable, intense ou envahissante, il faut chercher un accompagnement adapté. Le cadre symbolique n'empêche pas la lucidité ; il la renforce."
        ]
      },
      {
        title: "Notre choix pour convertir sans forcer",
        paragraphs: [
          "La labradorite est la recommandation la plus cohérente pour cette page, car elle relie protection symbolique, esthétique premium et usage quotidien. Elle permet aussi de proposer le livre associé comme approfondissement naturel.",
          "Le discours commercial doit rester apaisé : découvrez la fiche, faites le test gratuit, recevez le guide, puis comparez le bracelet si l'intention vous parle."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre choisir en période de fatigue émotionnelle ?",
        answer: "La labradorite, le quartz rose, l'améthyste et la howlite sont souvent associées à des intentions de limite, douceur ou calme."
      },
      {
        question: "Une pierre suffit-elle si la fatigue dure ?",
        answer: "Non. Les pierres sont des supports symboliques et ne remplacent jamais un avis professionnel."
      },
      {
        question: "Quel format est le plus pratique ?",
        answer: "Le bracelet est pratique parce qu'il rappelle l'intention plusieurs fois dans la journée."
      }
    ],
    relatedLinks: [
      { href: "/intentions/fatigue-emotionnelle", label: "Page fatigue émotionnelle" },
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/formation", label: "Formation gratuite" }
    ]
  },
  {
    slug: "pierres-naturelles-amazon-comment-choisir",
    title: "Acheter des pierres naturelles sur Amazon : méthode de choix",
    description:
      "Guide pratique pour comparer des bracelets et livres de lithothérapie sur Amazon avec une approche claire, prudente et orientée achat responsable.",
    category: "comparatif",
    updatedAt: "2026-09-07",
    productStoneSlug: "labradorite",
    bookTag: "fondamentaux",
    sections: [
      {
        title: "Amazon est pratique, mais il faut savoir lire une fiche",
        paragraphs: [
          "Amazon peut être utile pour acheter rapidement un bracelet ou un livre sur les pierres naturelles. Le choix est large, les délais sont souvent courts et les retours peuvent être simples selon les conditions du vendeur. Mais cette facilité demande une lecture attentive : toutes les annonces ne donnent pas le même niveau d'information.",
          "Le rôle de Litho Intelligence est d'aider l'utilisateur à faire le tri. Une bonne page d'affiliation doit expliquer l'intention, montrer les limites, rappeler que le prix et la disponibilité changent, et envoyer vers Amazon avec une promesse raisonnable."
        ]
      },
      {
        title: "Les critères de comparaison",
        paragraphs: [
          "Pour un bracelet, regardez d'abord la pierre annoncée, les photos, la taille des perles, la longueur, le type de fil et les avis. Pour un livre, regardez le thème, l'auteur, le format, la date et la cohérence du titre avec votre besoin. Un livre spécialisé sur la labradorite ou le quartz rose n'a pas le même rôle qu'un guide général.",
          "La fiche doit aussi être cohérente avec le prix. Un prix très bas pour une pierre rare ou une promesse trop spectaculaire doit inciter à comparer davantage."
        ],
        bullets: [
          "Photo claire et dimensions visibles.",
          "Description du matériau et du format.",
          "Avis récents et conditions de retour.",
          "Prix compris comme indicatif et variable.",
          "Aucune promesse médicale ou résultat certain."
        ]
      },
      {
        title: "Construire un parcours d'achat",
        paragraphs: [
          "Le parcours idéal commence par le test gratuit, passe par une page intention, puis par une fiche pierre ou un guide long. À ce moment-là, la recommandation Amazon arrive comme une suite logique : l'utilisateur comprend ce qu'il regarde et pourquoi ce produit est proposé.",
          "Cette méthode améliore la conversion parce qu'elle réduit l'hésitation. Elle améliore aussi la confiance, car la vente n'arrive pas avant l'explication."
        ]
      },
      {
        title: "Livres et bracelets : deux achats complémentaires",
        paragraphs: [
          "Un bracelet répond au besoin d'objet : porter une intention. Un livre répond au besoin de compréhension : lire, approfondir, garder des repères. Les deux ne se remplacent pas. Ils peuvent être proposés ensemble, surtout sur les pierres phares comme la labradorite et le quartz rose.",
          "Pour la marque, cette logique permet d'augmenter la valeur par visiteur sans agressivité commerciale. Le lecteur reste guidé, pas poussé."
        ]
      }
    ],
    faq: [
      {
        question: "Peut-on acheter des pierres naturelles sur Amazon ?",
        answer: "Oui, à condition de comparer les annonces, les photos, les dimensions, les avis et les conditions du vendeur."
      },
      {
        question: "Les liens Amazon du site sont-ils commerciaux ?",
        answer: "Certains liens peuvent être affiliés ou commerciaux. Le prix final et la disponibilité dépendent d'Amazon."
      },
      {
        question: "Faut-il acheter un livre ou un bracelet en premier ?",
        answer: "Le bracelet convient si l'intention est claire. Le livre aide si vous voulez comprendre avant de choisir."
      }
    ],
    relatedLinks: [
      { href: "/boutique-pierres-naturelles", label: "Boutique recommandée" },
      { href: "/guides/choisir-bracelet-pierre-naturelle", label: "Choisir un bracelet" },
      { href: "/conseils-lithotherapie", label: "Guides lithothérapie" }
    ]
  }
];

export function getEditorialGuide(slug: string) {
  return editorialGuides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: EditorialGuide["category"]) {
  return editorialGuides.filter((guide) => guide.category === category);
}
