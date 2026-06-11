"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui/section";
import { GALLERY } from "@/data/home";

export function GalleryPage() {
  const { t } = useTranslation(["nav", "home"]);

  return (
    <>
      <PageHeader
        title={t("home:photoGallery")}
        crumbs={[{ label: t("nav:info") }, { label: t("nav:gallery") }]}
      />
      <Section>
        <Container>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {GALLERY.map((item) => (
              <figure
                key={item.id}
                className="break-inside-avoid overflow-hidden rounded-lg border border-border bg-muted shadow-sm"
              >
                <Image
                  src={item.image}
                  alt={`${t("home:photoGallery")} ${item.id}`}
                  width={600}
                  height={450}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
