"use client";

import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { COLLABORATIONS, PUBLISHED_IN } from "@/data/foreign";
import { useLanguage } from "@/lib/i18n/useLanguage";

export function ForeignPage() {
  const { t } = useTranslation("nav");
  const { currentLang } = useLanguage();

  return (
    <>
      <PageHeader
        title={t("foreign")}
        description={t("foreignSubtitle")}
        crumbs={[{ label: t("foreign") }]}
      />
      <Section>
        <Container className="space-y-14">
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {COLLABORATIONS.map((c, i) => (
              <article key={i} className="bg-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-foreground">
                    <MapPin className="size-4 text-primary" aria-hidden />
                    {c.country[currentLang]}
                  </h2>
                  {c.years && (
                    <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      {c.years}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">
                  {c.institution[currentLang]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.focus[currentLang]}
                </p>
              </article>
            ))}
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {t("publishedIn")}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {PUBLISHED_IN[currentLang].map((country) => (
                <li
                  key={country}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground/80"
                >
                  {country}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
