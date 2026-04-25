export type IntentionPage = {
  slug: string;
  queryLabel: string;
  shortLabel: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  emotionalPromise: string;
  recommendedStoneSlugs: string[];
  meditationStone: string;
  meditationIntention: string;
  giftAngle: string;
  solutionSteps: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const intentionPages: IntentionPage[] = [
  {
    slug: "stress",
    queryLabel: "pierre pour le stress",
    shortLabel: "Stress",
    title: "Pierres pour le stress : retrouver un point de calme",
    seoTitle: "Pierre pour le stress : pierres naturelles associées au calme",
    seoDescription: "Découvrez les pierres traditionnellement associées au calme, à l’apaisement et au recentrage.",
    intro:
      "Lorsque le mental s’agite, une pierre peut devenir un rappel concret : ralentir, respirer et revenir à une intention plus douce.",
    emotionalPromise:
      "L’objectif n’est pas de promettre un effet médical, mais de choisir un support symbolique simple pour accompagner une intention de calme.",
    recommendedStoneSlugs: ["amethyste", "lepidolite", "howlite", "quartz-rose", "labradorite"],
    meditationStone: "Améthyste",
    meditationIntention: "calme intérieur",
    giftAngle: "Pour une personne stressée, l’améthyste ou la lépidolite peuvent symboliser l’apaisement et la présence.",
    solutionSteps: ["Choisir une pierre douce.", "La porter ou la garder près de soi.", "Associer la pierre à une respiration lente de 2 minutes."],
    faq: [
      {
        question: "Quelle pierre est traditionnellement associée au stress ?",
        answer: "L’améthyste est souvent utilisée dans les pratiques de bien-être pour symboliser le calme, le recul et la détente intérieure."
      },
      {
        question: "Quelle forme choisir ?",
        answer: "Le bracelet est pratique au quotidien, tandis qu’une pierre roulée se garde facilement dans une poche ou près du lit."
      }
    ]
  },
  {
    slug: "calme",
    queryLabel: "pierre pour le calme",
    shortLabel: "Calme",
    title: "Pierres pour le calme : ralentir et revenir à soi",
    seoTitle: "Pierre pour le calme : améthyste, howlite, calcédoine bleue",
    seoDescription: "Pierres traditionnellement associées au calme, à la douceur et au relâchement symbolique.",
    intro: "Pour retrouver une sensation de calme, privilégiez les pierres douces, claires ou bleutées, associées au ralentissement et à la parole posée.",
    emotionalPromise: "La pierre sert ici de repère quotidien : elle rappelle de respirer, de simplifier et de revenir à une présence plus stable.",
    recommendedStoneSlugs: ["howlite", "calcedoine-bleue", "amethyste", "angelite", "lepidolite"],
    meditationStone: "Howlite",
    meditationIntention: "ralentissement intérieur",
    giftAngle: "Pour une personne qui a besoin de douceur, la howlite ou la calcédoine bleue sont des cadeaux faciles à comprendre.",
    solutionSteps: ["Choisir une pierre apaisante.", "La poser près du lit ou sur le bureau.", "Répéter une phrase simple : je ralentis, je respire."],
    faq: [
      {
        question: "Quelle pierre choisir pour une intention de calme ?",
        answer: "La howlite, la calcédoine bleue et l’améthyste sont souvent associées au calme dans les traditions de lithothérapie."
      }
    ]
  },
  {
    slug: "sommeil",
    queryLabel: "pierre pour le sommeil",
    shortLabel: "Sommeil",
    title: "Pierres pour le sommeil : créer un rituel du soir",
    seoTitle: "Pierre pour le sommeil : howlite, améthyste et lépidolite",
    seoDescription: "Pierres traditionnellement associées au repos, au calme du soir et au rituel de détente.",
    intro:
      "Les pierres liées au sommeil doivent rester dans un positionnement bien-être : elles accompagnent un rituel du soir sans remplacer un avis professionnel.",
    emotionalPromise: "L’idée est de créer un signal doux : poser la journée, ralentir l’esprit et préparer un moment plus calme.",
    recommendedStoneSlugs: ["howlite", "amethyste", "lepidolite", "quartz-rose", "pierre-de-lune"],
    meditationStone: "Améthyste",
    meditationIntention: "rituel du soir",
    giftAngle: "Pour un cadeau bien-être, la howlite en bracelet ou pierre roulée est lisible, douce et accessible.",
    solutionSteps: ["Choisir une pierre douce.", "La garder près du lit.", "Éteindre les écrans et respirer lentement 3 minutes."],
    faq: [
      {
        question: "Quelle pierre est associée au sommeil ?",
        answer: "La howlite et l’améthyste sont souvent utilisées comme supports symboliques de calme et de rituel du soir."
      }
    ]
  },
  {
    slug: "fatigue",
    queryLabel: "pierre pour la fatigue",
    shortLabel: "Fatigue",
    title: "Pierres pour la fatigue : retrouver un élan doux",
    seoTitle: "Pierre pour la fatigue : citrine, cornaline et jaspe rouge",
    seoDescription: "Pierres traditionnellement associées à l’élan, à la vitalité symbolique et à la motivation.",
    intro: "En lithothérapie traditionnelle, les pierres chaudes et solaires sont souvent choisies pour symboliser l’élan et le retour à l’action.",
    emotionalPromise: "La pierre devient un rappel : respecter son rythme, puis poser une petite action réaliste.",
    recommendedStoneSlugs: ["citrine", "cornaline", "jaspe-rouge", "pierre-de-soleil", "grenat"],
    meditationStone: "Cornaline",
    meditationIntention: "élan vital",
    giftAngle: "Pour encourager un nouveau départ, la cornaline ou la pierre de soleil portent une symbolique chaleureuse.",
    solutionSteps: ["Choisir une pierre solaire.", "La porter le matin.", "Associer la pierre à une seule action concrète dans la journée."],
    faq: [
      {
        question: "Quelle pierre choisir quand on manque d’énergie ?",
        answer: "La cornaline, la citrine et le jaspe rouge sont traditionnellement associées à l’élan et à la vitalité symbolique."
      }
    ]
  },
  {
    slug: "protection",
    queryLabel: "pierre pour la protection",
    shortLabel: "Protection",
    title: "Pierres de protection : poser ses limites",
    seoTitle: "Pierre de protection : labradorite, obsidienne, tourmaline noire",
    seoDescription: "Découvrez les pierres traditionnellement associées à la protection symbolique et à l’ancrage.",
    intro: "Les pierres de protection sont choisies comme rappels symboliques : poser une limite, revenir à soi et ne pas tout absorber.",
    emotionalPromise: "Elles accompagnent une intention de stabilité et de protection personnelle, sans promesse médicale.",
    recommendedStoneSlugs: ["labradorite", "obsidienne-noire", "tourmaline-noire", "onyx", "oeil-de-tigre"],
    meditationStone: "Labradorite",
    meditationIntention: "limites personnelles",
    giftAngle: "Pour une personne sensible aux ambiances, la labradorite est un cadeau très lisible.",
    solutionSteps: ["Choisir une pierre d’ancrage ou de protection.", "La porter lors des journées chargées.", "Formuler une limite simple : je garde mon énergie."],
    faq: [
      {
        question: "Quelle pierre est associée à la protection ?",
        answer: "La labradorite, l’obsidienne noire et la tourmaline noire sont parmi les pierres les plus associées à la protection symbolique."
      }
    ]
  },
  {
    slug: "amour",
    queryLabel: "pierre pour l’amour",
    shortLabel: "Amour",
    title: "Pierres pour l’amour : douceur, lien et réconciliation",
    seoTitle: "Pierre pour l’amour : quartz rose, rhodonite et pierre de lune",
    seoDescription: "Pierres traditionnellement associées à l’amour, à la tendresse et au réconfort émotionnel.",
    intro: "Les pierres d’amour accompagnent symboliquement l’ouverture du cœur, la tendresse et le respect de soi.",
    emotionalPromise: "Ici, l’amour commence par une intention simple : se traiter avec plus de douceur, puis créer un espace plus ouvert pour le lien.",
    recommendedStoneSlugs: ["quartz-rose", "rhodonite", "pierre-de-lune", "aventurine-verte", "grenat"],
    meditationStone: "Quartz rose",
    meditationIntention: "douceur du cœur",
    giftAngle: "Pour un cadeau amoureux ou affectif, le quartz rose reste une pierre lisible, tendre et très accessible.",
    solutionSteps: ["Choisir une pierre du cœur.", "La porter ou l’offrir avec un message simple.", "Associer la pierre à une intention de douceur."],
    faq: [
      {
        question: "Quelle pierre choisir pour l’amour ?",
        answer: "Le quartz rose est traditionnellement associé à l’amour de soi, à la tendresse et au réconfort du cœur."
      }
    ]
  },
  {
    slug: "confiance",
    queryLabel: "pierre pour la confiance",
    shortLabel: "Confiance",
    title: "Pierres pour la confiance : courage et affirmation",
    seoTitle: "Pierre pour la confiance : œil de tigre, citrine et cornaline",
    seoDescription: "Pierres traditionnellement associées à la confiance, au courage et à l’affirmation.",
    intro: "Quand le doute prend trop de place, une pierre peut servir de rappel symbolique : redresser sa posture et avancer pas à pas.",
    emotionalPromise: "Le but est de soutenir symboliquement une intention d’affirmation, sans forcer ni promettre un changement immédiat.",
    recommendedStoneSlugs: ["oeil-de-tigre", "citrine", "cornaline", "calcite-jaune", "jaspe-rouge"],
    meditationStone: "Œil de tigre",
    meditationIntention: "courage et affirmation",
    giftAngle: "Pour une personne qui démarre un projet, l’œil de tigre symbolise la force calme et la décision.",
    solutionSteps: ["Choisir une pierre solaire.", "La porter pendant une situation importante.", "Associer la pierre à une phrase courte : j’avance pas à pas."],
    faq: [
      {
        question: "Quelle pierre est associée à la confiance en soi ?",
        answer: "L’œil de tigre est traditionnellement associé à la confiance, au courage et à la protection symbolique."
      }
    ]
  },
  {
    slug: "argent",
    queryLabel: "pierre pour l’argent",
    shortLabel: "Argent",
    title: "Pierres pour l’argent : abondance symbolique et passage à l’action",
    seoTitle: "Pierre pour l’argent : citrine, pyrite, aventurine et œil de tigre",
    seoDescription: "Pierres traditionnellement associées à l’abondance symbolique, à la confiance et à l’action.",
    intro: "Les pierres liées à l’argent ne promettent pas un gain financier. Elles servent de support symbolique pour clarifier une intention et poser une action concrète.",
    emotionalPromise: "La bonne pierre devient un rappel visible : je reprends confiance, je structure mon énergie et j’avance vers une décision plus claire.",
    recommendedStoneSlugs: ["citrine", "pyrite", "aventurine-verte", "oeil-de-tigre", "quartz-rutile"],
    meditationStone: "Citrine",
    meditationIntention: "confiance et abondance symbolique",
    giftAngle: "Pour un nouveau projet, la citrine ou l’œil de tigre peuvent symboliser l’élan et la confiance dans l’action.",
    solutionSteps: ["Choisir une pierre solaire ou dorée.", "La relier à une action réaliste.", "Faire un geste concret : budget, appel, offre, décision."],
    faq: [
      {
        question: "Quelle pierre est associée à l’abondance ?",
        answer: "La citrine et la pyrite sont traditionnellement associées à l’abondance symbolique, à la lumière personnelle et au passage à l’action."
      }
    ]
  },
  {
    slug: "intuition",
    queryLabel: "pierre pour l’intuition",
    shortLabel: "Intuition",
    title: "Pierres pour l’intuition : écouter son ressenti",
    seoTitle: "Pierre pour l’intuition : labradorite, pierre de lune, lapis-lazuli",
    seoDescription: "Pierres traditionnellement associées à l’intuition, au discernement et à la clarté intérieure.",
    intro: "L’intuition demande de ralentir le bruit extérieur pour mieux entendre ce qui est déjà là.",
    emotionalPromise: "Ces pierres accompagnent symboliquement l’écoute de soi, le discernement et la confiance dans son ressenti.",
    recommendedStoneSlugs: ["labradorite", "pierre-de-lune", "lapis-lazuli", "amethyste", "sodalite"],
    meditationStone: "Labradorite",
    meditationIntention: "écoute intérieure",
    giftAngle: "Pour une personne sensible ou créative, la labradorite ou la pierre de lune sont des choix très symboliques.",
    solutionSteps: ["Choisir une pierre liée à l’intuition.", "La tenir avant une décision.", "Écrire une phrase sur ce que vous ressentez vraiment."],
    faq: [
      {
        question: "Quelle pierre choisir pour l’intuition ?",
        answer: "La labradorite, la pierre de lune et l’améthyste sont souvent associées à l’intuition dans les traditions de lithothérapie."
      }
    ]
  },
  {
    slug: "communication",
    queryLabel: "pierre pour la communication",
    shortLabel: "Communication",
    title: "Pierres pour la communication : dire les choses avec clarté",
    seoTitle: "Pierre pour la communication : apatite bleue, lapis-lazuli, calcédoine",
    seoDescription: "Pierres traditionnellement associées à l’expression, à la parole posée et à la clarté.",
    intro: "Pour parler plus clairement, privilégiez les pierres associées à la gorge, à l’expression et à l’apaisement relationnel.",
    emotionalPromise: "Elles rappellent de parler vrai, mais sans dureté : une intention de clarté et d’écoute.",
    recommendedStoneSlugs: ["apatite-bleue", "lapis-lazuli", "calcedoine-bleue", "sodalite", "turquoise"],
    meditationStone: "Apatite bleue",
    meditationIntention: "parole claire",
    giftAngle: "Pour un étudiant, un créateur ou une personne qui doit s’exprimer, l’apatite bleue est un cadeau pertinent.",
    solutionSteps: ["Choisir une pierre bleue.", "La porter avant une discussion.", "Préparer une phrase simple et honnête."],
    faq: [
      {
        question: "Quelle pierre est associée à la communication ?",
        answer: "L’apatite bleue, le lapis-lazuli et la calcédoine bleue sont traditionnellement associés à l’expression."
      }
    ]
  },
  {
    slug: "ancrage",
    queryLabel: "pierre pour l’ancrage",
    shortLabel: "Ancrage",
    title: "Pierres d’ancrage : revenir au corps et au réel",
    seoTitle: "Pierre d’ancrage : jaspe rouge, onyx, tourmaline noire",
    seoDescription: "Pierres traditionnellement associées à la stabilité, au retour au concret et à l’ancrage.",
    intro: "Quand l’esprit part dans tous les sens, l’ancrage consiste à revenir au corps, au présent et à une action simple.",
    emotionalPromise: "Ces pierres soutiennent symboliquement la stabilité, la présence et la sécurité intérieure.",
    recommendedStoneSlugs: ["jaspe-rouge", "tourmaline-noire", "onyx", "obsidienne-noire", "hematite"],
    meditationStone: "Jaspe rouge",
    meditationIntention: "stabilité intérieure",
    giftAngle: "Pour une personne dispersée ou en période de transition, le jaspe rouge symbolise une force simple et stable.",
    solutionSteps: ["Choisir une pierre dense ou sombre.", "La porter pendant les journées instables.", "Faire une action concrète : ranger, marcher, écrire."],
    faq: [
      {
        question: "Quelle pierre choisir pour l’ancrage ?",
        answer: "Le jaspe rouge, la tourmaline noire et l’onyx sont souvent associés à l’ancrage symbolique."
      }
    ]
  },
  {
    slug: "creativite",
    queryLabel: "pierre pour la créativité",
    shortLabel: "Créativité",
    title: "Pierres pour la créativité : retrouver l’élan d’expression",
    seoTitle: "Pierre pour la créativité : cornaline, pierre de soleil, apatite",
    seoDescription: "Pierres traditionnellement associées à la créativité, à l’expression et à l’élan personnel.",
    intro: "La créativité demande souvent de sortir du blocage sans se juger trop vite.",
    emotionalPromise: "Ces pierres deviennent un symbole d’élan : tester, exprimer, créer sans attendre que tout soit parfait.",
    recommendedStoneSlugs: ["cornaline", "pierre-de-soleil", "apatite-bleue", "citrine", "quartz-rutile"],
    meditationStone: "Cornaline",
    meditationIntention: "expression créative",
    giftAngle: "Pour un artiste, un entrepreneur ou une personne en lancement, la cornaline est un cadeau très parlant.",
    solutionSteps: ["Choisir une pierre chaude ou lumineuse.", "La garder près de son espace créatif.", "Créer pendant 10 minutes sans corriger."],
    faq: [
      {
        question: "Quelle pierre choisir pour la créativité ?",
        answer: "La cornaline est traditionnellement associée à la créativité, à l’élan et à l’expression personnelle."
      }
    ]
  },
  {
    slug: "nouveau-depart",
    queryLabel: "pierre pour un nouveau départ",
    shortLabel: "Nouveau départ",
    title: "Pierres pour un nouveau départ : ouvrir une nouvelle étape",
    seoTitle: "Pierre pour un nouveau départ : aventurine, labradorite, citrine",
    seoDescription: "Pierres traditionnellement associées au renouveau, à la transition et à l’élan.",
    intro: "Un nouveau départ demande à la fois de quitter l’ancien et de poser un premier geste concret.",
    emotionalPromise: "Ces pierres accompagnent symboliquement le changement, la confiance et l’ouverture à une nouvelle étape.",
    recommendedStoneSlugs: ["aventurine-verte", "labradorite", "citrine", "chrysoprase-citron", "pierre-de-soleil"],
    meditationStone: "Aventurine verte",
    meditationIntention: "renouveau",
    giftAngle: "Pour une personne qui change de vie, l’aventurine verte ou la labradorite symbolisent une transition protectrice.",
    solutionSteps: ["Choisir une pierre de transition.", "L’associer à une intention écrite.", "Poser une première action visible dans les 24 heures."],
    faq: [
      {
        question: "Quelle pierre offrir pour un nouveau départ ?",
        answer: "L’aventurine verte, la labradorite et la citrine sont de bons symboles de transition, de protection et d’élan."
      }
    ]
  }
];

export function getIntentionPage(slug: string) {
  return intentionPages.find((page) => page.slug === slug);
}
