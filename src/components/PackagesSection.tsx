import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Heart, Check, Crown } from "lucide-react";

const forHerPackages = [
  {
    title: "SOULMATE EDIT",
    price: "₦350,000",
    originalPrice: "₦450,000",
    savings: "₦100,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20SOULMATE%20EDIT%20package%20(₦350,000)",
    items: ["Long Dress", "Lingerie", "Pyjama Set", "Chocolate & Card"],
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
  },
  {
    title: "LOVER'S EDIT",
    price: "₦250,000",
    originalPrice: "₦320,000",
    savings: "₦70,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20LOVER'S%20EDIT%20package%20(₦250,000)",
    items: ["Short Dress", "Lingerie", "Pyjama Set", "Chocolate & Card"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop",
  },
  {
    title: "SWEETHEART EDIT",
    price: "₦150,000",
    originalPrice: "₦200,000",
    savings: "₦50,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20SWEETHEART%20EDIT%20package%20(₦150,000)",
    items: ["Lingerie", "Pyjama Set", "Chocolate & Flowers"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=300&fit=crop",
  },
];

const forHimPackages = [
  {
    title: "ULTIMATE LOVER",
    price: "₦750,000",
    originalPrice: "₦950,000",
    savings: "₦200,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20ULTIMATE%20LOVER%20EDIT%20package%20(₦750,000)",
    items: ["Two-Piece Set", "Boxers & Singlet", "Shirt/T-Shirt", "Shorts"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop",
  },
  {
    title: "KING EDIT",
    price: "₦550,000",
    originalPrice: "₦700,000",
    savings: "₦150,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20KING%20EDIT%20package%20(₦550,000)",
    items: ["Boxers & Singlet", "Shirt/T-Shirt", "Pants/Jeans", "Card"],
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
  {
    title: "BAE EDIT",
    price: "₦350,000",
    originalPrice: "₦450,000",
    savings: "₦100,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20BAE%20EDIT%20package%20(₦350,000)",
    items: ["Singlet & Boxers", "Shirt/Pants", "Miniature Spirits", "Card"],
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop",
  },
  {
    title: "CRUSH EDIT",
    price: "₦200,000",
    originalPrice: "₦250,000",
    savings: "₦50,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20CRUSH%20EDIT%20package%20(₦200,000)",
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
  
  const badgeGradient = accentColor === "rose" 
    ? "bg-gradient-to-r from-rose-600 to-rose-800"
    : "bg-gradient-to-r from-amber-600 to-amber-800";

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-card/80 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 hover:scale-110 z-10"
        >
          <Heart 
            size={14} 
            className={`transition-all duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'}`} 
          />
        </button>

        {/* Bestseller Badge */}
        {isBestseller && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-primary text-primary-foreground flex items-center gap-1 z-10">
            <Crown size={10} />
            BESTSELLER
          </div>
        )}

        {/* Package Title Badge - Overlapping Image */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-3 z-10">
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full ${badgeGradient} shadow-lg animate-shimmer-badge`}>
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">{title}</span>
          </div>
        </div>
      </div>

      {/* Content - Flex grow to fill space */}
      <div className="flex flex-col flex-grow p-4 pt-5">
        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-1.5 mb-2">
          <span className="text-lg font-bold text-foreground">{price}</span>
          <span className="text-[10px] text-muted-foreground line-through">{originalPrice}</span>
          <span className="text-[9px] font-semibold text-green-500 bg-green-500/10 px-1 py-0.5 rounded">SAVE {savings}</span>
        </div>

        {/* Items - Compact */}
        <div className="flex-grow mb-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <Check size={10} className="inline mr-0.5 text-primary flex-shrink-0" />
                <span>{item}</span>
                {i < items.length - 1 && <span className="mx-1">•</span>}
              </span>
            ))}
          </p>
        </div>

        {/* CTA Button - Always at bottom */}
        <Button
          variant="solid"
          size="sm"
          className="w-full group/btn text-xs mt-auto"
          asChild
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>Select Package</span>
            <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15z M0 30L15 45L0 60z M60 30L45 45L60 60z' fill='%23c41e3a' fill-opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Container with max-width */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-primary text-lg">♠</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
            <span className="text-shimmer">Valentine</span>{" "}
            <span className="text-chrome-gradient">Essentials</span>
          </h2>
          
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">Ace Wardrobe</span> × <span className="text-rose-400">Peaches by Ema</span>
          </p>
        </div>

        {/* FOR HER Section */}
        <div className="mb-14">
          {/* Section Header with lines on both sides */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-500/40" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/5">
              <Heart className="w-4 h-4 text-rose-400" />
              <h3 className="font-display text-sm font-bold tracking-[0.2em] text-rose-100 uppercase">For Her</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-500/40" />
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
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5">
              <Crown className="w-4 h-4 text-amber-400" />
              <h3 className="font-display text-sm font-bold tracking-[0.2em] text-amber-100 uppercase">For Him</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40" />
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
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5">
            <Heart className="w-4 h-4 text-primary fill-primary/30" />
            <span className="text-xs tracking-wider text-primary font-medium">MIX & MATCH ANY HER + HIM PACKAGE</span>
            <Heart className="w-4 h-4 text-primary fill-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};