import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";

export const metadata: Metadata = {
  title: "Méditations avec pierres naturelles | Litho Intelligence",
  description:
    "Découvrez des méditations courtes avec pierres naturelles, basées sur les traditions de lithothérapie et les intentions de bien-être."
};

export default function MeditationsPage() {
  const meditations = [
    getMeditationSuggestion("Quartz rose"),
    getMeditationSuggestion("Améthyste"),
    getMeditationSuggestion("Citrine")
  ];

  return (
    <main className="section">
      <p className="eyebrow">Méditations</p>
      <h1>Méditer avec une pierre</h1>
      <p className="section-lead">
        Des pratiques courtes, symboliques et non médicales pour poser une intention avec une pierre naturelle.
        La version gratuite dure 3 à 5 minutes, les méditations premium pourront durer 15 à 30 minutes.
      </p>
      <div className="grid">
        {meditations.map((meditation) => (
          <StoneMeditationCard key={meditation.stoneName} meditation={meditation} />
        ))}
      </div>
      <section className="section compact-section no-side-padding">
        <EmailCapture source="meditations" />
      </section>
    </main>
  );
}
