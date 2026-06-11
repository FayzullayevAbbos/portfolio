// Shared domain types for the academic portfolio. Content mirrors the source
// site (h-zayniddinov): biography, scientific works, projects, disciples, etc.

export interface SlideItem {
  id: number;
  title: string;
  subtitle?: string;
  text?: string;
  image: string;
  link?: string;
}

export interface ServiceCard {
  key: string;
  icon: string;
  href: string;
}

export interface StatItem {
  key: string;
  value: number;
  icon: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  title?: string;
  caption?: string;
}

export interface Discipline {
  id: number;
  fullName: string;
  topic?: string;
  year?: string;
  degree?: "dsc" | "phd" | "doctoral";
}

export interface PublicationItem {
  id: number;
  title: string;
  source?: string;
  year?: string;
  link?: string;
}
