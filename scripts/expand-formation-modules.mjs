import fs from "node:fs";

const DATA_PATH = "data/formation.modules.json";

const modules = [
  {
    id: "bases",
    step: 1,
    title: "Comprendre la lithotherapie sans confusion",
    duration: "70 min",
    level: "Debutant",
    pdfUrl: "/guides/formation-litho-01-bases.pdf",
    goal: "Savoir expliquer ce qu'est la lithotherapie, ce qu'elle n'est pas, et poser un cadre de pratique responsable.",
    objectives: [
      "Distinguer tradition symbolique, ressenti personnel et promesse medicale",
      "Comprendre le role d'une pierre comme support d'intention",
      "Adopter un vocabulaire prudent, clair et non medical"
    ],
    theme: "le cadre responsable de la lithotherapie",
    centralQuestion: "comment utiliser les pierres comme supports symboliques sans leur attribuer un pouvoir medical",
    examples: "quartz rose pour la douceur, amethyste pour le calme, tourmaline noire pour l'ancrage, citrine pour l'elan",
    method: "definir l'intention, choisir une pierre coherente, poser un geste simple, observer son ressenti, puis ajuster sans promesse absolue",
    mistakes: "promettre une guerison, remplacer un avis professionnel, copier une liste de proprietes sans contexte, ou presenter son ressenti personnel comme une verite universelle",
    practice: "rediger une definition claire de votre pratique, preparer une phrase de prudence, puis expliquer a une personne debutante ce qu'une pierre peut symboliquement accompagner",
    exercise: "Redigez votre charte personnelle en trois parties : votre definition responsable de la lithotherapie, trois phrases que vous refusez d'utiliser car elles promettent trop, puis trois phrases justes que vous pouvez employer avec un proche ou un client.",
    quiz: [
      ["Dans cette formation, une pierre est surtout presentee comme...", ["Un support d'intention", "Un traitement garanti", "Un diagnostic energetique"], 0, "Le cadre retenu est symbolique et non medical."],
      ["Quelle phrase respecte le mieux le cadre responsable ?", ["Cette pierre soigne l'anxiete", "Cette pierre peut soutenir une intention de calme", "Cette pierre remplace un suivi professionnel"], 1, "La formulation parle de soutien symbolique, sans promesse medicale."],
      ["Pourquoi formuler une intention avant d'utiliser une pierre ?", ["Pour donner une direction a la pratique", "Pour garantir un resultat immediat", "Pour eviter toute observation"], 0, "L'intention clarifie l'usage et rend le geste plus conscient."],
      ["Que faut-il faire face a un symptome physique ou psychologique important ?", ["Consulter un professionnel qualifie", "Multiplier les pierres", "Arreter tout suivi"], 0, "La lithotherapie ne remplace jamais un accompagnement medical ou psychologique."],
      ["Quel vocabulaire est le plus prudent ?", ["Soutenir, accompagner, symboliser", "Guerir, diagnostiquer, remplacer", "Forcer, prouver, imposer"], 0, "Ces mots gardent une posture sobre et responsable."],
      ["Une experience personnelle avec une pierre doit etre presentee comme...", ["Un ressenti subjectif", "Une preuve universelle", "Une obligation pour les autres"], 0, "Le ressenti peut etre utile sans devenir une verite absolue."],
      ["Pourquoi tenir une trace de sa pratique ?", ["Pour mieux observer ce qui aide vraiment", "Pour prouver que tout fonctionne", "Pour eviter de reflechir"], 0, "La trace favorise l'observation et l'ajustement."],
      ["Quel est le risque d'une liste de proprietes utilisee sans recul ?", ["Confondre symbole et promesse", "Manquer de pierres rares", "Choisir trop lentement"], 0, "Une liste doit rester un repere, pas une garantie."],
      ["La posture responsable consiste a...", ["Relier intention, geste et observation", "Faire des promesses fortes", "Ignorer le contexte de la personne"], 0, "La pratique devient plus claire quand elle reste contextualisee."],
      ["Quelle phrase convient pour presenter la formation ?", ["Elle propose des usages symboliques et non medicaux", "Elle remplace un avis medical", "Elle garantit un effet identique pour tous"], 0, "La transparence protege l'apprenant et le public."]
    ]
  },
  {
    id: "choisir",
    step: 2,
    title: "Choisir une pierre selon une intention",
    duration: "75 min",
    level: "Debutant",
    pdfUrl: "/guides/formation-litho-02-choisir.pdf",
    goal: "Apprendre a partir d'un besoin reel plutot que d'une liste de proprietes abstraites.",
    objectives: [
      "Identifier une intention prioritaire",
      "Relier une intention a une famille de pierres",
      "Eviter l'accumulation de pierres sans logique"
    ],
    theme: "le choix d'une pierre a partir d'une intention claire",
    centralQuestion: "comment passer d'un besoin personnel a une selection courte, coherente et facile a pratiquer",
    examples: "quartz rose pour l'apaisement relationnel, oeil de tigre pour la confiance, labradorite pour la protection symbolique, jaspe rouge pour l'ancrage",
    method: "nommer le besoin du moment, reduire ce besoin a une intention, choisir une pierre principale, ajouter une pierre complementaire seulement si elle apporte une nuance utile",
    mistakes: "acheter trop vite, melanger dix intentions, confondre esthetique et usage, choisir une pierre parce qu'elle est rare plutot que parce qu'elle correspond au moment",
    practice: "composer trois mini-protocoles : un pour le calme, un pour la confiance, un pour l'ancrage, avec une pierre, une phrase et un geste pour chacun",
    exercise: "Choisissez trois situations reelles de votre semaine. Pour chacune, formulez une intention en une phrase, selectionnez une pierre principale, expliquez votre choix et indiquez le geste concret qui accompagnera la pierre.",
    quiz: [
      ["Quelle est la premiere question a poser avant de choisir une pierre ?", ["Quelle intention ai-je besoin de soutenir ?", "Quelle pierre est la plus chere ?", "Quelle pierre est la plus rare ?"], 0, "Le besoin reel oriente le choix."],
      ["Pourquoi limiter le nombre de pierres au depart ?", ["Pour garder une intention claire", "Parce que les pierres s'annulent toujours", "Pour eviter de les regarder"], 0, "Une selection courte facilite la regularite."],
      ["Pour une intention de limites, quelle famille est souvent choisie ?", ["Pierres sombres d'ancrage", "Pierres uniquement transparentes", "Pierres sans couleur"], 0, "Les pierres sombres evoquent souvent l'ancrage et la protection symbolique."],
      ["Une pierre complementaire doit servir a...", ["Apporter une nuance utile", "Compliquer le rituel", "Remplacer l'intention"], 0, "Elle complete la pierre principale sans disperser la pratique."],
      ["Quel choix est le plus coherent ?", ["Une intention, une pierre, un geste", "Dix pierres sans objectif", "Une pierre choisie uniquement pour son prix"], 0, "La coherence rend la pratique observable."],
      ["Que faire si deux intentions sont presentes ?", ["Choisir la priorite du moment", "Tout melanger", "Abandonner le choix"], 0, "Une priorite donne une direction plus nette."],
      ["Quelle phrase montre un choix prudent ?", ["Je choisis cette pierre comme rappel de confiance", "Cette pierre va tout regler", "Cette pierre agit pareil pour tout le monde"], 0, "Elle exprime un usage symbolique."],
      ["Pourquoi noter le contexte du choix ?", ["Pour comprendre pourquoi la pierre a ete choisie", "Pour creer une obligation", "Pour prouver une propriete universelle"], 0, "Le contexte aide a evaluer la pertinence."],
      ["Quelle erreur est frequente chez les debutants ?", ["Accumuler trop de pierres", "Formuler une intention", "Observer son ressenti"], 0, "L'accumulation brouille souvent la pratique."],
      ["Un bon choix doit etre...", ["Simple, contextualise et testable", "Spectaculaire et complique", "Base uniquement sur la rarete"], 0, "La simplicite soutient l'apprentissage."]
    ]
  },
  {
    id: "purifier",
    step: 3,
    title: "Purifier, recharger et entretenir ses pierres",
    duration: "80 min",
    level: "Debutant",
    pdfUrl: "/guides/formation-litho-03-purifier.pdf",
    goal: "Mettre en place une routine simple d'entretien sans abimer les pierres.",
    objectives: [
      "Comprendre la difference entre purification et recharge",
      "Choisir des methodes douces et prudentes",
      "Creer une routine realiste"
    ],
    theme: "l'entretien prudent et symbolique des pierres",
    centralQuestion: "comment purifier, recharger, nettoyer et ranger ses pierres sans les fragiliser ni compliquer la pratique",
    examples: "fumigation douce, son, intention, lumiere lunaire indirecte, chiffon sec, rangement separe pour les pierres fragiles",
    method: "identifier la fragilite possible de la pierre, choisir une methode douce par defaut, distinguer nettoyage materiel et rituel symbolique, puis fixer une frequence realiste",
    mistakes: "mettre toutes les pierres dans l'eau, utiliser du sel humide par automatisme, exposer longuement au soleil une pierre sensible, ou croire qu'un rituel complique vaut mieux qu'une routine stable",
    practice: "creer une fiche d'entretien pour cinq pierres, avec methode interdite, methode prudente, frequence et phrase d'intention",
    exercise: "Prenez cinq pierres ou cinq pierres que vous aimeriez posseder. Pour chacune, creez une fiche courte : sensibilite possible, methode douce choisie, frequence d'entretien, phrase de recharge et lieu de rangement.",
    quiz: [
      ["Quelle methode est prudente quand on ne connait pas bien une pierre ?", ["Fumigation douce ou intention", "Sel humide toute la nuit", "Soleil direct prolonge"], 0, "Les methodes douces limitent les risques."],
      ["La recharge sert surtout a...", ["Soutenir une intention", "Changer la composition de la pierre", "La transformer en medicament"], 0, "La recharge est comprise ici comme un geste symbolique."],
      ["Pourquoi eviter l'eau par defaut ?", ["Certaines pierres peuvent etre fragiles", "L'eau rend toutes les pierres noires", "L'eau annule toujours les pierres"], 0, "Certaines pierres se degradent au contact de l'eau."],
      ["Le nettoyage materiel consiste a...", ["Retirer poussiere et traces physiques", "Garantir une guerison", "Changer la couleur de la pierre"], 0, "Il concerne l'etat concret de l'objet."],
      ["Une routine efficace doit etre...", ["Simple et reguliere", "Longue et impossible", "Identique pour toutes les pierres"], 0, "La regularite compte plus que la complexite."],
      ["Que faire avant d'utiliser le sel ?", ["Verifier la compatibilite de la pierre", "L'utiliser systematiquement", "Ignorer la fragilite"], 0, "Le sel peut abimer certaines pierres."],
      ["La lumiere lunaire indirecte est souvent choisie car...", ["Elle est douce", "Elle chauffe fortement", "Elle remplace le rangement"], 0, "Elle limite les expositions agressives."],
      ["Pourquoi separer certaines pierres au rangement ?", ["Pour eviter les rayures et chocs", "Pour les rendre plus rares", "Pour supprimer leur symbolique"], 0, "Certaines pierres sont plus tendres ou cassantes."],
      ["Quand purifier symboliquement une pierre ?", ["Apres une utilisation intense ou avant une nouvelle intention", "Toutes les heures obligatoirement", "Jamais si elle est jolie"], 0, "La purification marque un retour au neutre."],
      ["Quelle attitude est la plus responsable ?", ["Choisir la methode la plus douce en cas de doute", "Tester toutes les methodes fortes", "Copier un rituel sans verifier"], 0, "La prudence protege les pierres."]
    ]
  },
  {
    id: "emotions",
    step: 4,
    title: "Pierres, emotions et journal d'observation",
    duration: "85 min",
    level: "Debutant a intermediaire",
    pdfUrl: "/guides/formation-litho-04-emotions.pdf",
    goal: "Utiliser les pierres comme support d'ecoute emotionnelle sans surinterpretation.",
    objectives: [
      "Nommer un etat emotionnel simplement",
      "Associer une pierre a un geste d'apaisement",
      "Tenir un journal d'observation sobre"
    ],
    theme: "l'ecoute emotionnelle accompagnee par les pierres",
    centralQuestion: "comment utiliser une pierre pour mieux nommer, accueillir et observer une emotion sans la transformer en diagnostic",
    examples: "amethyste pour le retour au calme, quartz rose pour la douceur envers soi, jaspe rouge pour revenir au corps, aventurine pour l'ouverture progressive",
    method: "nommer l'emotion, evaluer son intensite, choisir une pierre comme repere, associer une respiration ou une phrase, puis noter ce qui change et ce qui ne change pas",
    mistakes: "surinterpreter chaque sensation, croire qu'une emotion doit disparaitre immediatement, utiliser une pierre pour eviter une conversation necessaire, ou confondre observation et diagnostic",
    practice: "tenir un journal sur sept jours avec emotion, contexte, pierre, geste, intensite avant et apres, puis une conclusion prudente",
    exercise: "Pendant sept jours, remplissez une ligne de journal par jour : emotion principale, contexte, intensite de 1 a 10, pierre choisie, geste realise, ressenti apres cinq minutes, action utile a poser ensuite.",
    quiz: [
      ["Quelle etape vient avant le choix d'une pierre emotionnelle ?", ["Nommer l'etat present", "Acheter plusieurs pierres", "Lire toutes les fiches"], 0, "Nommer clarifie l'intention."],
      ["Un journal d'observation sert a...", ["Mieux reperer son ressenti", "Etablir un diagnostic medical", "Classer les pierres par prix"], 0, "Il aide a observer sans promettre."],
      ["Quel duo est coherent pour l'apaisement ?", ["Respirer doucement avec une amethyste", "Remplacer le sommeil par une pierre", "Courir en tenant dix pierres"], 0, "Le geste simple soutient l'intention."],
      ["Pourquoi noter l'intensite de l'emotion ?", ["Pour observer une evolution", "Pour juger la personne", "Pour garantir un resultat"], 0, "L'intensite donne un repere subjectif."],
      ["Que faire si une emotion reste tres forte ?", ["Chercher un soutien adapte si necessaire", "Ajouter toujours plus de pierres", "Ignorer l'emotion"], 0, "La prudence reste prioritaire."],
      ["Une pierre dans ce module devient...", ["Un repere d'ecoute", "Un diagnostic", "Une solution obligatoire"], 0, "Elle aide a revenir a soi."],
      ["Quelle phrase est la plus juste ?", ["Je remarque que ce geste m'apaise parfois", "Cette pierre guerit tout le monde", "Mon ressenti prouve une loi generale"], 0, "Elle respecte la subjectivite."],
      ["Pourquoi associer respiration et pierre ?", ["Pour donner un geste concret au corps", "Pour supprimer toute emotion", "Pour eviter l'observation"], 0, "Le corps aide a stabiliser l'attention."],
      ["Quelle erreur eviter ?", ["Surinterpreter chaque sensation", "Ecrire une phrase courte", "Choisir une pierre simple"], 0, "La surinterpretation cree de la confusion."],
      ["Une conclusion de journal doit etre...", ["Prudente et personnelle", "Definitive pour tous", "Medicale"], 0, "Le journal parle de votre experience."]
    ]
  },
  {
    id: "mediter",
    step: 5,
    title: "Mediter avec une pierre sans video",
    duration: "75 min",
    level: "Tous niveaux",
    pdfUrl: "/guides/formation-litho-05-mediter.pdf",
    goal: "Creer une pratique guidee par texte, respiration et intention, sans support video.",
    objectives: [
      "Preparer un espace court et realiste",
      "Utiliser une pierre comme ancre d'attention",
      "Cloturer la pratique avec une action concrete"
    ],
    theme: "la meditation guidee par texte avec une pierre",
    centralQuestion: "comment construire une meditation autonome, courte et reproductible sans dependance a la video",
    examples: "tenir une amethyste dans la main, poser un quartz clair devant soi, garder une pierre d'ancrage pres des pieds, utiliser une phrase d'intention lue lentement",
    method: "preparer l'espace, definir une duree, choisir une pierre, lire une consigne courte, revenir au souffle et au contact, puis terminer par une trace ecrite",
    mistakes: "chercher une performance interieure, rester trop longtemps des le debut, se juger quand le mental bouge, ou oublier de relier la meditation a une action concrete",
    practice: "creer trois scripts de meditation de cinq minutes : calme, confiance, ancrage, avec respiration, phrase d'intention, silence et cloture",
    exercise: "Ecrivez un script de meditation de cinq minutes avec une pierre : installation, trois respirations, intention, observation du contact, retour en cas de distraction, phrase de cloture et action concrete.",
    quiz: [
      ["Dans une meditation avec pierre, la pierre sert principalement de...", ["Ancre d'attention", "Objet magique obligatoire", "Substitut au repos"], 0, "Elle aide a revenir au present."],
      ["Quelle duree est suffisante pour commencer ?", ["5 minutes", "3 heures obligatoires", "Une nuit entiere"], 0, "Court et regulier vaut mieux que trop ambitieux."],
      ["Pourquoi cloturer par une action ?", ["Pour relier l'intention au quotidien", "Pour oublier la pratique", "Pour eviter de respirer"], 0, "L'action donne une suite concrete."],
      ["Que faire quand le mental part ailleurs ?", ["Revenir doucement au souffle ou au contact", "Se juger", "Arreter definitivement"], 0, "Le retour fait partie de la pratique."],
      ["Une meditation sans video demande surtout...", ["Un texte clair et une structure simple", "Un decor parfait", "Une pierre rare"], 0, "La structure rend l'autonomie possible."],
      ["Pourquoi definir une duree avant de commencer ?", ["Pour securiser le cadre", "Pour forcer un resultat", "Pour rendre la pratique compliquee"], 0, "La duree donne un repere."],
      ["Quel choix convient pour l'ancrage ?", ["Une pierre tenue ou posee pres du corps", "Dix consignes en meme temps", "Aucune intention"], 0, "Le contact soutient l'attention corporelle."],
      ["La performance interieure est...", ["Inutile dans cette approche", "Obligatoire", "Le seul objectif"], 0, "La meditation vise la presence, pas la performance."],
      ["Pourquoi ecrire apres la pratique ?", ["Pour garder une trace sobre", "Pour prouver un pouvoir", "Pour remplacer l'experience"], 0, "La trace aide a apprendre."],
      ["Un bon script doit etre...", ["Simple, respirable et repetable", "Long et confus", "Reserve aux experts"], 0, "La simplicite facilite la regularite."]
    ]
  },
  {
    id: "rituel",
    step: 6,
    title: "Creer un rituel simple et durable",
    duration: "80 min",
    level: "Intermediaire",
    pdfUrl: "/guides/formation-litho-06-rituel.pdf",
    goal: "Construire un rituel sobre : une intention, une pierre, un moment, une trace.",
    objectives: [
      "Structurer un rituel en quatre etapes",
      "Choisir le bon moment de pratique",
      "Evaluer si le rituel reste utile"
    ],
    theme: "la construction d'un rituel durable avec les pierres",
    centralQuestion: "comment transformer une intention en habitude simple sans tomber dans la rigidite ou la mise en scene excessive",
    examples: "rituel du matin avec citrine, rituel du soir avec amethyste, rituel de protection symbolique avec tourmaline noire, rituel d'ecriture avec quartz rose",
    method: "nommer l'intention, choisir une pierre, fixer un moment, poser un geste court, garder une trace, evaluer apres sept jours, puis simplifier ou ajuster",
    mistakes: "creer un rituel trop long, attendre le moment parfait, multiplier les objets, oublier la trace, ou garder un rituel qui n'aide plus par habitude",
    practice: "concevoir un rituel de sept jours avec declencheur, duree, pierre, phrase, geste, trace quotidienne et bilan final",
    exercise: "Construisez votre rituel de sept jours. Indiquez le moment exact, la pierre choisie, la phrase d'ouverture, le geste central, la trace a noter et les criteres qui vous diront s'il faut garder, alleger ou modifier le rituel.",
    quiz: [
      ["Quel element n'appartient pas a la structure simple proposee ?", ["Une promesse de resultat garanti", "Une intention", "Une trace"], 0, "La formation evite les promesses garanties."],
      ["Le meilleur moment de rituel est...", ["Celui que l'on peut repeter", "Toujours minuit exactement", "Uniquement avec vingt pierres"], 0, "La durabilite vient d'un moment realiste."],
      ["Quand ajuster un rituel ?", ["Quand il devient trop lourd ou peu utile", "Jamais", "Avant meme de l'avoir teste"], 0, "L'observation permet d'ajuster."],
      ["A quoi sert la trace quotidienne ?", ["A evaluer l'utilite du rituel", "A prouver une loi universelle", "A compliquer la pratique"], 0, "La trace rend l'experience lisible."],
      ["Un rituel durable doit etre...", ["Court, clair et realiste", "Spectaculaire et epuisant", "Secretement impossible"], 0, "La regularite depend de la faisabilite."],
      ["Que faire si le rituel est oublie un jour ?", ["Reprendre simplement sans culpabilite", "Tout abandonner", "Doubler la duree par punition"], 0, "La souplesse aide a durer."],
      ["Quel est le role de la pierre ?", ["Servir de repere symbolique", "Garantir le resultat", "Remplacer l'action"], 0, "Elle soutient l'intention."],
      ["Pourquoi choisir un declencheur ?", ["Pour savoir quand pratiquer", "Pour rendre le rituel mysterieux", "Pour eviter la repetition"], 0, "Un declencheur facilite l'habitude."],
      ["Un bilan apres sept jours permet de...", ["Garder, alleger ou modifier", "Se juger durement", "Changer toutes les pierres sans raison"], 0, "Le bilan sert l'ajustement."],
      ["Quelle attitude eviter ?", ["Multiplier les objets au point de se disperser", "Simplifier le geste", "Evaluer son ressenti"], 0, "Trop d'objets peut brouiller l'intention."]
    ]
  },
  {
    id: "offrir",
    step: 7,
    title: "Offrir une pierre avec sens",
    duration: "75 min",
    level: "Tous niveaux",
    pdfUrl: "/guides/formation-litho-07-offrir.pdf",
    goal: "Choisir une pierre a offrir avec tact, intention et respect de la personne.",
    objectives: [
      "Identifier l'intention d'un cadeau",
      "Choisir une pierre accessible et symboliquement claire",
      "Formuler un message d'accompagnement juste"
    ],
    theme: "le cadeau symbolique avec une pierre",
    centralQuestion: "comment offrir une pierre sans projeter ses interpretations ni mettre la personne dans une case",
    examples: "quartz rose pour une attention douce, amethyste pour une invitation au calme, oeil de tigre pour un encouragement, labradorite pour une protection symbolique",
    method: "partir de la relation, choisir une intention positive, selectionner une pierre lisible, ecrire une carte sobre, laisser la personne libre de s'approprier ou non le cadeau",
    mistakes: "dire a quelqu'un ce qu'il doit changer, offrir une pierre comme diagnostic, choisir une symbolique trop lourde, ou ecrire une carte qui promet un effet garanti",
    practice: "preparer trois scenarios de cadeau : soutien, celebration, transition, avec pierre, message, emballage simple et phrase de prudence",
    exercise: "Choisissez trois personnes ou trois situations de cadeau. Pour chacune, notez l'intention, la pierre, le message de carte en trois lignes maximum et la phrase qui laisse la personne libre de recevoir le cadeau a sa maniere.",
    quiz: [
      ["Quel est le risque principal quand on offre une pierre ?", ["Projeter son interpretation sur l'autre", "Choisir une pierre trop claire", "Ecrire une carte courte"], 0, "Le cadeau doit rester respectueux."],
      ["Quelle pierre est facile a offrir pour une intention de douceur ?", ["Quartz rose", "Pierre inconnue sans explication", "Sel brut"], 0, "Le quartz rose est lisible et associe a la douceur."],
      ["A quoi sert la carte d'accompagnement ?", ["Donner le sens du geste", "Garantir l'effet de la pierre", "Remplacer le cadeau"], 0, "La carte clarifie l'intention."],
      ["Quelle formulation est la plus delicate ?", ["J'ai pense a cette pierre pour t'accompagner avec douceur", "Tu dois changer", "Cette pierre va regler ton probleme"], 0, "Elle propose sans imposer."],
      ["Pourquoi choisir une pierre lisible ?", ["Pour que le message soit facile a comprendre", "Pour eviter toute intention", "Pour impressionner par la rarete"], 0, "La lisibilite rend le cadeau accessible."],
      ["La personne qui recoit la pierre doit rester...", ["Libre de s'en servir ou non", "Obligee de suivre le rituel", "Responsable de prouver l'effet"], 0, "Le respect preserve la relation."],
      ["Quel cadeau est le plus responsable ?", ["Une pierre, une intention positive, une carte sobre", "Une pierre presentee comme diagnostic", "Une promesse de guerison"], 0, "Le cadre reste symbolique."],
      ["Que faut-il eviter dans la carte ?", ["Les promesses garanties", "Les mots simples", "Une phrase d'affection"], 0, "Les promesses creent une confusion."],
      ["Pour une transition de vie, le message doit etre...", ["Encourageant et non intrusif", "Directif", "Medical"], 0, "L'encouragement respecte le rythme de l'autre."],
      ["Offrir avec sens signifie...", ["Relier intention, tact et liberte", "Imposer une interpretation", "Choisir seulement selon le prix"], 0, "Le sens vient de la relation et du respect."]
    ]
  }
];

const sectionTitles = [
  "Pourquoi ce module compte",
  "Les notions essentielles",
  "Methode pas a pas",
  "Exemples concrets",
  "Erreurs frequentes",
  "Integration dans la pratique",
  "Auto-evaluation et passage au module suivant"
];

function courseFor(module) {
  const bodies = [
    `Ce module approfondit ${module.theme}. L'objectif n'est pas seulement de memoriser quelques definitions, mais de comprendre la logique qui permet de pratiquer avec discernement. La question centrale est la suivante : ${module.centralQuestion}. Pour y repondre, il faut partir de situations concretes, accepter que les pierres appartiennent ici a un champ symbolique et garder une posture d'observation. Une formation serieuse ne cherche pas a impressionner par des promesses, mais a donner des reperes stables. Elle aide a nommer une intention, a choisir un geste adapte, a observer ce qui se passe et a rester libre d'ajuster. Cette base change tout : l'apprenant ne subit plus des listes de proprietes, il apprend a construire une pratique claire, personnelle et responsable. Dans ce cadre, chaque pierre devient un support de presence, un rappel materiel et une invitation a agir avec plus de coherence.`,
    `Les notions essentielles de ce module reposent sur trois piliers : l'intention, le contexte et la trace. L'intention donne une direction. Le contexte explique pourquoi cette intention est importante maintenant. La trace permet de revenir sur l'experience sans l'exagerer. Les exemples utiles sont les suivants : ${module.examples}. Ces exemples ne doivent pas etre lus comme des ordres ou des garanties. Ils servent de cartes symboliques pour commencer. Une meme pierre peut accompagner des personnes differentes de manieres differentes, selon leur histoire, leur sensibilite et leur besoin du moment. C'est pourquoi la formation insiste sur la prudence du vocabulaire. Dire qu'une pierre soutient une intention est plus juste que dire qu'elle produit toujours un effet. Dire que l'on observe un apaisement personnel est plus responsable que promettre cet apaisement a tout le monde. Cette nuance est une competence centrale.`,
    `La methode proposee est volontairement simple : ${module.method}. Chaque etape a une fonction precise. Nommer l'intention evite la dispersion. Choisir peu de pierres rend l'experience lisible. Poser un geste transforme l'idee en pratique. Observer empeche de fonctionner uniquement par croyance automatique. Ajuster permet de rester vivant dans sa pratique. Pour appliquer cette methode, prenez un carnet ou une note numerique et repondez a quatre questions : qu'est-ce que je veux soutenir, pourquoi maintenant, quelle pierre represente le mieux cette direction, et quel geste puis-je repeter sans effort excessif ? Une pratique trop lourde finit souvent abandonnee. Une pratique courte, claire et repetee devient un appui. Le but n'est pas de faire parfaitement, mais de creer une relation stable entre l'objet, l'intention et le quotidien.`,
    `Les exemples concrets permettent de passer de la theorie a l'action. Une personne qui cherche plus de calme peut choisir une pierre associee a l'apaisement, la tenir pendant trois respirations lentes et noter ensuite une phrase simple. Une personne qui veut poser une limite peut choisir une pierre d'ancrage, la placer dans sa poche avant un rendez-vous difficile et se rappeler une phrase courte. Une personne qui souhaite plus de douceur peut placer une pierre sur son bureau et l'utiliser comme signal pour ralentir son rythme. Dans tous les cas, la pierre n'agit pas seule dans cette formation : elle accompagne une decision, une respiration, une parole, un rangement, une ecriture ou une action. Cette articulation est essentielle, car elle evite de deposer tout le pouvoir sur l'objet. Elle redonne a la personne une part active et mesurable dans sa pratique.`,
    `Les erreurs frequentes sont connues : ${module.mistakes}. Ces erreurs partent souvent d'une bonne intention, mais elles fragilisent la credibilite de la pratique. Quand on promet trop, on cree de la deception. Quand on accumule trop, on perd le fil. Quand on copie sans comprendre, on ne sait plus pourquoi on fait les choses. Pour eviter cela, utilisez une regle simple : si vous ne pouvez pas expliquer votre choix en deux phrases, simplifiez. Si vous ne pouvez pas repeter le geste trois jours de suite, reduisez-le. Si vous sentez que la pratique remplace une demande d'aide importante, arretez-vous et cherchez un soutien adapte. La lithotherapie symbolique peut accompagner, ritualiser, rassurer ou structurer, mais elle ne doit pas isoler ni retarder une aide necessaire.`,
    `Pour integrer ce module, passez par une mise en pratique progressive : ${module.practice}. Travaillez d'abord sur papier, puis testez dans la vraie vie pendant quelques jours. Notez les informations minimales : date, intention, pierre, geste, ressenti, ajustement. Cette simplicite rend l'apprentissage beaucoup plus solide qu'une lecture passive. A la fin du module, vous devez pouvoir expliquer le sujet a quelqu'un d'autre sans dramatiser, sans promettre et sans vous perdre dans un vocabulaire flou. Vous devez aussi pouvoir construire un exemple personnel, le tester, puis dire ce que vous gardez ou modifiez. C'est ce passage entre connaissance, pratique et observation qui transforme une initiation en vraie competence. La pierre devient alors un outil de clarte : elle ne decide pas a votre place, elle vous aide a revenir a ce que vous avez choisi de cultiver.`,
    `Avant de passer au module suivant, prenez dix minutes pour faire une auto-evaluation honnete. Ecrivez ce que vous avez compris, ce qui reste flou, ce que vous avez envie d'essayer et ce que vous devez simplifier. Relisez ensuite l'objectif pedagogique du module et verifiez si vous pouvez y repondre avec vos propres mots. Si ce n'est pas encore le cas, ne recommencez pas tout : reprenez seulement la section la moins claire et refaites l'exercice avec un exemple plus proche de votre vie. Cette maniere d'apprendre evite l'accumulation passive. Elle transforme chaque module en competence progressive. Vous avancez quand vous savez expliquer, pratiquer, observer et ajuster. Le QCM final sert alors de validation, mais votre vraie progression se mesure surtout a votre capacite a utiliser le contenu avec calme, precision et responsabilite.`
  ];

  return sectionTitles.map((heading, index) => ({ heading, body: bodies[index] }));
}

const expanded = modules.map((module) => ({
  id: module.id,
  step: module.step,
  title: module.title,
  duration: module.duration,
  level: module.level,
  pdfUrl: module.pdfUrl,
  goal: module.goal,
  objectives: module.objectives,
  course: courseFor(module),
  exercise: module.exercise,
  quiz: module.quiz.map(([question, options, answer, explanation]) => ({
    question,
    options,
    answer,
    explanation
  }))
}));

fs.writeFileSync(DATA_PATH, `${JSON.stringify(expanded, null, 2)}\n`, "utf8");
