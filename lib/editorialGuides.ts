export type EditorialGuide = {
  slug: string;
  title: string;
  description: string;
  category: "guide" | "entretien" | "comparatif" | "journal";
  updatedAt: string;
  sections: Array<{
    title: string;
    body: string;
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
        title: "Ce que ce guide couvre",
        body:
          "Une pierre naturelle peut être regardée sous deux angles complémentaires : ses caractéristiques observables et les traditions symboliques qui lui sont associées. Litho Intelligence distingue ces deux niveaux pour aider le lecteur à choisir avec plus de discernement."
      },
      {
        title: "Points à vérifier avant de choisir",
        body: "Avant d'acheter une pierre ou un bracelet, il vaut mieux regarder les informations concrètes disponibles.",
        bullets: [
          "le nom exact de la pierre et les appellations commerciales possibles ;",
          "la couleur, l'aspect et les variations naturelles ;",
          "les traitements ou teintures éventuels ;",
          "les conseils d'entretien ;",
          "la cohérence entre le prix, la qualité annoncée et les photos."
        ]
      }
    ],
    relatedLinks: [
      { href: "/stones", label: "Explorer les pierres de A à Z" },
      { href: "/guides/reconnaitre-vraie-pierre", label: "Reconnaître une vraie pierre" },
      { href: "/test", label: "Faire le test gratuit" }
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
        title: "Commencer par l'observation",
        body:
          "Une pierre naturelle présente souvent des variations, inclusions ou nuances. Une couleur parfaitement uniforme, très vive ou répétée à l'identique peut indiquer une pierre teintée, recomposée ou synthétique selon le cas."
      },
      {
        title: "Signaux utiles",
        body: "Aucun indice isolé ne suffit à authentifier une pierre, mais plusieurs observations peuvent orienter le choix.",
        bullets: [
          "photos nettes et non retouchées à l'excès ;",
          "nom de pierre précis plutôt que promesse vague ;",
          "mention des traitements lorsque la couleur semble intense ;",
          "vendeur capable d'expliquer l'origine ou la nature du produit ;",
          "prix cohérent avec la rareté annoncée."
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
        title: "Une approche prudente",
        body:
          "Toutes les pierres ne réagissent pas de la même façon à l'eau, au sel ou au soleil. Certaines peuvent se ternir, se fissurer ou perdre leur éclat. Litho Intelligence privilégie donc les méthodes douces lorsque la composition exacte n'est pas certaine."
      },
      {
        title: "Méthodes généralement douces",
        body: "Ces gestes sont souvent préférés lorsqu'on veut limiter les risques matériels.",
        bullets: [
          "repos sur un tissu propre ;",
          "fumigation légère ;",
          "son ou intention symbolique ;",
          "lumière indirecte plutôt qu'exposition solaire forte ;",
          "nettoyage sec avec chiffon doux."
        ]
      }
    ],
    relatedLinks: [
      { href: "/stones", label: "Consulter les fiches pierres" },
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
        title: "Le bracelet comme support d'intention",
        body:
          "Un bracelet en pierre naturelle est facile à porter et rappelle visiblement une intention. Il doit toutefois être choisi pour sa cohérence, sa qualité perçue et son confort, pas seulement pour une liste de vertus."
      },
      {
        title: "Critères de choix",
        body: "Avant d'acheter, comparer quelques éléments simples évite les déceptions.",
        bullets: [
          "taille des perles et diamètre du bracelet ;",
          "photos réelles du produit ;",
          "description claire de la pierre ;",
          "conditions de livraison et de retour ;",
          "prix final et disponibilité."
        ]
      }
    ],
    relatedLinks: [
      { href: "/boutique-pierres-naturelles", label: "Boutique recommandée" },
      { href: "/intention", label: "Choisir selon son besoin" }
    ]
  }
];

export function getEditorialGuide(slug: string) {
  return editorialGuides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: EditorialGuide["category"]) {
  return editorialGuides.filter((guide) => guide.category === category);
}
