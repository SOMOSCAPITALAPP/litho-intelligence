import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BookRecommendationSection } from "@/components/BookRecommendationSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { ShareActions } from "@/components/ShareActions";
import { getBooksByPlacement, getBooksForStone } from "@/lib/books";
import { editorialGuides, getEditorialGuide } from "@/lib/editorialGuides";
import { wellbeingDisclaimer } from "@/lib/legal";
import { getProductByStone } from "@/lib/products";
import { routes } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return editorialGuides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getEditorialGuide(params.slug);
  if (!guide) return { title: "Guide | Litho Intelligence" };

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `${siteUrl.replace(/\/$/, "")}/guides/${guide.slug}`
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description
    }
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getEditorialGuide(params.slug);
  if (!guide) notFound();
  const product = guide.productStoneSlug ? getProductByStone(guide.productStoneSlug) : undefined;
  const books = guide.productStoneSlug
    ? getBooksForStone(guide.productStoneSlug, 2)
    : getBooksByPlacement(guide.bookTag ?? "formation", 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: "Quintessence Cristal"
    },
    publisher: {
      "@type": "Organization",
      name: "Quintessence Cristal"
    }
  };

  const faqJsonLd = guide.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    : null;

  return (
    <main className="section compact-section editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: routes.home },
          { name: "Guides", href: routes.guides },
          { name: guide.title, href: routes.guide(guide.slug) }
        ]}
      />
      <p className="eyebrow">Guide Litho Intelligence</p>
      <h1>{guide.title}</h1>
      <p className="section-lead">{guide.description}</p>
      <p className="fineprint">Mis à jour le {new Date(guide.updatedAt).toLocaleDateString("fr-FR")} par Quintessence Cristal.</p>
      <ShareActions
        compact
        title={guide.title}
        text="Je découvre un guide Litho Intelligence pour choisir une pierre naturelle avec une approche symbolique et responsable."
        url={routes.guide(guide.slug)}
      />

      {product ? (
        <section className="article-product-highlight">
          <div>
            <p className="eyebrow">Sélection liée au guide</p>
            <h2>Le bracelet à regarder en priorité</h2>
            <p>
              Une recommandation commerciale cohérente avec le thème du guide, à comparer sur Amazon selon le stock,
              le prix et les conditions du vendeur.
            </p>
          </div>
          <ProductRecommendationCard
            amazonUrl={product.amazonUrl}
            badge={product.badge}
            emotionalBenefit={product.description}
            imageUrl={product.imageUrl}
            intention={product.intentions[0] ?? "intention"}
            price={product.price}
            stoneName={product.stone}
            title={product.title}
          />
        </section>
      ) : null}

      <div className="grid">
        {guide.sections.map((section) => (
          <article className="card" key={section.title}>
            <h2>{section.title}</h2>
            {section.body ? <p>{section.body}</p> : null}
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
          </article>
        ))}
      </div>

      <BookRecommendationSection
        books={books}
        eyebrow="Lecture complémentaire"
        source={`guide:${guide.slug}`}
        title="Pour approfondir ce guide"
        intro="Ces livres complètent la lecture avec une approche papier, utile pour garder des repères et construire une pratique personnelle."
      />

      {guide.faq?.length ? (
        <section className="section compact-section no-side-padding">
          <h2>Questions fréquentes</h2>
          <div className="grid">
            {guide.faq.map((item) => (
              <article className="card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <LeadCaptureCard source={`guide:${guide.slug}`} recommendedStone={product?.stone} />

      <article className="compliance-panel">
        <div>
          <h2>Cadre responsable</h2>
          <p>{wellbeingDisclaimer}</p>
        </div>
      </article>

      <section className="section compact-section no-side-padding">
        <h2>Continuer votre lecture</h2>
        <div className="pill-row">
          {guide.relatedLinks.map((link) => (
            <Link className="pill pill-link" href={link.href} key={link.href}>
              {link.label} <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
