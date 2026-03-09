import { FC, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { SpadeIcon } from "./icons/SpadeIcon";

const collections = [
  { 
    title: "New Arrivals", 
    subtitle: "Fresh drops weekly",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop",
    cta: "Shop New",
    href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20see%20your%20latest%20arrivals",
  },
  { 
    title: "Men's Edit", 
    subtitle: "For the modern gentleman",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop",
    cta: "Shop Men's",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection",
  },
  { 
    title: "Women's Edit", 
    subtitle: "Elegance refined",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop",
    cta: "Shop Women's",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection",
  },
  { 
    title: "Couple's Edit", 
    subtitle: "Style together",
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&h=1000&fit=crop",
    cta: "Shop Duo",
    href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20matching%2Fcouple%20outfits",
  },
];

const CollectionCard: FC<{ collection: typeof collections[0] }> = ({ collection }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <a
      href={collection.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-lg aspect-[4/5] border border-border transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
    >
      {/* Image */}
      {!imageLoaded && <Skeleton className="absolute inset-0 bg-muted" />}
      <img
        src={collection.image}
        alt={collection.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,15,15,0.9)] via-[rgba(15,15,15,0.3)] to-transparent" />

      {/* Badge */}
      {collection.badge && (
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase z-10">
          {collection.badge}
        </div>
      )}

      {/* Content — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1">
          {collection.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {collection.subtitle}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline underline-offset-4 transition-all">
          {collection.cta}
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </a>
  );
};

export const CollectionsSection: FC = () => {
  return (
    <section id="collections" className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-30" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <SpadeIcon size={28} showLetters={false} className="mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Collections
          </h2>
          <p className="text-muted-foreground font-body">
            Curated pieces for the modern royal
          </p>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {collections.map((collection) => (
            <CollectionCard key={collection.title} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};
