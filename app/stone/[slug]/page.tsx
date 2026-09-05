import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { getStone, stones } from "@/lib/stones";
import { wellbeingDisclaimer } from "@/lib/legal";
import { withAffiliate } from "@/lib/affiliate";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import { ShareActions } from "@/components/ShareActions";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";
import { slugifyVirtue } from "@/lib/virtues";
import { productStoneVirtueSummary } from "@/lib/stoneVirtueSummary";
import { getProductByStone } from "@/lib/products";
import { defaultShareAlt, shareImage, shareImageType } from "@/lib/site";

export function generateStaticParams() {
  return stones.map((stone) => ({ slug: stone.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const stone = getStone(params.slug);
  const title = stone ? `${stone.name} : signification, vertus symboliques et bracelet recommandé` : "Pierre | Litho Intelligence";
  const description = stone
    ? `Découvrez ${stone.name}, sa signification symbolique, ses intentions associées et le bracelet recommandé sur Litho Intelligence.`
    : "Fiche pierre Litho Intelligence.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/pierres/${params.slug}`,
      siteName: "Litho Intelligence",
      locale: "fr_FR",
      type: "website",
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

export default function StonePage({ params }: { params: { slug: string } }) {
  const stone = getStone(params.slug);
  if (!stone) notFound();
  const virtueSummary = productStoneVirtueSummary(stone);
  const recommendedProduct = getProductByStone(stone.slug);
  const faq = [
    ["Quelle est la signification symbolique de cette pierre ?", `${stone.name} est traditionnellement associée à ${stone.properties.slice(0, 3).join(", ")}.`],
    ["Comment porter cette pierre au quotidien ?", stone.wear],
    ["Peut-on l'associer à d'autres pierres ?", `Oui, notamment avec ${stone.compatibilities.slice(0, 3).join(", ")} selon l'intention recherchée.`],
    ["Cette pierre a-t-elle un effet médical ?", "Non. Elle est présentée comme un support symbolique et ne remplace jamais un avis médical, psychologique ou professionnel."]
  ];

  return (
    <main>
      <section className="stone-hero">
        <div>
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

        <div className="grid">
          <article className="card">
            <h2>À quelles intentions cette pierre est-elle associée ?</h2>
            <div className="pill-row">
              {stone.goals.map((goal) => (
                <Link className="pill" href={`/intentions/${goal}`} key={goal}>
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
          <p>Gardez cette pierre dans vos favoris ou découvrez le bracelet associé pour l’intégrer à votre quotidien.</p>
          <ShareActions
            compact
            networks
            title={`${stone.name} | Litho Intelligence`}
            text={`Je découvre ${stone.name} sur Litho Intelligence.`}
            url={`/pierres/${stone.slug}`}
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
                payload={{ stone: stone.name, product: product.label, source: "legacy-stone-product-grid" }}
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
