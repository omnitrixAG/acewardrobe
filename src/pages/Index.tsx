import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PackagesSection } from "@/components/PackagesSection";
import { NewsletterSection } from "@/components/NewsletterSection";
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
      <CollectionsSection />
      <AboutSection />
      <RSVPSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
