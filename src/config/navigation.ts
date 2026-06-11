// Site navigation tree. Labels are i18n keys in the "nav" namespace; hrefs are
// app routes. Mirrors the source site's header menu structure.

export interface NavLink {
  /** i18n key under the "nav" namespace */
  labelKey: string;
  href: string;
}

export interface NavItem {
  labelKey: string;
  /** Icon name from lucide-react */
  icon: string;
  href?: string;
  children?: NavLink[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    labelKey: "info",
    icon: "User",
    children: [
      { labelKey: "autobiography", href: "/about" },
      { labelKey: "education", href: "/about/education" },
      { labelKey: "laborActivity", href: "/about/labor-activity" },
      { labelKey: "gallery", href: "/gallery" },
      { labelKey: "congratulations", href: "/congratulations" },
    ],
  },
  {
    labelKey: "scientificWorks",
    icon: "FlaskConical",
    children: [
      { labelKey: "monographs", href: "/scientific/monographs" },
      { labelKey: "worksList", href: "/scientific/works" },
      { labelKey: "journalBoard", href: "/scientific/journals" },
      { labelKey: "projects", href: "/scientific/projects" },
      { labelKey: "patents", href: "/scientific/patents" },
      { labelKey: "opposition", href: "/scientific/opposition" },
    ],
  },
  {
    labelKey: "educationalWorks",
    icon: "BookOpen",
    children: [
      { labelKey: "subjects", href: "/educational/subjects" },
      { labelKey: "textbooks", href: "/educational/textbooks" },
    ],
  },
  {
    labelKey: "teachers",
    icon: "GraduationCap",
    href: "/teachers",
  },
  {
    labelKey: "disciples",
    icon: "Users",
    children: [
      { labelKey: "disciplesDsc", href: "/disciples#dsc" },
      { labelKey: "disciplesPhd", href: "/disciples#phd" },
      { labelKey: "disciplesDoctoral", href: "/disciples#doctoral" },
    ],
  },
  {
    labelKey: "foreign",
    icon: "Globe",
    href: "/foreign",
  },
];
