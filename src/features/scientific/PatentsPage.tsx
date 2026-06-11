"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { NumberedList } from "@/components/ui/numbered-list";
import { PATENTS, PATENT_IMAGES } from "@/data/content";

export function PatentsPage() {
  const { t } = useTranslation("nav");

  return (
    <>
      <PageHeader
        title={t("patents")}
        crumbs={[{ label: t("scientificWorks") }, { label: t("patents") }]}
      />
      <Section>
        <Container className="space-y-10">
          <NumberedList items={PATENTS} />

          {PATENT_IMAGES.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {PATENT_IMAGES.map((src, index) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted"
                >
                  <Image
                    src={src}
                    alt={`${t("patents")} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
