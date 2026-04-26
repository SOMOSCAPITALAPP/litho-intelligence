import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { withAffiliate } from "@/lib/affiliate";
import { findStonesByVirtue, getAllVirtues, getVirtueLabel } from "@/lib/virtues";
import { wellbeingDisclaimer } from "@/lib/legal";

export function generateStaticParams() {
  return getAllVirtues().map((virtue) => ({ slug: virtue.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const virtue = getVirtueLabel(params.slug);

  return {
    title: `Pierres pour ${virtue} | Litho Intelligence`,
    description: `Découvrez les pierres traditionnellement associées à ${virtue}, avec leurs usages symboliques et un accès discret au bracelet associé.`
  };
}

export default function VirtuePage({ params }: { params: { slug: string } }) {
  const virtue = getVirtueLabel(params.slug);
  const matches = findStonesByVirtue(params.slug);

  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Par vertu</p>
        <h1>Pierres associées à {virtue}</h1>
        <p className="section-lead">
          Cette sélection rassemble les pierres traditionnellement reliées à {virtue}, avec une lecture simple, un accès aux fiches détaillées et, quand il
          existe, un lien discret vers le bracelet associé.
        </p>
        <div className="hero-actions">
          <Link className="button gold-button" href={`/recommendation?goal=${encodeURIComponent(virtue)}`}>
            Recevoir un conseil personnalisé <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" href="/stones">
            Retour au catalogue
          </Link>
        </div>
      </section>

      <section className="answer-band">
        <div>
          <strong>Intention mise en avant : {virtue}</strong>
          <span>Comparez plusieurs pierres, lisez leurs nuances et choisissez celle dont la symbolique vous parle le plus aujourd’hui.</span>
        </div>
      </section>

      <section className="section compact-section">
        <div className="grid">
          {matches.map((stone) => (
            <article className="card catalog-card" key={`${params.slug}-${stone.slug}`}>
              {stone.image ? <img className="stone-thumb wide" src={stone.image.url} alt={stone.image.alt} /> : null}
              <h2>{stone.label}</h2>
              <p>{stone.description}</p>
              <div className="card-actions">
                <Link className="button secondary" href={stone.pageHref}>
                  Voir la fiche
                </Link>
                {stone.amazonUrl ? (
                  <a className="button gold-button" href={withAffiliate(stone.amazonUrl)} target="_blank" rel="noreferrer">
                    <ShoppingBag size={16} />
                    Voir le bracelet associé
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <article className="card">
          <h2>À retenir</h2>
          <p>{wellbeingDisclaimer}</p>
        </article>
      </section>

      <section className="section compact-section">
        <EmailCapture source={`virtue:${params.slug}`} />
      </section>
    </main>
  );
}
