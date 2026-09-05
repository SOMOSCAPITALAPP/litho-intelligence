export type BrevoSyncPayload = {
  email: string;
  fullName?: string;
  source: string;
  consent: boolean;
  metadata?: Record<string, unknown>;
};

type BrevoSyncResult =
  | { ok: true; skipped?: false }
  | { ok: true; skipped: true; reason: "disabled" | "missing_api_key" | "no_consent" }
  | { ok: false; error: string };

function getListIds() {
  return (process.env.BREVO_LIST_IDS ?? process.env.BREVO_LIST_ID ?? "")
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item) && item > 0);
}

function getFirstName(fullName?: string) {
  return fullName?.trim().split(/\s+/)[0] || undefined;
}

export async function syncLeadToBrevo(payload: BrevoSyncPayload): Promise<BrevoSyncResult> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!payload.consent) {
    return { ok: true, skipped: true, reason: "no_consent" };
  }

  if (process.env.BREVO_SYNC_ENABLED !== "true") {
    return { ok: true, skipped: true, reason: "disabled" };
  }

  if (!apiKey) {
    return { ok: true, skipped: true, reason: "missing_api_key" };
  }

  const listIds = getListIds();
  const body: Record<string, unknown> = {
    email: payload.email,
    updateEnabled: true,
    emailBlacklisted: false
  };

  if (listIds.length) {
    body.listIds = listIds;
  }

  const firstName = getFirstName(payload.fullName);
  if (firstName && process.env.BREVO_SYNC_DEFAULT_ATTRIBUTES === "true") {
    body.attributes = {
      FIRSTNAME: firstName
    };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.ok || response.status === 204) {
      return { ok: true };
    }

    const errorBody = await response.text().catch(() => "");
    return { ok: false, error: errorBody || `Brevo returned ${response.status}` };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Brevo sync failed" };
  }
}
