import { NextResponse } from "next/server";
import { getStoneRecommendations } from "@/lib/openai-recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";
import { trackEvent } from "@/lib/analytics";

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

  if (user && admin) {
    const { data: profile } = await admin.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    const plan = profile?.plan ?? "free";
    const usage = await checkUsageLimit(user.id, plan, "recommendations");
    if (!usage.allowed) {
      await trackEvent("limit_reached", { feature: "recommendations" }, user.id);
      return NextResponse.json(
        {
          error: "Votre acces gratuit du jour est termine. Passez Premium pour continuer sans limite.",
          upgradeRequired: true
        },
        { status: 402 }
      );
    }
  }

  const recommendations = await getStoneRecommendations(input);

  if (user && admin) {
    await incrementUsage(user.id, "recommendations");
    await admin.from("recommendation_history").insert({
      user_id: user.id,
      user_input: input,
      result: recommendations
    });
    await trackEvent("recommendation_generated", { source: "ai" }, user.id);
  }

  return NextResponse.json({
    disclaimer: wellbeingDisclaimer,
    ...recommendations
  });
}
