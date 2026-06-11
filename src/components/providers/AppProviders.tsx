"use client";

import { LanguageProvider } from "./LanguageProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
