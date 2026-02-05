import { FC } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";
import { CountdownTimer } from "./CountdownTimer";
import { FloatingParticles } from "./FloatingParticles";

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
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-60" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center py-32">
        {/* Valentine Badge */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm font-body tracking-wider text-chrome-light mb-8">
            <span className="text-primary">♠</span>
            Valentine's Season 2026
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

        {/* Main Headline */}
        <h1 className="opacity-0 animate-fade-in-up animation-delay-400 font-display text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight mb-4">
          <span className="text-shimmer">ACE</span>
        </h1>

        {/* Subheadline */}
        <p className="opacity-0 animate-fade-in-up animation-delay-500 font-body text-lg md:text-xl text-chrome-light tracking-[0.3em] mb-10">
          SHOP · SIP · CONNECT
        </p>

        {/* Countdown Timer */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mb-10">
          <CountdownTimer />
        </div>

        {/* Event Details Strip */}
        <div className="opacity-0 animate-fade-in-up flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-sm font-body text-muted-foreground" style={{ animationDelay: "0.7s" }}>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span>February 16, 2026</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>10:00 AM</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>6 Euphrates Crescent, Maitama</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.8s" }}>
          <a
            href="https://wa.me/2347039178489?text=Hello!%20I%20would%20like%20to%20RSVP%20for%20the%20Valentine%20Event"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary rounded-full w-full sm:w-auto"
          >
            RSVP Now
          </a>
          <a href="#packages" className="btn-outline rounded-full w-full sm:w-auto">
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
