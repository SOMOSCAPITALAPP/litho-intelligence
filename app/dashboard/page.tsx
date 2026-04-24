import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PremiumGate } from "@/components/PremiumGate";
import { requireUser, isPremium } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { checkUsageLimit } from "@/lib/usage";
import { stones } from "@/lib/stones";

export const metadata = { title: "Espace membre | Litho Intelligence" };

export default async function DashboardPage() {
  const { user, profile } = await requireUser();
  const plan = profile?.plan ?? "free";
  const premium = isPremium(profile);
  const recommendationUsage = await checkUsageLimit(user.id, plan, "recommendations");
  const supabase = createSupabaseAdminClient();

  const [{ data: favorites }, { data: history }] = supabase
    ? await Promise.all([
        supabase.from("favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase
          .from("recommendation_history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(premium ? 10 : 1)
      ])
    : [{ data: [] }, { data: [] }];

  const stoneOfDay = stones[new Date().getDate() % stones.length];

  return (
    <main className="section">
      <p className="eyebrow">Espace membre</p>
      <h1>Bienvenue dans votre espace Litho Intelligence</h1>
      <p className="section-lead">
        Suivez vos recommandations, vos favoris et vos rituels dans une expérience simple et premium.
      </p>

      <div className="dashboard-grid">
        <article className="card dashboard-hero-card">
          <h2>{premium ? "Plan Premium actif" : "Plan gratuit"}</h2>
          <p>
            {premium
              ? "Vous avez accès aux recommandations illimitées et aux modules avancés."
              : `Recommandations restantes aujourd'hui : ${recommendationUsage.remaining}`}
          </p>
          {!premium ? <CheckoutButton /> : <Link className="button secondary" href="/account">Gérer mon compte</Link>}
        </article>

        <article className="card">
          <h2>Pierre du jour</h2>
          <img className="stone-thumb wide" src={stoneOfDay.image.url} alt={stoneOfDay.image.alt} />
          <p>{stoneOfDay.name}</p>
          <Link className="button secondary" href={`/stone/${stoneOfDay.slug}`}>Voir la fiche</Link>
        </article>

        <article className="card">
          <h2>Favoris</h2>
          {favorites?.length ? (
            <ul>
              {favorites.map((favorite: any) => (
                <li key={favorite.id}>{favorite.stone_slug}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun favori pour le moment.</p>
          )}
        </article>
      </div>

      <PremiumGate featureName="l'historique complet">
        <section className="section compact-section no-side-padding">
          <h2>Historique complet</h2>
          <div className="result-list">
            {history?.length ? (
              history.map((item: any) => (
                <article className="card" key={item.id}>
                  <p>{new Date(item.created_at).toLocaleDateString("fr-FR")}</p>
                  <pre className="json-preview">{JSON.stringify(item.user_input, null, 2)}</pre>
                </article>
              ))
            ) : (
              <p>Aucune recommandation enregistrée.</p>
            )}
          </div>
        </section>
      </PremiumGate>
    </main>
  );
}
