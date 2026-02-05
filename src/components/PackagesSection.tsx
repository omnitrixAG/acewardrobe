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
    <div className="group relative overflow-hidden rounded-xl bg-card/80 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
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
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 hover:scale-110"
        >
          <Heart 
            size={16} 
            className={`transition-all duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'}`} 
          />
        </button>

        {/* Bestseller Badge */}
        {isBestseller && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold tracking-wider bg-primary text-primary-foreground flex items-center gap-1">
            <Crown size={10} />
            BESTSELLER
          </div>
        )}

        {/* Package Title Badge - Overlapping Image */}
        <div className="absolute -bottom-3 left-4 right-4">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${badgeGradient} shadow-lg animate-shimmer-badge`}>
            <span className="text-xs font-bold tracking-widest text-white">{title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-6">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-foreground">{price}</span>
          <span className="text-xs text-muted-foreground line-through">{originalPrice}</span>
          <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">SAVE {savings}</span>
        </div>

        {/* Items - Compact */}
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          {items.map((item, i) => (
            <span key={i}>
              <Check size={10} className="inline mr-1 text-primary" />
              {item}{i < items.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </p>

        {/* CTA Button */}
        <Button
          variant="solid"
          size="sm"
          className="w-full group/btn text-xs"
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
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-4 h-4 text-rose-400" />
            <h3 className="font-display text-lg font-bold tracking-widest text-rose-100">FOR HER</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-rose-500/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-lg font-bold tracking-widest text-amber-100">FOR HIM</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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