import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { editorialGuides } from "@/lib/editorialGuides";
import { journalArticles } from "@/lib/journalArticles";

export const metadata: Metadata = {
  title: "Journal Litho Intelligence | Pierres naturelles et lithothérapie",
  description:
    "Journal éditorial Litho Intelligence : guides, conseils, comparatifs et repères responsables sur les pierres naturelles."
};

export default function JournalPage() {
  return (
    <main className="section compact-section">
      <p className="eyebrow">Journal</p>
      <h1>Le journal des pierres naturelles</h1>
      <p className="section-lead">
        Articles, guides et repères pour construire une culture claire des pierres naturelles, entre observation,
        tradition symbolique et choix responsable.
      </p>

      <section className="section compact-section no-side-padding">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Articles de fond</p>
            <h2>Les analyses à lire en priorité</h2>
          </div>
        </div>
        <div className="grid">
          {journalArticles.map((article) => (
            <article className="card" key={article.slug}>
              <BookOpen size={22} />
              <p className="eyebrow">{article.category} | {article.readingTime}</p>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <Link className="micro-action" href={`/journal/${article.slug}`}>
                Lire l'article <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>

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
