export type JournalArticleSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type JournalArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: "fondamentaux" | "choix" | "achat" | "culture";
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  heroImage: string;
  heroImageAlt: string;
  productStoneSlug?: string;
  summary: string[];
  sections: JournalArticleSection[];
  faq: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; href: string }>;
  relatedLinks: Array<{ href: string; label: string }>;
};

const sources = {
  giaJewelryCare: { label: "GIA - Tips on Caring for Jewelry", href: "https://www.gia.edu/gia-news-research-tips-caring-jewelry" },
  giaRoseQuartz: { label: "GIA - Rose Quartz Care and Cleaning", href: "https://www.gia.edu/rose-quartz-care-cleaning" },
  giaJade: { label: "GIA - Jade Buyer's Guide", href: "https://www.gia.edu/jade/buyers-guide" },
  giaTourmaline: { label: "GIA - Tourmaline Care and Cleaning Guide", href: "https://www.gia.edu/tourmaline-care-cleaning" },
  giaTigerEye: { label: "GIA - Tiger's-Eye Quartz", href: "https://www.gia.edu/UK-EN/gia-museum-exhibit-tigers-eye-quartz" },
  giaAmethyst: { label: "GIA - Amethyst Care and Cleaning Guide", href: "https://www.gia.edu/amethyst-care-cleaning" },
  mindatLabradorite: { label: "Mindat - Labradorite", href: "https://www.mindat.org/show.php?id=2308" },
  mindatPyrite: { label: "Mindat - Pyrite", href: "https://www.mindat.org/min-3314.html" },
  mineralsHowlite: { label: "Minerals.net - Howlite", href: "https://www.minerals.net/mineral/howlite" }
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "quelle-pierre-choisir-intention",
    title: "Quelle pierre choisir selon son intention ?",
    seoTitle: "Quelle pierre choisir selon son intention ? Guide lithothérapie responsable",
    description:
      "Méthode claire pour choisir une pierre naturelle selon une intention de calme, protection, amour, énergie ou confiance, sans promesse médicale.",
    category: "fondamentaux",
    publishedAt: "2026-09-05",
    updatedAt: "2026-09-05",
    readingTime: "8 min",
    heroImage: "/images/stones/labradorite.png",
    heroImageAlt: "Labradorite aux reflets bleus et verts, pierre naturelle associée symboliquement à la protection",
    productStoneSlug: "labradorite",
    summary: [
      "Le choix d'une pierre naturelle commence par une intention simple, pas par une promesse.",
      "Les traditions de lithothérapie associent certaines pierres à des thèmes symboliques : calme, protection, amour, énergie, confiance.",
      "Un bracelet peut devenir un rappel concret d'un rituel personnel, à condition de choisir aussi selon le confort, la qualité et l'entretien."
    ],
    sections: [
      {
        title: "La bonne question n'est pas « quelle pierre est la plus forte ? »",
        paragraphs: [
          "La question revient souvent, presque toujours formulée avec une attente très humaine : quelle pierre faut-il porter pour aller mieux, se protéger, retrouver confiance ou apaiser un moment de tension ? Cette envie est compréhensible. Mais pour choisir avec discernement, il faut déplacer légèrement le regard. La bonne question n'est pas de chercher la pierre « la plus forte ». Elle consiste plutôt à se demander quelle intention mérite d'être rendue visible dans le quotidien.",
          "Une pierre naturelle est d'abord un objet minéral, avec une couleur, une texture, une dureté, une provenance possible et parfois des traitements. Elle peut aussi porter une signification symbolique issue de traditions, de récits, d'usages spirituels ou culturels. Confondre ces deux plans crée de mauvaises attentes. Les distinguer permet au contraire de construire une relation plus saine avec l'objet : on observe la pierre pour ce qu'elle est, puis on choisit le symbole que l'on souhaite lui associer.",
          "C'est l'approche éditoriale de Litho Intelligence by Quintessence Cristal : proposer une lecture claire, émotionnelle mais responsable. La lithothérapie est présentée comme une tradition symbolique, jamais comme une solution médicale. Une pierre peut accompagner un rituel de recentrage, marquer une intention, soutenir une routine personnelle ou donner du sens à un cadeau. Elle ne doit pas remplacer un avis professionnel lorsque la situation l'exige."
        ]
      },
      {
        title: "Partir de l'intention réelle",
        paragraphs: [
          "Beaucoup de personnes commencent par le nom d'une pierre : labradorite, quartz rose, améthyste, œil de tigre. C'est naturel, car les pierres circulent avec des réputations très fortes. Pourtant, le choix devient plus pertinent quand on commence par l'intention. L'intention est la phrase intérieure qui explique pourquoi l'on cherche une pierre aujourd'hui.",
          "Une intention bien formulée est précise, concrète et personnelle. « Je veux être calme » peut devenir « je veux créer un rituel de retour au calme le soir ». « Je veux me protéger » peut devenir « je veux poser davantage mes limites dans les environnements qui me fatiguent ». « Je veux de l'énergie » peut devenir « je veux retrouver de l'élan sans me disperser ». Cette précision change tout : elle transforme l'achat en geste conscient."
        ],
        bullets: [
          "Calme : chercher une pierre douce, facile à porter, associée au ralentissement symbolique.",
          "Protection : choisir une pierre sobre, ancrée, qui rappelle la limite et le recentrage.",
          "Amour : privilégier une pierre liée à la tendresse, à l'ouverture et au soin de soi.",
          "Énergie : préférer une pierre lumineuse ou chaude, associée à l'élan personnel.",
          "Confiance : sélectionner une pierre qui évoque la posture, la clarté et l'action."
        ]
      },
      {
        title: "Quelques associations symboliques utiles",
        paragraphs: [
          "Les associations suivantes ne sont pas des promesses. Elles reflètent des usages fréquents dans les croyances de lithothérapie et peuvent aider à construire un rituel personnel. Le plus important reste de garder une lecture ouverte : une pierre qui parle à quelqu'un peut laisser une autre personne indifférente.",
          "Pour le calme, l'améthyste est souvent choisie pour sa couleur violette et son association symbolique au recul intérieur. La howlite, blanche et veinée, est appréciée pour une intention de simplicité et de ralentissement. Le quartz rose reste une pierre très populaire quand le besoin de douceur, d'amour de soi ou de réconciliation intérieure domine.",
          "Pour la protection symbolique, la labradorite occupe une place centrale. Mindat la décrit comme un feldspath plagioclase capable de montrer un phénomène optique connu sous le nom de labradorescence. C'est précisément ce jeu de reflets, entre gris, bleu, vert et or, qui nourrit son image de pierre frontière : discrète en apparence, changeante lorsqu'elle capte la lumière. Dans les traditions de lithothérapie, elle est souvent associée à la protection énergétique et au recentrage des personnes sensibles.",
          "Pour la confiance, l'œil de tigre est très lisible visuellement : ses reflets bruns et dorés évoquent la présence, la vigilance et la décision. La cornaline, plus chaude, accompagne volontiers une intention de créativité ou d'élan. La pyrite, avec son éclat métallique doré, est souvent reliée à l'organisation, à la clarté et à l'abondance symbolique."
        ]
      },
      {
        title: "Pourquoi le bracelet est souvent le format le plus efficace côté usage",
        paragraphs: [
          "Dans une logique de rituel personnel, le bracelet a un avantage simple : il reste visible. On le sent au poignet, on le remarque dans la journée, on peut le toucher avant une réunion ou un moment de décision. Il transforme une intention abstraite en rappel concret. Ce rappel ne fait pas le travail à la place de la personne, mais il peut l'aider à revenir à son choix initial.",
          "Un bracelet doit cependant être choisi comme un vrai objet porté. La taille des perles, le poids, l'élasticité du fil, la finition et la couleur comptent autant que la signification symbolique. Un bracelet inconfortable finit souvent au fond d'un tiroir. Un bracelet agréable, bien proportionné et cohérent avec le style de la personne a plus de chances d'entrer dans la routine.",
          "Pour un premier bracelet de protection symbolique, la labradorite est un choix équilibré : suffisamment connue pour être comprise, assez nuancée pour rester élégante, et visuellement intéressante sans être trop voyante. C'est aussi une pierre qui se raconte bien, car ses reflets changent selon la lumière. Cette dimension narrative compte dans un cadeau ou dans un objet personnel."
        ]
      },
      {
        title: "Acheter avec discernement : photo, vendeur, entretien",
        paragraphs: [
          "La qualité de l'achat ne se résume pas au nom de la pierre. Avant de commander, il faut regarder la photo, les dimensions, la description du vendeur, les avis et les conditions de retour. Une annonce responsable ne promet pas de résultat certain. Elle décrit le produit, la taille des perles, la nature de la pierre lorsque l'information est disponible, et laisse l'acheteur comparer.",
          "L'entretien est également un critère de choix. Certaines pierres supportent mieux le quotidien que d'autres. L'améthyste, variété violette du quartz, est indiquée par le GIA comme une pierre de dureté 7 sur l'échelle de Mohs, mais l'institut recommande malgré tout des précautions, notamment vis-à-vis de la chaleur et de l'exposition intense à la lumière. La labradorite, plus tendre que le quartz, demande une attention simple : éviter les chocs, l'eau prolongée, le parfum et les frottements répétés.",
          "Cette prudence n'enlève rien au plaisir. Elle donne au contraire de la valeur au choix. Une pierre naturelle portée longtemps devient souvent plus intéressante qu'un achat impulsif motivé par une liste de promesses."
        ],
        bullets: [
          "Vérifier que les photos sont nettes et cohérentes avec le produit vendu.",
          "Préférer une description qui distingue pierre naturelle, pierre traitée ou imitation.",
          "Retirer le bracelet avant la douche, le sport, la piscine et le parfum.",
          "Choisir une taille de perles adaptée au poignet et au style de vie.",
          "Lire les avis, mais éviter de se laisser guider par des promesses excessives."
        ]
      },
      {
        title: "Le rituel de deux minutes",
        paragraphs: [
          "Une fois la pierre choisie, le rituel doit rester simple. Tenez le bracelet ou posez la main dessus. Respirez lentement pendant deux minutes. Formulez une phrase courte : « je pose mes limites », « je reviens au calme », « j'avance avec clarté », « je choisis la douceur ». Le geste n'a pas besoin d'être spectaculaire pour être utile.",
          "Le bracelet devient alors un repère. Le matin, il rappelle l'intention choisie. Dans la journée, il invite à une micro-pause. Le soir, il peut être retiré et posé à un endroit précis. Cette régularité donne plus de cohérence à la démarche que l'accumulation de pierres ou de rituels complexes.",
          "C'est aussi pour cela qu'un test gratuit peut aider : il oblige à nommer l'intention avant de regarder le catalogue. Le choix devient moins mécanique, plus personnel, et souvent plus juste."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Pour débuter, nous recommandons de choisir une seule intention prioritaire et une pierre que l'on a réellement envie de porter. Si votre intention actuelle touche à la protection symbolique, à la sensibilité aux ambiances ou au besoin de recentrage, la labradorite mérite d'être regardée en premier. Elle est connue, esthétique, facile à associer à une tenue, et suffisamment riche visuellement pour accompagner un rituel quotidien.",
          "La sélection produit ci-dessous est donc volontairement discrète : elle ne prétend pas résoudre une situation. Elle propose simplement un bracelet cohérent avec l'article, disponible selon le stock et les conditions du vendeur. Le vrai choix reste le vôtre : la bonne pierre est celle que vous comprenez, que vous portez, et qui donne une forme simple à votre intention du moment."
        ]
      }
    ],
    faq: [
      {
        question: "Quelle pierre choisir quand on débute ?",
        answer:
          "Pour débuter, choisissez une pierre connue, facile à porter et liée à une intention claire. La labradorite, le quartz rose, l'améthyste, la howlite et l'œil de tigre sont souvent de bons repères symboliques."
      },
      {
        question: "Faut-il choisir une pierre selon son signe astrologique ?",
        answer:
          "Vous pouvez le faire si cette approche vous parle, mais le choix par intention est souvent plus concret. Il part de votre besoin du moment : calme, protection, amour, énergie, confiance ou cadeau."
      },
      {
        question: "Un bracelet en pierre naturelle peut-il se porter tous les jours ?",
        answer:
          "Oui, si le bracelet est confortable et adapté à votre usage. Retirez-le avant la douche, le sport, la piscine et le parfum pour préserver les perles et le montage."
      },
      {
        question: "Quelle pierre choisir pour la protection symbolique ?",
        answer:
          "La labradorite, l'obsidienne noire et la tourmaline noire sont traditionnellement associées à la protection symbolique. La labradorite est souvent la plus douce pour commencer."
      },
      {
        question: "Les pierres naturelles promettent-elles un résultat certain ?",
        answer:
          "Non. Sur Litho Intelligence, les pierres sont présentées comme des supports symboliques, culturels et spirituels. Elles peuvent accompagner un rituel personnel, sans promesse de résultat."
      }
    ],
    sources: [
      { label: "Mindat - Labradorite", href: "https://www.mindat.org/show.php?id=2308" },
      { label: "GIA - Amethyst Care and Cleaning Guide", href: "https://www.gia.edu/amethyst-care-cleaning" },
      { label: "GIA 4Cs - Amethyst, a variety of quartz", href: "https://4cs.gia.edu/en-us/blog/amethyst-variety-of-quartz/" }
    ],
    relatedLinks: [
      { href: "/test", label: "Faire le test gratuit" },
      { href: "/intentions/protection", label: "Pierres de protection symbolique" },
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/boutique-pierres-naturelles", label: "Voir les bracelets recommandés" }
    ]
  },
  {
    slug: "pierre-protection-labradorite-obsidienne-tourmaline",
    title: "Pierres de protection : labradorite, obsidienne ou tourmaline noire ?",
    seoTitle: "Pierres de protection : labradorite, obsidienne, tourmaline noire",
    description:
      "Guide journalistique pour choisir une pierre de protection symbolique selon votre sensibilité, votre style et votre rituel quotidien.",
    category: "choix",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/tourmaline-noire.png",
    heroImageAlt: "Tourmaline noire, labradorite et obsidienne comme repères de protection symbolique",
    productStoneSlug: "tourmaline-noire",
    summary: [
      "La protection en lithothérapie doit être comprise comme une intention symbolique de limite et de recentrage.",
      "La labradorite convient aux profils sensibles, l'obsidienne aux démarches introspectives, la tourmaline noire à l'ancrage sobre.",
      "Le bracelet le plus pertinent est celui que l'on porte réellement, sans attente excessive."
    ],
    sections: [
      {
        title: "Une demande très actuelle",
        paragraphs: [
          "La recherche d'une pierre de protection dit beaucoup de notre époque. Elle parle de fatigue relationnelle, de sollicitations continues, d'environnements denses et du besoin de retrouver une frontière intérieure. Dans le langage de Litho Intelligence, cette protection n'est pas une barrière magique. C'est un symbole personnel : un rappel visible que l'on peut choisir ce que l'on laisse entrer, ce que l'on garde à distance et ce qui mérite une pause.",
          "Trois pierres reviennent souvent dans cette conversation : la labradorite, l'obsidienne et la tourmaline noire. Elles ne racontent pas la même chose. La labradorite joue sur la nuance, les reflets et la sensibilité. L'obsidienne, verre volcanique sombre, évoque une présence plus directe. La tourmaline noire propose une image de stabilité, de sobriété et d'ancrage."
        ]
      },
      {
        title: "Labradorite : la protection des personnes sensibles",
        paragraphs: [
          "La labradorite est probablement la pierre de protection la plus facile à porter au quotidien. Mindat la présente comme une variété de feldspath plagioclase, connue pour sa labradorescence : ces reflets qui apparaissent lorsque la lumière accroche la surface. Cette particularité visuelle explique une partie de sa popularité. La pierre semble discrète de loin, puis vivante de près.",
          "Symboliquement, elle parle aux personnes qui se sentent perméables aux ambiances. Elle peut servir de rappel pour ne pas porter tout ce qui circule autour de soi. En bracelet, elle fonctionne bien parce qu'elle reste élégante, neutre et suffisamment expressive pour créer un attachement."
        ],
        bullets: [
          "Pour qui : profils sensibles, relationnels, créatifs ou très sollicités.",
          "À porter : au travail, lors d'échanges nombreux, dans les périodes de recentrage.",
          "À associer : quartz clair pour la clarté, améthyste pour un rituel plus calme."
        ]
      },
      {
        title: "Obsidienne et tourmaline noire : deux styles plus affirmés",
        paragraphs: [
          "L'obsidienne noire est plus frontale. Son noir profond attire les personnes qui veulent un symbole de lucidité, de vérité personnelle et de coupe nette avec les habitudes qui encombrent. Elle demande souvent une intention claire : pourquoi la porter, à quel moment, avec quel geste ?",
          "La tourmaline noire, elle, est moins narrative et plus architecturale. Le GIA indique que la tourmaline se situe généralement entre 7 et 7,5 sur l'échelle de Mohs, avec une attention à porter aux chocs thermiques. Côté symbole, elle évoque une ligne stable : revenir au corps, poser ses limites, garder un cap sobre."
        ]
      },
      {
        title: "Notre choix éditorial",
        paragraphs: [
          "Si vous débutez, commencez par la labradorite. Si vous voulez un bracelet très sobre, presque minimaliste, regardez la tourmaline noire. Si vous cherchez un symbole plus intense pour un travail personnel déjà engagé, l'obsidienne peut être pertinente. Dans tous les cas, l'achat doit rester raisonnable : photo claire, taille indiquée, vendeur lisible, conditions de retour visibles.",
          "La sélection ci-dessous met en avant la tourmaline noire, parce qu'elle répond bien à une intention de protection sobre et de port quotidien. Elle n'est pas présentée comme une solution : elle est un support matériel pour un rituel de limite."
        ]
      }
    ],
    faq: [
      { question: "Quelle pierre de protection choisir pour commencer ?", answer: "La labradorite est souvent le choix le plus accessible, car elle reste douce, élégante et facile à porter." },
      { question: "L'obsidienne est-elle trop intense ?", answer: "Elle peut être ressentie comme plus affirmée symboliquement. Mieux vaut la choisir avec une intention claire et un port progressif." },
      { question: "La tourmaline noire convient-elle en bracelet ?", answer: "Oui, si le bracelet est confortable et bien monté. Évitez les chocs, l'eau prolongée et les produits chimiques." },
      { question: "Ces pierres ont-elles une action certaine ?", answer: "Non. Elles sont présentées comme des supports symboliques et culturels, utiles pour accompagner un rituel personnel." }
    ],
    sources: [sources.mindatLabradorite, sources.giaTourmaline, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/intentions/protection", label: "Guide protection" },
      { href: "/pierres/labradorite", label: "Labradorite" },
      { href: "/pierres/tourmaline-noire", label: "Tourmaline noire" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "bracelet-pierre-naturelle-comment-choisir",
    title: "Bracelet en pierre naturelle : comment choisir sans se tromper ?",
    seoTitle: "Bracelet pierre naturelle : guide d'achat, taille, qualité et intention",
    description:
      "Un guide d'achat clair pour choisir un bracelet en pierre naturelle selon l'intention, le confort, la qualité des perles et l'entretien.",
    category: "achat",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "8 min",
    heroImage: "/images/stones/collection-premium.png",
    heroImageAlt: "Bracelets et pierres naturelles présentés comme une sélection éditoriale",
    productStoneSlug: "labradorite",
    summary: [
      "Un bon bracelet se choisit autant pour le confort que pour la symbolique.",
      "La taille des perles, le montage, les photos et les conditions de retour comptent réellement.",
      "Un produit discret mais bien choisi convertit mieux qu'une promesse excessive."
    ],
    sections: [
      {
        title: "Le bracelet est un objet d'usage avant d'être un symbole",
        paragraphs: [
          "Un bracelet en pierre naturelle vit sur le poignet. Il frotte contre une table, passe sous une manche, accompagne les gestes de la journée. Cette évidence doit guider l'achat. Avant de se demander quelle pierre correspond à une intention, il faut vérifier que le bijou sera portable : bonne taille, élastique solide, perles régulières, poids raisonnable.",
          "Le format bracelet est puissant pour la conversion parce qu'il rend l'intention visible. Un pendentif reste parfois caché, une pierre roulée peut être oubliée dans un sac. Le bracelet, lui, rappelle l'intention plusieurs fois par jour. C'est précisément ce rappel qui fait son intérêt dans une approche symbolique."
        ]
      },
      {
        title: "Les critères concrets à regarder",
        paragraphs: [
          "La première erreur consiste à acheter uniquement un nom de pierre. Une annonce sérieuse doit montrer le produit, indiquer le diamètre des perles, la longueur ou l'élasticité, la nature du fil, la présence éventuelle d'une pochette, et si possible préciser si la pierre est naturelle, teintée ou reconstituée.",
          "Le GIA rappelle dans ses conseils généraux que la lumière, la chaleur et les produits chimiques peuvent affecter certaines gemmes. Cela vaut aussi pour un bracelet du quotidien : parfum, piscine, douche, transpiration et stockage en vrac peuvent vieillir prématurément le bijou."
        ],
        bullets: [
          "Perles de 6 mm : discrètes, légères, adaptées aux poignets fins.",
          "Perles de 8 mm : format polyvalent, visible sans être massif.",
          "Perles de 10 mm : présence plus forte, à réserver aux styles assumés.",
          "Élastique : pratique, mais à ménager avec l'eau et les tractions.",
          "Photo produit : préférer une image nette sur fond clair, sans retouche excessive."
        ]
      },
      {
        title: "Choisir selon l'intention sans surjouer",
        paragraphs: [
          "Pour une intention de protection, la labradorite et la tourmaline noire sont des classiques. Pour l'amour de soi, le quartz rose reste immédiatement compréhensible. Pour la confiance, l'œil de tigre a une force visuelle qui facilite le cadeau. Pour l'élan, la cornaline ou l'apatite bleue peuvent créer une association plus dynamique.",
          "Le choix le plus vendeur n'est pas forcément le plus spectaculaire. C'est celui qui raconte une histoire simple : une personne, une intention, un objet agréable à porter, un rituel de deux minutes. Cette clarté rassure l'utilisateur et évite les achats confus."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Pour un premier achat, nous privilégions la labradorite avec pochette. Elle possède un récit symbolique fort, une esthétique facile à porter et une polyvalence réelle. C'est le type de produit que l'on peut acheter pour soi ou offrir sans entrer dans un registre excessif.",
          "La carte produit associée permet d'aller voir l'offre disponible, tout en gardant une lecture responsable : le prix, le stock et les conditions dépendent toujours du vendeur."
        ]
      }
    ],
    faq: [
      { question: "Quelle taille de perles choisir ?", answer: "Le 8 mm est le format le plus polyvalent. Le 6 mm est plus discret, le 10 mm plus affirmé." },
      { question: "Un bracelet élastique est-il fiable ?", answer: "Oui s'il est bien monté, mais il faut éviter les tractions, l'eau prolongée et le rangement en vrac." },
      { question: "Quelle pierre offrir en premier bracelet ?", answer: "Quartz rose, labradorite et œil de tigre sont faciles à comprendre et à porter." },
      { question: "Faut-il purifier un bracelet ?", answer: "Vous pouvez créer un rituel symbolique doux, mais l'entretien matériel reste prioritaire : chiffon sec, rangement séparé, pas de produits agressifs." }
    ],
    sources: [sources.giaJewelryCare, sources.giaRoseQuartz, sources.mindatLabradorite],
    relatedLinks: [
      { href: "/boutique-pierres-naturelles", label: "Boutique recommandée" },
      { href: "/guides/choisir-bracelet-pierre-naturelle", label: "Guide bracelet" },
      { href: "/pierres/labradorite", label: "Voir la labradorite" },
      { href: "/idee-cadeau", label: "Trouver une idée cadeau" }
    ]
  },
  {
    slug: "quartz-rose-amour-de-soi",
    title: "Quartz rose : pourquoi cette pierre reste le symbole de l'amour de soi",
    seoTitle: "Quartz rose amour de soi : signification, bracelet et rituel symbolique",
    description:
      "Analyse douce et responsable du quartz rose, pierre traditionnellement associée à la tendresse, au lien affectif et à l'amour de soi.",
    category: "culture",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/quartz-rose.png",
    heroImageAlt: "Quartz rose poli, pierre rose associée symboliquement à la douceur",
    productStoneSlug: "quartz-rose",
    summary: [
      "Le quartz rose est populaire parce que son message est immédiatement lisible : douceur, tendresse, réconciliation.",
      "Le GIA le présente comme une variété de quartz durable, avec des précautions simples d'entretien.",
      "En bracelet, il fonctionne particulièrement bien comme cadeau attentionné."
    ],
    sections: [
      {
        title: "Une pierre qui parle sans expliquer",
        paragraphs: [
          "Le quartz rose a une force rare : il n'a presque pas besoin d'être raconté. Sa couleur douce évoque spontanément la tendresse, le soin, l'apaisement relationnel et l'amour de soi. Dans un marché parfois saturé de discours complexes, cette simplicité est un atout éditorial et commercial.",
          "Traditionnellement, le quartz rose est associé au cœur, à la réconciliation et à la douceur envers soi. Cette association doit rester symbolique. La pierre ne promet pas de réparer une relation ni de transformer une émotion. Elle peut en revanche servir de repère dans une routine : respirer, écrire une phrase, choisir un geste plus doux."
        ]
      },
      {
        title: "Ce que la matière nous apprend",
        paragraphs: [
          "Le GIA décrit le quartz rose comme une variété de quartz qui tire son nom de sa couleur rose délicate. Cette information matérielle aide à sortir d'un discours flou. On ne vend pas seulement une idée, on présente aussi un minéral, une couleur, une texture, une durabilité.",
          "Côté entretien, le quartz rose est relativement adapté au bijou, mais il mérite les mêmes attentions qu'un bracelet porté souvent : eau tiède savonneuse si nécessaire, chiffon doux, pas de vapeur ni d'ultrasons, rangement séparé des pierres plus dures."
        ]
      },
      {
        title: "Le cadeau le plus facile à offrir",
        paragraphs: [
          "Un bracelet en quartz rose convient très bien aux cadeaux : mère, amie, conjointe, collègue proche, personne que l'on veut encourager avec délicatesse. Il est moins clivant qu'une pierre noire de protection et moins solaire qu'une citrine. Il porte un message universel : prenez soin de vous.",
          "Pour que le cadeau reste élégant, le texte qui l'accompagne doit être simple. Une carte peut dire : « J'ai choisi cette pierre comme symbole de douceur et d'attention. » C'est sobre, juste, et beaucoup plus crédible qu'une promesse."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Le bracelet quartz rose est l'un des produits phares à conserver en visibilité permanente dans l'écosystème Litho Intelligence. Il répond aux requêtes amour, cadeau, douceur, réconfort et amour de soi. Sa conversion peut être forte si l'on respecte son langage : délicat, simple, humain.",
          "La sélection ci-dessous est volontairement présentée comme une idée de port quotidien, pas comme une réponse absolue. Le bracelet devient un rappel de douceur, disponible selon les conditions du vendeur."
        ]
      }
    ],
    faq: [
      { question: "Le quartz rose est-il une bonne idée cadeau ?", answer: "Oui, c'est l'une des pierres les plus faciles à offrir, car sa symbolique de douceur est immédiatement compréhensible." },
      { question: "Comment porter le quartz rose ?", answer: "En bracelet, pendentif ou pierre roulée. Le bracelet est pratique parce qu'il reste visible dans la journée." },
      { question: "Comment nettoyer un bracelet quartz rose ?", answer: "Utilisez un chiffon doux et, si besoin, un peu d'eau tiède savonneuse. Évitez vapeur, ultrasons et produits agressifs." },
      { question: "À quelle intention l'associer ?", answer: "Amour de soi, tendresse, réconciliation symbolique, douceur relationnelle et cadeau attentionné." }
    ],
    sources: [sources.giaRoseQuartz, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/intentions/amour", label: "Pierres pour l'amour" },
      { href: "/pierres/quartz-rose", label: "Fiche quartz rose" },
      { href: "/idee-cadeau", label: "Idées cadeaux" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "oeil-de-tigre-confiance-action",
    title: "Œil de tigre : la pierre de confiance qui parle au quotidien",
    seoTitle: "Œil de tigre : signification, confiance et bracelet recommandé",
    description:
      "Pourquoi l'œil de tigre est souvent associé à la confiance, à la décision et à l'action dans les traditions symboliques.",
    category: "culture",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/oeil-de-tigre.png",
    heroImageAlt: "Œil de tigre brun et doré, pierre naturelle chatoyante",
    productStoneSlug: "oeil-de-tigre",
    summary: [
      "L'œil de tigre est visuellement fort : ses reflets soutiennent naturellement une symbolique de présence.",
      "Il s'adresse aux intentions de confiance, d'action, de protection douce et de posture personnelle.",
      "C'est un excellent produit pour les pages cadeau homme, confiance et réussite symbolique."
    ],
    sections: [
      {
        title: "Une pierre lisible dès le premier regard",
        paragraphs: [
          "L'œil de tigre fait partie des pierres les plus reconnaissables. Son brun doré, ses bandes lumineuses et son effet chatoyant créent immédiatement une impression de mouvement. Le GIA rattache ce phénomène à la chatoyance, un jeu de lumière qui rappelle l'éclat d'une fibre ou d'un regard.",
          "Cette apparence explique sa place dans les traditions symboliques : l'œil de tigre évoque la vigilance, la confiance, la décision et la capacité à avancer sans se disperser. Il parle autant aux personnes qui veulent se sentir plus présentes qu'à celles qui cherchent un cadeau sobre et signifiant."
        ]
      },
      {
        title: "Confiance ne veut pas dire dureté",
        paragraphs: [
          "La confiance symbolisée par l'œil de tigre n'est pas une armure. Elle peut être plus subtile : dire non, finir une tâche, passer un appel, défendre une idée, reprendre une place dans un groupe. Le bracelet sert alors de rappel physique : redresser la posture, respirer, choisir une action simple.",
          "Dans un parcours utilisateur, cette pierre est intéressante parce qu'elle convertit sur plusieurs intentions : confiance, protection, réussite, cadeau homme, entretien professionnel, nouveau départ. Elle mérite donc des liens internes forts vers les pages intentions correspondantes."
        ],
        bullets: [
          "Pour une réunion : toucher le bracelet avant de prendre la parole.",
          "Pour un nouveau départ : l'associer à une phrase courte d'engagement.",
          "Pour un cadeau : expliquer la symbolique de courage calme et de présence."
        ]
      },
      {
        title: "Comment l'associer",
        paragraphs: [
          "L'œil de tigre peut être associé à la cornaline pour une intention plus dynamique, à l'hématite pour une lecture plus ancrée, ou au quartz clair pour clarifier l'objectif. Il vaut mieux éviter d'accumuler trop de pierres dans un même rituel : trois symboles bien compris valent mieux qu'un bracelet illisible.",
          "Le style compte aussi. Un bracelet œil de tigre est souvent plus marqué qu'un quartz rose. Il doit être assumé comme un accessoire à part entière, avec des vêtements neutres ou des matières naturelles."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Nous mettons en avant l'œil de tigre pour les utilisateurs qui cherchent un symbole de décision et de confiance. C'est un produit fort pour les contenus e-commerce, parce qu'il se comprend vite sans texte excessif.",
          "La carte ci-dessous prolonge l'article vers un bracelet associé. Elle doit rester une invitation à comparer le produit, les photos et les conditions du vendeur."
        ]
      }
    ],
    faq: [
      { question: "À quoi l'œil de tigre est-il associé ?", answer: "Il est traditionnellement associé à la confiance, à la vigilance, à la protection symbolique et au passage à l'action." },
      { question: "Est-ce une bonne pierre pour homme ?", answer: "Oui, son esthétique brune et dorée fonctionne bien dans un registre sobre, mais elle peut convenir à tous les styles." },
      { question: "Peut-on l'offrir pour encourager quelqu'un ?", answer: "Oui, avec un message simple autour du courage calme, de la présence et de la confiance." },
      { question: "Avec quelle pierre l'associer ?", answer: "Cornaline, hématite ou quartz clair selon l'intention : énergie, ancrage ou clarté." }
    ],
    sources: [sources.giaTigerEye, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/intentions/confiance", label: "Pierres pour la confiance" },
      { href: "/pierres/oeil-de-tigre", label: "Fiche œil de tigre" },
      { href: "/idee-cadeau", label: "Trouver une idée cadeau" },
      { href: "/boutique-pierres-naturelles", label: "Bracelets recommandés" }
    ]
  },
  {
    slug: "amethyste-calme-rituel-soir",
    title: "Améthyste : une pierre violette pour un rituel du soir plus calme",
    seoTitle: "Améthyste : signification, calme, sommeil symbolique et bracelet",
    description:
      "Un regard responsable sur l'améthyste, pierre violette associée au calme intérieur, au recul et aux routines du soir.",
    category: "fondamentaux",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/amethyste.png",
    heroImageAlt: "Améthyste violette utilisée comme support de rituel symbolique du soir",
    productStoneSlug: "amethyste",
    summary: [
      "L'améthyste est une pierre centrale pour les requêtes calme, méditation et rituel du soir.",
      "Elle doit être présentée comme un support symbolique, jamais comme une solution de sommeil.",
      "Son entretien demande d'éviter chaleur excessive et exposition intense à la lumière."
    ],
    sections: [
      {
        title: "Pourquoi l'améthyste fascine autant",
        paragraphs: [
          "L'améthyste possède une couleur qui installe immédiatement une atmosphère. Le violet évoque le silence, la profondeur, le recul, parfois la spiritualité. Cette dimension visuelle explique son succès dans les chambres, les coins de méditation et les bijoux associés au calme.",
          "Dans les traditions de lithothérapie, elle est souvent reliée au retour à soi et à la clarté intérieure. L'approche responsable consiste à la présenter comme un support de rituel : un objet que l'on associe à un moment de pause, pas à une promesse de sommeil ou de transformation."
        ]
      },
      {
        title: "Un rituel du soir simple",
        paragraphs: [
          "Le soir, l'objectif n'est pas d'ajouter une pratique compliquée. Posez le bracelet, éteignez les notifications, respirez pendant deux minutes et formulez une phrase sobre : « je ralentis », « je laisse la journée derrière moi », « je reviens au calme ». L'améthyste devient le marqueur de ce passage.",
          "Le rituel gagne à être répété. Une pierre seule ne change pas une routine, mais elle peut servir de point d'ancrage pour rendre la routine plus visible. C'est là que le bijou devient intéressant : il relie un geste matériel à une intention."
        ],
        bullets: [
          "Avant le coucher : retirer le bracelet et le poser au même endroit.",
          "Pendant une méditation courte : tenir la pierre sans chercher de sensation particulière.",
          "Après une journée chargée : écrire une phrase d'observation plutôt qu'une promesse."
        ]
      },
      {
        title: "Entretien et prudence",
        paragraphs: [
          "Le GIA indique que l'améthyste est une variété de quartz et recommande de rester attentif à la chaleur et à la lumière intense. Cette précision est utile : même une pierre très populaire mérite une vraie attention matérielle.",
          "Pour un bracelet, le plus simple reste de le retirer avant la douche, le sport et le parfum. Le ranger séparément évite les frottements avec des pierres ou métaux plus durs. Cette sobriété d'entretien renforce la crédibilité de la marque."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Le bracelet améthyste doit être mis en avant sur les contenus liés au calme, au rituel du soir, à la méditation et aux cadeaux spirituels sobres. Il ne faut pas le vendre comme une réponse directe au sommeil, mais comme un repère de ralentissement.",
          "La sélection produit associée reste volontairement discrète : elle prolonge l'article vers un objet cohérent avec l'intention."
        ]
      }
    ],
    faq: [
      { question: "L'améthyste est-elle associée au sommeil ?", answer: "Elle est traditionnellement associée au calme et aux rituels du soir, mais elle ne remplace pas une hygiène de sommeil ni un avis professionnel." },
      { question: "Peut-on porter l'améthyste tous les jours ?", answer: "Oui, si le bijou est confortable. Évitez l'eau prolongée, la chaleur et les produits chimiques." },
      { question: "Où placer une améthyste le soir ?", answer: "Sur une table de nuit ou un espace calme, comme rappel symbolique d'une routine de ralentissement." },
      { question: "Avec quelle pierre l'associer ?", answer: "Howlite, quartz rose ou quartz clair selon que l'intention porte sur la douceur, le calme ou la clarté." }
    ],
    sources: [sources.giaAmethyst, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/intentions/sommeil", label: "Pierres du rituel du soir" },
      { href: "/intentions/calme", label: "Pierres pour le calme" },
      { href: "/pierres/amethyste", label: "Fiche améthyste" },
      { href: "/formation", label: "Formation gratuite" }
    ]
  },
  {
    slug: "pyrite-abondance-organisation",
    title: "Pyrite : abondance symbolique, organisation et passage à l'action",
    seoTitle: "Pyrite : signification, abondance symbolique et bracelet recommandé",
    description:
      "La pyrite, pierre dorée métallique, comme symbole d'organisation, de structure et d'abondance dans une approche responsable.",
    category: "culture",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/pyrite.png",
    heroImageAlt: "Pyrite dorée métallique associée symboliquement à l'abondance et à l'organisation",
    productStoneSlug: "pyrite",
    summary: [
      "La pyrite est forte pour les requêtes argent, abondance, réussite et organisation.",
      "Son message le plus crédible n'est pas la richesse rapide, mais la structure et l'action concrète.",
      "Elle demande un discours très conforme pour éviter les promesses financières."
    ],
    sections: [
      {
        title: "Sortir du cliché de la pierre d'argent",
        paragraphs: [
          "La pyrite est souvent appelée pierre d'abondance. Cette formule attire, mais elle peut devenir dangereuse si elle est mal utilisée. Une marque responsable ne doit jamais suggérer qu'une pierre attire automatiquement l'argent. Le bon angle éditorial est plus crédible : la pyrite comme symbole d'organisation, de clarté d'action et de rapport plus structuré aux objectifs.",
          "Visuellement, la pyrite impose quelque chose. Son éclat métallique doré rappelle l'or, mais sa matière raconte une autre histoire : une géométrie, une densité, une présence. Mindat la présente comme un sulfure de fer, avec un lustre métallique et une couleur jaune laiton. Cette base matérielle soutient un récit symbolique plus sérieux."
        ]
      },
      {
        title: "Abondance symbolique : ce que l'on peut dire",
        paragraphs: [
          "Dans une pratique culturelle ou spirituelle, l'abondance peut être comprise comme la capacité à identifier les ressources, à poser des priorités et à passer à l'action. La pyrite devient alors un rappel : regarder ses chiffres, terminer une tâche, clarifier une offre, ranger son espace de travail.",
          "Cet angle est beaucoup plus puissant pour Litho Intelligence. Il parle à l'utilisateur sans exploiter sa vulnérabilité. Il transforme le bijou en outil de concentration symbolique plutôt qu'en promesse spectaculaire."
        ],
        bullets: [
          "Intention : structurer un projet.",
          "Rituel : écrire une action concrète avant de commencer la journée.",
          "Usage : poser le bracelet près du bureau quand il n'est pas porté.",
          "Prudence : éviter l'eau prolongée et l'humidité inutile."
        ]
      },
      {
        title: "Un produit à placer avec finesse",
        paragraphs: [
          "La pyrite peut devenir un produit phare sur les contenus réussite, abondance symbolique, entrepreneur, organisation et cadeau professionnel. Le ton doit rester journalistique : expliquer le symbole, montrer le produit, rappeler que le résultat dépend des actions de la personne.",
          "Le bracelet pyrite est intéressant parce qu'il est visuel sans être trop ésotérique. Il peut toucher un public plus rationnel, sensible aux objets beaux, sobres et porteurs d'un message d'élan."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Nous recommandons la pyrite pour les utilisateurs qui veulent associer leur bracelet à une intention d'organisation et de progression concrète. La vente doit s'appuyer sur le style, le symbole et le rituel, jamais sur une promesse financière.",
          "La carte produit ci-dessous sert cette logique : voir le bracelet, comparer, puis choisir en connaissance de cause."
        ]
      }
    ],
    faq: [
      { question: "La pyrite attire-t-elle l'argent ?", answer: "Litho Intelligence la présente comme un symbole d'abondance, d'organisation et d'action, sans promesse financière." },
      { question: "Pourquoi porter une pyrite au poignet ?", answer: "Pour garder visible une intention de structure, de clarté et de passage à l'action." },
      { question: "La pyrite aime-t-elle l'eau ?", answer: "Par prudence, mieux vaut éviter l'eau prolongée et l'humidité, surtout pour les bijoux portés souvent." },
      { question: "À qui offrir un bracelet pyrite ?", answer: "À une personne qui lance un projet, structure son travail ou aime les bijoux dorés sobres." }
    ],
    sources: [sources.mindatPyrite, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/intentions/argent-abondance", label: "Argent et abondance symbolique" },
      { href: "/pierres/pyrite", label: "Fiche pyrite" },
      { href: "/boutique-pierres-naturelles", label: "Bracelets recommandés" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "jade-harmonie-chance-symbolique",
    title: "Jade : harmonie, chance symbolique et élégance minérale",
    seoTitle: "Jade : signification, harmonie, chance symbolique et bracelet",
    description:
      "Comprendre le jade comme symbole d'harmonie et de chance culturelle, avec un regard sur la qualité, la couleur et le bracelet.",
    category: "culture",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/jade-emeraude.png",
    heroImageAlt: "Jade vert poli, pierre associée culturellement à l'harmonie",
    productStoneSlug: "jade-emeraude",
    summary: [
      "Le jade porte une forte dimension culturelle autour de l'harmonie, de la sagesse et de la chance.",
      "Le GIA rappelle que le terme jade recouvre principalement jadeite et néphrite.",
      "En bracelet, il fonctionne comme un cadeau premium, discret et durable."
    ],
    sections: [
      {
        title: "Une pierre de culture autant que de bijou",
        paragraphs: [
          "Le jade n'est pas seulement une couleur verte. C'est une pierre chargée d'histoire, de gestes, de sculptures, de bijoux transmis et de symboles culturels. Le GIA rappelle que le mot jade désigne notamment deux matériaux gemmes : la jadeite et la néphrite. Cette précision est essentielle pour acheter avec discernement.",
          "Dans les traditions, le jade est souvent associé à l'harmonie, à la sagesse, à la chance et à la longévité symbolique. Pour Litho Intelligence, l'enjeu est de respecter cette profondeur sans la transformer en argument excessif. Le jade doit être raconté comme une pierre de calme, de tenue et d'équilibre."
        ]
      },
      {
        title: "Pourquoi le jade convertit bien",
        paragraphs: [
          "Le jade parle à un public qui cherche moins l'intensité que l'élégance. Son vert se marie facilement avec une garde-robe claire, noire ou naturelle. Il peut être porté dans un cadre professionnel sans attirer trop l'attention, ce qui en fait un bon bracelet du quotidien.",
          "Pour un cadeau, le message est très fort : « je vous souhaite harmonie et chance symbolique ». C'est un wording positif, délicat, compatible avec une approche internationale future."
        ],
        bullets: [
          "Intention : harmonie, équilibre, chance symbolique.",
          "Public : cadeau premium, bracelet discret, style minéral doux.",
          "Point d'achat : vérifier couleur, finition, taille et description du vendeur."
        ]
      },
      {
        title: "Attention aux appellations",
        paragraphs: [
          "Le marché utilise parfois des noms commerciaux vagues. Le GIA signale que certaines appellations autour du jade peuvent désigner d'autres minéraux ou des matériaux traités. Une fiche produit crédible doit donc éviter les certitudes impossibles et inviter à lire la description du vendeur.",
          "Cette prudence ne nuit pas à la vente. Elle rassure. Elle montre que la marque accompagne le choix au lieu de pousser l'achat aveuglément."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Le bracelet jade vert naturel mérite une place forte sur les pages cadeau, amour calme, harmonie et chance symbolique. Il est moins évident que le quartz rose, mais plus premium dans son imaginaire.",
          "La sélection ci-dessous met en avant ce registre : un bijou de présence douce, à comparer selon les photos, la taille et les conditions du vendeur."
        ]
      }
    ],
    faq: [
      { question: "Que symbolise le jade ?", answer: "Il est traditionnellement associé à l'harmonie, à la sagesse, à la chance symbolique et à l'équilibre." },
      { question: "Jadeite et néphrite, est-ce la même chose ?", answer: "Ce sont deux matériaux différents regroupés sous le terme jade dans le commerce et la gemmologie." },
      { question: "Le jade est-il une bonne idée cadeau ?", answer: "Oui, surtout pour un cadeau élégant, discret et porteur d'un message positif." },
      { question: "Comment entretenir un bracelet jade ?", answer: "Un chiffon doux et une attention aux produits chimiques suffisent généralement. Évitez les traitements agressifs." }
    ],
    sources: [sources.giaJade, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/pierres/jade", label: "Fiche jade" },
      { href: "/intentions/argent-abondance", label: "Chance symbolique" },
      { href: "/idee-cadeau", label: "Idée cadeau" },
      { href: "/boutique-pierres-naturelles", label: "Voir les bracelets" }
    ]
  },
  {
    slug: "pierres-hypersensibles-labradorite-howlite",
    title: "Personnes hypersensibles : quelles pierres choisir avec douceur ?",
    seoTitle: "Pierres pour hypersensibles : labradorite, howlite, quartz rose",
    description:
      "Une sélection responsable de pierres associées symboliquement à la sensibilité : labradorite, howlite, quartz rose et améthyste.",
    category: "choix",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "8 min",
    heroImage: "/images/stones/howlite.png",
    heroImageAlt: "Howlite blanche veinée, pierre douce associée au calme symbolique",
    productStoneSlug: "howlite",
    summary: [
      "L'hypersensibilité doit être traitée avec délicatesse, sans vocabulaire médical.",
      "La labradorite, la howlite et le quartz rose offrent trois symboliques complémentaires.",
      "La meilleure recommandation est souvent une pierre douce, portée comme rappel de limite et de soin de soi."
    ],
    sections: [
      {
        title: "Un sujet à aborder avec tact",
        paragraphs: [
          "Les personnes qui se disent hypersensibles cherchent souvent des objets qui les aident à se recentrer. Il faut respecter cette demande sans la médicaliser. Litho Intelligence parle ici d'une sensibilité vécue, d'un ressenti personnel, d'un besoin de douceur ou de limite. Les pierres sont des supports symboliques, pas des réponses cliniques.",
          "Cette nuance est capitale pour la crédibilité. Elle permet d'accueillir l'émotion sans promettre ce qu'un bijou ne peut pas promettre. La bonne question devient : quelle pierre peut rappeler à la personne de respirer, de poser une limite, de choisir un environnement plus doux ?"
        ]
      },
      {
        title: "Trois pierres à regarder",
        paragraphs: [
          "La labradorite reste la pierre centrale pour une intention de protection symbolique. Elle accompagne bien les personnes qui se sentent traversées par les ambiances. La howlite, blanche et veinée, évoque un ralentissement plus doux. Minerals.net rappelle que la howlite est souvent utilisée en perles et peut être teintée, ce qui invite à regarder les annonces avec attention.",
          "Le quartz rose ajoute un troisième registre : la tendresse envers soi. Il ne pose pas une frontière comme la labradorite ; il rappelle plutôt que la douceur peut être un choix actif."
        ],
        bullets: [
          "Labradorite : limite, protection symbolique, sensibilité aux ambiances.",
          "Howlite : ralentissement, patience, simplicité.",
          "Quartz rose : douceur, amour de soi, réconfort symbolique.",
          "Améthyste : recul, calme du soir, respiration."
        ]
      },
      {
        title: "Le bracelet comme rappel corporel",
        paragraphs: [
          "Pour une personne sensible, un bracelet trop massif peut devenir gênant. Il vaut mieux privilégier un format confortable, des perles régulières et une couleur facile à porter. L'objectif n'est pas d'afficher une protection spectaculaire, mais d'avoir un repère discret dans les moments de surcharge.",
          "Un rituel simple peut suffire : toucher le bracelet, expirer lentement, nommer une limite. Cette micro-pratique donne une place au symbole sans lui confier toute la responsabilité."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Nous mettons ici en avant la howlite parce qu'elle apporte un contrepoint doux à la labradorite. Elle convient aux personnes qui veulent un bijou clair, simple et apaisant visuellement.",
          "La sélection produit doit être lue comme une invitation à choisir un objet de confort symbolique, en vérifiant toujours la qualité de la photo, la taille et les conditions du vendeur."
        ]
      }
    ],
    faq: [
      { question: "Quelle pierre choisir quand on se sent très sensible ?", answer: "La labradorite est souvent choisie pour la protection symbolique, la howlite pour le calme visuel, le quartz rose pour la douceur." },
      { question: "La howlite peut-elle être teintée ?", answer: "Oui, elle est souvent utilisée en perles et peut être teintée. Il faut lire attentivement la description du vendeur." },
      { question: "Faut-il porter plusieurs pierres ?", answer: "Pas nécessairement. Une seule pierre bien choisie et bien comprise peut être plus utile symboliquement." },
      { question: "Quel rituel utiliser ?", answer: "Un rituel de respiration de deux minutes, avec une phrase simple autour de la limite ou du retour au calme." }
    ],
    sources: [sources.mindatLabradorite, sources.mineralsHowlite, sources.giaRoseQuartz],
    relatedLinks: [
      { href: "/intentions/hypersensibilite", label: "Guide hypersensibilité" },
      { href: "/pierres/howlite", label: "Fiche howlite" },
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "purifier-recharger-pierres-sans-les-abimer",
    title: "Purifier et recharger ses pierres sans les abîmer : le guide responsable",
    seoTitle: "Purifier recharger pierres : méthodes douces et entretien responsable",
    description:
      "Comment distinguer entretien matériel et rituel symbolique pour prendre soin de ses pierres naturelles sans les fragiliser.",
    category: "fondamentaux",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "9 min",
    heroImage: "/images/stones/quartz-clair.png",
    heroImageAlt: "Quartz clair posé comme support de rituel et d'entretien responsable",
    productStoneSlug: "amethyste",
    summary: [
      "L'entretien matériel et le rituel symbolique doivent être séparés.",
      "L'eau, le sel, le soleil, la chaleur et les ultrasons ne conviennent pas à toutes les pierres.",
      "Les méthodes les plus sûres sont souvent les plus simples : chiffon doux, rangement séparé, intention sobre."
    ],
    sections: [
      {
        title: "Deux sujets différents souvent mélangés",
        paragraphs: [
          "Le mot purifier crée une confusion. Il peut désigner un rituel symbolique, mais aussi être compris comme un nettoyage matériel. Or ces deux gestes ne répondent pas au même besoin. Nettoyer une pierre, c'est retirer poussière, traces de peau ou résidus. Purifier symboliquement, c'est marquer une intention de recommencement.",
          "La distinction protège les pierres et la crédibilité du site. Un quartz rose, une améthyste, une tourmaline noire ou une pyrite ne se comportent pas de la même manière face à l'eau, au soleil ou aux produits chimiques. Le GIA rappelle dans ses conseils d'entretien que lumière, chaleur et substances chimiques peuvent affecter certaines gemmes."
        ]
      },
      {
        title: "Les méthodes douces à privilégier",
        paragraphs: [
          "Pour un bijou porté régulièrement, la méthode la plus sûre est souvent un chiffon doux, sec ou légèrement humide selon la pierre et le montage. L'eau prolongée, le sel, la vapeur et les ultrasons doivent être évités dès que l'on n'est pas certain de la matière, du traitement ou de la solidité du bijou.",
          "Pour le rituel symbolique, il existe des alternatives sans risque matériel : son doux, fumigation légère, lumière lunaire indirecte, intention écrite, rangement dans une pochette propre. Ces gestes ne prétendent pas modifier la pierre ; ils donnent un cadre à la relation que la personne construit avec l'objet."
        ],
        bullets: [
          "Chiffon doux : base d'entretien la plus prudente.",
          "Pochette séparée : limite les rayures et les frottements.",
          "Soleil direct : à éviter pour les pierres sensibles à la lumière.",
          "Sel et eau salée : à éviter par défaut.",
          "Vapeur et ultrasons : réservés aux cas validés par un professionnel du bijou."
        ]
      },
      {
        title: "Cas pratiques",
        paragraphs: [
          "Le quartz rose se nettoie facilement, mais le GIA recommande d'éviter vapeur et ultrasons. L'améthyste mérite une prudence vis-à-vis de l'exposition intense à la lumière. La tourmaline demande de faire attention à la chaleur et aux chocs thermiques. La pyrite, riche en fer et soufre, n'est pas une candidate idéale pour les bains prolongés.",
          "Cette approche peut paraître moins spectaculaire que les recettes virales, mais elle crée une marque plus solide. Un utilisateur qui abîme son bracelet après avoir suivi un conseil trop général perd confiance. Un utilisateur qui comprend la nuance revient."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Pour accompagner ce guide, l'améthyste est pertinente : elle est très demandée, très utilisée dans les rituels du soir, et oblige justement à parler d'entretien avec nuance. Le bracelet associé peut être présenté comme un objet à porter puis à ranger dans une routine douce.",
          "La vente se fait ici par la compétence : mieux on explique l'entretien, plus l'utilisateur se sent accompagné dans son achat."
        ]
      }
    ],
    faq: [
      { question: "Peut-on mettre toutes les pierres dans l'eau ?", answer: "Non. Certaines pierres, certains montages et certains traitements n'apprécient pas l'eau prolongée. En cas de doute, privilégiez le chiffon doux." },
      { question: "Le sel est-il recommandé ?", answer: "Par prudence, non. Le sel peut être agressif pour certaines matières et certains bijoux." },
      { question: "Comment recharger symboliquement une pierre sans risque ?", answer: "Utilisez une intention écrite, le son, une pochette propre ou une lumière douce indirecte." },
      { question: "Quelle est la règle la plus simple ?", answer: "Séparer entretien matériel et rituel symbolique, puis choisir la méthode la plus douce." }
    ],
    sources: [sources.giaJewelryCare, sources.giaRoseQuartz, sources.giaAmethyst, sources.giaTourmaline, sources.mindatPyrite],
    relatedLinks: [
      { href: "/guides/purification-rechargement-pierres", label: "Guide purification" },
      { href: "/entretien", label: "Entretien des pierres" },
      { href: "/pierres/amethyste", label: "Fiche améthyste" },
      { href: "/formation", label: "Formation gratuite" }
    ]
  },
  {
    slug: "offrir-bracelet-pierre-naturelle",
    title: "Offrir un bracelet en pierre naturelle : choisir le bon symbole",
    seoTitle: "Offrir bracelet pierre naturelle : idées cadeaux femme, homme, amour, protection",
    description:
      "Guide cadeau pour choisir un bracelet en pierre naturelle selon la personne, l'occasion, l'intention et le message à transmettre.",
    category: "achat",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "8 min",
    heroImage: "/images/stones/quartz-rose.png",
    heroImageAlt: "Quartz rose comme idée cadeau douce en bracelet pierre naturelle",
    productStoneSlug: "quartz-rose",
    summary: [
      "Un cadeau réussi associe une personne, une intention et un message simple.",
      "Quartz rose, œil de tigre, labradorite et jade couvrent la majorité des occasions.",
      "La vente doit rester élégante : expliquer le symbole, puis laisser choisir."
    ],
    sections: [
      {
        title: "Le vrai sujet d'un cadeau",
        paragraphs: [
          "Offrir une pierre naturelle, ce n'est pas seulement choisir une couleur. C'est choisir un message. Le cadeau dit : j'ai pensé à vous, à ce que vous traversez, à ce que je vous souhaite. Cette dimension émotionnelle explique pourquoi les bracelets en pierre naturelle peuvent bien convertir lorsqu'ils sont présentés avec tact.",
          "La difficulté consiste à éviter le cadeau trop chargé. Une pierre ne doit pas diagnostiquer la personne. Elle doit proposer une intention positive, légère et respectable : douceur, protection symbolique, confiance, harmonie, nouveau départ."
        ]
      },
      {
        title: "Quatre pierres faciles à offrir",
        paragraphs: [
          "Le quartz rose est le choix le plus doux : amour de soi, tendresse, attention. La labradorite convient à une personne sensible ou très sollicitée, avec une intention de protection symbolique. L'œil de tigre parle de confiance et de courage calme. Le jade porte une image plus premium, associée à l'harmonie et à la chance culturelle.",
          "Pour un cadeau homme, l'œil de tigre, l'onyx, l'hématite et la tourmaline noire sont souvent plus sobres. Pour une amie ou une mère, quartz rose, améthyste et jade fonctionnent bien. Mais la meilleure règle reste le style de la personne : elle portera ce qui lui ressemble."
        ],
        bullets: [
          "Anniversaire : quartz rose, jade ou œil de tigre.",
          "Encouragement : œil de tigre, cornaline ou pyrite.",
          "Protection symbolique : labradorite ou tourmaline noire.",
          "Remerciement : quartz rose ou améthyste.",
          "Cadeau discret : jade, howlite ou quartz blanc laiteux."
        ]
      },
      {
        title: "Le mot qui accompagne le bracelet",
        paragraphs: [
          "La carte ou le message de partage est presque aussi important que le produit. Une phrase simple suffit : « J'ai choisi ce bracelet comme symbole de douceur », « Pour t'accompagner dans ce nouveau départ », « Un rappel de confiance à porter quand tu en as envie ». Le ton reste libre, jamais intrusif.",
          "Côté e-commerce, cette logique permet de vendre sans pousser. L'article informe, aide à choisir, propose une sélection, puis laisse le lecteur décider."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Pour lancer une campagne cadeau, le quartz rose doit rester très visible. Il est accessible, émotionnel, facile à comprendre et compatible avec plusieurs occasions. Il peut servir d'entrée douce vers la boutique recommandée.",
          "La sélection ci-dessous est pensée comme un cadeau tendre et simple. Le produit reste à vérifier selon le stock, le prix et les conditions du vendeur."
        ]
      }
    ],
    faq: [
      { question: "Quelle pierre offrir à une femme ?", answer: "Quartz rose, améthyste, jade et labradorite sont souvent de bons choix, selon l'intention et le style." },
      { question: "Quelle pierre offrir à un homme ?", answer: "Œil de tigre, onyx, hématite, tourmaline noire ou pyrite fonctionnent bien dans un registre sobre." },
      { question: "Quel bracelet offrir pour la protection ?", answer: "Labradorite ou tourmaline noire, en gardant une formulation symbolique et non excessive." },
      { question: "Quel budget prévoir ?", answer: "Un bracelet simple peut être intéressant sous 25 euros, à condition de vérifier photos, taille et avis vendeur." }
    ],
    sources: [sources.giaJewelryCare, sources.giaRoseQuartz, sources.giaJade],
    relatedLinks: [
      { href: "/idee-cadeau", label: "Trouver une idée cadeau" },
      { href: "/boutique-pierres-naturelles", label: "Boutique recommandée" },
      { href: "/intentions/cadeau", label: "Pierres à offrir" },
      { href: "/pierres/quartz-rose", label: "Fiche quartz rose" }
    ]
  },
  {
    slug: "cornaline-apatite-energie-creative",
    title: "Cornaline ou apatite bleue : deux pierres pour retrouver un élan créatif",
    seoTitle: "Cornaline et apatite bleue : énergie créative et bracelet recommandé",
    description:
      "Comparer la cornaline et l'apatite bleue comme supports symboliques d'élan, d'expression et de créativité personnelle.",
    category: "choix",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "7 min",
    heroImage: "/images/stones/cornaline.png",
    heroImageAlt: "Cornaline orangée associée symboliquement à l'élan créatif",
    productStoneSlug: "cornaline",
    summary: [
      "La cornaline parle d'élan, de chaleur et de passage à l'action.",
      "L'apatite bleue évoque davantage l'expression, la parole et l'inspiration.",
      "Ces pierres sont pertinentes pour les contenus énergie, créativité et motivation."
    ],
    sections: [
      {
        title: "Deux couleurs, deux mouvements",
        paragraphs: [
          "La cornaline et l'apatite bleue n'ont pas la même énergie visuelle. La cornaline est chaude, orangée, solaire. Elle évoque facilement le mouvement, le corps, l'action, la créativité qui demande à sortir. L'apatite bleue est plus fraîche, plus verbale, souvent associée à l'expression et à la clarté de parole.",
          "Dans une approche symbolique, ces pierres peuvent aider à choisir le type d'élan recherché. Avez-vous besoin de commencer, d'oser, de retrouver une impulsion ? La cornaline est souvent plus parlante. Avez-vous besoin de dire, d'écrire, de partager, de formuler ? L'apatite bleue devient plus pertinente."
        ]
      },
      {
        title: "La cornaline pour passer à l'action",
        paragraphs: [
          "La cornaline est une excellente pierre de contenu parce qu'elle relie trois thèmes très recherchés : énergie, créativité, confiance. Elle se prête bien aux rituels du matin : choisir une action prioritaire, porter le bracelet, commencer avant de tout perfectionner.",
          "Son langage doit rester concret. Au lieu d'affirmer qu'elle donne de l'énergie, il est plus juste de dire qu'elle symbolise l'élan et peut accompagner un rituel personnel de mise en mouvement."
        ],
        bullets: [
          "Pour créer : poser une tâche courte avant de regarder le téléphone.",
          "Pour oser : associer la pierre à une phrase d'engagement.",
          "Pour avancer : mesurer une action réalisée, pas une sensation attendue."
        ]
      },
      {
        title: "L'apatite bleue pour exprimer",
        paragraphs: [
          "L'apatite bleue touche un autre territoire : inspiration, communication, expression personnelle. Elle peut intéresser les personnes qui écrivent, parlent en public, vendent une offre ou veulent clarifier ce qu'elles pensent.",
          "Côté tunnel de conversion, l'article peut renvoyer vers les fiches cornaline et apatite bleue, puis vers le test gratuit. Cela permet de transformer une lecture éditoriale en choix personnalisé."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Nous mettons ici en avant la cornaline parce qu'elle répond à une intention très large : retrouver l'élan. C'est une pierre utile pour les contenus motivation, créativité, confiance et nouveau départ.",
          "La sélection produit ci-dessous sert cette narration : un bracelet comme rappel d'action simple, pas comme moteur extérieur."
        ]
      }
    ],
    faq: [
      { question: "Cornaline ou apatite bleue : laquelle choisir ?", answer: "Cornaline pour l'élan et l'action, apatite bleue pour l'expression et la clarté de parole." },
      { question: "La cornaline convient-elle le matin ?", answer: "Oui, symboliquement elle s'intègre bien à une routine de démarrage et de mise en mouvement." },
      { question: "L'apatite bleue est-elle liée à la communication ?", answer: "Dans les traditions symboliques, elle est souvent associée à l'expression personnelle." },
      { question: "Peut-on les associer ?", answer: "Oui, si l'intention est claire : agir et exprimer. Gardez un rituel simple." }
    ],
    sources: [sources.giaJewelryCare],
    relatedLinks: [
      { href: "/intentions/energie", label: "Pierres pour l'énergie" },
      { href: "/pierres/cornaline", label: "Fiche cornaline" },
      { href: "/pierres/apatite-bleue", label: "Fiche apatite bleue" },
      { href: "/test", label: "Faire le test gratuit" }
    ]
  },
  {
    slug: "labradorite-pierre-phare-litho-intelligence",
    title: "Pourquoi la labradorite est la pierre phare de Litho Intelligence",
    seoTitle: "Labradorite : pierre de protection phare, bracelet et signification",
    description:
      "Analyse éditoriale de la labradorite comme pierre phare : reflets, protection symbolique, hypersensibilité et bracelet recommandé.",
    category: "fondamentaux",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "8 min",
    heroImage: "/images/stones/labradorite.png",
    heroImageAlt: "Labradorite aux reflets bleus, pierre phare de Litho Intelligence",
    productStoneSlug: "labradorite",
    summary: [
      "La labradorite réunit beauté visuelle, récit symbolique et intention de protection.",
      "Elle relie plusieurs requêtes fortes : protection, hypersensibilité, intuition, bracelet.",
      "C'est une pierre idéale pour construire la cohérence éditoriale et commerciale de la marque."
    ],
    sections: [
      {
        title: "Une pierre qui résume la promesse de l'application",
        paragraphs: [
          "Litho Intelligence aide à choisir une pierre selon une intention. La labradorite incarne très bien cette promesse, parce qu'elle relie une réalité matérielle visible à une symbolique populaire forte. Ses reflets changent selon la lumière, comme si la pierre invitait déjà à regarder autrement.",
          "Mindat décrit la labradorite comme une variété de feldspath plagioclase pouvant présenter la labradorescence. Cette information donne un socle sérieux au récit. Les reflets ne sont pas seulement décoratifs : ils expliquent pourquoi la pierre est devenue si narrative dans les usages symboliques."
        ]
      },
      {
        title: "Protection, sensibilité, intuition",
        paragraphs: [
          "Dans les croyances de lithothérapie, la labradorite est souvent associée à la protection des personnes sensibles, à l'intuition et aux limites personnelles. Ces trois thèmes structurent une grande partie des recherches utilisateurs. Ils sont aussi compatibles avec une approche responsable : parler de limites, de rituel, de recentrage, sans promesse excessive.",
          "C'est une pierre particulièrement intéressante pour la conversion Amazon parce qu'elle se photographie bien, se porte facilement et convient à plusieurs profils : femmes, hommes, personnes créatives, professionnels de l'accompagnement, personnes très sollicitées."
        ],
        bullets: [
          "Requête SEO : pierre de protection.",
          "Requête émotionnelle : je me sens sensible aux ambiances.",
          "Requête produit : bracelet labradorite naturel.",
          "Requête IA : quelle pierre choisir pour se recentrer symboliquement ?"
        ]
      },
      {
        title: "La pierre passerelle",
        paragraphs: [
          "La labradorite peut renvoyer vers les intentions protection, hypersensibilité, intuition et fatigue émotionnelle. Elle peut aussi conduire vers la formation gratuite, car elle permet d'expliquer la différence entre caractéristique minérale et signification culturelle.",
          "Un bon maillage interne autour de cette pierre aidera le site à être mieux compris par les moteurs et par les IA. La labradorite doit devenir une page pilier, reliée aux articles, aux fiches et aux produits."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Le bracelet labradorite avec pochette reste notre produit éditorial le plus stratégique. Il combine une pierre phare, une intention forte et un imaginaire premium sans être trop difficile à expliquer.",
          "La sélection ci-dessous doit rester présente sur les contenus protection et choix par intention. Elle raconte le produit sans forcer la décision."
        ]
      }
    ],
    faq: [
      { question: "Pourquoi la labradorite est-elle si populaire ?", answer: "Ses reflets visibles et sa symbolique de protection en font une pierre facile à comprendre et à porter." },
      { question: "À qui convient-elle ?", answer: "Aux personnes qui cherchent un symbole de limite, de recentrage ou de protection douce dans leur quotidien." },
      { question: "Est-elle adaptée à un premier bracelet ?", answer: "Oui, elle est polyvalente, élégante et assez neutre pour un port régulier." },
      { question: "Comment l'entretenir ?", answer: "Évitez les chocs, l'eau prolongée, le parfum et le rangement en vrac." }
    ],
    sources: [sources.mindatLabradorite, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/pierres/labradorite", label: "Fiche labradorite" },
      { href: "/intentions/protection", label: "Protection symbolique" },
      { href: "/intentions/hypersensibilite", label: "Hypersensibilité" },
      { href: "/boutique-pierres-naturelles", label: "Bracelet labradorite" }
    ]
  },
  {
    slug: "pierres-naturelles-vraies-fausses-imitation",
    title: "Vraies pierres, pierres teintées, imitations : comment acheter plus sereinement",
    seoTitle: "Vraies pierres naturelles : reconnaître teintures, imitations et annonces fiables",
    description:
      "Un guide d'achat responsable pour lire les annonces, comprendre les traitements possibles et éviter les attentes irréalistes.",
    category: "achat",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readingTime: "9 min",
    heroImage: "/images/stones/agate-fuchsia.png",
    heroImageAlt: "Agate fuchsia illustrant les couleurs vives et les questions de teinture",
    productStoneSlug: "apatite-bleue",
    summary: [
      "Une pierre très colorée n'est pas forcément fausse, mais elle mérite une lecture attentive de l'annonce.",
      "Certains matériaux peuvent être teintés, chauffés, irradiés, imprégnés ou simplement mal nommés.",
      "La transparence du vendeur est un critère de confiance plus solide qu'une promesse spectaculaire."
    ],
    sections: [
      {
        title: "Le vrai sujet : la transparence",
        paragraphs: [
          "Dans l'achat de pierres naturelles, la question n'est pas seulement « vrai ou faux ». Le marché comprend des pierres naturelles, des pierres traitées, des pierres teintées, des matériaux reconstitués, des imitations et des appellations commerciales. Un bon vendeur ne cache pas cette complexité ; il l'explique autant que possible.",
          "Pour Litho Intelligence, ce sujet est stratégique. Il installe la confiance avant la vente. Un utilisateur qui comprend mieux ce qu'il achète sera moins déçu et plus fidèle."
        ]
      },
      {
        title: "Les signaux à observer",
        paragraphs: [
          "Le premier signal est la photo. Une couleur parfaitement uniforme, très vive et identique sur toutes les perles peut inviter à lire la description avec attention. La howlite, par exemple, est connue pour être souvent teintée afin d'imiter d'autres pierres. Le GIA rappelle aussi que certains matériaux comme le jade peuvent être teints, blanchis, chauffés, cirés ou imprégnés.",
          "Cela ne signifie pas qu'un produit traité est forcément mauvais. Le problème apparaît lorsque le traitement est caché, ou lorsque l'annonce utilise un nom prestigieux pour vendre un matériau différent."
        ],
        bullets: [
          "Lire le titre et la description, pas seulement l'image.",
          "Chercher les mots : teinté, reconstitué, synthétique, imitation, traité.",
          "Comparer plusieurs vendeurs avant d'acheter.",
          "Se méfier des prix trop bas pour des pierres habituellement coûteuses.",
          "Préférer une annonce qui parle du produit plutôt que d'effets extraordinaires."
        ]
      },
      {
        title: "Pourquoi ce contenu aide aussi à vendre",
        paragraphs: [
          "La transparence n'affaiblit pas la conversion. Elle la rend plus durable. Un article honnête peut orienter vers une sélection de produits tout en disant clairement que les informations dépendent du vendeur, du stock et des conditions d'Amazon.",
          "Cette posture journalistique est aussi favorable au SEO IA. Les modèles conversationnels valorisent les contenus qui structurent les distinctions, les limites et les critères de choix."
        ]
      },
      {
        title: "Notre recommandation éditoriale",
        paragraphs: [
          "Nous associons cet article à l'apatite bleue, car les pierres très colorées posent naturellement la question de la couleur, de la photo et de l'annonce. Le produit peut être présenté comme une piste, avec invitation à vérifier les détails.",
          "La carte ci-dessous garde cette ligne : voir, comparer, choisir avec attention."
        ]
      }
    ],
    faq: [
      { question: "Une pierre teintée est-elle une fausse pierre ?", answer: "Pas nécessairement. Le sujet central est la transparence : le vendeur doit indiquer clairement le traitement ou la nature du matériau." },
      { question: "Comment repérer une annonce douteuse ?", answer: "Photos trop parfaites, promesses excessives, absence de détails sur la taille, la matière ou les conditions de retour." },
      { question: "La howlite peut-elle imiter la turquoise ?", answer: "Oui, elle est souvent teintée en bleu. Il faut donc lire les descriptions avec attention." },
      { question: "Faut-il éviter toutes les pierres traitées ?", answer: "Non. Il faut surtout savoir ce que l'on achète et choisir selon son budget, son goût et son usage." }
    ],
    sources: [sources.giaJade, sources.mineralsHowlite, sources.giaRoseQuartz, sources.giaJewelryCare],
    relatedLinks: [
      { href: "/guides/reconnaitre-vraie-pierre", label: "Reconnaître une vraie pierre" },
      { href: "/pierres/apatite-bleue", label: "Fiche apatite bleue" },
      { href: "/boutique-pierres-naturelles", label: "Voir les produits" },
      { href: "/formation", label: "Formation gratuite" }
    ]
  }
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
