import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { ensureProfile } from "@/lib/profile";
import { analyzeCombination } from "@/lib/recommendation";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { stones } from "@/lib/stones";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { selected?: unknown };
  const selected = Array.isArray(body.selected)
    ? body.selected.filter((item: unknown): item is string => typeof item === "string").map((item) => item.trim())
    : [];
  const knownSlugs = new Set(stones.map((stone) => stone.slug));
  const slugs = Array.from(new Set(selected.filter((slug) => knownSlugs.has(slug)))).slice(0, 12);

  if (slugs.length < 2) {
    return NextResponse.json({ error: "Sélectionnez au moins deux pierres à analyser." }, { status: 400 });
  }

  const { user, profile } = await getCurrentUser();
  const ensuredProfile = user ? profile ?? (await ensureProfile(user)) : null;
  const plan = ensuredProfile?.plan ?? "free";

  if (user && plan === "free") {
    const usage = await checkUsageLimit(user.id, plan, "combinations");
    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: "Votre analyse gratuite de combinaison est déjà utilisée. Passez Premium pour analyser sans limite.",
          upgradeRequired: true
        },
        { status: 402 }
      );
    }
  }

  const analysis = analyzeCombination(slugs);

  if (user && plan === "free") {
    await incrementUsage(user.id, "combinations");
  }

  return NextResponse.json({ analysis });
}
