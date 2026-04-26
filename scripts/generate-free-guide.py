from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Image, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "guides" / "guide-10-pierres-essentielles-litho-intelligence.pdf"
IMAGES = ROOT / "public" / "images" / "stones"

PAPER = colors.HexColor("#f7f1e8")
CARD = colors.HexColor("#fffaf4")
INK = colors.HexColor("#1f1725")
MUTED = colors.HexColor("#675d6f")
VIOLET = colors.HexColor("#2a1838")
GOLD = colors.HexColor("#d3ac67")
GOLD_SOFT = colors.HexColor("#efe1c8")
LINE = colors.HexColor("#e6d5bb")

STONES = [
    {
        "name": "Labradorite",
        "image": "labradorite.png",
        "amazon_url": "https://amzn.eu/d/03nqLs0J",
        "intention": "Protection, recentrage et équilibre intérieur",
        "summary": "La labradorite est traditionnellement choisie quand l’on se sent trop perméable aux ambiances extérieures. Elle accompagne symboliquement le besoin de filtre, de protection et de retour à soi.",
        "when": "Quand une journée a été lourde, quand l’environnement vous sollicite trop ou quand vous avez besoin de retrouver vos limites.",
        "usage": "Portez-la en bracelet dans les périodes intenses ou gardez-la près de vous lors des transitions émotionnelles.",
        "ritual": "Fermez les yeux, inspirez trois fois plus lentement que d’habitude et imaginez une frontière calme autour de vous.",
        "association": "Elle se marie bien avec le cristal de roche pour clarifier l’intention et avec l’améthyste pour adoucir la charge mentale.",
    },
    {
        "name": "Quartz rose",
        "image": "quartz-rose.png",
        "amazon_url": "https://amzn.eu/d/04WjJOpA",
        "intention": "Douceur, apaisement affectif et amour de soi",
        "summary": "Le quartz rose est l’une des pierres les plus associées à la tendresse, au réconfort et à une parole intérieure plus douce. Il peut accompagner symboliquement les périodes où le cœur a besoin d’espace et de délicatesse.",
        "when": "Quand vous vous sentez blessé, seul, exigeant envers vous-même ou en manque de chaleur affective.",
        "usage": "Placez-le près du cœur, sur votre table de nuit ou portez-le comme rappel discret de douceur.",
        "ritual": "Posez la pierre près de la poitrine et répétez : je m’accorde plus de douceur, de respect et de calme.",
        "association": "Le quartz rose fonctionne très bien avec la rhodonite pour les blessures émotionnelles et avec la pierre de lune pour une énergie plus intuitive.",
    },
    {
        "name": "Œil de tigre",
        "image": "oeil-de-tigre.png",
        "amazon_url": "https://amzn.eu/d/0gcKGhLS",
        "intention": "Confiance, courage et passage à l’action",
        "summary": "L’œil de tigre accompagne symboliquement les moments où l’on veut retrouver de la tenue, de l’assurance et une direction plus claire. Dans les traditions, il est souvent lié à la confiance et à l’ancrage actif.",
        "when": "Avant un rendez-vous important, une décision, une prise de parole ou une période où le doute prend trop de place.",
        "usage": "Portez-le en bracelet pendant la journée ou gardez-le quelques minutes en main avant une action concrète.",
        "ritual": "Ancrez les pieds au sol et nommez l’action précise que vous choisissez aujourd’hui, sans chercher à tout résoudre d’un coup.",
        "association": "Il peut être associé à la citrine pour l’élan et à la cornaline pour soutenir une dynamique plus audacieuse.",
    },
    {
        "name": "Améthyste",
        "image": "amethyste.png",
        "amazon_url": "",
        "intention": "Calme, recul et clarté intérieure",
        "summary": "L’améthyste est une pierre classique des moments de recul, de ralentissement et de recentrage. Elle est souvent utilisée dans les pratiques de bien-être pour symboliser la paix intérieure et la détente du mental.",
        "when": "Quand vous vous sentez submergé, irritable, très sollicité ou quand vous avez besoin de redescendre après une intensité émotionnelle.",
        "usage": "Gardez-la près de vous pendant une pause, un rituel du soir, une lecture ou quelques minutes de respiration.",
        "ritual": "Inspirez sur quatre temps, expirez sur six temps, puis laissez émerger une phrase courte : je reviens au calme.",
        "association": "Avec la howlite ou la lépidolite, elle renforce un axe de sérénité et de décontraction symbolique.",
    },
    {
        "name": "Citrine",
        "image": "citrine.png",
        "amazon_url": "",
        "intention": "Élan, rayonnement et abondance symbolique",
        "summary": "La citrine évoque une énergie solaire très appréciée pour travailler la confiance, la motivation et une relation plus simple à l’abondance. Selon les traditions, elle soutient les projets et l’envie de se remettre en mouvement.",
        "when": "Quand votre motivation baisse, qu’un projet stagne ou que vous voulez raviver une dynamique plus claire et plus confiante.",
        "usage": "Placez-la près d’un bureau, dans un sac ou à proximité d’un carnet d’objectifs.",
        "ritual": "Écrivez une intention concrète du jour, puis tenez la pierre deux minutes en visualisant l’action déjà engagée.",
        "association": "Elle s’associe bien à l’œil de tigre pour la confiance et au cristal de roche pour amplifier une intention simple.",
    },
    {
        "name": "Cornaline",
        "image": "cornaline.png",
        "amazon_url": "https://amzn.eu/d/0ekcqK2r",
        "intention": "Vitalité, créativité et envie d’avancer",
        "summary": "La cornaline est traditionnellement liée à l’élan, au plaisir de créer et à l’énergie de départ. Elle accompagne bien les périodes où l’on veut sortir de l’inertie et remettre du mouvement dans sa vie.",
        "when": "Quand vous procrastinez, que vous vous sentez ralenti ou que vous cherchez à rallumer une impulsion créative ou personnelle.",
        "usage": "Portez-la lors d’un moment de travail, d’une rencontre ou d’une journée où vous avez besoin d’un nouvel élan.",
        "ritual": "Choisissez une seule action de dix minutes, tenez la pierre en main, puis commencez sans attendre la motivation parfaite.",
        "association": "Elle fonctionne bien avec le jaspe rouge pour l’ancrage et avec la citrine pour une dynamique plus lumineuse.",
    },
    {
        "name": "Jaspe rouge",
        "image": "jaspe-rouge.png",
        "amazon_url": "https://amzn.eu/d/06Ckfi9B",
        "intention": "Ancrage, structure et force tranquille",
        "summary": "Le jaspe rouge est souvent relié au concret, à la constance et à la stabilité. Il accompagne symboliquement les moments où l’on a besoin de revenir au réel, au sol et à une action plus simple.",
        "when": "Quand vous vous sentez dispersé, trop sollicité ou en manque de structure dans votre quotidien.",
        "usage": "Utilisez-le en main quelques minutes ou placez-le près de vous dans un moment qui demande plus de stabilité.",
        "ritual": "Sentez vos pieds au sol et nommez trois choses concrètes que vous pouvez faire aujourd’hui sans vous brusquer.",
        "association": "Le jaspe rouge peut être soutenu par la tourmaline noire pour l’ancrage ou par la cornaline pour ajouter une dimension plus vive.",
    },
    {
        "name": "Aventurine verte",
        "image": "aventurine-verte.png",
        "amazon_url": "https://amzn.eu/d/0jgKsV3H",
        "intention": "Équilibre du cœur, respiration et renouveau",
        "summary": "L’aventurine verte est traditionnellement associée à l’ouverture, à la chance douce et à l’équilibre du cœur. Elle convient bien aux périodes de reprise, d’ajustement ou de nouveau départ.",
        "when": "Quand vous sortez d’une tension affective, d’un changement ou d’une phase où vous cherchez plus d’apaisement dans vos choix.",
        "usage": "Portez-la dans les périodes de transition ou gardez-la à proximité quand vous prenez des décisions importantes.",
        "ritual": "Respirez calmement et demandez-vous : quelle option respecte le mieux mon équilibre et mon rythme réel ?",
        "association": "Elle se combine facilement au quartz rose pour la douceur et à la citrine pour une énergie d’ouverture plus rayonnante.",
    },
    {
        "name": "Lapis-lazuli",
        "image": "lapis-lazuli.png",
        "amazon_url": "https://amzn.eu/d/0f9b1aSP",
        "intention": "Expression, lucidité et vérité personnelle",
        "summary": "Le lapis-lazuli est souvent relié à la parole juste, à la clarté d’expression et au discernement. C’est une pierre intéressante quand l’enjeu n’est pas de parler plus, mais de parler plus vrai.",
        "when": "Avant une conversation importante, une prise de position, une écriture ou une décision qui demande de la lucidité.",
        "usage": "Gardez-le près de vous avant d’écrire, de parler ou de mettre en mots une intention importante.",
        "ritual": "Notez une phrase vraie, simple et respectueuse que vous souhaitez incarner ou dire dans la journée.",
        "association": "Il s’accorde bien à la sodalite pour la clarté mentale et au cristal de roche pour structurer une intention.",
    },
    {
        "name": "Cristal de roche",
        "image": "quartz-clair.png",
        "amazon_url": "https://amzn.eu/d/05I8kdHa",
        "intention": "Clarté, recentrage et amplification",
        "summary": "Le cristal de roche occupe une place particulière parce qu’il peut soutenir une intention simple ou accompagner d’autres pierres dans une pratique plus personnelle. Il est souvent associé à la clarté et à la lisibilité intérieure.",
        "when": "Quand vous ne savez pas encore quelle pierre choisir ou quand vous voulez repartir d’une intention claire avant tout.",
        "usage": "Utilisez-le seul pour un moment de recentrage ou associez-le à une pierre plus spécifique selon votre besoin.",
        "ritual": "Tenez-le en main deux minutes et formulez une intention brève, positive et réaliste que vous pourrez relire dans la journée.",
        "association": "C’est l’une des pierres les plus faciles à associer : elle soutient la protection, le calme, l’amour ou la confiance selon la pierre compagne.",
    },
]


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverKicker",
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=GOLD,
            alignment=TA_CENTER,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=33,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverLead",
            fontName="Helvetica",
            fontSize=12.5,
            leading=18,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=VIOLET,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="StoneTitle",
            fontName="Helvetica-Bold",
            fontSize=15,
            leading=19,
            textColor=VIOLET,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            fontName="Helvetica",
            fontSize=9.7,
            leading=13.5,
            textColor=INK,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyMuted",
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=MUTED,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=12,
            textColor=GOLD,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            fontName="Helvetica",
            fontSize=8.1,
            leading=11.2,
            textColor=MUTED,
            alignment=TA_LEFT,
        )
    )
    return styles


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(2 * cm, 1.35 * cm, 19 * cm, 1.35 * cm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(2 * cm, 0.9 * cm, "Litho Intelligence")
    canvas.drawRightString(19 * cm, 0.9 * cm, f"Page {doc.page}")
    canvas.restoreState()


def optimized_image(path):
    with PILImage.open(path) as original:
        image = original.convert("RGB")
        image.thumbnail((1000, 1000))
        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=84, optimize=True)
        buffer.seek(0)
    return Image(buffer, width=4.45 * cm, height=4.45 * cm)


def premium_panel(text, styles, padding=14):
    panel = Table([[Paragraph(text, styles["Body"])]], colWidths=[16.3 * cm])
    panel.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), CARD),
                ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), padding),
                ("RIGHTPADDING", (0, 0), (-1, -1), padding),
                ("TOPPADDING", (0, 0), (-1, -1), padding),
                ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
            ]
        )
    )
    return panel


def stone_card(styles, stone, index):
    image = optimized_image(IMAGES / stone["image"])
    image.hAlign = "CENTER"

    amazon_line = (
        f'<link href="{stone["amazon_url"]}" color="#8b4656"><u>Voir le bracelet associé sur Amazon</u></link>'
        if stone["amazon_url"]
        else "Lien produit à venir dans le catalogue."
    )

    rows = [
        Paragraph(f"{index}. {stone['name']}", styles["StoneTitle"]),
        Paragraph(stone["intention"], styles["Meta"]),
        Spacer(1, 0.08 * cm),
        Paragraph(stone["summary"], styles["Body"]),
        Spacer(1, 0.12 * cm),
        Paragraph(f"<b>Quand la choisir :</b> {stone['when']}", styles["Body"]),
        Paragraph(f"<b>Utilisation simple :</b> {stone['usage']}", styles["Body"]),
        Paragraph(f"<b>Mini-rituel :</b> {stone['ritual']}", styles["Body"]),
        Paragraph(f"<b>Bonne association :</b> {stone['association']}", styles["Body"]),
        Spacer(1, 0.05 * cm),
        Paragraph(amazon_line, styles["Body"]),
    ]

    text_table = Table([[item] for item in rows], colWidths=[11.15 * cm])
    text_table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )

    card = Table([[image, text_table]], colWidths=[4.9 * cm, 11.4 * cm])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), CARD),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 11),
                ("RIGHTPADDING", (0, 0), (-1, -1), 11),
                ("TOPPADDING", (0, 0), (-1, -1), 11),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
            ]
        )
    )
    return card


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=1.7 * cm,
        leftMargin=1.7 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.7 * cm,
        title="Les 10 pierres essentielles - Litho Intelligence",
        author="Litho Intelligence",
    )

    story = [
        Spacer(1, 0.4 * cm),
        Paragraph("Guide offert", styles["CoverKicker"]),
        Paragraph("Les 10 pierres essentielles", styles["CoverTitle"]),
        Paragraph(
            "Un guide premium, visuel et pratique pour choisir vos premières pierres selon vos émotions, vos intentions et vos moments de vie.",
            styles["CoverLead"],
        ),
        Spacer(1, 0.15 * cm),
        premium_panel(
            "Ce guide n’a pas vocation à promettre, ni à compliquer. Son rôle est de vous aider à repérer les pierres les plus classiques, "
            "à comprendre leur symbolique et à les utiliser avec simplicité dans une démarche de bien-être.",
            styles,
        ),
        Spacer(1, 0.22 * cm),
        Paragraph(
            "Les informations proposées reposent sur les traditions de lithothérapie, les croyances associées aux pierres naturelles et les usages symboliques de bien-être. "
            "Elles ne remplacent jamais un avis médical, psychologique ou professionnel.",
            styles["Small"],
        ),
        Spacer(1, 0.28 * cm),
        Paragraph("Qu’est-ce que la lithothérapie ?", styles["SectionTitle"]),
        Paragraph(
            "La lithothérapie est une pratique de bien-être qui s’appuie sur les traditions, les symboles et les ressentis associés aux pierres naturelles. "
            "Elle invite à choisir une pierre comme support d’intention : retrouver du calme, poser des limites, nourrir la confiance, traverser une transition ou se reconnecter à une qualité intérieure.",
            styles["Body"],
        ),
        Spacer(1, 0.12 * cm),
        Paragraph(
            "Dans ce cadre, une pierre n’est pas pensée comme une solution médicale. Elle agit plutôt comme un repère concret : un objet que l’on porte, que l’on tient, "
            "ou que l’on place près de soi pour accompagner un rituel simple, une respiration, une décision ou un recentrage.",
            styles["Body"],
        ),
        Spacer(1, 0.24 * cm),
        Paragraph("Comment utiliser ce guide", styles["SectionTitle"]),
        Paragraph(
            "Commencez par nommer votre besoin principal : protection, calme, amour, confiance, énergie, clarté ou renouveau. Choisissez ensuite une pierre dont l’image, la symbolique ou l’intention vous parle sincèrement. "
            "La régularité d’usage compte souvent davantage que la complexité du rituel.",
            styles["Body"],
        ),
        Spacer(1, 0.1 * cm),
        Paragraph(
            "<b>Méthode simple :</b> une pierre, une intention, un geste. Portez-la, tenez-la quelques minutes ou placez-la dans un espace lié à votre objectif du moment.",
            styles["Body"],
        ),
        Spacer(1, 0.18 * cm),
    ]

    for index, stone in enumerate(STONES, start=1):
        story.append(stone_card(styles, stone, index))
        story.append(Spacer(1, 0.18 * cm))

    story.extend(
        [
            Spacer(1, 0.14 * cm),
            Paragraph("Purifier, recharger, observer", styles["SectionTitle"]),
            Paragraph(
                "Pour un usage simple, privilégiez la fumigation douce, la lumière lunaire ou le repos sur une géode de quartz. Évitez l’eau si vous n’êtes pas certain que la pierre la tolère bien. "
                "Le plus important n’est pas d’accumuler les techniques, mais de garder un cadre sobre, cohérent et régulier.",
                styles["Body"],
            ),
            Spacer(1, 0.1 * cm),
            Paragraph(
                "Le meilleur indicateur reste votre usage réel : est-ce que la pierre vous aide à vous souvenir d’une intention utile, à mieux respirer, à poser une limite ou à retrouver une qualité intérieure ?",
                styles["Body"],
            ),
            Spacer(1, 0.18 * cm),
            Paragraph("Continuer avec Litho Intelligence", styles["SectionTitle"]),
            Paragraph(
                "Vous pouvez prolonger ce guide sur Litho Intelligence pour obtenir une recommandation personnalisée, comparer plusieurs pierres, explorer les compatibilités et retrouver le bracelet associé à votre intention.",
                styles["Body"],
            ),
            Spacer(1, 0.08 * cm),
            Paragraph('<link href="https://litho-intelligence.vercel.app" color="#8b4656"><u>https://litho-intelligence.vercel.app</u></link>', styles["Body"]),
            Spacer(1, 0.18 * cm),
            Paragraph(
                "Disclaimer : les informations proposées sont issues des traditions de lithothérapie et des usages symboliques de bien-être. Elles ne remplacent pas un avis médical, un diagnostic, un traitement ou un accompagnement professionnel.",
                styles["Small"],
            ),
        ]
    )

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
