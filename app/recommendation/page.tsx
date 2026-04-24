"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { wellbeingDisclaimer } from "@/lib/legal";
import { StoneResultCard } from "@/components/StoneResultCard";
import { EmailCapture } from "@/components/EmailCapture";
import type { AIRecommendationSource, AIStoneRecommendation } from "@/lib/openai-recommendation";

const sourceLabels: Record<AIRecommendationSource, string> = {
  local: "Résultat instantané",
  cache: "Résultat instantané déjà vérifié",
  ai: "Analyse avancée",
  fallback: "Résultat sécurisé"
};

export default function RecommendationPage({
  searchParams
}: {
  searchParams: { physical?: string; emotional?: string; goal?: string };
}) {
  const [physical, setPhysical] = useState(searchParams.physical ?? "");
  const [emotional, setEmotional] = useState(searchParams.emotional ?? "");
  const [goal, setGoal] = useState(searchParams.goal ?? "");
  const [results, setResults] = useState<AIStoneRecommendation[]>([]);
  const [source, setSource] = useState<AIRecommendationSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [limitError, setLimitError] = useState("");

  const payload = useMemo(() => ({ physical, emotional, goal }), [physical, emotional, goal]);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const response = await fetch("/api/recommendation/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (active) {
        setLimitError(response.status === 402 ? data.error : "");
        setResults(response.ok ? data.stones ?? [] : []);
        setSource(response.ok ? data.source ?? null : null);
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [payload]);

  return (
    <main className="section">
      <h1>Recommandation personnalisée</h1>
      <p className="section-lead">
        Décrivez ce qui pèse, ce qui manque ou ce que vous voulez retrouver. Le moteur transforme ce ressenti
        en sélection de pierres, avec une intention claire et un geste simple pour aujourd'hui.
      </p>

      <form className="form-panel">
        <div className="field">
          <label htmlFor="physical">Ce que le corps raconte</label>
          <input
            id="physical"
            placeholder="fatigue, sommeil agité, tension..."
            value={physical}
            onChange={(event) => setPhysical(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="emotional">Ce qui se passe à l'intérieur</label>
          <input
            id="emotional"
            placeholder="stress, peur, colère, tristesse, doute..."
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

      <div className="premium-results-shell">
        {loading ? <p className="loading-line">Lecture de votre besoin...</p> : null}
        {limitError ? (
          <section className="paywall-card">
            <h2>Votre accès gratuit du jour est terminé.</h2>
            <p>{limitError}</p>
            <Link className="button gold-button" href="/pricing">
              Débloquer Premium
            </Link>
          </section>
        ) : null}
        {source && results.length > 0 ? <p className="source-pill">{sourceLabels[source]}</p> : null}
        {results.map((item) => (
          <StoneResultCard key={item.slug} result={item} />
        ))}
      </div>

      {results.length > 0 ? <EmailCapture source="recommendation" /> : null}
    </main>
  );
}
