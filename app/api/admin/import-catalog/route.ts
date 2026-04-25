import { NextResponse } from "next/server";
import nativeStones from "@/data/stones.seed.json";
import products from "@/data/products.seed.json";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

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

  const nativeResult = await supabase.from("native_stones").upsert(nativeStones, { onConflict: "slug" });
  if (nativeResult.error) {
    return NextResponse.json({ error: nativeResult.error.message, step: "native_stones" }, { status: 500 });
  }

  const stonesResult = await supabase.from("stones").upsert(stoneRows, { onConflict: "id" });
  if (stonesResult.error) {
    return NextResponse.json({ error: stonesResult.error.message, step: "stones" }, { status: 500 });
  }

  const productsResult = await supabase.from("products").upsert(productRows, { onConflict: "id" });
  if (productsResult.error) {
    return NextResponse.json({ error: productsResult.error.message, step: "products" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    imported: {
      native_stones: nativeStones.length,
      stones: stoneRows.length,
      products: productRows.length
    }
  });
}
