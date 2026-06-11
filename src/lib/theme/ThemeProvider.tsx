"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

import {
  applyTheme,
  getStoredTheme,
  THEME_STORAGE_KEY,
  type ThemeChoice,
} from "./theme";

// Module-level store read via useSyncExternalStore keeps SSR deterministic
// ("light") while reading the real stored value on the client with no
// hydration mismatch.
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  for (const listener of listeners) listener();
}

function getSnapshot(): ThemeChoice {
  return getStoredTheme();
}

function getServerSnapshot(): ThemeChoice {
  return "light";
}

function storeTheme(choice: ThemeChoice) {
  window.localStorage.setItem(THEME_STORAGE_KEY, choice);
  applyTheme(choice);
  emit();
}

interface ThemeContextValue {
  theme: ThemeChoice;
  setTheme: (choice: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((choice: ThemeChoice) => storeTheme(choice), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
