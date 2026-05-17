export type SystemeSyncPayload = {
  email: string;
  fullName?: string;
  source: string;
  consent: boolean;
  metadata?: Record<string, unknown>;
};

type SystemeContact = {
  id: number | string;
  email?: string;
};

type SystemeTag = {
  id: number | string;
  name?: string;
};

type SystemeSyncResult =
  | { ok: true; skipped?: false; contactId?: number | string; tags?: string[] }
  | { ok: true; skipped: true; reason: "missing_api_key" | "no_consent" }
  | { ok: false; error: string; step?: string };

const SYSTEME_BASE_URL = "https://api.systeme.io/api";

const BASE_TAGS = ["LI - Lead"];

const SOURCE_TAGS: Array<[string, string]> = [
  ["formation", "LI - Formation gratuite"],
  ["guide", "LI - Guide 10 pierres"],
  ["recommendation", "LI - Test gratuit"],
  ["test", "LI - Test gratuit"],
  ["stone", "LI - Source fiche pierre"],
  ["native-stone", "LI - Source fiche pierre"],
  ["intention", "LI - Source intention"],
  ["boutique", "LI - Source boutique"],
  ["membre", "LI - Source membre gratuit"]
];

const INTENTION_TAGS: Record<string, string> = {
  stress: "LI - Intention stress",
  protection: "LI - Intention protection",
  amour: "LI - Intention amour",
  sommeil: "LI - Intention sommeil",
  energie: "LI - Intention énergie",
  "énergie": "LI - Intention énergie",
  confiance: "LI - Intention confiance",
  cadeau: "LI - Intention cadeau",
  hypersensibilite: "LI - Intention hypersensibilité",
  "hypersensibilité": "LI - Intention hypersensibilité",
  "fatigue-emotionnelle": "LI - Intention fatigue émotionnelle",
  "argent-abondance": "LI - Intention argent abondance"
};

function getSystemeApiKey() {
  return process.env.SYSTEME_IO_API_KEY ?? process.env.SYSTEME_API_KEY ?? process.env.SYSTEMEIO_API_KEY;
}

function splitName(fullName?: string) {
  const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0],
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : undefined
  };
}

function getMetadataString(metadata: Record<string, unknown> | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === "string" ? value.trim().toLowerCase() : undefined;
}

function getSystemeTags(payload: SystemeSyncPayload) {
  const source = payload.source.toLowerCase();
  const tags = new Set(BASE_TAGS);

  for (const [needle, tag] of SOURCE_TAGS) {
    if (source.includes(needle)) tags.add(tag);
  }

  const intention = getMetadataString(payload.metadata, "intention") ?? getMetadataString(payload.metadata, "recommendedIntention");
  if (intention && INTENTION_TAGS[intention]) {
    tags.add(INTENTION_TAGS[intention]);
  }

  const recommendedStone = getMetadataString(payload.metadata, "recommendedStone");
  if (recommendedStone) {
    tags.add(`LI - Pierre ${recommendedStone}`);
  }

  return Array.from(tags);
}

async function systemeFetch<T>(path: string, init: RequestInit = {}): Promise<{ ok: true; data: T } | { ok: false; status: number; text: string }> {
  const apiKey = getSystemeApiKey();
  const response = await fetch(`${SYSTEME_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey ?? "",
      ...(init.headers ?? {})
    }
  });

  const text = await response.text().catch(() => "");
  if (!response.ok) {
    return { ok: false, status: response.status, text };
  }

  return { ok: true, data: text ? (JSON.parse(text) as T) : ({} as T) };
}

async function findContactByEmail(email: string) {
  const result = await systemeFetch<{ items?: SystemeContact[] }>(`/contacts?email=${encodeURIComponent(email)}&limit=10`);
  if (!result.ok) return result;

  const contact = result.data.items?.find((item) => item.email?.toLowerCase() === email.toLowerCase()) ?? result.data.items?.[0];
  return { ok: true as const, data: contact };
}

async function upsertContact(payload: SystemeSyncPayload) {
  const existing = await findContactByEmail(payload.email);
  if (!existing.ok) return existing;

  const { firstName, lastName } = splitName(payload.fullName);
  const body = JSON.stringify({
    email: payload.email,
    firstName,
    lastName,
    locale: "fr"
  });

  if (existing.data?.id) {
    const patch = await systemeFetch<SystemeContact>(`/contacts/${existing.data.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/merge-patch+json" },
      body
    });

    if (!patch.ok) return patch;
    return { ok: true as const, data: { ...existing.data, ...patch.data, id: existing.data.id } };
  }

  return systemeFetch<SystemeContact>("/contacts", {
    method: "POST",
    body
  });
}

async function listTags() {
  return systemeFetch<{ items?: SystemeTag[] }>("/tags?limit=100");
}

async function createTag(name: string) {
  return systemeFetch<SystemeTag>("/tags", {
    method: "POST",
    body: JSON.stringify({ name })
  });
}

async function ensureTag(name: string, existingTags: SystemeTag[]) {
  const found = existingTags.find((tag) => tag.name?.toLowerCase() === name.toLowerCase());
  if (found?.id) return { ok: true as const, data: found };

  return createTag(name);
}

async function assignTag(contactId: number | string, tagId: number | string) {
  return systemeFetch(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tagId: Number(tagId) })
  });
}

export async function syncLeadToSysteme(payload: SystemeSyncPayload): Promise<SystemeSyncResult> {
  const apiKey = getSystemeApiKey();

  if (!payload.consent) {
    return { ok: true, skipped: true, reason: "no_consent" };
  }

  if (!apiKey) {
    return { ok: true, skipped: true, reason: "missing_api_key" };
  }

  try {
    const contact = await upsertContact(payload);
    if (!contact.ok) {
      return { ok: false, step: "contact", error: `${contact.status}: ${contact.text}` };
    }

    if (!contact.data.id) {
      return { ok: false, step: "contact", error: "Systeme.io contact response did not include an id" };
    }

    const tags = getSystemeTags(payload);
    const tagList = await listTags();
    if (!tagList.ok) {
      return { ok: false, step: "tags:list", error: `${tagList.status}: ${tagList.text}` };
    }

    const existingTags = tagList.data.items ?? [];
    for (const tagName of tags) {
      const tag = await ensureTag(tagName, existingTags);
      if (!tag.ok) {
        return { ok: false, step: `tags:create:${tagName}`, error: `${tag.status}: ${tag.text}` };
      }

      if (!existingTags.some((item) => item.id === tag.data.id)) {
        existingTags.push(tag.data);
      }

      const assigned = await assignTag(contact.data.id, tag.data.id);
      if (!assigned.ok && assigned.status !== 409) {
        return { ok: false, step: `tags:assign:${tagName}`, error: `${assigned.status}: ${assigned.text}` };
      }
    }

    return { ok: true, contactId: contact.data.id, tags };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Systeme.io sync failed" };
  }
}
