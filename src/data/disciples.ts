import type { AppLanguage } from "@/lib/i18n/config";
import data from "./disciples.json";

export type DiscipleCategory = "dsc" | "phd" | "doctoral" | "abroad";

export interface Disciple {
  id: number;
  name: string;
  category: DiscipleCategory;
  position: Record<AppLanguage, string>;
  topic: Record<AppLanguage, string>;
  image: string;
}

export const DISCIPLES = data as Disciple[];

// Section order + the nav i18n key used as each group's heading.
export const DISCIPLE_GROUPS: { category: DiscipleCategory; labelKey: string }[] = [
  { category: "dsc", labelKey: "disciplesDsc" },
  { category: "phd", labelKey: "disciplesPhd" },
  { category: "abroad", labelKey: "disciplesAbroad" },
  { category: "doctoral", labelKey: "disciplesDoctoral" },
];

export function getDisciplesByCategory(category: DiscipleCategory): Disciple[] {
  return DISCIPLES.filter((d) => d.category === category);
}
