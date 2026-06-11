import type { AppLanguage } from "@/lib/i18n/config";

export interface Collaboration {
  country: Record<AppLanguage, string>;
  institution: Record<AppLanguage, string>;
  focus: Record<AppLanguage, string>;
  years?: string;
}

// International collaborations, drawn from the biography. Real partnerships.
export const COLLABORATIONS: Collaboration[] = [
  {
    country: { uz: "Rossiya", ru: "Россия", en: "Russia" },
    institution: {
      uz: "Sankt-Peterburg davlat elektrotexnika universiteti (LETI)",
      ru: "Санкт-Петербургский государственный электротехнический университет (ЛЭТИ)",
      en: "Saint Petersburg State Electrotechnical University (LETI)",
    },
    focus: {
      uz: "Bo'lak-polinomial va splayn-funksiya usullariga asoslangan maxsus protsessorlarni yaratish tamoyillari.",
      ru: "Принципы создания специализированных процессоров на основе кусочно-полиномиальных методов и сплайн-функций.",
      en: "Principles of specialized processors based on piecewise-polynomial and spline-function methods.",
    },
    years: "1990–1993",
  },
  {
    country: { uz: "Janubiy Koreya", ru: "Южная Корея", en: "South Korea" },
    institution: {
      uz: "Dongseo universiteti",
      ru: "Университет Донгсео",
      en: "Dongseo University",
    },
    focus: {
      uz: "Silliq yuzalarni splayn-funksiyalar yordamida modellashtirish usullari va dasturiy vositalari.",
      ru: "Методы и программные средства моделирования гладких поверхностей на основе сплайн-функций.",
      en: "Methods and software for modeling smooth surfaces using spline functions.",
    },
    years: "2007–2009",
  },
  {
    country: { uz: "Germaniya", ru: "Германия", en: "Germany" },
    institution: {
      uz: "Karl fon Ossetskiy nomidagi Oldenburg universiteti",
      ru: "Ольденбургский университет имени Карла фон Осецкого",
      en: "Carl von Ossietzky University of Oldenburg",
    },
    focus: {
      uz: "Atrof-muhit ifloslanishini monitoring qilish va bashoratlash uchun apparat-dasturiy majmualar.",
      ru: "Аппаратно-программные комплексы для мониторинга и прогнозирования загрязнения окружающей среды.",
      en: "Hardware-software complexes for monitoring and forecasting environmental pollution.",
    },
  },
  {
    country: { uz: "Belarus", ru: "Беларусь", en: "Belarus" },
    institution: {
      uz: "Belarus olimlari bilan qo'shma loyihalar",
      ru: "Совместные проекты с белорусскими учёными",
      en: "Joint projects with Belarusian scientists",
    },
    focus: {
      uz: "Sun'iy intellektga asoslangan aqlli IoT qurilmalarni yaratish.",
      ru: "Создание умных IoT-устройств на основе искусственного интеллекта.",
      en: "Creation of smart IoT devices based on artificial intelligence.",
    },
  },
];

// Countries where the professor's research has been published.
export const PUBLISHED_IN: Record<AppLanguage, string[]> = {
  uz: ["Angliya", "Frantsiya", "Germaniya", "AQSh", "Slovakiya", "Rossiya", "Yaponiya", "Janubiy Koreya", "Singapur", "Malayziya", "Indoneziya", "Hindiston"],
  ru: ["Англия", "Франция", "Германия", "США", "Словакия", "Россия", "Япония", "Южная Корея", "Сингапур", "Малайзия", "Индонезия", "Индия"],
  en: ["England", "France", "Germany", "USA", "Slovakia", "Russia", "Japan", "South Korea", "Singapore", "Malaysia", "Indonesia", "India"],
};
