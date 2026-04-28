import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { getNativeStone, getNativeStoneImage, nativeStones } from "@/lib/nativeStones";
import { getStone } from "@/lib/stones";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { EmailCapture } from "@/components/EmailCapture";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import { ShareActions } from "@/components/ShareActions";
import { slugifyVirtue } from "@/lib/virtues";
import { nativeStoneVirtueSummary } from "@/lib/stoneVirtueSummary";

export function generateStaticParams() {
  return nativeStones.map((stone) => ({ slug: stone.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const stone = getNativeStone(params.slug);
  const title = stone?.seo_title ?? "Pierre naturelle | Litho Intelligence";
  const description = stone?.seo_description ?? "Fiche pierre naturelle Litho Intelligence.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/stones/${params.slug}`,
      images: [
        {
          url: "/brand/litho-intelligence-og-v3.png",
          width: 1200,
          height: 630,
          alt: "Litho Intelligence - pierres, intentions et rituels responsables"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/litho-intelligence-og-v3.png"]
    }
  };
}

export default function NativeStonePage({ params }: { params: { slug: string } }) {
  const stone = getNativeStone(params.slug);
  if (!stone) notFound();

  const productStone = getStone(stone.amazon_product_slug || stone.slug);
  const product = productStone?.products[0];
  const image = getNativeStoneImage(stone);
  const virtueSummary = nativeStoneVirtueSummary(stone);

  return (
    <main>
      <section className="stone-hero">
        <div>
          <Link className="micro-action" href="/stones">
            <ArrowLeft size={15} />
            Catalogue
          </Link>
          <h1>{stone.name}</h1>
          <p className="section-lead">{stone.short_description}</p>
          <div className="pill-row">
            {stone.intentions.slice(0, 4).map((intention) => (
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
        <article className="card stone-virtues-card">
          <p className="eyebrow">Vertus de la pierre</p>
          <h2>Comprendre les bienfaits symboliques de {stone.name}</h2>
          {virtueSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <div className="grid">
          <InfoCard title="Usages traditionnels" items={stone.traditional_uses} linkable />
          <InfoCard title="Mots-clés émotionnels" items={stone.emotional_keywords} linkable />
          <InfoCard title="Bien-être symbolique" items={stone.physical_wellbeing_keywords} linkable />
          <InfoCard title="Chakras" items={stone.chakras} />
          <InfoCard title="Couleurs" items={stone.colors} />
          <InfoCard title="Formes recommandées" items={stone.recommended_forms} />
          <InfoCard title="Conseils d’utilisation" items={stone.usage_advice} />
          <InfoCard title="Purification" items={stone.purification} />
          <InfoCard title="Recharge" items={stone.recharge} />
          <RelatedCard title="Associations positives" items={stone.positive_combinations} />
          <RelatedCard emptyText="Aucune association sensible dans cette base." items={stone.avoid_combinations} title="Associations à doser" />
        </div>

        <div className="form-panel">
          <h2>Cette pierre vous correspond ?</h2>
          <p>Sauvegardez-la dans votre espace ou passez au bracelet associé pour transformer cette intention en geste concret.</p>
          <ShareActions
            compact
            networks
            title={`${stone.name} | Litho Intelligence`}
            text={`Je découvre la fiche ${stone.name} sur Litho Intelligence.`}
            url={`https://litho-intelligence.vercel.app/stones/${stone.slug}`}
          />
          <div className="premium-actions">
            {product ? (
              <Link className="button gold-button" href={withAffiliate(product.url)} rel="noopener noreferrer" target="_blank">
                <ShoppingBag size={17} />
                Voir le bracelet associé
              </Link>
            ) : null}
            <AddFavoriteButton stoneSlug={stone.slug} />
          </div>
          {!product ? <p>Produit associé à compléter dans le catalogue.</p> : null}
          <p className="fineprint">{stone.disclaimer}</p>
        </div>
        <EmailCapture source={`native-stone:${stone.slug}`} />
      </section>
    </main>
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
