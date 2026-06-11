"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { NumberedList } from "@/components/ui/numbered-list";
import { PROJECTS } from "@/data/lists";

export function ProjectsPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("projects")}
        crumbs={[{ label: t("scientificWorks") }, { label: t("projects") }]}
      />
      <Section>
        <Container>
          <NumberedList items={PROJECTS} />
        </Container>
      </Section>
    </>
  );
}
