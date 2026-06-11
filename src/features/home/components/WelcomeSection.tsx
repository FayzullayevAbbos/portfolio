"use client";

import { useTranslation } from "react-i18next";

import { Container, Section } from "@/components/ui/section";

export function WelcomeSection() {
  const { t } = useTranslation("home");

  return (
    <Section className="py-14 sm:py-16">
      <Container className="max-w-3xl text-center">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("welcomeTitle")}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("welcomeText")}
        </p>
      </Container>
    </Section>
  );
}
