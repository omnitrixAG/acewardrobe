import { FC, ReactNode } from "react";

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
    <div className="card-package group p-6 md:p-8 relative">
      {/* Background Silhouette */}
      <div className="absolute top-4 right-4 text-chrome opacity-30 transition-opacity group-hover:opacity-50">
        {silhouette}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h4 className="font-display text-xl md:text-2xl text-primary font-semibold mb-2">
          {title}
        </h4>
        <p className="font-body text-2xl md:text-3xl font-bold text-foreground mb-6">
          {price}
        </p>

        <ul className="space-y-3 mb-8">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
              <span className="text-primary mt-0.5">♠</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className="w-full btn-primary rounded-lg text-sm"
        >
          Select Package
        </button>
      </div>
    </div>
  );
};
