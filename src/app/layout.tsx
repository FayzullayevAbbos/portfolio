import type { Metadata } from "next";
import { Manrope, Spectral } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { THEME_INIT_SCRIPT } from "@/lib/theme/theme";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zaynidinov Hakimjon Nasriddinovich",
    template: "%s — Zaynidinov H.N.",
  },
  description:
    "Texnika fanlari doktori, professor Zaynidinov Hakimjon Nasriddinovichning ilmiy va o'quv faoliyati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${manrope.variable} ${spectral.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
