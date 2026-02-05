import { FC } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";
import { CountdownTimer } from "./CountdownTimer";
import { FloatingParticles } from "./FloatingParticles";
import { MatrixSpades } from "./MatrixSpades";

export const HeroSection: FC = () => {
  return (
    <section 
      id="valentine" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 4%) 70%)",
      }}
    >
      <FloatingParticles />
      <MatrixSpades />
      
      {/* Tribal Pattern Overlay */}
      <div className="tribal-overlay" />
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-60" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center py-32">
        {/* Valentine Badge with Pulse Animation */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100">
          <span className="hero-badge inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase text-primary mb-8">
            ♠ Valentine's Season 2026 ♠
          </span>
        </div>

        {/* Animated Spade Logo */}
        <div className="opacity-0 animate-fade-in-up animation-delay-200 mb-6">
          <SpadeIcon 
            size={120} 
            className="mx-auto glow-pulse" 
            showLetters={true}
          />
        </div>

        {/* Cursive Text */}
        <p className="opacity-0 animate-fade-in-up animation-delay-300 font-display italic text-xl md:text-2xl text-chrome mb-2">
          with love from
        </p>

        {/* Main Headline - ACE + WARDROBE as foundation */}
        <div className="opacity-0 animate-fade-in-up animation-delay-400 mb-4">
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none">
            <span className="text-shimmer">ACE</span>
          </h1>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[0.3em] text-chrome-gradient -mt-2">
            WARDROBE
          </p>
        </div>

        {/* Subheadline */}
        <p className="opacity-0 animate-fade-in-up animation-delay-500 font-body text-base md:text-lg text-chrome tracking-[0.3em] uppercase mb-10">
          Shop · Sip · Connect
        </p>

        {/* Countdown Timer */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mb-10">
          <CountdownTimer />
        </div>

        {/* Event Details Strip */}
        <div className="opacity-0 animate-fade-in-up event-strip flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 py-6" style={{ animationDelay: "0.7s" }}>
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <Calendar size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Date</div>
              <div className="text-sm md:text-base font-medium text-foreground">14th February 2026</div>
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

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.8s" }}>
          <a
            href="https://wa.me/2347039178489?text=Hi%20Ace%20Wardrobe!%20I'm%20interested%20in%20the%20Valentine's%20event"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-enhanced rounded-lg w-full sm:w-auto"
          >
            Join Waitlist
          </a>
          <a href="#packages" className="btn-outline-enhanced rounded-lg w-full sm:w-auto">
            View Packages
          </a>
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
