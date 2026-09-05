import { BookRecommendationCard } from "@/components/BookRecommendationCard";
import type { RecommendedBook } from "@/lib/books";

type BookRecommendationSectionProps = {
  books: RecommendedBook[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  source: string;
};

export function BookRecommendationSection({
  books,
  eyebrow = "Bibliothèque Quintessence Cristal",
  title = "Livres recommandés pour approfondir",
  intro = "Des lectures complémentaires pour comprendre les pierres naturelles avec une approche symbolique, culturelle et responsable.",
  source
}: BookRecommendationSectionProps) {
  if (!books.length) return null;

  return (
    <section className="section compact-section no-side-padding book-recommendation-section">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="section-lead">{intro}</p>
        </div>
      </div>
      <div className="book-recommendation-grid">
        {books.map((book) => (
          <BookRecommendationCard book={book} key={book.id} source={source} />
        ))}
      </div>
      <p className="fineprint">
        Certains liens peuvent être affiliés ou commerciaux. Les livres présentent des traditions symboliques associées
        aux pierres naturelles et ne remplacent jamais un avis médical, psychologique ou professionnel.
      </p>
    </section>
  );
}
