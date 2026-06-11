"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";
import { EDUCATION } from "@/data/content";

export function EducationPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("education")}
        crumbs={[{ label: t("info") }, { label: t("education") }]}
      />
      <Section>
        <Container>
          <Timeline items={EDUCATION} />
        </Container>
      </Section>
    </>
  );
}
