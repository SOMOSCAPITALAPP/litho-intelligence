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
  }
];

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
