import { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface PackageCardProps {
  title: string;
  price: string;
  items: string[];
  silhouette: ReactNode;
  onSelect?: () => void;
}

export const PackageCard: FC<PackageCardProps> = ({
  title,
  price,
  items,
  silhouette,
  onSelect,
}) => {
  return (
    <div className="card-package group p-5 md:p-6 lg:p-8 relative h-full flex flex-col">
      {/* Background Silhouette - More visible and animated */}
      <div className="absolute top-4 right-4 text-primary/20 transition-all duration-500 group-hover:text-primary/40 group-hover:scale-110 group-hover:rotate-3">
        {silhouette}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <h4 className="font-display text-lg sm:text-xl md:text-2xl text-primary font-semibold mb-2">
          {title}
        </h4>
        <p className="font-body text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">
          {price}
        </p>

        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">
              <span className="text-primary mt-0.5 text-sm">♠</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onSelect}
          variant="solid"
          size="default"
          className="w-full"
        >
          Select Package
        </Button>
      </div>
    </div>
  );
};
