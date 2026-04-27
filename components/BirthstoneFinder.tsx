"use client";

import Link from "next/link";
import { Gift, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { ShareActions } from "@/components/ShareActions";
import { getBirthstone } from "@/lib/getBirthstone";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";
import { getStone } from "@/lib/stones";
import { withAffiliate } from "@/lib/affiliate";
import { stoneWithDefiniteArticle } from "@/lib/french";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";

const intentions = ["amour", "protection", "calme", "confiance", "abondance", "énergie", "intuition", "cadeau"];

export function BirthstoneFinder() {
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [intention, setIntention] = useState("");
  const result = date ? getBirthstone(date) : null;
  const productStone = result ? getStone(result.alternativeStoneSlug) ?? getStone(result.mainStoneSlug) : null;
  const product = productStone?.products[0];
  const meditation = result ? getMeditationSuggestion(result.alternativeStone, intention || result.meditationTheme) : null;
  const shareText = result
    ? `${firstName || "Ma"} pierre de naissance : ${stoneWithDefiniteArticle(result.mainStone)}. Alternative accessible : ${stoneWithDefiniteArticle(result.alternativeStone)}.`
    : "Je découvre ma pierre de naissance sur Litho Intelligence.";

  return (
    <section className="guided-layout birthstone-module">
      <div className="form-panel guided-panel">
        <p className="eyebrow">Découvre ta pierre de naissance</p>
        <div className="field">
          <label htmlFor="birth-date">Date de naissance</label>
          <input id="birth-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="birth-name">Prénom optionnel</label>
          <input id="birth-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Ex : Clara" />
        </div>
        <div className="field">
          <label htmlFor="birth-intention">Intention optionnelle</label>
          <select id="birth-intention" value={intention} onChange={(event) => setIntention(event.target.value)}>
            <option value="">Choisir une intention</option>
            {intentions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <aside className="card guidance-result">
        {result ? (
          <>
            <p className="result-kicker">{result.monthName}</p>
            <h2>
              {firstName
                ? `${firstName}, ta pierre est ${stoneWithDefiniteArticle(result.mainStone)}`
                : `Votre pierre est ${stoneWithDefiniteArticle(result.mainStone)}`}
            </h2>
            <p>{result.giftAngle}.</p>
            <div className="pill-row">
              <span className="pill">Alternative : {stoneWithDefiniteArticle(result.alternativeStone)}</span>
              <span className="pill">Émotion : {result.emotion}</span>
              <span className="pill">Intention : {intention || result.themes[0]}</span>
            </div>
            <p className="intention-line">
              {stoneWithDefiniteArticle(result.mainStone)} symbolise {result.themes.join(", ")} selon les traditions de lithothérapie.
            </p>
            <p>Suggestion : {result.productTypes.join(", ")}.</p>
            <div className="sos-actions">
              {product ? (
                <Link className="button gold-button" href={withAffiliate(product.url)} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag size={16} />
                  Voir le bracelet recommandé
                </Link>
              ) : null}
              <a className="button secondary" href="#meditation">
                Faire une méditation
              </a>
              <Link className="button secondary" href="/idee-cadeau">
                <Gift size={16} />
                Offrir cette pierre
              </Link>
            </div>
            <ShareActions compact text={shareText} title="Pierre de naissance | Litho Intelligence" />
          </>
        ) : (
          <p>Choisissez une date pour obtenir une lecture symbolique immédiate.</p>
        )}
      </aside>

      {meditation ? (
        <div id="meditation">
          <StoneMeditationCard meditation={meditation} />
        </div>
      ) : null}
    </section>
  );
}
