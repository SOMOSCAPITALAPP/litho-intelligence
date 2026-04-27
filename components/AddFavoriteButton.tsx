"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

function saveLocalFavorite(stoneSlug: string) {
  const current = JSON.parse(window.localStorage.getItem("litho:favorites") ?? "[]") as string[];
  const next = Array.from(new Set([...current, stoneSlug])).slice(0, 5);
  window.localStorage.setItem("litho:favorites", JSON.stringify(next));
}

export function AddFavoriteButton({ stoneSlug, initialActive = false }: { stoneSlug: string; initialActive?: boolean }) {
  const [active, setActive] = useState(initialActive);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function addFavorite() {
    if (active || loading) return;
    setLoading(true);
    setMessage("");

    let response: Response;
    let data: { upgradeRequired?: boolean } = {};

    try {
      response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stoneSlug })
      });
      data = await response.json().catch(() => ({}));
    } catch {
      setMessage("Réessayez");
      setLoading(false);
      return;
    }

    if (response.status === 401) {
      saveLocalFavorite(stoneSlug);
      setActive(true);
      setMessage("Ajouté");
      setLoading(false);
      return;
    }

    if (!response.ok) {
      setMessage(data.upgradeRequired ? "Limite atteinte" : "Réessayez");
      setLoading(false);
      return;
    }

    setActive(true);
    setMessage("Ajouté");
    setLoading(false);
  }

  return (
    <button className={active ? "icon-action active" : "icon-action"} disabled={loading || active} onClick={addFavorite} type="button">
      <Heart size={16} />
      <span>{active ? "Favori" : loading ? "Ajout..." : "Ajouter aux favoris"}</span>
      {message ? <small>{message}</small> : null}
    </button>
  );
}
