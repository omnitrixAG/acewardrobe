import { FC, useState } from "react";
import { PackageCard } from "./PackageCard";
import {
  DressSilhouette,
  LingerieSilhouette,
  SuitSilhouette,
  ShirtSilhouette,
  BoxersSilhouette,
} from "./icons/SilhouetteIcons";

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

  return (
    <section id="packages" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            The Valentine Essentials
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-2">
            Curated Packages by Ace Wardrobe × Peaches by Ema
          </p>
          <p className="font-display italic text-chrome text-lg">
            "Thoughtfully styled gifts for every kind of love"
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("her")}
            className={`px-8 py-3 rounded-full font-body text-sm tracking-wider uppercase transition-all ${
              activeTab === "her"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            For Her
          </button>
          <button
            onClick={() => setActiveTab("him")}
            className={`px-8 py-3 rounded-full font-body text-sm tracking-wider uppercase transition-all ${
              activeTab === "him"
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            For Him
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {(activeTab === "her" ? forHerPackages : forHimPackages).map(
            (pkg, index) => (
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
            )
          )}
        </div>
      </div>
    </section>
  );
};
