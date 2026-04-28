import fs from "node:fs";

const productUpdates = [
  ["obsidienne-noire", "obsidienne-noire", "Bracelet Obsidienne noire", "https://amzn.eu/d/09thIdst"],
  ["hematite", "hematite", "Bracelet Hématite", "https://amzn.eu/d/0i9x4eJJ"],
  ["pierre-de-lave", "pierre-de-lave", "Bracelet Pierre de lave", "https://amzn.eu/d/06nXWhgt"],
  ["unakite", "unakite", "Bracelet Unakite", "https://amzn.eu/d/01HlwvvJ"],
  ["jaspe-dalmatien", "jaspe-dalmatien", "Bracelet Jaspe dalmatien", "https://amzn.eu/d/0dIWq1Lv"],
  ["jaspe-acajou", "jaspe-acajou", "Pendentif cœur Jaspe acajou", "https://amzn.eu/d/0dIWq1Lv"],
  ["amethyste", "amethyste", "Pendentif cœur Améthyste", "https://amzn.eu/d/075cfZhd"],
  ["agate-fuchsia", "agate-fuchsia", "Bracelet Agate fuchsia", "https://amzn.eu/d/03wuRENA"],
  ["calcite-bleue", "calcite-bleue", "Bracelet Calcite bleue", "https://amzn.eu/d/0b7HT9WX"],
  ["quartz-blanc-laiteux", "quartz-blanc-laiteux", "Bracelet Quartz blanc laiteux", "https://amzn.eu/d/0bi3d8Gs"],
  ["agate-pourpre", "agate-pourpre", "Bracelet Agate pourpre", "https://amzn.eu/d/07ta5Fgd"],
  ["opaline", "opaline", "Bracelet Opaline", "https://amzn.eu/d/05cQrjmj"],
  ["agate-bleue", "agate-bleue", "Bracelet Agate bleue", "https://amzn.eu/d/0ebLTZmN"],
  ["jaspe-vert", "jaspe-vert", "Bracelet Jaspe vert", "https://amzn.eu/d/0ebLTZmN"],
  ["oeil-de-taureau", "oeil-de-taureau", "Bracelet Œil de taureau", "https://amzn.eu/d/08wpifet"],
  ["olivine", "olivine", "Bracelet Olivine", "https://amzn.eu/d/00GtHayF"]
];

const nativeAdditions = [
  {
    slug: "jaspe-acajou",
    name: "Jaspe acajou",
    short_description: "Jaspe brun rouge, associé à l'ancrage, au courage calme et à la sécurité intérieure.",
    traditional_uses: ["ancrage", "courage", "sécurité intérieure"],
    emotional_keywords: ["peur", "fatigue", "instabilité"],
    intentions: ["ancrage", "courage", "stabilité"],
    physical_wellbeing_keywords: ["fatigue ressentie", "besoin de stabilité"],
    chakras: ["racine"],
    colors: ["brun", "rouge", "acajou"],
    recommended_forms: ["pendentif cœur", "pierre roulée", "bracelet"],
    usage_advice: ["À porter lors des périodes où l'on recherche plus de stabilité.", "À tenir quelques minutes avant une décision concrète."],
    purification: ["fumigation", "son", "lune"],
    recharge: ["terre", "quartz"],
    positive_combinations: ["jaspe rouge", "hématite", "pierre de lave"],
    avoid_combinations: ["améthyste"],
    seo_title: "Jaspe acajou : ancrage, courage et pendentif cœur",
    seo_description: "Le jaspe acajou est associé à l'ancrage, au courage calme et à la sécurité intérieure.",
    amazon_product_slug: "jaspe-acajou",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "agate-fuchsia",
    name: "Agate fuchsia",
    short_description: "Agate rose intense, associée à la joie, à l'expression et à l'élan créatif.",
    traditional_uses: ["joie", "expression", "vitalité douce"],
    emotional_keywords: ["tristesse", "doute", "blocage"],
    intentions: ["joie", "confiance", "créativité"],
    physical_wellbeing_keywords: ["fatigue ressentie", "manque d'élan"],
    chakras: ["cœur", "gorge"],
    colors: ["fuchsia", "rose"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter lorsque l'on souhaite remettre de la couleur dans sa journée.", "À associer à une intention d'expression joyeuse."],
    purification: ["fumigation", "son"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["quartz rose", "cornaline", "citrine"],
    avoid_combinations: ["obsidienne noire"],
    seo_title: "Agate fuchsia : joie, expression et bracelet",
    seo_description: "L'agate fuchsia peut accompagner symboliquement la joie, l'expression et la confiance créative.",
    amazon_product_slug: "agate-fuchsia",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "calcite-bleue",
    name: "Calcite bleue",
    short_description: "Pierre bleu pâle, reliée à l'apaisement, à la parole douce et au relâchement.",
    traditional_uses: ["apaisement", "communication douce", "clarté"],
    emotional_keywords: ["stress", "colère", "tension"],
    intentions: ["sérénité", "communication", "apaisement"],
    physical_wellbeing_keywords: ["tensions ressenties", "surcharge mentale"],
    chakras: ["gorge"],
    colors: ["bleu pâle", "bleu laiteux"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter lors des échanges sensibles.", "À tenir quelques minutes avant une prise de parole."],
    purification: ["fumigation", "son", "lune"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["calcédoine bleue", "sodalite", "améthyste"],
    avoid_combinations: ["grenat"],
    seo_title: "Calcite bleue : apaisement et communication douce",
    seo_description: "La calcite bleue est associée à l'apaisement, à la communication douce et au relâchement.",
    amazon_product_slug: "calcite-bleue",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "quartz-blanc-laiteux",
    name: "Quartz blanc laiteux",
    short_description: "Quartz blanc doux, associé à la clarté progressive, à l'harmonie et à l'apaisement.",
    traditional_uses: ["clarté douce", "harmonie", "neutralité"],
    emotional_keywords: ["confusion", "fatigue", "dispersion"],
    intentions: ["clarté", "équilibre", "sérénité"],
    physical_wellbeing_keywords: ["fatigue ressentie", "besoin de calme"],
    chakras: ["couronne"],
    colors: ["blanc", "laiteux"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter pour soutenir une intention simple et claire.", "À utiliser comme repère de calme dans une routine courte."],
    purification: ["fumigation", "son"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["améthyste", "quartz rose", "sélénite"],
    avoid_combinations: [],
    seo_title: "Quartz blanc laiteux : clarté douce et bracelet",
    seo_description: "Le quartz blanc laiteux peut accompagner symboliquement la clarté, l'harmonie et l'apaisement.",
    amazon_product_slug: "quartz-blanc-laiteux",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "agate-pourpre",
    name: "Agate pourpre",
    short_description: "Agate violette ou pourpre, associée à l'intuition, à la créativité et à la confiance.",
    traditional_uses: ["intuition", "créativité", "protection douce"],
    emotional_keywords: ["doute", "stress", "blocage"],
    intentions: ["intuition", "confiance", "créativité"],
    physical_wellbeing_keywords: ["fatigue ressentie", "besoin de recul"],
    chakras: ["troisième œil"],
    colors: ["pourpre", "violet"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter lors des périodes de réflexion ou de création.", "À associer à une intention de confiance intuitive."],
    purification: ["fumigation", "son"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["améthyste", "quartz clair", "lapis lazuli"],
    avoid_combinations: [],
    seo_title: "Agate pourpre : intuition, créativité et bracelet",
    seo_description: "L'agate pourpre est reliée aux traditions d'intuition, de créativité et de protection douce.",
    amazon_product_slug: "agate-pourpre",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "opaline",
    name: "Opaline",
    short_description: "Pierre lumineuse à reflets laiteux, associée à la douceur et aux transitions émotionnelles.",
    traditional_uses: ["douceur", "clarté émotionnelle", "transition"],
    emotional_keywords: ["tristesse", "hypersensibilité", "confusion"],
    intentions: ["apaisement", "clarté", "transition"],
    physical_wellbeing_keywords: ["fatigue ressentie", "besoin de douceur"],
    chakras: ["cœur", "couronne"],
    colors: ["blanc", "bleuté", "nacré"],
    recommended_forms: ["bracelet", "pendentif", "pierre roulée"],
    usage_advice: ["À porter dans les périodes de changement.", "À associer à une phrase d'apaisement courte."],
    purification: ["fumigation", "son"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["quartz rose", "améthyste", "pierre de lune"],
    avoid_combinations: ["obsidienne noire"],
    seo_title: "Opaline : douceur, clarté émotionnelle et transition",
    seo_description: "L'opaline peut accompagner symboliquement la douceur, la clarté émotionnelle et les transitions.",
    amazon_product_slug: "opaline",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "agate-bleue",
    name: "Agate bleue",
    short_description: "Agate bleue associée à la communication, à la patience et à l'harmonie relationnelle.",
    traditional_uses: ["communication", "apaisement", "patience"],
    emotional_keywords: ["stress", "colère", "peur de dire"],
    intentions: ["communication", "sérénité", "relations"],
    physical_wellbeing_keywords: ["tensions ressenties", "surcharge mentale"],
    chakras: ["gorge"],
    colors: ["bleu"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter lors d'un échange important.", "À utiliser comme rappel de parole calme."],
    purification: ["fumigation", "son"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["calcédoine bleue", "sodalite", "quartz rose"],
    avoid_combinations: [],
    seo_title: "Agate bleue : communication douce et apaisement",
    seo_description: "L'agate bleue est associée à la communication douce, à la patience et à l'harmonie.",
    amazon_product_slug: "agate-bleue",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "jaspe-vert",
    name: "Jaspe vert",
    short_description: "Jaspe vert associé à la stabilité, au renouveau et à un ancrage doux.",
    traditional_uses: ["stabilité", "renouveau", "ancrage"],
    emotional_keywords: ["fatigue", "stress", "frustration"],
    intentions: ["équilibre", "ancrage", "renouveau"],
    physical_wellbeing_keywords: ["besoin de stabilité", "fatigue ressentie"],
    chakras: ["cœur", "racine"],
    colors: ["vert"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter lorsque l'on veut retrouver une base calme.", "À associer à une intention de renouveau progressif."],
    purification: ["fumigation", "son"],
    recharge: ["terre", "quartz"],
    positive_combinations: ["aventurine verte", "unakite", "jaspe rouge"],
    avoid_combinations: [],
    seo_title: "Jaspe vert : stabilité, renouveau et ancrage",
    seo_description: "Le jaspe vert peut accompagner symboliquement la stabilité, le renouveau et l'équilibre.",
    amazon_product_slug: "jaspe-vert",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "oeil-de-taureau",
    name: "Œil de taureau",
    short_description: "Pierre brun rouge chatoyante, associée au courage, à la force et à la détermination.",
    traditional_uses: ["courage", "force", "ancrage"],
    emotional_keywords: ["peur", "doute", "hésitation"],
    intentions: ["courage", "confiance", "action"],
    physical_wellbeing_keywords: ["fatigue ressentie", "manque d'élan"],
    chakras: ["racine", "plexus solaire"],
    colors: ["brun", "rouge", "doré"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter lors des journées où l'on doit agir.", "À tenir avant une décision ou une prise de parole."],
    purification: ["fumigation", "son"],
    recharge: ["soleil doux", "quartz"],
    positive_combinations: ["jaspe rouge", "grenat", "hématite"],
    avoid_combinations: ["quartz rose"],
    seo_title: "Œil de taureau : courage, force et détermination",
    seo_description: "L'œil de taureau est associé au courage, à la force tranquille et à la détermination.",
    amazon_product_slug: "oeil-de-taureau",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  },
  {
    slug: "olivine",
    name: "Olivine",
    short_description: "Pierre verte lumineuse, associée au renouveau, à la joie et à l'ouverture du cœur.",
    traditional_uses: ["renouveau", "joie", "ouverture du cœur"],
    emotional_keywords: ["tristesse", "jalousie", "frustration"],
    intentions: ["joie", "amour", "renouveau"],
    physical_wellbeing_keywords: ["fatigue ressentie", "besoin de légèreté"],
    chakras: ["cœur"],
    colors: ["vert olive", "vert lumineux"],
    recommended_forms: ["bracelet", "pierre roulée"],
    usage_advice: ["À porter dans les périodes où l'on veut retrouver de la légèreté.", "À associer à une intention de renouveau affectif."],
    purification: ["fumigation", "son"],
    recharge: ["lune", "quartz"],
    positive_combinations: ["aventurine verte", "quartz rose", "citrine"],
    avoid_combinations: [],
    seo_title: "Olivine : renouveau, joie et ouverture du cœur",
    seo_description: "L'olivine peut accompagner symboliquement le renouveau, la joie et l'ouverture du cœur.",
    amazon_product_slug: "olivine",
    disclaimer: "Informations issues des traditions de lithothérapie. Ne remplace pas un avis médical."
  }
];

const productsPath = "data/products.seed.json";
const nativePath = "data/stones.seed.json";

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
for (const [stone_slug, product_slug, title, amazon_url] of productUpdates) {
  const row = {
    stone_slug,
    product_slug,
    title,
    brand: "Felicidade",
    amazon_url,
    image_url: `/images/stones/${product_slug}.png`
  };
  const index = products.findIndex((item) => item.stone_slug === stone_slug);
  if (index >= 0) products[index] = { ...products[index], ...row };
  else products.push(row);
}
fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");

const nativeStones = JSON.parse(fs.readFileSync(nativePath, "utf8"));
for (const [stone_slug, product_slug] of productUpdates) {
  const existing = nativeStones.find((stone) => stone.slug === stone_slug);
  if (existing) existing.amazon_product_slug = product_slug;
}
for (const addition of nativeAdditions) {
  const index = nativeStones.findIndex((stone) => stone.slug === addition.slug);
  if (index >= 0) nativeStones[index] = { ...nativeStones[index], ...addition };
  else nativeStones.push(addition);
}
fs.writeFileSync(nativePath, `${JSON.stringify(nativeStones, null, 2)}\n`, "utf8");

console.log(`products: ${products.length}`);
console.log(`native stones: ${nativeStones.length}`);
