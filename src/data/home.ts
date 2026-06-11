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

// Full photo gallery — all 27 images from the source site (slayder table),
// preserving the original order and file extensions.
const GALLERY_FILES = [
  "g1.jpg", "g2.jpg", "g3.jpg", "g4.png", "g5.png", "g6.jpg", "g7.jpg",
  "g8.png", "g9.png", "g10.png", "g11.png", "g12.jpg", "g13.jpg", "g14.jpg",
  "g15.jpg", "g16.jpg", "g17.jpg", "g18.jpg", "g19.jpg", "g20.jpg", "g21.jpg",
  "g22.jpg", "g23.jpg", "g24.jpg", "g25.jpg", "g26.jpg", "g27.jpg",
];

export const GALLERY: GalleryItem[] = GALLERY_FILES.map((file, i) => ({
  id: i + 1,
  image: `/images/gallery/${file}`,
}));

// Home preview shows the first 8; the gallery page shows all of them.
export const HOME_GALLERY: GalleryItem[] = GALLERY.slice(0, 8);
       