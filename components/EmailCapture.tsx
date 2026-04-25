"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function EmailCapture({ source = "results" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit() {
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
      <div className="email-form">
        <input
          aria-label="Email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="votre@email.com"
          type="email"
          value={email}
        />
        <button className="button gold-button" disabled={status === "loading"} onClick={submit} type="button">
          Recevoir mon guide
        </button>
      </div>
      {status === "success" ? <p className="capture-status">Parfait, votre demande est enregistrée.</p> : null}
      {status === "error" ? <p className="capture-status">Impossible d’enregistrer pour le moment. Réessayez dans un instant.</p> : null}
    </section>
  );
}
