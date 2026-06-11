import type { AppLanguage } from "@/lib/i18n/config";

export type Localized = Record<AppLanguage, string>;

// Subjects taught (oquv_fanlar). Leading numbers stripped — the UI numbers them.
export const SUBJECTS: Localized[] = [
  {
    uz: "IoT (Ashyolar interneti)",
    ru: "IoT (Интернет вещей)",
    en: "IoT (Internet of Things)",
  },
  {
    uz: "Axborotlarni izlash va ajratib olish (magistratura uchun)",
    ru: "Поиск и различение информации (для магистратуры)",
    en: "Search and retrieval of information (for master's students)",
  },
  {
    uz: "Intellektual tizimlarda parallel algoritmlar (magistratura talabalari uchun)",
    ru: "Параллельные алгоритмы в интеллектуальных системах (для аспирантов)",
    en: "Parallel algorithms in intelligent systems (for graduate students)",
  },
  {
    uz: "Ilmiy va innovatsion faoliyatni rivojlantirish (malaka oshirish markazi tinglovchilari uchun)",
    ru: "Развитие научно-инновационной деятельности (для слушателей Центра повышения квалификации)",
    en: "Development of scientific and innovative activity (for professional development center participants)",
  },
];

// Scientific projects led or carried out (ilmiy_loyiha).
export const PROJECTS: Localized[] = [
  {
    uz: "F4-021 «Bo'lak-polinomial bazislarda tovushni qayta ishlash va tiklash intellektual dasturiy-texnik tizimlarini yaratishning nazariy-metodologik asoslari» (fundamental loyiha)",
    ru: "Ф4-021 «Теоретико-методологические основы создания интеллектуальных программно-технических систем обработки и восстановления звука в кусочно-полиномиальных базисах» (фундаментальный проект)",
    en: "F4-021 \u2014 Theoretical and methodological foundations for creating intelligent software-technical systems for sound processing and restoration in piecewise-polynomial bases (fundamental project)",
  },
  {
    uz: "BA-A5-021 «Veyvlet tahlil asosida seysmik signallarga ishlov berish uchun ixtisoslashtirilgan tizimni ishlab chiqish» (amaliy)",
    ru: "БА-А5-021 «Разработка специализированной системы обработки сейсмических сигналов на основе вейвлет-анализа» (прикладной)",
    en: "BA-A5-021 \u2014 Development of a specialized system for processing seismic signals based on wavelet analysis (applied)",
  },
  {
    uz: "BV-F4-011 «Signallarni va tasvirlarni raqamli qayta ishlash masalalarida parallel hisoblash nazariyasi, usullari va vositalarini rivojlantirish» (fundamental loyiha)",
    ru: "БВ-Ф4-011 «Развитие теории, методов и средств параллельной обработки сигналов и изображений» (фундаментальный проект)",
    en: "BV-F4-011 \u2014 Development of the theory, methods and tools of parallel computing for signal and image processing (fundamental project)",
  },
  {
    uz: "BVF-Atex-2018-249 «Biometrik signallarga raqamli ishlov berish usullari va algoritmlarini ishlab chiqish» (amaliy)",
    ru: "BVF-Atex-2018-249 «Разработка методов и алгоритмов цифровой обработки биометрических сигналов» (прикладной)",
    en: "BVF-Atex-2018-249 \u2014 Development of methods and algorithms for digital processing of biometric signals (applied)",
  },
  {
    uz: "FZ-201907178 «Yuz tasvirlarini qayta ishlash asosida shaxsni tanib olish algoritmlari va dasturiy ta'minotini yaratish» (fundamental loyiha)",
    ru: "ФЗ-201907178 «Создание алгоритмов и программного обеспечения распознавания личности на основе обработки изображений лица» (фундаментальный проект)",
    en: "FZ-201907178 \u2014 Creation of algorithms and software for person recognition based on facial image processing (fundamental project)",
  },
  {
    uz: "Shaxs identifikatsiyasi va qarindoshlikni aniqlash uchun STR va HLA lokuslari genetik profillari hamda Y-xromosoma gaplotiplari asosida milliy DNK ma'lumotlar bazasini yaratish (amaliy loyiha)",
    ru: "Разработка национальной базы данных ДНК для идентификации личности и определения родства на основе генетических профилей локусов STR и HLA, а также гаплотипов Y-хромосомы (прикладной проект)",
    en: "Creation of a national DNA database for personal identification and kinship determination based on genetic profiles of STR and HLA loci and Y-chromosome haplotypes (applied project)",
  },
  {
    uz: "Inson salomatligi holatini shaxsiy monitoring qilishning smart-tizimi mavzusidagi O'zbek-Belarus qo'shma loyihasi (amaliy)",
    ru: "Совместный узбекско-белорусский проект «Смарт-система персонального мониторинга состояния здоровья человека» (прикладной)",
    en: "Uzbek-Belarusian joint project on a smart system for personal monitoring of human health (applied)",
  },
  {
    uz: "IoT konsepsiyasi asosida suv resurslarini monitoring qilish apparat-dasturiy majmuasini ishlab chiqish (innovatsion loyiha)",
    ru: "Разработка аппаратно-программного комплекса мониторинга водных ресурсов на основе концепции IoT (инновационный проект)",
    en: "Development of a hardware-software complex for water resource monitoring based on the IoT concept (innovation project)",
  },
  {
    uz: "101082221 — UzMedEn: Erasmus+ doirasida bajarilayotgan \u201cNew master's degree and training course programs in the field of medical engineering in Uzbekistan\u201d xalqaro loyihasi",
    ru: "101082221 — UzMedEn: международный проект в рамках Erasmus+ \u201cNew master's degree and training course programs in the field of medical engineering in Uzbekistan\u201d",
    en: "101082221 — UzMedEn: international project under Erasmus+ \u2014 New master's degree and training course programs in the field of medical engineering in Uzbekistan",
  },
];
