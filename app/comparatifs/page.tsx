import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { getGuidesByCategory } from "@/lib/editorialGuides";

export const metadata: Metadata = {
  title: "Comparatifs pierres naturelles et bracelets | Litho Intelligence",
  description:
    "Comparatifs pour choisir une pierre ou un bracelet selon une intention, un usage quotidien et des critères pratiques."
};

export default function ComparatifsPage() {
  const guides = getGuidesByCategory("comparatif");

  return (
    <main className="section compact-section">
      <p className="eyebrow">Comparatifs</p>
      <h1>Comparer les pierres et les bracelets avant de choisir</h1>
      <p className="section-lead">
        Des contenus conçus pour aider à décider sans transformer Litho Intelligence en simple catalogue marchand.
      </p>
      <div className="grid">
        {guides.map((guide) => (
          <article className="card" key={guide.slug}>
            <Scale size={22} />
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <Link className="micro-action" href={`/guides/${guide.slug}`}>
              Lire le comparatif <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
