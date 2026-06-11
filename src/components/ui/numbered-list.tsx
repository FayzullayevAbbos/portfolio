"use client";

import type { Localized } from "@/data/lists";
import { useLanguage } from "@/lib/i18n/useLanguage";

// Ordered list of localized text rows with a leading index marker. Used for
// subjects, projects, journals and similar enumerated academic content.
export function NumberedList({ items }: { items: Localized[] }) {
  const { currentLang } = useLanguage();

  return (
    <ol className="max-w-3xl space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {index + 1}
          </span>
          <p className="text-[15px] leading-relaxed text-foreground/85">
            {item[currentLang]}
          </p>
        </li>
      ))}
    </ol>
  );
}
