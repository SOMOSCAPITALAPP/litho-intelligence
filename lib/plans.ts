export type MembershipPlan = "free" | "premium" | "elite";

export const plans = {
  free: {
    name: "Gratuit",
    slug: "free" as const,
    price: "0 EUR",
    recommendationLimit: 3,
    combinationLimit: 1,
    favoriteLimit: 5
  },
  premium: {
    name: "Premium",
    slug: "premium" as const,
    price: "7,90 EUR/mois",
    recommendationLimit: Infinity,
    combinationLimit: Infinity,
    favoriteLimit: Infinity
  },
  elite: {
    name: "Elite",
    slug: "elite" as const,
    price: "19,90 EUR/mois",
    recommendationLimit: Infinity,
    combinationLimit: Infinity,
    favoriteLimit: Infinity
  }
};

export const premiumFeatures = [
  "Recommandations illimitees",
  "Analyse avancee des combinaisons",
  "Profil energetique personnalise",
  "Historique complet",
  "Pierre du jour",
  "Rituels personnalises",
  "Guides PDF premium",
  "Offres speciales Felicidade / Vera Mentis"
];
