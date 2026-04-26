import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { GiftStoneFinder } from "@/components/GiftStoneFinder";
import { FormationCTA } from "@/components/FormationCTA";

export const metadata: Metadata = {
  title: "Idée cadeau pierre naturelle personnalisée | Litho Intelligence",
  description:
    "Trouvez une pierre naturelle à offrir selon une date de naissance, une relation, une occasion et une intention symbolique."
};

export default function GiftPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Idée cadeau personnalisée</p>
        <h1>Trouver une pierre à offrir</h1>
        <p className="section-lead">
          Transformez une date de naissance en cadeau émotionnel : pierre principale, alternative accessible,
          message prêt à copier et bijou recommandé.
        </p>
      </section>

      <GiftStoneFinder />

      <section className="section">
        <article className="card">
          <h2>Pourquoi offrir une pierre avec une intention ?</h2>
          <p>
            Une pierre naturelle ne remplace pas une parole, mais elle peut donner une forme concrète à une attention :
            soutien moral, nouveau départ, amour, gratitude ou confiance. Litho Intelligence formule ces suggestions
            selon les traditions de lithothérapie, sans promesse médicale.
          </p>
        </article>
      </section>

      <section className="section compact-section">
        <EmailCapture source="gift" />
      </section>

      <FormationCTA />
    </main>
  );
}
