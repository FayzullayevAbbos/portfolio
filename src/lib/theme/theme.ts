// Theme handling: "light" | "dark" follow an explicit choice; "system" tracks
// the OS preference. The portfolio is light-first, so light is the default.
export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "portfolio.theme";
const DEFAULT_THEME: ThemeChoice = "light";

export function isThemeChoice(value: unknown): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

export function getStoredTheme(): ThemeChoice {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeChoice(stored) ? stored : DEFAULT_THEME;
}

export function systemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveDark(choice: ThemeChoice): boolean {
  return choice === "system" ? systemPrefersDark() : choice === "dark";
}

export function applyTheme(choice: ThemeChoice): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolveDark(choice));
}

// Inline script (runs before paint) that applies the stored theme to <html>,
// preventing a flash of the wrong theme on first load.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=t==='dark'?true:t==='system'?window.matchMedia('(prefers-color-scheme: dark)').matches:false;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;
