import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, Download, FileText, GraduationCap } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { FormationQuiz } from "@/components/FormationQuiz";
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
            <a className="button gold-button" href="#programme">
              Commencer la formation <ArrowRight size={16} />
            </a>
            <a className="button secondary" href={formationModules[0].pdfUrl} target="_blank" rel="noreferrer">
              <Download size={16} />
              Télécharger le module 1
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
          <Link className="button secondary" href="/newsletter">
            Recevoir les ressources
          </Link>
        </div>

        <div className="formation-timeline">
          {formationModules.map((module) => (
            <article className="formation-module" id={`module-${module.step}`} key={module.id}>
              <header className="formation-module-header">
                <span className="score">{module.step}</span>
                <div>
                  <p className="mystic-kicker">
                    <BookOpen size={15} />
                    {module.duration} · {module.level}
                  </p>
                  <h2>{module.title}</h2>
                  <p>{module.goal}</p>
                </div>
              </header>

              <div className="formation-module-grid">
                <section className="formation-course">
                  <div className="formation-block-title">
                    <FileText size={18} />
                    <h3>Cours écrit</h3>
                  </div>
                  {module.course.map((section) => (
                    <div className="lesson-block" key={section.heading}>
                      <h4>{section.heading}</h4>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <aside className="formation-module-side">
                  <div className="resource-card">
                    <span className="mystic-kicker">
                      <Download size={15} />
                      PDF du module
                    </span>
                    <p>Support de cours à conserver, imprimer ou relire hors ligne.</p>
                    <a className="button gold-button" href={module.pdfUrl} target="_blank" rel="noreferrer">
                      Télécharger le PDF
                    </a>
                  </div>

                  <div className="resource-card">
                    <span className="mystic-kicker">
                      <ClipboardCheck size={15} />
                      Exercice
                    </span>
                    <p>{module.exercise}</p>
                  </div>
                </aside>
              </div>

              <FormationQuiz moduleId={module.id} questions={module.quiz} />
            </article>
          ))}
        </div>
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
