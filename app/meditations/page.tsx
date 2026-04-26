import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
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
        <h2>Exemples à écouter dans l'application</h2>
        <p className="section-lead">
          Deux propositions de la chaîne Quintessence Cristal, intégrées dans la page pour garder l'utilisateur dans l'expérience.
        </p>
        <div className="grid">
          <YouTubeEmbed
            videoId="Y1rP0iOVG0Q"
            title="Méditation pour aider à dormir"
            description="Une proposition douce pour ralentir le rythme intérieur, calmer le mental et préparer le sommeil."
          />
          <YouTubeEmbed
            videoId="NJEJZt7Rn3Q"
            title="5 Minutes pour calmer l'esprit"
            description="Relaxation Cristaux par Quintessence Cristal pour revenir à un état plus calme en quelques minutes."
          />
        </div>
      </section>

      <section className="section compact-section no-side-padding">
        <EmailCapture source="meditations" />
      </section>
    </main>
  );
}
