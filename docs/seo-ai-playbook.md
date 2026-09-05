# Playbook SEO et SEO IA

Ce document sert de feuille de route operationnelle pour developper la visibilite de Litho Intelligence sur Google, Bing, Copilot, ChatGPT Search, Perplexity et les autres moteurs conversationnels.

## Objectif

Faire de `https://litho-intelligence.com` une source claire, crawlable, citee et orientee conversion sur les requetes liees aux pierres naturelles, intentions symboliques, bracelets et cadeaux.

## Socle technique

- Domaine canonique: `https://litho-intelligence.com`
- Sitemap: `https://litho-intelligence.com/sitemap.xml`
- Robots: `https://litho-intelligence.com/robots.txt`
- Fichier de decouverte IA: `https://litho-intelligence.com/llms.txt`
- Cle IndexNow: `https://litho-intelligence.com/indexnow-key.txt`
- Route de soumission IndexNow: `POST /api/seo/indexnow`

## Variables Vercel a configurer

```text
INDEXNOW_KEY=une_cle_longue_unique
SEO_SUBMIT_SECRET=un_secret_long_unique
NEXT_PUBLIC_SITE_URL=https://litho-intelligence.com
NEXT_PUBLIC_APP_URL=https://litho-intelligence.com
```

`INDEXNOW_KEY` doit etre une valeur aleatoire stable. Une fois configuree, l'URL `/indexnow-key.txt` doit retourner uniquement cette cle en texte brut.

## Soumettre les URLs a IndexNow

En local ou depuis un environnement avec les variables chargees:

```bash
npm run seo:indexnow
```

Pour soumettre une URL precise:

```bash
npm run seo:indexnow https://litho-intelligence.com/pierres/labradorite
```

Depuis la production:

```bash
curl -X POST https://litho-intelligence.com/api/seo/indexnow \
  -H "Content-Type: application/json" \
  -H "x-seo-submit-secret: VOTRE_SECRET" \
  -d "{\"urls\":[\"https://litho-intelligence.com/pierres/labradorite\"]}"
```

Si aucune URL n'est envoyee, la route soumet toutes les URLs canoniques connues du sitemap.

## Consoles a activer

1. Google Search Console
   - Ajouter la propriete domaine `litho-intelligence.com`.
   - Verifier le domaine via DNS dans Vercel.
   - Soumettre `/sitemap.xml`.
   - Controler Couverture, Pages indexees, Experience mobile, Core Web Vitals.

2. Bing Webmaster Tools
   - Ajouter le site ou importer depuis Google Search Console.
   - Soumettre `/sitemap.xml`.
   - Activer et suivre IndexNow.
   - Surveiller les donnees Copilot / AI Performance quand disponibles.

3. Outils sociaux
   - Facebook Sharing Debugger: re-collecter les pages cles.
   - X Card Validator ou partage de test.
   - LinkedIn Post Inspector.

## Crawlers IA a laisser passer

Le fichier robots doit permettre l'acces aux contenus publics importants pour:

- `OAI-SearchBot`
- `ChatGPT-User`
- `OAI-AdsBot`
- `PerplexityBot`
- `Perplexity-User`
- `Claude-User`
- `Claude-SearchBot`
- `Googlebot`
- `Bingbot`

Les pages privees restent bloquees: `/admin`, `/system`, `/api`, `/account`, `/profile`, `/dashboard`.

## Structure de contenu qui aide les IA

Chaque page importante doit contenir:

- une reponse courte en haut de page;
- un H1 explicite;
- des H2 sous forme de questions naturelles;
- une FAQ visible;
- un fil d'Ariane visible et JSON-LD;
- des sources quand la page contient des faits mineralogiques;
- un disclaimer bien-etre clair;
- un CTA simple: test gratuit, guide gratuit ou bouton Amazon.

## Clusters prioritaires

### Intentions

- Quelle pierre pour le stress ?
- Quelle pierre pour dormir ?
- Quelle pierre pour la protection symbolique ?
- Quelle pierre pour l'amour ?
- Quelle pierre pour la confiance ?
- Quelle pierre pour l'energie ?
- Quelle pierre pour l'abondance symbolique ?

### Pierres

- Labradorite
- Quartz rose
- Oeil de tigre
- Amethyste
- Obsidienne noire
- Pyrite
- Tourmaline noire
- Howlite
- Apatite bleue
- Cornaline

### Guides

- Debuter en lithotherapie symbolique
- Comment choisir une pierre naturelle
- Comment reconnaitre une vraie pierre
- Purification et rechargement des pierres
- Bracelet en pierre naturelle: guide d'achat
- Pierres et intentions: comprendre les associations symboliques

## KPIs a suivre

- Impressions Google par page et par intention.
- Impressions Bing/Copilot.
- Clics organiques.
- Taux de clic depuis les pages intention vers Amazon.
- Taux de capture email par page.
- Taux de conversion guide gratuit -> formation gratuite.
- Taux de clic email -> produit Amazon ou offre payante.
- Requetes IA detectees via referers `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`.

## Wording conforme

Ne jamais utiliser de promesses medicales. Preferer:

- "traditionnellement associee a";
- "selon les croyances de lithotherapie";
- "peut accompagner un rituel personnel";
- "symboliquement utilisee pour";
- "bien-etre symbolique".

Le disclaimer doit rester visible sur les pages pierres, intentions, guides et resultat du test.
