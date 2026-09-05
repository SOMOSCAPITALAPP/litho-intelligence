"use client";

import { Search } from "lucide-react";
import { trackClientEvent } from "@/lib/tracking";

export function SearchBox({ source, placeholder }: { source: string; placeholder?: string }) {
  return (
    <form
      className="search-box"
      action="/recommendation"
      onSubmit={(event) => {
        const formData = new FormData(event.currentTarget);
        const goal = String(formData.get("goal") ?? "").trim();
        trackClientEvent("internal_search_submitted", { source, query: goal || undefined });
      }}
    >
      <Search size={20} />
      <input name="goal" placeholder={placeholder ?? "stress, amour, protection, confiance..."} />
      <button type="submit">Obtenir mon conseil</button>
    </form>
  );
}

