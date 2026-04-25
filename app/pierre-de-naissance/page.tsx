import type { Metadata } from "next";
import Link from "next/link";
import { BirthstoneFinder } from "@/components/BirthstoneFinder";
import { FormationCTA } from "@/components/FormationCTA";

export const metadata: Metadata = {
  title: "Pierre de naissance : découvrez votre pierre selon votre date de naissance",
  description:
    "Découvrez votre pierre de naissance, sa signification symbolique, ses émotions associées et des idées de bijoux personnalisés à offrir."
};

export default function BirthstonePage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Pierre de naissance</p>
        <h1>Découvrez votre pierre selon votre date de naissance</h1>
        <p className="section-lead">
          Une lecture symbolique, personnelle et cadeau-oriented pour relier un mois de naissance à une pierre,
          une intention, un bijou recommandé et une méditation courte.
        </p>
      </section>

      <BirthstoneFinder />

      <section className="section">
        <div className="grid">
          <article className="card">
            <h2>Un usage personnel</h2>
            <p>
              La pierre de naissance peut devenir un repère émotionnel : elle symbolise une qualité à nourrir,
              une intention à poser et une manière simple de revenir à soi.
            </p>
          </article>
          <article className="card">
            <h2>Une idée cadeau</h2>
            <p>
              Pour un anniversaire, une fête ou un nouveau départ, la pierre liée au mois de naissance donne un
              sens immédiat au bijou offert.
            </p>
            <Link className="micro-action" href="/idee-cadeau">
              Trouver une pierre à offrir
            </Link>
          </article>
          <article className="card">
            <h2>Une lecture prudente</h2>
            <p>
              Les informations reposent sur les traditions, croyances et usages symboliques associés aux pierres
              naturelles. Elles ne remplacent pas un avis médical, psychologique ou professionnel.
            </p>
          </article>
        </div>
      </section>

      <FormationCTA />
    </main>
  );
}
