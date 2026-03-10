import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ShopByCategorySection } from "@/components/ShopByCategorySection";
import { PromoBanner } from "@/components/PromoBanner";
import { PackagesSection } from "@/components/PackagesSection";
import { PartnershipBanner } from "@/components/PartnershipBanner";
import { TrendingSection } from "@/components/TrendingSection";
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
      <ShopByCategorySection />
      <PromoBanner />
      <PackagesSection />
      <PartnershipBanner />
      <TrendingSection />
      <CollectionsSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
