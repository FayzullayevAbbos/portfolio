// Supported UI languages for the portfolio. Uzbek is primary; Russian and
// English mirror the source site's trilingual content.
export const SUPPORTED_LANGUAGES = ["uz", "ru", "en"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = "uz";
export const LANGUAGE_STORAGE_KEY = "portfolio-language";

export const LANGUAGE_LABELS: Record<AppLanguage, { name: string; short: string }> = {
  uz: { name: "O'zbekcha", short: "UZ" },
  ru: { name: "Русский", short: "RU" },
  en: { name: "English", short: "EN" },
};

export function isSupportedLanguage(value: string | null): value is AppLanguage {
  return value !== null && SUPPORTED_LANGUAGES.includes(value as AppLanguage);
}

// Server renders the default language for deterministic markup; the client
// re-applies the persisted choice after mount (see LanguageProvider).
export function getInitialLanguage(): AppLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isSupportedLanguage(stored) ? stored : DEFAULT_LANGUAGE;
}
