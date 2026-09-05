export type RecommendedBook = {
  id: string;
  asin: string;
  title: string;
  subtitle: string;
  stoneSlug?: string;
  stoneName?: string;
  intention: string;
  audience: string;
  imageUrl: string;
  amazonUrl: string;
  badge: string;
  description: string;
  bestFor: string[];
  placementTags: string[];
};

export const recommendedBooks: RecommendedBook[] = [
  {
    id: "livre-labradorite-protection-intuition",
    asin: "B0G4H3PJVJ",
    title: "Labradorite : guide symbolique de protection et d'intuition",
    subtitle: "Approfondir la pierre phare des personnes sensibles",
    stoneSlug: "labradorite",
    stoneName: "Labradorite",
    intention: "protection",
    audience: "Pour les lecteurs qui veulent comprendre la labradorite avant de choisir un bracelet.",
    imageUrl: "https://m.media-amazon.com/images/I/41eZkE+djHL.jpg",
    amazonUrl: "https://www.amazon.fr/dp/B0G4H3PJVJ",
    badge: "Livre phare",
    description:
      "Un ouvrage centré sur la labradorite, ses reflets, sa place dans les traditions symboliques et les rituels personnels de protection intérieure.",
    bestFor: [
      "Comprendre pourquoi la labradorite est si souvent choisie pour la protection symbolique.",
      "Associer lecture, fiche pierre et bracelet dans un parcours cohérent.",
      "Offrir un complément utile à une personne attirée par les pierres de recentrage."
    ],
    placementTags: ["home", "shop", "formation", "journal", "protection", "labradorite"]
  },
  {
    id: "livre-quartz-rose-amour-douceur",
    asin: "B0CJLCXMKL",
    title: "Le quartz rose et ses secrets : amour de soi et douceur symbolique",
    subtitle: "Une lecture accessible autour de la pierre du coeur",
    stoneSlug: "quartz-rose",
    stoneName: "Quartz rose",
    intention: "amour",
    audience: "Pour les personnes qui cherchent une approche douce, affective et facile à offrir.",
    imageUrl: "https://m.media-amazon.com/images/I/419gtbZi2ML.jpg",
    amazonUrl: "https://www.amazon.fr/dp/B0CJLCXMKL",
    badge: "Idée cadeau",
    description:
      "Un livre consacré au quartz rose, à ses usages culturels et à la façon de l'intégrer dans une intention de tendresse, de lien et de bienveillance envers soi.",
    bestFor: [
      "Préparer un cadeau autour de l'amour de soi ou de la tendresse.",
      "Mieux comprendre le quartz rose avant de porter un bracelet.",
      "Créer un rituel personnel simple, symbolique et responsable."
    ],
    placementTags: ["home", "shop", "formation", "journal", "amour", "cadeau", "quartz-rose"]
  },
  {
    id: "livre-secret-energetique-pierres",
    asin: "B0CMTYC2NR",
    title: "Le secret énergétique des pierres : repères de lithothérapie symbolique",
    subtitle: "Une porte d'entrée générale dans l'univers des pierres naturelles",
    intention: "fondamentaux",
    audience: "Pour débuter, comparer les approches et construire une culture générale des pierres.",
    imageUrl: "https://m.media-amazon.com/images/I/41nbS0d3AyL.jpg",
    amazonUrl: "https://www.amazon.fr/dp/B0CMTYC2NR",
    badge: "Pour débuter",
    description:
      "Un ouvrage général pour explorer les pierres naturelles, leurs récits, leurs usages spirituels ou culturels et les bonnes questions à se poser avant d'acheter.",
    bestFor: [
      "Découvrir la lithothérapie comme tradition symbolique.",
      "Accompagner la formation gratuite avec une lecture papier.",
      "Aider un débutant à choisir entre plusieurs intentions et plusieurs pierres."
    ],
    placementTags: ["home", "shop", "formation", "journal", "fondamentaux", "debutant"]
  }
];

export function getBooksByPlacement(tag: string, limit = recommendedBooks.length) {
  return recommendedBooks.filter((book) => book.placementTags.includes(tag)).slice(0, limit);
}

export function getBooksForStone(stoneSlug: string, limit = 2) {
  const exactMatches = recommendedBooks.filter((book) => book.stoneSlug === stoneSlug);
  const generalBooks = recommendedBooks.filter((book) => book.placementTags.includes("fondamentaux"));
  return [...exactMatches, ...generalBooks.filter((book) => !exactMatches.includes(book))].slice(0, limit);
}
