import { FC } from "react";

export const PromoBanner: FC = () => {
  return (
    <div className="w-full bg-accent py-4">
      <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-accent-foreground">
        🚚 Free Delivery on Orders Over ₦100,000 • Worldwide Shipping Available
      </p>
    </div>
  );
};
