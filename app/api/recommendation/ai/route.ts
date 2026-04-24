import { NextResponse } from "next/server";
import { getStoneRecommendations } from "@/lib/openai-recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { trackEvent } from "@/lib/analytics";
import type { MembershipPlan } from "@/lib/plans";

export async function POST(request: Request) {
  const body = await request.json();
  const input = {
    physical: body.physical,
    emotional: body.emotional,
    goal: body.goal
  };
  const supabase = createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

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
