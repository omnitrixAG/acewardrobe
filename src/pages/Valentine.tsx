import { Navigation } from "@/components/Navigation";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PackagesSection } from "@/components/PackagesSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { RSVPSection } from "@/components/RSVPSection";
import { Footer } from "@/components/Footer";
import { MatrixSpades } from "@/components/MatrixSpades";
import { SpadeIcon } from "@/components/icons/SpadeIcon";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const Valentine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Valentine Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <MatrixSpades />
        <div className="tribal-overlay" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8">
            <span className="text-primary">♠</span>
            <span className="text-sm md:text-base font-body tracking-wider text-foreground/90">
              Valentine's Season 2026
            </span>
          </div>

          {/* Animated Spade */}
          <div className="flex justify-center mb-6">
            <SpadeIcon size={80} className="glow-crimson glow-pulse" />
          </div>

          {/* Main Headline */}
          <p className="font-display italic text-chrome text-lg md:text-xl mb-2">
            with love from
          </p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-1">
            <span className="text-shimmer">ACE</span>
          </h1>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-chrome-gradient tracking-[0.2em] mb-4">
            WARDROBE
          </h2>
          
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-chrome tracking-[0.15em] mb-8 md:mb-12">
            SHOP · SIP · CONNECT
          </p>

          {/* Countdown */}
          <div className="mb-10 md:mb-14">
            <CountdownTimer />
          </div>

          {/* Event Details Strip */}
          <div className="event-strip py-6 md:py-8 mb-10 md:mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <div className="event-detail-icon">
                  <Calendar size={18} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                  <p className="font-display text-foreground">February 14, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="event-detail-icon">
                  <Clock size={18} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                  <p className="font-display text-foreground">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="event-detail-icon">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Venue</p>
                  <p className="font-display text-foreground">6 Euphrates Crescent, Maitama</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="solid" size="lg" asChild>
              <a href="#rsvp">RSVP Now</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#packages">View Packages</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <PackagesSection />
      <ActivitiesSection />
      <RSVPSection />
      <Footer />
    </div>
  );
};

export default Valentine;
