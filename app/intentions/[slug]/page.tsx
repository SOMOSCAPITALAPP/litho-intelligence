import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Gift, ShoppingBag } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FormationCTA } from "@/components/FormationCTA";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import { ShareActions } from "@/components/ShareActions";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { getIntentionPage, intentionPages } from "@/data/intentions";
import { withAffiliate } from "@/lib/affiliate";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";
import { wellbeingDisclaimer } from "@/lib/legal";
import { getNativeStone, getNativeStoneImage } from "@/lib/nativeStones";
import { getProductByStone } from "@/lib/products";
import { routes } from "@/lib/routes";
import { defaultShareAlt, shareImage, shareImageType, siteUrl } from "@/lib/site";
import { getStone } from "@/lib/stones";

export function generateStaticParams() {
  return intentionPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getIntentionPage(params.slug);

  return {
    title: page?.seoTitle ?? "Pierres par intention | Litho Intelligence",
    description: page?.seoDescription,
    alternates: page
      ? {
          canonical: `${siteUrl}${routes.intention(page.slug)}`
        }
      : undefined,
    openGraph: page
      ? {
          title: page.seoTitle,
          description: page.seoDescription,
          url: routes.intention(page.slug),
          images: [{ url: shareImage, secureUrl: shareImage, type: shareImageType, width: 1200, height: 630, alt: defaultShareAlt }]
        }
      : undefined,
    twitter: page
      ? {
          card: "summary_large_image",
          title: page.seoTitle,
          description: page.seoDescription,
          images: [shareImage]
        }
      : undefined
  };
}

export default function IntentionPage({ params }: { params: { slug: string } }) {
  const page = getIntentionPage(params.slug);
  if (!page) notFound();

  const meditation = getMeditationSuggestion(page.meditationStone, page.meditationIntention);
  const otherIntentions = intentionPages.filter((item) => item.slug !== page.slug).slice(0, 8);

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: routes.home },
          { name: "Intentions", href: routes.intentions },
          { name: page.shortLabel, href: routes.intention(page.slug) }
        ]}
      />
      <section className="section compact-section">
        <p className="eyebrow">Solution par intention</p>
        <h1>{page.title}</h1>
        <p className="section-lead">{page.intro}</p>
        <div className="hero-actions">
          <Link className="button gold-button" href={`/recommendation?goal=${page.slug}`}>
            Obtenir mon conseil personnalisé <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" href={routes.intentions}>
            Changer d'intention
          </Link>
          <Link className="button secondary" href="/idee-cadeau">
            <Gift size={16} />
            Trouver une idée cadeau
          </Link>
        </div>
        <ShareActions
          compact
          title={`${page.title} | Litho Intelligence`}
          text={`Je découvre les pierres traditionnellement associées à cette intention : ${page.shortLabel}.`}
          url={routes.intention(page.slug)}
        />
      </section>

      <section className="answer-band">
        <div>
          <strong>{page.queryLabel}</strong>
          <span>{page.emotionalPromise}</span>
        </div>
      </section>

      <section className="section compact-section">
        <div className="grid">
          <article className="card">
            <h2>Votre solution simple</h2>
            <ol className="clean-list">
              {page.solutionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <Link className="button gold-button" href={`/recommendation?goal=${page.slug}`}>
              Recevoir une sélection personnalisée
            </Link>
          </article>
          <article className="card">
            <RelatedStoneLinks items={page.recommendedStoneSlugs} title="Pierres clés pour cette intention" />
          </article>
          <article className="card">
            <h2>À retenir</h2>
            <p>{wellbeingDisclaimer}</p>
          </article>
        </div>
      </section>

      <section className="section compact-section">
        <h2>Les pierres recommandées</h2>
        <p className="section-lead">
          Sélection basée sur les traditions de lithothérapie, les usages symboliques et les intentions de bien-être.
        </p>
        <div className="grid">
          {page.recommendedStoneSlugs.map((slug) => (
            <IntentionStoneCard key={slug} slug={slug} intention={page.slug} />
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <div className="grid">
          <article className="card">
            <h2>Comment choisir ?</h2>
            <p>
              Commencez par la pierre dont le symbole vous parle le plus. Ensuite, choisissez une forme facile à utiliser :
              bracelet pour le quotidien, pendentif pour le cœur ou pierre roulée pour un rituel court.
            </p>
          </article>
          <article className="card">
            <h2>Idée cadeau</h2>
            <p>{page.giftAngle}</p>
            <Link className="micro-action" href="/idee-cadeau">
              Créer un message cadeau <ArrowRight size={15} />
            </Link>
          </article>
          <article className="card">
            <h2>Autres intentions</h2>
            <div className="pill-row">
              {otherIntentions.map((item) => (
                <Link className="pill" href={routes.intention(item.slug)} key={item.slug}>
                  {item.shortLabel}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section compact-section">
        <StoneMeditationCard meditation={meditation} />
      </section>

      <section className="section compact-section">
        <h2>Questions fréquentes</h2>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: page.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer }
              }))
            })
          }}
        />
        <div className="grid">
          {page.faq.map((item) => (
            <article className="card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <LeadCaptureCard source={`intention:${page.slug}`} intention={page.slug} />
      </section>

      <FormationCTA />
    </main>
  );
}

function IntentionStoneCard({ slug, intention }: { slug: string; intention: string }) {
  const nativeStone = getNativeStone(slug);
  const productStone = getStone(nativeStone?.amazon_product_slug || slug);
  const product = productStone?.products[0];
  const recommendedProduct = getProductByStone(productStone?.slug ?? slug);
  const title = nativeStone?.name ?? productStone?.name ?? slug;
  const description =
    nativeStone?.short_description ??
    productStone?.description ??
    "Pierre traditionnellement utilisée comme support symbolique dans les pratiques de bien-être.";
  const image = nativeStone ? getNativeStoneImage(nativeStone) : productStone?.image;
  const href = routes.stone(nativeStone?.slug ?? productStone?.slug ?? slug);

  return (
    <article className="card catalog-card">
      {image ? <img className="stone-thumb wide" src={image.url} alt={image.alt} /> : null}
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="pill-row">
        {(nativeStone?.intentions ?? [intention]).slice(0, 3).map((item) => (
          <span className="pill" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="sos-actions">
        <Link className="button secondary" href={href}>
          Comprendre cette pierre
        </Link>
        {product ? (
          <TrackedOutboundLink
            className="button gold-button"
            eventName="amazon_click"
            href={withAffiliate(product.url)}
            payload={{ stone: title, intention, source: "intention-stone-card" }}
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            <ShoppingBag size={16} />
            Voir le bracelet
          </TrackedOutboundLink>
        ) : null}
      </div>
      {recommendedProduct ? (
        <ProductRecommendationCard
          imageUrl={recommendedProduct.imageUrl}
          title={recommendedProduct.title}
          stoneName={recommendedProduct.stone}
          intention={intention}
          emotionalBenefit={recommendedProduct.description}
          price={recommendedProduct.price}
          amazonUrl={recommendedProduct.amazonUrl}
          badge={recommendedProduct.badge}
        />
      ) : null}
    </article>
  );
}
