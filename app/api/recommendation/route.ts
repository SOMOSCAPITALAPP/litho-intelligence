import { NextResponse } from "next/server";
import { recommendStones } from "@/lib/recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";

export async function POST(request: Request) {
  const body = await request.json();
  const recommendations = recommendStones({
    physical: body.physical,
    emotional: body.emotional,
    goal: body.goal
  }).map((item) => ({
    name: item.stone.name,
    slug: item.stone.slug,
    score: item.score,
    reason: item.reason,
    intention: item.intention,
    usage: item.usage
  }));

  return NextResponse.json({
    disclaimer: wellbeingDisclaimer,
    stones: recommendations
  });
}
