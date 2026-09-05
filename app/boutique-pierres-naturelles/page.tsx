import type { Metadata } from "next";
import Link from "next/link";
import { BookRecommendationSection } from "@/components/BookRecommendationSection";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ShareActions } from "@/components/ShareActions";
import { getBooksByPlacement } from "@/lib/books";
import { recommendedProducts } from "@/lib/products";
import { wellbeingDisclaimer } from "@/lib/legal";
import { defaultShareAlt, shareImage, shareImageType } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boutique pierres naturelles : bracelets recommandés par intention",
  description:
    "Sélection de bracelets en pierres naturelles par intention : protection, amour, calme, énergie, confiance, cadeaux, homme et femme.",
  alternates: {
    canonical: "/boutique-pierres-naturelles"
  },
  openGraph: {
    title: "Boutique pierres naturelles : bracelets recommandés par intention",
    description: "Découvrez une sélection de bracelets en pierres naturelles selon votre intention du moment.",
    url: "/boutique-pierres-naturelles",
    images: [{ url: shareImage, secureUrl: shareImage, type: shareImageType, width: 1200, height: 630, alt: defaultShareAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique pierres naturelles Litho Intelligence",
    description: "Bracelets recommandés par intention avec liens Amazon.",
    images: [shareImage]
  }
};

const sections = [
  { title: "Protection", key: "protection", intro: "Bracelets associés à l'ancrage, aux limites personnelles et à la stabilité symbolique." },
  { title: "Amour", key: "amour", intro: "Pierres douces pour symboliser la tendresse, le lien et l'amour de soi." },
  { title: "Stress & calme", key: "stress", intro: "Pierres traditionnellement associées au calme, au rituel du soir et au recentrage." },
  { title: "Énergie", key: "energie", intro: "Pierres solaires et colorées pour accompagner une intention d'élan personnel." },
  { title: "Confiance", key: "confiance", intro: "Bracelets pour symboliser courage, posture et passage à l'action." },
  { title: "Cadeaux", key: "cadeau", intro: "Choix faciles à offrir avec un message symbolique clair." },
  { title: "Homme", key: "homme", intro: "Sélections sobres, minérales et faciles à porter." },
  { title: "Femme", key: "femme", intro: "Sélections douces, élégantes et intentionnelles." }
];

const shopBooks = getBooksByPlacement("shop", 3);

export default function NaturalStoneShopPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Boutique recommandée</p>
        <h1>Bracelets en pierres naturelles recommandés par intention</h1>
        <p className="section-lead">
          Cette sélection vous aide à choisir un bracelet selon votre intention du moment. Les liens peuvent rediriger vers Amazon.
        </p>
        <p className="fineprint">
          Certains liens peuvent être affiliés ou commerciaux. Le prix final et la disponibilité dépendent d'Amazon.
        </p>
        <ShareActions
          compact
          title="Boutique pierres naturelles Litho Intelligence"
          text="Je découvre une sélection de bracelets en pierres naturelles classés par intention."
          url="/boutique-pierres-naturelles"
        />
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
              <Link className="micro-action" href={`/intentions/${section.key}`}>
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

      <BookRecommendationSection
        books={shopBooks}
        eyebrow="Livres et guides papier"
        source="shop"
        title="Comprendre les pierres avant de choisir"
        intro="Une sélection éditoriale de livres pour compléter l'achat d'un bracelet et mieux formuler son intention."
      />

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
