import Link from "next/link";
import { Heart, History, Search, Shield, Sparkles, UserCircle, Wand2 } from "lucide-react";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LocalMemberDashboard } from "@/components/LocalMemberDashboard";
import { getCurrentUser, isPremium } from "@/lib/auth";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { getStone, stones } from "@/lib/stones";

export const metadata = { title: "Espace membre | Litho Intelligence" };
export const dynamic = "force-dynamic";

type FavoriteRow = { id: string; stone_slug: string };
type HistoryRow = { id: string; created_at: string; user_input: Record<string, string | null>; result: unknown };
type UsageRow = { recommendations_count: number | null };

function getDisplayName(profileName?: string | null, metadataName?: unknown, email?: string | null) {
  const name = profileName?.trim() || (typeof metadataName === "string" ? metadataName.trim() : "");
  if (name) return name.split(" ")[0];
  return email?.split("@")[0] ?? "";
}

function summarizeInput(input?: Record<string, string | null>) {
  if (!input) return "Recommandation personnalisée";
  return [input.emotional, input.physical, input.goal].filter(Boolean).join(" · ") || "Recommandation personnalisée";
}

export default async function DashboardPage() {
  const supabaseClient = createSupabaseServerClient();
  if (!supabaseClient) return <LocalMemberDashboard />;

  const { user, profile } = await getCurrentUser();
  if (!user) {
    return (
      <main className="section">
        <p className="eyebrow">Espace membre gratuit</p>
        <h1>Connectez-vous à votre espace</h1>
        <p className="section-lead">
          Créez un compte gratuit pour retrouver vos recommandations, vos favoris et votre pierre du jour.
        </p>
        <div className="hero-actions">
          <Link className="button gold-button" href="/register">Créer mon espace gratuit</Link>
          <Link className="button secondary" href="/login">Me connecter</Link>
        </div>
      </main>
    );
  }

  const premium = isPremium(profile);
  const displayName = getDisplayName(profile?.full_name, user.user_metadata?.full_name, profile?.email ?? user.email);
  const supabase = createSupabaseAdminClient();
  const today = new Date().toISOString().slice(0, 10);

  const [{ data: favorites }, { data: history }, { data: usage }] = supabase
    ? await Promise.all([
        supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase
          .from("recommendation_history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(premium ? 10 : 3),
        supabase.from("usage_limits").select("recommendations_count").eq("user_id", user.id).eq("date", today).maybeSingle()
      ])
    : [{ data: [] }, { data: [] }, { data: null }];

  const favoriteRows = (favorites ?? []) as FavoriteRow[];
  const historyRows = (history ?? []) as HistoryRow[];
  const usageRow = usage as UsageRow | null;
  const remainingRecommendations = premium ? Infinity : Math.max(0, 3 - Number(usageRow?.recommendations_count ?? 0));
  const favoriteSlugs = new Set(favoriteRows.map((favorite) => favorite.stone_slug));
  const stoneOfDay = stones[new Date().getDate() % stones.length];
  const suggestedStones = ["labradorite", "quartz-rose", "oeil-de-tigre", "amethyste"]
    .map((slug) => getStone(slug))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <main className="section dashboard-page">
      <p className="eyebrow">Espace membre</p>
      <h1>Bienvenue{displayName ? `, ${displayName}` : ""}</h1>
      <p className="section-lead">
        Votre espace rassemble vos conseils, vos pierres favorites et les actions les plus utiles pour avancer aujourd'hui.
      </p>

      <section className="dashboard-action-panel">
        <article className="dashboard-status-card">
          <UserCircle size={24} />
          <div>
            <span>{premium ? "Premium actif" : "Plan gratuit"}</span>
            <strong>
              {premium
                ? "Conseils personnalisés illimités"
                : `${remainingRecommendations} conseil${remainingRecommendations > 1 ? "s" : ""} personnalisé${remainingRecommendations > 1 ? "s" : ""} restant${remainingRecommendations > 1 ? "s" : ""} aujourd'hui`}
            </strong>
          </div>
        </article>

        <div className="dashboard-quick-actions">
          <Link className="quick-action-card primary" href="/recommendation">
            <Search size={20} />
            <span>Obtenir un conseil</span>
          </Link>
          <Link className="quick-action-card" href="/sos">
            <Shield size={20} />
            <span>Mode SOS émotionnel</span>
          </Link>
          <Link className="quick-action-card" href="/combination">
            <Wand2 size={20} />
            <span>Analyser mes pierres</span>
          </Link>
          <Link className="quick-action-card" href="/stones">
            <Heart size={20} />
            <span>Ajouter des favoris</span>
          </Link>
        </div>
      </section>

      <div className="dashboard-grid">
        <article className="card dashboard-hero-card">
          <Sparkles size={24} />
          <h2>Pierre du jour</h2>
          <img className="stone-thumb wide" src={stoneOfDay.image.url} alt={stoneOfDay.image.alt} />
          <p>{stoneOfDay.name} vous accompagne aujourd'hui dans une intention de présence et de clarté.</p>
          <div className="card-actions">
            <Link className="button secondary" href={`/stone/${stoneOfDay.slug}`}>Voir la fiche</Link>
            <AddFavoriteButton initialActive={favoriteSlugs.has(stoneOfDay.slug)} stoneSlug={stoneOfDay.slug} />
          </div>
        </article>

        <article className="card">
          <Heart size={22} />
          <h2>Favoris</h2>
          {favoriteRows.length ? (
            <ul className="clean-list">
              {favoriteRows.map((favorite) => {
                const stone = getStone(favorite.stone_slug);
                return (
                  <li key={favorite.id}>
                    <Link href={`/stone/${favorite.stone_slug}`}>{stone?.name ?? favorite.stone_slug}</Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Aucun favori pour le moment. Ajoutez les pierres qui vous attirent pour retrouver rapidement vos choix.</p>
          )}
          <Link className="button secondary" href="/stones">Explorer les pierres</Link>
        </article>

        <article className="card">
          <History size={22} />
          <h2>Historique</h2>
          {historyRows.length ? (
            <ul className="clean-list">
              {historyRows.map((item) => (
                <li key={item.id}>
                  <Link href="/recommendation">
                    {new Date(item.created_at).toLocaleDateString("fr-FR")} · {summarizeInput(item.user_input)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Votre historique apparaîtra ici dès votre première recommandation personnalisée.</p>
          )}
          <Link className="button secondary" href="/recommendation">Créer une recommandation</Link>
        </article>
      </div>

      <section className="section compact-section no-side-padding">
        <div className="dashboard-section-header">
          <div>
            <p className="eyebrow">À garder sous la main</p>
            <h2>Vos premières pierres essentielles</h2>
          </div>
          {!premium ? <CheckoutButton /> : <Link className="button secondary" href="/account">Gérer mon compte</Link>}
        </div>

        <div className="favorite-suggestion-grid">
          {suggestedStones.map((stone) =>
            stone ? (
              <article className="card favorite-suggestion-card" key={stone.slug}>
                <img className="stone-thumb" src={stone.image.url} alt={stone.image.alt} />
                <h3>{stone.name}</h3>
                <p>{stone.intentions.slice(0, 2).join(" · ")}</p>
                <div className="card-actions">
                  <Link className="button secondary" href={`/stone/${stone.slug}`}>Voir</Link>
                  <AddFavoriteButton initialActive={favoriteSlugs.has(stone.slug)} stoneSlug={stone.slug} />
                </div>
              </article>
            ) : null
          )}
        </div>
      </section>
    </main>
  );
}
