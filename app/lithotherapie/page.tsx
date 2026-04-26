import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem, Heart, Shield, Sparkles } from "lucide-react";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Qu'est-ce que la lithotherapie ? | Litho Intelligence",
  description:
    "Comprenez la lithotherapie, ses usages traditionnels, son positionnement bien-etre et la maniere de choisir une pierre avec discernement."
};

const pillars = [
  {
    icon: Gem,
    title: "Une pratique symbolique",
    text: "La lithotherapie associe des pierres naturelles a des intentions, des emotions et des rituels de bien-etre."
  },
  {
    icon: Heart,
    title: "Un support personnel",
    text: "Une pierre peut devenir un repere quotidien pour revenir a une intention simple : calme, confiance, protection ou amour."
  },
  {
    icon: Shield,
    title: "Un cadre responsable",
    text: "Litho Intelligence parle de traditions et d'usages symboliques. L'application ne remplace jamais un avis medical ou psychologique."
  }
];

export default function LithotherapiePage() {
  return (
    <main>
      <section className="hero app-hero">
        <div>
          <p className="eyebrow">Comprendre la lithotherapie</p>
          <h1>Une pratique de bien-etre, de symbole et d'intention</h1>
          <p>
            La lithotherapie ne promet pas de soigner. Elle aide a choisir une pierre comme support de presence, de sens
            et de rituel personnel selon les traditions associees aux mineraux.
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

        <aside className="hero-panel editorial-visual-panel">
          <img className="editorial-visual" src="/images/stones/collection-premium.png" alt="Selection coloree de pierres naturelles" />
          <div className="editorial-caption">
            <span className="mystic-kicker">
              <Sparkles size={15} />
              Positionnement clair
            </span>
            <h2>Ce que fait Litho Intelligence</h2>
            <p>
              Nous traduisons un besoin emotionnel ou symbolique en recommandations simples : pierres, gestes d'usage,
              idees cadeau et bracelets associes.
            </p>
          </div>
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
              Commencez par une intention precise. Ensuite, regardez quelles pierres lui sont traditionnellement associees,
              puis choisissez la forme la plus simple a porter ou a utiliser au quotidien.
            </p>
          </article>
          <article className="card">
            <h2>A quoi sert l'application ?</h2>
            <p>
              Elle aide a passer plus vite de la question a la solution : recommandation, fiche claire, compatibilites,
              meditation courte et acces direct au bracelet correspondant.
            </p>
          </article>
          <article className="card">
            <h2>Ce qu'il faut garder en tete</h2>
            <p>
              Les pierres sont presentees comme des supports symboliques dans une demarche de bien-etre. Elles n'ont pas
              vocation a diagnostiquer, traiter ou remplacer un professionnel de sante.
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
