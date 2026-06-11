"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";

export default function Page() {
  const { t } = useTranslation("common");
  return (
    <>
      <PageHeader title={t("login")} crumbs={[{ label: t("login") }]} />
      <Section>
        <Container>
          <EmptyState message={t("inPreparation")} />
        </Container>
      </Section>
    </>
  );
}
