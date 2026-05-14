import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";

type ProductRecommendationCardProps = {
  imageUrl: string;
  title: string;
  stoneName: string;
  intention: string;
  emotionalBenefit: string;
  price: string;
  amazonUrl: string;
  badge?: string;
  disclaimer?: string;
};

export function ProductRecommendationCard({
  imageUrl,
  title,
  stoneName,
  intention,
  emotionalBenefit,
  price,
  amazonUrl,
  badge,
  disclaimer = "Disponible sur Amazon selon stock et conditions du vendeur."
}: ProductRecommendationCardProps) {
  return (
    <article className="product-recommendation-card">
      <div className="product-recommendation-image">
        <img src={imageUrl} alt={`${title} - ${stoneName}`} loading="lazy" />
        {badge ? <span className="product-recommendation-badge">{badge}</span> : null}
      </div>
      <div className="product-recommendation-content">
        <p className="mystic-kicker">
          <Sparkles size={15} />
          {intention}
        </p>
        <h3>{title}</h3>
        <p className="product-stone-name">{stoneName}</p>
        <p>{emotionalBenefit}</p>
        <div className="product-recommendation-meta">
          <strong>{price}</strong>
          <span>{disclaimer}</span>
        </div>
        <Link className="button gold-button" href={withAffiliate(amazonUrl)} target="_blank" rel="noopener noreferrer sponsored">
          Voir sur Amazon <ExternalLink size={16} />
        </Link>
      </div>
    </article>
  );
}
