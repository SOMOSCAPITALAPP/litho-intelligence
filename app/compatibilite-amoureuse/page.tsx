import type { Metadata } from "next";
import { FormationCTA } from "@/components/FormationCTA";
import { LoveCompatibility } from "@/components/LoveCompatibility";

export const metadata: Metadata = {
  title: "Compatibilité amoureuse par les pierres naturelles",
  description:
    "Découvrez la compatibilité symbolique de deux personnes à travers leurs pierres de naissance et trouvez la pierre idéale pour harmoniser votre relation."
};

export default function LoveCompatibilityPage() {
  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Compatibilité amoureuse</p>
        <h1>Compatibilité amoureuse par les pierres</h1>
        <p className="section-lead">
          Comparez deux dates de naissance, découvrez les pierres associées et recevez une lecture symbolique du duo :
          forces, tensions possibles, pierre d’harmonisation, rituel à deux et idée cadeau romantique.
        </p>
      </section>

      <LoveCompatibility />

      <section className="section">
        <div className="grid">
          <article className="card">
            <h2>Une lecture émotionnelle</h2>
            <p>
              L’objectif n’est pas de prédire une relation, mais d’offrir un miroir symbolique : ce qui rapproche,
              ce qui demande de l’attention, et quelle pierre peut porter une intention commune.
            </p>
          </article>
          <article className="card">
            <h2>Une idée cadeau romantique</h2>
            <p>
              Quartz rose, rhodonite, pierre de lune ou grenat peuvent devenir des cadeaux porteurs de sens selon
              l’énergie du couple et le contexte relationnel.
            </p>
          </article>
          <article className="card">
            <h2>Une pratique prudente</h2>
            <p>
              Les informations proposées reposent sur les traditions, croyances et usages symboliques associés aux
              pierres naturelles. Elles ne remplacent pas un avis médical, psychologique ou professionnel.
            </p>
          </article>
        </div>
      </section>

      <FormationCTA />
    </main>
  );
}
