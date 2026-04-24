import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { getStone, stones } from "@/lib/stones";
import { wellbeingDisclaimer } from "@/lib/legal";
import { withAffiliate } from "@/lib/affiliate";

export function generateStaticParams() {
  return stones.map((stone) => ({ slug: stone.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const stone = getStone(params.slug);
  return {
    title: stone ? `${stone.name} | Litho Intelligence` : "Pierre | Litho Intelligence",
    description: stone?.description
  };
}

export default function StonePage({ params }: { params: { slug: string } }) {
  const stone = getStone(params.slug);
  if (!stone) notFound();

  return (
    <main>
      <section className="stone-hero">
        <div>
          <h1>{stone.name}</h1>
          <p className="section-lead">{stone.description}</p>
          <div className="pill-row">
            <span className="pill">Chakra : {stone.chakra}</span>
            <span className="pill">Origine : {stone.origin}</span>
          </div>
        </div>
        <figure className="stone-visual">
          <img src={stone.image.url} alt={stone.image.alt} />
          <figcaption>
            Photo: <Link href={stone.image.sourceUrl}>{stone.image.credit}</Link>
          </figcaption>
        </figure>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card">
            <h2>Description visuelle</h2>
            <p>{stone.visual}</p>
          </article>
          <article className="card">
            <h2>Propriétés symboliques</h2>
            <ul>
              {stone.properties.map((property) => (
                <li key={property}>{property}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Utilisation</h2>
            <p>{stone.usage}</p>
            <p>{stone.wear}</p>
            <ul>
              {stone.usageTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Rituel du jour</h2>
            <ul>
              {stone.rituals.map((ritual) => (
                <li key={ritual}>{ritual}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Compatibilités</h2>
            <div className="pill-row">
              {stone.compatibilities.map((slug) => {
                const match = getStone(slug);
                return (
                  <Link className="pill" href={`/stone/${slug}`} key={slug}>
                    {match?.name ?? slug}
                  </Link>
                );
              })}
            </div>
          </article>
          <article className="card">
            <h2>Incompatibilités</h2>
            <p>
              {stone.incompatibilities.length > 0
                ? stone.incompatibilities.map((slug) => getStone(slug)?.name ?? slug).join(", ")
                : "Aucune incompatibilité notable dans cette base."}
            </p>
          </article>
          <article className="card">
            <h2>Purification</h2>
            <p>{stone.purification}</p>
            <div className="pill-row">
              {stone.purificationMethods.map((method) => (
                <span className="pill" key={method}>
                  {method}
                </span>
              ))}
            </div>
          </article>
          <article className="card">
            <h2>Recharge</h2>
            <div className="pill-row">
              {stone.recharge.map((method) => (
                <span className="pill" key={method}>
                  {method}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="form-panel">
          <h2>Acheter ou approfondir</h2>
          <div className="product-grid">
            {stone.products.map((product) => (
              <Link
                className="product-card"
                href={withAffiliate(product.url)}
                key={product.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="product-brand">{product.brand}</span>
                {product.badge ? <span className="product-badge">{product.badge}</span> : null}
                <strong>{product.label}</strong>
                <div className="product-meta">
                  {product.price ? <span>{product.price}</span> : null}
                  {product.rating ? <span>{product.rating}/5</span> : null}
                  {product.reviewCount ? <span>{product.reviewCount} avis</span> : null}
                  {product.monthlySales ? <span>{product.monthlySales}/mois</span> : null}
                </div>
                <span className="button">
                  <ShoppingBag size={17} />
                  Voir sur Amazon
                </span>
              </Link>
            ))}
          </div>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </div>
      </section>
    </main>
  );
}
