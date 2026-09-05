import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { BookRecommendationSection } from "@/components/BookRecommendationSection";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { ShareActions } from "@/components/ShareActions";
import { wellbeingDisclaimer } from "@/lib/legal";
import { getBooksByPlacement, getBooksForStone } from "@/lib/books";
import { getJournalArticle, journalArticles } from "@/lib/journalArticles";
import { getProductByStone } from "@/lib/products";
import { routes } from "@/lib/routes";
import { defaultShareAlt, shareImage, shareImageType, siteUrl } from "@/lib/site";

const baseUrl = siteUrl.replace(/\/$/, "");

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getJournalArticle(params.slug);
  if (!article) return { title: "Journal | Litho Intelligence" };

  const url = `${baseUrl}/journal/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: defaultShareAlt,
          type: shareImageType
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.description,
      images: [shareImage]
    }
  };
}

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const article = getJournalArticle(params.slug);
  if (!article) notFound();

  const product = article.productStoneSlug ? getProductByStone(article.productStoneSlug) : undefined;
  const books = article.productStoneSlug ? getBooksForStone(article.productStoneSlug, 2) : getBooksByPlacement("journal", 2);
  const articleUrl = `${baseUrl}/journal/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: shareImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: articleUrl,
    inLanguage: "fr-FR",
    author: {
      "@type": "Organization",
      name: "Quintessence Cristal"
    },
    publisher: {
      "@type": "Organization",
      name: "Quintessence Cristal",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/brand/litho-intelligence-icon.png`
      }
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <main className="section compact-section editorial-page journal-article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: routes.home },
          { name: "Journal", href: "/journal" },
          { name: article.title, href: `/journal/${article.slug}` }
        ]}
      />

      <article className="journal-article-shell">
        <header className="journal-article-hero">
          <div className="journal-article-hero-copy">
            <p className="eyebrow">Journal | {article.category}</p>
            <h1>{article.title}</h1>
            <p className="section-lead">{article.description}</p>
            <p className="fineprint">
              Publié le {new Date(article.publishedAt).toLocaleDateString("fr-FR")} par Quintessence Cristal | Lecture {article.readingTime}
            </p>
            <ShareActions
              compact
              title={article.title}
              text="Un guide clair pour choisir une pierre naturelle selon son intention, avec une approche responsable et symbolique."
              url={`/journal/${article.slug}`}
            />
          </div>
          <div className="journal-article-hero-image">
            <Image alt={article.heroImageAlt} fill priority sizes="(max-width: 980px) 100vw, 42vw" src={article.heroImage} />
          </div>
        </header>

        <aside className="article-summary-card">
          <h2>En bref</h2>
          <ul>
            {article.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <div className="article-prose">
          {article.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {product ? (
          <section className="article-product-highlight">
            <div>
              <p className="eyebrow">Sélection éditoriale</p>
              <h2>Le bracelet associé à cette lecture</h2>
              <p>
                Une recommandation discrète pour prolonger l'intention de protection symbolique évoquée dans l'article.
              </p>
            </div>
            <ProductRecommendationCard
              amazonUrl={product.amazonUrl}
              badge={product.badge}
              emotionalBenefit={product.description}
              imageUrl={product.imageUrl}
              intention={product.intentions[0] ?? "protection"}
              price={product.price}
              stoneName={product.stone}
              title={product.title}
            />
          </section>
        ) : null}

        <BookRecommendationSection
          books={books}
          eyebrow="Pour approfondir"
          source={`journal:${article.slug}`}
          title="Lectures recommandées après cet article"
          intro="Ces livres prolongent la lecture avec une approche culturelle et symbolique, utile avant de choisir une pierre ou un bracelet."
        />

        <section className="article-prose article-faq">
          <h2>Questions fréquentes</h2>
          {article.faq.map((item) => (
            <article className="card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </section>

        <LeadCaptureCard
          buttonLabel="Recevoir le guide"
          source={`journal:${article.slug}`}
          subtitle="Les 10 pierres essentielles pour choisir selon votre intention, avec une approche claire et responsable."
          title="Recevez gratuitement le guide des 10 pierres essentielles"
        />

        <article className="compliance-panel">
          <div>
            <h2>Cadre responsable</h2>
            <p>{wellbeingDisclaimer}</p>
          </div>
        </article>

        <section className="article-prose article-sources">
          <h2>Sources et repères</h2>
          <ul className="source-list">
            {article.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noopener noreferrer" target="_blank">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="section compact-section no-side-padding">
          <h2>Continuer</h2>
          <div className="pill-row">
            {article.relatedLinks.map((link) => (
              <Link className="pill pill-link" href={link.href} key={link.href}>
                {link.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
