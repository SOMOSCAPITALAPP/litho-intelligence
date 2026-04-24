import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import { stones } from "@/lib/stones";

export const metadata = {
  title: "Pierres | Litho Intelligence",
  description: "Catalogue des pierres, usages symboliques, compatibilites et conseils."
};

export default function StonesPage() {
  return (
    <main className="section">
      <h1>Catalogue des pierres</h1>
      <p className="section-lead">
        Accedez rapidement aux fiches, usages symboliques, compatibilites, purifications
        et conseils de port.
      </p>

      <div className="catalog-toolbar">
        <Link className="button" href="/recommendation">
          <Gem size={17} />
          Me recommander une pierre
        </Link>
        <Link className="button secondary" href="/combination">
          Tester mes combinaisons
        </Link>
      </div>

      <div className="grid">
        {stones.map((stone) => (
          <Link className="card catalog-card" href={`/stone/${stone.slug}`} key={stone.slug}>
            <div className="catalog-stone-mark" aria-hidden="true" />
            <h2>{stone.name}</h2>
            <p>{stone.description}</p>
            <div className="pill-row">
              {stone.properties.slice(0, 3).map((property) => (
                <span className="pill" key={property}>
                  {property}
                </span>
              ))}
            </div>
            <span className="micro-action">
              Ouvrir la fiche <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
