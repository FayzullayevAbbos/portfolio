import type { GalleryItem, ServiceCard, StatItem } from "@/types";

// Home service cards — link into the main sections. Labels/text resolved via
// i18n ("home.services.*"); icon names map to lucide in the component.
export const HOME_SERVICES: ServiceCard[] = [
  { key: "educational", icon: "BookOpen", href: "/educational/textbooks" },
  { key: "scientific", icon: "FlaskConical", href: "/scientific/patents" },
  { key: "projects", icon: "Lightbulb", href: "/scientific/projects" },
  { key: "disciples", icon: "Users", href: "/disciples" },
];

// Real counts derived from the source site's database.
export const HOME_STATS: StatItem[] = [
  { key: "monographs", value: 9, icon: "BookMarked" },
  { key: "textbooks", value: 14, icon: "Library" },
  { key: "projects", value: 9, icon: "FlaskConical" },
  { key: "disciples", value: 31, icon: "GraduationCap" },
];

// Curated photo gallery (real images copied from the source site).
export const HOME_GALLERY: GalleryItem[] = [
  { id: 1, image: "/images/gallery/g1.jpg" },
  { id: 2, image: "/images/gallery/g2.jpg" },
  { id: 3, image: "/images/gallery/g3.jpg" },
  { id: 4, image: "/images/gallery/g4.jpg" },
  { id: 5, image: "/images/gallery/g5.jpg" },
  { id: 6, image: "/images/gallery/g6.jpg" },
  { id: 7, image: "/images/gallery/g7.jpg" },
  { id: 8, image: "/images/gallery/g8.jpg" },
];
       