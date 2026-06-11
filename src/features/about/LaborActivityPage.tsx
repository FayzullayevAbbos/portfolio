"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";
import { LABOR } from "@/data/content";

export function LaborActivityPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("laborActivity")}
        crumbs={[{ label: t("info") }, { label: t("laborActivity") }]}
      />
      <Section>
        <Container>
          <Timeline items={LABOR} />
        </Container>
      </Section>
    </>
  );
}
