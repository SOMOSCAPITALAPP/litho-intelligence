"use client";

import { useMemo, useState } from "react";
import { Layers } from "lucide-react";
import { analyzeCombination } from "@/lib/recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { stones } from "@/lib/stones";

export default function CombinationPage() {
  const [selected, setSelected] = useState<string[]>(["labradorite", "quartz-rose"]);
  const analysis = useMemo(() => analyzeCombination(selected), [selected]);

  function toggle(slug: string) {
    setSelected((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
  }

  return (
    <main className="section">
      <h1>Analyse de combinaison</h1>
      <p className="section-lead">
        Selectionnez les pierres que vous possedez pour estimer leur compatibilite symbolique, leurs synergies
        et les points d'attention energetiques.
      </p>

      <div className="form-panel">
        <div className="pill-row">
          {stones.map((stone) => (
            <button
              className={selected.includes(stone.slug) ? "button" : "button secondary"}
              key={stone.slug}
              onClick={() => toggle(stone.slug)}
              type="button"
            >
              {stone.name}
            </button>
          ))}
        </div>
      </div>

      <section className="card" style={{ marginTop: 24 }}>
        <div className="result-card">
          <div className="score">{analysis.score}%</div>
          <div>
            <h2>
              <Layers size={24} /> Score global
            </h2>
            <p>{analysis.verdict}</p>
            <p>
              Pierres analysees:{" "}
              {analysis.selected.length > 0 ? analysis.selected.map((stone) => stone.name).join(", ") : "aucune"}
            </p>
          </div>
        </div>
      </section>

      <div className="grid" style={{ marginTop: 16 }}>
        <article className="card">
          <h2>Synergies</h2>
          <ul>
            {(analysis.synergies.length > 0 ? analysis.synergies : ["Aucune synergie explicite detectee."]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h2>Points d'attention</h2>
          <ul>
            {(analysis.warnings.length > 0 ? analysis.warnings : ["Aucun risque energetique notable."]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h2>Conseil d'usage</h2>
          <p>Commencez avec deux ou trois pierres maximum, une intention claire et une observation simple de votre ressenti.</p>
        </article>
      </div>
      <p className="fineprint">{wellbeingDisclaimer}</p>
    </main>
  );
}
