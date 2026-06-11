"use client";

import type { Localized } from "@/data/lists";
import { useLanguage } from "@/lib/i18n/useLanguage";

// Renders localized rows as a vertical timeline. The leading year range is
// pulled out of each line and shown as the marker label.
export function Timeline({ items }: { items: Localized[] }) {
  const { currentLang } = useLanguage();

  return (
    <ol className="relative max-w-3xl border-l border-border pl-6">
      {items.map((item, index) => {
        const text = item[currentLang];
        const match = text.match(/^([0-9]{4}\s*[-–]\s*(?:[0-9]{4}|h\.v\.|н\.в\.|pr\.|[a-zа-я.]+)?)\s*[-–—.]*\s*(.*)$/i);
        const period = match ? match[1].trim() : "";
        const rest = match ? match[2].trim() : text;
        return (
          <li key={index} className="mb-7 last:mb-0">
            <span className="absolute -left-[7px] mt-1 size-3.5 rounded-full border-2 border-background bg-primary" />
            {period && (
              <p className="font-serif text-sm font-semibold text-primary">{period}</p>
            )}
            <p className="mt-1 text-[15px] leading-relaxed text-foreground/85">
              {rest || text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
