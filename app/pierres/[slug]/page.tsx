import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { BookRecommendationSection } from "@/components/BookRecommendationSection";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import { ShareActions } from "@/components/ShareActions";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { getNativeStone, getNativeStoneImage, nativeStones } from "@/lib/nativeStones";
import { getBooksForStone } from "@/lib/books";
import { getProductByStone } from "@/lib/products";
import { routes } from "@/lib/routes";
import { defaultShareAlt, shareImage, shareImageType, siteUrl } from "@/lib/site";
import { getStone, stones, type Stone } from "@/lib/stones";
import { getStoneEditorialDetail, type StoneEditorialDetail } from "@/lib/stoneEditorialDetails";
import { nativeStoneVirtueSummary, productStoneVirtueSummary } from "@/lib/stoneVirtueSummary";
import { wellbeingDisclaimer } from "@/lib/legal";
import { slugifyVirtue } from "@/lib/virtues";
import { withAffiliate } from "@/lib/affiliate";

export function generateStaticParams() {
  const slugs = new Set([...nativeStones.map((stone) => stone.slug), ...stones.map((stone) => stone.slug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const productStone = getStone(params.slug);
  const nativeStone = getNativeStone(params.slug);
  const title = productStone
    ? `${productStone.name} : signification, vertus symboliques et bracelet recommandé`
    : nativeStone?.seo_title ?? "Pierre naturelle | Litho Intelligence";
  const description = productStone
    ? `Découvrez ${productStone.name}, sa signification symbolique, ses intentions associées, ses conseils d'entretien et le bracelet recommandé sur Litho Intelligence.`
    : nativeStone
      ? `Découvrez ${nativeStone.name}, ses usages symboliques, ses intentions associées et ses conseils d'entretien sur Litho Intelligence.`
      : "Fiche pierre naturelle Litho Intelligence.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${routes.stone(params.slug)}`
    },
    openGraph: {
      title,
      description,
      url: routes.stone(params.slug),
      siteName: "Litho Intelligence",
      locale: "fr_FR",
      type: "article",
      images: [
        {
          url: shareImage,
          secureUrl: shareImage,
          type: shareImageType,
          width: 1200,
          height: 630,
          alt: defaultShareAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage]
    }
  };
}

export default function PierrePage({ params }: { params: { slug: string } }) {
  const productStone = getStone(params.slug);
  if (productStone) return <ProductStonePage stone={productStone} />;

  const nativeStone = getNativeStone(params.slug);
  if (!nativeStone) notFound();

  const linkedProductStone = getStone(nativeStone.amazon_product_slug || nativeStone.slug);
  const product = linkedProductStone?.products[0];
  const recommendedProduct = getProductByStone(linkedProductStone?.slug ?? nativeStone.slug);
  const image = getNativeStoneImage(nativeStone);
  const virtueSummary = nativeStoneVirtueSummary(nativeStone);
  const editorialDetail = getStoneEditorialDetail(nativeStone.slug);
  const books = getBooksForStone(linkedProductStone?.slug ?? nativeStone.slug, 2);

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: routes.home },
          { name: "Pierres", href: routes.stones },
          { name: nativeStone.name, href: routes.stone(nativeStone.slug) }
        ]}
      />
      <section className="stone-hero">
        <div>
          <Link className="micro-action" href={routes.stones}>
            <ArrowLeft size={15} />
            Catalogue
          </Link>
          <h1>{nativeStone.name} : signification, vertus symboliques et bracelet recommandé</h1>
          <p className="section-lead">{nativeStone.short_description}</p>
          <div className="pill-row">
            {nativeStone.intentions.slice(0, 4).map((intention) => (
              <Link className="pill pill-link" href={`/vertus/${slugifyVirtue(intention)}`} key={intention}>
                {intention}
              </Link>
            ))}
          </div>
        </div>
        <figure className="stone-visual">
          <img src={image.url} alt={image.alt} />
        </figure>
      </section>

      <section className="section stone-detail-section">
        {recommendedProduct ? (
          <ProductRecommendationCard
            imageUrl={recommendedProduct.imageUrl}
            title={recommendedProduct.title}
            stoneName={recommendedProduct.stone}
            intention={recommendedProduct.intentions[0] ?? nativeStone.intentions[0] ?? "intention"}
            emotionalBenefit={recommendedProduct.description}
            price={recommendedProduct.price}
            amazonUrl={recommendedProduct.amazonUrl}
            badge={recommendedProduct.badge}
          />
        ) : null}

        <article className="card stone-virtues-card">
          <p className="eyebrow">Vertus de la pierre</p>
          <h2>Comprendre les bienfaits symboliques de {nativeStone.name}</h2>
          {virtueSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <StoneEditorialDetailBlock detail={editorialDetail} stoneName={nativeStone.name} />

        <BookRecommendationSection
          books={books}
          eyebrow="Livre associé"
          source={`native-stone:${nativeStone.slug}`}
          title={`Approfondir ${nativeStone.name}`}
          intro="Une lecture complémentaire pour replacer cette pierre dans les traditions symboliques et mieux choisir votre intention."
        />

        <div className="grid">
          <InfoCard title="Usages traditionnels" items={nativeStone.traditional_uses} linkable />
          <InfoCard title="Mots-clés émotionnels" items={nativeStone.emotional_keywords} linkable />
          <InfoCard title="Bien-être symbolique" items={nativeStone.physical_wellbeing_keywords} linkable />
          <InfoCard title="Chakras" items={nativeStone.chakras} />
          <InfoCard title="Couleurs" items={nativeStone.colors} />
          <InfoCard title="Formes recommandées" items={nativeStone.recommended_forms} />
          <InfoCard title="Conseils d'utilisation" items={nativeStone.usage_advice} />
          <InfoCard title="Purification" items={nativeStone.purification} />
          <InfoCard title="Recharge" items={nativeStone.recharge} />
          <RelatedCard title="Associations positives" items={nativeStone.positive_combinations} />
          <RelatedCard emptyText="Aucune association sensible dans cette base." items={nativeStone.avoid_combinations} title="Associations à doser" />
        </div>

        <div className="form-panel">
          <h2>Cette pierre vous correspond ?</h2>
          <p>Sauvegardez-la dans votre espace ou passez au bracelet associé pour transformer cette intention en geste concret.</p>
          <ShareActions
            compact
            networks
            title={`${nativeStone.name} | Litho Intelligence`}
            text={`Je découvre la fiche ${nativeStone.name} sur Litho Intelligence by Quintessence Cristal.`}
            url={routes.stone(nativeStone.slug)}
          />
          <div className="premium-actions">
            {product ? (
              <TrackedOutboundLink
                className="button gold-button"
                eventName="amazon_click"
                href={withAffiliate(product.url)}
                payload={{ stone: nativeStone.name, source: "native-stone-page" }}
                rel="noopener noreferrer sponsored"
                target="_blank"
              >
                <ShoppingBag size={17} />
                Voir le bracelet associé
              </TrackedOutboundLink>
            ) : null}
            <AddFavoriteButton stoneSlug={nativeStone.slug} />
          </div>
          <p className="fineprint">{nativeStone.disclaimer}</p>
        </div>
        <LeadCaptureCard source={`native-stone:${nativeStone.slug}`} recommendedStone={nativeStone.name} />
      </section>
    </main>
  );
}

function ProductStonePage({ stone }: { stone: Stone }) {
  const virtueSummary = productStoneVirtueSummary(stone);
  const recommendedProduct = getProductByStone(stone.slug);
  const editorialDetail = getStoneEditorialDetail(stone.slug);
  const books = getBooksForStone(stone.slug, 2);
  const faq = [
    ["Quelle est la signification symbolique de cette pierre ?", `${stone.name} est traditionnellement associée à ${stone.properties.slice(0, 3).join(", ")}.`],
    ["Comment porter cette pierre au quotidien ?", stone.wear],
    ["Peut-on l'associer à d'autres pierres ?", `Oui, notamment avec ${stone.compatibilities.slice(0, 3).join(", ")} selon l'intention recherchée.`],
    ["Cette pierre a-t-elle un effet médical ?", "Non. Elle est présentée comme un support symbolique et ne remplace jamais un avis médical, psychologique ou professionnel."]
  ];

  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", href: routes.home },
          { name: "Pierres", href: routes.stones },
          { name: stone.name, href: routes.stone(stone.slug) }
        ]}
      />
      <section className="stone-hero">
        <div>
          <Link className="micro-action" href={routes.stones}>
            <ArrowLeft size={15} />
            Catalogue
          </Link>
          <h1>{stone.name} : signification, vertus symboliques et bracelet recommandé</h1>
          <p className="section-lead">{stone.description}</p>
          <div className="pill-row">
            <span className="pill">Chakra : {stone.chakra}</span>
            <span className="pill">Origine : {stone.origin}</span>
          </div>
        </div>
        <figure className="stone-visual">
          <img src={stone.image.url} alt={stone.image.alt} />
        </figure>
      </section>

      <section className="section stone-detail-section">
        {recommendedProduct ? (
          <ProductRecommendationCard
            imageUrl={recommendedProduct.imageUrl}
            title={recommendedProduct.title}
            stoneName={recommendedProduct.stone}
            intention={recommendedProduct.intentions[0] ?? stone.goals[0] ?? "intention"}
            emotionalBenefit={recommendedProduct.description}
            price={recommendedProduct.price}
            amazonUrl={recommendedProduct.amazonUrl}
            badge={recommendedProduct.badge}
          />
        ) : null}

        <article className="card stone-virtues-card">
          <p className="eyebrow">Signification symbolique</p>
          <h2>Comprendre les bienfaits symboliques de {stone.name}</h2>
          {virtueSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <StoneEditorialDetailBlock detail={editorialDetail} stoneName={stone.name} />

        <BookRecommendationSection
          books={books}
          eyebrow="Livre associé"
          source={`stone:${stone.slug}`}
          title={`Approfondir ${stone.name}`}
          intro="Une lecture complémentaire pour comprendre la pierre, son histoire symbolique et les gestes simples qui peuvent accompagner son port."
        />

        <div className="grid">
          <article className="card">
            <h2>À quelles intentions cette pierre est-elle associée ?</h2>
            <div className="pill-row">
              {stone.goals.map((goal) => (
                <Link className="pill" href={routes.intention(goal)} key={goal}>
                  {goal}
                </Link>
              ))}
            </div>
          </article>
          <article className="card">
            <h2>Description visuelle</h2>
            <p>{stone.visual}</p>
          </article>
          <article className="card">
            <h2>Propriétés symboliques</h2>
            <ul>
              {stone.properties.map((property) => (
                <li key={property}>
                  <Link className="micro-action" href={`/vertus/${slugifyVirtue(property)}`}>
                    {property}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Comment la porter ?</h2>
            <p>{stone.usage}</p>
            <p>{stone.wear}</p>
            <ul>
              {stone.usageTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Rituel du jour</h2>
            <ul>
              {stone.rituals.map((ritual) => (
                <li key={ritual}>{ritual}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Avec quelles pierres l'associer ?</h2>
            <RelatedStoneLinks items={stone.compatibilities} title="Pierres compatibles" />
          </article>
          <article className="card">
            <h2>Quand l'éviter ou l'utiliser avec prudence ?</h2>
            <RelatedStoneLinks emptyText="Aucune incompatibilité notable dans cette base." items={stone.incompatibilities} title="Associations à doser" />
            <p>Si une pierre semble trop intense, gardez une approche simple et choisissez une association plus douce.</p>
          </article>
          <article className="card">
            <h2>Purification</h2>
            <p>{stone.purification}</p>
            <div className="pill-row">
              {stone.purificationMethods.map((method) => (
                <span className="pill" key={method}>
                  {method}
                </span>
              ))}
            </div>
          </article>
          <article className="card">
            <h2>Recharge</h2>
            <div className="pill-row">
              {stone.recharge.map((method) => (
                <span className="pill" key={method}>
                  {method}
                </span>
              ))}
            </div>
          </article>
        </div>

        <div className="form-panel">
          <h2>Cette pierre vous correspond ?</h2>
          <p>Gardez cette pierre dans vos favoris ou découvrez le bracelet associé pour l'intégrer à votre quotidien.</p>
          <ShareActions
            compact
            networks
            title={`${stone.name} | Litho Intelligence`}
            text={`Je découvre ${stone.name} sur Litho Intelligence by Quintessence Cristal.`}
            url={routes.stone(stone.slug)}
          />
          <div className="premium-actions">
            <AddFavoriteButton stoneSlug={stone.slug} />
          </div>
          <div className="product-grid">
            {stone.products.map((product) => (
              <TrackedOutboundLink
                className="product-card"
                eventName="amazon_click"
                href={withAffiliate(product.url)}
                key={product.label}
                payload={{ stone: stone.name, product: product.label, source: "stone-product-grid" }}
                rel="noopener noreferrer sponsored"
                target="_blank"
              >
                <span className="product-brand">{product.brand}</span>
                {product.badge ? <span className="product-badge">{product.badge}</span> : null}
                <strong>{product.label}</strong>
                <div className="product-meta">
                  {product.price ? <span>{product.price}</span> : null}
                  {product.rating ? <span>{product.rating}/5</span> : null}
                  {product.reviewCount ? <span>{product.reviewCount} avis</span> : null}
                  {product.monthlySales ? <span>{product.monthlySales}/mois</span> : null}
                </div>
                <span className="button">
                  <ShoppingBag size={17} />
                  Voir le bracelet associé
                </span>
              </TrackedOutboundLink>
            ))}
          </div>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </div>
        <section className="section compact-section no-side-padding">
          <h2>Questions fréquentes sur {stone.name}</h2>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faq.map(([question, answer]) => ({
                  "@type": "Question",
                  name: question,
                  acceptedAnswer: { "@type": "Answer", text: answer }
                }))
              })
            }}
          />
          <div className="grid">
            {faq.map(([question, answer]) => (
              <article className="card" key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>
        <LeadCaptureCard source={`stone:${stone.slug}`} recommendedStone={stone.name} />
      </section>
    </main>
  );
}

function StoneEditorialDetailBlock({ detail, stoneName }: { detail?: StoneEditorialDetail; stoneName: string }) {
  if (!detail) return null;

  return (
    <section className="seo-detail-block">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Repères d'achat responsable</p>
          <h2>Minéralogie, entretien et authenticité de {stoneName}</h2>
        </div>
      </div>
      <div className="grid">
        <article className="card">
          <h3>Minéralogie</h3>
          <dl className="spec-list">
            <div>
              <dt>Famille</dt>
              <dd>{detail.mineralogy.family}</dd>
            </div>
            <div>
              <dt>Composition</dt>
              <dd>{detail.mineralogy.composition}</dd>
            </div>
            <div>
              <dt>Système cristallin</dt>
              <dd>{detail.mineralogy.crystalSystem}</dd>
            </div>
            <div>
              <dt>Dureté Mohs</dt>
              <dd>{detail.mineralogy.mohs}</dd>
            </div>
          </dl>
          <p>{detail.mineralogy.appearance}</p>
        </article>
        <article className="card">
          <h3>Entretien prudent</h3>
          <ul>
            <li>Eau : {detail.care.water}</li>
            <li>Sel : {detail.care.salt}</li>
            <li>Soleil : {detail.care.sun}</li>
            <li>Usage quotidien : {detail.care.daily}</li>
          </ul>
        </article>
        <article className="card">
          <h3>Imitations et contrôles</h3>
          <p>Imitations fréquentes : {detail.imitations.common.join(", ")}.</p>
          <ul>
            {detail.imitations.checkpoints.map((checkpoint) => (
              <li key={checkpoint}>{checkpoint}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>Sources</h3>
          <p>Ces informations minéralogiques sont des repères généraux. Un vendeur sérieux doit préciser traitements, dimensions et photos réelles.</p>
          <ul className="source-list">
            {detail.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noopener noreferrer" target="_blank">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function InfoCard({ title, items, linkable = false }: { title: string; items: string[]; linkable?: boolean }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{linkable ? <Link className="micro-action" href={`/vertus/${slugifyVirtue(item)}`}>{item}</Link> : item}</li>
        ))}
      </ul>
    </article>
  );
}

function RelatedCard({ title, items, emptyText }: { title: string; items: string[]; emptyText?: string }) {
  return (
    <article className="card">
      <RelatedStoneLinks emptyText={emptyText} items={items} title={title} />
    </article>
  );
}
