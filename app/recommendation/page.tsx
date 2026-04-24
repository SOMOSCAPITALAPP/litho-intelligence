"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, ShoppingBag } from "lucide-react";
import { recommendStones } from "@/lib/recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { withAffiliate } from "@/lib/affiliate";

export default function RecommendationPage({
  searchParams
}: {
  searchParams: { physical?: string; emotional?: string; goal?: string };
}) {
  const [physical, setPhysical] = useState(searchParams.physical ?? "");
  const [emotional, setEmotional] = useState(searchParams.emotional ?? "");
  const [goal, setGoal] = useState(searchParams.goal ?? "");

  const results = useMemo(() => recommendStones({ physical, emotional, goal }), [physical, emotional, goal]);

  return (
    <main className="section">
      <h1>Recommandation personnalisee</h1>
      <p className="section-lead">
        Decrivez ce qui pese, ce qui manque ou ce que vous voulez retrouver. Le moteur transforme ce ressenti
        en selection de pierres, avec une intention claire et un geste simple pour aujourd'hui.
      </p>

      <form className="form-panel">
        <div className="field">
          <label htmlFor="physical">Ce que le corps raconte</label>
          <input
            id="physical"
            placeholder="fatigue, sommeil agite, tension..."
            value={physical}
            onChange={(event) => setPhysical(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="emotional">Ce qui se passe a l'interieur</label>
          <input
            id="emotional"
            placeholder="stress, peur, colere, tristesse, doute..."
            value={emotional}
            onChange={(event) => setEmotional(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="goal">Ce que vous voulez retrouver</label>
          <input
            id="goal"
            placeholder="amour, argent, confiance, protection, paix..."
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />
        </div>
        <span className="button">
          <Search size={17} />
          Recevoir mon soutien
        </span>
        <p className="fineprint">{wellbeingDisclaimer}</p>
      </form>

      <div className="result-list">
        {results.map((item) => (
          <article className="card result-card" key={item.stone.slug}>
            <img className="result-image" src={item.stone.image.url} alt={item.stone.image.alt} />
            <div>
              <div className="result-title-row">
                <h2>{item.stone.name}</h2>
                <div className="score">{item.score}%</div>
              </div>
              <p>{item.reason}</p>
              <p className="intention-line">{item.intention}</p>
              <p>
                Geste propose: {item.usage}
              </p>
              <div className="pill-row">
                {item.stone.properties.map((property) => (
                  <span className="pill" key={property}>
                    {property}
                  </span>
                ))}
              </div>
            </div>
            <div className="result-actions">
              <Link
                className="button"
                href={withAffiliate(item.stone.products[0].url)}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ShoppingBag size={16} />
                {item.stone.products[0].price ?? "Bracelets"}
              </Link>
              <Link className="button secondary" href={`/stone/${item.stone.slug}`}>
                Fiche <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
