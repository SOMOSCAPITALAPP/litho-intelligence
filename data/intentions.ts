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
      "L’objectif n’est pas de promettre une action sur la santé, mais de choisir un support symbolique simple pour accompagner une intention de calme.",
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
    emotionalPromise: "Ici, l’amour commence par une intention simple : se considérer avec plus de douceur, puis créer un espace plus ouvert pour le lien.",
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
    slug: "energie",
    queryLabel: "pierre pour l'energie",
    shortLabel: "Energie",
    title: "Pierres pour l'energie : retrouver un elan symbolique",
    seoTitle: "Quelle pierre pour l'energie ? Cornaline, citrine et apatite bleue",
    seoDescription: "Pierres traditionnellement associees a l'elan, a la motivation et au passage a l'action dans les croyances de lithotherapie.",
    intro: "Quand l'elan manque, une pierre chaude ou lumineuse peut devenir un rappel concret : choisir une action simple et avancer avec douceur.",
    emotionalPromise: "Ces pierres accompagnent symboliquement une intention de mouvement et de confiance, sans promesse de résultat.",
    recommendedStoneSlugs: ["cornaline", "citrine", "apatite-bleue", "pyrite", "oeil-de-tigre"],
    meditationStone: "Cornaline",
    meditationIntention: "elan personnel",
    giftAngle: "Pour encourager un nouveau depart, la cornaline ou l'apatite bleue portent une symbolique claire et positive.",
    solutionSteps: ["Choisir une pierre solaire ou coloree.", "La porter le matin.", "Associer le bracelet a une action realiste dans la journee."],
    faq: [
      { question: "Quelle pierre est associee a l'energie ?", answer: "La cornaline, la citrine et l'apatite bleue sont souvent associees a l'elan symbolique et a la motivation." },
      { question: "Comment porter une pierre d'energie ?", answer: "Le bracelet est pratique pour garder l'intention visible pendant une journee active." },
      { question: "Ces pierres donnent-elles de l'energie physiquement ?", answer: "Non. Elles sont presentees comme supports symboliques et ne remplacent jamais un avis professionnel." },
      { question: "Quelle pierre offrir pour encourager quelqu'un ?", answer: "La cornaline et l'oeil de tigre sont des choix lisibles pour symboliser courage et action." }
    ]
  },
  {
    slug: "cadeau",
    queryLabel: "pierre naturelle a offrir",
    shortLabel: "Cadeau",
    title: "Quelle pierre offrir ? Guide cadeau par intention",
    seoTitle: "Quelle pierre naturelle offrir ? Idees cadeaux et bracelets recommandes",
    seoDescription: "Guide cadeau pour choisir une pierre naturelle selon une intention : amour, protection, calme, confiance ou energie.",
    intro: "Offrir une pierre, c'est donner une intention visible : soutien, douceur, protection, courage ou gratitude.",
    emotionalPromise: "La valeur du cadeau vient du message symbolique qui l'accompagne et de la clarte de l'intention.",
    recommendedStoneSlugs: ["quartz-rose", "labradorite", "oeil-de-tigre", "howlite", "amethyste"],
    meditationStone: "Quartz rose",
    meditationIntention: "attention sincere",
    giftAngle: "Choisissez une pierre facile a comprendre et ajoutez une phrase courte pour expliquer votre intention.",
    solutionSteps: ["Choisir la relation.", "Choisir l'occasion.", "Associer une intention simple au bracelet."],
    faq: [
      { question: "Quelle pierre offrir a une femme ?", answer: "Le quartz rose, l'amethyste et la labradorite sont des choix populaires selon l'intention du cadeau." },
      { question: "Quelle pierre offrir a un homme ?", answer: "L'oeil de tigre, la labradorite foncee et la tourmaline noire sont des options sobres et symboliques." },
      { question: "Quelle pierre offrir pour la protection ?", answer: "La labradorite et l'oeil de tigre sont traditionnellement associes a la protection symbolique." },
      { question: "Faut-il purifier une pierre offerte ?", answer: "On peut proposer un rituel simple de fumigation douce ou de repos, sans obligation." }
    ]
  },
  {
    slug: "hypersensibilite",
    queryLabel: "pierre pour hypersensibilite",
    shortLabel: "Hypersensibilite",
    title: "Pierres pour l'hypersensibilite : protection douce et limites",
    seoTitle: "Pierre pour hypersensibilite : labradorite, quartz rose et howlite",
    seoDescription: "Pierres traditionnellement associees aux personnes sensibles : protection symbolique, douceur et recentrage.",
    intro: "Pour les personnes qui absorbent beaucoup, une pierre peut symboliser une limite douce et un retour a soi.",
    emotionalPromise: "L'objectif est d'accompagner un rituel personnel de protection symbolique, sans promesse medicale.",
    recommendedStoneSlugs: ["labradorite", "quartz-rose", "howlite", "tourmaline-noire", "amethyste"],
    meditationStone: "Labradorite",
    meditationIntention: "limites douces",
    giftAngle: "La labradorite est un cadeau tres lisible pour une personne sensible aux ambiances.",
    solutionSteps: ["Choisir une pierre de protection douce.", "La porter lors des journees chargees.", "Respirer 2 minutes en formulant une limite simple."],
    faq: [
      { question: "Quelle pierre est associee a l'hypersensibilite ?", answer: "La labradorite est souvent associee a la protection symbolique des personnes sensibles." },
      { question: "Peut-on l'associer au quartz rose ?", answer: "Oui, cette association symbolise protection et douceur." },
      { question: "Quelle forme choisir ?", answer: "Un bracelet est pratique car il reste visible pendant la journee." },
      { question: "Est-ce une solution medicale ?", answer: "Non, il s'agit d'une pratique symbolique ou culturelle." }
    ]
  },
  {
    slug: "fatigue-emotionnelle",
    queryLabel: "pierre pour fatigue emotionnelle",
    shortLabel: "Fatigue emotionnelle",
    title: "Pierres pour la fatigue emotionnelle : douceur et recuperation symbolique",
    seoTitle: "Pierre pour fatigue emotionnelle : labradorite, amethyste et quartz rose",
    seoDescription: "Guide symbolique des pierres associees a la fatigue emotionnelle, au recentrage et a la douceur interieure.",
    intro: "Quand l'emotionnel est sature, les pierres douces ou protectrices peuvent rappeler de ralentir et de revenir a l'essentiel.",
    emotionalPromise: "Elles accompagnent une intention de repos symbolique et de recentrage personnel.",
    recommendedStoneSlugs: ["labradorite", "amethyste", "quartz-rose", "howlite", "apatite-bleue"],
    meditationStone: "Amethyste",
    meditationIntention: "repos interieur",
    giftAngle: "Pour soutenir quelqu'un avec delicatesse, le quartz rose ou l'amethyste sont faciles a offrir.",
    solutionSteps: ["Choisir une pierre douce.", "La garder pres de soi dans un moment calme.", "Associer la pierre a une respiration lente."],
    faq: [
      { question: "Quelle pierre choisir en fatigue emotionnelle ?", answer: "La labradorite, l'amethyste et le quartz rose sont souvent associes au recentrage et a la douceur." },
      { question: "Comment l'utiliser ?", answer: "Un rituel court de respiration avec la pierre suffit pour poser l'intention." },
      { question: "Peut-on porter plusieurs pierres ?", answer: "Oui, mais il vaut mieux rester simple : une pierre de protection et une pierre douce." },
      { question: "La pierre remplace-t-elle un accompagnement ?", answer: "Non. Elle ne remplace jamais un avis medical, psychologique ou professionnel." }
    ]
  },
  {
    slug: "argent-abondance",
    queryLabel: "pierre pour argent et abondance",
    shortLabel: "Argent & abondance",
    title: "Pierres pour l'argent et l'abondance : clarte, confiance et action",
    seoTitle: "Pierre pour argent et abondance : pyrite, citrine et oeil de tigre",
    seoDescription: "Pierres traditionnellement associees a l'abondance symbolique, a la confiance et a l'action responsable.",
    intro: "Les pierres d'abondance ne promettent pas de gain financier. Elles servent de support symbolique pour clarifier une intention et poser une action.",
    emotionalPromise: "Le bracelet devient un rappel : organiser son energie, faire un choix concret et avancer avec discernement.",
    recommendedStoneSlugs: ["pyrite", "citrine", "oeil-de-tigre", "aventurine-verte", "cornaline"],
    meditationStone: "Pyrite",
    meditationIntention: "abondance responsable",
    giftAngle: "La pyrite ou l'oeil de tigre conviennent bien a une personne qui lance un projet.",
    solutionSteps: ["Choisir une pierre doree ou solaire.", "La relier a une action realiste.", "Eviter toute promesse de resultat financier."],
    faq: [
      { question: "Quelle pierre est associee a l'abondance ?", answer: "La pyrite et la citrine sont traditionnellement associees a l'abondance symbolique." },
      { question: "Quelle pierre pour un projet professionnel ?", answer: "L'oeil de tigre et la pyrite symbolisent confiance, structure et action." },
      { question: "Est-ce que cela attire l'argent ?", answer: "Le site ne promet aucun resultat. Il s'agit d'un support symbolique d'intention." },
      { question: "Comment porter la pyrite ?", answer: "En bracelet ou pres du bureau, comme rappel d'organisation et de clarte." }
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
