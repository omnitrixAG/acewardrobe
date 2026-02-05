import { FC } from "react";
import { Globe, Truck, MapPin } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";

export const AboutSection: FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SpadeIcon size={60} className="mx-auto mb-6 glow-pulse" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Ace Wardrobe
            </h2>
            <p className="font-display italic text-xl text-chrome mb-6">
              "Dress Like Royalty"
            </p>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ace Wardrobe is Abuja's premier luxury fashion destination, where streetwear meets classic tailoring. 
              Founded with a vision to dress Nigeria's modern royalty, we curate exclusive pieces that make statements.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Globe size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Online/Private Shopping
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Personalized shopping experience tailored to your style
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Truck size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Worldwide Delivery
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                We ship luxury to every corner of the globe
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Maitama, Abuja
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Visit our flagship store for an exclusive experience
              </p>
            </div>
          </div>

          {/* CEO Mention */}
          <div className="text-center">
            <p className="font-body text-sm text-muted-foreground">
              Curated by{" "}
              <a
                href="https://www.instagram.com/mista_ace/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @mista_ace
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
