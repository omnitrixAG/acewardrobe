import { FC } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { MatrixSpades } from "@/components/MatrixSpades";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { PackagesSection } from "@/components/PackagesSection";
import { WaitlistSignup } from "@/components/WaitlistSignup";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import redSpadeLogo from "@/assets/red-spade-logo.png";
import diamondPatternBg from "@/assets/diamond-pattern-bg.png";

const ValentineEventHero: FC = () => {
  const whatsappLink = "https://wa.me/2347039178489?text=Hi%20Ace%20Wardrobe!%20I'm%20interested%20in%20the%20Valentine's%20event";


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Diamond Pattern Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${diamondPatternBg})`,
          opacity: 0.5
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      
      <FloatingParticles />
      <MatrixSpades />
      
      {/* Tribal Pattern Overlay */}
      <div className="tribal-overlay" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center pt-40 pb-24">
        {/* Large Red Spade Logo */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-8">
          <img 
            src={redSpadeLogo} 
            alt="Ace Wardrobe" 
            className="mx-auto h-40 md:h-52 w-auto object-contain glow-pulse mix-blend-lighten"
            style={{ 
              filter: 'drop-shadow(0 0 40px hsl(348, 76%, 44%, 0.7))'
            }}
          />
        </div>

        {/* Cursive Text */}
        <p className="opacity-0 animate-fade-in-up animation-delay-200 font-display italic text-xl md:text-2xl text-chrome mb-2">
          with love from
        </p>

        {/* Main Headline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-300 mb-6">
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none">
            <span className="text-shimmer">ACE</span>
          </h1>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[0.3em] text-chrome-gradient -mt-2">
            WARDROBE
          </p>
        </div>

        {/* Tagline */}
        <p className="opacity-0 animate-fade-in-up animation-delay-400 font-body text-xl md:text-2xl lg:text-3xl text-chrome tracking-[0.3em] uppercase mb-10">
          Shop · Sip · Connect
        </p>

        {/* Countdown Timer */}
        <div className="opacity-0 animate-fade-in-up animation-delay-500 mb-10">
          <CountdownTimer />
        </div>

        {/* Event Details Strip */}
        <div className="opacity-0 animate-fade-in-up event-strip flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 py-6" style={{ animationDelay: "0.6s" }}>
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <Calendar size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Date</div>
              <div className="text-sm md:text-base font-medium text-foreground">February 16th, 2026</div>
            </div>
          </div>
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <Clock size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Time</div>
              <div className="text-sm md:text-base font-medium text-foreground">10AM Till Late</div>
            </div>
          </div>
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <MapPin size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Venue</div>
              <div className="text-sm md:text-base font-medium text-foreground">6 Euphrates Crescent, Maitama</div>
            </div>
          </div>
        </div>

        {/* Join Waitlist Button */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <Button 
            variant="solid" 
            size="lg" 
            onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Waitlist
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const RSVPSection: FC = () => {
  return (
    <section id="rsvp" className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/assets/diamond-pattern-bg.png')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Reserve Your Spot
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Be part of the ultimate Valentine's experience
          </p>
        </div>

        <WaitlistSignup />
      </div>
    </section>
  );
};

const ValentineEvent: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ValentineEventHero />
      <ActivitiesSection />
      <PackagesSection />
      <RSVPSection />
      <Footer />
    </div>
  );
};

export default ValentineEvent;
