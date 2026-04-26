"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, HeartPulse, ShoppingBag, Sparkles } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";
import { recommendStones } from "@/lib/recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { withAffiliate } from "@/lib/affiliate";

const emotions = [
  { label: "Submergé", value: "stress" },
  { label: "Seul", value: "solitude" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Dans le doute", value: "doute" },
  { label: "En manque", value: "peur du manque" },
  { label: "À fleur de peau", value: "tristesse" }
];

const goals = [
  { label: "Retrouver le calme", value: "sérénité" },
  { label: "Me sentir aimé", value: "amour" },
  { label: "Oser agir", value: "confiance" },
  { label: "Me protéger", value: "protection" },
  { label: "Attirer l'abondance", value: "argent" },
  { label: "Clarifier mon esprit", value: "clarté" }
];

const moments = [
  { label: "Ce soir", value: "sommeil" },
  { label: "Avant une décision", value: "décision" },
  { label: "Au travail", value: "focus" },
  { label: "Dans une relation", value: "relations" }
];

export default function TestPage() {
  const [emotion, setEmotion] = useState("stress");
  const [goal, setGoal] = useState("sérénité");
  const [moment, setMoment] = useState("sommeil");

  const results = useMemo(
    () => recommendStones({ physical: moment, emotional: emotion, goal }).slice(0, 3),
    [emotion, goal, moment]
  );

  const main = results[0];

  return (
    <main className="section">
      <h1>Test rapide : quelle pierre est faite pour vous aujourd'hui ?</h1>
      <p className="section-lead">
        Répondez avec votre ressenti du moment. Le test traduit votre besoin en pierres, intention et geste simple.
      </p>

      <div className="guided-layout">
        <section className="form-panel guided-panel">
          <Step title="Ce que je ressens" options={emotions} value={emotion} onChange={setEmotion} />
          <Step title="Ce que je veux retrouver" options={goals} value={goal} onChange={setGoal} />
          <Step title="Le moment où j'en ai besoin" options={moments} value={moment} onChange={setMoment} />
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </section>

        <aside className="card guidance-result">
          <div className="result-kicker">
            <HeartPulse size={19} />
            Votre soutien du moment
          </div>
          <h2>{main.stone.name}</h2>
          <img className="featured-stone-image" src={main.stone.image.url} alt={main.stone.image.alt} />
          <div className="score large-score">{main.score}%</div>
          <p>{main.reason}</p>
          <p className="intention-line">{main.intention}</p>
          <p>Geste simple : {main.usage}</p>
          <div className="sos-actions">
            <Link
              className="button"
              href={withAffiliate(main.stone.products[0].url)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ShoppingBag size={16} />
              {main.stone.products[0].price ?? "Voir les bracelets"}
            </Link>
            <Link className="button secondary" href={`/stone/${main.stone.slug}`}>
              Fiche pierre <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>

      <section className="section compact-section no-side-padding">
        <h2>Autres pierres possibles</h2>
        <div className="grid">
          {results.slice(1).map((item) => (
            <Link className="card" href={`/stone/${item.stone.slug}`} key={item.stone.slug}>
              <img className="stone-thumb wide" src={item.stone.image.url} alt={item.stone.image.alt} />
              <Sparkles size={20} />
              <h3>{item.stone.name}</h3>
              <p>{item.reason}</p>
              <span className="micro-action">
                Explorer <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section compact-section no-side-padding">
        <EmailCapture source="test" />
      </section>
    </main>
  );
}

function Step({
  title,
  options,
  value,
  onChange
}: {
  title: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="guided-step">
      <h2>{title}</h2>
      <div className="choice-grid">
        {options.map((option) => (
          <button
            className={value === option.value ? "choice active" : "choice"}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
