import { Sparkles } from "lucide-react";
import type { MeditationSuggestion } from "@/lib/getMeditationSuggestion";

export function StoneMeditationCard({ meditation }: { meditation: MeditationSuggestion }) {
  return (
    <article className="card meditation-card">
      <p className="eyebrow">Méditation avec cette pierre</p>
      <h2>{meditation.stoneName}</h2>
      <div className="pill-row">
        <span className="pill">Gratuit : {meditation.durationFree}</span>
        <span className="pill">Premium : {meditation.durationPremium}</span>
      </div>
      <p>
        <strong>Intention :</strong> {meditation.intention}
      </p>
      <p className="intention-line">{meditation.anchorPhrase}</p>
      <p>{meditation.miniScript}</p>
      <div className="sos-actions">
        <a className="button" href="/pricing">
          <Sparkles size={16} />
          Écouter la méditation complète
        </a>
        <a className="button secondary" href="/pricing">
          Créer ma méditation personnalisée
        </a>
      </div>
    </article>
  );
}
