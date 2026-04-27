import Link from "next/link";
import {
  Download,
  Gift,
  Heart,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  UserCircle,
  Wand2
} from "lucide-react";
import { AddFavoriteButton } from "@/components/AddFavoriteButton";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LocalMemberDashboard } from "@/components/LocalMemberDashboard";
import { ShareActions } from "@/components/ShareActions";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { getCurrentUser, isPremium } from "@/lib/auth";
import { withAffiliate } from "@/lib/affiliate";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { getStone, stones } from "@/lib/stones";

export const metadata = { title: "Espace membre | Litho Intelligence" };
export const dynamic = "force-dynamic";

type FavoriteRow = { id: string; stone_slug: string };
type UsageRow = { recommendations_count: number | null };
type ConsultationRow = {
  id: string;
  status: string;
  updated_at: string;
  summary_json: { title?: string } | null;
};
type GiftClaimRow = { quarter_key: string };

const guideUrl = "/guides/guide-10-pierres-essentielles-litho-intelligence.pdf";

function getDisplayName(profileName?: string | null, metadataName?: unknown, email?: string | null) {
  const name = profileName?.trim() || (typeof metadataName === "string" ? metadataName.trim() : "");
  if (name) return name.split(" ")[0];
  return email?.split("@")[0] ?? "";
}

function getQuarterKey(date = new Date()) {
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${date.getFullYear()}-Q${quarter}`;
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
        <p className="section-lead">Créez un compte gratuit pour retrouver vos recommandations, vos favoris et votre pierre du jour.</p>
        <div className="hero-actions">
          <Link className="button gold-button" href="/register">
            Créer mon espace gratuit
          </Link>
          <Link className="button secondary" href="/login">
            Me connecter
          </Link>
        </div>
      </main>
    );
  }

  const premium = isPremium(profile);
  const displayName = getDisplayName(profile?.full_name, user.user_metadata?.full_name, profile?.email ?? user.email);
  const supabase = createSupabaseAdminClient();
  const today = new Date().toISOString().slice(0, 10);
  const currentQuarter = getQuarterKey();

  const [{ data: favorites }, { data: usage }, { data: consultationHistory }, { data: giftClaims }] = supabase
    ? await Promise.all([
        supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("usage_limits").select("recommendations_count").eq("user_id", user.id).eq("date", today).maybeSingle(),
        supabase
          .from("consultation_sessions")
          .select("id, status, updated_at, summary_json")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(6),
        supabase.from("premium_gift_claims").select("quarter_key").eq("user_id", user.id).eq("quarter_key", currentQuarter)
      ])
    : [{ data: [] }, { data: null }, { data: [] }, { data: [] }];

  const favoriteRows = (favorites ?? []) as FavoriteRow[];
  const usageRow = usage as UsageRow | null;
  const consultationRows = (consultationHistory ?? []) as ConsultationRow[];
  const giftClaimRows = (giftClaims ?? []) as GiftClaimRow[];
  const remainingRecommendations = premium ? Infinity : Math.max(0, 3 - Number(usageRow?.recommendations_count ?? 0));
  const favoriteSlugs = new Set(favoriteRows.map((favorite) => favorite.stone_slug));
  const stoneOfDay = stones[new Date().getDate() % stones.length];
  const suggestedStones = ["labradorite", "quartz-rose", "oeil-de-tigre", "amethyste"]
    .map((slug) => getStone(slug))
    .filter(Boolean)
    .slice(0, 4);
  const quarterlyGiftAvailable = premium && giftClaimRows.length === 0;

  return (
    <main className="section dashboard-page">
      <p className="eyebrow">Espace membre</p>
      <h1>Bienvenue{displayName ? `, ${displayName}` : ""}</h1>
      <p className="section-lead">Votre espace rassemble vos conseils, vos pierres favorites, vos ressources privées et les actions les plus utiles pour avancer aujourd'hui.</p>

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
            <span>Soutien rapide</span>
          </Link>
          <Link className="quick-action-card" href="/combination">
            <Wand2 size={20} />
            <span>Analyser mes pierres</span>
          </Link>
          <Link className="quick-action-card" href="/consultation">
            <MessageCircle size={20} />
            <span>Consultation privée</span>
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
            <Link className="button secondary" href={`/stone/${stoneOfDay.slug}`}>
              Voir la fiche
            </Link>
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
                const product = stone?.products[0];
                return (
                  <li className="favorite-entry" key={favorite.id}>
                    <Link href={`/stone/${favorite.stone_slug}`}>{stone?.name ?? favorite.stone_slug}</Link>
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
            <p>Aucun favori pour le moment. Ajoutez les pierres qui vous attirent pour retrouver rapidement vos choix.</p>
          )}
          <Link className="button secondary" href="/stones">
            Explorer les pierres
          </Link>
        </article>

        <article className="card">
          <Download size={22} />
          <h2>Guide offert</h2>
          <p>Retrouvez le PDF des 10 pierres essentielles à télécharger à tout moment depuis votre espace membre.</p>
          <div className="card-actions">
            <a className="button gold-button" href={guideUrl} target="_blank" rel="noreferrer">
              Télécharger le guide
            </a>
          </div>
        </article>
      </div>

      <section className="section compact-section no-side-padding">
        <div className="dashboard-section-header">
          <div>
            <p className="eyebrow">Consultations privées</p>
            <h2>Vos synthèses et PDF</h2>
          </div>
          <Link className="button secondary" href="/consultation">
            Nouvelle consultation
          </Link>
        </div>

        {consultationRows.length ? (
          <div className="grid">
            {consultationRows.map((session) => (
              <article className="card" key={session.id}>
                <h3>{session.summary_json?.title ?? "Synthèse de consultation"}</h3>
                <p>
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "long",
                    timeStyle: "short",
                    timeZone: "Europe/Paris"
                  }).format(new Date(session.updated_at))}
                </p>
                <p className="fineprint">Statut : {session.status === "completed" ? "terminée" : session.status === "expired" ? "expirée" : session.status}</p>
                <div className="card-actions">
                  <a className="button gold-button" href={`/api/consultation/report/${session.id}`} target="_blank" rel="noreferrer">
                    <Download size={16} />
                    Ouvrir le PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="card">
            <p>Vous n’avez pas encore de synthèse privée enregistrée. Votre première consultation gardera automatiquement un PDF dans cet espace.</p>
          </article>
        )}
      </section>

      <section className="section compact-section no-side-padding">
        <div className="dashboard-section-header">
          <div>
            <p className="eyebrow">Avantages premium</p>
            <h2>{premium ? "Votre univers Premium" : "Débloquez l’espace Premium"}</h2>
          </div>
          {!premium ? <CheckoutButton label="Passer Premium — 7,90 €/mois" /> : null}
        </div>

        <div className="grid">
          <article className="card">
            <Gift size={22} />
            <h3>Bracelet offert chaque trimestre</h3>
            <p>
              {premium
                ? quarterlyGiftAvailable
                  ? "Votre cadeau trimestriel est disponible. Choisissez un bracelet dans le catalogue pour préparer votre sélection."
                  : "Votre bracelet offert de ce trimestre a déjà été réservé. Le prochain avantage reviendra au trimestre suivant."
                : "Le plan Premium inclut un bracelet offert par trimestre à choisir parmi les bracelets présents dans l’application."}
            </p>
            <Link className="button secondary" href="/stones">
              Choisir dans le catalogue
            </Link>
          </article>

          <article className="card">
            <Sparkles size={22} />
            <h3>Newsletter mensuelle</h3>
            <p>
              Une lettre mensuelle pensée pour les membres Premium : sélections de pierres, rituels du moment, nouveautés et idées de méditation.
            </p>
            <Link className="button secondary" href="/account">
              Gérer mon profil
            </Link>
          </article>

          <article className="card">
            <MessageCircle size={22} />
            <h3>Suivi plus riche</h3>
            <p>
              Recommandations illimitées, synthèses conservées, espace de consultation plus profond et ressources exclusives regroupées au même endroit.
            </p>
            {premium ? (
              <ShareActions compact title="Espace Premium Litho Intelligence" text="Je découvre l’espace Premium de Litho Intelligence." url="https://litho-intelligence.vercel.app/pricing" />
            ) : (
              <CheckoutButton label="Activer Premium" />
            )}
          </article>
        </div>
      </section>

      <section className="section compact-section no-side-padding">
        <h2>Méditation pour dormir</h2>
        <p className="section-lead">Une proposition de Quintessence Cristal intégrée dans votre espace membre pour rester dans l’application tout en lançant la lecture.</p>
        <YouTubeEmbed
          videoId="Y1rP0iOVG0Q"
          title="Méditation pour aider à dormir"
          description="Une pratique douce pour ralentir le mental, relâcher la journée et préparer le sommeil."
          shareText="Partageable facilement depuis la page Méditations ou cet espace membre."
        />
      </section>

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
                  <Link className="button secondary" href={`/stone/${stone.slug}`}>
                    Voir
                  </Link>
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
