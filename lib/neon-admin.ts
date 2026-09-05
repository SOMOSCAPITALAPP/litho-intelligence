import { getErrorMessage, getNeonSql, isNeonConfigured } from "@/lib/neon";

export type NeonAdminLead = {
  email: string | null;
  full_name: string | null;
  source: string | null;
  created_at: string | null;
  updated_at: string | null;
  metadata: Record<string, unknown> | null;
};

export type NeonAdminEvent = {
  event_name: string;
  created_at: string | null;
  payload: Record<string, unknown> | null;
};

export type NeonAdminProfile = {
  plan: string | null;
  created_at: string | null;
};

export type NeonAdminStats = {
  totalProfiles: number;
  profiles7Days: number;
  totalLeads: number;
  leads7Days: number;
  totalEvents: number;
  events7Days: number;
  recentLeads: NeonAdminLead[];
  recentEvents: NeonAdminEvent[];
  profiles: NeonAdminProfile[];
  errors: string[];
};

function asRows<T>(result: unknown): T[] {
  return Array.isArray(result) ? (result as T[]) : [];
}

function asCount(result: unknown) {
  const row = asRows<{ count: string | number }>(result)[0];
  return Number(row?.count ?? 0);
}

export async function getNeonAdminStats(since7Days: string): Promise<NeonAdminStats | null> {
  if (!isNeonConfigured()) return null;

  const sql = getNeonSql();
  if (!sql) return null;

  const errors: string[] = [];

  try {
    const [
      totalProfiles,
      profiles7Days,
      totalLeads,
      leads7Days,
      totalEvents,
      events7Days,
      recentLeads,
      recentEvents,
      profiles
    ] = await Promise.all([
      sql`select count(*)::int as count from app_users`.catch((error) => {
        errors.push(`app_users: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`select count(*)::int as count from app_users where created_at >= ${since7Days}`.catch((error) => {
        errors.push(`app_users récents: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`select count(*)::int as count from leads`.catch((error) => {
        errors.push(`leads: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`select count(*)::int as count from leads where created_at >= ${since7Days}`.catch((error) => {
        errors.push(`leads récents: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`select count(*)::int as count from events`.catch((error) => {
        errors.push(`events: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`select count(*)::int as count from events where created_at >= ${since7Days}`.catch((error) => {
        errors.push(`events récents: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`
        select email, full_name, source, created_at::text, updated_at::text, metadata
        from leads
        order by created_at desc
        limit 12
      `.catch((error) => {
        errors.push(`leads récents: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`
        select event_name, created_at::text, payload
        from events
        order by created_at desc
        limit 12
      `.catch((error) => {
        errors.push(`events récents: ${getErrorMessage(error)}`);
        return [];
      }),
      sql`
        select plan, created_at::text
        from app_users
        order by created_at desc
        limit 500
      `.catch((error) => {
        errors.push(`plans membres: ${getErrorMessage(error)}`);
        return [];
      })
    ]);

    return {
      totalProfiles: asCount(totalProfiles),
      profiles7Days: asCount(profiles7Days),
      totalLeads: asCount(totalLeads),
      leads7Days: asCount(leads7Days),
      totalEvents: asCount(totalEvents),
      events7Days: asCount(events7Days),
      recentLeads: asRows<NeonAdminLead>(recentLeads),
      recentEvents: asRows<NeonAdminEvent>(recentEvents),
      profiles: asRows<NeonAdminProfile>(profiles),
      errors
    };
  } catch (error) {
    return {
      totalProfiles: 0,
      profiles7Days: 0,
      totalLeads: 0,
      leads7Days: 0,
      totalEvents: 0,
      events7Days: 0,
      recentLeads: [],
      recentEvents: [],
      profiles: [],
      errors: [getErrorMessage(error)]
    };
  }
}
