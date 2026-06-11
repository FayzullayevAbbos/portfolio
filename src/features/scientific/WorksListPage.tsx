"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { PUBLICATIONS } from "@/data/content";

// Publications keep their original citation language; we render them as a
// numbered reference list.
export function WorksListPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("worksList")}
        description={`${PUBLICATIONS.length}+`}
        crumbs={[{ label: t("scientificWorks") }, { label: t("worksList") }]}
      />
      <Section>
        <Container>
          <ol className="max-w-3xl space-y-3">
            {PUBLICATIONS.map((citation, index) => (
              <li
                key={index}
                className="flex gap-4 border-b border-border pb-3 text-[15px] leading-relaxed text-foreground/85"
              >
                <span className="shrink-0 font-serif font-semibold text-primary tabular-nums">
                  {index + 1}.
                </span>
                <span>{citation}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
