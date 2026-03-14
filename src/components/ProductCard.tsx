import { FC } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/database";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const COLOR_HEX: Record<string, string> = {
  black: "#000000",
  navy: "#1e3a5f",
  white: "#ffffff",
  cream: "#fffdd0",
  brown: "#8b4513",
  gray: "#808080",
  grey: "#808080",
  gold: "#ffd700",
  beige: "#f5f5dc",
  khaki: "#c3b091",
  red: "#dc2626",
  blue: "#2563eb",
  green: "#16a34a",
};

const getColorHex = (name: string) => COLOR_HEX[name.toLowerCase()] || "#888888";

const QUICK_SIZES = ["S", "M", "L", "XL"];

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  const hasSale = product.compare_at_price != null && product.compare_at_price > product.price;
  const visibleColors = product.colors?.slice(0, 4) || [];
  const extraColors = (product.colors?.length || 0) - 4;

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedSize: size,
      selectedColor: product.colors?.[0] || "",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <div className="group">
      {/* Image container */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ fontSize: 0, color: "transparent" }}
          />
        </Link>

        {/* SALE badge */}
        {hasSale && (
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Sale
          </span>
        )}

        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${wishlisted ? "fill-destructive text-destructive" : "text-foreground"}`}
          />
        </button>

        {/* Quick-add overlay */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <div className="bg-foreground/85 backdrop-blur-sm px-3 py-3">
              <p className="text-background text-[11px] font-semibold uppercase tracking-wider text-center mb-2">
                Add to Bag
              </p>
              <div className="flex justify-center gap-1.5">
                {QUICK_SIZES.filter((s) => product.sizes?.includes(s)).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(e, size)}
                    className="min-w-[36px] h-8 px-2 rounded border border-background/30 text-background text-xs font-medium hover:bg-background hover:text-foreground transition-colors"
                  >
                    {size}
                  </button>
                ))}
                {product.sizes
                  .filter((s) => !QUICK_SIZES.includes(s))
                  .slice(0, 2)
                  .map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleQuickAdd(e, size)}
                      className="min-w-[36px] h-8 px-2 rounded border border-background/30 text-background text-xs font-medium hover:bg-background hover:text-foreground transition-colors"
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info below image */}
      <div className="pt-3 space-y-1">
        <Link to={`/product/${product.slug}`}>
          <p className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
            {product.name}
          </p>
        </Link>

        {/* Price row */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
          {hasSale && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
              <span className="text-[10px] text-muted-foreground">Comp. Value</span>
            </>
          )}
        </div>

        {/* Color swatches */}
        {visibleColors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {visibleColors.map((color) => {
              const hex = getColorHex(color);
              const isLight = ["white", "cream", "beige"].includes(color.toLowerCase());
              return (
                <span
                  key={color}
                  title={color}
                  className={`w-5 h-5 rounded-full ${isLight ? "border border-border" : ""}`}
                  style={{ backgroundColor: hex }}
                />
              );
            })}
            {extraColors > 0 && (
              <span className="text-[10px] text-muted-foreground font-medium">+{extraColors}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
