"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/lib/theme/ThemeProvider";
import { resolveDark } from "@/lib/theme/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = resolveDark(theme);

  return (
    <button
      type="button"
      aria-label={isDark ? "Yorug' rejim" : "Tungi rejim"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-current/90 transition-colors hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden />
      ) : (
        <Moon className="size-4" aria-hidden />
      )}
    </button>
  );
}
