import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function FormationCTA() {
  return (
    <section className="member-band" id="formation">
      <div>
        <p className="mystic-kicker">
          <GraduationCap size={15} />
          Formation lithothérapie
        </p>
        <h2>Comprendre et utiliser les pierres au quotidien</h2>
        <p>
          Une passerelle simple vers une mini formation gratuite de 7 jours, puis une formation premium pour choisir,
          associer, méditer et offrir les pierres avec sens.
        </p>
      </div>
      <div className="member-actions">
        <Link className="button gold-button" href="/formation">
          Commencer gratuitement
        </Link>
        <Link className="button ghost-dark" href="/pricing">
          Découvrir la formation complète
        </Link>
      </div>
    </section>
  );
}
