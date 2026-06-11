"use client";

import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { DiscipleCard } from "./DiscipleCard";
import {
  DISCIPLE_GROUPS,
  getDisciplesByCategory,
} from "@/data/disciples";

export function DisciplesPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("disciples")}
        crumbs={[{ label: t("disciples") }]}
      />
      <Section>
        <Container className="space-y-14">
          {DISCIPLE_GROUPS.map((group) => {
            const items = getDisciplesByCategory(group.category);
            if (items.length === 0) return null;
            return (
              <div key={group.category} id={group.category}>
                <h2 className="flex items-center gap-3 font-serif text-xl font-semibold text-foreground">
                  {t(group.labelKey)}
                  <span className="rounded-full bg-accent px-2 py-0.5 text-sm font-medium text-accent-foreground">
                    {items.length}
                  </span>
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {items.map((disciple) => (
                    <DiscipleCard key={disciple.id} disciple={disciple} />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
    </>
  );
}
