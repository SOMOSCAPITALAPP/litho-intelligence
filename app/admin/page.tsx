import Link from "next/link";
import { redirect } from "next/navigation";
import { Activity, BarChart3, Database, Download, Mail, ShieldCheck, Sparkles, Users } from "lucide-react";
import { getAdminEmails, isAdminEmail } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin | Litho Intelligence"
};

export const dynamic = "force-dynamic";

type Metric = {
  label: string;
  value: number | string;
  detail: string;
  icon: typeof Users;
};

type LeadRow = {
  email: string | null;
  full_name?: string | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

type EventRow = {
  event_name: string;
  created_at: string | null;
  payload?: Record<string, unknown> | null;
};

type ProfileRow = {
  plan: string | null;
  created_at: string | null;
};

type AiUsageRow = {
  source: string | null;
  created_at: string | null;
};

type UsageRow = {
  date: string;
  recommendations_count: number | null;
  combinations_count: number | null;
};

type AdminStats = {
  metrics: Metric[];
  profilePlanCounts: Array<{ label: string; count: number }>;
  leadSources: Array<{ label: string; count: number }>;
  aiSources: Array<{ label: string; count: number }>;
  recentLeads: LeadRow[];
  recentEvents: EventRow[];
  todayUsage: { recommendations: number; combinations: number };
  errors: string[];
};

const formatDate = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Paris"
});

function isoDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function formatMaybeDate(value?: string | null) {
  if (!value) return "Non renseigné";
  return formatDate.format(new Date(value));
}

function countBy<T>(items: T[], getKey: (item: T) => string | null | undefined) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = getKey(item)?.trim() || "Non renseigné";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"));
}

function getLeadIntent(lead: LeadRow) {
  const intent = lead.metadata?.intent;
  return typeof intent === "string" ? intent : lead.source ?? "Non renseigné";
}

async function getTableCount(supabase: NonNullable<ReturnType<typeof createSupabaseAdminClient>>, table: string, since?: string) {
  if (since) {
    const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true }).gte("created_at", since);
    if (error) throw new Error(`${table}: ${error.message}`);
    return count ?? 0;
  }

  const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  return count ?? 0;
}

async function getRecentLeads(supabase: NonNullable<ReturnType<typeof createSupabaseAdminClient>>) {
  const enriched = await supabase
    .from("leads")
    .select("email, full_name, source, created_at, updated_at, metadata")
    .order("created_at", { ascending: false })
    .limit(12);

  if (!enriched.error) return { data: enriched.data as LeadRow[], error: null };

  const needsFallback =
    enriched.error.message.includes("full_name") ||
    enriched.error.message.includes("metadata") ||
    enriched.error.message.includes("updated_at");

  if (!needsFallback) return { data: [] as LeadRow[], error: enriched.error };

  const fallback = await supabase.from("leads").select("email, source, created_at").order("created_at", { ascending: false }).limit(12);
  return { data: (fallback.data ?? []) as LeadRow[], error: fallback.error };
}

async function getAdminStats(): Promise<AdminStats> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      metrics: [],
      profilePlanCounts: [],
      leadSources: [],
      aiSources: [],
      recentLeads: [],
      recentEvents: [],
      todayUsage: { recommendations: 0, combinations: 0 },
      errors: ["Supabase service role n'est pas configuré."]
    };
  }

  const errors: string[] = [];
  const since7Days = isoDaysAgo(7);
  const today = todayKey();

  async function safeCount(label: string, table: string, since?: string) {
    try {
      return await getTableCount(supabase, table, since);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `${label}: erreur inconnue`);
      return 0;
    }
  }

  const [
    totalProfiles,
    profiles7Days,
    totalLeads,
    leads7Days,
    totalEvents,
    events7Days,
    totalRecommendations,
    totalFavorites,
    totalConsultations,
    totalAiCalls,
    activeSubscriptions,
    totalProducts
  ] = await Promise.all([
    safeCount("profiles", "profiles"),
    safeCount("profiles récents", "profiles", since7Days),
    safeCount("leads", "leads"),
    safeCount("leads récents", "leads", since7Days),
    safeCount("events", "events"),
    safeCount("events récents", "events", since7Days),
    safeCount("recommendation_history", "recommendation_history"),
    safeCount("favorites", "favorites"),
    safeCount("consultation_sessions", "consultation_sessions"),
    safeCount("ai_usage_logs", "ai_usage_logs"),
    safeCount("subscriptions actives", "subscriptions"),
    safeCount("products", "products")
  ]);

  const [
    { data: recentEvents, error: eventsError },
    { data: profiles, error: profilesError },
    { data: aiUsage, error: aiError },
    { data: usageRows, error: usageError },
    { count: activePremiumCount, error: premiumError }
  ] = await Promise.all([
    supabase.from("events").select("event_name, created_at, payload").order("created_at", { ascending: false }).limit(12),
    supabase.from("profiles").select("plan, created_at").order("created_at", { ascending: false }).limit(500),
    supabase.from("ai_usage_logs").select("source, created_at").gte("created_at", since7Days).limit(500),
    supabase.from("usage_limits").select("date, recommendations_count, combinations_count").gte("date", today).limit(500),
    supabase.from("subscriptions").select("*", { count: "exact", head: true }).in("status", ["active", "trialing"])
  ]);

  const { data: recentLeads, error: leadsError } = await getRecentLeads(supabase);

  for (const error of [leadsError, eventsError, profilesError, aiError, usageError, premiumError]) {
    if (error) errors.push(error.message);
  }

  const typedProfiles = (profiles ?? []) as ProfileRow[];
  const typedAiUsage = (aiUsage ?? []) as AiUsageRow[];
  const typedUsage = (usageRows ?? []) as UsageRow[];

  const todayUsage = typedUsage.reduce(
    (acc, row) => ({
      recommendations: acc.recommendations + (row.recommendations_count ?? 0),
      combinations: acc.combinations + (row.combinations_count ?? 0)
    }),
    { recommendations: 0, combinations: 0 }
  );

  return {
    metrics: [
      { label: "Membres", value: totalProfiles, detail: `+${profiles7Days} sur 7 jours`, icon: Users },
      { label: "Emails capturés", value: totalLeads, detail: `+${leads7Days} sur 7 jours`, icon: Mail },
      { label: "Actions suivies", value: totalEvents, detail: `+${events7Days} sur 7 jours`, icon: Activity },
      { label: "Recommandations", value: totalRecommendations, detail: `${todayUsage.recommendations} aujourd'hui`, icon: Sparkles },
      { label: "Favoris", value: totalFavorites, detail: "Pierres enregistrées", icon: ShieldCheck },
      { label: "Consultations", value: totalConsultations, detail: "Sessions privées", icon: BarChart3 },
      { label: "Appels IA", value: totalAiCalls, detail: "Historique complet", icon: Database },
      { label: "Premium actifs", value: activePremiumCount ?? activeSubscriptions, detail: `${totalProducts} produits catalogués`, icon: Download }
    ],
    profilePlanCounts: countBy(typedProfiles, (profile) => profile.plan ?? "free"),
    leadSources: countBy((recentLeads ?? []) as LeadRow[], getLeadIntent),
    aiSources: countBy(typedAiUsage, (row) => row.source),
    recentLeads: (recentLeads ?? []) as LeadRow[],
    recentEvents: (recentEvents ?? []) as EventRow[],
    todayUsage,
    errors
  };
}

export default async function AdminPage() {
  const { user } = await getCurrentUser();
  if (!user) redirect("/login?redirect=/admin");

  const configuredAdmins = getAdminEmails();
  if (!configuredAdmins.length) {
    return (
      <main className="section admin-page">
        <p className="eyebrow">Admin</p>
        <h1>Configurer l'accès administrateur</h1>
        <p className="section-lead">
          Ajoutez la variable d'environnement <strong>ADMIN_EMAILS</strong> dans Vercel avec votre email de connexion, par exemple
          <code> vous@domaine.com</code>. Plusieurs emails peuvent être séparés par une virgule.
        </p>
        <Link className="button gold-button" href="/dashboard">
          Retour espace membre
        </Link>
      </main>
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <main className="section admin-page">
        <p className="eyebrow">Accès restreint</p>
        <h1>Cette page est réservée à l'administration.</h1>
        <p className="section-lead">
          Vous êtes connecté avec <strong>{user.email}</strong>, mais cet email n'est pas dans la liste admin.
        </p>
        <Link className="button secondary" href="/dashboard">
          Retour espace membre
        </Link>
      </main>
    );
  }

  const stats = await getAdminStats();

  return (
    <main className="section admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Pilotage</p>
          <h1>Admin Litho Intelligence</h1>
          <p className="section-lead">
            Suivez l'évolution de l'application : membres, emails capturés, recommandations, IA, produits et signaux récents.
          </p>
        </div>
        <Link className="button secondary" href="/system">
          Statut système
        </Link>
      </div>

      {stats.errors.length ? (
        <section className="admin-alert">
          <strong>Points à vérifier</strong>
          <ul>
            {stats.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="admin-metric-grid">
        {stats.metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article className="admin-metric-card" key={metric.label}>
              <span>
                <Icon size={18} />
              </span>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
              <small>{metric.detail}</small>
            </article>
          );
        })}
      </section>

      <section className="admin-grid">
        <article className="admin-panel">
          <h2>Plans membres</h2>
          <div className="admin-list">
            {stats.profilePlanCounts.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <h2>Sources emails récentes</h2>
          <div className="admin-list">
            {stats.leadSources.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.count}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <h2>IA sur 7 jours</h2>
          <div className="admin-list">
            {stats.aiSources.length ? (
              stats.aiSources.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </div>
              ))
            ) : (
              <p>Aucun appel IA récent.</p>
            )}
          </div>
        </article>
      </section>

      <section className="admin-grid">
        <article className="admin-panel admin-table-panel">
          <h2>Derniers emails capturés</h2>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>Source</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentLeads.map((lead) => (
                  <tr key={`${lead.email}-${lead.created_at}`}>
                    <td>{lead.email}</td>
                    <td>{lead.full_name || "—"}</td>
                    <td>{getLeadIntent(lead)}</td>
                    <td>{formatMaybeDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="admin-panel admin-table-panel">
          <h2>Derniers événements</h2>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Événement</th>
                  <th>Signal</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEvents.map((event) => (
                  <tr key={`${event.event_name}-${event.created_at}`}>
                    <td>{event.event_name}</td>
                    <td>{typeof event.payload?.source === "string" ? event.payload.source : "—"}</td>
                    <td>{formatMaybeDate(event.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  );
}
