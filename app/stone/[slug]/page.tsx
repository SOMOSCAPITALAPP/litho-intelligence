import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { getStone, stones } from "@/lib/stones";
import { wellbeingDisclaimer } from "@/lib/legal";

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
            <span className="pill">Chakra: {stone.chakra}</span>
            <span className="pill">Origine: {stone.origin}</span>
          </div>
        </div>
        <div className="stone-visual" aria-label={`Representation visuelle de ${stone.name}`} />
      </section>

      <section className="section">
        <div className="grid">
          <article className="card">
            <h2>Description visuelle</h2>
            <p>{stone.visual}</p>
          </article>
          <article className="card">
            <h2>Proprietes symboliques</h2>
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
          </article>
          <article className="card">
            <h2>Compatibilites</h2>
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
            <h2>Incompatibilites</h2>
            <p>
              {stone.incompatibilities.length > 0
                ? stone.incompatibilities.map((slug) => getStone(slug)?.name ?? slug).join(", ")
                : "Aucune incompatibilite notable dans cette base."}
            </p>
          </article>
          <article className="card">
            <h2>Purification</h2>
            <p>{stone.purification}</p>
          </article>
        </div>

        <div className="form-panel">
          <h2>Acheter ou approfondir</h2>
          <div className="pill-row">
            {stone.products.map((product) => (
              <Link className="button" href={product.url} key={product.label}>
                <ShoppingBag size={17} />
                {product.label}
              </Link>
            ))}
          </div>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </div>
      </section>
    </main>
  );
}
