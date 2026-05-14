import type { Metadata } from "next";
import Link from "next/link";
import { Gift } from "lucide-react";
import { FormationCTA } from "@/components/FormationCTA";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { ShareActions } from "@/components/ShareActions";
import { recommendedProducts } from "@/lib/products";
import { wellbeingDisclaimer } from "@/lib/legal";
import { defaultShareAlt, shareImage, shareImageType } from "@/lib/site";

export const metadata: Metadata = {
  title: "Idée cadeau pierre naturelle : bracelet femme, homme et protection",
  description:
    "Trouvez un bracelet en pierre naturelle à offrir selon la personne, l'occasion, l'intention et le budget.",
  openGraph: {
    title: "Idée cadeau pierre naturelle : trouvez le bon bracelet",
    description: "Choisissez un bracelet en pierre naturelle selon la personne, l'occasion, l'intention et le budget.",
    url: "/idee-cadeau",
    images: [{ url: shareImage, secureUrl: shareImage, type: shareImageType, width: 1200, height: 630, alt: defaultShareAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Idée cadeau pierre naturelle",
    description: "Bracelets symboliques à offrir selon une intention : amour, protection, calme ou confiance.",
    images: [shareImage]
  }
};

const filters = {
  "Pour qui ?": ["Femme", "Homme", "Mère", "Amie", "Conjoint", "Collègue"],
  Occasion: ["Anniversaire", "Fête des mères", "Noël", "Remerciement", "Encouragement", "Protection"],
  Intention: ["Amour", "Protection", "Confiance", "Calme", "Énergie"],
  Budget: ["Moins de 15 EUR", "15-25 EUR", "25 EUR+"]
};

const picks = [
  { label: "Meilleur choix", product: recommendedProducts.find((item) => item.id === "bracelet-labradorite-pochette") },
  { label: "Choix symbolique", product: recommendedProducts.find((item) => item.id === "bracelet-quartz-rose") },
  { label: "Petit prix", product: recommendedProducts.find((item) => item.id === "bracelet-howlite") }
].filter((item): item is { label: string; product: (typeof recommendedProducts)[number] } => Boolean(item.product));

const futureSeoPages = [
  ["/cadeau/fete-des-meres", "Fête des mères"],
  ["/cadeau/anniversaire-femme", "Anniversaire femme"],
  ["/cadeau/bracelet-pierre-naturelle-femme", "Bracelet femme"],
  ["/cadeau/bracelet-pierre-naturelle-homme", "Bracelet homme"],
  ["/cadeau/protection", "Cadeau protection"],
  ["/cadeau/amour", "Cadeau amour"]
];

export default function GiftPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Tunnel cadeau</p>
        <h1>Trouver un bracelet en pierre naturelle à offrir</h1>
        <p className="section-lead">
          Choisissez selon la personne, l'occasion et l'intention. Litho Intelligence propose ensuite des bracelets lisibles, symboliques et faciles à offrir.
        </p>
        <ShareActions
          compact
          title="Idée cadeau pierre naturelle"
          text="Je découvre des idées de bracelets en pierres naturelles à offrir selon une intention."
          url="/idee-cadeau"
        />
      </section>

      <section className="section compact-section">
        <div className="gift-filter-grid">
          {Object.entries(filters).map(([title, values]) => (
            <article className="gift-filter-card" key={title}>
              <h2>{title}</h2>
              <div className="pill-row">
                {values.map((value) => (
                  <span className="pill" key={value}>
                    {value}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Sélection immédiate</p>
            <h2>Trois idées cadeau simples</h2>
          </div>
          <Link className="button secondary" href="/boutique-pierres-naturelles">
            Voir plus de bracelets
          </Link>
        </div>
        <div className="product-recommendation-grid">
          {picks.map(({ label, product }) => (
            <ProductRecommendationCard
              key={label}
              imageUrl={product.imageUrl}
              title={product.title}
              stoneName={product.stone}
              intention={label}
              emotionalBenefit={product.description}
              price={product.price}
              amazonUrl={product.amazonUrl}
              badge={label}
            />
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <article className="card">
          <Gift size={22} />
          <h2>Pourquoi offrir une pierre avec une intention ?</h2>
          <p>
            Une pierre naturelle donne une forme concrète à une attention : soutien, gratitude, amour, protection ou encouragement.
            La valeur du cadeau vient du message qui l'accompagne, pas d'une promesse d'effet.
          </p>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </article>
      </section>

      <section className="section compact-section">
        <h2>Guides cadeaux à développer</h2>
        <div className="pill-row">
          {futureSeoPages.map(([href, label]) => (
            <Link className="pill" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <LeadCaptureCard source="gift" intention="cadeau" />
      </section>

      <FormationCTA />
    </main>
  );
}
