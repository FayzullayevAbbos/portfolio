"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { Prose } from "@/components/ui/prose";
import { TEACHERS } from "@/data/content";
import { useLanguage } from "@/lib/i18n/useLanguage";

export function TeachersPage() {
  const { t } = useTranslation("nav");
  const { currentLang } = useLanguage();

  return (
    <>
      <PageHeader title={t("teachers")} crumbs={[{ label: t("teachers") }]} />
      <Section>
        <Container className="space-y-16">
          {TEACHERS.map((teacher) => (
            <article
              key={teacher.id}
              className="grid gap-8 lg:grid-cols-[240px_1fr]"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                {teacher.image && (
                  <figure className="overflow-hidden rounded-xl border border-border bg-muted shadow-card">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      width={240}
                      height={280}
                      className="h-auto w-full object-cover"
                    />
                  </figure>
                )}
                <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  {teacher.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {teacher.title[currentLang]}
                </p>
              </div>
              <Prose paragraphs={teacher.bio[currentLang]} className="max-w-none" />
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
}
