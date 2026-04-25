import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Gift, ShoppingBag } from "lucide-react";
import { FormationCTA } from "@/components/FormationCTA";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";
import { getIntentionPage, intentionPages } from "@/data/intentions";
import { withAffiliate } from "@/lib/affiliate";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";
import { getNativeStone } from "@/lib/nativeStones";
import { getStone } from "@/lib/stones";
import { wellbeingDisclaimer } from "@/lib/legal";

export function generateStaticParams() {
  return intentionPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getIntentionPage(params.slug);

  return {
    title: page?.seoTitle ?? "Pierres par intention | Litho Intelligence",
    description: page?.seoDescription
  };
}

export default function IntentionPage({ params }: { params: { slug: string } }) {
  const page = getIntentionPage(params.slug);
  if (!page) notFound();

  const meditation = getMeditationSuggestion(page.meditationStone, page.meditationIntention);

  return (
    <main>
      <section className="section compact-section">
        <p className="eyebrow">Guide intention</p>
        <h1>{page.title}</h1>
        <p className="section-lead">{page.intro}</p>
        <div className="hero-actions">
          <Link className="button" href={`/recommendation?goal=${page.slug}`}>
            Obtenir ma recommandation personnalisée <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" href="/idee-cadeau">
            <Gift size={16} />
            Trouver une idée cadeau
          </Link>
        </div>
      </section>

      <section className="answer-band">
        <div>
          <strong>{page.queryLabel}</strong>
          <span>{page.emotionalPromise}</span>
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
            <h2>À retenir</h2>
            <p>{wellbeingDisclaimer}</p>
          </article>
        </div>
      </section>

      <section className="section compact-section">
        <StoneMeditationCard meditation={meditation} />
      </section>

      <section className="section compact-section">
        <h2>Questions fréquentes</h2>
        <div className="grid">
          {page.faq.map((item) => (
            <article className="card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <FormationCTA />
    </main>
  );
}

function IntentionStoneCard({ slug, intention }: { slug: string; intention: string }) {
  const nativeStone = getNativeStone(slug);
  const productStone = getStone(nativeStone?.amazon_product_slug || slug);
  const product = productStone?.products[0];
  const title = nativeStone?.name ?? productStone?.name ?? slug;
  const description =
    nativeStone?.short_description ??
    productStone?.description ??
    "Pierre traditionnellement utilisée comme support symbolique dans les pratiques de bien-être.";

  return (
    <article className="card catalog-card">
      {productStone ? <img className="stone-thumb wide" src={productStone.image.url} alt={productStone.image.alt} /> : null}
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
        <Link className="button secondary" href={nativeStone ? `/stones/${nativeStone.slug}` : `/stone/${productStone?.slug}`}>
          Fiche pierre
        </Link>
        {product ? (
          <Link className="button gold-button" href={withAffiliate(product.url)} target="_blank" rel="noopener noreferrer">
            <ShoppingBag size={16} />
            Voir le bracelet
          </Link>
        ) : null}
      </div>
    </article>
  );
}
