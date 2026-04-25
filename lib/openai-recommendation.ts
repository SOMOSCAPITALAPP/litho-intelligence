import { recommendStones, type RecommendationInput } from "@/lib/recommendation";
import { getGlobalFallback, getInputHash, getLocalMatch, normalizeInput } from "@/lib/stoneRules";
import { stonesContext } from "@/lib/stoneKnowledge";
import { stones } from "@/lib/stones";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { MembershipPlan } from "@/lib/plans";

export type AIRecommendationSource = "local" | "cache" | "ai" | "fallback";

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
  source: AIRecommendationSource;
};

export type RecommendationUser = {
  id?: string | null;
  plan?: MembershipPlan;
};

type OpenAIStonePayload = {
  name: string;
  score: number | string;
  reason: string;
  usage: string;
};

type OpenAIResponsePayload = {
  stones: OpenAIStonePayload[];
};

const OPENAI_MODEL = "gpt-4.1-mini";
const MAX_OUTPUT_TOKENS = 300;
const TEMPERATURE = 0.7;

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
        required: ["name", "score", "reason", "usage"],
        properties: {
          name: { type: "string" },
          score: { type: "integer", minimum: 1, maximum: 99 },
          reason: { type: "string" },
          usage: { type: "string" }
        }
      }
    }
  }
};

export async function getStoneRecommendations(
  input: RecommendationInput,
  user: RecommendationUser = {}
): Promise<AIRecommendationResponse> {
  const normalized = normalizeRecommendationInput(input);
  if (!normalizeInput(normalized)) {
    const fallback = getGlobalFallback();
    await logAIUsage(user.id, normalized, "fallback", { reason: "EMPTY_INPUT" });
    return fallback;
  }

  const local = getLocalMatch(normalized);
  if (local) {
    await logAIUsage(user.id, normalized, "local");
    return local;
  }

  const cached = await getCachedResult(normalized);
  if (cached) {
    await logAIUsage(user.id, normalized, "cache");
    return cached;
  }

  const aiAllowed = await checkAIUsageLimit(user.id, user.plan ?? "free");
  if (!aiAllowed.allowed) {
    const fallback = getFallbackRecommendations(normalized, "fallback");
    await logAIUsage(user.id, normalized, "fallback", { reason: aiAllowed.reason });
    return fallback;
  }

  try {
    const aiResult = await callOpenAI(normalized);
    await saveCachedResult(normalized, aiResult);
    await logAIUsage(user.id, normalized, "ai");
    return aiResult;
  } catch {
    const fallback = getFallbackRecommendations(normalized, "fallback");
    await logAIUsage(user.id, normalized, "fallback", { reason: "OPENAI_ERROR" });
    return fallback;
  }
}

export async function getCachedResult(input: RecommendationInput) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("ai_cache")
    .select("response_json")
    .eq("input_hash", getInputHash(input))
    .maybeSingle();

  if (!data?.response_json) return null;
  return {
    ...(data.response_json as AIRecommendationResponse),
    source: "cache" as const
  };
}

export async function saveCachedResult(input: RecommendationInput, result: AIRecommendationResponse) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  await supabase.from("ai_cache").upsert(
    {
      input_hash: getInputHash(input),
      response_json: result
    },
    { onConflict: "input_hash" }
  );
}

export async function checkAIUsageLimit(userId: string | null | undefined, userPlan: MembershipPlan) {
  const supabase = createSupabaseAdminClient();
  const maxDailyCalls = Number(process.env.MAX_DAILY_AI_CALLS ?? 500);
  const today = new Date().toISOString().slice(0, 10);

  if (!supabase) return { allowed: false, reason: "AI_COUNTER_UNAVAILABLE" };

  const { count: globalCalls } = await supabase
    .from("ai_usage_logs")
    .select("*", { count: "exact", head: true })
    .eq("source", "ai")
    .gte("created_at", `${today}T00:00:00.000Z`);

  if ((globalCalls ?? 0) >= maxDailyCalls) return { allowed: false, reason: "GLOBAL_AI_LIMIT_REACHED" };
  if (userPlan === "premium" || userPlan === "elite" || !userId) return { allowed: true };

  const { count: userCalls } = await supabase
    .from("ai_usage_logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("source", "ai")
    .gte("created_at", `${today}T00:00:00.000Z`);

  if ((userCalls ?? 0) >= 1) return { allowed: false, reason: "FREE_AI_LIMIT_REACHED" };
  return { allowed: true };
}

export async function callOpenAI(input: RecommendationInput): Promise<AIRecommendationResponse> {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY_MISSING");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: TEMPERATURE,
      max_output_tokens: MAX_OUTPUT_TOKENS,
      input: [
        {
          role: "system",
          content:
            "Tu es expert en lithothérapie. Règles : pas de médecine, pas de promesse médicale, réponses courtes, format JSON strict. Recommande uniquement des pierres du catalogue fourni."
        },
        {
          role: "user",
          content: JSON.stringify({
            input,
            stones_context: stonesContext,
            format: {
              stones: [{ name: "", score: 0, reason: "", usage: "" }]
            }
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

  if (!response.ok) throw new Error(`OPENAI_${response.status}`);

  const data = await response.json();
  const rawText =
    data.output_text ??
    data.output
      ?.flatMap((item: { content?: Array<{ type: string; text?: string }> }) => item.content ?? [])
      ?.find((item: { type: string }) => item.type === "output_text")?.text;

  if (!rawText) throw new Error("OPENAI_EMPTY_RESPONSE");
  return sanitizeRecommendations(JSON.parse(rawText) as OpenAIResponsePayload, input, "ai");
}

function normalizeRecommendationInput(input: RecommendationInput): RecommendationInput {
  return {
    physical: normalizeInput(input.physical ?? ""),
    emotional: normalizeInput(input.emotional ?? ""),
    goal: normalizeInput(input.goal ?? "")
  };
}

function getFallbackRecommendations(input: RecommendationInput, source: AIRecommendationSource): AIRecommendationResponse {
  const ranked = recommendStones(input).slice(0, 5);
  if (!ranked.length) return { ...getGlobalFallback(), source };

  return {
    source,
    stones: ranked.map((item) => ({
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

function sanitizeRecommendations(
  response: OpenAIResponsePayload,
  input: RecommendationInput,
  source: AIRecommendationSource
): AIRecommendationResponse {
  const fallback = getFallbackRecommendations(input, "fallback");
  const valid = response.stones
    .map((item) => {
      const match = stones.find((stone) => normalizeInput(stone.name) === normalizeInput(item.name));
      if (!match) return null;

      return {
        name: match.name,
        slug: match.slug,
        score: Math.max(1, Math.min(99, Math.round(Number(item.score)) || 80)),
        emotional_message: `${match.name} répond à votre besoin avec une intention simple et rassurante.`,
        reason: item.reason.slice(0, 180),
        usage: item.usage.slice(0, 160),
        ritual: "Respirez pendant 2 minutes avec la pierre, puis choisissez une action douce à poser aujourd'hui.",
        warning: "Basé sur des pratiques traditionnelles de bien-être non scientifiques."
      };
    })
    .filter(Boolean) as AIStoneRecommendation[];

  return { stones: valid.length >= 3 ? valid.slice(0, 5) : fallback.stones, source };
}

async function logAIUsage(
  userId: string | null | undefined,
  input: RecommendationInput,
  source: AIRecommendationSource,
  payload: Record<string, unknown> = {}
) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  await supabase.from("ai_usage_logs").insert({
    user_id: userId ?? null,
    input,
    source,
    payload
  });
}
