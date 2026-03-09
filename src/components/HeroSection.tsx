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
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Ace Wardrobe luxury fashion"
          className="w-full h-full object-cover object-center scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
        />
      </div>

      {/* Warm dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Subtle fabric texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z' fill='%23d4a574' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-8 max-w-3xl mx-auto">
        {/* Spade Logo with gold glow */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-10">
          <div
            className="inline-block"
            style={{ filter: 'drop-shadow(0 0 25px hsla(30, 52%, 64%, 0.5))' }}
          >
            <SpadeIcon size={56} className="mx-auto md:w-16 md:h-16" showLetters={false} />
          </div>
        </div>

        {/* Main Headline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-200 mb-6">
          <h1 className="font-display font-bold tracking-tight leading-none">
            <span className="block text-6xl sm:text-8xl md:text-9xl text-foreground">
              ACE
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl tracking-[0.35em] font-light text-muted-foreground mt-2">
              Wardrobe
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="opacity-0 animate-fade-in-up animation-delay-300 mb-8">
          <p className="font-display italic text-lg sm:text-xl md:text-2xl text-primary">
            Dress Like Royalty
          </p>
        </div>

        {/* Thin gold divider */}
        <div className="opacity-0 animate-fade-in-up animation-delay-400 mb-8">
          <div className="w-16 h-px bg-primary/50 mx-auto" />
        </div>

        {/* Subheadline */}
        <p className="opacity-0 animate-fade-in-up animation-delay-400 font-body text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed">
          Abuja's premier luxury fashion destination. Premium streetwear meets classic tailoring, curated for the modern royal.
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('packages')}
            className="group w-full max-w-[220px] sm:w-auto px-8 py-3 rounded-full text-sm font-body font-medium tracking-wider uppercase transition-all duration-300 border"
            style={{
              borderColor: 'hsl(38, 45%, 60%)',
              color: 'hsl(38, 45%, 60%)',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'hsl(38, 45%, 60%)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'hsl(38, 45%, 60%)';
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Shop Men's
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
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
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Minimal scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up animation-delay-600">
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};