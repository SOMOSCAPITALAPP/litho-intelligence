"use client";

import { useState } from "react";

export function CheckoutButton({ label = "Passer Premium — 7,90 €/mois" }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    const response = await fetch("/api/stripe/create-checkout-session", { method: "POST" });
    const data = await response.json();
    setLoading(false);
    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }
    if (data.url) window.location.href = data.url;
  }

  return (
    <button className="button gold-button" disabled={loading} onClick={checkout} type="button">
      {loading ? "Ouverture..." : label}
    </button>
  );
}
