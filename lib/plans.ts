export type MembershipPlan = "free" | "premium" | "elite";

export const plans = {
  free: {
    name: "Gratuit",
    slug: "free" as const,
    price: "0 €",
    recommendationLimit: 3,
    combinationLimit: 1,
    favoriteLimit: 5
  },
  premium: {
    name: "Premium",
    slug: "premium" as const,
    price: "7,90 €/mois",
    recommendationLimit: Infinity,
    combinationLimit: Infinity,
    favoriteLimit: Infinity
  },
  elite: {
    name: "Élite",
    slug: "elite" as const,
    price: "19,90 €/mois",
    recommendationLimit: Infinity,
    combinationLimit: Infinity,
    favoriteLimit: Infinity
  }
};

export const premiumFeatures = [
  "Recommandations illimitées",
  "Analyse avancée des combinaisons",
  "Profil énergétique personnalisé",
  "Historique complet",
  "Pierre du jour",
  "Rituels personnalisés",
  "Guides PDF premium",
  "Offres spéciales produits",
  "Newsletter mensuelle Premium",
  "Un bracelet offert par trimestre"
];
