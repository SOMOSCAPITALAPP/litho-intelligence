import type { ConsultationProfile, ConsultationResponse } from "@/lib/consultation";

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 54;
const MARGIN_TOP = 66;
const MARGIN_BOTTOM = 60;
const BODY_SIZE = 11;
const SMALL_SIZE = 9;
const TITLE_SIZE = 22;
const SECTION_SIZE = 14;
const LINE_HEIGHT = 16;

type Line = {
  text: string;
  font: "F1" | "F2";
  size: number;
  color?: [number, number, number];
  gapAfter?: number;
};

function normalizeText(text: string) {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function pdfEscape(text: string) {
  return normalizeText(text)
    .split("")
    .map((character) => {
      if (character === "\\" || character === "(" || character === ")") {
        return `\\${character}`;
      }

      const code = character.charCodeAt(0);
      if (code < 32 || code > 126) {
        if (code <= 255) return `\\${code.toString(8).padStart(3, "0")}`;
        return "?";
      }

      return character;
    })
    .join("");
}

function wrapText(text: string, maxChars: number) {
  const words = normalizeText(text).split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function buildLineSet(response: ConsultationResponse, profile: ConsultationProfile, createdAt: string) {
  const createdLabel = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris"
  }).format(new Date(createdAt));

  const lines: Line[] = [
    { text: "Litho Intelligence", font: "F2", size: SMALL_SIZE, color: [0.55, 0.41, 0.17], gapAfter: 12 },
    { text: "Synthèse de consultation privée", font: "F2", size: TITLE_SIZE, color: [0.15, 0.09, 0.22], gapAfter: 10 },
    {
      text: `Consultation du ${createdLabel}${profile.recipient ? ` • Destinée à ${profile.recipient}` : ""}`,
      font: "F1",
      size: BODY_SIZE,
      color: [0.22, 0.22, 0.25],
      gapAfter: 4
    },
    profile.age || profile.sex
      ? {
          text: `Contexte : ${profile.age ? `${profile.age}` : "âge non précisé"}${profile.sex ? ` • ${profile.sex}` : ""}`,
          font: "F1",
          size: BODY_SIZE,
          color: [0.22, 0.22, 0.25],
          gapAfter: 16
        }
      : { text: "", font: "F1", size: BODY_SIZE, gapAfter: 0 },
    { text: response.title, font: "F2", size: SECTION_SIZE, color: [0.18, 0.11, 0.27], gapAfter: 8 }
  ];

  wrapText(response.answer, 88).forEach((line) => lines.push({ text: line, font: "F1", size: BODY_SIZE }));
  lines.push({ text: "", font: "F1", size: BODY_SIZE, gapAfter: 10 });
  lines.push({ text: response.grounding, font: "F1", size: BODY_SIZE, color: [0.38, 0.27, 0.12], gapAfter: 16 });

  lines.push({ text: "Problèmes ou tensions repérés", font: "F2", size: SECTION_SIZE, color: [0.18, 0.11, 0.27], gapAfter: 8 });
  response.insights.forEach((insight) => {
    lines.push({ text: insight.issue, font: "F2", size: BODY_SIZE, color: [0.15, 0.09, 0.22], gapAfter: 4 });
    wrapText(insight.reading, 86).forEach((line) => lines.push({ text: line, font: "F1", size: BODY_SIZE }));
    lines.push({
      text: `Pierres idéales : ${insight.stoneNames.join(", ")}`,
      font: "F1",
      size: BODY_SIZE,
      color: [0.38, 0.27, 0.12],
      gapAfter: 10
    });
  });

  lines.push({ text: "Sélection de pierres recommandées", font: "F2", size: SECTION_SIZE, color: [0.18, 0.11, 0.27], gapAfter: 8 });
  response.stones.forEach((stone) => {
    lines.push({ text: stone.name, font: "F2", size: BODY_SIZE, color: [0.15, 0.09, 0.22], gapAfter: 4 });
    wrapText(stone.reason, 86).forEach((line) => lines.push({ text: line, font: "F1", size: BODY_SIZE }));
    lines.push({ text: "", font: "F1", size: BODY_SIZE, gapAfter: 8 });
  });

  lines.push({ text: "Cadre de lecture", font: "F2", size: SECTION_SIZE, color: [0.18, 0.11, 0.27], gapAfter: 8 });
  wrapText(response.disclaimer, 90).forEach((line) =>
    lines.push({ text: line, font: "F1", size: SMALL_SIZE, color: [0.34, 0.34, 0.38] })
  );

  return lines.filter((line) => line.text || line.gapAfter);
}

function paginate(lines: Line[]) {
  const pages: Line[][] = [];
  let current: Line[] = [];
  let y = PAGE_HEIGHT - MARGIN_TOP;

  for (const line of lines) {
    const lineCost = (line.text ? line.size + 4 : 0) + (line.gapAfter ?? 0);
    if (y - lineCost < MARGIN_BOTTOM && current.length) {
      pages.push(current);
      current = [];
      y = PAGE_HEIGHT - MARGIN_TOP;
    }
    current.push(line);
    y -= lineCost || 8;
  }

  if (current.length) pages.push(current);
  return pages;
}

function pageContent(lines: Line[], pageIndex: number, totalPages: number) {
  let y = PAGE_HEIGHT - MARGIN_TOP;
  const parts: string[] = [
    "q",
    "0.98 0.96 0.93 rg",
    `${MARGIN_X - 12} ${PAGE_HEIGHT - 112} ${PAGE_WIDTH - (MARGIN_X - 12) * 2} 52 re f`,
    "Q",
    "q",
    "0.84 0.73 0.52 RG",
    `${MARGIN_X - 12} ${MARGIN_BOTTOM - 12} ${PAGE_WIDTH - (MARGIN_X - 12) * 2} ${PAGE_HEIGHT - MARGIN_BOTTOM - 24} re S`,
    "Q"
  ];

  for (const line of lines) {
    if (line.text) {
      const [r, g, b] = line.color ?? [0.12, 0.12, 0.15];
      parts.push("BT");
      parts.push(`/${line.font} ${line.size} Tf`);
      parts.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
      parts.push(`1 0 0 1 ${MARGIN_X} ${y.toFixed(2)} Tm`);
      parts.push(`(${pdfEscape(line.text)}) Tj`);
      parts.push("ET");
      y -= line.size + 4;
    }
    y -= line.gapAfter ?? 0;
  }

  parts.push("BT");
  parts.push(`/F1 ${SMALL_SIZE} Tf`);
  parts.push("0.35 0.35 0.38 rg");
  parts.push(`1 0 0 1 ${MARGIN_X} 34 Tm`);
  parts.push(`(Litho Intelligence) Tj`);
  parts.push("ET");
  parts.push("BT");
  parts.push(`/F1 ${SMALL_SIZE} Tf`);
  parts.push("0.35 0.35 0.38 rg");
  parts.push(`1 0 0 1 ${PAGE_WIDTH - MARGIN_X - 60} 34 Tm`);
  parts.push(`(Page ${pageIndex + 1}/${totalPages}) Tj`);
  parts.push("ET");
  return parts.join("\n");
}

function assemblePdf(pageStreams: string[]) {
  const objects: Buffer[] = [];
  const addObject = (body: string | Buffer) => {
    const objectNumber = objects.length + 1;
    const content = Buffer.isBuffer(body) ? body : Buffer.from(body, "latin1");
    objects.push(Buffer.concat([Buffer.from(`${objectNumber} 0 obj\n`, "latin1"), content, Buffer.from("\nendobj\n", "latin1")]));
    return objectNumber;
  };

  const font1 = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const font2 = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds: number[] = [];
  const contentIds: number[] = [];

  pageStreams.forEach((stream) => {
    const streamBuffer = Buffer.from(stream, "latin1");
    const contentId = addObject(
      Buffer.concat([
        Buffer.from(`<< /Length ${streamBuffer.length} >>\nstream\n`, "latin1"),
        streamBuffer,
        Buffer.from("\nendstream", "latin1")
      ])
    );
    contentIds.push(contentId);
    pageIds.push(0);
  });

  const pagesId = objects.length + pageStreams.length + 1;
  pageStreams.forEach((_, index) => {
    const pageId = addObject(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`
    );
    pageIds[index] = pageId;
  });

  const pages = addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  const catalog = addObject(`<< /Type /Catalog /Pages ${pages} 0 R >>`);

  const header = Buffer.from("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n", "binary");
  const bodyBuffers: Buffer[] = [];
  const offsets: number[] = [0];
  let offset = header.length;

  objects.forEach((objectBuffer) => {
    offsets.push(offset);
    bodyBuffers.push(objectBuffer);
    offset += objectBuffer.length;
  });

  const xrefStart = offset;
  const xrefLines = [`xref\n0 ${objects.length + 1}\n`, "0000000000 65535 f \n"];
  for (let index = 1; index <= objects.length; index += 1) {
    xrefLines.push(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root ${catalog} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.concat([header, ...bodyBuffers, Buffer.from(xrefLines.join(""), "latin1"), Buffer.from(trailer, "latin1")]);
}

export function createConsultationPdf({
  response,
  profile,
  createdAt
}: {
  response: ConsultationResponse;
  profile: ConsultationProfile;
  createdAt: string;
}) {
  const lines = buildLineSet(response, profile, createdAt);
  const pages = paginate(lines);
  return assemblePdf(pages.map((page, index) => pageContent(page, index, pages.length)));
}
