import { FC, useState } from "react";
import { ShoppingBag, Sparkles, CircleDot, Wine, ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const activities = [
  {
    icon: ShoppingBag,
    title: "Exclusive Shopping",
    description: "First access to new collections from Ace Wardrobe & Peaches by Ema",
    badge: null,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    icon: Sparkles,
    title: "Free Tattoo",
    description: "By Kelz Tattoo — matching couple tattoos & individual designs",
    badge: "LIMITED SLOTS",
    badgeStyle: "",
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
      className="group relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-border/50 hover:border-border transition-all duration-500"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Badge */}
      {activity.badge && (
        <span className="absolute top-4 right-4 z-20 px-3 py-1.5 text-xs font-bold tracking-wider bg-foreground text-background rounded-full">
          {activity.badge}
        </span>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-all duration-300">
          <activity.icon size={26} className="text-white" />
        </div>

        {/* Text Content */}
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          {activity.title}
        </h3>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
          {activity.description}
        </p>

        {/* Learn More indicator */}
        <div className="flex items-center gap-2 mt-4 text-muted-foreground group-hover:text-foreground transition-colors">
          <span className="text-sm font-medium tracking-wide">Learn More</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export const ActivitiesSection: FC = () => {
  return (
    <section id="activities" className="py-20 md:py-28 relative overflow-hidden bg-secondary">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header - Professional */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Event Experiences</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            What to Expect
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-lg">
            More than shopping — an immersive celebration
          </p>
        </div>

        {/* Timeline connector for desktop */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-foreground" />
            <div className="w-24 h-0.5 bg-gradient-to-r from-foreground to-border" />
          </div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Your Journey</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-0.5 bg-gradient-to-l from-foreground to-border" />
            <div className="w-3 h-3 rounded-full bg-foreground" />
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
