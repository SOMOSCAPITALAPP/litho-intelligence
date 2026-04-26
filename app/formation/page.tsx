import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Formation lithothérapie pratique | Litho Intelligence",
  description:
    "Commencez une mini formation gratuite pour comprendre les pierres, choisir une intention, méditer et offrir une pierre avec sens."
};

const modules = [
  "Comprendre les pierres",
  "Choisir une pierre selon une intention",
  "Pierre de naissance et symbolique personnelle",
  "Pierres et émotions",
  "Méditer avec une pierre",
  "Créer un rituel simple",
  "Offrir une pierre avec sens"
];

export default function FormationPage() {
  return (
    <main className="section">
      <p className="eyebrow">Formation lithothérapie</p>
      <h1>Comprendre et utiliser les pierres au quotidien</h1>
      <p className="section-lead">
        Une mini formation gratuite de 7 jours pour découvrir les pierres avec clarté, puis une formation premium
        orientée pratique, rituels simples, méditation et choix de bijoux.
      </p>

      <div className="grid">
        {modules.map((module, index) => (
          <article className="card" key={module}>
            <span className="score">{index + 1}</span>
            <h2>{module}</h2>
            <p>Un module court, concret et compatible avec une pratique de bien-être non médicale.</p>
          </article>
        ))}
      </div>

      <div className="form-panel">
        <h2>Commencer maintenant</h2>
        <p>
          La mini formation gratuite servira de passerelle vers les méditations premium, les recommandations avancées
          et les offres Felicidade / Vera Mentis.
        </p>
        <div className="sos-actions">
          <Link className="button gold-button" href="/newsletter">
            Commencer gratuitement
          </Link>
          <Link className="button secondary" href="/pricing">
            Découvrir la formation complète
          </Link>
        </div>
      </div>

      <section className="section compact-section no-side-padding">
        <EmailCapture source="formation" />
      </section>
    </main>
  );
}
