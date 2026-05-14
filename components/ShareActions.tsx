"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Mail, Share2 } from "lucide-react";

function getAbsoluteUrl(value?: string, currentOrigin?: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${currentOrigin ?? "https://www.litho-intelligence.com"}${value}`;
  return `https://${value}`;
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function ShareActions({
  title,
  text,
  url,
  compact = false,
  networks = true
}: {
  title: string;
  text: string;
  url?: string;
  compact?: boolean;
  networks?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const resolvedUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : undefined;
    return getAbsoluteUrl(url, origin) || currentUrl;
  }, [currentUrl, url]);

  const shareText = `${text}\n${resolvedUrl}`.trim();
  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`;
  const encodedUrl = encodeURIComponent(resolvedUrl);
  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(title);
  const socialLinks = [
    { label: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodedText}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` }
  ];

  async function share() {
    try {
      if (navigator.share && resolvedUrl) {
        await navigator.share({ title, text, url: resolvedUrl });
        return;
      }

      await copyToClipboard(shareText);
      setStatus("Lien copié");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      try {
        await copyToClipboard(shareText);
        setStatus("Lien copié");
      } catch {
        setStatus("Copie impossible");
      }
    } finally {
      window.setTimeout(() => setStatus(""), 2400);
    }
  }

  async function copyLink() {
    try {
      await copyToClipboard(resolvedUrl || text);
      setStatus("Lien copié");
    } catch {
      setStatus("Copie impossible");
    } finally {
      window.setTimeout(() => setStatus(""), 2400);
    }
  }

  return (
    <div className={compact ? "share-actions compact" : "share-actions"}>
      <button aria-label="Partager cette page" className="button secondary" onClick={share} type="button">
        <Share2 size={16} />
        Partager
      </button>
      {networks
        ? socialLinks.map((link) => (
            <a
              aria-label={`Partager sur ${link.label}`}
              className="button secondary social-share-button"
              href={link.href}
              key={link.label}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))
        : null}
      <button aria-label="Copier le lien de cette page" className="button secondary" onClick={copyLink} type="button">
        <Copy size={16} />
        Copier le lien
      </button>
      <a aria-label="Partager cette page par email" className="button secondary" href={mailto}>
        <Mail size={16} />
        Par email
      </a>
      {status ? <span className="share-status">{status}</span> : null}
    </div>
  );
}
