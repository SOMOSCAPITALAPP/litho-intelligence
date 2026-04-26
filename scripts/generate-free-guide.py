from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "guides" / "guide-10-pierres-essentielles-litho-intelligence.pdf"

GOLD = colors.HexColor("#d9b46f")
VIOLET = colors.HexColor("#251735")
INK = colors.HexColor("#1b1424")
MUTED = colors.HexColor("#6b6073")
PAPER = colors.HexColor("#fbf7ef")

STONES = [
    {
        "name": "Labradorite",
        "intention": "Protection et sensibilité",
        "message": "Pour les personnes qui absorbent facilement les ambiances, la labradorite est traditionnellement associée à l'idée de bouclier énergétique.",
        "usage": "Portez-la en bracelet lorsque vous êtes en contact avec beaucoup de monde.",
        "ritual": "Respirez trois fois en imaginant une limite douce et claire autour de vous.",
    },
    {
        "name": "Quartz rose",
        "intention": "Douceur, amour et réconciliation",
        "message": "Le quartz rose symbolise l'ouverture du coeur, la tendresse et la capacité à revenir vers soi avec plus de respect.",
        "usage": "Gardez-le près du coeur ou sur une table de nuit.",
        "ritual": "Répétez doucement : je m'ouvre à l'amour avec calme et confiance.",
    },
    {
        "name": "Oeil de tigre",
        "intention": "Confiance et passage à l'action",
        "message": "Dans les traditions, l'oeil de tigre accompagne les intentions de courage, de présence et de protection personnelle.",
        "usage": "Portez-le lors d'une décision, d'un rendez-vous ou d'une prise de parole.",
        "ritual": "Posez une main sur le ventre et formulez l'action simple que vous choisissez aujourd'hui.",
    },
    {
        "name": "Améthyste",
        "intention": "Calme et clarté intérieure",
        "message": "L'améthyste est souvent reliée aux moments de recul, de silence intérieur et d'apaisement symbolique.",
        "usage": "Placez-la près de vous pendant une pause, une lecture ou une méditation courte.",
        "ritual": "Inspirez sur quatre temps, expirez sur six temps, puis laissez retomber les tensions.",
    },
    {
        "name": "Citrine",
        "intention": "Abondance, optimisme et élan",
        "message": "La citrine est traditionnellement associée à une énergie solaire : confiance, créativité et relation plus sereine à l'abondance.",
        "usage": "Gardez-la près de votre espace de travail ou dans une poche lors d'un nouveau projet.",
        "ritual": "Écrivez une intention concrète : aujourd'hui, je crée de la valeur en...",
    },
    {
        "name": "Cornaline",
        "intention": "Vitalité et créativité",
        "message": "La cornaline accompagne symboliquement l'énergie, l'audace et la motivation de commencer.",
        "usage": "Portez-la quand vous avez besoin de relancer votre mouvement intérieur.",
        "ritual": "Choisissez une action de dix minutes et commencez avant de chercher la perfection.",
    },
    {
        "name": "Jaspe rouge",
        "intention": "Ancrage et stabilité",
        "message": "Le jaspe rouge évoque la force tranquille, le corps, la stabilité et le retour à l'essentiel.",
        "usage": "Tenez-le dans la main lorsque vous avez besoin de vous recentrer.",
        "ritual": "Sentez vos pieds au sol et nommez trois choses concrètes qui vous soutiennent.",
    },
    {
        "name": "Aventurine verte",
        "intention": "Coeur, chance et équilibre",
        "message": "L'aventurine verte est liée aux intentions d'apaisement du coeur, d'ouverture et de renouveau.",
        "usage": "Portez-la lors d'un nouveau départ ou d'une décision à prendre avec plus de douceur.",
        "ritual": "Demandez-vous : quelle option respecte le mieux mon équilibre ?",
    },
    {
        "name": "Lapis-lazuli",
        "intention": "Expression et vérité personnelle",
        "message": "Le lapis-lazuli symbolise la parole juste, la lucidité et la capacité à clarifier ce qui compte.",
        "usage": "Gardez-le près de vous avant une conversation importante.",
        "ritual": "Écrivez une phrase vraie, simple et respectueuse que vous souhaitez exprimer.",
    },
    {
        "name": "Cristal de roche",
        "intention": "Clarté et amplification",
        "message": "Le cristal de roche est souvent utilisé comme pierre de clarté, pour soutenir une intention et l'associer à d'autres pierres.",
        "usage": "Associez-le à la pierre qui correspond le mieux à votre besoin du moment.",
        "ritual": "Tenez-le deux minutes en formulant une intention courte, positive et réaliste.",
    },
]


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            fontName="Helvetica-Bold",
            fontSize=31,
            leading=36,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=18,
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
            spaceAfter=18,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=25,
            textColor=INK,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="StoneTitle",
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=VIOLET,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCopy",
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=INK,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
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


def stone_card(styles, stone):
    rows = [
        [Paragraph(f"<b>{stone['name']}</b><br/><font color='#6b6073'>{stone['intention']}</font>", styles["StoneTitle"])],
        [Paragraph(stone["message"], styles["BodyCopy"])],
        [Paragraph(f"<b>Utilisation simple :</b> {stone['usage']}", styles["BodyCopy"])],
        [Paragraph(f"<b>Mini-rituel :</b> {stone['ritual']}", styles["BodyCopy"])],
    ]
    table = Table(rows, colWidths=[16.2 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#e7dcc6")),
                ("LINEBELOW", (0, 0), (-1, 0), 0.5, colors.HexColor("#e7dcc6")),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
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
        rightMargin=2.2 * cm,
        leftMargin=2.2 * cm,
        topMargin=2 * cm,
        bottomMargin=1.8 * cm,
        title="Les 10 pierres essentielles - Litho Intelligence",
        author="Litho Intelligence",
    )

    story = []
    story.append(Spacer(1, 2.4 * cm))
    story.append(Paragraph("Les 10 pierres essentielles", styles["CoverTitle"]))
    story.append(
        Paragraph(
            "Un guide simple pour choisir vos pierres selon vos émotions, vos intentions et vos moments de vie.",
            styles["Subtitle"],
        )
    )
    story.append(Spacer(1, 0.4 * cm))
    intro = Table(
        [
            [
                Paragraph(
                    "Litho Intelligence vous aide à créer un rituel personnel, beau et facile à appliquer. "
                    "Les indications de ce guide reposent sur les traditions de lithothérapie et les usages symboliques associés aux pierres naturelles.",
                    styles["BodyCopy"],
                )
            ]
        ],
        colWidths=[15.5 * cm],
    )
    intro.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.8, GOLD),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 14),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
            ]
        )
    )
    story.append(intro)
    story.append(Spacer(1, 0.7 * cm))
    story.append(Paragraph("À utiliser comme un support de bien-être, jamais comme une promesse médicale.", styles["Small"]))
    story.append(PageBreak())

    story.append(Paragraph("Comment choisir votre pierre", styles["SectionTitle"]))
    story.append(
        Paragraph(
            "Commencez par nommer votre intention : protection, amour, calme, confiance, énergie, abondance ou clarté. "
            "Choisissez ensuite une pierre qui vous attire visuellement. Une pierre portée régulièrement devient surtout un rappel : celui de l'état intérieur que vous souhaitez nourrir.",
            styles["BodyCopy"],
        )
    )
    story.append(Spacer(1, 0.5 * cm))
    story.append(
        Paragraph(
            "<b>Rituel express :</b> prenez la pierre en main, respirez lentement pendant deux minutes, puis formulez une phrase courte au présent. Exemple : je reviens à moi avec calme.",
            styles["BodyCopy"],
        )
    )
    story.append(Spacer(1, 0.7 * cm))

    for index, stone in enumerate(STONES, start=1):
      story.append(stone_card(styles, {**stone, "name": f"{index}. {stone['name']}"}))
      story.append(Spacer(1, 0.35 * cm))
      if index in (4, 8):
          story.append(PageBreak())

    story.append(PageBreak())
    story.append(Paragraph("Purifier et recharger simplement", styles["SectionTitle"]))
    story.append(
        Paragraph(
            "Les pratiques varient selon les traditions. Pour un usage simple, privilégiez la fumigation douce, la lumière lunaire ou une géode de quartz. "
            "Évitez l'eau pour les pierres fragiles ou poreuses si vous n'êtes pas certain de leur tolérance.",
            styles["BodyCopy"],
        )
    )
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph("Votre prochaine étape", styles["SectionTitle"]))
    story.append(
        Paragraph(
            "Revenez sur Litho Intelligence pour obtenir une recommandation personnalisée, comparer plusieurs pierres ou découvrir un bracelet associé à votre intention.",
            styles["BodyCopy"],
        )
    )
    story.append(Spacer(1, 0.45 * cm))
    story.append(Paragraph("https://litho-intelligence.vercel.app", styles["BodyCopy"]))
    story.append(Spacer(1, 0.8 * cm))
    story.append(
        Paragraph(
            "Disclaimer : les informations proposées sont issues des traditions de lithothérapie et des usages symboliques de bien-être. Elles ne remplacent pas un avis médical, psychologique ou professionnel.",
            styles["Small"],
        )
    )

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
