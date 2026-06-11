"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, KeyRound, Mail, Menu, Phone, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { NAV_ITEMS, type NavItem } from "@/config/navigation";
import { NAV_ICONS } from "./nav-icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

/** Path without the hash fragment (child links may include #anchors). */
function basePath(href: string) {
  return href.split("#")[0];
}

/** Is the given route the active one for the current pathname? */
function isHrefActive(href: string | undefined, pathname: string) {
  if (!href) return false;
  const path = basePath(href);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

/** A parent is active when itself or any of its children match. */
function isItemActive(item: NavItem, pathname: string) {
  if (isHrefActive(item.href, pathname)) return true;
  return item.children?.some((c) => isHrefActive(c.href, pathname)) ?? false;
}

export function Header() {
  const { t } = useTranslation(["nav", "common"]);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the desktop dropdown on Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu]);

  // Hover open with a small close delay so moving to the panel doesn't drop it.
  const openNow = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  }, []);
  const closeSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Top utility bar — contact + language + login */}
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a
              href="mailto:h.zaynidinov@tuit.uz"
              className="inline-flex items-center gap-2 text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <Mail className="size-4" aria-hidden />
              h.zaynidinov@tuit.uz
            </a>
            <span className="inline-flex items-center gap-2 text-primary-foreground/90">
              <Phone className="size-4" aria-hidden />
              {t("common:phone")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <KeyRound className="size-4" aria-hidden />
              {t("common:login")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b border-border bg-card/90 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-card",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-[padding] duration-300",
            scrolled ? "py-2" : "py-3",
          )}
        >
          <Link href="/" className="flex items-center gap-3" aria-label="Bosh sahifa">
            <span
              className="grid size-10 place-items-center rounded-md bg-primary font-serif text-lg font-bold text-primary-foreground"
              aria-hidden
            >
              Z
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-serif text-base font-semibold text-foreground">
                Zaynidinov H.N.
              </span>
              <span className="text-xs text-muted-foreground">
                {t("common:professorTitle")}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const Icon = NAV_ICONS[item.icon];
              const hasChildren = !!item.children?.length;
              const active = isItemActive(item, pathname);
              const open = openMenu === item.labelKey;

              const triggerClass = cn(
                "relative inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:duration-200",
                active
                  ? "text-primary after:scale-x-100"
                  : "text-foreground/80 hover:bg-accent hover:text-primary after:scale-x-0",
              );

              if (!hasChildren) {
                return (
                  <Link
                    key={item.labelKey}
                    href={item.href ?? "#"}
                    aria-current={active ? "page" : undefined}
                    className={triggerClass}
                  >
                    {Icon && <Icon className="size-4" aria-hidden />}
                    {t(`nav:${item.labelKey}`)}
                  </Link>
                );
              }

              return (
                <div
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => openNow(item.labelKey)}
                  onMouseLeave={closeSoon}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() => setOpenMenu(open ? null : item.labelKey)}
                    className={triggerClass}
                  >
                    {Icon && <Icon className="size-4" aria-hidden />}
                    {t(`nav:${item.labelKey}`)}
                    <ChevronDown
                      className={cn(
                        "size-3.5 opacity-60 transition-transform duration-200",
                        open && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>

                  {open && (
                    <ul
                      role="menu"
                      aria-label={t(`nav:${item.labelKey}`)}
                      className="animate-dropdown absolute left-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-pop"
                    >
                      {item.children!.map((child) => {
                        const childActive = isHrefActive(child.href, pathname);
                        return (
                          <li key={child.labelKey} role="none">
                            <Link
                              role="menuitem"
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              aria-current={childActive ? "page" : undefined}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm leading-snug transition-colors",
                                childActive
                                  ? "bg-accent font-medium text-primary"
                                  : "text-foreground/80 hover:bg-accent hover:text-primary",
                              )}
                            >
                              {t(`nav:${child.labelKey}`)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Menyu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const { t } = useTranslation(["nav", "common"]);

  // Pre-expand the group that contains the current route.
  const initiallyOpen = NAV_ITEMS.find((i) => isItemActive(i, pathname));
  const [expanded, setExpanded] = useState<string | null>(
    initiallyOpen?.labelKey ?? null,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="animate-backdrop absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="animate-drawer absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-card shadow-pop">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-serif text-base font-semibold">
            Zaynidinov H.N.
          </span>
          <button
            type="button"
            aria-label="Yopish"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const active = isItemActive(item, pathname);
            const hasChildren = !!item.children?.length;
            const isOpen = expanded === item.labelKey;

            if (!hasChildren) {
              return (
                <Link
                  key={item.labelKey}
                  href={item.href ?? "#"}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-accent text-primary"
                      : "text-foreground hover:bg-accent hover:text-primary",
                  )}
                >
                  {Icon && <Icon className="size-4" aria-hidden />}
                  {t(`nav:${item.labelKey}`)}
                </Link>
              );
            }

            return (
              <div key={item.labelKey}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.labelKey)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "text-primary"
                      : "text-foreground hover:bg-accent",
                  )}
                >
                  {Icon && <Icon className="size-4 text-primary" aria-hidden />}
                  {t(`nav:${item.labelKey}`)}
                  <ChevronDown
                    className={cn(
                      "ml-auto size-4 opacity-60 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <ul className="ml-9 flex flex-col border-l border-border">
                    {item.children!.map((child) => {
                      const childActive = isHrefActive(child.href, pathname);
                      return (
                        <li key={child.labelKey}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            aria-current={childActive ? "page" : undefined}
                            className={cn(
                              "block py-2 pl-3 pr-2 text-sm transition-colors",
                              childActive
                                ? "font-medium text-primary"
                                : "text-muted-foreground hover:text-primary",
                            )}
                          >
                            {t(`nav:${child.labelKey}`)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center justify-between border-t border-border px-5 py-4">
          <LanguageSwitcher />
          <Link
            href="/login"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <KeyRound className="size-4" aria-hidden />
            {t("common:login")}
          </Link>
        </div>
      </div>
    </div>
  );
}
