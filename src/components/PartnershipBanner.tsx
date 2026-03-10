import { FC } from "react";
import aceLogo from "@/assets/ace-logo.jpg";

export const PartnershipBanner: FC = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {/* Text content */}
          <div className="max-w-[400px] text-center md:text-left">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              In Partnership
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ace Wardrobe × Peaches by Ema
            </h2>
            <p className="text-muted-foreground mb-6">
              Luxury his &amp; hers collections. Dress together, slay together.
            </p>
            <a
              href="https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20couple%20outfits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-foreground text-background px-8 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Shop Couples
            </a>
          </div>

          {/* Logos */}
          <div className="flex items-center gap-4">
            <img
              src={aceLogo}
              alt="Ace Wardrobe"
              className="h-12 md:h-16 w-auto rounded object-contain"
            />
            <span className="text-2xl text-border select-none">×</span>
            <div className="h-12 md:h-16 flex items-center justify-center px-3 rounded bg-background border border-border">
              <span className="font-display text-sm md:text-base font-bold text-foreground tracking-wide">
                Peaches by Ema
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
