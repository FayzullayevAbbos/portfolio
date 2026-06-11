"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/lib/i18n/i18n";
import { getInitialLanguage } from "@/lib/i18n/config";

// Initializes i18next and re-applies the persisted language after mount. SSR
// always renders the default language so server and first client paint match.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lang = getInitialLanguage();
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
