import aceLogoImg from "@/assets/ace-logo.jpg";
import redSpadeImg from "@/assets/red-spade-logo.png";

export const PartnershipBanner = () => {
  return (
    <section className="py-12 bg-secondary/50">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* Text */}
        <div className="text-center md:text-left max-w-[400px]">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            In Partnership
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
            Ace Wardrobe × Peaches by Ema
          </h2>
          <p className="text-muted-foreground mb-6">
            Luxury his &amp; hers collections. Dress together, slay together.
          </p>
          <a
            href="https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20couple%20outfits"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-foreground text-background text-sm font-semibold uppercase tracking-widest px-8 py-3 rounded hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Shop Couples
          </a>
        </div>

        {/* Logos */}
        <div className="flex items-center gap-4">
          <img src={aceLogoImg} alt="Ace Wardrobe" className="h-12 md:h-16 rounded object-contain" />
          <span className="text-2xl text-border font-light">×</span>
          <img src={redSpadeImg} alt="Peaches by Ema" className="h-12 md:h-16 rounded object-contain" />
        </div>
      </div>
    </section>
  );
};
