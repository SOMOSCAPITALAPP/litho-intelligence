import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Variables manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requises.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

const readJson = async (path) => JSON.parse(await readFile(resolve(process.cwd(), path), "utf8"));
const nativeStones = await readJson("data/stones.seed.json");
const products = await readJson("data/products.seed.json");

const stoneRows = nativeStones.map((stone) => ({
  id: stone.slug,
  name: stone.name,
  category: stone.intentions[0] ?? "bien-être",
  description: stone.short_description,
  origins: [],
  colors: stone.colors,
  chakra: stone.chakras,
  elements: [],
  emotions: stone.emotional_keywords,
  intentions: stone.intentions,
  properties: stone.traditional_uses,
  usage: stone.usage_advice,
  rituals: [`Respirer 3 minutes avec une intention de ${stone.intentions[0] ?? "présence"}.`],
  combinations_positive: stone.positive_combinations,
  combinations_negative: stone.avoid_combinations,
  purification: stone.purification,
  recharge: stone.recharge,
  price_range: "10-30€",
  seo_keywords: [stone.seo_title, `${stone.name} signification`, `${stone.name} bracelet`]
}));

const productRows = products.map((product) => ({
  id: `product-${product.stone_slug}`,
  stone_id: product.stone_slug,
  title: product.title,
  brand: product.brand,
  price: null,
  amazon_url: product.amazon_url,
  image_url: product.image_url,
  margin_estimate: null
}));

await run("native_stones", nativeStones);
await run("stones", stoneRows);
await run("products", productRows);

console.log(`${nativeStones.length} pierres natives importées.`);
console.log(`${stoneRows.length} lignes stones importées.`);
console.log(`${productRows.length} produits importés.`);

async function run(table, rows) {
  const { error } = await supabase.from(table).upsert(rows, {
    onConflict: table === "products" ? "id" : table === "native_stones" ? "slug" : "id"
  });

  if (error) {
    console.error(`Import ${table} impossible :`, error.message);
    process.exit(1);
  }
}
