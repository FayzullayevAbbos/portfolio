# Design system

Akademik portfolio — *ilmiy, aniq, ishonchli*. Dizayn mazmunga xizmat qiladi;
matn legibility va sokin ishonch birinchi o'rinda.

## Typography

- **Display / headings:** Spectral (serif). Ilmiy nashr ohangi, kirill + lotin.
  `letter-spacing: -0.018em` (h1: -0.028em), `text-wrap: balance`.
- **Body / UI:** Manrope (sans). Toza humanist grotesk, kirill + lotin.
  `letter-spacing: -0.006em`.
- Kontrast o'qi: serif sarlavha + sans tana matni. Editorial-magazine
  (italic drop caps, mono eyebrow) ishlatilmaydi.
- Inter / Source Serif / Lora / Fraunces kabi "reflex-reject" fontlar ishlatilmaydi.

## Color (OKLCH/hex tokens, `globals.css`)

- Strategiya: **Restrained** — tiniq sovuq off-white yuza + bitta chuqur
  akademik ko'k urg'u. (Mazmun zich bo'lgani uchun drench mos kelmaydi.)
- `--background #fbfbfc` (sovuq off-white, chroma ~0 — cream-tell yo'q)
- `--primary #14467a` (chuqur akademik ko'k), `--gold #a87c1e` (faqat e'tirof/yutuq)
- Tana matni kontrasti AA dan yuqori (muted ≥ 5.8:1).
- Dark rejim qo'llab-quvvatlanadi (`.dark`).

## Motion

- Sahifalararo nozik `enter-rise` kirish animatsiyasi (`PageTransition`).
- Statistikada scroll-triggered count-up.
- Barchasi `@media (prefers-reduced-motion: reduce)` bilan o'chiriladi.

## Komponentlar

- Layout: `Header` (sticky, dropdown, mobil drawer, til/tema), `Footer`, `PageHeader` (breadcrumb).
- Primitivlar: `Container`/`Section`/`SectionHeading`, `Prose`, `Timeline`,
  `NumberedList`, `WorkGrid`, `EmptyState`.
- Kartalar faqat kerak bo'lganda; "katta yumaloq ikona + sarlavha" klişesi yo'q.

## Tillar

UZ (asosiy) / RU / EN — i18next, `lib/i18n`. Har bir matn uch tilda.
