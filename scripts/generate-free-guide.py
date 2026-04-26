from pathlib import Path
from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from PIL import Image as PILImage


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "guides" / "guide-10-pierres-essentielles-litho-intelligence.pdf"
IMAGES = ROOT / "public" / "images" / "stones"

GOLD = colors.HexColor("#d9b46f")
VIOLET = colors.HexColor("#251735")
INK = colors.HexColor("#1b1424")
MUTED = colors.HexColor("#6b6073")
PAPER = colors.HexColor("#fbf7ef")
LINE = colors.HexColor("#e7dcc6")

STONES = [
    {
        "name": "Labradorite",
        "image": "labradorite.png",
        "intention": "Protection, sensibilite et respiration emotionnelle",
        "summary": "La labradorite est souvent choisie par les personnes qui se sentent vite chargees par l'ambiance des autres. Dans les traditions, elle accompagne l'idee de filtre et de recentrage.",
        "when": "Quand vous sortez d'une journee lourde, d'un open space intense ou d'un echange qui vous a vide.",
        "usage": "Portez-la en bracelet quand vous etes en contact avec beaucoup de monde ou gardez-la dans la poche au moment des transitions.",
        "ritual": "Fermez les yeux, inspirez lentement trois fois, puis imaginez une limite claire et paisible autour de vous.",
        "association": "Elle se marie bien avec le cristal de roche pour clarifier l'intention et avec l'amethyste pour adoucir la charge nerveuse.",
    },
    {
        "name": "Quartz rose",
        "image": "quartz-rose.png",
        "intention": "Douceur, lien affectif et apaisement du coeur",
        "summary": "Le quartz rose est la pierre-refuge des moments ou l'on a besoin de chaleur, de reconfort ou d'une relation plus tendre a soi-meme. Il est traditionnellement relie a l'amour, a la delicatesse et au retour a une parole interieure plus douce.",
        "when": "Quand vous vous sentez seul, blesse, trop dur avec vous-meme ou dans une periode de vulnerabilite affective.",
        "usage": "Placez-le pres du coeur, sur une table de nuit ou portez-le dans une tenue du quotidien pour garder un rappel discret.",
        "ritual": "Posez la pierre pres de la poitrine et repetez : je m'accorde plus de douceur, de respect et de calme.",
        "association": "Le quartz rose fonctionne bien avec la rhodonite pour les blessures emotionnelles et avec la pierre de lune pour une energie plus intuitive.",
    },
    {
        "name": "Oeil de tigre",
        "image": "oeil-de-tigre.png",
        "intention": "Confiance, courage et passage a l'action",
        "summary": "L'oeil de tigre accompagne les moments ou l'on veut se remettre en mouvement. Dans les usages symboliques, il rappelle la solidite, l'affirmation de soi et la capacite a avancer sans se disperser.",
        "when": "Avant une prise de parole, une decision, un rendez-vous important ou quand vous sentez que le doute prend trop de place.",
        "usage": "Portez-le en bracelet dans la journee ou tenez-le quelques minutes avant une action concrete.",
        "ritual": "Ancrez les pieds au sol, posez une main sur le ventre et formulez l'action precise que vous choisissez aujourd'hui.",
        "association": "Il peut etre couple a la citrine pour l'elan et a la cornaline pour soutenir une dynamique plus audacieuse.",
    },
    {
        "name": "Amethyste",
        "image": "amethyste.png",
        "intention": "Calme, recul et clarte interieure",
        "summary": "L'amethyste est une pierre classique pour apaiser le mental et ralentir le rythme interieur. Elle est traditionnellement associee aux moments de recul, de recentrage et de pacification symbolique.",
        "when": "Quand vous vous sentez submerge, irritable, agite ou quand vous avez besoin de redescendre d'une intensite emotionnelle.",
        "usage": "Gardez-la pres de vous pendant une pause, une lecture, un rituel du soir ou quelques minutes de respiration.",
        "ritual": "Inspirez sur quatre temps, expirez sur six temps, puis laissez une phrase courte emerger : je reviens au calme.",
        "association": "Avec la howlite ou la lepidolite, elle renforce un axe de serenite et de decontraction symbolique.",
    },
    {
        "name": "Citrine",
        "image": "citrine.png",
        "intention": "Abondance, optimisme et rayonnement",
        "summary": "La citrine porte une energie solaire tres appreciee pour travailler l'estime, l'expansion et une relation plus confiante a l'abondance. Selon les traditions, elle soutient les projets, l'envie de creer et la joie d'agir.",
        "when": "Quand vous manquez d'elan, que votre motivation baisse ou que vous voulez relancer un projet avec plus de clarte et de confiance.",
        "usage": "Placez-la sur un bureau, dans un sac ou a proximite d'un carnet d'objectifs.",
        "ritual": "Ecrivez une intention concrete de la journee puis tenez la pierre deux minutes en visualisant l'action deja engagee.",
        "association": "Elle s'associe bien a l'oeil de tigre pour la confiance et au cristal de roche pour amplifier une intention simple.",
    },
    {
        "name": "Cornaline",
        "image": "cornaline.png",
        "intention": "Vitalite, envie et creativite",
        "summary": "La cornaline est souvent reliee a l'audace douce, a l'energie de depart et au plaisir d'entrer dans l'action. Elle accompagne symboliquement les periodes ou l'on veut remettre du mouvement dans sa vie.",
        "when": "Quand vous procrastinez, que vous vous sentez ralenti ou que vous voulez ranimer une impulsion creative ou affective.",
        "usage": "Portez-la lors d'un moment de travail, d'une rencontre ou quand vous voulez soutenir un nouvel elan.",
        "ritual": "Choisissez une seule action de dix minutes, tenez la pierre en main, puis commencez sans attendre la motivation parfaite.",
        "association": "Elle fonctionne bien avec le jaspe rouge pour l'ancrage et avec la citrine pour un axe plus lumineux et entreprenant.",
    },
    {
        "name": "Jaspe rouge",
        "image": "jaspe-rouge.png",
        "intention": "Ancrage, stabilite et force tranquille",
        "summary": "Le jaspe rouge evoque la base, le sol, la constance et le retour a l'essentiel. C'est une pierre de soutien quand il faut revenir au concret et retrouver une sensation de tenue interieure.",
        "when": "Quand vous vous sentez eparpille, fatigue par trop d'informations ou en manque de structure.",
        "usage": "Utilisez-le dans la main pendant quelques minutes ou placez-le pres de vous dans un moment ou vous avez besoin de stabilite.",
        "ritual": "Sentez vos pieds au sol et nommez trois choses concretes que vous pouvez faire aujourd'hui sans vous brusquer.",
        "association": "Le jaspe rouge peut etre soutenu par la tourmaline noire pour l'ancrage ou la cornaline pour ajouter une dimension plus vivante.",
    },
    {
        "name": "Aventurine verte",
        "image": "aventurine-verte.png",
        "intention": "Equilibre du coeur, renouveau et respiration",
        "summary": "L'aventurine verte est traditionnellement associee a l'ouverture, au coeur et a une forme de chance douce. Elle accompagne bien les periodes de reajustement, de reprise et de nouveau depart.",
        "when": "Quand vous sortez d'une tension affective, d'un changement ou d'une phase ou vous cherchez plus d'equilibre.",
        "usage": "Portez-la dans les periodes de transition ou gardez-la a proximite d'un espace ou vous prenez vos decisions importantes.",
        "ritual": "Respirez calmement puis demandez-vous : quelle option respecte le mieux mon equilibre et mon rythme reel ?",
        "association": "Elle se combine facilement au quartz rose pour la douceur et a la citrine pour une energie d'ouverture plus rayonnante.",
    },
    {
        "name": "Lapis-lazuli",
        "image": "lapis-lazuli.png",
        "intention": "Verite personnelle, expression et discernement",
        "summary": "Le lapis-lazuli est souvent relie a la parole juste, a la lucidite et a la clarte d'expression. C'est une pierre interessante quand l'enjeu n'est pas d'en dire plus, mais d'exprimer mieux.",
        "when": "Avant une conversation importante, une prise de position, une ecriture ou une decision qui demande de la clarte.",
        "usage": "Gardez-le pres de vous avant d'ecrire, de parler ou de mettre une intention en mots.",
        "ritual": "Notez une phrase vraie, simple et respectueuse que vous souhaitez incarner ou dire dans la journee.",
        "association": "Il s'accorde bien a la sodalite pour la clarte mentale et au cristal de roche pour structurer une intention.",
    },
    {
        "name": "Cristal de roche",
        "image": "quartz-clair.png",
        "intention": "Clarte, amplification et recentrage",
        "summary": "Le cristal de roche est souvent utilise comme pierre de clarte. Il a une place particuliere parce qu'il peut soutenir une intention simple ou accompagner d'autres pierres dans un rituel plus personnel.",
        "when": "Quand vous ne savez pas encore quelle pierre choisir ou quand vous voulez partir d'une intention claire avant tout.",
        "usage": "Utilisez-le seul pour un moment de recentrage ou associez-le a une pierre plus specifique selon votre besoin.",
        "ritual": "Tenez-le en main deux minutes et formulez une intention breve, positive et realiste que vous pourrez relire dans la journee.",
        "association": "C'est la pierre la plus facile a associer : elle renforce une intention de protection, d'amour, de calme ou de confiance selon la pierre compagne.",
    },
]


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=30,
            leading=35,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subtitle",
            fontName="Helvetica",
            fontSize=13,
            leading=19,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="StoneTitle",
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=20,
            textColor=VIOLET,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCopy",
            fontName="Helvetica",
            fontSize=10.2,
            leading=14.4,
            textColor=INK,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            fontName="Helvetica",
            fontSize=8.4,
            leading=12,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CardMeta",
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=MUTED,
        )
    )
    return styles


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(2 * cm, 1.15 * cm, "Litho Intelligence")
    canvas.drawRightString(19 * cm, 1.15 * cm, f"Page {doc.page}")
    canvas.restoreState()


def optimized_image(path):
    with PILImage.open(path) as original:
        image = original.convert("RGB")
        image.thumbnail((900, 900))
        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=82, optimize=True)
        buffer.seek(0)
    return Image(buffer, width=5.2 * cm, height=5.2 * cm)


def stone_card(styles, stone, index):
    image = optimized_image(IMAGES / stone["image"])
    image.hAlign = "CENTER"

    text_rows = [
        Paragraph(f"{index}. {stone['name']}", styles["StoneTitle"]),
        Paragraph(stone["intention"], styles["CardMeta"]),
        Spacer(1, 0.12 * cm),
        Paragraph(stone["summary"], styles["BodyCopy"]),
        Spacer(1, 0.16 * cm),
        Paragraph(f"<b>Quand la choisir :</b> {stone['when']}", styles["BodyCopy"]),
        Spacer(1, 0.12 * cm),
        Paragraph(f"<b>Utilisation simple :</b> {stone['usage']}", styles["BodyCopy"]),
        Spacer(1, 0.12 * cm),
        Paragraph(f"<b>Mini-rituel :</b> {stone['ritual']}", styles["BodyCopy"]),
        Spacer(1, 0.12 * cm),
        Paragraph(f"<b>Bonne association :</b> {stone['association']}", styles["BodyCopy"]),
    ]

    text_table = Table([[item] for item in text_rows], colWidths=[10.2 * cm])
    text_table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    table = Table([[image, text_table]], colWidths=[5.8 * cm, 10.2 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    return table


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=2.0 * cm,
        leftMargin=2.0 * cm,
        topMargin=1.8 * cm,
        bottomMargin=1.8 * cm,
        title="Les 10 pierres essentielles - Litho Intelligence",
        author="Litho Intelligence",
    )

    story = [
        Spacer(1, 2.2 * cm),
        Paragraph("Les 10 pierres essentielles", styles["CoverTitle"]),
        Paragraph(
            "Un guide visuel et pratique pour choisir vos premieres pierres selon vos emotions, vos intentions et vos moments de vie.",
            styles["Subtitle"],
        ),
        Spacer(1, 0.4 * cm),
    ]

    intro = Table(
        [
            [
                Paragraph(
                    "Litho Intelligence vous aide a construire un rituel personnel simple, beau et coherent. "
                    "Ce guide presente dix pierres tres connues, faciles a comprendre et utiles pour debuter sans se perdre dans trop d'informations.",
                    styles["BodyCopy"],
                )
            ]
        ],
        colWidths=[16.3 * cm],
    )
    intro.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.8, GOLD),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 15),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 15),
            ]
        )
    )
    story.extend(
        [
            intro,
            Spacer(1, 0.45 * cm),
            Paragraph(
                "Les indications proposees reposent sur les traditions de lithotherapie et les usages symboliques associes aux pierres naturelles. "
                "Elles accompagnent une demarche de bien-etre et ne remplacent jamais un avis medical.",
                styles["Small"],
            ),
            PageBreak(),
            Paragraph("Comment utiliser ce guide", styles["SectionTitle"]),
            Paragraph(
                "Ne cherchez pas la pierre parfaite. Commencez par nommer votre besoin principal : protection, calme, amour, confiance, energie, clarté ou abondance. "
                "Choisissez ensuite une pierre dont l'image, le symbole ou l'intention vous parle vraiment. La regularite d'usage compte souvent davantage que la complexite du rituel.",
                styles["BodyCopy"],
            ),
            Spacer(1, 0.28 * cm),
            Paragraph(
                "<b>Methode simple :</b> une pierre, une intention, un geste. Portez-la, tenez-la quelques minutes ou placez-la dans un endroit associe a votre objectif du moment.",
                styles["BodyCopy"],
            ),
            Spacer(1, 0.32 * cm),
            Paragraph(
                "<b>Exemple :</b> je choisis le quartz rose si j'ai besoin de douceur, la labradorite si je me sens trop charge, ou la citrine si j'ai besoin de relancer mon elan.",
                styles["BodyCopy"],
            ),
            Spacer(1, 0.55 * cm),
        ]
    )

    for index, stone in enumerate(STONES, start=1):
        story.append(stone_card(styles, stone, index))
        story.append(Spacer(1, 0.32 * cm))
        if index in (2, 4, 6, 8):
            story.append(PageBreak())

    story.extend(
        [
            PageBreak(),
            Paragraph("Purifier, recharger, observer", styles["SectionTitle"]),
            Paragraph(
                "Pour un usage simple, privilegiez la fumigation douce, la lumiere lunaire ou une geode de quartz. "
                "Evitez l'eau si vous n'etes pas certain que la pierre la tolere bien. L'important n'est pas d'accumuler les techniques, mais de garder un cadre sobre et regulier.",
                styles["BodyCopy"],
            ),
            Spacer(1, 0.28 * cm),
            Paragraph(
                "Le meilleur indicateur reste votre usage reel : est-ce que la pierre vous aide a vous souvenir d'une intention utile, d'un geste d'apaisement ou d'une qualite interieure a nourrir ?",
                styles["BodyCopy"],
            ),
            Spacer(1, 0.5 * cm),
            Paragraph("Votre prochaine etape", styles["SectionTitle"]),
            Paragraph(
                "Revenez sur Litho Intelligence pour obtenir une recommandation personnalisee, comparer plusieurs pierres, explorer les compatibilites ou acceder directement au bracelet associe a votre intention.",
                styles["BodyCopy"],
            ),
            Spacer(1, 0.35 * cm),
            Paragraph("https://litho-intelligence.vercel.app", styles["BodyCopy"]),
            Spacer(1, 0.7 * cm),
            Paragraph(
                "Disclaimer : les informations proposees sont issues des traditions de lithotherapie et des usages symboliques de bien-etre. "
                "Elles ne remplacent pas un avis medical, psychologique ou professionnel.",
                styles["Small"],
            ),
        ]
    )

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
