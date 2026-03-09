import { FC } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle radial gold glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(var(--gold), 0.08) 0%, transparent 70%)'
        }}
      />

      {/* Subtle fabric texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z' fill='%23d4a574' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-8">
        
        {/* Spade Logo */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-8">
          <div 
            className="inline-block"
            style={{ filter: 'drop-shadow(0 0 30px hsla(var(--gold), 0.5))' }}
          >
            <SpadeIcon size={64} className="mx-auto md:w-20 md:h-20" showLetters={false} />
          </div>
        </div>

        {/* Brand Name */}
        <div className="opacity-0 animate-fade-in-up animation-delay-200 mb-2">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground">
            ACE
          </h1>
        </div>
        
        <div className="opacity-0 animate-fade-in-up animation-delay-300 mb-8">
          <p className="text-base sm:text-xl md:text-2xl tracking-[0.3em] sm:tracking-[0.4em] font-body font-light uppercase text-muted-foreground">
            WARDROBE
          </p>
        </div>

        {/* Tagline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-400 mb-12 md:mb-16">
          <p className="font-display italic text-lg sm:text-xl md:text-2xl text-primary">
            "Dress Like Royalty"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('packages')}
            className="w-full sm:w-auto px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 tracking-widest text-sm uppercase font-body"
          >
            Shop Men's
          </button>
          <button
            onClick={() => scrollToSection('packages')}
            className="w-full sm:w-auto px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 tracking-widest text-sm uppercase font-body"
          >
            Shop Women's
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up animation-delay-600">
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};
