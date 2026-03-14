import { FC } from "react";
import { Link } from "react-router-dom";

export const PromoBanner: FC = () => {
  return (
    <div className="w-full bg-promo h-10 flex items-center justify-center px-4 relative">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-white">
        🚚 Free Delivery on Orders Over ₦100,000
      </p>
      <Link
        to="/shop"
        className="absolute right-4 md:right-10 text-xs font-bold uppercase tracking-wider text-white hover:underline"
      >
        Shop Now
      </Link>
    </div>
  );
};
