"use client";

import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { JOURNALS } from "@/data/content";
import { useLanguage } from "@/lib/i18n/useLanguage";

export function JournalsPage() {
  const { t } = useTranslation("nav");
  const { currentLang } = useLanguage();

  const groups = [
    { id: 1, labelUz: "Respublikada chop etiladigan jurnallar", labelRu: "Журналы, издаваемые в республике", labelEn: "Journals published in the republic" },
    { id: 2, labelUz: "Chet ellarda chop etiladigan jurnallar", labelRu: "Зарубежные журналы", labelEn: "Journals published abroad" },
  ];
  const label = (g: (typeof groups)[number]) =>
    currentLang === "ru" ? g.labelRu : currentLang === "en" ? g.labelEn : g.labelUz;

  return (
    <>
      <PageHeader
        title={t("journalBoard")}
        crumbs={[{ label: t("scientificWorks") }, { label: t("journalBoard") }]}
      />
      <Section>
        <Container className="space-y-12">
          {groups.map((group) => {
            const items = JOURNALS.filter((j) => j.group === group.id);
            if (items.length === 0) return null;
            return (
              <div key={group.id}>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  {label(group)}
                </h2>
                <ul className="mt-5 space-y-3">
                  {items.map((journal, index) => (
                    <li
                      key={index}
                      className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">
                          {journal.title[currentLang]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {journal.role[currentLang]}
                        </p>
                      </div>
                      {journal.url && (
                        <a
                          href={journal.url.trim()}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          <ExternalLink className="size-4" aria-hidden />
                          {journal.url.replace(/^https?:\/\//, "").split("/")[0]}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Container>
      </Section>
    </>
  );
}
