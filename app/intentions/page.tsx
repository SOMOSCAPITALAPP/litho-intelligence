import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { intentionPages } from "@/data/intentions";
import { routes } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pierres par intention | Litho Intelligence",
  description:
    "Choisissez une pierre naturelle selon votre intention : stress, sommeil, protection, amour, énergie, confiance, cadeau ou abondance symbolique.",
  alternates: {
    canonical: `${siteUrl}/intentions`
  }
};

export default function IntentionsPage() {
  return (
    <main className="section compact-section">
      <p className="eyebrow">Choisir selon son besoin</p>
      <h1>Quelle pierre choisir selon votre intention ?</h1>
      <p className="section-lead">
        Sélectionnez une intention pour découvrir les pierres traditionnellement associées, les usages symboliques,
        les précautions de formulation et les bracelets recommandés quand une sélection existe.
      </p>
      <SearchBox source="intentions-index" />

      <div className="grid">
        {intentionPages.map((page) => (
          <Link className="card emotional-card intention-choice-card" href={routes.intention(page.slug)} key={page.slug}>
            <span className="eyebrow">{page.queryLabel}</span>
            <h2>{page.shortLabel}</h2>
            <p>{page.emotionalPromise}</p>
            <span className="micro-action">
              Découvrir les pierres <ArrowRight size={15} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

