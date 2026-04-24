"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, History, Sparkles, UserCircle } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getLocalFavorites, getLocalMember, getLocalRecommendationUsage, type LocalMember } from "@/lib/localMember";
import { getStone, stones } from "@/lib/stones";

export function LocalMemberDashboard() {
  const [member, setMember] = useState<LocalMember | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [remaining, setRemaining] = useState(3);

  useEffect(() => {
    setMember(getLocalMember());
    setFavorites(getLocalFavorites());
    setRemaining(getLocalRecommendationUsage().remaining);
  }, []);

  const stoneOfDay = stones[new Date().getDate() % stones.length];

  if (!member) {
    return (
      <main className="section">
        <p className="eyebrow">Espace membre gratuit</p>
        <h1>Créez votre espace gratuit</h1>
        <p className="section-lead">
          Retrouvez vos favoris, votre pierre du jour et vos recommandations gratuites dans un espace simple.
        </p>
        <div className="hero-actions">
          <Link className="button gold-button" href="/register">Créer mon espace gratuit</Link>
          <Link className="button secondary" href="/login">Me connecter</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <p className="eyebrow">Espace membre gratuit</p>
      <h1>Bienvenue{member.fullName ? `, ${member.fullName}` : ""}</h1>
      <p className="section-lead">
        Votre espace gratuit est actif. Vous pouvez suivre vos favoris, consulter votre pierre du jour et continuer vos
        recommandations.
      </p>

      <div className="dashboard-grid">
        <article className="card dashboard-hero-card">
          <UserCircle size={24} />
          <h2>Plan gratuit</h2>
          <p>{remaining} recommandation{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""} aujourd'hui.</p>
          <CheckoutButton />
        </article>

        <article className="card">
          <Sparkles size={22} />
          <h2>Pierre du jour</h2>
          <img className="stone-thumb wide" src={stoneOfDay.image.url} alt={stoneOfDay.image.alt} />
          <p>{stoneOfDay.name}</p>
          <Link className="button secondary" href={`/stone/${stoneOfDay.slug}`}>Voir la fiche</Link>
        </article>

        <article className="card">
          <Heart size={22} />
          <h2>Favoris</h2>
          {favorites.length ? (
            <ul>
              {favorites.slice(0, 5).map((slug) => (
                <li key={slug}>{getStone(slug)?.name ?? slug}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun favori pour le moment.</p>
          )}
          <Link className="button secondary" href="/profile">Gérer mes favoris</Link>
        </article>
      </div>

      <section className="section compact-section no-side-padding">
        <article className="card">
          <History size={22} />
          <h2>Historique</h2>
          <p>
            L'historique complet sera disponible avec Supabase et Premium. Votre espace gratuit garde déjà les bases
            essentielles pour tester l'expérience membre.
          </p>
        </article>
      </section>
    </main>
  );
}
