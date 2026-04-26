import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { getNativeStone, nativeStones, normalizeNativeValue } from "@/lib/nativeStones";
import { getStone, stones } from "@/lib/stones";

type RelatedStone = {
  key: string;
  name: string;
  pageHref: string;
  amazonUrl?: string;
};

export function RelatedStoneLinks({
  items,
  title = "Pierres reliées",
  emptyText = "Aucune pierre reliée pour le moment."
}: {
  items: string[];
  title?: string;
  emptyText?: string;
}) {
  const related = items.map(resolveRelatedStone).filter(Boolean) as RelatedStone[];

  return (
    <div className="related-stone-block">
      <h3>{title}</h3>
      {related.length ? (
        <div className="related-stone-list">
          {related.map((stone) => (
            <div className="related-stone-item" key={stone.key}>
              <Link className="related-stone-name" href={stone.pageHref}>
                {stone.name}
              </Link>
              {stone.amazonUrl ? (
                <Link className="related-amazon-link" href={withAffiliate(stone.amazonUrl)} rel="noopener noreferrer" target="_blank">
                  Voir le bracelet associé
                  <ExternalLink size={13} />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p>{emptyText}</p>
      )}
    </div>
  );
}

function resolveRelatedStone(value: string): RelatedStone | null {
  const cleaned = value.trim();
  const slug = slugify(cleaned);
  const productStone =
    getStone(cleaned) ??
    getStone(slug) ??
    stones.find((stone) => normalizeNativeValue(stone.name) === normalizeNativeValue(cleaned));

  if (productStone) {
    return {
      key: productStone.slug,
      name: productStone.name,
      pageHref: `/stone/${productStone.slug}`,
      amazonUrl: productStone.products[0]?.url
    };
  }

  const native =
    getNativeStone(cleaned) ??
    getNativeStone(slug) ??
    nativeStones.find((stone) => normalizeNativeValue(stone.name) === normalizeNativeValue(cleaned));

  if (!native) return null;

  const nativeProduct = native.amazon_product_slug ? getStone(native.amazon_product_slug) : null;

  return {
    key: native.slug,
    name: native.name,
    pageHref: `/stones/${native.slug}`,
    amazonUrl: nativeProduct?.products[0]?.url
  };
}

function slugify(value: string) {
  return normalizeNativeValue(value)
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
