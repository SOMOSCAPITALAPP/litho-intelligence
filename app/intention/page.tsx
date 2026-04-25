import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { intentionPages } from "@/data/intentions";
import { wellbeingDisclaimer } from "@/lib/legal";

export const metadata = {
  title: "Choisir une intention | Litho Intelligence",
  description:
    "Choisissez votre intention du moment et découvrez les pierres traditionnellement associées, avec fiches, bracelets et rituels simples."
};

export default function IntentionsPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Choisir une intention</p>
        <h1>Quelle énergie voulez-vous soutenir aujourd’hui ?</h1>
        <p className="section-lead">
          Partez de votre besoin réel : calme, protection, amour, confiance, sommeil, argent, intuition ou nouveau départ.
          Chaque intention ouvre une solution simple avec pierres recommandées, fiches et bracelets associés.
        </p>
        <form className="search-box" action="/recommendation">
          <Search size={20} />
          <input name="goal" placeholder="Décrivez votre intention : stress, amour, protection..." />
          <button type="submit">Obtenir mon conseil</button>
        </form>
      </section>

      <section className="section compact-section">
        <h2>Intentions disponibles</h2>
        <div className="grid intention-choice-grid">
          {intentionPages.map((page) => (
            <Link className="card emotional-card intention-choice-card" href={`/intention/${page.slug}`} key={page.slug}>
              <span className="mystic-kicker">{page.queryLabel}</span>
              <h3>{page.shortLabel}</h3>
              <p>{page.emotionalPromise}</p>
              <span className="micro-action">
                Voir les pierres recommandées <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="answer-band">
        <div>
          <strong>Positionnement responsable</strong>
          <span>{wellbeingDisclaimer}</span>
        </div>
      </section>
    </main>
  );
}
