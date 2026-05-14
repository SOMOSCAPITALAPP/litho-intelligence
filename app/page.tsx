import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Gem, Search, Shield, Sparkles } from "lucide-react";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { ProductRecommendationCard } from "@/components/ProductRecommendationCard";
import { ShareActions } from "@/components/ShareActions";
import { wellbeingDisclaimer } from "@/lib/legal";
import { recommendedProducts } from "@/lib/products";
import { getStone } from "@/lib/stones";

export const metadata: Metadata = {
  title: "Litho Intelligence by Quintessence Cristal - Trouvez votre pierre naturelle",
  description:
    "Test gratuit pour découvrir la pierre naturelle associée à votre intention : stress, amour, protection, énergie, confiance ou cadeau."
};

const popularIntentions = [
  { label: "Stress", href: "/intention/stress", text: "Calme, respiration et recentrage." },
  { label: "Protection", href: "/intention/protection", text: "Limites, ancrage et stabilité." },
  { label: "Amour", href: "/intention/amour", text: "Douceur, lien et tendresse." },
  { label: "Sommeil", href: "/intention/sommeil", text: "Rituel du soir et apaisement." },
  { label: "Énergie", href: "/intention/energie", text: "Élan, motivation et action." },
  { label: "Confiance", href: "/intention/confiance", text: "Courage, posture et affirmation." },
  { label: "Cadeau", href: "/intention/cadeau", text: "Choisir une pierre à offrir." }
];

const popularStoneSlugs = [
  "labradorite",
  "quartz-rose",
  "oeil-de-tigre",
  "obsidienne-noire",
  "jade-emeraude",
  "amethyste",
  "howlite",
  "apatite-bleue"
];

const shopPreview = recommendedProducts.slice(0, 6);

export default function HomePage() {
  const popularStones = popularStoneSlugs.map((slug) => getStone(slug)).filter(Boolean);

  return (
    <main>
      <section className="conversion-hero">
        <div className="conversion-hero-copy">
          <p className="eyebrow">Quintessence Cristal présente</p>
          <h1>Litho Intelligence</h1>
          <p className="brand-byline">by Quintessence Cristal</p>
          <h2>Trouvez la pierre qui correspond à votre énergie du moment.</h2>
          <p>
            Un guide intelligent pour découvrir les pierres naturelles associées à vos intentions : calme, protection,
            amour, énergie, confiance et équilibre intérieur.
          </p>
          <div className="hero-actions">
            <Link className="button gold-button" href="/test">
              Faire le test gratuit <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href="/stones">
              Découvrir les pierres
            </Link>
          </div>
          <div className="trust-row">
            <span>Gratuit</span>
            <span>Simple</span>
            <span>Résultat immédiat</span>
          </div>
        </div>
        <aside className="conversion-hero-panel">
          <Gem size={28} />
          <strong>Votre intention du moment</strong>
          <form className="search-box" action="/recommendation">
            <Search size={20} />
            <input name="goal" placeholder="stress, amour, protection, confiance..." />
            <button type="submit">Obtenir mon conseil</button>
          </form>
          <p className="fineprint">{wellbeingDisclaimer}</p>
        </aside>
      </section>

      <section className="section compact-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Comment ça marche ?</p>
            <h2>Un parcours clair en trois étapes</h2>
          </div>
          <Link className="micro-action" href="/test">
            Commencer <ArrowRight size={15} />
          </Link>
        </div>
        <div className="how-grid">
          {[
            ["1", "Dites comment vous vous sentez", "Posez votre besoin avec vos mots : stress, doute, fatigue, amour ou protection."],
            ["2", "Recevez une pierre recommandée", "Litho Intelligence associe votre intention aux traditions symboliques des pierres naturelles."],
            ["3", "Découvrez le rituel et le bracelet associé", "Repartez avec un geste simple, une fiche claire et une suggestion disponible sur Amazon."]
          ].map(([step, title, text]) => (
            <article className="how-card" key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <h2>Intentions populaires</h2>
        <div className="intentions-conversion-grid">
          {popularIntentions.map((item) => (
            <Link className="intention-tile" href={item.href} key={item.href}>
              <CheckCircle2 size={18} />
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <h2>Pierres populaires</h2>
        <p className="section-lead">Des fiches SEO claires pour comprendre la signification symbolique, les associations et les bracelets recommandés.</p>
        <div className="popular-stone-grid">
          {popularStones.map((stone) => (
            <Link className="popular-stone-card" href={`/stone/${stone!.slug}`} key={stone!.slug}>
              <img src={stone!.image.url} alt={stone!.image.alt} />
              <strong>{stone!.name}</strong>
              <span>{stone!.goals.slice(0, 2).join(" • ")}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <LeadCaptureCard
          source="home-guide"
          title="Recevez gratuitement le Guide des 10 pierres essentielles"
          subtitle="Stress, amour, protection, énergie, confiance : découvrez les pierres les plus utilisées selon les traditions symboliques."
          buttonLabel="Recevoir mon guide gratuit"
        />
      </section>

      <section className="section compact-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Boutique recommandée</p>
            <h2>Bracelets sélectionnés par intention</h2>
          </div>
          <Link className="button secondary" href="/boutique-pierres-naturelles">
            Voir toute la boutique
          </Link>
        </div>
        <div className="product-recommendation-grid">
          {shopPreview.map((product) => (
            <ProductRecommendationCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              stoneName={product.stone}
              intention={product.intentions[0] ?? "intention"}
              emotionalBenefit={product.description}
              price={product.price}
              amazonUrl={product.amazonUrl}
              badge={product.badge}
            />
          ))}
        </div>
      </section>

      <section className="section compact-section">
        <ShareActions
          compact
          title="Litho Intelligence by Quintessence Cristal"
          text="Je découvre le test gratuit pour trouver une pierre naturelle selon mon énergie du moment."
          url="/"
        />
      </section>

      <section className="section compact-section">
        <article className="compliance-panel">
          <Shield size={22} />
          <div>
            <h2>Une approche symbolique, claire et responsable</h2>
            <p>{wellbeingDisclaimer}</p>
          </div>
          <Sparkles size={22} />
        </article>
      </section>
    </main>
  );
}
