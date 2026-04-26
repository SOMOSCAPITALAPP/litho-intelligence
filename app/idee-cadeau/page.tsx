import type { Metadata } from "next";
import Link from "next/link";
import { Gift, ShoppingBag } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { GiftStoneFinder } from "@/components/GiftStoneFinder";
import { FormationCTA } from "@/components/FormationCTA";
import { withAffiliate } from "@/lib/affiliate";
import { getStone } from "@/lib/stones";

export const metadata: Metadata = {
  title: "Idée cadeau pierre naturelle personnalisée | Litho Intelligence",
  description: "Trouvez une pierre naturelle à offrir selon une date de naissance, une relation, une occasion et une intention symbolique."
};

const giftSelectionOne = ["quartz-rose", "oeil-de-tigre", "labradorite", "cornaline", "jaspe-rouge", "aventurine-verte"];
const giftSelectionTwo = ["labradorite-foncee-larvikite", "labradorite", "apatite-bleue", "jade-emeraude", "quartz-rose", "calcedoine-bleue"];

function ProductGallery({ title, lead, slugs }: { title: string; lead: string; slugs: string[] }) {
  const galleryStones = slugs.map((slug) => getStone(slug)).filter(Boolean);

  return (
    <section className="section compact-section">
      <h2>{title}</h2>
      <p className="section-lead">{lead}</p>
      <div className="grid">
        {galleryStones.map((stone) => {
          const product = stone!.products[0];
          return (
            <article className="card catalog-card" key={`${title}-${stone!.slug}`}>
              <img className="stone-thumb wide" src={stone!.image.url} alt={stone!.image.alt} />
              <h3>{stone!.name}</h3>
              <p>{stone!.description}</p>
              <div className="pill-row">
                {stone!.intentions.slice(0, 2).map((intention) => (
                  <span className="pill" key={intention}>
                    {intention}
                  </span>
                ))}
              </div>
              <div className="card-actions">
                <a className="button gold-button" href={withAffiliate(product.url)} target="_blank" rel="noreferrer">
                  <ShoppingBag size={16} />
                  Voir sur Amazon
                </a>
                <Link className="button secondary" href={`/stone/${stone!.slug}`}>
                  Comprendre la pierre
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function GiftPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Idée cadeau personnalisée</p>
        <h1>Trouver une pierre à offrir</h1>
        <p className="section-lead">
          Cette page est pensée comme une vraie galerie cadeau : bijoux prêts à offrir, lecture émotionnelle et sélection simple par intention.
        </p>
      </section>

      <GiftStoneFinder />

      <section className="section">
        <article className="card">
          <Gift size={22} />
          <h2>Pourquoi offrir une pierre avec une intention ?</h2>
          <p>
            Une pierre naturelle ne remplace pas une parole, mais elle peut donner une forme concrète à une attention : soutien moral, nouveau départ, amour,
            gratitude ou confiance. Litho Intelligence formule ces suggestions selon les traditions de lithothérapie, sans promesse médicale.
          </p>
        </article>
      </section>

      <ProductGallery
        title="Sélection cadeau douce"
        lead="Des bracelets symboliques, faciles à offrir, pour un anniversaire, une déclaration douce ou un nouveau départ."
        slugs={giftSelectionOne}
      />

      <ProductGallery
        title="Sélection cadeau premium"
        lead="Une sélection plus sobre et élégante pour offrir une intention de protection, d’apaisement ou de clarté."
        slugs={giftSelectionTwo}
      />

      <section className="section compact-section">
        <EmailCapture source="gift" />
      </section>

      <FormationCTA />
    </main>
  );
}
