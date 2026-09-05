"use client";

import { useState, type FormEvent } from "react";
import { Download, Mail } from "lucide-react";
import { saveLead } from "@/lib/leads";

const guideUrl = "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf";

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
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState(guideUrl);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@") || !consent) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const result = await saveLead({ email, source, intention, recommendedStone, consent });
    if (result.downloadUrl) setDownloadUrl(result.downloadUrl);
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
        <label className="consent-row lead-consent">
          <input checked={consent} onChange={(event) => setConsent(event.target.checked)} required type="checkbox" />
          <span>J'accepte de recevoir les conseils, guides et offres Litho Intelligence by Quintessence Cristal. Désinscription possible à tout moment.</span>
        </label>
      </form>
      {status === "success" ? (
        <div className="capture-success">
          <p className="capture-status">
            Votre demande est bien prise en compte. Vous pouvez télécharger le guide maintenant et recevoir nos conseils par email.
          </p>
          <a className="button secondary" href={downloadUrl} target="_blank" rel="noreferrer">
            <Download size={17} />
            Télécharger le PDF
          </a>
        </div>
      ) : null}
      {status === "error" ? <p className="form-error">Indiquez une adresse email valide et acceptez l'envoi des conseils pour recevoir le guide.</p> : null}
    </section>
  );
}
