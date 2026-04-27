"use client";

import { PlayCircle } from "lucide-react";
import { useState } from "react";

export function YouTubeEmbed({
  videoId,
  title,
  description,
  shareText
}: {
  videoId: string;
  title: string;
  description?: string;
  shareText?: string;
}) {
  const [active, setActive] = useState(false);
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <article className="card video-card">
      <div className="video-shell">
        {active ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-frame"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={embedUrl}
            title={title}
          />
        ) : (
          <button
            aria-label={`Lire ${title}`}
            className="video-launcher"
            onClick={() => setActive(true)}
            type="button"
          >
            <img alt={title} className="video-poster" loading="lazy" src={thumbnailUrl} />
            <span className="video-overlay" />
            <span className="video-badge">
              <PlayCircle size={18} />
              Lire dans la page
            </span>
          </button>
        )}
      </div>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {shareText ? (
        <div className="share-inline-note">{shareText}</div>
      ) : null}
    </article>
  );
}
