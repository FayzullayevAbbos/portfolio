import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE } from "./config";
import { en, ru, uz } from "./resources";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      uz,
      ru,
      en,
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
