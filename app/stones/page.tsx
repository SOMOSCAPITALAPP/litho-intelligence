import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { getNativeStoneImage, nativeStones } from "@/lib/nativeStones";
import { slugifyVirtue } from "@/lib/virtues";

export const metadata = {
  title: "Pierres | Litho Intelligence",
  description: "Catalogue natif Litho Intelligence : pierres, usages symboliques, compatibilités et conseils."
};

export default function StonesPage() {
  return (
    <main className="section">
      <h1>Catalogue des pierres</h1>
      <p className="section-lead">Accédez rapidement aux fiches, usages symboliques, compatibilités, purifications et conseils de port.</p>

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
          const image = getNativeStoneImage(stone);

          return (
            <article className="card catalog-card" key={stone.slug}>
              <img className="stone-thumb" src={image.url} alt={image.alt} />
              <h2>{stone.name}</h2>
              <p>{stone.short_description}</p>
              <div className="pill-row">
                {stone.intentions.slice(0, 3).map((property) => (
                  <Link className="pill pill-link" href={`/vertus/${slugifyVirtue(property)}`} key={property}>
                    {property}
                  </Link>
                ))}
              </div>
              <Link className="micro-action" href={`/stones/${stone.slug}`}>
                Ouvrir la fiche <ArrowRight size={15} />
              </Link>
            </article>
          );
        })}
      </div>

      <section className="section compact-section no-side-padding">
        <EmailCapture source="stones-catalog" />
      </section>
    </main>
  );
}
