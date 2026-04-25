"use client";

import Link from "next/link";
import { Copy, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { getGiftRecommendation } from "@/lib/getGiftRecommendation";
import { getStone } from "@/lib/stones";
import { withAffiliate } from "@/lib/affiliate";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";

const relations = ["amour", "ami(e)", "mère", "père", "enfant", "collègue", "soi-même"];
const occasions = ["anniversaire", "fête des mères", "Noël", "Saint-Valentin", "remerciement", "soutien moral", "nouveau départ"];

export function GiftStoneFinder() {
  const [date, setDate] = useState("");
  const [relation, setRelation] = useState("amour");
  const [occasion, setOccasion] = useState("anniversaire");
  const [budget, setBudget] = useState("");
  const [copied, setCopied] = useState(false);
  const result = date ? getGiftRecommendation(date, relation, occasion, budget) : null;
  const productStone = result ? getStone(result.birthstone.alternativeStoneSlug) ?? getStone(result.birthstone.mainStoneSlug) : null;
  const product = productStone?.products[0];

  async function copyMessage() {
    if (!result) return;
    await navigator.clipboard.writeText(result.copyMessage);
    setCopied(true);
  }

  return (
    <section className="guided-layout">
      <div className="form-panel guided-panel">
        <p className="eyebrow">Trouver une pierre à offrir</p>
        <div className="field">
          <label htmlFor="gift-date">Date de naissance de la personne</label>
          <input id="gift-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="gift-relation">Type de relation</label>
          <select id="gift-relation" value={relation} onChange={(event) => setRelation(event.target.value)}>
            {relations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="gift-occasion">Occasion</label>
          <select id="gift-occasion" value={occasion} onChange={(event) => setOccasion(event.target.value)}>
            {occasions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="gift-budget">Budget optionnel</label>
          <input id="gift-budget" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Ex : 15 à 30 €" />
        </div>
      </div>

      <aside className="card guidance-result">
        {result ? (
          <>
            <p className="result-kicker">Idée cadeau personnalisée</p>
            <h2>{result.birthstone.alternativeStone} ou {result.birthstone.mainStone}</h2>
            <p>{result.emotionalText}</p>
            <p className="intention-line">{result.copyMessage}</p>
            <p>Bijou recommandé : {result.recommendedJewelry}.</p>
            <div className="sos-actions">
              {product ? (
                <Link className="button gold-button" href={withAffiliate(product.url)} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag size={16} />
                  Voir les bijoux recommandés
                </Link>
              ) : null}
              <button className="button secondary" type="button" onClick={copyMessage}>
                <Copy size={16} />
                {copied ? "Message copié" : "Copier le message cadeau"}
              </button>
              <Link className="button secondary" href="/pricing">
                Recevoir une idée cadeau premium
              </Link>
            </div>
          </>
        ) : (
          <p>Indiquez une date pour générer une idée cadeau émotionnelle et monétisable.</p>
        )}
      </aside>

      {result ? <StoneMeditationCard meditation={result.meditation} /> : null}
    </section>
  );
}
