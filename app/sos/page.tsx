"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, HeartHandshake, Moon, Shield, ShoppingBag, Sparkles } from "lucide-react";
import { recommendStones } from "@/lib/recommendation";
import { wellbeingDisclaimer } from "@/lib/legal";
import { withAffiliate } from "@/lib/affiliate";

const states = [
  {
    label: "Je panique",
    emotional: "stress anxiété",
    goal: "sérénité",
    physical: "sommeil",
    anchor: "Pose une main sur le cœur. Inspire lentement, puis expire plus longtemps que tu n’inspires."
  },
  {
    label: "Je me sens vide",
    emotional: "solitude tristesse",
    goal: "amour",
    physical: "fatigue",
    anchor: "Dis-toi une phrase simple : je n’ai pas besoin de tout porter maintenant."
  },
  {
    label: "J’ai peur de manquer",
    emotional: "peur doute",
    goal: "argent confiance",
    physical: "tension",
    anchor: "Reviens à une action concrète possible aujourd’hui, même minuscule."
  },
  {
    label: "Je me sens attaqué",
    emotional: "stress peur",
    goal: "protection",
    physical: "tension",
    anchor: "Imagine une limite claire autour de toi : je choisis ce qui entre et ce qui reste dehors."
  }
];

export default function SosPage() {
  const [selected, setSelected] = useState(states[0]);
  const result = useMemo(
    () =>
      recommendStones({
        physical: selected.physical,
        emotional: selected.emotional,
        goal: selected.goal
      })[0],
    [selected]
  );

  return (
    <main className="section sos-page">
      <div className="sos-header">
        <p className="eyebrow">Mode soutien immédiat</p>
        <h1>Respirez. Nommez ce qui se passe. Repartez avec un geste simple.</h1>
        <p className="section-lead">
          Cet espace aide l’utilisateur à ralentir, mettre des mots sur son état et choisir un soutien symbolique
          sans se sentir jugé ni perdu.
        </p>
      </div>

      <div className="guided-layout">
        <section className="form-panel guided-panel">
          <h2>Dans quel état êtes-vous maintenant ?</h2>
          <div className="choice-grid two-columns">
            {states.map((state) => (
              <button
                className={selected.label === state.label ? "choice active" : "choice"}
                key={state.label}
                onClick={() => setSelected(state)}
                type="button"
              >
                {state.label}
              </button>
            ))}
          </div>

          <div className="breath-card">
            <Moon size={22} />
            <div>
              <strong>30 secondes pour revenir ici</strong>
              <p>{selected.anchor}</p>
            </div>
          </div>

          <div className="sos-steps">
            <div>
              <span>1</span>
              <p>Nommer : « voici ce que je ressens ».</p>
            </div>
            <div>
              <span>2</span>
              <p>Respirer : ralentir l’expiration.</p>
            </div>
            <div>
              <span>3</span>
              <p>Choisir : une pierre, une intention, un geste.</p>
            </div>
          </div>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </section>

        <aside className="card guidance-result sos-result">
          <div className="result-kicker">
            <HeartHandshake size={19} />
            Conseil proposé
          </div>
          <h2>{result.stone.name}</h2>
          <img className="featured-stone-image" src={result.stone.image.url} alt={result.stone.image.alt} />
          <div className="score large-score">{result.score}%</div>
          <p>{result.reason}</p>
          <p className="intention-line">{result.intention}</p>
          <p>Geste simple : {result.usage}</p>
          <div className="sos-actions">
            <Link
              className="button gold-button"
              href={withAffiliate(result.stone.products[0].url)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ShoppingBag size={16} />
              Voir le bracelet recommandé
            </Link>
            <Link className="button secondary" href={`/stone/${result.stone.slug}`}>
              Comprendre cette pierre <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>

      <section className="section compact-section no-side-padding">
        <div className="grid">
          <article className="card">
            <Shield size={22} />
            <h2>Positionnement responsable</h2>
            <p>Le mode SOS soutient le ressenti et les rituels symboliques. Il ne remplace pas une aide médicale.</p>
          </article>
          <article className="card">
            <Sparkles size={22} />
            <h2>Conversion douce</h2>
            <p>La fiche pierre arrive après l’apaisement, au moment où l’utilisateur comprend pourquoi elle lui est proposée.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
