"use client";

import { useState } from "react";

export function PortalButton() {
  const [loading, setLoading] = useState(false);

  async function openPortal() {
    setLoading(true);
    const response = await fetch("/api/stripe/create-portal-session", { method: "POST" });
    const data = await response.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  }

  return (
    <button className="button secondary" disabled={loading} onClick={openPortal} type="button">
      {loading ? "Ouverture..." : "Gerer mon abonnement"}
    </button>
  );
}
