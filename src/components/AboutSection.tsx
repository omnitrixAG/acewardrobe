import { FC, useState } from "react";
import { Globe, Truck, MapPin, ExternalLink, MessageCircle, Navigation } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const services = [
  {
    icon: Globe,
    title: "Online & Private Shopping",
    description: "Personalized shopping experience from anywhere in the world. Book a virtual styling session or visit our private showroom.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    cta: "Book Session",
    href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20book%20a%20private%20styling%20session",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    description: "We ship luxury to every corner of the globe. Express delivery available for Valentine's orders.",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=800&h=600&fit=crop",
    badge: "EXPRESS AVAILABLE",
    cta: "Shipping Info",
    href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20inquire%20about%20shipping%20options",
  },
  {
    icon: MapPin,
    title: "Visit Our Store",
    description: "Experience Ace Wardrobe in person at our Maitama flagship. Private appointments available.",
    address: "6 Euphrates Crescent, Maitama, Abuja",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    cta: "Get Directions",
    href: "https://maps.google.com/?q=6+Euphrates+Crescent+Maitama+Abuja+Nigeria",
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(196,30,58,0.15)]"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Image Section - 60% height */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0 bg-secondary" />
        )}
        <img
          src={service.image}
          alt={service.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
            <service.icon size={48} className="text-muted-foreground/30" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <service.icon size={22} className="text-primary" />
        </div>

        {/* Badge if exists */}
        {service.badge && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider">
            {service.badge}
          </div>
        )}
      </div>

      {/* Content Section - 40% */}
      <div className="relative p-6 bg-gradient-to-b from-card to-background">
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Address if exists */}
        {service.address && (
          <p className="text-xs text-chrome mb-4 flex items-center gap-2">
            <MapPin size={12} className="text-primary" />
            {service.address}
          </p>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full group/btn border-primary/30 hover:border-primary hover:bg-primary/10"
          asChild
        >
          <a href={service.href} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center justify-center gap-2">
              {service.cta === "Get Directions" ? (
                <Navigation size={14} />
              ) : (
                <MessageCircle size={14} />
              )}
              {service.cta}
              <ExternalLink size={12} className="opacity-50" />
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export const AboutSection: FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15z M0 30L15 45L0 60z M60 30L45 45L60 60z' fill='%23c41e3a' fill-opacity='0.02'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Brand Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <SpadeIcon size={80} className="mx-auto mb-8 glow-pulse" />
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About <span className="text-shimmer">Ace Wardrobe</span>
          </h2>
          
          <p className="font-display italic text-2xl md:text-3xl text-chrome mb-8">
            "Dress Like Royalty"
          </p>
          
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Ace Wardrobe is Abuja's premier luxury fashion destination, where streetwear meets classic tailoring. 
            Founded with a vision to dress Nigeria's modern royalty, we curate exclusive pieces that make statements.
          </p>
        </div>

        {/* Services Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Our Services</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CEO Mention */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/30 bg-card/50 backdrop-blur-sm">
            <span className="text-muted-foreground font-body text-sm">Curated by</span>
            <a
              href="https://www.instagram.com/mista_ace/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              @mista_ace
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
