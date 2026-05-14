import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { getStone } from "@/lib/stones";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import type { AIStoneRecommendation } from "@/lib/openai-recommendation";
import { getProductByStone } from "@/lib/products";

export function StoneResultCard({ result }: { result: AIStoneRecommendation }) {
  const stone = getStone(result.slug);
  const product = stone?.products[0];
  const recommendedProduct = getProductByStone(result.slug);

  return (
    <article className="premium-result-card">
      {stone ? <img className="premium-result-image" src={stone.image.url} alt={stone.image.alt} /> : null}
      <div className="premium-result-content">
        <div className="premium-result-top">
          <span className="mystic-kicker">
            <Sparkles size={15} />
            {stone?.name ?? result.name}
          </span>
          <span className="premium-score">{result.score}%</span>
        </div>
        <h2>Ce que votre réponse révèle</h2>
        <p>
          Votre réponse montre un besoin de calme, de protection intérieure ou de recentrage. Selon les traditions
          symboliques, cette pierre peut devenir un rappel concret pour revenir à votre intention.
        </p>
        <div className="ritual-box">
          <strong>Votre pierre recommandée</strong>
          <span>{result.emotional_message}</span>
        </div>
        <div className="ritual-box">
          <strong>Pourquoi cette pierre correspond à votre intention</strong>
          <span>{result.reason}</span>
        </div>
        <div className="ritual-box">
          <strong>Comment l'utiliser</strong>
          <span>{result.usage}</span>
        </div>
        <div className="ritual-box">
          <strong>Votre rituel simple de 2 minutes</strong>
          <span>{result.ritual}</span>
        </div>
        <p className="micro-warning">{result.warning}</p>
        {recommendedProduct ? (
          <div>
            <h3>Le bracelet associé</h3>
            <ProductRecommendationCard
              imageUrl={recommendedProduct.imageUrl}
              title={recommendedProduct.title}
              stoneName={recommendedProduct.stone}
              intention={recommendedProduct.intentions[0] ?? "intention"}
              emotionalBenefit={recommendedProduct.description}
              price={recommendedProduct.price}
              amazonUrl={recommendedProduct.amazonUrl}
              badge={recommendedProduct.badge}
            />
          </div>
        ) : null}
        {stone ? (
          <RelatedStoneLinks
            items={stone.compatibilities.slice(0, 3)}
            title="Pierres complémentaires"
          />
        ) : null}
        <div className="premium-actions">
          {product ? (
            <Link className="button gold-button" href={withAffiliate(product.url)} rel="noopener noreferrer" target="_blank">
              <ShoppingBag size={16} />
              Voir le bracelet recommandé
            </Link>
          ) : null}
          {stone ? <AddFavoriteButton stoneSlug={stone.slug} /> : null}
          {stone ? (
            <Link className="button ghost-dark" href={`/stone/${stone.slug}`}>
              Comprendre cette pierre <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
        <LeadCaptureCard
          source="recommendation-result"
          recommendedStone={stone?.name ?? result.name}
          title="Recevoir ma recommandation complète par email"
          subtitle="Gardez votre pierre, son intention, son rituel et le lien du bracelet recommande."
          buttonLabel="Recevoir ma recommandation"
        />
      </div>
    </article>
  );
}
