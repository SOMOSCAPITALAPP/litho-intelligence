"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { wellbeingDisclaimer } from "@/lib/legal";
import { StoneResultCard } from "@/components/StoneResultCard";
import { EmailCapture } from "@/components/EmailCapture";
import { RelatedStoneLinks } from "@/components/RelatedStoneLinks";
import type { AIRecommendationSource, AIStoneRecommendation } from "@/lib/openai-recommendation";

const sourceLabels: Record<AIRecommendationSource, string> = {
  local: "Résultat instantané",
  cache: "Résultat instantané déjà vérifié",
  ai: "Analyse avancée",
  fallback: "Résultat sécurisé"
};

type RecommendationPayload = {
  physical: string;
  emotional: string;
  goal: string;
};

export default function RecommendationPage({
  searchParams
}: {
  searchParams: { physical?: string; emotional?: string; goal?: string };
}) {
  const initialPayload = {
    physical: searchParams.physical ?? "",
    emotional: searchParams.emotional ?? "",
    goal: searchParams.goal ?? ""
  };

  const [physical, setPhysical] = useState(initialPayload.physical);
  const [emotional, setEmotional] = useState(initialPayload.emotional);
  const [goal, setGoal] = useState(initialPayload.goal);
  const [results, setResults] = useState<AIStoneRecommendation[]>([]);
  const [source, setSource] = useState<AIRecommendationSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [limitError, setLimitError] = useState("");
  const [formError, setFormError] = useState("");

  async function loadRecommendations(payload: RecommendationPayload) {
    const hasInput = Boolean(payload.physical.trim() || payload.emotional.trim() || payload.goal.trim());

    if (!hasInput) {
      setFormError("Indiquez au moins un ressenti, une sensation ou une intention.");
      setResults([]);
      setSource(null);
      return;
    }

    setLoading(true);
    setLimitError("");
    setFormError("");

    try {
      const response = await fetch("/api/recommendation/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.status === 402) {
        setLimitError(data.error ?? "Votre accès gratuit du jour est terminé.");
        setResults([]);
        setSource(null);
        return;
      }

      if (!response.ok) {
        setFormError("La recommandation n’a pas pu être générée. Réessayez dans quelques secondes.");
        setResults([]);
        setSource(null);
        return;
      }

      setResults(data.stones ?? []);
      setSource(data.source ?? null);
    } catch {
      setFormError("Connexion momentanément impossible. Réessayez dans quelques secondes.");
      setResults([]);
      setSource(null);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadRecommendations({ physical, emotional, goal });
  }

  useEffect(() => {
    if (initialPayload.physical || initialPayload.emotional || initialPayload.goal) {
      void loadRecommendations(initialPayload);
    }
    // Chargement initial uniquement pour les liens rapides de la page d’accueil.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="section">
      <h1>Conseil personnalisé</h1>
      <p className="section-lead">
        Décrivez ce qui pèse, ce qui manque ou ce que vous voulez retrouver. Litho Intelligence transforme ce ressenti
        en sélection de pierres, avec une intention claire et un geste simple pour aujourd’hui.
      </p>

      <form className="form-panel" onSubmit={submit}>
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
          <label htmlFor="emotional">Ce qui se passe à l’intérieur</label>
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
        <button className="button gold-button" disabled={loading} type="submit">
          <Search size={17} />
          {loading ? "Analyse en cours..." : "Obtenir mon conseil personnalisé"}
        </button>
        {formError ? <p className="form-error light-error">{formError}</p> : null}
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
        {results.length > 1 ? (
          <section className="card">
            <RelatedStoneLinks
              items={results.map((item) => item.slug)}
              title="Autres pierres possibles"
            />
          </section>
        ) : null}
        {results.map((item) => (
          <StoneResultCard key={item.slug} result={item} />
        ))}
      </div>

      {results.length > 0 ? <EmailCapture source="recommendation" /> : null}
    </main>
  );
}
