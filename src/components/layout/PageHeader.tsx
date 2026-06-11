"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/section";

export interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  title,
  description,
  crumbs = [],
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  const { t } = useTranslation("common");

  return (
    <div className="border-b border-border bg-secondary/40">
      <Container className="py-10 sm:py-12">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-primary"
              >
                <Home className="size-3.5" aria-hidden />
                <span className="sr-only sm:not-sr-only">{t("home", { defaultValue: "Bosh sahifa" })}</span>
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 opacity-50" aria-hidden />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-primary"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
