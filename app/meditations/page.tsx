import type { Metadata } from "next";
import { MoonStar, PlayCircle } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { StoneMeditationCard } from "@/components/StoneMeditationCard";
import { getMeditationSuggestion } from "@/lib/getMeditationSuggestion";

export const metadata: Metadata = {
  title: "Méditations avec pierres naturelles | Litho Intelligence",
  description:
    "Découvrez des méditations courtes avec pierres naturelles, basées sur les traditions de lithothérapie et les intentions de bien-être."
};

const externalMeditations = [
  {
    title: "Meditation pour aider a dormir",
    description: "Une proposition douce de Quintessence Cristal pour ralentir le rythme interieur et preparer le sommeil.",
    url: "https://youtu.be/Y1rP0iOVG0Q",
    note: "Ideale le soir, avec une amethyste, une howlite ou une lepidolite."
  },
  {
    title: "5 Minutes pour calmer l'esprit",
    description: "Relaxation Cristaux par Quintessence Cristal pour revenir a un etat plus calme en quelques minutes.",
    url: "https://youtu.be/NJEJZt7Rn3Q",
    note: "A utiliser avec un quartz rose, une amethyste ou un cristal de roche."
  }
];

export default function MeditationsPage() {
  const meditations = [
    getMeditationSuggestion("Quartz rose"),
    getMeditationSuggestion("Amethyste"),
    getMeditationSuggestion("Citrine")
  ];

  return (
    <main className="section">
      <p className="eyebrow">Meditations</p>
      <h1>Mediter avec une pierre</h1>
      <p className="section-lead">
        Des pratiques courtes, symboliques et non medicales pour poser une intention avec une pierre naturelle.
        La version gratuite dure 3 a 5 minutes, les meditations premium pourront durer 15 a 30 minutes.
      </p>

      <div className="grid">
        {meditations.map((meditation) => (
          <StoneMeditationCard key={meditation.stoneName} meditation={meditation} />
        ))}
      </div>

      <section className="section compact-section no-side-padding">
        <h2>Exemples a ecouter</h2>
        <p className="section-lead">
          Deux exemples simples de la chaine Quintessence Cristal pour illustrer le type d'accompagnement que l'on peut
          associer a une pierre au quotidien.
        </p>
        <div className="grid">
          {externalMeditations.map((item) => (
            <article className="card" key={item.url}>
              <MoonStar size={22} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.note}</p>
              <a className="button secondary" href={item.url} target="_blank" rel="noreferrer">
                <PlayCircle size={16} />
                Ouvrir sur YouTube
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section compact-section no-side-padding">
        <EmailCapture source="meditations" />
      </section>
    </main>
  );
}
