"use client";

import Link from "next/link";
import { Heart, Share2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { getLoveCompatibility } from "@/lib/getLoveCompatibility";
import { getStone } from "@/lib/stones";
import { withAffiliate } from "@/lib/affiliate";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";
import { stoneWithDefiniteArticle } from "@/lib/french";

const contexts = ["couple", "rencontre", "relation compliquée", "attirance", "réconciliation"];

export function LoveCompatibility() {
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [context, setContext] = useState("couple");
  const result = dateA && dateB ? getLoveCompatibility(dateA, dateB, context, nameA, nameB) : null;
  const productStone = result ? getStone(result.harmonizer.slug) : null;
  const product = productStone?.products[0];

  function shareResult() {
    if (!result) return;
    const text = `${result.title}. Pierre d’harmonisation : ${stoneWithDefiniteArticle(result.harmonizer.name)}.`;
    if (navigator.share) navigator.share({ title: "Compatibilité amoureuse par les pierres", text, url: window.location.href });
    else navigator.clipboard.writeText(text);
  }

  return (
    <section className="guided-layout">
      <div className="form-panel guided-panel">
        <p className="eyebrow">Compatibilité amoureuse par les pierres</p>
        <div className="choice-grid two-columns">
          <div className="field">
            <label htmlFor="love-name-a">Prénom A</label>
            <input id="love-name-a" value={nameA} onChange={(event) => setNameA(event.target.value)} placeholder="Optionnel" />
          </div>
          <div className="field">
            <label htmlFor="love-name-b">Prénom B</label>
            <input id="love-name-b" value={nameB} onChange={(event) => setNameB(event.target.value)} placeholder="Optionnel" />
          </div>
          <div className="field">
            <label htmlFor="love-date-a">Date A</label>
            <input id="love-date-a" type="date" value={dateA} onChange={(event) => setDateA(event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="love-date-b">Date B</label>
            <input id="love-date-b" type="date" value={dateB} onChange={(event) => setDateB(event.target.value)} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="love-context">Type de relation</label>
          <select id="love-context" value={context} onChange={(event) => setContext(event.target.value)}>
            {contexts.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <aside className="card guidance-result">
        {result ? (
          <>
            <p className="result-kicker">
              <Heart size={16} />
              Pierre de votre couple
            </p>
            <h2>{stoneWithDefiniteArticle(result.harmonizer.name)}</h2>
            <p>{result.reading}</p>
            <div className="pill-row">
              <span className="pill">{result.birthstoneA.monthName} : {stoneWithDefiniteArticle(result.birthstoneA.mainStone)}</span>
              <span className="pill">{result.birthstoneB.monthName} : {stoneWithDefiniteArticle(result.birthstoneB.mainStone)}</span>
            </div>
            <h3>Points forts</h3>
            <ul>{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Points de tension potentiels</h3>
            <ul>{result.tensions.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="intention-line">{result.romanticGift}</p>
            <p>{result.coupleRitual}</p>
            <div className="sos-actions">
              {product ? (
                <Link className="button gold-button" href={withAffiliate(product.url)} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag size={16} />
                  Offrir un bracelet d’amour
                </Link>
              ) : null}
              <a className="button secondary" href="#couple-meditation">
                Lancer une méditation de couple
              </a>
              <button className="button secondary" type="button" onClick={shareResult}>
                <Share2 size={16} />
                Partager mon résultat
              </button>
            </div>
          </>
        ) : (
          <p>Ajoutez deux dates pour découvrir une lecture symbolique du duo.</p>
        )}
      </aside>

      {result ? (
        <div id="couple-meditation">
          <StoneMeditationCard meditation={result.meditation} />
        </div>
      ) : null}
    </section>
  );
}
