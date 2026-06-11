"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container, Section } from "@/components/ui/section";
import { HOME_SERVICES } from "@/data/home";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  FlaskConical,
  Lightbulb,
  Users,
};

export function ServicesSection() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <Section className="border-y border-border bg-secondary/40">
      <Container>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("sectionsTitle")}
        </h2>
        <div className="mt-8 grid gap-x-12 sm:grid-cols-2">
          {HOME_SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <Link
                key={service.key}
                href={service.href}
                className="group flex items-start gap-4 border-t border-border py-6 transition-colors first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
              >
                {Icon && (
                  <Icon
                    className="mt-1 size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-1.5 font-serif text-lg font-semibold text-foreground">
                    {t(`services.${service.key}`)}
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`services.${service.key}Text`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
