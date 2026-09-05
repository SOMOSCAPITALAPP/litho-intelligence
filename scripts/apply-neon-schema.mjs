import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

async function loadEnvFile(path) {
  const content = await readFile(path, "utf8").catch(() => "");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] ??= value;
  }
}

await loadEnvFile(resolve(process.cwd(), ".env.local"));

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("DATABASE_URL ou POSTGRES_URL est manquant. Connectez Neon au projet Vercel puis relancez ce script.");
  process.exit(1);
}

const schema = await readFile(resolve(process.cwd(), "neon", "schema.sql"), "utf8");
const sql = neon(connectionString);

function splitSqlStatements(input) {
  const statements = [];
  let current = "";
  let inDollarQuote = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === "$" && next === "$") {
      inDollarQuote = !inDollarQuote;
      current += "$$";
      index += 1;
      continue;
    }

    if (char === ";" && !inDollarQuote) {
      const statement = current.trim();
      if (statement) statements.push(statement);
      current = "";
      continue;
    }

    current += char;
  }

  const last = current.trim();
  if (last) statements.push(last);
  return statements;
}

for (const statement of splitSqlStatements(schema)) {
  await sql.query(statement);
}

console.log("Neon schema applied.");
