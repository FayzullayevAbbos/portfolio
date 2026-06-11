import type { AppLanguage } from "@/lib/i18n/config";
import type { Localized } from "./lists";

import education from "./education.json";
import labor from "./labor.json";
import opposition from "./opposition.json";
import patents from "./patents.json";
import patentImages from "./patent-images.json";
import journals from "./journals.json";
import publications from "./publications.json";
import teachers from "./teachers.json";
import congratulations from "./congratulations.json";

export interface JournalItem {
  title: Localized;
  role: Localized;
  group: number; // 1 = republic, 2 = foreign
  url: string;
}

export interface Teacher {
  id: number;
  name: string;
  title: Localized;
  bio: Record<AppLanguage, string[]>;
  image: string;
}

export interface Congratulation {
  id: number;
  title: Localized;
  text: Record<AppLanguage, string[]>;
  image: string;
}

export const EDUCATION = education as Localized[];
export const LABOR = labor as Localized[];
export const OPPOSITION = opposition as Localized[];
export const PATENTS = patents as Localized[];
export const PATENT_IMAGES = patentImages as string[];
export const JOURNALS = journals as JournalItem[];
export const PUBLICATIONS = publications as string[];

/**
 * Source content was imported with literal "\r\n" markers inside single long
 * strings. Split those into real paragraphs and drop empties so the UI can
 * render clean <p> blocks instead of showing the escape sequences.
 */
function splitParagraphs(parts: string[]): string[] {
  return parts
    .flatMap((s) => s.split(/\\r\\n|\\n|\r\n|\n/))
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeLocalizedText<T extends { text: Record<AppLanguage, string[]> }>(
  items: T[],
): T[] {
  return items.map((item) => ({
    ...item,
    text: Object.fromEntries(
      Object.entries(item.text).map(([lang, parts]) => [
        lang,
        splitParagraphs(parts as string[]),
      ]),
    ) as Record<AppLanguage, string[]>,
  }));
}

function normalizeLocalizedBio<T extends { bio: Record<AppLanguage, string[]> }>(
  items: T[],
): T[] {
  return items.map((item) => ({
    ...item,
    bio: Object.fromEntries(
      Object.entries(item.bio).map(([lang, parts]) => [
        lang,
        splitParagraphs(parts as string[]),
      ]),
    ) as Record<AppLanguage, string[]>,
  }));
}

export const TEACHERS = normalizeLocalizedBio(teachers as Teacher[]);
export const CONGRATULATIONS = normalizeLocalizedText(
  congratulations as Congratulation[],
);
