import { NextResponse } from "next/server";
import { getCurrentUser, isPremium } from "@/lib/auth";
import { ensureProfile } from "@/lib/profile";
import { checkUsageLimit } from "@/lib/usage";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getStone } from "@/lib/stones";

export async function POST(request: Request) {
  const { user, profile } = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Les favoris ne sont pas disponibles pour le moment." }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const stoneSlug = typeof body.stoneSlug === "string" ? body.stoneSlug.trim() : "";

  if (!stoneSlug || !getStone(stoneSlug)) {
    return NextResponse.json({ error: "Pierre introuvable." }, { status: 400 });
  }

  const ensuredProfile = profile ?? (await ensureProfile(user));
  const plan = ensuredProfile?.plan ?? "free";

  const { data: existing } = await admin
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("stone_slug", stoneSlug)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, active: true });
  }

  if (!isPremium(ensuredProfile)) {
    const usage = await checkUsageLimit(user.id, plan, "favorites");
    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: `Votre espace gratuit permet ${usage.limit} favoris. Passez Premium pour en garder davantage.`,
          upgradeRequired: true
        },
        { status: 402 }
      );
    }
  }

  const { error } = await admin.from("favorites").insert({
    user_id: user.id,
    stone_slug: stoneSlug
  });

  if (error) {
    return NextResponse.json({ error: "Impossible d'ajouter ce favori." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, active: true });
}
