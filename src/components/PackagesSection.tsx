import { FC } from "react";
import { Button } from "./ui/button";
import { Heart, Sparkles, Crown, Star } from "lucide-react";

const forHerPackages = [
  {
    title: "SOULMATE EDIT",
    price: "₦350,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20SOULMATE%20EDIT%20package%20(₦350,000)",
    items: [
      "One Long Dress",
      "One Lingerie",
      "One Pyjama Pant Set",
      "Chocolate & Card",
    ],
    isBestseller: true,
    accentColor: "rose",
    silhouette: "long-dress",
  },
  {
    title: "LOVER'S EDIT",
    price: "₦250,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20LOVER'S%20EDIT%20package%20(₦250,000)",
    items: [
      "One Short Dress",
      "One Lingerie",
      "One Pyjama Pant Set",
      "Chocolate & Card",
    ],
    isBestseller: false,
    accentColor: "rose",
    silhouette: "short-dress",
  },
  {
    title: "SWEETHEART EDIT",
    price: "₦150,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20SWEETHEART%20EDIT%20package%20(₦150,000)",
    items: [
      "One Lingerie",
      "One Pyjama Pant Set",
      "Chocolate & Flowers",
    ],
    isBestseller: false,
    accentColor: "rose",
    silhouette: "lingerie",
  },
];

const forHimPackages = [
  {
    title: "ULTIMATE LOVER EDIT",
    price: "₦750,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20ULTIMATE%20LOVER%20EDIT%20package%20(₦750,000)",
    items: [
      "Two-Piece Set / Jacket",
      "Boxers & Singlet",
      "Shirt or T-Shirt",
      "Shorts",
    ],
    isBestseller: false,
    accentColor: "gold",
    silhouette: "suit",
  },
  {
    title: "KING EDIT",
    price: "₦550,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20KING%20EDIT%20package%20(₦550,000)",
    items: [
      "Boxers & Singlet",
      "Shirt or T-Shirt",
      "Pants or Jeans",
      "Card",
    ],
    isBestseller: true,
    accentColor: "gold",
    silhouette: "shirt-pants",
  },
  {
    title: "BAE EDIT",
    price: "₦350,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20BAE%20EDIT%20package%20(₦350,000)",
    items: [
      "Singlet & Boxers",
      "Shirt or Pants",
      "Miniature Spirits",
      "Card",
    ],
    isBestseller: false,
    accentColor: "gold",
    silhouette: "casual",
  },
  {
    title: "CRUSH EDIT",
    price: "₦200,000",
    whatsappMessage: "Hi!%20I'm%20interested%20in%20the%20CRUSH%20EDIT%20package%20(₦200,000)",
    items: [
      "Boxers & Singlet",
      "Miniature Spirits",
      "Card",
    ],
    isBestseller: false,
    accentColor: "gold",
    silhouette: "minimal",
  },
];

// Silhouette components for each package type
const SilhouetteIllustration: FC<{ type: string; isHer: boolean }> = ({ type, isHer }) => {
  const baseClass = isHer ? "text-rose-300/40" : "text-amber-300/40";
  
  if (isHer) {
    switch(type) {
      case "long-dress":
        return (
          <svg viewBox="0 0 100 140" className={`w-full h-32 ${baseClass}`} fill="currentColor">
            <ellipse cx="50" cy="12" rx="8" ry="6" opacity="0.6" />
            <path d="M50 18 L42 30 L35 30 L28 50 L15 130 L85 130 L72 50 L65 30 L58 30 Z" opacity="0.5" />
            <path d="M38 35 L25 130 M62 35 L75 130" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
          </svg>
        );
      case "short-dress":
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-28 ${baseClass}`} fill="currentColor">
            <ellipse cx="50" cy="10" rx="7" ry="5" opacity="0.6" />
            <path d="M50 15 L43 25 L38 25 L30 45 L25 90 L75 90 L70 45 L62 25 L57 25 Z" opacity="0.5" />
          </svg>
        );
      case "lingerie":
        return (
          <svg viewBox="0 0 100 80" className={`w-full h-24 ${baseClass}`} fill="currentColor">
            <path d="M20 25 Q35 10 50 10 Q65 10 80 25 L75 35 Q60 20 50 20 Q40 20 25 35 Z" opacity="0.5" />
            <path d="M30 40 L30 70 L70 70 L70 40 Q50 55 30 40" opacity="0.4" />
            <path d="M25 30 L25 5 M75 30 L75 5" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          </svg>
        );
      default:
        return null;
    }
  } else {
    switch(type) {
      case "suit":
        return (
          <svg viewBox="0 0 100 130" className={`w-full h-32 ${baseClass}`} fill="currentColor">
            <ellipse cx="50" cy="10" rx="8" ry="6" opacity="0.5" />
            <path d="M50 16 L38 24 L25 28 L20 60 L25 120 L42 120 L42 70 L50 45 L58 70 L58 120 L75 120 L80 60 L75 28 L62 24 Z" opacity="0.5" />
            <path d="M42 24 L50 40 L58 24" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M50 40 L48 80 L50 85 L52 80 Z" opacity="0.6" />
          </svg>
        );
      case "shirt-pants":
        return (
          <svg viewBox="0 0 100 130" className={`w-full h-32 ${baseClass}`} fill="currentColor">
            <ellipse cx="50" cy="8" rx="6" ry="5" opacity="0.5" />
            <path d="M50 13 L40 20 L28 25 L25 45 L32 45 L32 60 L68 60 L68 45 L75 45 L72 25 L60 20 Z" opacity="0.5" />
            <path d="M30 62 L28 120 L45 120 L50 85 L55 120 L72 120 L70 62 Z" opacity="0.4" />
          </svg>
        );
      case "casual":
        return (
          <svg viewBox="0 0 100 110" className={`w-full h-28 ${baseClass}`} fill="currentColor">
            <path d="M50 10 L40 18 L30 22 L28 50 L35 50 L35 65 L65 65 L65 50 L72 50 L70 22 L60 18 Z" opacity="0.5" />
            <path d="M32 67 L30 105 L48 105 L50 82 L52 105 L70 105 L68 67 Z" opacity="0.4" />
          </svg>
        );
      case "minimal":
        return (
          <svg viewBox="0 0 100 70" className={`w-full h-20 ${baseClass}`} fill="currentColor">
            <path d="M25 10 L25 35 L42 35 L50 25 L58 35 L75 35 L75 10 Z" opacity="0.5" />
            <rect x="28" y="40" width="44" height="25" rx="3" opacity="0.4" />
          </svg>
        );
      default:
        return null;
    }
  }
};

interface PackageCardProps {
  title: string;
  price: string;
  items: string[];
  whatsappMessage: string;
  isBestseller: boolean;
  accentColor: "rose" | "gold";
  silhouette: string;
  isHer: boolean;
}

const PackageCard: FC<PackageCardProps> = ({ 
  title, 
  price, 
  items, 
  whatsappMessage, 
  isBestseller, 
  accentColor,
  silhouette,
  isHer
}) => {
  const whatsappUrl = `https://wa.me/2347039178489?text=${whatsappMessage}`;
  
  const accentStyles = accentColor === "rose" 
    ? "from-rose-500/10 to-pink-500/5 hover:border-rose-400/50 hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]"
    : "from-amber-500/10 to-yellow-500/5 hover:border-amber-400/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]";

  const tagStyles = accentColor === "rose"
    ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
    : "bg-amber-500/20 text-amber-300 border-amber-500/30";

  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] bg-gradient-to-br ${accentStyles} border border-border/30 backdrop-blur-sm`}>
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Bestseller Badge */}
      {isBestseller && (
        <div className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider border ${tagStyles} flex items-center gap-1.5`}>
          <Crown size={12} />
          BESTSELLER
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-2xl" />

      {/* Silhouette Illustration Section */}
      <div className="relative h-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        
        {/* Floating decorative elements */}
        {isHer ? (
          <>
            <Heart className="absolute top-4 left-6 w-4 h-4 text-rose-400/30 animate-pulse" />
            <Sparkles className="absolute top-8 right-8 w-3 h-3 text-rose-300/40" />
            <Heart className="absolute bottom-12 right-6 w-3 h-3 text-pink-400/20" />
          </>
        ) : (
          <>
            <Star className="absolute top-4 left-6 w-4 h-4 text-amber-400/30 animate-pulse" />
            <span className="absolute top-8 right-8 text-amber-300/40 text-lg">♠</span>
            <Star className="absolute bottom-12 right-6 w-3 h-3 text-amber-400/20" />
          </>
        )}
        
        <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500">
          <SilhouetteIllustration type={silhouette} isHer={isHer} />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 pt-2">
        <h4 className="font-display text-lg text-primary font-semibold mb-2 tracking-wide">
          {title}
        </h4>
        
        {/* Price tag styled like luxury boutique */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="font-display text-2xl font-bold text-foreground">
            {price}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">NGN</span>
        </div>

        <ul className="space-y-2 mb-6">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className={`mt-0.5 ${accentColor === 'rose' ? 'text-rose-400' : 'text-amber-400'}`}>♠</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button
          variant="solid"
          size="default"
          className="w-full group/btn relative overflow-hidden"
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

// Floating hearts component for background
const FloatingHearts: FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <Heart
        key={i}
        className="absolute text-primary/5 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${12 + Math.random() * 20}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15z M0 30L15 45L0 60z M60 30L45 45L60 60z' fill='%23c41e3a' fill-opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />
      <FloatingHearts />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-20">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-primary text-2xl">♠</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
            <span className="text-shimmer">The Valentine</span>
            <br />
            <span className="text-chrome-gradient">Essentials</span>
          </h2>
          
          <p className="font-body text-base md:text-lg text-muted-foreground mb-3">
            Curated Packages by <span className="text-primary">Ace Wardrobe</span> × <span className="text-rose-400">Peaches by Ema</span>
          </p>
          
          <p className="font-display italic text-chrome text-lg md:text-xl">
            "Thoughtfully styled gifts for every kind of love"
          </p>
        </div>

        {/* Two-Column Layout: For Her | For Him */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* FOR HER Column */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/30 to-rose-500/50" />
              <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-rose-500/20 bg-rose-500/5">
                <Heart className="w-5 h-5 text-rose-400" />
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-[0.15em] text-rose-100">
                  FOR HER
                </h3>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-500/30 to-rose-500/50" />
            </div>
            
            <div className="space-y-6">
              {forHerPackages.map((pkg, index) => (
                <div
                  key={pkg.title}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
                >
                  <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    items={pkg.items}
                    whatsappMessage={pkg.whatsappMessage}
                    isBestseller={pkg.isBestseller}
                    accentColor="rose"
                    silhouette={pkg.silhouette}
                    isHer={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* FOR HIM Column */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/50" />
              <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-[0.15em] text-amber-100">
                  FOR HIM
                </h3>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/50" />
            </div>
            
            <div className="space-y-6">
              {forHimPackages.map((pkg, index) => (
                <div
                  key={pkg.title}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
                >
                  <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    items={pkg.items}
                    whatsappMessage={pkg.whatsappMessage}
                    isBestseller={pkg.isBestseller}
                    accentColor="gold"
                    silhouette={pkg.silhouette}
                    isHer={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Couples Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <Heart className="w-5 h-5 text-primary fill-primary/30" />
            <span className="font-display text-sm tracking-wider text-primary">
              PERFECT FOR COUPLES — MIX & MATCH ANY "HER" + "HIM" PACKAGE
            </span>
            <Heart className="w-5 h-5 text-primary fill-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};
