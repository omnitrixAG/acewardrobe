import { FC, useState } from "react";
import { ShoppingBag, Sparkles, CircleDot, Wine, ChevronRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const activities = [
  {
    icon: ShoppingBag,
    title: "Exclusive Shopping",
    description: "First access to Valentine's collections from Ace Wardrobe & Peaches by Ema",
    badge: null,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    icon: Sparkles,
    title: "Free Tattoo",
    description: "By Kelz Tattoo — matching couple tattoos & individual designs",
    badge: "LIMITED SLOTS",
    badgeStyle: "animate-pulse",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&h=600&fit=crop",
  },
  {
    icon: CircleDot,
    title: "Free Piercing",
    description: "Professional piercing service — 1 free piercing to 2 lucky guests",
    badge: "T&C APPLY",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop",
  },
  {
    icon: Wine,
    title: "Drinks & Bites",
    description: "Complimentary cocktails, canapés & barbecue all day",
    badge: null,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop",
  },
];

interface ActivityCardProps {
  activity: typeof activities[0];
  index: number;
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background Image with Skeleton */}
      <div className="absolute inset-0">
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0 bg-secondary" />
        )}
        <img
          src={activity.image}
          alt={activity.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
            <activity.icon size={48} className="text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-20 transition-opacity"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Badge */}
      {activity.badge && (
        <span className={`absolute top-4 right-4 z-20 px-3 py-1.5 text-xs font-bold tracking-wider bg-primary text-primary-foreground rounded-full shadow-lg ${activity.badgeStyle || ''}`}>
          {activity.badge}
        </span>
      )}

      {/* Red glow border on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-[inset_0_0_30px_rgba(196,30,58,0.1)]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
          <activity.icon size={26} className="text-primary" />
        </div>

        {/* Text Content */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {activity.title}
        </h3>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
          {activity.description}
        </p>

        {/* Learn More indicator */}
        <div className="flex items-center gap-2 mt-4 text-primary/70 group-hover:text-primary transition-colors">
          <span className="text-sm font-medium tracking-wide">Learn More</span>
          <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export const ActivitiesSection: FC = () => {
  return (
    <section id="activities" className="py-20 md:py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15z M0 30L15 45L0 60z M60 30L45 45L60 60z' fill='%23c41e3a' fill-opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-card via-card/95 to-card" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-primary uppercase">Valentine's Day 2026</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Experience the <span className="text-shimmer">Event</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-lg">
            More than shopping—an immersive Valentine's celebration
          </p>
        </div>

        {/* Timeline connector for desktop */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-primary/30" />
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Your Journey</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-0.5 bg-gradient-to-l from-primary to-primary/30" />
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
        </div>

        {/* Activities Grid - 2x2 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.title} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
