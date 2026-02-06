import { FC, useState, useEffect } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { FloatingParticles } from "./FloatingParticles";
import { MatrixSpades } from "./MatrixSpades";
import { Button } from "./ui/button";
import redSpadeLogo from "@/assets/red-spade-logo.png";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-poster.jpg";

const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const HeroSection: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id="valentine" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Poster/Fallback Image */}
        <img
          src={heroPoster}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !isMobile ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Video - Only on desktop for performance */}
        {!isMobile && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            poster={heroPoster}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
      </div>
      
      {/* Dark Gradient Overlay with Red Tint */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(196,30,58,0.15) 50%, rgba(10,10,10,0.85) 100%)'
        }}
      />
      
      {/* Secondary vignette overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)'
        }}
      />
      
      <FloatingParticles />
      <MatrixSpades />
      
      {/* Tribal Pattern Overlay */}
      <div className="tribal-overlay" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center pt-40 pb-32">
        {/* Valentine Badge - scrolls to packages section */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100">
          <button 
            onClick={() => scrollToSection('packages')}
            className="inline-block"
          >
            <span className="hero-badge inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-[0.15em] uppercase text-primary mb-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(348,76%,44%,0.4)]">
              ♠ Valentine's Season 2026 ♠
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>
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
        <p 
          className="opacity-0 animate-fade-in-up animation-delay-300 font-display italic text-xl md:text-2xl text-chrome mb-2"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          with love from
        </p>

        {/* Main Headline - ACE + WARDROBE as foundation */}
        <div className="opacity-0 animate-fade-in-up animation-delay-400 mb-4">
          <h1 
            className="font-display text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(196,30,58,0.3)' }}
          >
            <span className="text-shimmer">ACE</span>
          </h1>
          <p 
            className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold tracking-[0.3em] text-chrome-gradient -mt-2"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            WARDROBE
          </p>
        </div>

        {/* Subheadline */}
        <p 
          className="opacity-0 animate-fade-in-up animation-delay-500 font-body text-xl md:text-2xl lg:text-3xl text-chrome tracking-[0.3em] uppercase mb-10"
          style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
        >
          Shop · Sip · Connect
        </p>

        {/* Countdown Timer */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mb-10">
          <CountdownTimer />
        </div>

        {/* Event Details Strip */}
        <div 
          className="opacity-0 animate-fade-in-up event-strip flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 py-6 backdrop-blur-sm bg-background/20 rounded-2xl border border-border/30" 
          style={{ animationDelay: "0.7s" }}
        >
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <Calendar size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Date</div>
              <div className="text-sm md:text-base font-medium text-foreground" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>14th February 2026</div>
            </div>
          </div>
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <Clock size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Time</div>
              <div className="text-sm md:text-base font-medium text-foreground" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>10AM Till Late</div>
            </div>
          </div>
          <div className="event-detail flex items-center gap-3">
            <div className="event-detail-icon">
              <MapPin size={20} />
            </div>
            <div className="text-left">
              <div className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-chrome">Venue</div>
              <div className="text-sm md:text-base font-medium text-foreground" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>6 Euphrates Crescent, Maitama</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up flex flex-col items-center gap-3" style={{ animationDelay: "0.8s" }}>
          <Button 
            variant="solid" 
            size="lg" 
            onClick={() => scrollToSection('rsvp')}
            className="w-full max-w-[300px] sm:w-auto"
          >
            Join Waitlist
          </Button>
          <button 
            onClick={() => scrollToSection('packages')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground"
          >
            or view packages ↓
          </button>
        </div>
      </div>
    </section>
  );
};
