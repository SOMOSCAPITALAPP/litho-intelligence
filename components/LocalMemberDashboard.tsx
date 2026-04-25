"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, History, Sparkles, UserCircle } from "lucide-react";
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
  const favoriteStones = favorites.map((slug) => getStone(slug)).filter(Boolean).slice(0, 5);

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
        Votre espace gratuit est actif. Continuez votre conseil, gardez vos pierres importantes et revenez facilement à vos favoris.
      </p>

      <section className="form-panel dashboard-action-panel">
        <div>
          <span className="mystic-kicker">
            <Sparkles size={15} />
            Reprendre votre parcours
          </span>
          <h2>Que souhaitez-vous faire maintenant ?</h2>
          <p>Choisissez une action simple : obtenir un conseil, apaiser une urgence émotionnelle ou tester vos pierres.</p>
        </div>
        <div className="dashboard-quick-actions">
          <Link className="button gold-button" href="/recommendation">
            Obtenir mon conseil <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" href="/sos">
            Mode SOS
          </Link>
          <Link className="button secondary" href="/combination">
            Tester mes pierres
          </Link>
        </div>
      </section>

      <div className="dashboard-grid">
        <article className="card dashboard-hero-card">
          <UserCircle size={24} />
          <h2>Plan gratuit</h2>
          <p>{remaining} recommandation{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""} aujourd’hui.</p>
          <CheckoutButton />
        </article>

        <article className="card">
          <Sparkles size={22} />
          <h2>Pierre du jour</h2>
          <img className="stone-thumb wide" src={stoneOfDay.image.url} alt={stoneOfDay.image.alt} />
          <p>{stoneOfDay.name}</p>
          <Link className="button secondary" href={`/stone/${stoneOfDay.slug}`}>Comprendre cette pierre</Link>
        </article>

        <article className="card">
          <Heart size={22} />
          <h2>Favoris</h2>
          {favoriteStones.length ? (
            <ul>
              {favoriteStones.map((stone) => (
                <li key={stone!.slug}>
                  <Link href={`/stone/${stone!.slug}`}>{stone!.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun favori pour le moment. Ajoutez les pierres qui résonnent avec votre besoin du moment.</p>
          )}
          <Link className="button secondary" href="/stones">Explorer les pierres</Link>
        </article>
      </div>

      <section className="section compact-section no-side-padding">
        <article className="card">
          <History size={22} />
          <h2>Dernière recommandation</h2>
          <p>
            Votre historique complet sera disponible avec Premium. Pour l’instant, reprenez un conseil rapide et ajoutez vos pierres clés aux favoris.
          </p>
          <Link className="button gold-button" href="/recommendation">Continuer mon rituel</Link>
        </article>
      </section>
    </main>
  );
}
