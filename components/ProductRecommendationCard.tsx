"use client";

import { ExternalLink, Sparkles } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { TrackedOutboundLink } from "@/components/TrackedOutboundLink";

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

const intentionLabels: Record<string, string> = {
  "argent-abondance": "argent & abondance",
  creativite: "créativité",
  energie: "énergie",
  equilibre: "équilibre",
  spiritualite: "spiritualité"
};

function formatIntention(value: string) {
  return intentionLabels[value] ?? value;
}

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
          {formatIntention(intention)}
        </p>
        <h3>{title}</h3>
        <p className="product-stone-name">{stoneName}</p>
        <p>{emotionalBenefit}</p>
        <div className="product-recommendation-meta">
          <strong>{price}</strong>
          <span>{disclaimer}</span>
        </div>
        <TrackedOutboundLink
          className="button gold-button"
          eventName="amazon_click"
          href={withAffiliate(amazonUrl)}
          payload={{ stone: stoneName, title, intention }}
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          Voir sur Amazon <ExternalLink size={16} />
        </TrackedOutboundLink>
      </div>
    </article>
  );
}
