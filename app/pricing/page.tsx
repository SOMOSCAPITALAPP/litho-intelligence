import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ConsultationCheckoutButton } from "@/components/ConsultationCheckoutButton";
import { premiumFeatures } from "@/lib/plans";

export const metadata = {
  title: "Tarifs | Litho Intelligence",
  description: "Comparez les accès gratuit, Premium et la consultation privée de Litho Intelligence."
};

export default function PricingPage() {
  return (
    <main className="section pricing-page">
      <p className="eyebrow">Espace membre</p>
      <h1>Choisissez votre niveau d'accompagnement</h1>
      <p className="section-lead">Commencez gratuitement, puis débloquez l’expérience illimitée ou une consultation privée quand vous en avez besoin.</p>

      <div className="pricing-grid">
        <article className="pricing-card">
          <span className="mystic-kicker">Gratuit</span>
          <h2>0 €</h2>
          <ul>
            <li>Soutien rapide</li>
            <li>3 recommandations par jour</li>
            <li>Fiches pierres essentielles</li>
            <li>Guide offert</li>
          </ul>
        </article>

        <article className="pricing-card premium-pricing-card">
          <span className="mystic-kicker">Premium</span>
          <h2>7,90 €/mois</h2>
          <ul>
            {premiumFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <CheckoutButton label="Commencer Premium" />
          <p>Annulable à tout moment.</p>
        </article>
      </div>

      <section className="section compact-section no-side-padding">
        <article className="pricing-card">
          <span className="mystic-kicker">Consultation privée</span>
          <h2>20 €</h2>
          <p>Posez votre question librement à un conseiller en lithothérapie assisté par IA, recevez une réponse claire et une sélection de bracelets associés.</p>
          <div className="card-actions">
            <ConsultationCheckoutButton />
            <Link className="button secondary" href="/consultation">
              Voir le détail
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
