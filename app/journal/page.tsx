import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { BookRecommendationSection } from "@/components/BookRecommendationSection";
import { getBooksByPlacement } from "@/lib/books";
import { editorialGuides } from "@/lib/editorialGuides";
import { journalArticles } from "@/lib/journalArticles";

export const metadata: Metadata = {
  title: "Guides lithothérapie | Pierres naturelles, conseils et dossiers",
  description:
    "Guides lithothérapie Litho Intelligence : conseils, comparatifs et dossiers responsables pour choisir les pierres naturelles selon votre intention.",
  alternates: {
    canonical: "/conseils-lithotherapie"
  }
};

export default function JournalPage() {
  const [featuredArticle, ...otherArticles] = journalArticles;
  const priorityArticles = otherArticles.slice(0, 6);
  const archiveArticles = otherArticles.slice(6);
  const journalBooks = getBooksByPlacement("journal", 3);

  return (
    <main className="section compact-section">
      <p className="eyebrow">Guides lithothérapie</p>
      <h1>Conseils et dossiers sur les pierres naturelles</h1>
      <p className="section-lead">
        Articles, guides et repères pour construire une culture claire des pierres naturelles, entre observation,
        tradition symbolique et choix responsable.
      </p>

      {featuredArticle ? (
        <section className="section compact-section no-side-padding">
          <article className="card">
            <p className="eyebrow">À la une | {featuredArticle.category} | {featuredArticle.readingTime}</p>
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.description}</p>
            <Link className="primary-button" href={`/conseils-lithotherapie/${featuredArticle.slug}`}>
              Lire le dossier <ArrowRight size={17} />
            </Link>
          </article>
        </section>
      ) : null}

      <section className="section compact-section no-side-padding">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Articles de fond</p>
            <h2>Les dossiers à lire en priorité</h2>
          </div>
        </div>
        <div className="grid">
          {priorityArticles.map((article) => (
            <article className="card" key={article.slug}>
              <BookOpen size={22} />
              <p className="eyebrow">{article.category} | {article.readingTime}</p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <Link className="micro-action" href={`/conseils-lithotherapie/${article.slug}`}>
                Lire l'article <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {archiveArticles.length > 0 ? (
        <section className="section compact-section no-side-padding">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Bibliothèque</p>
              <h2>Tous les autres articles</h2>
            </div>
          </div>
          <div className="grid">
            {archiveArticles.map((article) => (
              <article className="card" key={article.slug}>
                <BookOpen size={22} />
                <p className="eyebrow">{article.category} | {article.readingTime}</p>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <Link className="micro-action" href={`/conseils-lithotherapie/${article.slug}`}>
                  Lire l'article <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <BookRecommendationSection
        books={journalBooks}
        source="conseils-lithotherapie"
        title="La bibliothèque à garder sous la main"
        intro="Trois lectures papier pour prolonger les guides : protection, amour de soi et fondamentaux des pierres naturelles."
      />

      <section className="section compact-section no-side-padding">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Guides pratiques</p>
            <h2>Les repères essentiels</h2>
          </div>
        </div>
        <div className="grid">
          {editorialGuides.map((guide) => (
            <article className="card" key={guide.slug}>
              <BookOpen size={22} />
              <p className="eyebrow">{guide.category}</p>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <Link className="micro-action" href={`/guides/${guide.slug}`}>
                Lire l'article <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
