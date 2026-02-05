import { FC } from "react";
import { Button } from "./ui/button";

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
  },
];

interface PackageCardProps {
  title: string;
  price: string;
  items: string[];
  whatsappMessage: string;
}

const PackageCard: FC<PackageCardProps> = ({ title, price, items, whatsappMessage }) => {
  const whatsappUrl = `https://wa.me/2347039178489?text=${whatsappMessage}`;

  return (
    <div className="package-card group relative overflow-hidden rounded-lg p-6 transition-all duration-300 hover:border-primary hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(348,76%,44%,0.25)]">
      {/* Red corner accent */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-primary opacity-60" />
      
      <h4 className="font-display text-lg text-primary font-semibold mb-2 tracking-wide">
        {title}
      </h4>
      <p className="font-display text-2xl font-bold text-foreground mb-4">
        {price}
      </p>

      <ul className="space-y-2 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">♠</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Button
        variant="solid"
        size="default"
        className="w-full"
        asChild
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Select Package
        </a>
      </Button>
    </div>
  );
};

export const PackagesSection: FC = () => {
  return (
    <section id="packages" className="py-16 md:py-24 relative">
      {/* Diamond Pattern Background */}
      <div className="absolute inset-0 bg-[url('/assets/diamond-pattern-bg.png')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            The Valentine Essentials
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mb-2">
            Curated Packages by Ace Wardrobe × Peaches by Ema
          </p>
          <p className="font-display italic text-chrome text-base md:text-lg">
            "Thoughtfully styled gifts for every kind of love"
          </p>
        </div>

        {/* Two-Column Layout: For Her | For Him */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* FOR HER Column */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] text-foreground">
                FOR HER
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            
            <div className="space-y-4">
              {forHerPackages.map((pkg, index) => (
                <div
                  key={pkg.title}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    items={pkg.items}
                    whatsappMessage={pkg.whatsappMessage}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* FOR HIM Column */}
          <div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-[0.2em] text-foreground">
                FOR HIM
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            
            <div className="space-y-4">
              {forHimPackages.map((pkg, index) => (
                <div
                  key={pkg.title}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    items={pkg.items}
                    whatsappMessage={pkg.whatsappMessage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
