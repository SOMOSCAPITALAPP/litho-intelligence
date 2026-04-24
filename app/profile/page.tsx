"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, History, Target } from "lucide-react";
import { stones } from "@/lib/stones";

export default function ProfilePage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(JSON.parse(window.localStorage.getItem("litho:favorites") ?? "[]"));
  }, []);

  function toggle(slug: string) {
    setFavorites((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
      window.localStorage.setItem("litho:favorites", JSON.stringify(next));
      return next;
    });
  }

  return (
    <main className="section">
      <h1>Profil utilisateur</h1>
      <p className="section-lead">
        Base locale pour le MVP: favoris, objectifs personnels et historique pourront ensuite etre branches sur Supabase Auth.
      </p>

      <div className="grid">
        <article className="card">
          <h2>
            <Heart size={22} /> Pierres favorites
          </h2>
          <div className="pill-row">
            {stones.map((stone) => (
              <button
                className={favorites.includes(stone.slug) ? "button" : "button secondary"}
                key={stone.slug}
                onClick={() => toggle(stone.slug)}
                type="button"
              >
                {stone.name}
              </button>
            ))}
          </div>
        </article>
        <article className="card">
          <h2>
            <Target size={22} /> Objectifs
          </h2>
          <p>Confiance, apaisement, amour, protection et abondance seront personnalises par compte utilisateur.</p>
          <Link className="button secondary" href="/recommendation">
            Relancer une recommandation
          </Link>
        </article>
        <article className="card">
          <h2>
            <History size={22} /> Historique
          </h2>
          <p>La version Supabase enregistrera les recherches, les resultats et les clics Amazon pour optimiser la conversion.</p>
        </article>
      </div>
    </main>
  );
}
