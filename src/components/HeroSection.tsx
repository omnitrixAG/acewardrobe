import { FC, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroPoster}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !isMobile ? 'opacity-0' : 'opacity-100'
          }`}
        />
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

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.85) 100%)'
        }}
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.5) 100%)'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center pt-32 pb-32">
        {/* Season Tag */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-foreground/70 border border-border/40 bg-secondary/20 backdrop-blur-sm">
            New Season — Now Live
          </span>
        </div>

        {/* Main Headline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-200 mb-6">
          <h1 
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}
          >
            <span className="block text-foreground">REDEFINE</span>
            <span className="block text-foreground/40 italic font-normal">Your Style</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p 
          className="opacity-0 animate-fade-in-up animation-delay-300 font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          Curated luxury fashion for the modern royal. 
          Shop premium collections, styled for kings & queens.
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="solid" 
            size="lg" 
            onClick={() => scrollToSection('collections')}
            className="w-full max-w-[280px] sm:w-auto"
          >
            Shop Collections
            <ArrowRight size={16} className="ml-1" />
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => scrollToSection('about')}
            className="w-full max-w-[280px] sm:w-auto"
          >
            Our Story
          </Button>
        </div>

        {/* Minimal scroll hint */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mt-20">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
};
