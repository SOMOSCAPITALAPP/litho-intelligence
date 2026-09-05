import { neon } from "@neondatabase/serverless";

type NeonSql = ReturnType<typeof neon>;

let cachedSql: NeonSql | null = null;

export function isNeonConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function getNeonSql() {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) return null;

  cachedSql ??= neon(connectionString);
  return cachedSql;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown database error";
}
