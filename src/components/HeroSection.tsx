import { FC } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { FloatingParticles } from "./FloatingParticles";
import { MatrixSpades } from "./MatrixSpades";
import { Button } from "./ui/button";
import redSpadeLogo from "@/assets/red-spade-logo.png";
import diamondPatternBg from "@/assets/diamond-pattern-bg.png";

export const HeroSection: FC = () => {
  return (
    <section 
      id="valentine" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
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

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center pt-40 pb-32">
        {/* Valentine Badge with Link to Valentine Event page */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100">
          <Link to="/valentine-event" className="inline-block">
            <span className="hero-badge inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase text-primary mb-8 cursor-pointer hover:bg-primary/20 transition-colors">
              ♠ Valentine's Season 2026 ♠
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Red Spade Logo - no background, just the spade with glow */}
        <div className="opacity-0 animate-fade-in-up animation-delay-200 mb-6">
          <img 
            src={redSpadeLogo} 
            alt="Ace Wardrobe" 
            className="mx-auto w-28 h-32 md:w-36 md:h-40 glow-pulse"
            style={{ 
              filter: 'drop-shadow(0 0 30px hsl(348, 76%, 44%, 0.6))',
              background: 'transparent',
              mixBlendMode: 'normal'
            }}
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
        <p className="opacity-0 animate-fade-in-up animation-delay-500 font-body text-xl md:text-2xl lg:text-3xl text-chrome tracking-[0.3em] uppercase mb-10">
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
          <Button variant="solid" size="lg" asChild>
            <a
              href="https://wa.me/2347039178489?text=Hi%20Ace%20Wardrobe!%20I'm%20interested%20in%20the%20Valentine's%20event"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Waitlist
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#packages">View Packages</a>
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
