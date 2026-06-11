"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/section";
import { SignalMotif } from "./SignalMotif";

const CREDENTIALS = [
  { value: "30+", key: "experience" },
  { value: "300+", key: "articles" },
  { value: "50+", key: "patents" },
  { value: "16", key: "scholars" },
] as const;

export function Hero() {
  const { t } = useTranslation(["common", "nav", "home"]);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Atmosphere: a single faint academic-blue wash + the signature signal
          spline. Light, restrained — the surface stays off-white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_120%_at_90%_-10%,var(--accent)_0%,transparent_55%)]"
      />
      <SignalMotif className="pointer-events-none absolute inset-x-0 bottom-0 h-36 w-full text-primary/15 sm:h-44" />

      <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.35fr_1fr] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3.5 py-1.5 text-sm font-medium text-accent-foreground">
            <GraduationCap className="size-4" aria-hidden />
            {t("common:professorTitle")}
          </p>

          <h1 className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-foreground">
            {t("common:professorName")}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("home:heroLead")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/scientific/works"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              {t("home:viewWorks")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border border-input px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {t("nav:autobiography")}
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <figure className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[1.75rem] border border-border"
            />
            <div
              aria-hidden
              className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/10 to-transparent"
            />
            <Image
              src="/images/professor.jpg"
              alt={t("common:professorName")}
              width={340}
              height={400}
              priority
              className="relative h-[400px] w-[340px] rounded-3xl border border-border object-cover object-top shadow-pop"
            />
          </figure>
        </div>
      </Container>

      {/* Credential strip — career figures, drawn from the biography. Numbers
          carry the single decisive blue accent against the off-white surface. */}
      <div className="relative border-t border-border">
        <Container>
          <dl className="grid grid-cols-2 divide-border py-8 sm:grid-cols-4 sm:divide-x">
            {CREDENTIALS.map((item) => (
              <div key={item.key} className="px-2 py-3 text-center sm:px-6">
                <dt className="sr-only">{t(`home:heroCredentials.${item.key}`)}</dt>
                <dd>
                  <span className="block font-serif text-3xl font-bold text-primary sm:text-4xl">
                    {item.value}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                    {t(`home:heroCredentials.${item.key}`)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
