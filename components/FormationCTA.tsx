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
          Une formation gratuite avec inscription, cours PDF et QCM en ligne, puis un parcours certifiant à 199 € pour
          aller plus loin.
        </p>
      </div>
      <div className="member-actions">
        <Link className="button gold-button" href="/formation">
          Commencer gratuitement
        </Link>
        <Link className="button ghost-dark" href="/formation#formation-certifiante">
          Formation certifiante 199 €
        </Link>
      </div>
    </section>
  );
}
