"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { WorkGrid } from "@/components/ui/work-grid";
import { MONOGRAPHS } from "@/data/works";

export function MonographsPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("monographs")}
        crumbs={[{ label: t("scientificWorks") }, { label: t("monographs") }]}
      />
      <Section>
        <Container>
          <WorkGrid items={MONOGRAPHS} />
        </Container>
      </Section>
    </>
  );
}
