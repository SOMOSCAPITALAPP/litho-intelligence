import { NextResponse } from "next/server";
import { getStoneRecommendations } from "@/lib/openai-recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";

export async function POST(request: Request) {
  const body = await request.json();
  const recommendations = await getStoneRecommendations({
    physical: body.physical,
    emotional: body.emotional,
    goal: body.goal
  });

  return NextResponse.json({
    disclaimer: wellbeingDisclaimer,
    ...recommendations
  });
}
