"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AddFavoriteButton({ stoneSlug, initialActive = false }: { stoneSlug: string; initialActive?: boolean }) {
  const [active, setActive] = useState(initialActive);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function addFavorite() {
    if (active || loading) return;
    setLoading(true);
    setMessage("");

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      const current = JSON.parse(window.localStorage.getItem("litho:favorites") ?? "[]") as string[];
      const next = Array.from(new Set([...current, stoneSlug])).slice(0, 5);
      window.localStorage.setItem("litho:favorites", JSON.stringify(next));
      setActive(true);
      setMessage("Ajouté");
      setLoading(false);
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Connectez-vous");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("favorites").upsert(
      {
        user_id: user.id,
        stone_slug: stoneSlug
      },
      { onConflict: "user_id,stone_slug" }
    );

    if (error) {
      setMessage("Réessayez");
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
      <span>{active ? "Favori" : loading ? "Ajout..." : "Ajouter"}</span>
      {message ? <small>{message}</small> : null}
    </button>
  );
}
