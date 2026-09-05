import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { editorialGuides } from "@/lib/editorialGuides";

export const metadata: Metadata = {
  title: "Guides pierres naturelles | Litho Intelligence",
  description:
    "Guides de référence pour comprendre les pierres naturelles, les traditions de lithothérapie, l'authenticité, l'entretien et le choix d'un bracelet.",
  alternates: {
    canonical: "/guides"
  }
};

export default function GuidesPage() {
  return (
    <main className="section compact-section">
      <p className="eyebrow">Guides de référence</p>
      <h1>Comprendre les pierres naturelles avec discernement</h1>
      <p className="section-lead">
        Des repères clairs pour distinguer les faits observables, les traditions symboliques et les conseils pratiques
        avant de choisir une pierre ou un bracelet.
      </p>
      <div className="grid">
        {editorialGuides.map((guide) => (
          <article className="card" key={guide.slug}>
            <p className="eyebrow">{guide.category}</p>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <Link className="micro-action" href={`/guides/${guide.slug}`}>
              Lire le guide <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
