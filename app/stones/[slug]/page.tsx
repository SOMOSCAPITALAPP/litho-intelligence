import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { getNativeStone, getNativeStoneImage, nativeStones } from "@/lib/nativeStones";
import { getStone } from "@/lib/stones";

export function generateStaticParams() {
  return nativeStones.map((stone) => ({ slug: stone.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const stone = getNativeStone(params.slug);

  return {
    title: stone?.seo_title ?? "Pierre naturelle | Litho Intelligence",
    description: stone?.seo_description
  };
}

export default function NativeStonePage({ params }: { params: { slug: string } }) {
  const stone = getNativeStone(params.slug);
  if (!stone) notFound();

  const productStone = getStone(stone.amazon_product_slug || stone.slug);
  const product = productStone?.products[0];
  const image = getNativeStoneImage(stone);

  return (
    <main>
      <section className="stone-hero">
        <div>
          <Link className="micro-action" href="/stones">
            <ArrowLeft size={15} />
            Catalogue
          </Link>
          <h1>{stone.name}</h1>
          <p className="section-lead">{stone.short_description}</p>
          <div className="pill-row">
            {stone.intentions.slice(0, 4).map((intention) => (
              <span className="pill" key={intention}>
                {intention}
              </span>
            ))}
          </div>
        </div>
        <figure className="stone-visual">
          <img src={image.url} alt={image.alt} />
          <figcaption>Visuel produit Litho Intelligence</figcaption>
        </figure>
      </section>

      <section className="section">
        <div className="grid">
          <InfoCard title="Usages traditionnels" items={stone.traditional_uses} />
          <InfoCard title="Mots-clés émotionnels" items={stone.emotional_keywords} />
          <InfoCard title="Bien-être symbolique" items={stone.physical_wellbeing_keywords} />
          <InfoCard title="Chakras" items={stone.chakras} />
          <InfoCard title="Couleurs" items={stone.colors} />
          <InfoCard title="Formes recommandées" items={stone.recommended_forms} />
          <InfoCard title="Conseils d’utilisation" items={stone.usage_advice} />
          <InfoCard title="Purification" items={stone.purification} />
          <InfoCard title="Recharge" items={stone.recharge} />
          <InfoCard title="Associations positives" items={stone.positive_combinations} />
          <InfoCard title="Associations à doser" items={stone.avoid_combinations.length ? stone.avoid_combinations : ["Aucune association sensible dans cette base."]} />
        </div>

        <div className="form-panel">
          <h2>Bracelet associé</h2>
          {product ? (
            <Link className="button gold-button" href={withAffiliate(product.url)} rel="noopener noreferrer" target="_blank">
              <ShoppingBag size={17} />
              Voir le bracelet {product.brand}
            </Link>
          ) : (
            <p>Produit associé à compléter dans le catalogue Felicidade / Vera Mentis.</p>
          )}
          <p className="fineprint">{stone.disclaimer}</p>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
