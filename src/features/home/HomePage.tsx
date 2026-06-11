import { Hero } from "./components/Hero";
import { WelcomeSection } from "./components/WelcomeSection";
import { ServicesSection } from "./components/ServicesSection";
import { StatsSection } from "./components/StatsSection";
import { GalleryPreview } from "./components/GalleryPreview";

export function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <ServicesSection />
      <StatsSection />
      <GalleryPreview />
    </>
  );
}
