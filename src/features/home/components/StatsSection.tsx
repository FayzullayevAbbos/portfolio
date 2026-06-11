"use client";

import {
  BookMarked,
  FlaskConical,
  GraduationCap,
  Library,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Container, Section } from "@/components/ui/section";
import { HOME_STATS } from "@/data/home";
import { useCountUp } from "@/hooks/useCountUp";

const ICONS: Record<string, LucideIcon> = {
  BookMarked,
  Library,
  FlaskConical,
  GraduationCap,
};

export function StatsSection() {
  const { t } = useTranslation("home");

  return (
    <Section>
      <Container>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("stats.title")}
        </h2>
        <dl className="mt-8 grid grid-cols-2 border-t border-border lg:grid-cols-4">
          {HOME_STATS.map((stat) => (
            <StatCard
              key={stat.key}
              icon={ICONS[stat.icon]}
              value={stat.value}
              label={t(`stats.${stat.key}`)}
            />
          ))}
        </dl>
      </Container>
    </Section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon?: LucideIcon;
  value: number;
  label: string;
}) {
  const { ref, value: count } = useCountUp(value);

  return (
    <div className="border-b border-border py-8 [&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:last-child)]:border-r">
      <div className="px-1 sm:px-6">
        {Icon && <Icon className="size-5 text-primary" aria-hidden />}
        <dd className="mt-3 font-serif text-4xl font-bold tabular-nums text-foreground sm:text-5xl">
          <span ref={ref}>{count}</span>
        </dd>
        <dt className="mt-1 text-sm font-medium text-muted-foreground">{label}</dt>
      </div>
    </div>
  );
}
