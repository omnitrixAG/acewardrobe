import { FC, useState } from "react";
import { Globe, Truck, MapPin, ExternalLink, MessageCircle, Navigation, ArrowRight } from "lucide-react";
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
    description: "We ship luxury to every corner of the globe. Express delivery available on all orders.",
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
      className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-foreground/5"
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
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-secondary/80 backdrop-blur-md border border-border flex items-center justify-center group-hover:bg-secondary transition-colors">
          <service.icon size={22} className="text-foreground" />
        </div>

        {/* Badge if exists */}
        {service.badge && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-bold tracking-wider">
            {service.badge}
          </div>
        )}
      </div>

      {/* Content Section - 40% */}
      <div className="relative p-6 bg-gradient-to-b from-card to-background">
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Address if exists */}
        {service.address && (
          <p className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
            <MapPin size={12} className="text-foreground/50" />
            {service.address}
          </p>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full group/btn border-border hover:border-foreground hover:bg-foreground hover:text-background"
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
              <ArrowRight size={12} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export const AboutSection: FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Brand Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <SpadeIcon size={60} className="mx-auto mb-8 text-foreground" />
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About Ace Wardrobe
          </h2>
          
          <p className="font-display italic text-2xl md:text-3xl text-muted-foreground mb-8">
            "Dress Like Royalty"
          </p>
          
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Ace Wardrobe is Abuja's premier luxury fashion destination, where streetwear meets classic tailoring. 
            Founded with a vision to dress Nigeria's modern royalty, we curate exclusive pieces that make statements.
          </p>
        </div>

        {/* Services Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/30 mb-6">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Our Services</span>
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
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-secondary/30">
            <span className="text-muted-foreground font-body text-sm">Curated by</span>
            <a
              href="https://www.instagram.com/mista_ace/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground font-semibold flex items-center gap-1 transition-colors"
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
