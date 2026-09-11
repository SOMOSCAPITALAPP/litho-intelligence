# Veille Google Trends et production editoriale

Objectif : detecter les sujets lithotherapie qui montent dans Google Trends, puis publier des articles longs capables de servir a la fois le SEO Google, les moteurs de reponse IA et la conversion Amazon.

## Sources a surveiller

- Google Trends France, recherche web.
- Google Search Console : requetes en hausse, pages qui commencent a recevoir des impressions.
- Pages internes Litho Intelligence : pierres, intentions, boutique, guide gratuit et livres.
- Saisonnalite : Noel, fete des meres, Saint-Valentin, rentree, examens, changement de saison.

La liste de depart est maintenue dans `lib/trendEditorialWatchlist.ts`.

## Signaux qui declenchent un article

Un article est prioritaire si au moins deux signaux sont reunis :

- Le mot-cle est en forte hausse ou en breakout dans Google Trends.
- Le sujet correspond a une intention claire : choisir une pierre, comprendre une signification, offrir un bracelet, acheter un livre, preparer un rituel.
- Le site possede deja une page pierre ou intention capable de recevoir des liens internes.
- Un produit Amazon, un bracelet ou un livre peut etre mis en avant de facon naturelle.
- Le sujet n'a pas deja ete traite sous le meme angle dans les 30 derniers jours.

Un article est evite si le sujet impose une promesse medicale, une pathologie lourde, ou une attente de resultat garanti.

## Format editorial cible

Chaque article tendance doit viser 1500 a 2200 mots et rester journalistique. La vente doit etre presente, mais integree dans le conseil.

Structure recommandee :

1. H1 clair avec le mot-cle principal.
2. Introduction : pourquoi ce sujet interesse maintenant.
3. Disclaimer court : tradition symbolique, spirituelle ou culturelle, jamais un avis medical.
4. Reponse directe a l'intention de recherche.
5. Selection de 3 a 5 pierres, avec pour chacune :
   - signification symbolique ;
   - intention associee ;
   - comment la porter ;
   - lien vers la fiche pierre ;
   - produit ou livre recommande si pertinent.
6. Encadre "choisir un bracelet" ou "aller plus loin".
7. FAQ SEO avec 4 a 6 questions naturelles.
8. Conclusion avec appel au test gratuit, au guide email et a la boutique.

## Ton et conformite

Le ton doit etre celui d'un redacteur en chef bien-etre : clair, documente, chaleureux, prudent.

Formulations autorisees :

- "traditionnellement associee a"
- "dans les croyances de lithotherapie"
- "peut accompagner un rituel personnel"
- "symboliquement utilisee pour"
- "selon les traditions culturelles autour des pierres"

Formulations interdites :

- "guerit"
- "soigne"
- "traite"
- "anti-depression"
- "anti-anxiete"
- "efficacite garantie"
- "resultat garanti"
- "remplace un medecin"

Disclaimer a reprendre ou adapter :

> Les informations proposees reposent sur les traditions symboliques associees aux pierres naturelles. Elles ne remplacent jamais un avis medical, psychologique ou professionnel.

## Optimisation SEO et LLM

Chaque article doit :

- repondre a la question principale dans les 120 premiers mots ;
- utiliser des intertitres descriptifs ;
- inclure des definitions simples pour les IA ;
- relier au moins 5 pages internes ;
- relier au moins 1 page transactionnelle : boutique, fiche pierre, livre ou idee cadeau ;
- inclure une FAQ exploitable en schema FAQPage si le template le permet ;
- rester compatible avec une future traduction anglaise.

## Mise en avant commerciale

La recommandation produit doit rester discrete mais visible.

Priorites :

1. Livre de la collection si le sujet correspond.
2. Bracelet Amazon de la pierre principale.
3. Guide gratuit pour capturer l'email.
4. Test gratuit pour segmenter l'intention.

Exemple de formulation :

"Pour aller plus loin, le livre consacre a l'oeil de tigre permet d'explorer son histoire, ses associations symboliques et les manieres de l'integrer dans un rituel personnel. Le bracelet reste l'option la plus simple si l'on souhaite porter cette pierre au quotidien."

## Workflow de publication

1. Identifier le signal Google Trends.
2. Verifier si une page existante couvre deja le sujet.
3. Choisir un angle editorial distinct.
4. Rediger l'article complet.
5. Ajouter l'article dans la structure du journal ou des guides.
6. Ajouter liens internes, FAQ, produit et disclaimer.
7. Lancer le build.
8. Publier et demander l'indexation si l'article est strategique.

## Premier panier de sujets a surveiller

- howlite
- agate bleue
- oeil de tigre
- quartz rose
- labradorite
- amethyste
- pyrite
- pierre pour le stress
- pierre pour dormir
- pierre de protection
- bracelet pierre naturelle femme
- bracelet pierre naturelle homme
- purifier ses pierres
- recharger ses pierres
- idee cadeau pierre naturelle
