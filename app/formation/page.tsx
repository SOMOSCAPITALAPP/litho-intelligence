import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { FormationAccess } from "@/components/FormationAccess";
import formationModules from "@/data/formation.modules.json";
import { wellbeingDisclaimer } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Formation lithothérapie gratuite | Litho Intelligence",
  description:
    "Formation gratuite en lithothérapie sans vidéo : cours écrits, PDF téléchargeables et QCM en ligne à chaque étape."
};

const standards = [
  "7 étapes progressives",
  "Cours écrits consultables en ligne",
  "PDF téléchargeable pour chaque module",
  "QCM immédiat avec correction",
  "Exercices pratiques sans matériel compliqué",
  "Cadre responsable non médical"
];

export default function FormationPage() {
  const totalQuizzes = formationModules.reduce((total, module) => total + module.quiz.length, 0);

  return (
    <main className="section formation-page">
      <section className="formation-hero">
        <div>
          <p className="eyebrow">Formation lithothérapie gratuite</p>
          <h1>Apprendre les pierres avec cours, PDF et QCM</h1>
          <p className="section-lead">
            Un parcours gratuit, sans vidéo, pour comprendre les bases de la lithothérapie symbolique, choisir les pierres
            avec discernement et créer des pratiques simples. Chaque étape contient un cours écrit, un PDF à garder et un
            QCM en ligne pour valider les acquis.
          </p>
          <div className="hero-actions">
            <a className="button gold-button" href="#inscription">
              S'inscrire gratuitement <ArrowRight size={16} />
            </a>
            <a className="button secondary" href="#formation-certifiante">
              Formation certifiante 199 €
            </a>
          </div>
        </div>
        <aside className="formation-summary-card">
          <GraduationCap size={26} />
          <h2>Parcours gratuit</h2>
          <div className="formation-stats">
            <div>
              <strong>{formationModules.length}</strong>
              <span>modules</span>
            </div>
            <div>
              <strong>{totalQuizzes}</strong>
              <span>questions</span>
            </div>
            <div>
              <strong>0</strong>
              <span>vidéo</span>
            </div>
          </div>
          <p>{wellbeingDisclaimer}</p>
        </aside>
      </section>

      <section className="formation-standard-grid" aria-label="Standards de la formation">
        {standards.map((standard) => (
          <div className="formation-standard" key={standard}>
            <CheckCircle2 size={18} />
            <span>{standard}</span>
          </div>
        ))}
      </section>

      <section className="section compact-section no-side-padding" id="programme">
        <div className="dashboard-section-header">
          <div>
            <p className="eyebrow">Programme</p>
            <h2>Votre parcours en 7 étapes</h2>
          </div>
          <Link className="button secondary" href="#formation-certifiante">
            Voir le parcours certifiant
          </Link>
        </div>

        <FormationAccess />
      </section>

      <section className="formation-completion-panel">
        <div>
          <p className="eyebrow">Fin de parcours</p>
          <h2>Validation simple, sans compte obligatoire</h2>
          <p>
            Cette formation gratuite est pensée comme une base sérieuse : vous lisez le cours, gardez le PDF, réalisez
            l'exercice et validez le QCM. Pour aller plus loin, l'espace membre conserve vos favoris, recommandations et
            ressources.
          </p>
        </div>
        <div className="member-actions">
          <Link className="button gold-button" href="/register">
            Créer mon espace gratuit
          </Link>
          <Link className="button ghost-dark" href="/pricing">
            Voir Premium
          </Link>
        </div>
      </section>

      <section className="section compact-section no-side-padding">
        <EmailCapture source="formation" />
      </section>
    </main>
  );
}
