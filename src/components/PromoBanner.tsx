import { FC } from "react";

export const PromoBanner: FC = () => {
  return (
    <div className="w-full bg-promo py-4">
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-white">
        🚚 Free Delivery on Orders Over ₦100,000 • Worldwide Shipping Available
      </p>
    </div>
  );
};
