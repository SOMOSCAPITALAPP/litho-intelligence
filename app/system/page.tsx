import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Statut système | Litho Intelligence"
};

export const dynamic = "force-dynamic";

const requiredTables = [
  "profiles",
  "subscriptions",
  "usage_limits",
  "favorites",
  "recommendation_history",
  "native_stones",
  "stones",
  "products",
  "ai_cache",
  "ai_usage_logs",
  "events",
  "leads"
];

const tableChecks: Record<string, string> = {
  profiles: "id",
  subscriptions: "id",
  usage_limits: "id",
  favorites: "id",
  recommendation_history: "id",
  native_stones: "slug",
  stones: "id",
  products: "id",
  ai_cache: "id",
  ai_usage_logs: "id",
  events: "id",
  leads: "id"
};

export default async function SystemPage() {
  const supabase = createSupabaseAdminClient();
  const tableStatus: Array<{ table: string; ok: boolean }> = [];

  if (supabase) {
    for (const table of requiredTables) {
      const { error } = await supabase.from(table).select(tableChecks[table] ?? "*").limit(1);
      tableStatus.push({ table, ok: !error });
    }
  }

  const services = [
    ["Supabase public", Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)],
    ["Supabase service role", Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)],
    ["OpenAI", Boolean(process.env.OPENAI_API_KEY)],
    ["Stripe secret", Boolean(process.env.STRIPE_SECRET_KEY)],
    ["Stripe prix Premium", Boolean(process.env.STRIPE_PREMIUM_PRICE_ID)],
    ["Stripe webhook", Boolean(process.env.STRIPE_WEBHOOK_SECRET)],
    ["URL application", Boolean(process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL)]
  ];

  return (
    <main className="section">
      <p className="eyebrow">Production</p>
      <h1>Statut système</h1>
      <p className="section-lead">
        Cette page vérifie que la base membres, produits, data, Premium et IA est prête côté environnement.
      </p>

      <div className="grid">
        {services.map(([label, ok]) => (
          <article className="card" key={String(label)}>
            <h2>{label}</h2>
            <p className={ok ? "status-ok" : "status-warn"}>{ok ? "Configuré" : "À configurer"}</p>
          </article>
        ))}
      </div>

      <section className="section compact-section no-side-padding">
        <h2>Tables Supabase</h2>
        <div className="grid">
          {(tableStatus.length ? tableStatus : requiredTables.map((table) => ({ table, ok: false }))).map((item) => (
            <article className="card" key={item.table}>
              <h3>{item.table}</h3>
              <p className={item.ok ? "status-ok" : "status-warn"}>{item.ok ? "OK" : "Manquante ou inaccessible"}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
