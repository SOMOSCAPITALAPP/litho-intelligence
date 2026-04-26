"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { withAffiliate } from "@/lib/affiliate";
import { ConsultationCheckoutButton } from "@/components/ConsultationCheckoutButton";
import type { ConsultationChatMessage, ConsultationProfile, ConsultationResponse } from "@/lib/consultation";

const initialMessage =
  "Bonjour, je suis votre conseiller en lithothérapie. Je suis ici pour vous aider à clarifier votre besoin. Sous ce dialogue, vous trouverez une réponse globale plus détaillée avec les pierres conseillées. Dites-moi d’abord pour qui ce conseil est destiné, l’âge, le sexe si c’est utile, puis ce qui vous préoccupe.";

export function ConsultationClient({
  accessible,
  sessionId,
  testMode = false
}: {
  accessible: boolean;
  sessionId?: string;
  testMode?: boolean;
}) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResponse | null>(null);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ConsultationProfile>({ recipient: "", age: "", sex: "" });
  const [messages, setMessages] = useState<ConsultationChatMessage[]>([{ role: "assistant", content: initialMessage }]);

  const canSubmit = useMemo(() => question.trim().length > 0, [question]);

  async function submit() {
    if (!canSubmit) return;
    if (!testMode && !sessionId) return;

    const userMessage: ConsultationChatMessage = { role: "user", content: question.trim() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setLoading(true);
    setError("");
    setQuestion("");

    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: userMessage.content,
        sessionId,
        testMode,
        profile,
        history: nextMessages
      })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Impossible de lancer la consultation.");
      return;
    }

    setMessages((current) => [...current, { role: "assistant", content: data.chatMessage }]);
    setResult(data.consultation);
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
            <li>Échange de type chat, court et guidé</li>
            <li>Réponse globale structurée juste en dessous</li>
            <li>Bracelets associés à découvrir ensuite</li>
          </ul>
          <div className="card-actions">
            <ConsultationCheckoutButton />
            <Link className="button secondary" href="/consultation?mode=test">
              Essayer la consultation test
            </Link>
          </div>
          <p>Consultation ponctuelle à 20 €.</p>
        </article>
      </section>
    );
  }

  return (
    <main className="section">
      <p className="eyebrow">{testMode ? "Consultation test" : "Consultation privée"}</p>
      <h1>{testMode ? "Essai de votre conseiller en lithothérapie" : "Votre conseiller en lithothérapie"}</h1>
      <p className="section-lead">
        Échangez librement dans le chat. La réponse globale, plus structurée, se construit et reste visible sous la conversation.
      </p>

      {testMode ? (
        <section className="section compact-section no-side-padding">
          <article className="card">
            <h2>Mode test actif</h2>
            <p>Vous essayez ici l’expérience de consultation sans paiement. Le ton, la structure et la mise en avant des pierres sont les mêmes que dans la version payante.</p>
          </article>
        </section>
      ) : null}

      <section className="guided-layout">
        <div className="form-panel guided-panel">
          <div className="choice-grid two-columns">
            <div className="field">
              <label htmlFor="consultation-recipient">Pour qui ?</label>
              <input
                id="consultation-recipient"
                value={profile.recipient ?? ""}
                onChange={(event) => setProfile((current) => ({ ...current, recipient: event.target.value }))}
                placeholder="Pour moi, mon fils, ma compagne..."
              />
            </div>
            <div className="field">
              <label htmlFor="consultation-age">Âge</label>
              <input
                id="consultation-age"
                value={profile.age ?? ""}
                onChange={(event) => setProfile((current) => ({ ...current, age: event.target.value }))}
                placeholder="Ex : 38 ans"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="consultation-sex">Sexe</label>
            <select
              id="consultation-sex"
              value={profile.sex ?? ""}
              onChange={(event) => setProfile((current) => ({ ...current, sex: event.target.value }))}
            >
              <option value="">Préciser si utile</option>
              <option value="femme">Femme</option>
              <option value="homme">Homme</option>
              <option value="non-binaire">Non-binaire</option>
              <option value="préfère ne pas dire">Préfère ne pas dire</option>
            </select>
          </div>

          <div className="consultation-chat">
            {messages.map((message, index) => (
              <div className={message.role === "assistant" ? "chat-bubble assistant" : "chat-bubble user"} key={`${message.role}-${index}`}>
                {message.content}
              </div>
            ))}
            {loading ? <div className="chat-bubble assistant">Je vous lis attentivement. La réponse courte arrive ici, et la synthèse complète se met à jour juste en dessous.</div> : null}
          </div>

          <div className="field">
            <label htmlFor="consultation-question">Votre message</label>
            <textarea
              id="consultation-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Décrivez ce que vous vivez, ce que vous cherchez à apaiser ou à retrouver."
              rows={5}
              style={{ resize: "vertical", minHeight: 140, borderRadius: 8, border: "1px solid var(--line)", padding: 12 }}
            />
          </div>

          <button className="button gold-button" disabled={loading || !canSubmit} onClick={submit} type="button">
            <MessageCircle size={16} />
            {loading ? "Réponse en cours..." : "Envoyer"}
          </button>
          {error ? <p className="light-error">{error}</p> : null}
        </div>

        <aside className="card guidance-result">
          {result ? (
            <>
              <p className="result-kicker">Réponse globale</p>
              <h2>{result.title}</h2>
              <p>{result.answer}</p>
              <p className="intention-line">{result.grounding}</p>

              <div className="stack-list" style={{ marginTop: 18 }}>
                {result.insights.map((insight) => (
                  <article className="card nested-card" key={insight.issue}>
                    <h3>{insight.issue}</h3>
                    <p>{insight.reading}</p>
                    <p className="fineprint">Pierres idéales : {insight.stoneNames.join(", ")}</p>
                  </article>
                ))}
              </div>

              <p className="fineprint" style={{ marginTop: 18 }}>
                {result.disclaimer}
              </p>
            </>
          ) : (
            <p>La réponse globale détaillée apparaîtra ici au fil du dialogue, avec une lecture plus complète des points soulevés et les pierres à privilégier.</p>
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
        </section>
      ) : null}
    </main>
  );
}
