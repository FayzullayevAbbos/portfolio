"use client";

import { FileClock } from "lucide-react";
import { useTranslation } from "react-i18next";

export function EmptyState({ message }: { message?: string }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30 px-6 py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-accent text-primary">
        <FileClock className="size-6" aria-hidden />
      </span>
      <p className="mt-4 max-w-sm text-sm text-muted-foreground">
        {message ?? t("loading")}
      </p>
    </div>
  );
}
