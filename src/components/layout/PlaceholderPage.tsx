"use client";

import { useTranslation } from "react-i18next";

import { PageHeader, type Crumb } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";

// Generic page for sections whose real content is not yet wired. Keeps the nav
// fully functional with an honest "in preparation" state.
export function PlaceholderPage({
  titleKey,
  crumbKeys = [],
}: {
  titleKey: string;
  crumbKeys?: string[];
}) {
  const { t } = useTranslation(["nav", "common"]);
  const crumbs: Crumb[] = crumbKeys.map((key) => ({ label: t(`nav:${key}`) }));

  return (
    <>
      <PageHeader title={t(`nav:${titleKey}`)} crumbs={crumbs} />
      <Section>
        <Container>
          <EmptyState message={t("common:inPreparation")} />
        </Container>
      </Section>
    </>
  );
}
