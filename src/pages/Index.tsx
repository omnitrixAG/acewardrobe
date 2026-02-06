import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PackagesSection } from "@/components/PackagesSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { RSVPSection } from "@/components/RSVPSection";
import { CollectionsSection } from "@/components/CollectionsSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PackagesSection />
      <ActivitiesSection />
      <RSVPSection />
      <CollectionsSection />
      <AboutSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
