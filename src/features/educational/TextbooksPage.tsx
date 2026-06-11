"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { WorkGrid } from "@/components/ui/work-grid";
import { TEXTBOOKS } from "@/data/works";

export function TextbooksPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("textbooks")}
        crumbs={[{ label: t("educationalWorks") }, { label: t("textbooks") }]}
      />
      <Section>
        <Container>
          <WorkGrid items={TEXTBOOKS} />
        </Container>
      </Section>
    </>
  );
}
