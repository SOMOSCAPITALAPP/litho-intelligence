import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { FormationAccess } from "@/components/FormationAccess";
import { ShareActions } from "@/components/ShareActions";
import formationModules from "@/data/formation.modules.json";
import { wellbeingDisclaimer } from "@/lib/legal";
import { defaultShareAlt, shareImage, shareImageType } from "@/lib/site";

export const metadata: Metadata = {
  title: "Formation lithothérapie gratuite",
  description:
    "Formation gratuite en lithothérapie au format écrit : cours structurés, PDF téléchargeables et QCM en ligne à chaque étape.",
  openGraph: {
    title: "Formation gratuite Litho Intelligence : 7 modules, PDF et QCM",
    description: "Apprenez les bases de la lithothérapie symbolique avec 7 modules gratuits, des PDF et 70 questions de QCM.",
    url: "/formation",
    images: [{ url: shareImage, secureUrl: shareImage, type: shareImageType, width: 1200, height: 630, alt: defaultShareAlt }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation gratuite Litho Intelligence : 7 modules, PDF et QCM",
    description: "Cours écrits, PDF téléchargeables et QCM en ligne pour découvrir les pierres avec discernement.",
    images: [shareImage]
  }
};

const standards = [
  "7 modules progressifs",
  "70 questions de QCM au total",
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
            Un parcours gratuit au format écrit pour comprendre les bases de la lithothérapie symbolique, choisir les pierres
            avec discernement et créer des pratiques simples. Chaque module contient un cours écrit, un PDF à garder et un
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
          <ShareActions
            compact
            title="Formation gratuite Litho Intelligence"
            text="Je découvre une formation gratuite de lithothérapie symbolique avec cours, PDF et QCM."
            url="/formation"
          />
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
            <h2>Votre parcours en 7 modules</h2>
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
