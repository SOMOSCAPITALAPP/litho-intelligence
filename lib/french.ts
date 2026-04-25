const feminineStoneNames = new Set([
  "agate",
  "agate du botswana",
  "aigue-marine",
  "amazonite",
  "amethyste",
  "angelite",
  "apatite bleue",
  "apatite jaune",
  "apatite verte",
  "aventurine verte",
  "calcédoine bleue",
  "calcite jaune",
  "célestine",
  "chrysoprase",
  "citrine",
  "cornaline",
  "fluorite",
  "howlite",
  "labradorite",
  "labradorite blanche",
  "labradorite de madagascar",
  "labradorite foncée",
  "labradorite foncée (larvikite)",
  "larvikite",
  "lépidolite",
  "malachite",
  "mokaïte",
  "obsidienne noire",
  "obsidienne œil céleste",
  "opale",
  "pierre de lave",
  "pierre de lune",
  "pierre de soleil",
  "préhnite",
  "pyrite",
  "rhodonite",
  "sélénite",
  "sodalite",
  "sodalite du brésil",
  "tourmaline noire",
  "turquoise",
  "unakite"
]);

const masculineStoneNames = new Set([
  "cristal de roche",
  "diamant",
  "grenat",
  "jade",
  "jade émeraude",
  "jaspe",
  "jaspe dalmatien",
  "jaspe paysage",
  "jaspe rouge",
  "lapis-lazuli",
  "onyx",
  "œil de tigre",
  "péridot",
  "quartz clair",
  "quartz fumé",
  "quartz rose",
  "quartz rutile",
  "rubis",
  "saphir",
  "serpentine"
]);

const feminineStoneKeys = new Set(Array.from(feminineStoneNames).map(normalizeFrench));
const masculineStoneKeys = new Set(Array.from(masculineStoneNames).map(normalizeFrench));

function normalizeFrench(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/'/g, "’");
}

function startsWithVowelSound(name: string) {
  return /^[aeiouyh]/i.test(normalizeFrench(name));
}

export function stoneWithDefiniteArticle(name: string) {
  const normalized = normalizeFrench(name);

  if (startsWithVowelSound(name)) return `l’${name}`;
  if (feminineStoneKeys.has(normalized)) return `la ${name}`;
  if (masculineStoneKeys.has(normalized)) return `le ${name}`;

  return name.toLowerCase().endsWith("e") ? `la ${name}` : `le ${name}`;
}

export function stonesWithDefiniteArticles(names: string[]) {
  return names.map(stoneWithDefiniteArticle).join(" et ");
}
