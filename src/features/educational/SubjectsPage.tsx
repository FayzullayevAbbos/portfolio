"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { NumberedList } from "@/components/ui/numbered-list";
import { SUBJECTS } from "@/data/lists";

export function SubjectsPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("subjects")}
        crumbs={[{ label: t("educationalWorks") }, { label: t("subjects") }]}
      />
      <Section>
        <Container>
          <NumberedList items={SUBJECTS} />
        </Container>
      </Section>
    </>
  );
}
