"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { ConsultationCheckoutButton } from "@/components/ConsultationCheckoutButton";
import type { ConsultationResponse } from "@/lib/consultation";

export function ConsultationClient({
  accessible,
  sessionId
}: {
  accessible: boolean;
  sessionId?: string;
}) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResponse | null>(null);
  const [error, setError] = useState("");

  async function submit() {
    if (!question.trim() || !sessionId) return;
    setLoading(true);
    setError("");

    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, sessionId })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Impossible de lancer la consultation.");
      return;
    }

    setResult(data);
  }

  if (!accessible) {
    return (
      <section className="section compact-section">
        <article className="pricing-card">
          <span className="mystic-kicker">Consultation privée</span>
          <h1>Parlez à un conseiller en lithothérapie</h1>
          <p className="section-lead">
            Posez votre question librement. Le conseiller vous répond avec une lecture claire, prudente et émotionnelle, puis vous propose les bracelets adaptés.
          </p>
          <ul>
            <li>Question libre sur votre situation</li>
            <li>Réponse guidée en français clair</li>
            <li>Sélection de 2 à 3 pierres adaptées</li>
            <li>Bracelets associés à découvrir ensuite</li>
          </ul>
          <div className="card-actions">
            <ConsultationCheckoutButton />
            <Link className="button secondary" href="/login">
              Me connecter d’abord
            </Link>
          </div>
          <p>Consultation ponctuelle à 20 €.</p>
        </article>
      </section>
    );
  }

  return (
    <main className="section">
      <p className="eyebrow">Consultation privée</p>
      <h1>Votre conseiller en lithothérapie</h1>
      <p className="section-lead">
        Décrivez votre situation avec vos mots. Le conseiller vous répond de façon claire, symbolique et structurée, sans promesse médicale.
      </p>

      <section className="guided-layout">
        <div className="form-panel guided-panel">
          <div className="field">
            <label htmlFor="consultation-question">Votre question</label>
            <textarea
              id="consultation-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Exemple : je me sens dispersé, fatigué émotionnellement et j’ai besoin de retrouver plus de protection et de clarté."
              rows={8}
              style={{ resize: "vertical", minHeight: 180, borderRadius: 8, border: "1px solid var(--line)", padding: 12 }}
            />
          </div>
          <button className="button gold-button" disabled={loading} onClick={submit} type="button">
            <MessageCircle size={16} />
            {loading ? "Consultation en cours..." : "Lancer ma consultation"}
          </button>
          {error ? <p className="light-error">{error}</p> : null}
        </div>

        <aside className="card guidance-result">
          {result ? (
            <>
              <p className="result-kicker">Conseil personnalisé</p>
              <h2>{result.title}</h2>
              <p>{result.answer}</p>
              <p className="intention-line">{result.grounding}</p>
            </>
          ) : (
            <p>Après votre paiement, vous pouvez poser ici une vraie question libre et recevoir une réponse guidée avec pierres et bracelets associés.</p>
          )}
        </aside>
      </section>

      {result ? (
        <section className="section compact-section no-side-padding">
          <h2>Pierres et bracelets associés</h2>
          <div className="grid" style={{ marginTop: 16 }}>
            {result.stones.map((stone) => (
              <article className="card catalog-card" key={stone.slug}>
                <h3>{stone.name}</h3>
                <p>{stone.reason}</p>
                <div className="card-actions">
                  <Link className="button secondary" href={`/stone/${stone.slug}`}>
                    Voir la fiche
                  </Link>
                  <a className="button gold-button" href={withAffiliate(stone.braceletUrl)} target="_blank" rel="noreferrer">
                    <ShoppingBag size={16} />
                    Voir le bracelet associé
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="fineprint">{result.disclaimer}</p>
        </section>
      ) : null}
    </main>
  );
}
