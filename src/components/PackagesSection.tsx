import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Heart, Check, Crown, ArrowRight } from "lucide-react";

const forHerPackages = [
  {
    title: "THE LUXE EDIT",
    price: "₦350,000",
    originalPrice: "₦450,000",
    savings: "₦100,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20LUXE%20EDIT%20package%20(₦350,000)",
    items: ["Long Dress", "Lingerie", "Pyjama Set", "Chocolate & Card"],
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
  },
  {
    title: "THE CLASSIC EDIT",
    price: "₦250,000",
    originalPrice: "₦320,000",
    savings: "₦70,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20CLASSIC%20EDIT%20package%20(₦250,000)",
    items: ["Short Dress", "Lingerie", "Pyjama Set", "Chocolate & Card"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
  },
  {
    title: "THE ESSENTIAL EDIT",
    price: "₦150,000",
    originalPrice: "₦200,000",
    savings: "₦50,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20ESSENTIAL%20EDIT%20package%20(₦150,000)",
    items: ["Lingerie", "Pyjama Set", "Chocolate & Flowers"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=300&fit=crop",
  },
];

const forHimPackages = [
  {
    title: "THE EXECUTIVE EDIT",
    price: "₦750,000",
    originalPrice: "₦950,000",
    savings: "₦200,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20EXECUTIVE%20EDIT%20package%20(₦750,000)",
    items: ["Two-Piece Set", "Boxers & Singlet", "Shirt/T-Shirt", "Shorts"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop",
  },
  {
    title: "THE KING EDIT",
    price: "₦550,000",
    originalPrice: "₦700,000",
    savings: "₦150,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20KING%20EDIT%20package%20(₦550,000)",
    items: ["Boxers & Singlet", "Shirt/T-Shirt", "Pants/Jeans", "Card"],
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
  {
    title: "THE CASUAL EDIT",
    price: "₦350,000",
    originalPrice: "₦450,000",
    savings: "₦100,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20CASUAL%20EDIT%20package%20(₦350,000)",
    items: ["Singlet & Boxers", "Shirt/Pants", "Miniature Spirits", "Card"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop",
  },
  {
    title: "THE STARTER EDIT",
    price: "₦200,000",
    originalPrice: "₦250,000",
    savings: "₦50,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20THE%20STARTER%20EDIT%20package%20(₦200,000)",
    items: ["Boxers & Singlet", "Miniature Spirits", "Card"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop",
  },
];

interface PackageCardProps {
  title: string;
  price: string;
  originalPrice: string;
  savings: string;
  items: string[];
  whatsappMessage: string;
  isBestseller: boolean;
  image: string;
  accentColor: "rose" | "gold";
}

const PackageCard: FC<PackageCardProps> = ({ 
  title, 
  price, 
  originalPrice,
  savings,
  items, 
  whatsappMessage, 
  isBestseller,
  image,
  accentColor
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const whatsappUrl = `https://wa.me/2347039178489?text=${whatsappMessage}`;
  
  const accentBg = accentColor === "rose" 
    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
    : "bg-amber-500/10 text-amber-400 border-amber-500/20";

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 hover:border-border">
      {/* Image Container - Fixed Height */}
      <div className="relative h-[180px] flex-shrink-0 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm transition-all duration-300 hover:bg-background/80 hover:scale-110 z-10 border border-border/50"
        >
          <Heart 
            size={14} 
            className={`transition-all duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-foreground/70'}`} 
          />
        </button>

        {/* Bestseller Badge */}
        {isBestseller && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-foreground text-background flex items-center gap-1 z-10">
            <Crown size={10} />
            BESTSELLER
          </div>
        )}

        {/* Package Title Badge - Overlapping Image */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-3 z-10">
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${accentBg}`}>
            <span className="text-[10px] font-bold tracking-widest uppercase">{title}</span>
          </div>
        </div>
      </div>

      {/* Content - Flex grow to fill space */}
      <div className="flex flex-col flex-grow p-4 pt-5">
        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-1.5 mb-2">
          <span className="text-lg font-bold text-foreground">{price}</span>
          <span className="text-[10px] text-muted-foreground line-through">{originalPrice}</span>
          <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded border border-emerald-400/20">SAVE {savings}</span>
        </div>

        {/* Items - Compact */}
        <div className="flex-grow mb-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <Check size={10} className="inline mr-0.5 text-foreground/50 flex-shrink-0" />
                <span>{item}</span>
                {i < items.length - 1 && <span className="mx-1 text-border">•</span>}
              </span>
            ))}
          </p>
        </div>

        {/* CTA Button - Always at bottom */}
        <Button
          variant="outline"
          size="sm"
          className="w-full group/btn text-xs mt-auto border-border hover:border-foreground hover:bg-foreground hover:text-background"
          asChild
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight size={12} className="transform group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Container with max-width */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        {/* Section Header - Professional */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/30 mb-6">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Signature Collections</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Curated Edits
          </h2>
          
          <p className="text-muted-foreground max-w-lg mx-auto">
            Thoughtfully styled collections for the modern wardrobe
          </p>
        </div>

        {/* FOR HER Section */}
        <div className="mb-14">
          {/* Section Header with lines on both sides */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5">
              <Heart className="w-4 h-4 text-rose-400" />
              <h3 className="font-display text-sm font-bold tracking-[0.2em] text-rose-200 uppercase">For Her</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          {/* 3-column grid for HER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {forHerPackages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                {...pkg}
                accentColor="rose"
              />
            ))}
          </div>
        </div>

        {/* FOR HIM Section */}
        <div>
          {/* Section Header with lines on both sides */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5">
              <Crown className="w-4 h-4 text-amber-400" />
              <h3 className="font-display text-sm font-bold tracking-[0.2em] text-amber-200 uppercase">For Him</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          
          {/* 4-column grid for HIM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {forHimPackages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                {...pkg}
                accentColor="gold"
              />
            ))}
          </div>
        </div>

        {/* Couples Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-secondary/30">
            <span className="text-sm tracking-wide text-muted-foreground">Mix & match any Her + Him package for the complete gift</span>
          </div>
        </div>
      </div>
    </section>
  );
};
