"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { NumberedList } from "@/components/ui/numbered-list";
import { OPPOSITION } from "@/data/content";

export function OppositionPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("opposition")}
        crumbs={[{ label: t("scientificWorks") }, { label: t("opposition") }]}
      />
      <Section>
        <Container>
          <NumberedList items={OPPOSITION} />
        </Container>
      </Section>
    </>
  );
}
