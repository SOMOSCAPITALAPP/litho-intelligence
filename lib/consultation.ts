import { stones } from "@/lib/stones";

const OPENAI_MODEL = "gpt-4.1-mini";

type ConsultationStone = {
  slug: string;
  name: string;
  reason: string;
  braceletLabel: string;
  braceletUrl: string;
};

export type ConsultationInsight = {
  issue: string;
  reading: string;
  stoneNames: string[];
};

export type ConsultationResponse = {
  title: string;
  answer: string;
  grounding: string;
  insights: ConsultationInsight[];
  stones: ConsultationStone[];
  disclaimer: string;
};

export type ConsultationChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ConsultationProfile = {
  recipient?: string;
  age?: string;
  sex?: string;
};

export type ConsultationExperience = {
  chatMessage: string;
  consultation: ConsultationResponse;
};

const consultationSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "answer", "grounding", "chatMessage", "insights", "stones"],
  properties: {
    title: { type: "string" },
    answer: { type: "string" },
    grounding: { type: "string" },
    chatMessage: { type: "string" },
    insights: {
      type: "array",
      minItems: 2,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["issue", "reading", "stoneNames"],
        properties: {
          issue: { type: "string" },
          reading: { type: "string" },
          stoneNames: {
            type: "array",
            minItems: 1,
            maxItems: 3,
            items: { type: "string" }
          }
        }
      }
    },
    stones: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "reason"],
        properties: {
          name: { type: "string" },
          reason: { type: "string" }
        }
      }
    }
  }
};

const disclaimer =
  "Conseil basé sur les traditions de lithothérapie et une démarche de bien-être. Il ne remplace pas un avis médical, psychologique ou professionnel.";

export async function getConsultationExperience(
  question: string,
  profile: ConsultationProfile = {},
  history: ConsultationChatMessage[] = []
): Promise<ConsultationExperience> {
  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackExperience(question, profile);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.7,
        max_output_tokens: 900,
        input: [
          {
            role: "system",
            content:
              "Tu es un conseiller en lithothérapie prudent, chaleureux, humain et concret. Tu réponds en français naturel, élégant et varié. Évite les tournures répétitives, robotiques ou standardisées. Ne mentionne jamais que tu es une IA. N'insère aucun disclaimer dans le message de chat. Le message de chat doit être court, empathique, actif, personnalisé, poser une question utile si besoin et rappeler que la synthèse détaillée apparaît sous le dialogue. La synthèse globale doit être plus complète, structurée, avec tous les problèmes ou tensions soulevés, une lecture claire de chacun et les pierres idéales du catalogue pour chaque point. Aucune promesse médicale, aucun langage de guérison ou de traitement."
          },
          {
            role: "user",
            content: JSON.stringify({
              question,
              profile,
              history,
              available_stones: stones.map((stone) => ({
                name: stone.name,
                slug: stone.slug,
                properties: stone.properties,
                goals: stone.goals
              }))
            })
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "consultation_response",
            strict: true,
            schema: consultationSchema
          }
        }
      })
    });

    if (!response.ok) throw new Error("OPENAI_ERROR");

    const data = await response.json();
    const rawText =
      data.output_text ??
      data.output
        ?.flatMap((item: { content?: Array<{ type: string; text?: string }> }) => item.content ?? [])
        ?.find((item: { type: string }) => item.type === "output_text")?.text;

    if (!rawText) throw new Error("OPENAI_EMPTY_RESPONSE");

    return sanitizeConsultation(
      JSON.parse(rawText) as {
        title: string;
        answer: string;
        grounding: string;
        chatMessage: string;
        insights: Array<{ issue: string; reading: string; stoneNames: string[] }>;
        stones: Array<{ name: string; reason: string }>;
      },
      question,
      profile
    );
  } catch {
    return buildFallbackExperience(question, profile);
  }
}

function sanitizeConsultation(
  payload: {
    title: string;
    answer: string;
    grounding: string;
    chatMessage: string;
    insights: Array<{ issue: string; reading: string; stoneNames: string[] }>;
    stones: Array<{ name: string; reason: string }>;
  },
  question: string,
  profile: ConsultationProfile
): ConsultationExperience {
  const selected = payload.stones
    .map((item) => {
      const stone = stones.find((entry) => normalize(entry.name) === normalize(item.name));
      const product = stone?.products[0];
      if (!stone || !product) return null;
      return {
        slug: stone.slug,
        name: stone.name,
        reason: item.reason.slice(0, 220),
        braceletLabel: product.label,
        braceletUrl: product.url
      };
    })
    .filter(Boolean) as ConsultationStone[];

  const fallback = buildFallbackExperience(question, profile);

  const insights =
    payload.insights
      ?.map((insight) => ({
        issue: insight.issue.slice(0, 90),
        reading: insight.reading.slice(0, 260),
        stoneNames: insight.stoneNames.slice(0, 3)
      }))
      .filter((insight) => insight.issue && insight.reading) ?? [];

  return {
    chatMessage: payload.chatMessage.slice(0, 520),
    consultation: {
      title: payload.title.slice(0, 90),
      answer: payload.answer.slice(0, 1800),
      grounding: payload.grounding.slice(0, 260),
      insights: insights.length >= 2 ? insights : fallback.consultation.insights,
      stones: selected.length >= 3 ? selected.slice(0, 5) : fallback.consultation.stones,
      disclaimer
    }
  };
}

function buildFallbackExperience(question: string, profile: ConsultationProfile): ConsultationExperience {
  const defaults = ["labradorite", "quartz-rose", "amethyste", "oeil-de-tigre", "cornaline"]
    .map((slug) => stones.find((stone) => stone.slug === slug))
    .filter(Boolean)
    .map((stone) => ({
      slug: stone!.slug,
      name: stone!.name,
      reason: `Cette pierre peut accompagner symboliquement une période où vous cherchez plus de ${stone!.goals.slice(0, 2).join(" et ")}.`,
      braceletLabel: stone!.products[0]?.label ?? `Bracelet ${stone!.name}`,
      braceletUrl: stone!.products[0]?.url ?? "#"
    }))
    .filter((stone) => stone.braceletUrl !== "#");

  const recipient = profile.recipient?.trim() ? `pour ${profile.recipient.trim()}` : "pour la personne concernée";
  const hasAge = profile.age?.trim();
  const hasSex = profile.sex?.trim();
  const contextParts = [recipient, hasAge ? `avec un repère d’âge ${profile.age?.trim()}` : "", hasSex ? `et un contexte ${profile.sex?.trim()}` : ""]
    .filter(Boolean)
    .join(" ");

  return {
    chatMessage:
      question.trim().length > 0
        ? `Merci, je comprends mieux la situation ${contextParts}. Je vous laisse regarder la synthèse juste en dessous, puis nous pouvons affiner ensemble point par point si vous le souhaitez.`
        : "Je suis là pour vous aider. Dites-moi pour qui est ce conseil, l’âge, le sexe si c’est utile, puis ce que vous cherchez à apaiser, renforcer ou retrouver.",
    consultation: {
      title: "Première lecture de votre situation",
      answer:
        question.trim().length > 0
          ? "Votre demande montre surtout un besoin de recentrage, de protection émotionnelle et d’apaisement intérieur. Pour éviter de se disperser, mieux vaut partir sur quelques pierres très lisibles, chacune avec un rôle précis, puis observer ce qui soutient le plus la personne concernée au quotidien."
          : "Commencez par une intention simple, puis choisissez des pierres qui soutiennent l’apaisement, la clarté et la stabilité. Une sélection courte fonctionne souvent mieux qu’une accumulation de références.",
      grounding: "Gardez une intention principale aujourd’hui, puis observez quelles pierres apportent le plus de calme, de protection ou d’élan.",
      insights: [
        {
          issue: "Besoin d’apaisement",
          reading: "Quand la charge mentale ou émotionnelle prend trop de place, mieux vaut revenir à des pierres associées à la douceur, au calme et à la respiration intérieure.",
          stoneNames: ["Améthyste", "Quartz rose", "Lépidolite"]
        },
        {
          issue: "Besoin de protection émotionnelle",
          reading: "Si la personne se sent vite envahie, sensible ou poreuse à son entourage, des pierres liées au recentrage et à la protection symbolique sont plus adaptées.",
          stoneNames: ["Labradorite", "Obsidienne œil céleste", "Onyx"]
        },
        {
          issue: "Besoin de retrouver un élan plus stable",
          reading: "Quand l’envie, la confiance ou l’énergie baissent, il est souvent utile d’ajouter une pierre plus dynamique pour remettre du mouvement sans brusquer.",
          stoneNames: ["Œil de tigre", "Cornaline", "Pierre de soleil"]
        }
      ],
      stones: defaults.slice(0, 5),
      disclaimer
    }
  };
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
