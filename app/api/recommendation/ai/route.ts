import { NextResponse } from "next/server";
import { getStoneRecommendations } from "@/lib/openai-recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { trackEvent } from "@/lib/analytics";
import type { MembershipPlan } from "@/lib/plans";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";

function cleanInput(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 240) : "";
}

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  const requestLimit = checkRateLimit({
    key: `recommendation-ai:ip:${ip}`,
    limit: 30,
    windowMs: 10 * 60 * 1000
  });

  if (!requestLimit.allowed) {
    return NextResponse.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const input = {
    physical: cleanInput(body.physical),
    emotional: cleanInput(body.emotional),
    goal: cleanInput(body.goal)
  };

  if (!input.physical && !input.emotional && !input.goal) {
    return NextResponse.json({ error: "Indiquez au moins un besoin." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!user) {
    const anonymousLimit = checkRateLimit({
      key: `recommendation-ai:anonymous:${ip}`,
      limit: 5,
      windowMs: 60 * 60 * 1000
    });

    if (!anonymousLimit.allowed) {
      return NextResponse.json({ error: "Créez un compte gratuit pour continuer les recommandations." }, { status: 429 });
    }
  }

  let plan: MembershipPlan = "free";

  if (user && admin) {
    const { data: profile } = await admin.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    plan = (profile?.plan ?? "free") as MembershipPlan;
    const usage = await checkUsageLimit(user.id, plan, "recommendations");
    if (!usage.allowed) {
      await trackEvent("limit_reached", { feature: "recommendations" }, user.id);
      return NextResponse.json(
        {
          error: "Votre accès gratuit du jour est terminé. Passez Premium pour continuer sans limite.",
          upgradeRequired: true
        },
        { status: 402 }
      );
    }
  }

  const recommendations = await getStoneRecommendations(input, {
    id: user?.id,
    plan
  });

  if (user && admin) {
    await incrementUsage(user.id, "recommendations");
    await admin.from("recommendation_history").insert({
      user_id: user.id,
      user_input: input,
      result: recommendations
    });
    await trackEvent("recommendation_generated", { source: recommendations.source }, user.id);
  }

  return NextResponse.json({
    disclaimer: wellbeingDisclaimer,
    ...recommendations
  });
}
