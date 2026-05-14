import type { Metadata } from "next";
import { RecommendationClient } from "@/app/recommendation/RecommendationClient";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";

export const metadata: Metadata = {
  title: "Test pierre naturelle gratuit : trouvez votre bracelet recommandé",
  description:
    "Décrivez votre intention du moment et recevez une pierre naturelle recommandée, un rituel symbolique et un bracelet associé.",
  openGraph: {
    title: "Test pierre naturelle gratuit | Litho Intelligence",
    description:
      "Trouvez la pierre naturelle associée à votre intention : stress, amour, protection, énergie, confiance ou cadeau.",
    images: ["/brand/litho-intelligence-og-v3.png"]
  }
};

export default function RecommendationPage({
  searchParams
}: {
  searchParams: { physical?: string; emotional?: string; goal?: string };
}) {
  return (
    <main className="section">
      <h1>Conseil personnalisé</h1>
      <p className="section-lead">
        Décrivez ce qui pèse, ce qui manque ou ce que vous voulez retrouver. Litho Intelligence transforme ce ressenti
        en sélection de pierres, avec une intention claire, un rituel simple et un bracelet associé.
      </p>
      <RecommendationClient
        initialPayload={{
          physical: searchParams.physical ?? "",
          emotional: searchParams.emotional ?? "",
          goal: searchParams.goal ?? ""
        }}
      />
      <section className="section compact-section no-side-padding">
        <LeadCaptureCard
          source="recommendation-page"
          title="Recevez le guide gratuit des 10 pierres essentielles"
          subtitle="Stress, amour, protection, énergie et confiance : gardez une base claire pour choisir vos pierres selon les traditions symboliques."
          buttonLabel="Recevoir le guide"
        />
      </section>
    </main>
  );
}
