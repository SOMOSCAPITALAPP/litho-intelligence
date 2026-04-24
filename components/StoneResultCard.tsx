import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { getStone } from "@/lib/stones";
import type { AIStoneRecommendation } from "@/lib/openai-recommendation";

export function StoneResultCard({ result }: { result: AIStoneRecommendation }) {
  const stone = getStone(result.slug);
  const product = stone?.products[0];

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
        <h2>{result.emotional_message}</h2>
        <p>{result.reason}</p>
        <div className="ritual-box">
          <strong>Utilisation</strong>
          <span>{result.usage}</span>
        </div>
        <div className="ritual-box">
          <strong>Rituel rapide</strong>
          <span>{result.ritual}</span>
        </div>
        <p className="micro-warning">{result.warning}</p>
        <div className="premium-actions">
          {product ? (
            <Link className="button gold-button" href={withAffiliate(product.url)} rel="noopener noreferrer" target="_blank">
              <ShoppingBag size={16} />
              Voir le bracelet associe
            </Link>
          ) : null}
          {stone ? (
            <Link className="button ghost-dark" href={`/stone/${stone.slug}`}>
              Fiche pierre <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
