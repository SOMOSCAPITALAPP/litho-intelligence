"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { analyzeCombination } from "@/lib/recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { stones } from "@/lib/stones";

type CombinationAnalysis = ReturnType<typeof analyzeCombination>;

export default function CombinationPage() {
  const [selected, setSelected] = useState<string[]>(["labradorite", "quartz-rose"]);
  const [analysis, setAnalysis] = useState<CombinationAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggle(slug: string) {
    setSelected((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
    setError("");
  }

  async function submitAnalysis() {
    if (selected.length < 2) {
      setError("Sélectionnez au moins deux pierres à analyser.");
      setAnalysis(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/combination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected })
      });
      const data = await response.json();

      if (!response.ok) {
        setAnalysis(null);
        setError(data.error ?? "L'analyse n'a pas pu être générée.");
        return;
      }

      setAnalysis(data.analysis);
    } catch {
      setAnalysis(null);
      setError("Connexion momentanément impossible. Réessayez dans quelques secondes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <h1>Analyse de combinaison</h1>
      <p className="section-lead">
        Sélectionnez les pierres que vous possédez pour estimer leur compatibilité symbolique, leurs synergies et les points d'attention énergétiques.
      </p>

      <div className="form-panel">
        <div className="pill-row">
          {stones.map((stone) => (
            <button className={selected.includes(stone.slug) ? "button" : "button secondary"} key={stone.slug} onClick={() => toggle(stone.slug)} type="button">
              {stone.name}
            </button>
          ))}
        </div>
        <button className="button gold-button" disabled={loading} onClick={submitAnalysis} type="button">
          {loading ? "Analyse en cours..." : "Analyser ma combinaison"}
        </button>
        {error ? (
          <p className="form-error light-error">
            {error} {error.includes("Premium") ? <Link href="/pricing">Voir Premium</Link> : null}
          </p>
        ) : null}
      </div>

      {analysis ? (
        <>
          <section className="card" style={{ marginTop: 24 }}>
            <div className="result-card">
              <div className="score">{analysis.score}%</div>
              <div>
                <h2>
                  <Layers size={24} /> Score global
                </h2>
                <p>{analysis.verdict}</p>
                <p>Pierres analysées : {analysis.selected.length > 0 ? analysis.selected.map((stone) => stone.name).join(", ") : "aucune"}</p>
              </div>
            </div>
          </section>

          <div className="grid" style={{ marginTop: 16 }}>
            <article className="card">
              <h2>Synergies</h2>
              <ul>
                {(analysis.synergies.length > 0 ? analysis.synergies : ["Aucune synergie explicite détectée."]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h2>Points d'attention</h2>
              <ul>
                {(analysis.warnings.length > 0 ? analysis.warnings : ["Aucun risque énergétique notable."]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card">
              <h2>Conseil d'usage</h2>
              <p>Commencez avec deux ou trois pierres maximum, une intention claire et une observation simple de votre ressenti.</p>
            </article>
          </div>

          <section className="section compact-section no-side-padding">
            <h2>Pourquoi cette combinaison fonctionne ou non</h2>
            <div className="grid" style={{ marginTop: 16 }}>
              {analysis.pairInsights.map((insight) => (
                <article className="card" key={insight.title}>
                  <span className={insight.tone === "warning" ? "status-warn" : "status-ok"}>
                    {insight.tone === "warning" ? "À doser" : insight.tone === "positive" ? "Harmonie" : "À clarifier"}
                  </span>
                  <h3>{insight.title}</h3>
                  <p>{insight.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section compact-section no-side-padding">
            <h2>Lecture pierre par pierre</h2>
            <div className="grid" style={{ marginTop: 16 }}>
              {analysis.stoneProfiles.map((stone) => (
                <article className="card" key={stone.slug}>
                  <h3>{stone.name}</h3>
                  <p>
                    Cette pierre met surtout l'accent sur {stone.properties.join(", ")} et peut accompagner une intention de {stone.goals.join(", ")}.
                  </p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <section className="section compact-section no-side-padding">
        <EmailCapture source="combination" />
      </section>
      <p className="fineprint">{wellbeingDisclaimer}</p>
    </main>
  );
}
