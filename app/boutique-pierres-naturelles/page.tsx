import type { Metadata } from "next";
import Link from "next/link";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { recommendedProducts } from "@/lib/products";
import { wellbeingDisclaimer } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Boutique pierres naturelles : bracelets recommandes par intention",
  description:
    "Selection de bracelets en pierres naturelles par intention : protection, amour, calme, energie, confiance, cadeaux, homme et femme."
};

const sections = [
  { title: "Protection", key: "protection", intro: "Bracelets associes a l'ancrage, aux limites personnelles et a la stabilite symbolique." },
  { title: "Amour", key: "amour", intro: "Pierres douces pour symboliser la tendresse, le lien et l'amour de soi." },
  { title: "Stress & calme", key: "stress", intro: "Pierres traditionnellement associees au calme, au rituel du soir et au recentrage." },
  { title: "Energie", key: "energie", intro: "Pierres solaires et colorees pour accompagner une intention d'elan personnel." },
  { title: "Confiance", key: "confiance", intro: "Bracelets pour symboliser courage, posture et passage a l'action." },
  { title: "Cadeaux", key: "cadeau", intro: "Choix faciles a offrir avec un message symbolique clair." },
  { title: "Homme", key: "homme", intro: "Selections sobres, minerales et faciles a porter." },
  { title: "Femme", key: "femme", intro: "Selections douces, elegantes et intentionnelles." }
];

export default function NaturalStoneShopPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Boutique recommandee</p>
        <h1>Bracelets en pierres naturelles recommandes par intention</h1>
        <p className="section-lead">
          Cette selection vous aide a choisir un bracelet selon votre intention du moment. Les liens peuvent rediriger vers Amazon.
        </p>
        <p className="fineprint">
          Certains liens peuvent etre affilies ou commerciaux. Le prix final et la disponibilite dependent d'Amazon.
        </p>
      </section>

      {sections.map((section) => {
        const products = recommendedProducts.filter((product) => product.intentions.includes(section.key)).slice(0, 4);
        if (!products.length) return null;

        return (
          <section className="section compact-section" key={section.key}>
            <div className="section-heading-row">
              <div>
                <h2>{section.title}</h2>
                <p className="section-lead">{section.intro}</p>
              </div>
              <Link className="micro-action" href={`/intention/${section.key}`}>
                Guide intention
              </Link>
            </div>
            <div className="product-recommendation-grid">
              {products.map((product) => (
                <ProductRecommendationCard
                  key={`${section.key}-${product.id}`}
                  imageUrl={product.imageUrl}
                  title={product.title}
                  stoneName={product.stone}
                  intention={section.title}
                  emotionalBenefit={product.description}
                  price={product.price}
                  amazonUrl={product.amazonUrl}
                  badge={product.badge}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className="section compact-section">
        <LeadCaptureCard source="shop" />
      </section>

      <section className="section compact-section">
        <article className="compliance-panel">
          <h2>Cadre responsable</h2>
          <p>{wellbeingDisclaimer}</p>
        </article>
      </section>
    </main>
  );
}
