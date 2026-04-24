import seed from "@/data/stones.seed.json";

export type NativeStone = {
  slug: string;
  name: string;
  short_description: string;
  traditional_uses: string[];
  emotional_keywords: string[];
  intentions: string[];
  physical_wellbeing_keywords: string[];
  chakras: string[];
  colors: string[];
  recommended_forms: string[];
  usage_advice: string[];
  purification: string[];
  recharge: string[];
  positive_combinations: string[];
  avoid_combinations: string[];
  seo_title: string;
  seo_description: string;
  amazon_product_slug: string;
  disclaimer: string;
};

export const nativeStones = seed as NativeStone[];

export function getNativeStone(slug: string) {
  return nativeStones.find((stone) => stone.slug === slug);
}

export function normalizeNativeValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae");
}
