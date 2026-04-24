import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import { nativeStones } from "@/lib/nativeStones";
import { getStone } from "@/lib/stones";

export const metadata = {
  title: "Pierres | Litho Intelligence",
  description: "Catalogue natif Litho Intelligence : pierres, usages symboliques, compatibilités et conseils."
};

export default function StonesPage() {
  return (
    <main className="section">
      <h1>Catalogue des pierres</h1>
      <p className="section-lead">
        Accédez rapidement aux fiches, usages symboliques, compatibilités, purifications
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
        {nativeStones.map((stone) => {
          const productStone = getStone(stone.amazon_product_slug || stone.slug);

          return (
            <Link className="card catalog-card" href={`/stones/${stone.slug}`} key={stone.slug}>
              {productStone ? <img className="stone-thumb" src={productStone.image.url} alt={productStone.image.alt} /> : null}
              <h2>{stone.name}</h2>
              <p>{stone.short_description}</p>
              <div className="pill-row">
                {stone.intentions.slice(0, 3).map((property) => (
                  <span className="pill" key={property}>
                    {property}
                  </span>
                ))}
              </div>
              <span className="micro-action">
                Ouvrir la fiche <ArrowRight size={15} />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
