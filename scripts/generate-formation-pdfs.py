import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import Image, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "formation.modules.json"
OUTPUT_DIR = ROOT / "public" / "guides"

INK = colors.HexColor("#241b1d")
MUTED = colors.HexColor("#756768")
ACCENT = colors.HexColor("#8b4656")
DEEP = colors.HexColor("#314f4a")
GOLD = colors.HexColor("#b98434")
LINE = colors.HexColor("#e3d4cd")
SURFACE = colors.HexColor("#fffaf7")
SOFT = colors.HexColor("#f7e7e1")


def clean(text):
    return (
        str(text)
        .replace("œ", "oe")
        .replace("Œ", "OE")
        .replace("’", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("–", "-")
        .replace("—", "-")
    )


def slug_from_url(url):
    return Path(url).name


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="Kicker", fontName="Helvetica-Bold", fontSize=9.5, leading=12, textColor=GOLD, spaceAfter=6))
    styles.add(ParagraphStyle(name="FormationTitle", fontName="Helvetica-Bold", fontSize=24, leading=29, textColor=INK, spaceAfter=8))
    styles.add(ParagraphStyle(name="FormationLead", fontName="Helvetica", fontSize=11, leading=16, textColor=MUTED, alignment=TA_LEFT, spaceAfter=10))
    styles.add(ParagraphStyle(name="FormationHeading", fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=ACCENT, spaceBefore=8, spaceAfter=5))
    styles.add(ParagraphStyle(name="FormationBody", fontName="Helvetica", fontSize=9.7, leading=14, textColor=INK, spaceAfter=6))
    styles.add(ParagraphStyle(name="FormationSmall", fontName="Helvetica", fontSize=8.4, leading=11.5, textColor=MUTED))
    styles.add(ParagraphStyle(name="Answer", fontName="Helvetica-Bold", fontSize=9.2, leading=12.5, textColor=DEEP))
    return styles


def panel(flowables, background=SURFACE):
    table = Table([[flowables]], colWidths=[16.4 * cm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(2 * cm, 1.35 * cm, 19 * cm, 1.35 * cm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(2 * cm, 0.9 * cm, "Litho Intelligence - Formation gratuite")
    canvas.drawRightString(19 * cm, 0.9 * cm, f"Page {doc.page}")
    canvas.restoreState()


def option_letter(index):
    return ["A", "B", "C", "D"][index]


def build_module_pdf(module, styles):
    output = OUTPUT_DIR / slug_from_url(module["pdfUrl"])
    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        rightMargin=1.7 * cm,
        leftMargin=1.7 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.7 * cm,
        title=f"Formation Litho Intelligence - Module {module['step']}",
        author="Litho Intelligence",
    )

    story = [
        Paragraph(f"Module {module['step']} - {clean(module['duration'])} - {clean(module['level'])}", styles["Kicker"]),
        Paragraph(clean(module["title"]), styles["FormationTitle"]),
        Paragraph(clean(module["goal"]), styles["FormationLead"]),
        panel(
            [
                Paragraph("<b>Objectifs pedagogiques</b>", styles["FormationHeading"]),
                *[Paragraph(f"- {clean(objective)}", styles["FormationBody"]) for objective in module["objectives"]],
            ],
            SOFT,
        ),
        Spacer(1, 0.25 * cm),
    ]

    image = module.get("image")
    if image:
        image_path = ROOT / "public" / image["src"].lstrip("/")
        if image_path.exists():
            story.extend(
                [
                    Image(str(image_path), width=8.4 * cm, height=4.7 * cm, kind="proportional"),
                    Paragraph(clean(image.get("caption", "")), styles["FormationSmall"]),
                    Spacer(1, 0.18 * cm),
                ]
            )

    for section in module["course"]:
        story.append(Paragraph(clean(section["heading"]), styles["FormationHeading"]))
        story.append(Paragraph(clean(section["body"]), styles["FormationBody"]))
        for bullet in section.get("bullets", []):
            story.append(Paragraph(f"- {clean(bullet)}", styles["FormationBody"]))

    story.extend(
        [
            Spacer(1, 0.12 * cm),
            panel([Paragraph("<b>Exercice pratique</b>", styles["FormationHeading"]), Paragraph(clean(module["exercise"]), styles["FormationBody"])]),
            Spacer(1, 0.25 * cm),
            Paragraph("QCM de validation", styles["FormationHeading"]),
        ]
    )

    for index, question in enumerate(module["quiz"], start=1):
        story.append(Paragraph(f"{index}. {clean(question['question'])}", styles["FormationBody"]))
        for option_index, option in enumerate(question["options"]):
            story.append(Paragraph(f"{option_letter(option_index)}. {clean(option)}", styles["FormationSmall"]))
        story.append(Paragraph(f"Reponse : {option_letter(question['answer'])} - {clean(question['explanation'])}", styles["Answer"]))
        story.append(Spacer(1, 0.08 * cm))

    story.extend(
        [
            Spacer(1, 0.18 * cm),
            Paragraph("Cadre responsable", styles["FormationHeading"]),
            Paragraph(
                "Les informations proposees reposent sur les traditions, croyances et usages symboliques associes aux pierres naturelles. Elles ne remplacent pas un avis medical, psychologique ou professionnel.",
                styles["FormationSmall"],
            ),
        ]
    )

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return output


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    modules = json.loads(DATA.read_text(encoding="utf-8"))
    styles = build_styles()

    for module in modules:
        output = build_module_pdf(module, styles)
        print(re.sub(r"^.*public", "public", str(output)))


if __name__ == "__main__":
    main()
