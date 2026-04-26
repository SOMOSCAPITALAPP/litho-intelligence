import Link from "next/link";
import { Crown, Sparkles } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";
import { premiumFeatures } from "@/lib/plans";

export const metadata = { title: "Connexion | Litho Intelligence" };

export default function LoginPage() {
  return (
    <main className="auth-page auth-page-wide">
      <AuthForm mode="login" />

      <aside className="auth-side-card">
        <span className="mystic-kicker">
          <Crown size={15} />
          Premium
        </span>
        <h2>Débloquez l'expérience complète</h2>
        <p>
          Recommandations illimitées, analyse avancée, historique complet, rituels personnalisés et offres membres
          Felicidade / Vera Mentis.
        </p>
        <ul className="auth-feature-list">
          {premiumFeatures.slice(0, 5).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="hero-actions">
          <Link className="button gold-button" href="/register">
            Créer un compte puis passer Premium
          </Link>
          <Link className="button secondary" href="/pricing">
            Voir le détail
          </Link>
        </div>
      </aside>

      <p className="auth-footnote">
        Pas encore membre ? <Link href="/register">Créer un compte gratuit</Link>
      </p>
      <p className="auth-footnote">
        <Link href="/sos">
          <Sparkles size={15} />
          Accéder au soutien rapide
        </Link>
      </p>
    </main>
  );
}
