import { FC } from "react";
import { ShoppingBag, Sparkles, CircleDot, Wine } from "lucide-react";

const activities = [
  {
    icon: ShoppingBag,
    title: "Exclusive Shopping",
    description: "First access to Valentine's collections",
    badge: null,
  },
  {
    icon: Sparkles,
    title: "Free Tattoo",
    description: "By Kelz Tattoo, limited slots",
    badge: "LIMITED",
  },
  {
    icon: CircleDot,
    title: "Free Piercing",
    description: "Professional service, T&C apply",
    badge: null,
  },
  {
    icon: Wine,
    title: "Refreshments",
    description: "Complimentary drinks, canapés & BBQ",
    badge: null,
  },
];

export const ActivitiesSection: FC = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Diamond Pattern Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15z M0 30L15 45L0 60z M60 30L45 45L60 60z' fill='%23c41e3a' fill-opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-card/95 to-card" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience the Event
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            More than shopping—an immersive Valentine's experience
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className="group relative p-6 md:p-8 rounded-xl glass-dark border border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Badge */}
              {activity.badge && (
                <span className="absolute top-4 right-4 px-2 py-1 text-xs font-body tracking-wider bg-primary text-primary-foreground rounded">
                  {activity.badge}
                </span>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <activity.icon size={28} className="text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {activity.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
