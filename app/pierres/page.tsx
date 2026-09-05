import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Search, Sparkles } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { getNativeStoneImage, nativeStones } from "@/lib/nativeStones";
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

const sortedStones = [...nativeStones].sort((a, b) => a.name.localeCompare(b.name, "fr"));
const groupedStones = sortedStones.reduce<Array<{ letter: string; stones: typeof nativeStones }>>((groups, stone) => {
  const letter = stone.name
    .replace(/^Œ/i, "O")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toUpperCase();
  const current = groups[groups.length - 1];

  if (current?.letter === letter) {
    current.stones.push(stone);
  } else {
    groups.push({ letter, stones: [stone] });
  }

  return groups;
}, []);

const featuredIntentions = ["protection", "calme", "amour", "énergie", "confiance", "sommeil"];

export default function PierresPage() {
  return (
    <main className="section compact-section stones-catalog-page">
      <section className="stones-catalog-hero">
        <div className="stones-catalog-copy">
          <p className="eyebrow">Catalogue</p>
          <h1>Pierres naturelles de A à Z</h1>
          <p className="section-lead">
            Explorez les fiches pierres avec une approche claire : caractéristiques observables, traditions symboliques,
            conseils d'entretien et sélection de bracelets quand un produit fiable est disponible.
          </p>
          <div className="hero-actions catalog-hero-actions">
            <Link className="button" href={routes.recommendation}>
              Trouver ma pierre <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href={routes.intentions}>
              Explorer par intention
            </Link>
          </div>
        </div>

        <aside className="stones-catalog-panel" aria-label="Résumé du catalogue">
          <div className="catalog-stat-card">
            <Gem size={22} />
            <strong>{sortedStones.length}</strong>
            <span>fiches pierres</span>
          </div>
          <div className="catalog-stat-card">
            <Sparkles size={22} />
            <strong>{groupedStones.length}</strong>
            <span>lettres indexées</span>
          </div>
          <p>
            Une base pensée pour comparer vite, lire clairement et passer d'une pierre à une intention sans perdre le fil.
          </p>
        </aside>
      </section>

      <section className="catalog-search-band" aria-label="Recherche et intentions populaires">
        <div>
          <p className="eyebrow">Recherche guidée</p>
          <h2>Vous cherchez une pierre pour une intention précise ?</h2>
        </div>
        <SearchBox source="stones-catalog" placeholder="Stress, amour, protection, confiance..." />
        <div className="catalog-intention-row" aria-label="Intentions populaires">
          {featuredIntentions.map((intention) => (
            <Link className="pill pill-link" href={routes.intention(intention === "énergie" ? "energie" : intention)} key={intention}>
              {intention}
            </Link>
          ))}
        </div>
      </section>

      <nav className="alphabet-index" aria-label="Index alphabétique des pierres">
        {groupedStones.map((group) => (
          <a href={`#letter-${group.letter}`} key={group.letter}>
            {group.letter}
          </a>
        ))}
      </nav>

      <div className="stones-letter-list">
        {groupedStones.map((group) => (
          <section className="stones-letter-section" id={`letter-${group.letter}`} key={group.letter}>
            <div className="letter-heading">
              <span>{group.letter}</span>
              <p>{group.stones.length} pierre{group.stones.length > 1 ? "s" : ""}</p>
            </div>

            <div className="catalog-grid">
              {group.stones.map((stone) => {
                const image = getNativeStoneImage(stone);

                return (
                  <article className="catalog-card" key={stone.slug}>
                    <Link className="catalog-card-image" href={routes.stone(stone.slug)} aria-label={`Voir la fiche ${stone.name}`}>
                      <Image alt={image.alt} fill sizes="(max-width: 640px) 38vw, (max-width: 1100px) 18vw, 160px" src={image.url} />
                    </Link>
                    <div className="catalog-card-body">
                      <div>
                        <h2>{stone.name}</h2>
                        <p>{stone.short_description}</p>
                      </div>
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
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="catalog-bottom-cta">
        <Search size={22} />
        <div>
          <h2>Besoin d'un choix plus personnel ?</h2>
          <p>
            Le test gratuit part de votre intention du moment pour proposer une pierre, un rituel simple et une fiche à lire.
          </p>
        </div>
        <Link className="button" href={routes.recommendation}>
          Faire le test gratuit <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
