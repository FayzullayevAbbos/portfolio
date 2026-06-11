// Aggregates per-namespace JSON locale files into one resource bundle per
// language. Each namespace lives in its own file so areas can be translated
// independently.
import commonEn from "./locales/en/common.json";
import navEn from "./locales/en/nav.json";
import homeEn from "./locales/en/home.json";
import footerEn from "./locales/en/footer.json";

import commonRu from "./locales/ru/common.json";
import navRu from "./locales/ru/nav.json";
import homeRu from "./locales/ru/home.json";
import footerRu from "./locales/ru/footer.json";

import commonUz from "./locales/uz/common.json";
import navUz from "./locales/uz/nav.json";
import homeUz from "./locales/uz/home.json";
import footerUz from "./locales/uz/footer.json";

export const uz = {
  common: commonUz,
  nav: navUz,
  home: homeUz,
  footer: footerUz,
};

export const ru = {
  common: commonRu,
  nav: navRu,
  home: homeRu,
  footer: footerRu,
};

export const en = {
  common: commonEn,
  nav: navEn,
  home: homeEn,
  footer: footerEn,
};
