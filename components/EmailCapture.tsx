"use client";

import { useState, type FormEvent } from "react";
import { Download, Mail } from "lucide-react";

const guideUrl = "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf";

export function EmailCapture({ source = "results" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    const response = await fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source })
    });
    setStatus(response.ok ? "success" : "error");
  }

  return (
    <section className="email-capture">
      <div>
        <span className="mystic-kicker">
          <Mail size={15} />
          Guide offert
        </span>
        <h2>Recevez le guide des 10 pierres essentielles</h2>
        <p>Un repère simple pour choisir vos pierres selon vos émotions, vos intentions et vos moments de vie.</p>
      </div>
      <form className="email-form" onSubmit={submit}>
        <input
          aria-label="Email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="votre@email.com"
          type="email"
          value={email}
        />
        <button className="button gold-button" disabled={status === "loading"} type="submit">
          {status === "loading" ? "Envoi..." : "Recevoir mon guide"}
        </button>
      </form>
      {status === "success" ? (
        <div className="capture-success">
          <p className="capture-status">
            Votre adresse est bien enregistrée. Le guide s'ouvre immédiatement ici, mais l'envoi automatique par email n'est pas encore activé.
          </p>
          <a className="button secondary" href={guideUrl} target="_blank" rel="noreferrer">
            <Download size={17} />
            Télécharger le PDF
          </a>
        </div>
      ) : null}
      {status === "error" ? <p className="capture-status">Impossible d'enregistrer pour le moment. Réessayez dans un instant.</p> : null}
    </section>
  );
}
