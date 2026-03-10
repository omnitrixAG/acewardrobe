import { FC } from "react";

const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const HeroSection: FC = () => {
  return (
    <section id="hero" className="relative w-full pt-20 md:pt-24">
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=820&fit=crop&crop=faces"
          alt="Ace Wardrobe Collection"
          className="w-full h-full object-cover"
        />
        
        {/* Left gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-lg">
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/80 mb-2 md:mb-3 font-body">
                New Season Collection
              </p>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
                Dress Like<br/>Royalty
              </h1>
              
              <p className="text-sm md:text-lg text-white/90 mb-5 md:mb-6 font-body">
                Premium styles for the modern gentleman
              </p>
              
              <button
                onClick={() => scrollToSection('packages')}
                className="inline-block bg-white text-foreground px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto text-center"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
