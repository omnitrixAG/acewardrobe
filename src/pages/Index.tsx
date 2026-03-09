import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ShopByCategory } from "@/components/ShopByCategory";
import { PromoBanner } from "@/components/PromoBanner";
import { PackagesSection } from "@/components/PackagesSection";
import { PartnershipBanner } from "@/components/PartnershipBanner";
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
      <ShopByCategory />
      <PromoBanner />
      <PackagesSection />
      <PartnershipBanner />
      <CollectionsSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
