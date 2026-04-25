export type IntentionPage = {
  slug: string;
  queryLabel: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  emotionalPromise: string;
  recommendedStoneSlugs: string[];
  meditationStone: string;
  meditationIntention: string;
  giftAngle: string;
  faq: Array<{ question: string; answer: string }>;
};

export const intentionPages: IntentionPage[] = [
  {
    slug: "stress",
    queryLabel: "pierre pour stress",
    title: "Pierre pour stress : quelles pierres choisir pour une intention de calme ?",
    seoTitle: "Pierre pour stress : pierres naturelles associées au calme",
    seoDescription:
      "Découvrez les pierres traditionnellement associées au calme, à l’apaisement et au recentrage : améthyste, quartz rose, lépidolite, howlite et labradorite.",
    intro:
      "Lorsque le mental s’agite, une pierre peut devenir un rappel concret : ralentir, respirer et revenir à une intention plus douce. En lithothérapie traditionnelle, certaines pierres sont associées au calme, à la protection émotionnelle et au recentrage.",
    emotionalPromise:
      "L’objectif n’est pas de promettre un effet médical, mais de vous aider à choisir un support symbolique simple pour accompagner une intention de calme.",
    recommendedStoneSlugs: ["amethyste", "lepidolite", "howlite", "quartz-rose", "labradorite"],
    meditationStone: "Améthyste",
    meditationIntention: "calme intérieur",
    giftAngle: "Pour une personne stressée, une pierre douce comme l’améthyste ou la lépidolite peut être offerte comme symbole d’apaisement et de présence.",
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
    slug: "argent",
    queryLabel: "pierre pour argent",
    title: "Pierre pour argent : abondance, confiance et passage à l’action",
    seoTitle: "Pierre pour argent : citrine, pyrite, aventurine et œil de tigre",
    seoDescription:
      "Découvrez les pierres traditionnellement associées à l’abondance symbolique, à la confiance et à l’action : citrine, pyrite, aventurine verte et œil de tigre.",
    intro:
      "Dans une démarche de bien-être, les pierres liées à l’argent ne promettent pas un gain financier. Elles servent plutôt de support symbolique pour sortir de la peur du manque, clarifier une intention et poser une action concrète.",
    emotionalPromise:
      "La bonne pierre peut devenir un rappel visible : je reprends confiance, je structure mon énergie et j’avance vers une décision plus claire.",
    recommendedStoneSlugs: ["citrine", "pyrite", "aventurine-verte", "oeil-de-tigre", "quartz-rutile"],
    meditationStone: "Citrine",
    meditationIntention: "confiance et abondance symbolique",
    giftAngle: "Pour un nouveau projet, une citrine ou un œil de tigre peut symboliser l’élan, la réussite et la confiance dans l’action.",
    faq: [
      {
        question: "Quelle pierre est associée à l’abondance ?",
        answer: "La citrine et la pyrite sont traditionnellement associées à l’abondance symbolique, à la lumière personnelle et au passage à l’action."
      },
      {
        question: "Comment utiliser une pierre pour l’argent ?",
        answer: "Associez-la à une action réaliste : clarifier une offre, appeler un client, faire un budget ou poser une décision concrète."
      }
    ]
  },
  {
    slug: "amour",
    queryLabel: "pierre pour amour",
    title: "Pierre pour amour : douceur, réconciliation et ouverture du cœur",
    seoTitle: "Pierre pour amour : quartz rose, rhodonite et pierre de lune",
    seoDescription:
      "Découvrez les pierres traditionnellement associées à l’amour, à la douceur et au réconfort émotionnel : quartz rose, rhodonite, pierre de lune et aventurine verte.",
    intro:
      "Les pierres d’amour accompagnent symboliquement l’ouverture du cœur, la tendresse et le respect de soi. Elles sont particulièrement adaptées aux cadeaux, aux rituels personnels et aux intentions de réconciliation.",
    emotionalPromise:
      "Ici, l’amour commence par une intention simple : se traiter avec plus de douceur, puis créer un espace plus ouvert pour le lien.",
    recommendedStoneSlugs: ["quartz-rose", "rhodonite", "pierre-de-lune", "aventurine-verte", "rhodochrosite"],
    meditationStone: "Quartz rose",
    meditationIntention: "douceur du cœur",
    giftAngle: "Pour un cadeau amoureux ou affectif, le quartz rose reste une pierre lisible, tendre et très accessible.",
    faq: [
      {
        question: "Quelle pierre choisir pour l’amour ?",
        answer: "Le quartz rose est traditionnellement associé à l’amour de soi, à la tendresse et au réconfort du cœur."
      },
      {
        question: "Quelle pierre pour une réconciliation ?",
        answer: "La rhodonite peut accompagner symboliquement une intention de pardon, d’écoute et de réparation émotionnelle."
      }
    ]
  },
  {
    slug: "confiance",
    queryLabel: "pierre pour confiance",
    title: "Pierre pour confiance : courage, affirmation et sécurité intérieure",
    seoTitle: "Pierre pour confiance : œil de tigre, citrine et cornaline",
    seoDescription:
      "Découvrez les pierres traditionnellement associées à la confiance, au courage et à l’affirmation : œil de tigre, citrine, cornaline, calcite jaune et jaspe rouge.",
    intro:
      "Quand le doute prend trop de place, une pierre peut servir de rappel symbolique : redresser sa posture, clarifier son intention et avancer pas à pas. Les pierres de confiance sont souvent solaires, chaudes et orientées action.",
    emotionalPromise:
      "Le but est de soutenir symboliquement une intention d’affirmation, sans forcer ni promettre un changement immédiat.",
    recommendedStoneSlugs: ["oeil-de-tigre", "citrine", "cornaline", "calcite-jaune", "jaspe-rouge"],
    meditationStone: "Œil de tigre",
    meditationIntention: "courage et affirmation",
    giftAngle: "Pour une personne qui démarre un projet ou traverse une période de doute, l’œil de tigre symbolise la force calme et la décision.",
    faq: [
      {
        question: "Quelle pierre est associée à la confiance en soi ?",
        answer: "L’œil de tigre est traditionnellement associé à la confiance, au courage et à la protection symbolique."
      },
      {
        question: "Quelle pierre choisir pour passer à l’action ?",
        answer: "La cornaline et la citrine sont souvent choisies pour symboliser l’élan, la créativité et l’action."
      }
    ]
  }
];

export function getIntentionPage(slug: string) {
  return intentionPages.find((page) => page.slug === slug);
}
