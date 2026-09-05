import bcrypt from "bcryptjs";
import { getErrorMessage, getNeonSql } from "@/lib/neon";
import type { MembershipPlan } from "@/lib/plans";

export type NeonAuthUser = {
  id: string;
  email: string;
  full_name: string | null;
  plan: MembershipPlan;
  stripe_customer_id: string | null;
  newsletter_opt_in: boolean;
};

type NeonAuthUserWithPassword = NeonAuthUser & {
  password_hash: string;
};

export type CreateNeonUserResult =
  | { ok: true; user: NeonAuthUser }
  | { ok: false; status: number; error: string; code?: "missing_database_url" | "user_exists" | "database_error" };

function normalizeUser(row: Record<string, unknown>): NeonAuthUser {
  return {
    id: String(row.id),
    email: String(row.email),
    full_name: typeof row.full_name === "string" ? row.full_name : null,
    plan: (row.plan === "premium" || row.plan === "elite" ? row.plan : "free") as MembershipPlan,
    stripe_customer_id: typeof row.stripe_customer_id === "string" ? row.stripe_customer_id : null,
    newsletter_opt_in: row.newsletter_opt_in === true
  };
}

function asRows(result: unknown): Array<Record<string, unknown>> {
  return Array.isArray(result) ? (result as Array<Record<string, unknown>>) : [];
}

export async function createNeonUser(input: {
  email: string;
  password: string;
  fullName?: string;
  newsletterOptIn?: boolean;
}): Promise<CreateNeonUserResult> {
  const sql = getNeonSql();
  if (!sql) {
    return { ok: false, status: 503, code: "missing_database_url", error: "Neon is not configured" };
  }

  try {
    const passwordHash = await bcrypt.hash(input.password, 12);
    const rows = asRows(await sql`
      insert into app_users (email, password_hash, full_name, newsletter_opt_in)
      values (${input.email}, ${passwordHash}, ${input.fullName || null}, ${Boolean(input.newsletterOptIn)})
      returning id::text, email, full_name, plan, stripe_customer_id, newsletter_opt_in
    `);

    return { ok: true, user: normalizeUser(rows[0] as Record<string, unknown>) };
  } catch (error) {
    const message = getErrorMessage(error);
    if (message.toLowerCase().includes("duplicate") || message.includes("app_users_email_key")) {
      return { ok: false, status: 409, code: "user_exists", error: "Un compte existe déjà avec cet email." };
    }

    return { ok: false, status: 500, code: "database_error", error: message };
  }
}

export async function getNeonUserByEmail(email: string): Promise<NeonAuthUserWithPassword | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  const rows = asRows(await sql`
    select id::text, email, password_hash, full_name, plan, stripe_customer_id, newsletter_opt_in
    from app_users
    where email = ${email}
    limit 1
  `);

  const row = rows[0] as Record<string, unknown> | undefined;
  if (!row || typeof row.password_hash !== "string") return null;

  return {
    ...normalizeUser(row),
    password_hash: row.password_hash
  };
}

export async function getNeonUserById(id: string): Promise<NeonAuthUser | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  const rows = asRows(await sql`
    select id::text, email, full_name, plan, stripe_customer_id, newsletter_opt_in
    from app_users
    where id = ${id}
    limit 1
  `);

  const row = rows[0] as Record<string, unknown> | undefined;
  return row ? normalizeUser(row) : null;
}

export async function verifyNeonCredentials(email: string, password: string) {
  const user = await getNeonUserByEmail(email);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const { password_hash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function recordNeonMemberLead(input: {
  email: string;
  fullName?: string;
  newsletterOptIn?: boolean;
}) {
  const sql = getNeonSql();
  if (!sql) return;

  const metadata = JSON.stringify({
    intent: "free_member_signup",
    auth_provider: "nextauth",
    captured_at: new Date().toISOString()
  });

  await sql`
    insert into leads (email, full_name, source, consent, metadata, updated_at)
    values (${input.email}, ${input.fullName || null}, 'membre-gratuit', ${Boolean(input.newsletterOptIn)}, ${metadata}::jsonb, now())
    on conflict (email) do update set
      full_name = coalesce(excluded.full_name, leads.full_name),
      source = excluded.source,
      consent = leads.consent or excluded.consent,
      metadata = coalesce(leads.metadata, '{}'::jsonb) || excluded.metadata,
      updated_at = now()
  `;
}
