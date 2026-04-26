import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem, Heart, Shield, Sparkles } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Qu'est-ce que la lithothérapie ? | Litho Intelligence",
  description:
    "Comprenez la lithothérapie, ses usages traditionnels, son positionnement bien-être et la manière de choisir une pierre avec discernement."
};

const pillars = [
  {
    icon: Gem,
    title: "Une pratique symbolique",
    text: "La lithothérapie associe des pierres naturelles à des intentions, des émotions et des rituels de bien-être."
  },
  {
    icon: Heart,
    title: "Un support personnel",
    text: "Une pierre peut devenir un repère quotidien pour revenir à une intention simple : calme, confiance, protection ou amour."
  },
  {
    icon: Shield,
    title: "Un cadre responsable",
    text: "Litho Intelligence parle de traditions et d'usages symboliques. L'application ne remplace jamais un avis médical ou psychologique."
  }
];

export default function LithotherapiePage() {
  return (
    <main>
      <section className="hero app-hero">
        <div>
          <p className="eyebrow">Comprendre la lithothérapie</p>
          <h1>Une pratique de bien-être, de symbole et d'intention</h1>
          <p>
            La lithothérapie ne promet pas de soigner. Elle aide à choisir une pierre comme support de présence, de sens
            et de rituel personnel selon les traditions associées aux minéraux.
          </p>
          <div className="hero-actions">
            <Link className="button gold-button" href="/recommendation">
              Trouver ma pierre <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href="/stones">
              Explorer les pierres
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <span className="mystic-kicker">
            <Sparkles size={15} />
            Positionnement clair
          </span>
          <h2>Ce que fait Litho Intelligence</h2>
          <p>
            Nous traduisons un besoin émotionnel ou symbolique en recommandations simples : pierres, gestes d'usage,
            idées cadeau et bracelets associés.
          </p>
        </aside>
      </section>

      <section className="section compact-section">
        <div className="grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="card" key={pillar.title}>
                <Icon size={22} />
                <h2>{pillar.title}</h2>
                <p>{pillar.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section compact-section">
        <div className="grid">
          <article className="card">
            <h2>Comment choisir une pierre ?</h2>
            <p>
              Commencez par une intention précise. Ensuite, regardez quelles pierres lui sont traditionnellement associées,
              puis choisissez la forme la plus simple à porter ou à utiliser au quotidien.
            </p>
          </article>
          <article className="card">
            <h2>À quoi sert l'application ?</h2>
            <p>
              Elle aide à passer plus vite de la question à la solution : recommandation, fiche claire, compatibilités,
              méditation courte et accès direct au bracelet correspondant.
            </p>
          </article>
          <article className="card">
            <h2>Ce qu'il faut garder en tête</h2>
            <p>
              Les pierres sont présentées comme des supports symboliques dans une démarche de bien-être. Elles n'ont pas
              vocation à diagnostiquer, traiter ou remplacer un professionnel de santé.
            </p>
          </article>
        </div>
      </section>

      <section className="section compact-section">
        <EmailCapture source="lithotherapie" />
      </section>
    </main>
  );
}
