"use client";

import { useState } from "react";
import { Copy, Mail, Share2 } from "lucide-react";

export function ShareActions({
  title,
  text,
  url,
  compact = false,
  networks = false
}: {
  title: string;
  text: string;
  url?: string;
  compact?: boolean;
  networks?: boolean;
}) {
  const [status, setStatus] = useState("");

  const resolvedUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");

  async function share() {
    const payload = { title, text, url: resolvedUrl };
    if (navigator.share) {
      await navigator.share(payload);
      return;
    }

    await navigator.clipboard.writeText(`${text}\n${resolvedUrl}`.trim());
    setStatus("Lien copié");
    window.setTimeout(() => setStatus(""), 2400);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(resolvedUrl || text);
    setStatus("Lien copié");
    window.setTimeout(() => setStatus(""), 2400);
  }

  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n${resolvedUrl}`.trim())}`;
  const encodedUrl = encodeURIComponent(resolvedUrl);
  const encodedText = encodeURIComponent(text);
  const encodedTitle = encodeURIComponent(title);
  const socialLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedText}%20${encodedUrl}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` }
  ];

  return (
    <div className={compact ? "share-actions compact" : "share-actions"}>
      <button className="button secondary" onClick={share} type="button">
        <Share2 size={16} />
        Partager
      </button>
      {networks
        ? socialLinks.map((link) => (
            <a className="button secondary social-share-button" href={link.href} key={link.label} rel="noopener noreferrer" target="_blank">
              {link.label}
            </a>
          ))
        : null}
      <button className="button secondary" onClick={copyLink} type="button">
        <Copy size={16} />
        Copier le lien
      </button>
      <a className="button secondary" href={mailto}>
        <Mail size={16} />
        Par email
      </a>
      {status ? <span className="share-status">{status}</span> : null}
    </div>
  );
}
