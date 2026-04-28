import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { getStone, stones } from "@/lib/stones";
import { wellbeingDisclaimer } from "@/lib/legal";
import { withAffiliate } from "@/lib/affiliate";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { EmailCapture } from "@/components/EmailCapture";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import { ShareActions } from "@/components/ShareActions";
import { slugifyVirtue } from "@/lib/virtues";

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
        </figure>
      </section>

      <section className="section stone-detail-section">
        <div className="grid">
          <article className="card">
            <h2>Description visuelle</h2>
            <p>{stone.visual}</p>
          </article>
          <article className="card">
            <h2>Propriétés symboliques</h2>
            <ul>
              {stone.properties.map((property) => (
                <li key={property}>
                  <Link className="micro-action" href={`/vertus/${slugifyVirtue(property)}`}>
                    {property}
                  </Link>
                </li>
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
            <RelatedStoneLinks items={stone.compatibilities} title="Pierres compatibles" />
          </article>
          <article className="card">
            <h2>Incompatibilités</h2>
            <RelatedStoneLinks emptyText="Aucune incompatibilité notable dans cette base." items={stone.incompatibilities} title="Associations à doser" />
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
          <h2>Cette pierre vous correspond ?</h2>
          <p>Gardez cette pierre dans vos favoris ou découvrez le bracelet associé pour l’intégrer à votre quotidien.</p>
          <ShareActions
            compact
            networks
            title={`${stone.name} | Litho Intelligence`}
            text={`Je découvre ${stone.name} sur Litho Intelligence.`}
            url={`https://litho-intelligence.vercel.app/stone/${stone.slug}`}
          />
          <div className="premium-actions">
            <AddFavoriteButton stoneSlug={stone.slug} />
          </div>
          <div className="product-grid">
            {stone.products.map((product) => (
              <Link className="product-card" href={withAffiliate(product.url)} key={product.label} rel="noopener noreferrer" target="_blank">
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
                  Voir le bracelet associé
                </span>
              </Link>
            ))}
          </div>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </div>
        <EmailCapture source={`stone:${stone.slug}`} />
      </section>
    </main>
  );
}
