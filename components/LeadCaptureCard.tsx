"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { saveLead } from "@/lib/leads";

type LeadCaptureCardProps = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  source?: string;
  intention?: string;
  recommendedStone?: string;
};

export function LeadCaptureCard({
  title = "Recevez votre guide gratuit",
  subtitle = "Les 10 pierres essentielles pour choisir selon votre intention : stress, amour, protection, énergie et confiance.",
  placeholder = "votre@email.com",
  buttonLabel = "Recevoir mon guide",
  source = "lead-capture-card",
  intention,
  recommendedStone
}: LeadCaptureCardProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const result = await saveLead({ email, source, intention, recommendedStone });
    setStatus(result.ok || result.local ? "success" : "error");
  }

  return (
    <section className="lead-capture-card">
      <div>
        <p className="mystic-kicker">
          <Mail size={15} />
          Guide offert
        </p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <form className="lead-capture-form" onSubmit={submit}>
        <input
          aria-label="Email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          type="email"
          value={email}
        />
        <button className="button gold-button" disabled={status === "loading"} type="submit">
          {status === "loading" ? "Envoi..." : buttonLabel}
        </button>
      </form>
      {status === "success" ? <p className="capture-status">Votre demande est bien prise en compte. Le guide est accessible depuis votre espace et les ressources du site.</p> : null}
      {status === "error" ? <p className="form-error">Indiquez une adresse email valide.</p> : null}
    </section>
  );
}
