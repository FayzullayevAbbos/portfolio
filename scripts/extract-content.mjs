// Extracts the remaining content tables from the source SQL dump into clean
// JSON datasets and copies referenced images. Read-only on the source repo.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SQL = "/Users/abbos/AI/h-zayniddinov.rmmk.uz/h_zayniddinov.sql";
const SRC_ROOT = "/Users/abbos/AI/h-zayniddinov.rmmk.uz/public_html";
const sql = readFileSync(SQL, "utf8");

// --- SQL VALUES tokenizer (handles '' escaped quotes + multiple INSERTs) ---
function tokenizeValues(text, rows) {
  let i = 0;
  const n = text.length;
  while (i < n) {
    while (i < n && text[i] !== "(") i++;
    if (i >= n) break;
    i++;
    const fields = [];
    while (i < n) {
      while (i < n && /[\s,]/.test(text[i])) i++;
      if (text[i] === ")") { i++; break; }
      if (text[i] === "'") {
        i++;
        let v = "";
        while (i < n) {
          if (text[i] === "'" && text[i + 1] === "'") { v += "'"; i += 2; continue; }
          if (text[i] === "'") { i++; break; }
          v += text[i++];
        }
        fields.push(v);
      } else {
        let v = "";
        while (i < n && text[i] !== "," && text[i] !== ")") v += text[i++];
        fields.push(v.trim() === "NULL" ? null : v.trim());
      }
    }
    rows.push(fields);
  }
}

// Collects rows across ALL `INSERT INTO <table>` statements. Each statement's
// rows start right after its own VALUES keyword, so other statements' column
// lists are never mistaken for data.
function parseInsert(table) {
  const marker = "INSERT INTO `" + table + "`";
  const rows = [];
  const starts = [];
  let idx = sql.indexOf(marker);
  while (idx !== -1) {
    starts.push(idx);
    idx = sql.indexOf(marker, idx + marker.length);
  }
  for (let s = 0; s < starts.length; s++) {
    const valuesIdx = sql.indexOf("VALUES", starts[s]) + 6;
    const sectionEnd = sql.indexOf("\n-- ", valuesIdx);
    const nextStart = starts[s + 1] ?? Infinity;
    const end = Math.min(
      sectionEnd === -1 ? Infinity : sectionEnd,
      nextStart,
      sql.length,
    );
    const text = sql.slice(valuesIdx, end).trim().replace(/;\s*$/, "");
    tokenizeValues(text, rows);
  }
  return rows;
}

const decode = (s) =>
  (s || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&laquo;/g, "«").replace(/&raquo;/g, "»")
    .replace(/&ldquo;/g, "\u201c").replace(/&rdquo;/g, "\u201d")
    .replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
    .replace(/&auml;/g, "ä").replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const oneLine = (s) => decode(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Strip leading "1. " / "1.\t" enumeration so the UI can number consistently.
const stripNum = (s) => oneLine(s).replace(/^\d+\.\s*/, "");

// Split HTML bio into clean paragraphs.
function toParagraphs(html) {
  return decode(html)
    .split(/<\/p>|\r\n\r\n|\r\n/gi)
    .map((p) => p.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 1);
}

function tri(a, b, c) {
  return { uz: oneLine(a), ru: oneLine(b), en: oneLine(c) };
}

mkdirSync("src/data", { recursive: true });
const write = (name, data) => {
  writeFileSync(join("src/data", name), JSON.stringify(data, null, 2), "utf8");
  console.log(`  ${name}: ${Array.isArray(data) ? data.length : "ok"}`);
};

function copyImage(rasm, destDir, name) {
  if (!rasm) return "";
  const srcPath = join(SRC_ROOT, rasm);
  const ext = rasm.split(".").pop();
  if (!existsSync(srcPath)) return "";
  mkdirSync(destDir, { recursive: true });
  copyFileSync(srcPath, join(destDir, `${name}.${ext}`));
  return `/images/${destDir.split("/images/")[1]}/${name}.${ext}`;
}

console.log("Extracting:");

// education (talim_ol): id, uz, ru, en
write(
  "education.json",
  parseInsert("talim_ol").map((r) => ({ uz: stripNum(r[1]), ru: stripNum(r[2]), en: stripNum(r[3]) })),
);

// labor (mehnat_faoliyati)
write(
  "labor.json",
  parseInsert("mehnat_faoliyati").map((r) => ({ uz: stripNum(r[1]), ru: stripNum(r[2]), en: stripNum(r[3]) })),
);

// opposition (dissertasiya)
write(
  "opposition.json",
  parseInsert("dissertasiya").map((r) => ({ uz: stripNum(r[1]), ru: stripNum(r[2]), en: stripNum(r[3]) })),
);

// patents text (patent)
write(
  "patents.json",
  parseInsert("patent").map((r) => ({ uz: stripNum(r[1]), ru: stripNum(r[2]), en: stripNum(r[3]) })),
);

// patent certificate images (patent_rasm)
const patentImgs = parseInsert("patent_rasm").map((r, idx) => copyImage(r[1], "public/images/patents", `p${idx + 1}`)).filter(Boolean);
write("patent-images.json", patentImgs);

// journals (ilmiy_jurnal): id,uz,ru,en,role_uz,role_ru,role_en,group,url
write(
  "journals.json",
  parseInsert("ilmiy_jurnal").map((r) => ({
    title: tri(r[1], r[2], r[3]).uz ? { uz: stripNum(r[1]), ru: stripNum(r[2]), en: stripNum(r[3]) } : tri(r[1], r[2], r[3]),
    role: tri(r[4], r[5], r[6]),
    group: Number(r[7]),
    url: r[8] ? r[8].trim() : "",
  })),
);

// publications (ilmiy_faoliyati): uz field carries the real citation
write(
  "publications.json",
  parseInsert("ilmiy_faoliyati").map((r) => stripNum(r[1])).filter(Boolean),
);

// teachers (ustozlar): id,name(uz,ru,en),title(uz,ru,en),bio(uz,ru,en html),rasm
write(
  "teachers.json",
  parseInsert("ustozlar").map((r, idx) => ({
    id: Number(r[0]),
    name: oneLine(r[1]),
    title: tri(r[4], r[5], r[6]),
    bio: { uz: toParagraphs(r[7]), ru: toParagraphs(r[8]), en: toParagraphs(r[9]) },
    image: copyImage(r[10], "public/images/teachers", `t${idx + 1}`),
  })),
);

// congratulations (tabriklar): id,nomi(uz,ru,en),fulltext(uz,ru,en),rasm,fayl
write(
  "congratulations.json",
  parseInsert("tabriklar").map((r, idx) => ({
    id: Number(r[0]),
    title: tri(r[1], r[2], r[3]),
    text: { uz: toParagraphs(r[4]), ru: toParagraphs(r[5]), en: toParagraphs(r[6]) },
    image: copyImage(r[7], "public/images/congratulations", `c${idx + 1}`),
  })),
);

console.log("Done.");
