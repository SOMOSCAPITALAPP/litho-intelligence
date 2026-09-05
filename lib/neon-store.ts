import { getErrorMessage, getNeonSql } from "@/lib/neon";

export type DatabaseWriteResult =
  | { ok: true; skipped?: false }
  | { ok: true; skipped: true; reason: "missing_database_url" }
  | { ok: false; error: string };

type LeadRecord = {
  email: string;
  fullName?: string;
  source: string;
  consent: boolean;
  metadata?: Record<string, unknown>;
};

type EventRecord = {
  eventName: string;
  payload?: Record<string, unknown>;
  userId?: string | null;
};

export async function saveLeadToNeon(record: LeadRecord): Promise<DatabaseWriteResult> {
  const sql = getNeonSql();
  if (!sql) return { ok: true, skipped: true, reason: "missing_database_url" };

  const metadata = JSON.stringify(record.metadata ?? {});

  try {
    await sql`
      insert into leads (email, full_name, source, consent, metadata, updated_at)
      values (${record.email}, ${record.fullName || null}, ${record.source}, ${record.consent}, ${metadata}::jsonb, now())
      on conflict (email) do update set
        full_name = coalesce(excluded.full_name, leads.full_name),
        source = excluded.source,
        consent = leads.consent or excluded.consent,
        metadata = coalesce(leads.metadata, '{}'::jsonb) || excluded.metadata,
        updated_at = now()
    `;

    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}

export async function trackEventToNeon(record: EventRecord): Promise<DatabaseWriteResult> {
  const sql = getNeonSql();
  if (!sql) return { ok: true, skipped: true, reason: "missing_database_url" };

  const payload = JSON.stringify(record.payload ?? {});

  try {
    await sql`
      insert into events (user_id, event_name, payload)
      values (${record.userId ?? null}, ${record.eventName}, ${payload}::jsonb)
    `;

    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}
