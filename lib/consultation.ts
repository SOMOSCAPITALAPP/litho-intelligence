import { stones } from "@/lib/stones";

const OPENAI_MODEL = "gpt-4.1-mini";

type ConsultationStone = {
  slug: string;
  name: string;
  reason: string;
  braceletLabel: string;
  braceletUrl: string;
};

export type ConsultationResponse = {
  title: string;
  answer: string;
  grounding: string;
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
  required: ["title", "answer", "grounding", "chatMessage", "stones"],
  properties: {
    title: { type: "string" },
    answer: { type: "string" },
    grounding: { type: "string" },
    chatMessage: { type: "string" },
    stones: {
      type: "array",
      minItems: 2,
      maxItems: 3,
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
        max_output_tokens: 700,
        input: [
          {
            role: "system",
            content:
              "Tu es un conseiller en lithothérapie prudent, chaleureux et concret. Tu réponds en français clair. Tu ne fais aucune promesse médicale. Tu t'appuies sur des traditions de bien-être. Ta réponse doit contenir un message de chat court, empathique et conversationnel, qui écoute activement l'utilisateur, rappelle que la synthèse détaillée est affichée sous le dialogue et précise que la lithothérapie ne remplace jamais un avis médical. Tu proposes aussi une synthèse globale claire avec 2 à 3 pierres du catalogue."
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

  return {
    chatMessage: payload.chatMessage.slice(0, 420),
    consultation: {
      title: payload.title.slice(0, 90),
      answer: payload.answer.slice(0, 1200),
      grounding: payload.grounding.slice(0, 220),
      stones: selected.length >= 2 ? selected.slice(0, 3) : fallback.consultation.stones,
      disclaimer:
        "Conseil basé sur les traditions de lithothérapie et une démarche de bien-être. Il ne remplace pas un avis médical, psychologique ou professionnel."
    }
  };
}

function buildFallbackExperience(question: string, profile: ConsultationProfile): ConsultationExperience {
  const defaults = ["labradorite", "quartz-rose", "amethyste"]
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

  return {
    chatMessage:
      question.trim().length > 0
        ? `Merci, j’ai bien pris votre demande ${recipient}. Je reste ici pour échanger avec vous, et vous trouverez juste en dessous une réponse globale plus structurée avec les pierres et bracelets associés. La lithothérapie reste une approche de bien-être et ne remplace jamais un avis médical.`
        : "Je suis ici pour vous aider. Dites-moi pour qui est ce conseil, l’âge, le sexe, puis décrivez votre besoin avec vos mots. La synthèse détaillée apparaîtra juste sous le dialogue.",
    consultation: {
      title: "Un premier repère pour votre question",
      answer:
        question.trim().length > 0
          ? "Votre question appelle avant tout de la clarté et un recentrage simple. Je vous propose de partir sur quelques pierres très lisibles, afin de ne pas multiplier les signaux et de garder une intention nette."
          : "Commencez par une intention simple et choisissez une pierre qui vous aide à vous sentir plus stable, plus doux avec vous-même ou plus clair dans votre action.",
      grounding: "Gardez une seule intention pour aujourd’hui et observez ce qui vous apaise ou vous remet en mouvement.",
      stones: defaults.slice(0, 3),
      disclaimer:
        "Conseil basé sur les traditions de lithothérapie et une démarche de bien-être. Il ne remplace pas un avis médical, psychologique ou professionnel."
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
