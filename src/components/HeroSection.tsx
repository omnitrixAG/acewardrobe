import { FC } from "react";
import { ArrowRight } from "lucide-react";

const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export const HeroSection: FC = () => {
  return (
    <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=820&fit=crop&crop=faces"
        alt="Well-dressed man in premium fashion"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Left-side gradient only */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content — left aligned */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="max-w-lg text-center md:text-left">
            {/* Label */}
            <p className="text-xs md:text-sm font-body font-medium tracking-[0.25em] uppercase text-white/70 mb-3 md:mb-4">
              New Season Collection
            </p>

            {/* Headline */}
            <h1 className="font-display font-bold text-[2.5rem] leading-[1.1] md:text-6xl lg:text-7xl text-white mb-3 md:mb-5">
              Dress Like Royalty
            </h1>

            {/* Subtext */}
            <p className="font-body text-sm md:text-base text-white/80 mb-6 md:mb-8 max-w-sm mx-auto md:mx-0">
              Premium styles for the modern gentleman
            </p>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('packages')}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-foreground text-sm font-body font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground w-full md:w-auto justify-center"
            >
              Shop Now
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};