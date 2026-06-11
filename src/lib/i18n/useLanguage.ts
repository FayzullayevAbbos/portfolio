"use client";

import { useTranslation } from "react-i18next";

import { LANGUAGE_STORAGE_KEY, type AppLanguage } from "./config";

export function useLanguage() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as AppLanguage;

  const setLanguage = (lang: AppLanguage) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
    void i18n.changeLanguage(lang);
  };

  return { currentLang, setLanguage };
}
