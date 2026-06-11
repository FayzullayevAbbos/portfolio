import type { AppLanguage } from "@/lib/i18n/config";

export interface WorkItem {
  id: number;
  image: string;
  year?: string;
  title: Record<AppLanguage, string>;
}

// Monographs — from the source site (chet_el, category 1). Titles in UZ/RU/EN.
export const MONOGRAPHS: WorkItem[] = [
  {
    id: 1,
    image: "/images/works/m1.jpg",
    year: "2014",
    title: {
      uz: "Bo'lakli ko'phadli asoslarda signalni qayta ishlash usullari va vositalari",
      ru: "Методы и средства обработки сигналов в кусочно-полиномиальных базисах",
      en: "Methods and means of signal processing in piecewise polynomial bases",
    },
  },
  {
    id: 2,
    image: "/images/works/m2.jpg",
    year: "2014",
    title: {
      uz: "Elektron hukumat",
      ru: "Электронное правительство",
      en: "E-government",
    },
  },
  {
    id: 3,
    image: "/images/works/m3.jpg",
    year: "2015",
    title: {
      uz: "Raqamli signallarni qayta ishlash muammolaridagi splaynlar",
      ru: "Сплайны в задачах цифровой обработки сигналов",
      en: "Splines in digital signal processing",
    },
  },
  {
    id: 4,
    image: "/images/works/m4.jpg",
    year: "2016",
    title: {
      uz: "Raqamli signal va tizimlar uchun polinom splaynlar",
      ru: "Полиномиальные сплайны для цифровых сигналов и систем",
      en: "Polynomial Splines for Digital Signal and Systems",
    },
  },
  {
    id: 5,
    image: "/images/works/m5.jpg",
    title: {
      uz: "Splaynlar nazariyasi",
      ru: "Теория сплайнов",
      en: "Spline theory",
    },
  },
  {
    id: 6,
    image: "/images/works/m6.jpg",
    year: "2019",
    title: {
      uz: "Ko'p o'lchovli polinom splaynlardan foydalangan holda signallarni qayta ishlash dasturlari",
      ru: "Приложения обработки сигналов, использующие многомерные полиномиальные сплайны",
      en: "Signal Processing Applications Using Multidimensional Polynomial Splines",
    },
  },
  {
    id: 7,
    image: "/images/works/m7.png",
    year: "2022",
    title: {
      uz: "Splaynlar asosida ko'p yadroli protsessorlar uchun parallel usullar va algoritmlar",
      ru: "Параллельные методы и алгоритмы для многоядерных процессоров на основе сплайнов",
      en: "Parallel methods and algorithms for multicore processors based on splines",
    },
  },
  {
    id: 8,
    image: "/images/works/m8.png",
    year: "2022",
    title: {
      uz: "Veyvletlar va ularni signallarga raqamli ishlov berishda qo'llanilishi",
      ru: "Вейвлеты и их применение в цифровой обработке сигналов",
      en: "Wavelets and their application in digital signal processing",
    },
  },
  {
    id: 9,
    image: "/images/works/m9.png",
    year: "2022",
    title: {
      uz: "Signallarga raqamli ishlov berishning splayn-usullari va algoritmlari",
      ru: "Сплайн-методы и алгоритмы цифровой обработки сигналов",
      en: "Spline methods and algorithms of digital signal processing",
    },
  },
];

// Textbooks & manuals — from the source site (chet_el, category 2).
export const TEXTBOOKS: WorkItem[] = [
  {
    id: 1,
    image: "/images/works/t1.png",
    title: {
      uz: "Boshqaruvda axborot texnologiyalari",
      ru: "Информационные технологии в управлении",
      en: "Information technologies in management",
    },
  },
  {
    id: 2,
    image: "/images/works/t2.jpg",
    year: "2015",
    title: {
      uz: "Axborot xavfsizligi",
      ru: "Информационная безопасность",
      en: "Information Security",
    },
  },
  {
    id: 3,
    image: "/images/works/t3.png",
    year: "2018",
    title: {
      uz: "E-biznes asoslari va mobil e-biznes",
      ru: "Основы электронного бизнеса и мобильный электронный бизнес",
      en: "E-business basics and mobile e-business",
    },
  },
  {
    id: 4,
    image: "/images/works/t4.png",
    year: "2019",
    title: {
      uz: "Kompyuter arxitekturasi va kompyuter tizimlari",
      ru: "Архитектура компьютеров и компьютерных систем",
      en: "Architecture of computers and computer systems",
    },
  },
  {
    id: 5,
    image: "/images/works/t5.png",
    year: "2019",
    title: {
      uz: "Buyumlar interneti",
      ru: "Интернет вещей",
      en: "Internet of Things",
    },
  },
  {
    id: 6,
    image: "/images/works/t6.jpg",
    year: "2020",
    title: {
      uz: "Ma'lumotlar bazasi",
      ru: "База данных",
      en: "Database",
    },
  },
  {
    id: 7,
    image: "/images/works/t7.jpg",
    year: "2019",
    title: {
      uz: "Web ilovalarni yaratish",
      ru: "Создание веб-приложений",
      en: "Creating web applications",
    },
  },
  {
    id: 8,
    image: "/images/works/t8.png",
    year: "2021",
    title: {
      uz: "Algoritmlash va dasturlash asoslari (C++)",
      ru: "Основы алгоритмизации и программирования (C++)",
      en: "Fundamentals of algorithmization and programming (C++)",
    },
  },
  {
    id: 9,
    image: "/images/works/t9.png",
    year: "2021",
    title: {
      uz: "Algoritmlash va dasturlash asoslari",
      ru: "Основы алгоритмизации и программирования",
      en: "Fundamentals of algorithmization and programming",
    },
  },
  {
    id: 10,
    image: "/images/works/t10.png",
    year: "2021",
    title: {
      uz: "An'anaviy va intellektual axborot texnologiyalari",
      ru: "Традиционные и интеллектуальные информационные технологии",
      en: "Traditional and intelligent information technology",
    },
  },
  {
    id: 11,
    image: "/images/works/t11.png",
    title: {
      uz: "An'anaviy va intellektual axborot texnologiyalari",
      ru: "Традиционные и интеллектуальные информационные технологии",
      en: "Traditional and intelligent information technology",
    },
  },
  {
    id: 12,
    image: "/images/works/t12.png",
    year: "2024",
    title: {
      uz: "IoT texnologiyalari",
      ru: "IoT технологии",
      en: "IoT Technologies",
    },
  },
  {
    id: 13,
    image: "/images/works/t13.png",
    year: "2024",
    title: {
      uz: "IoT texnologiyalari (rus tilida)",
      ru: "IoT технологии",
      en: "IoT Technologies (Russian)",
    },
  },
  {
    id: 14,
    image: "/images/works/t14.png",
    year: "2024",
    title: {
      uz: "IoT texnologiyalari (ingliz tilida)",
      ru: "IoT технологии (англ.)",
      en: "IoT Technologies",
    },
  },
];
