"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Download, Heart, MoonStar, Sparkles, UserCircle } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { withAffiliate } from "@/lib/affiliate";
import { getLocalFavorites, getLocalMember, getLocalRecommendationUsage, type LocalMember } from "@/lib/localMember";
import { getStone, stones } from "@/lib/stones";

const guideUrl = "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf";
const sleepMeditationUrl = "https://youtu.be/Y1rP0iOVG0Q";

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
          <p>{remaining} recommandation{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""} aujourd'hui.</p>
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
            <ul className="clean-list">
              {favoriteStones.map((stone) => {
                const product = stone?.products[0];
                return (
                  <li className="favorite-entry" key={stone!.slug}>
                    <Link href={`/stone/${stone!.slug}`}>{stone!.name}</Link>
                    {product ? (
                      <a className="subtle-link" href={withAffiliate(product.url)} rel="noopener noreferrer" target="_blank">
                        Acheter sur Amazon
                      </a>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Aucun favori pour le moment. Ajoutez les pierres qui résonnent avec votre besoin du moment.</p>
          )}
          <Link className="button secondary" href="/stones">Explorer les pierres</Link>
        </article>
      </div>

      <section className="section compact-section no-side-padding">
        <div className="grid">
          <article className="card">
            <Download size={22} />
            <h2>Guide offert</h2>
            <p>Le guide des 10 pierres essentielles reste disponible à tout moment dans votre espace.</p>
            <a className="button gold-button" href={guideUrl} target="_blank" rel="noreferrer">
              Télécharger le guide
            </a>
          </article>
          <article className="card">
            <MoonStar size={22} />
            <h2>Méditation sommeil</h2>
            <p>Une proposition de Quintessence Cristal pour ralentir avant le coucher et apaiser l'esprit.</p>
            <a className="button secondary" href={sleepMeditationUrl} target="_blank" rel="noreferrer">
              Ouvrir sur YouTube
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
