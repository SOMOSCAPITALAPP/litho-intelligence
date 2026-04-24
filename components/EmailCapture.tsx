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
        <h2>Recevez votre guide OFFERT</h2>
        <p>Les 10 pierres essentielles pour transformer votre energie.</p>
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
          Recevoir
        </button>
      </div>
      {status === "success" ? <p className="capture-status">Parfait, votre demande est enregistree.</p> : null}
      {status === "error" ? <p className="capture-status">Impossible d'enregistrer pour le moment. Reessayez dans un instant.</p> : null}
    </section>
  );
}
