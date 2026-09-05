"use client";

import { BookOpen, ExternalLink } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import type { RecommendedBook } from "@/lib/books";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";

type BookRecommendationCardProps = {
  book: RecommendedBook;
  source: string;
};

export function BookRecommendationCard({ book, source }: BookRecommendationCardProps) {
  return (
    <article className="book-recommendation-card">
      <div className="book-recommendation-cover">
        <img src={book.imageUrl} alt={`Couverture du livre ${book.title}`} loading="lazy" />
        <span className="product-recommendation-badge">{book.badge}</span>
      </div>
      <div className="book-recommendation-content">
        <p className="mystic-kicker">
          <BookOpen size={15} />
          {book.intention}
        </p>
        <h3>{book.title}</h3>
        <p className="book-subtitle">{book.subtitle}</p>
        <p>{book.description}</p>
        <ul>
          {book.bestFor.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <TrackedOutboundLink
          className="button gold-button"
          eventName="amazon_book_click"
          href={withAffiliate(book.amazonUrl)}
          payload={{ asin: book.asin, book: book.id, source, intention: book.intention }}
          rel="noopener noreferrer sponsored"
          target="_blank"
        >
          Voir le livre sur Amazon <ExternalLink size={16} />
        </TrackedOutboundLink>
        <p className="fineprint">Disponible sur Amazon selon stock, prix et conditions du vendeur.</p>
      </div>
    </article>
  );
}
