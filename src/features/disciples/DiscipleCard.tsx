"use client";

import Image from "next/image";

import type { Disciple } from "@/data/disciples";
import { useLanguage } from "@/lib/i18n/useLanguage";

export function DiscipleCard({ disciple }: { disciple: Disciple }) {
  const { currentLang } = useLanguage();
  const position = disciple.position[currentLang];
  const topic = disciple.topic[currentLang];

  return (
    <article className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:size-24">
        {disciple.image ? (
          <Image
            src={disciple.image}
            alt={disciple.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center font-serif text-2xl text-muted-foreground">
            {disciple.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-base font-semibold text-foreground">
          {disciple.name}
        </h3>
        {position && (
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {position}
          </p>
        )}
        {topic && (
          <p className="mt-2 border-t border-border pt-2 text-[13px] leading-snug text-foreground/70">
            {topic}
          </p>
        )}
      </div>
    </article>
  );
}
