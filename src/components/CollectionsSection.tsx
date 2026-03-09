import { FC, useState } from "react";
import { ArrowRight, Bell, Heart, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const collections = [
  { 
    title: "New Arrivals", 
    subtitle: "Fresh drops weekly",
    status: "NEW",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
    cta: "Shop New",
    href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20see%20your%20new%20arrivals",
    isExternal: true,
  },
  { 
    title: "Men's Edit", 
    subtitle: "Curated pieces for the modern king",
    status: "SHOP NOW",
    statusColor: "bg-foreground",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop",
    cta: "Shop Men's",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection",
    isExternal: true,
  },
  { 
    title: "Women's Edit", 
    subtitle: "Elegance meets confidence",
    status: "SHOP NOW",
    statusColor: "bg-foreground",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop",
    cta: "Shop Women's",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection",
    isExternal: true,
  },
  { 
    title: "Couple's Edit", 
    subtitle: "Twin in style",
    status: "POPULAR",
    statusColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&h=1000&fit=crop",
    cta: "Shop Together",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20couple%2Fmatching%20outfits",
    isExternal: true,
  },
];

interface CollectionCardProps {
  collection: typeof collections[0];
  index: number;
  isLarge?: boolean;
}

const CollectionCard: FC<CollectionCardProps> = ({ collection, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (collection.isExternal) {
      window.open(collection.href, '_blank');
    } else {
      const element = document.getElementById(collection.href.replace('#', ''));
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/4] border border-border/50 hover:border-border transition-all duration-500"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0 bg-secondary" />
        )}
        <img
          src={collection.image}
          alt={collection.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            animation: imageLoaded ? 'kenburns 20s ease-in-out infinite alternate' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card" />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Status Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white text-xs font-medium tracking-wider">
        <span className={`w-2 h-2 rounded-full ${collection.statusColor}`} />
        {collection.status}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          {collection.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm md:text-base">
          {collection.subtitle}
        </p>

        {/* CTA Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-fit group/btn border-white/20 hover:border-foreground hover:bg-foreground hover:text-background"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} />
            {collection.cta}
            <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export const CollectionsSection: FC = () => {
  return (
    <section id="collections" className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background opacity-50" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        {/* Section Header - Professional */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/30 mb-6">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Shop</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Collections
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Curated pieces for the modern royal
          </p>
        </div>

        {/* Clean 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.title} collection={collection} index={index} />
          ))}
        </div>
      </div>

      {/* Ken Burns animation */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, -2%); }
        }
      `}</style>
    </section>
  );
};
