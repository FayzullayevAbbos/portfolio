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
export const TEACHERS = teachers as Teacher[];
export const CONGRATULATIONS = congratulations as Congratulation[];
