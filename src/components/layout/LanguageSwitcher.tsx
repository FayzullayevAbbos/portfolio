"use client";

import { useId, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

import { useLanguage } from "@/lib/i18n/useLanguage";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { currentLang, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const active = LANGUAGE_LABELS[currentLang] ?? LANGUAGE_LABELS.uz;

  return (
    <div
      className={cn("relative", className)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-current/90 transition-colors hover:text-current"
      >
        <Globe className="size-4" aria-hidden />
        <span>{active.short}</span>
        <ChevronDown className="size-3.5 opacity-70" aria-hidden />
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-1 min-w-36 overflow-hidden rounded-lg border border-border bg-popover py-1 text-popover-foreground shadow-pop"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={lang === currentLang}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  lang === currentLang && "font-semibold text-primary",
                )}
              >
                <span>{LANGUAGE_LABELS[lang].name}</span>
                <span className="text-xs text-muted-foreground">
                  {LANGUAGE_LABELS[lang].short}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
