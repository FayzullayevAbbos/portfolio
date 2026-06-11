# Portfolio — Zaynidinov H.N.

Professor Zaynidinov Hakimjon Nasriddinovichning akademik portfolio sayti.
UI manba sayt (h-zayniddinov.rmmk.uz) dan olingan, zamonaviy stack'da qayta qurilgan.

## Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 (OKLCH/hex design tokens), serif + sans tipografika
- **i18n:** i18next + react-i18next (UZ / RU / EN)
- **Icons:** lucide-react

## Buyruqlar

- `npm run dev` — dev server (port 3002)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript tekshiruvi
- `npm run check` — lint + typecheck + build

## Struktura (feature-based)

```
src/
  app/                 # Next.js route'lar (faqat sahifa kompozitsiyasi)
  components/
    providers/         # AppProviders, Theme, Language
    layout/            # Header, Footer (umumiy layout)
    ui/                # qayta ishlatiladigan primitivlar
  features/            # har bir bo'lim alohida feature
    home/ about/ scientific/ educational/ disciples/ teachers/ foreign/ gallery/
  lib/
    i18n/              # config, init, locales/{uz,ru,en}/*.json
    theme/             # theme tokenlari va provider
    utils.ts           # cn()
  config/              # navigation.ts (menyu daraxti)
  data/                # manba saytdan olingan statik kontent
  types/               # domen tiplari
  hooks/               # custom hook'lar
```

## Dizayn

Dizayn tamoyillari va mahsulot konteksti `.kiro/steering/PRODUCT.md` da.
Dizayn ustida ishlashda `impeccable` skill'idan foydalaning.
