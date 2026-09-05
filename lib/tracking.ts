type TrackingPayload = Record<string, string | number | boolean | null | undefined>;

export function trackClientEvent(eventName: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    eventName,
    payload: {
      ...payload,
      path: window.location.pathname,
      referrer: document.referrer || undefined
    }
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
      return;
    }
  } catch {
    // Fall back to fetch below.
  }

  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true
  }).catch(() => undefined);
}

