"use client";

import Image from "next/image";

import type { WorkItem } from "@/data/works";
import { useLanguage } from "@/lib/i18n/useLanguage";

// Grid of book/work covers with title + optional year. Used by monographs and
// textbooks pages.
export function WorkGrid({ items }: { items: WorkItem[] }) {
  const { currentLang } = useLanguage();

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="group flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
            <Image
              src={item.image}
              alt={item.title[currentLang]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="mt-3 flex items-start gap-2">
            {item.year && (
              <span className="mt-0.5 shrink-0 rounded bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
                {item.year}
              </span>
            )}
            <h3 className="text-sm font-medium leading-snug text-foreground">
              {item.title[currentLang]}
            </h3>
          </div>
        </li>
      ))}
    </ul>
  );
}
