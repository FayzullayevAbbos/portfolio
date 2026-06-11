"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container, Section } from "@/components/ui/section";
import { HOME_GALLERY } from "@/data/home";

export function GalleryPreview() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("photoGallery")}
          </h2>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {t("common:viewAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {HOME_GALLERY.map((item, index) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
            >
              <Image
                src={item.image}
                alt={item.title ?? `${t("photoGallery")} ${item.id}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 4}
              />
              <span className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/15" />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
