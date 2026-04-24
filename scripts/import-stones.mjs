import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Variables manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requises.");
  process.exit(1);
}

const filePath = resolve(process.cwd(), "data/stones.seed.json");
const raw = await readFile(filePath, "utf8");
const stones = JSON.parse(raw);

if (!Array.isArray(stones) || stones.length === 0) {
  console.error("Le fichier data/stones.seed.json doit contenir une liste de pierres.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const { error } = await supabase.from("native_stones").upsert(stones, {
  onConflict: "slug"
});

if (error) {
  console.error("Import impossible :", error.message);
  process.exit(1);
}

console.log(`${stones.length} fiches pierres importées dans native_stones.`);
