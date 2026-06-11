"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { CONGRATULATIONS, type Congratulation } from "@/data/content";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { cn } from "@/lib/utils";

export function CongratulationsPage() {
  const { t } = useTranslation(["nav", "common"]);

  return (
    <>
      <PageHeader
        title={t("nav:congratulations")}
        crumbs={[{ label: t("nav:info") }, { label: t("nav:congratulations") }]}
      />
      <Section>
        <Container className="space-y-6">
          {CONGRATULATIONS.map((item) => (
            <CongratulationCard key={item.id} item={item} />
          ))}
        </Container>
      </Section>
    </>
  );
}

function CongratulationCard({ item }: { item: Congratulation }) {
  const { t } = useTranslation("common");
  const { currentLang } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const paragraphs = item.text[currentLang] ?? [];
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="grid items-start gap-6 p-6 sm:grid-cols-[200px_1fr]">
        {item.image && (
          <figure className="relative mx-auto aspect-[3/4] w-full max-w-[200px] self-start overflow-hidden rounded-lg border border-border bg-muted sm:mx-0 sm:max-w-none">
            <Image
              src={item.image}
              alt={item.title[currentLang]}
              fill
              sizes="(max-width: 640px) 200px, 200px"
              className="object-cover object-top"
            />
          </figure>
        )}
        <div>
          <h2 className="font-serif text-lg font-semibold text-foreground">
            {item.title[currentLang]}
          </h2>
          <div
            className={cn(
              "mt-3 space-y-3 text-[15px] leading-relaxed text-foreground/85 [text-align:justify]",
              !expanded && "line-clamp-none",
            )}
          >
            {visible.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {paragraphs.length > 1 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {expanded ? t("showLess") : t("readMore")}
              <ChevronDown
                className={cn("size-4 transition-transform", expanded && "rotate-180")}
                aria-hidden
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
