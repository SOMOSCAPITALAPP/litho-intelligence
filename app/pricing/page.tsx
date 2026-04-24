import { CheckoutButton } from "@/components/CheckoutButton";
import { premiumFeatures } from "@/lib/plans";

export const metadata = {
  title: "Tarifs | Litho Intelligence",
  description: "Comparez les plans gratuit et Premium de Litho Intelligence."
};

export default function PricingPage() {
  return (
    <main className="section pricing-page">
      <p className="eyebrow">Espace membre</p>
      <h1>Choisissez votre niveau d'accompagnement</h1>
      <p className="section-lead">Commencez gratuitement, puis débloquez l'expérience illimitée quand vous voulez.</p>

      <div className="pricing-grid">
        <article className="pricing-card">
          <span className="mystic-kicker">Gratuit</span>
          <h2>0 €</h2>
          <ul>
            <li>Test SOS</li>
            <li>3 recommandations / jour</li>
            <li>Fiches pierres essentielles</li>
            <li>Newsletter gratuite</li>
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
    </main>
  );
}
