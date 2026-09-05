import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { nativeStones } from "@/lib/nativeStones";
import { routes } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pierres naturelles de A à Z | Litho Intelligence",
  description:
    "Catalogue des pierres naturelles : significations symboliques, usages traditionnels, entretien, authenticité et bracelets recommandés.",
  alternates: {
    canonical: `${siteUrl}/pierres`
  }
};

export default function PierresPage() {
  return (
    <main className="section compact-section">
      <p className="eyebrow">Catalogue</p>
      <h1>Pierres naturelles de A à Z</h1>
      <p className="section-lead">
        Explorez les fiches pierres avec une approche claire : caractéristiques observables, traditions symboliques,
        conseils d'entretien et sélection de bracelets quand un produit fiable est disponible.
      </p>
      <div className="hero-actions">
        <Link className="button" href={routes.recommendation}>
          Trouver ma pierre <ArrowRight size={16} />
        </Link>
      </div>
      <SearchBox source="stones-catalog" placeholder="Rechercher une intention : stress, amour, protection..." />

      <div className="catalog-grid">
        {nativeStones.map((stone) => (
          <article className="card catalog-card" key={stone.slug}>
            <img className="stone-thumb" src={`/images/stones/${stone.slug}.png`} alt={`${stone.name} en pierre naturelle`} />
            <h2>{stone.name}</h2>
            <p>{stone.short_description}</p>
            <div className="pill-row">
              {stone.intentions.slice(0, 3).map((intention) => (
                <span className="pill" key={intention}>
                  {intention}
                </span>
              ))}
            </div>
            <Link className="micro-action" href={routes.stone(stone.slug)}>
              Voir la fiche <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

