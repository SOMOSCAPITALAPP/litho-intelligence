import Link from "next/link";
import { ArrowRight, Brain, Heart, Moon, Search, Shield, UserCircle, Wallet } from "lucide-react";
import { wellbeingDisclaimer } from "@/lib/legal";
import { stones } from "@/lib/stones";

const quickLinks = [
  { label: "Stressé", detail: "Apaiser le mental", href: "/recommendation?emotional=stress&goal=serenite", icon: Moon },
  { label: "Fatigué", detail: "Retrouver de l'élan", href: "/recommendation?physical=fatigue&goal=energie", icon: Shield },
  { label: "Manque d'énergie", detail: "Relancer l'action", href: "/recommendation?physical=fatigue&goal=confiance", icon: Wallet },
  { label: "Besoin d'amour", detail: "Soutenir le cœur", href: "/recommendation?emotional=solitude&goal=amour", icon: Heart },
  { label: "Protection", detail: "Poser des limites", href: "/recommendation?emotional=peur&goal=protection", icon: Shield }
];

const commonQuestions = [
  { label: "Pierre pour stress", href: "/intention/stress" },
  { label: "Pierre pour argent", href: "/intention/argent" },
  { label: "Pierre pour amour", href: "/intention/amour" },
  { label: "Pierre pour confiance", href: "/intention/confiance" },
  { label: "Je porte déjà des pierres : est-ce cohérent ?", href: "/combination" },
  { label: "Je veux offrir un soutien symbolique", href: "/recommendation?goal=amour" }
];

const emotionalPaths = [
  {
    title: "Je me sens perdu",
    text: "Quand tout semble flou, commence par une pierre qui ramène de la clarté et une intention simple.",
    href: "/recommendation?emotional=confusion&goal=clarte"
  },
  {
    title: "Je me sens seul",
    text: "Quand le cœur manque de chaleur, choisis un soutien symbolique centré sur la douceur et l'amour de soi.",
    href: "/recommendation?emotional=solitude&goal=amour"
  },
  {
    title: "Je n'ose pas agir",
    text: "Quand la peur bloque le mouvement, cherche une pierre associée au courage, à l'ancrage et à la décision.",
    href: "/recommendation?emotional=peur&goal=confiance"
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero app-hero">
        <div>
          <p className="eyebrow">Lithothérapie traditionnelle, recommandation intelligente</p>
          <h1>Comment te sens-tu aujourd’hui ?</h1>
          <p>
            En un clic, obtenez une recommandation de pierres, un rituel simple et le bracelet associé
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
            <Link className="button gold-button" href="/dashboard">
              <UserCircle size={16} />
              Espace membre
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
          <h2>Réponse en 1 clic</h2>
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
          <span>Une réponse rassurante, une intention claire, 3 à 5 pierres et un geste simple à faire aujourd’hui.</span>
        </div>
      </section>

      <section className="member-band">
        <div>
          <span className="mystic-kicker">
            <UserCircle size={15} />
            Espace membre
          </span>
          <h2>Gardez vos recommandations, vos favoris et votre progression énergétique.</h2>
          <p>
            Créez un compte gratuit pour retrouver votre historique, suivre vos pierres favorites et débloquer
            progressivement les fonctions Premium.
          </p>
        </div>
        <div className="member-actions">
          <Link className="button gold-button" href="/register">Créer mon espace gratuit</Link>
          <Link className="button ghost-dark" href="/login">Me connecter</Link>
        </div>
      </section>

      <section className="section compact-section">
        <h2>Guides par intention</h2>
        <p className="section-lead">
          Des pages claires pour partir d’un besoin précis et découvrir les pierres traditionnellement associées à cette intention.
        </p>
        <div className="grid">
          <Link className="card emotional-card" href="/intention/stress">
            <h3>Pierre pour stress</h3>
            <p>Améthyste, lépidolite, howlite, quartz rose : choisir une pierre associée au calme et au recentrage.</p>
            <span className="micro-action">Lire le guide <ArrowRight size={15} /></span>
          </Link>
          <Link className="card emotional-card" href="/intention/argent">
            <h3>Pierre pour argent</h3>
            <p>Citrine, pyrite, aventurine verte : travailler symboliquement l’abondance, la confiance et l’action.</p>
            <span className="micro-action">Lire le guide <ArrowRight size={15} /></span>
          </Link>
          <Link className="card emotional-card" href="/intention/amour">
            <h3>Pierre pour amour</h3>
            <p>Quartz rose, rhodonite, pierre de lune : soutenir une intention de douceur, de lien et d’ouverture du cœur.</p>
            <span className="micro-action">Lire le guide <ArrowRight size={15} /></span>
          </Link>
          <Link className="card emotional-card" href="/intention/confiance">
            <h3>Pierre pour confiance</h3>
            <p>Œil de tigre, citrine, cornaline : symboliser le courage, l’affirmation et la sécurité intérieure.</p>
            <span className="micro-action">Lire le guide <ArrowRight size={15} /></span>
          </Link>
        </div>
      </section>

      <section className="section compact-section">
        <h2>Commencer par ce que vous ressentez</h2>
        <p className="section-lead">
          L'utilisateur n'a pas besoin de connaître les pierres. Il part de sa tension intérieure,
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
        <h2>Accès direct aux pierres</h2>
        <p className="section-lead">
          Pour ceux qui savent déjà ce qu'ils cherchent : fiche claire, compatibilités, purification,
          port recommandé et lien d'achat.
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
