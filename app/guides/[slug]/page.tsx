import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { editorialGuides, getEditorialGuide } from "@/lib/editorialGuides";
import { wellbeingDisclaimer } from "@/lib/legal";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return editorialGuides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getEditorialGuide(params.slug);
  if (!guide) return { title: "Guide | Litho Intelligence" };

  return {
    title: `${guide.title} | Litho Intelligence`,
    description: guide.description,
    alternates: {
      canonical: `${siteUrl.replace(/\/$/, "")}/guides/${guide.slug}`
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      type: "article"
    }
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getEditorialGuide(params.slug);
  if (!guide) notFound();

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

  return (
    <main className="section compact-section editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <p className="eyebrow">Guide Litho Intelligence</p>
      <h1>{guide.title}</h1>
      <p className="section-lead">{guide.description}</p>
      <p className="fineprint">Mis à jour le {new Date(guide.updatedAt).toLocaleDateString("fr-FR")} par Quintessence Cristal.</p>

      <div className="grid">
        {guide.sections.map((section) => (
          <article className="card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
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
