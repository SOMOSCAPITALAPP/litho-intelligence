import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getGuidesByCategory } from "@/lib/editorialGuides";

export const metadata: Metadata = {
  title: "Authenticité et entretien des pierres naturelles | Litho Intelligence",
  description:
    "Guides pratiques pour reconnaître une vraie pierre naturelle, comprendre les imitations courantes et entretenir ses bracelets avec prudence."
};

export default function EntretienPage() {
  const guides = getGuidesByCategory("entretien");

  return (
    <main className="section compact-section">
      <p className="eyebrow">Authenticité et entretien</p>
      <h1>Reconnaître, choisir et entretenir ses pierres naturelles</h1>
      <p className="section-lead">
        Cette rubrique rassemble les conseils pratiques qui renforcent la crédibilité du choix : observation, imitations,
        traitements, eau, sel, soleil et gestes doux d'entretien.
      </p>
      <div className="answer-band">
        <div>
          <strong>À retenir</strong>
          <span>Une pierre bien choisie est une pierre comprise : son aspect, ses limites matérielles et son usage symbolique.</span>
        </div>
      </div>
      <div className="grid">
        {guides.map((guide) => (
          <article className="card" key={guide.slug}>
            <ShieldCheck size={22} />
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <Link className="micro-action" href={`/guides/${guide.slug}`}>
              Lire le guide <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
