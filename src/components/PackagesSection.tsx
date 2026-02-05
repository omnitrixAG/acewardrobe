import { FC, useState } from "react";
import { PackageCard } from "./PackageCard";
import {
  DressSilhouette,
  LingerieSilhouette,
  SuitSilhouette,
  ShirtSilhouette,
  BoxersSilhouette,
} from "./icons/SilhouetteIcons";
import { Button } from "./ui/button";

const forHerPackages = [
  {
    title: "SOULMATE EDIT",
    price: "₦350,000",
    items: [
      "One Long Dress",
      "One Lingerie",
      "One Pyjama Pant Set",
      "Chocolate & Card",
    ],
    silhouette: <DressSilhouette size={100} />,
  },
  {
    title: "LOVER'S EDIT",
    price: "₦250,000",
    items: [
      "One Short Dress",
      "One Lingerie",
      "One Pyjama Pant Set",
      "Chocolate & Card",
    ],
    silhouette: <DressSilhouette size={80} />,
  },
  {
    title: "SWEETHEART EDIT",
    price: "₦150,000",
    items: [
      "One Lingerie",
      "One Pyjama Pant Set",
      "Chocolate & Flowers",
    ],
    silhouette: <LingerieSilhouette size={80} />,
  },
];

const forHimPackages = [
  {
    title: "ULTIMATE LOVER EDIT",
    price: "₦750,000",
    items: [
      "Two-Piece Set / Jacket",
      "Boxers & Singlet",
      "Shirt or T-Shirt",
      "Shorts",
    ],
    silhouette: <SuitSilhouette size={100} />,
  },
  {
    title: "KING EDIT",
    price: "₦550,000",
    items: [
      "Boxers & Singlet",
      "Shirt or T-Shirt",
      "Pants or Jeans",
      "Card",
    ],
    silhouette: <SuitSilhouette size={90} />,
  },
  {
    title: "BAE EDIT",
    price: "₦350,000",
    items: [
      "Singlet & Boxers",
      "Shirt or Pants",
      "Miniature Spirits",
      "Card",
    ],
    silhouette: <ShirtSilhouette size={80} />,
  },
  {
    title: "CRUSH EDIT",
    price: "₦200,000",
    items: [
      "Boxers & Singlet",
      "Miniature Spirits",
      "Card",
    ],
    silhouette: <BoxersSilhouette size={70} />,
  },
];

export const PackagesSection: FC = () => {
  const [activeTab, setActiveTab] = useState<"her" | "him">("her");

  const handleSelectPackage = (packageName: string) => {
    const message = encodeURIComponent(
      `Hello! I'm interested in the ${packageName} package from your Valentine collection.`
    );
    window.open(`https://wa.me/2347039178489?text=${message}`, "_blank");
  };

  const currentPackages = activeTab === "her" ? forHerPackages : forHimPackages;

  return (
    <section id="packages" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
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

        {/* Tab Navigation */}
        <div className="flex justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          <Button
            onClick={() => setActiveTab("her")}
            variant={activeTab === "her" ? "solid" : "outline"}
            size="lg"
            neon={activeTab === "her"}
            className="min-w-[120px] md:min-w-[140px]"
          >
            For Her
          </Button>
          <Button
            onClick={() => setActiveTab("him")}
            variant={activeTab === "him" ? "solid" : "outline"}
            size="lg"
            neon={activeTab === "him"}
            className="min-w-[120px] md:min-w-[140px]"
          >
            For Him
          </Button>
        </div>

        {/* Packages Grid - Responsive */}
        <div className={`grid gap-4 md:gap-6 lg:gap-8 ${
          currentPackages.length === 3 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {currentPackages.map((pkg, index) => (
            <div
              key={pkg.title}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <PackageCard
                title={pkg.title}
                price={pkg.price}
                items={pkg.items}
                silhouette={pkg.silhouette}
                onSelect={() => handleSelectPackage(pkg.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
