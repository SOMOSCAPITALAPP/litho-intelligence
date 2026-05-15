export type LeadPayload = {
  email: string;
  source?: string;
  intention?: string;
  recommendedStone?: string;
  fullName?: string;
  consent?: boolean;
};

const localStorageKey = "litho:leads";

export function saveLeadLocally(payload: LeadPayload) {
  if (typeof window === "undefined") return;
  const current = JSON.parse(window.localStorage.getItem(localStorageKey) ?? "[]") as LeadPayload[];
  window.localStorage.setItem(
    localStorageKey,
    JSON.stringify([
      ...current,
      {
        ...payload,
        capturedAt: new Date().toISOString()
      }
    ])
  );
}

export async function saveLead(payload: LeadPayload) {
  try {
    const response = await fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        fullName: payload.fullName,
        consent: Boolean(payload.consent),
        source: payload.source ?? "lead-capture-card",
        metadata: {
          intention: payload.intention,
          recommendedStone: payload.recommendedStone,
          capture_component: "LeadCaptureCard"
        }
      })
    });

    if (!response.ok) {
      saveLeadLocally(payload);
      return { ok: false, local: true };
    }

    const data = await response.json().catch(() => ({}));
    if (data?.stored === false) saveLeadLocally(payload);
    return { ok: true, local: data?.stored === false };
  } catch {
    saveLeadLocally(payload);
    return { ok: false, local: true };
  }
}
