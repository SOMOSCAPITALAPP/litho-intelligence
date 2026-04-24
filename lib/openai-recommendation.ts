import { recommendStones, type RecommendationInput } from "@/lib/recommendation";
import { stones } from "@/lib/stones";

export type AIStoneRecommendation = {
  name: string;
  slug: string;
  score: number;
  emotional_message: string;
  reason: string;
  usage: string;
  ritual: string;
  warning: string;
};

export type AIRecommendationResponse = {
  stones: AIStoneRecommendation[];
};

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["stones"],
  properties: {
    stones: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "slug", "score", "emotional_message", "reason", "usage", "ritual", "warning"],
        properties: {
          name: { type: "string" },
          slug: { type: "string" },
          score: { type: "integer", minimum: 1, maximum: 99 },
          emotional_message: { type: "string" },
          reason: { type: "string" },
          usage: { type: "string" },
          ritual: { type: "string" },
          warning: { type: "string" }
        }
      }
    }
  }
};

export async function getStoneRecommendations(input: RecommendationInput): Promise<AIRecommendationResponse> {
  if (!process.env.OPENAI_API_KEY) {
    return getFallbackRecommendations(input);
  }

  try {
    const catalog = stones.map((stone) => ({
      name: stone.name,
      slug: stone.slug,
      properties: stone.properties,
      emotions: stone.emotions,
      goals: stone.goals,
      usage: stone.usage
    }));

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_RECOMMENDATION_MODEL ?? "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "Tu es un conseiller premium en lithothérapie traditionnelle non médicale. Tu recommandes uniquement des pierres présentes dans le catalogue fourni. Ne fais jamais de promesse médicale, scientifique, de guérison ou de traitement. Ton style est empathique, simple, rassurant et orienté action."
          },
          {
            role: "user",
            content: JSON.stringify({
              userInput: input,
              catalog
            })
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "stone_recommendations",
            strict: true,
            schema
          }
        }
      })
    });

    if (!response.ok) {
      return getFallbackRecommendations(input);
    }

    const data = await response.json();
    const rawText = data.output_text ?? data.output?.flatMap((item: any) => item.content ?? [])?.find((item: any) => item.type === "output_text")?.text;
    if (!rawText) return getFallbackRecommendations(input);

    const parsed = JSON.parse(rawText) as AIRecommendationResponse;
    return sanitizeRecommendations(parsed, input);
  } catch {
    return getFallbackRecommendations(input);
  }
}

function getFallbackRecommendations(input: RecommendationInput): AIRecommendationResponse {
  return {
    stones: recommendStones(input).map((item) => ({
      name: item.stone.name,
      slug: item.stone.slug,
      score: item.score,
      emotional_message: item.intention,
      reason: item.reason,
      usage: item.usage,
      ritual: "Prenez 2 minutes, tenez la pierre ou visualisez-la, puis respirez lentement en posant une intention simple.",
      warning: "Basé sur des pratiques traditionnelles de bien-être non scientifiques."
    }))
  };
}

function sanitizeRecommendations(response: AIRecommendationResponse, input: RecommendationInput): AIRecommendationResponse {
  const fallback = getFallbackRecommendations(input);
  const valid = response.stones
    .map((item) => {
      const match = stones.find((stone) => stone.slug === item.slug || stone.name.toLowerCase() === item.name.toLowerCase());
      if (!match) return null;
      return {
        ...item,
        name: match.name,
        slug: match.slug,
        score: Math.max(1, Math.min(99, Math.round(item.score))),
        warning: "Basé sur des pratiques traditionnelles de bien-être non scientifiques."
      };
    })
    .filter(Boolean) as AIStoneRecommendation[];

  return { stones: valid.length >= 3 ? valid.slice(0, 5) : fallback.stones };
}
