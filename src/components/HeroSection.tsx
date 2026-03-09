import { FC } from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-luxury.jpg";
import { SpadeIcon } from "./icons/SpadeIcon";

const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const HeroSection: FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage}
          alt="Ace Wardrobe luxury menswear showroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Warm dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(15,15,12,0.55) 0%, rgba(15,15,12,0.65) 40%, rgba(15,15,12,0.85) 100%)'
        }}
      />

      {/* Subtle fabric texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z' fill='%23d4a574' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15,15,12,0.4) 100%)'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center pt-32 pb-32">
        {/* Spade Logo with gold glow */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-10">
          <div 
            className="inline-block"
            style={{ filter: 'drop-shadow(0 0 24px hsla(30, 52%, 64%, 0.4))' }}
          >
            <SpadeIcon 
              size={56} 
              className="mx-auto text-primary"
            />
          </div>
        </div>

        {/* Main Headline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-200 mb-4">
          <h1 
            className="font-display leading-[0.95]"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}
          >
            <span 
              className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight"
              style={{ color: '#f5f1eb' }}
            >
              ACE
            </span>
            <span 
              className="block text-xl sm:text-2xl md:text-3xl font-body font-light tracking-[0.35em] uppercase mt-2"
              style={{ color: '#a89a8a' }}
            >
              Wardrobe
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-300 mb-14">
          <p 
            className="font-display italic text-lg sm:text-xl md:text-2xl"
            style={{ color: 'hsl(30, 52%, 64%)', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
          >
            Dress Like Royalty
          </p>
        </div>

        {/* Thin gold divider */}
        <div className="opacity-0 animate-fade-in-up animation-delay-350 mb-10">
          <div 
            className="w-16 h-px mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(30, 52%, 64%), transparent)' }}
          />
        </div>

        {/* Subheadline */}
        <p 
          className="opacity-0 animate-fade-in-up animation-delay-400 font-body text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed"
          style={{ color: '#a89a8a', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
          Abuja's premier luxury fashion destination. Premium streetwear meets classic tailoring, curated for the modern royal.
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('packages')}
            className="group w-full max-w-[220px] sm:w-auto px-8 py-3 rounded-full text-sm font-body font-medium tracking-wider uppercase transition-all duration-300 border"
            style={{ 
              borderColor: 'hsl(30, 52%, 64%)',
              color: 'hsl(30, 52%, 64%)',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'hsl(30, 52%, 64%)';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'hsl(30, 52%, 64%)';
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Shop Men's
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <button
            onClick={() => scrollToSection('packages')}
            className="group w-full max-w-[220px] sm:w-auto px-8 py-3 rounded-full text-sm font-body font-medium tracking-wider uppercase transition-all duration-300 border"
            style={{ 
              borderColor: '#f5f1eb',
              color: '#f5f1eb',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f1eb';
              e.currentTarget.style.color = '#1a1a1a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#f5f1eb';
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Shop Women's
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Minimal scroll hint */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mt-24">
          <div 
            className="w-px h-16 mx-auto"
            style={{ background: 'linear-gradient(to bottom, transparent, hsla(30, 52%, 64%, 0.3), transparent)' }}
          />
        </div>
      </div>
    </section>
  );
};
