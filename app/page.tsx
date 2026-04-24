import Link from "next/link";
import { ArrowRight, Brain, Heart, Moon, Search, Shield, Wallet } from "lucide-react";
import { wellbeingDisclaimer } from "@/lib/legal";
import { stones } from "@/lib/stones";

const quickLinks = [
  { label: "Stresse", detail: "Apaiser le mental", href: "/recommendation?emotional=stress&goal=serenite", icon: Moon },
  { label: "Fatigue", detail: "Retrouver de l'elan", href: "/recommendation?physical=fatigue&goal=energie", icon: Shield },
  { label: "Manque d'energie", detail: "Relancer l'action", href: "/recommendation?physical=fatigue&goal=confiance", icon: Wallet },
  { label: "Besoin d'amour", detail: "Soutenir le coeur", href: "/recommendation?emotional=solitude&goal=amour", icon: Heart },
  { label: "Protection", detail: "Poser des limites", href: "/recommendation?emotional=peur&goal=protection", icon: Shield }
];

const commonQuestions = [
  { label: "J'ai besoin d'apaiser mon mental", href: "/recommendation?physical=sommeil&emotional=stress" },
  { label: "Je doute de moi en ce moment", href: "/recommendation?goal=confiance&emotional=doute" },
  { label: "Je porte deja des pierres: est-ce coherent ?", href: "/combination" },
  { label: "Je veux offrir un soutien symbolique", href: "/recommendation?goal=amour" }
];

const emotionalPaths = [
  {
    title: "Je me sens perdu",
    text: "Quand tout semble flou, commence par une pierre qui ramene de la clarte et une intention simple.",
    href: "/recommendation?emotional=confusion&goal=clarte"
  },
  {
    title: "Je me sens seul",
    text: "Quand le coeur manque de chaleur, choisis un soutien symbolique centre sur la douceur et l'amour de soi.",
    href: "/recommendation?emotional=solitude&goal=amour"
  },
  {
    title: "Je n'ose pas agir",
    text: "Quand la peur bloque le mouvement, cherche une pierre associee au courage, a l'ancrage et a la decision.",
    href: "/recommendation?emotional=peur&goal=confiance"
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero app-hero">
        <div>
          <p className="eyebrow">Lithotherapie traditionnelle, recommandation intelligente</p>
          <h1>Comment te sens-tu aujourd'hui ?</h1>
          <p>
            En un clic, obtenez une recommandation de pierres, un rituel simple et le bracelet associe
            Felicidade ou Vera Mentis.
          </p>
          <form className="search-box" action="/recommendation">
            <Search size={20} />
            <input name="goal" placeholder="Ex: stress, amour, protection, argent, confiance..." />
            <button type="submit">Me guider</button>
          </form>
          <div className="hero-actions">
            <Link className="button" href="/sos">
              Besoin d'aide maintenant <ArrowRight size={16} />
            </Link>
            <Link className="button" href="/test">
              Faire le test rapide <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href="/combination">
              Tester mes pierres
            </Link>
          </div>
          <div className="question-list">
            {commonQuestions.map((question) => (
              <Link key={question.label} href={question.href}>
                {question.label}
              </Link>
            ))}
          </div>
        </div>
        <aside className="hero-panel" aria-label="Test rapide">
          <h2>Reponse en 1 clic</h2>
          <div className="quick-grid">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} className="quick-link" href={item.href}>
                  <Icon size={22} />
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </Link>
              );
            })}
          </div>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </aside>
      </section>

      <section className="answer-band">
        <div>
          <Brain size={24} />
          <strong>La promesse d'usage</strong>
          <span>Une reponse rassurante, une intention claire, 3 a 5 pierres et un geste simple a faire aujourd'hui.</span>
        </div>
      </section>

      <section className="section compact-section">
        <h2>Commencer par ce que vous ressentez</h2>
        <p className="section-lead">
          L'utilisateur n'a pas besoin de connaitre les pierres. Il part de sa tension interieure,
          puis l'application traduit ce ressenti en choix simple.
        </p>
        <div className="grid">
          {emotionalPaths.map((path) => (
            <Link className="card emotional-card" href={path.href} key={path.title}>
              <h3>{path.title}</h3>
              <p>{path.text}</p>
              <span className="micro-action">
                Voir mon soutien <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Acces direct aux pierres</h2>
        <p className="section-lead">
          Pour ceux qui savent deja ce qu'ils cherchent: fiche claire, compatibilites, purification,
          port recommande et lien d'achat.
        </p>
        <div className="grid">
          {stones.slice(0, 6).map((stone) => (
            <Link className="card" key={stone.slug} href={`/stone/${stone.slug}`}>
              <img className="stone-thumb wide" src={stone.image.url} alt={stone.image.alt} />
              <h3>{stone.name}</h3>
              <p>{stone.description}</p>
              <span className="button secondary">
                Voir la fiche <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
