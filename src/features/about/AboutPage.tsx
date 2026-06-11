"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { getBiography, PROFESSOR_IMAGE } from "@/data/about";

export function AboutPage() {
  const { t } = useTranslation(["nav", "common"]);
  const { currentLang } = useLanguage();
  const paragraphs = getBiography(currentLang);

  return (
    <>
      <PageHeader
        title={t("nav:autobiography")}
        crumbs={[{ label: t("nav:info") }, { label: t("nav:autobiography") }]}
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <figure className="overflow-hidden rounded-xl border border-border bg-muted shadow-card">
              <Image
                src={PROFESSOR_IMAGE}
                alt={t("common:professorName")}
                width={260}
                height={300}
                className="h-auto w-full object-cover"
              />
            </figure>
            <p className="mt-4 font-serif text-lg font-semibold text-foreground">
              {t("common:professorName")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("common:professorTitle")}
            </p>
          </aside>

          <Prose paragraphs={paragraphs} className="max-w-none" />
        </Container>
      </Section>
    </>
  );
}
