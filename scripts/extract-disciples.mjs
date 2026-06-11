// One-off extractor: parses the `shogirtlar` INSERT from the source SQL dump
// and writes a clean JSON dataset for the disciples page. Read-only on source.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const SQL = "/Users/abbos/AI/h-zayniddinov.rmmk.uz/h_zayniddinov.sql";
const SRC_ROOT = "/Users/abbos/AI/h-zayniddinov.rmmk.uz/public_html";
const OUT_JSON = "src/data/disciples.json";
const IMG_DIR = "public/images/disciples";

const sql = readFileSync(SQL, "utf8");

// Isolate the shogirtlar INSERT statement block.
const start = sql.indexOf("INSERT INTO `shogirtlar`");
const valuesIdx = sql.indexOf("VALUES", start) + "VALUES".length;
const end = sql.indexOf("\n-- ", valuesIdx);
const block = sql.slice(valuesIdx, end).trim().replace(/;\s*$/, "");

// Tokenize the VALUES list into rows of fields, honoring '' escaped quotes.
function parseRows(text) {
  const rows = [];
  let i = 0;
  const n = text.length;
  while (i < n) {
    while (i < n && text[i] !== "(") i++;
    if (i >= n) break;
    i++; // skip (
    const fields = [];
    while (i < n) {
      while (i < n && (text[i] === " " || text[i] === "\n" || text[i] === "\r" || text[i] === ",")) i++;
      if (text[i] === ")") { i++; break; }
      if (text[i] === "'") {
        i++;
        let val = "";
        while (i < n) {
          if (text[i] === "'" && text[i + 1] === "'") { val += "'"; i += 2; continue; }
          if (text[i] === "'") { i++; break; }
          val += text[i++];
        }
        fields.push(val);
      } else {
        let val = "";
        while (i < n && text[i] !== "," && text[i] !== ")") val += text[i++];
        fields.push(val.trim() === "NULL" ? null : val.trim());
      }
    }
    rows.push(fields);
  }
  return rows;
}

// Columns: id,name,qisqa_uz,qisqa_ru,qisqa_en,mavzu_ru,mavzu_en,mavzu_uz,menyu_id,rasm
const rows = parseRows(block);
const CATEGORY = { 1: "dsc", 2: "phd", 3: "abroad", 4: "doctoral", 0: "doctoral" };

mkdirSync(IMG_DIR, { recursive: true });

const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

const disciples = rows.map((r) => {
  const [id, name, qUz, qRu, qEn, mRu, mEn, mUz, menyuId, rasm] = r;
  let image = "";
  if (rasm) {
    const srcPath = join(SRC_ROOT, rasm);
    const ext = rasm.split(".").pop();
    const fileName = `d${id}.${ext}`;
    if (existsSync(srcPath)) {
      copyFileSync(srcPath, join(IMG_DIR, fileName));
      image = `/images/disciples/${fileName}`;
    }
  }
  return {
    id: Number(id),
    name: clean(name),
    category: CATEGORY[Number(menyuId)] ?? "doctoral",
    position: { uz: clean(qUz), ru: clean(qRu), en: clean(qEn) },
    topic: { uz: clean(mUz), ru: clean(mRu), en: clean(mEn) },
    image,
  };
});

mkdirSync(dirname(OUT_JSON), { recursive: true });
writeFileSync(OUT_JSON, JSON.stringify(disciples, null, 2), "utf8");
console.log(`Wrote ${disciples.length} disciples to ${OUT_JSON}`);
const byCat = disciples.reduce((a, d) => ((a[d.category] = (a[d.category] || 0) + 1), a), {});
console.log("By category:", byCat);
console.log("With image:", disciples.filter((d) => d.image).length);
