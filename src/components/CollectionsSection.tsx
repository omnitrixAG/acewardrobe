import { FC, useState } from "react";
import { ArrowRight, Bell, Heart, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const collections = [
  { 
    title: "New Arrivals", 
    subtitle: "Fresh drops weekly",
    status: "DROPPING SOON",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
    cta: "Get Notified",
    href: "#rsvp",
    isExternal: false,
  },
  { 
    title: "Men's Edit", 
    subtitle: "Curated pieces for the modern king",
    status: "PREVIEW",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop",
    cta: "Preview Collection",
    href: "https://www.instagram.com/ace_wardrobe/",
    isExternal: true,
  },
  { 
    title: "Women's Edit", 
    subtitle: "Elegance meets confidence",
    status: "PREVIEW",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop",
    cta: "Preview Collection",
    href: "https://www.instagram.com/ace_wardrobe/",
    isExternal: true,
  },
  { 
    title: "Couple's Edit", 
    subtitle: "Twin in style this Valentine's",
    status: "VALENTINE'S SPECIAL",
    badge: true,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&h=1000&fit=crop",
    cta: "Shop Together",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20the%20Couple's%20Edit%20collection",
    isExternal: true,
  },
];

interface CollectionCardProps {
  collection: typeof collections[0];
  index: number;
  isLarge?: boolean;
}

const CollectionCard: FC<CollectionCardProps> = ({ collection, index, isLarge }) => {
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
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${isLarge ? 'aspect-[3/4] md:aspect-[4/5]' : 'aspect-[4/5]'}`}
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

      {/* Valentine's Special Badge */}
      {collection.badge && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider">
          <Heart size={12} className="fill-current" />
          {collection.status}
        </div>
      )}

      {/* Status indicator for non-badge items */}
      {!collection.badge && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white text-xs font-medium tracking-wider">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {collection.status}
        </div>
      )}

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {collection.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm md:text-base">
          {collection.subtitle}
        </p>

        {/* CTA Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-fit group/btn border-white/20 hover:border-primary hover:bg-primary/10"
        >
          <span className="flex items-center gap-2">
            {collection.title === "New Arrivals" ? (
              <Bell size={14} className="group-hover/btn:animate-pulse" />
            ) : collection.isExternal ? (
              <ExternalLink size={14} />
            ) : null}
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
    <section id="collections" className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-primary text-2xl">♠</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Collections
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Curated pieces for the modern royal
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* First two cards - taller */}
          <div className="lg:col-span-2 lg:row-span-1">
            <CollectionCard collection={collections[0]} index={0} isLarge />
          </div>
          
          {/* Regular cards */}
          <CollectionCard collection={collections[1]} index={1} />
          <CollectionCard collection={collections[2]} index={2} />
          
          {/* Couple's Edit - spans full width on mobile, 2 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-2">
            <CollectionCard collection={collections[3]} index={3} isLarge />
          </div>
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
