import { FC } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import heroModel from "@/assets/hero-model.png";

const TikTokIcon: FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const scrollToSection = (sectionId: string, offset: number = 64) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export const HeroSection: FC = () => {
  return (
    <section id="hero" className="relative w-full pt-16 overflow-hidden">
      <div className="relative w-full h-[85vh] min-h-[500px] max-h-[800px] flex">
        {/* Left yellow background */}
        <div className="absolute top-0 left-0 w-[55%] h-full" style={{ background: "#eab308" }} />
        {/* Right white background */}
        <div className="absolute top-0 right-0 w-[45%] h-full bg-background" />

        {/* Yellow circle behind model */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[1]"
          style={{
            width: "clamp(300px, 35vw, 500px)",
            height: "clamp(300px, 35vw, 500px)",
            background: "#eab308",
          }}
        />

        {/* Model image */}
        <div className="absolute inset-0 z-[2] flex items-end justify-center">
          <img
            src={heroModel}
            alt="Ace Wardrobe - Man in luxury suit"
            className="h-[90%] w-auto object-contain object-bottom"
          />
        </div>

        {/* Left bottom content */}
        <div className="absolute bottom-16 left-6 md:left-12 z-[3] max-w-xs md:max-w-sm">
          <p className="text-sm md:text-base text-foreground/80 mb-3 leading-relaxed">
            Premium menswear for the modern gentleman. Classic tailoring meets contemporary style.
          </p>
          <button
            onClick={() => scrollToSection("packages")}
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Shop Now
          </button>
        </div>

        {/* Right side headline */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[5%] md:right-[8%] z-[3] text-right">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-foreground leading-[0.9] tracking-tight">
            dress like
            <br />
            royalty.
          </h1>
        </div>

        {/* Bottom left social icons */}
        <div className="absolute bottom-6 left-6 md:left-12 z-[3] flex items-center gap-4">
          <a href="https://www.instagram.com/ace_wardrobe/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
            <Instagram size={18} />
          </a>
          <a href="https://www.tiktok.com/@mista_ace" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
            <TikTokIcon size={18} />
          </a>
          <a href="https://wa.me/2347039178489" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
            <MessageCircle size={18} />
          </a>
        </div>

        {/* Bottom right location */}
        <div className="absolute bottom-6 right-6 md:right-12 z-[3]">
          <p className="text-xs md:text-sm text-muted-foreground">Maitama, Abuja</p>
        </div>
      </div>
    </section>
  );
};
