import { getNativeStone, nativeStones, normalizeNativeValue } from "@/lib/nativeStones";
import { getStone, stones } from "@/lib/stones";

export type VirtueMatch = {
  slug: string;
  label: string;
  pageHref: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  amazonUrl?: string;
};

export function slugifyVirtue(value: string) {
  return normalizeNativeValue(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function humanizeVirtueSlug(slug: string) {
  return slug.replace(/-/g, " ");
}

export function getAllVirtues() {
  const values = new Map<string, string>();

  for (const stone of stones) {
    for (const value of [...stone.properties, ...stone.goals]) {
      const key = slugifyVirtue(value);
      if (!values.has(key)) values.set(key, value);
    }
  }

  for (const stone of nativeStones) {
    for (const value of [...stone.intentions, ...stone.emotional_keywords, ...stone.physical_wellbeing_keywords]) {
      const key = slugifyVirtue(value);
      if (!values.has(key)) values.set(key, value);
    }
  }

  return Array.from(values.entries())
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "fr"));
}

export function findStonesByVirtue(input: string): VirtueMatch[] {
  const target = slugifyVirtue(input);
  const matches = new Map<string, VirtueMatch>();

  for (const stone of nativeStones) {
    const values = [...stone.intentions, ...stone.emotional_keywords, ...stone.physical_wellbeing_keywords];
    if (!values.some((value) => slugifyVirtue(value) === target)) continue;

    const productStone = getStone(stone.amazon_product_slug || stone.slug);
    const product = productStone?.products[0];

    matches.set(`native:${stone.slug}`, {
      slug: stone.slug,
      label: stone.name,
      pageHref: `/stones/${stone.slug}`,
      description: stone.short_description,
      image: {
        url: `/images/stones/${stone.slug}.png`,
        alt: `${stone.name} en pierre naturelle`
      },
      amazonUrl: product?.url
    });
  }

  for (const stone of stones) {
    const values = [...stone.properties, ...stone.goals, ...stone.emotions];
    if (!values.some((value) => slugifyVirtue(value) === target)) continue;
    if (matches.has(`native:${stone.slug}`)) continue;

    matches.set(`product:${stone.slug}`, {
      slug: stone.slug,
      label: stone.name,
      pageHref: `/stone/${stone.slug}`,
      description: stone.description,
      image: stone.image,
      amazonUrl: stone.products[0]?.url
    });
  }

  return Array.from(matches.values()).sort((a, b) => a.label.localeCompare(b.label, "fr"));
}

export function getVirtueLabel(input: string) {
  const target = slugifyVirtue(input);
  return getAllVirtues().find((virtue) => virtue.slug === target)?.label ?? humanizeVirtueSlug(target);
}

export function resolveStonePage(slugOrName: string) {
  const normalized = normalizeNativeValue(slugOrName);
  const productStone =
    getStone(slugOrName) ??
    stones.find((stone) => normalizeNativeValue(stone.name) === normalized || normalizeNativeValue(stone.slug) === normalized);

  if (productStone) {
    return {
      href: `/stone/${productStone.slug}`,
      label: productStone.name,
      amazonUrl: productStone.products[0]?.url
    };
  }

  const native =
    getNativeStone(slugOrName) ??
    nativeStones.find((stone) => normalizeNativeValue(stone.name) === normalized || normalizeNativeValue(stone.slug) === normalized);

  if (!native) return null;

  const productStoneFromNative = native.amazon_product_slug ? getStone(native.amazon_product_slug) : null;
  return {
    href: `/stones/${native.slug}`,
    label: native.name,
    amazonUrl: productStoneFromNative?.products[0]?.url
  };
}
