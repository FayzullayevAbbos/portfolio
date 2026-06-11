"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { NAV_ITEMS } from "@/config/navigation";
import { FacebookIcon, TelegramIcon, YoutubeIcon } from "@/components/icons";

const SOCIALS = [
  { label: "Telegram", href: "#", Icon: TelegramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
];

export function Footer() {
  const { t } = useTranslation(["nav", "footer", "common"]);
  const year = new Date().getFullYear();

  const educational = NAV_ITEMS.find((i) => i.labelKey === "educationalWorks");
  const scientific = NAV_ITEMS.find((i) => i.labelKey === "scientificWorks");

  return (
    <footer className="mt-auto border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* About + social */}
        <div className="lg:col-span-1">
          <p className="font-serif text-lg font-semibold text-foreground">
            Zaynidinov H.N.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("footer:about")}
          </p>
          <div className="mt-5 flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {/* Educational links */}
        <FooterColumn
          title={t(`nav:${educational?.labelKey ?? "educationalWorks"}`)}
          links={
            educational?.children?.map((c) => ({
              label: t(`nav:${c.labelKey}`),
              href: c.href,
            })) ?? []
          }
        />

        {/* Scientific links */}
        <FooterColumn
          title={t(`nav:${scientific?.labelKey ?? "scientificWorks"}`)}
          links={
            scientific?.children?.map((c) => ({
              label: t(`nav:${c.labelKey}`),
              href: c.href,
            })) ?? []
          }
        />

        {/* Contact */}
        <div>
          <h3 className="font-serif text-base font-semibold text-foreground">
            {t("nav:foreign")}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("footer:address")}
          </p>
          <a
            href="mailto:h.zaynidinov@tuit.uz"
            className="mt-3 inline-block text-sm text-primary hover:underline"
          >
            {t("common:email")}
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {t("footer:copyright")}
          </p>
          <p className="text-center sm:text-right">{t("footer:credits")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-serif text-base font-semibold text-foreground">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm leading-snug text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
