import { writeFileSync } from "node:fs";

const path = "public/cv/Joni-Alexander-Cuartas-Pineda-CV.pdf";
const content = [
  "BT",
  "/F1 18 Tf",
  "72 720 Td",
  "(Joni Alexander Cuartas Pineda) Tj",
  "0 -28 Td",
  "(CV placeholder editable.) Tj",
  "0 -22 Td",
  "(Replace with final professional CV PDF.) Tj",
  "0 -22 Td",
  "(jocuartasp@unal.edu.co) Tj",
  "ET"
].join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
pdf += offsets
  .slice(1)
  .map((offset) => `${String(offset).padStart(10, "0")} 00000 n `)
  .join("\n");
pdf += `\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

writeFileSync(path, pdf);
