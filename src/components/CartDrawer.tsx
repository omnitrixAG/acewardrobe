import { FC, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import type { Product } from "@/types/database";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

export const CartDrawer: FC = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, getCartTotal, itemCount } = useCart();
  const { user, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen && items.length === 0) {
      const ids = getRecentlyViewed().slice(0, 3);
      if (ids.length > 0) {
        supabase
          .from("products")
          .select("*")
          .in("id", ids)
          .then(({ data }) => {
            if (data) {
              const map = new Map((data as Product[]).map((p) => [p.id, p]));
              setRecentProducts(ids.map((id) => map.get(id)).filter(Boolean) as Product[]);
            }
          });
      }
    }
  }, [isOpen, items.length]);

  if (!isOpen) return null;

  const subtotal = getCartTotal();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-background border-l border-border shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border">
          <span className="font-display text-lg font-bold uppercase tracking-wide">
            My Bag {itemCount > 0 && `(${itemCount})`}
          </span>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X size={22} className="text-foreground" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <ShoppingBag size={56} strokeWidth={1} className="text-muted-foreground/40 mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Your Bag Is Empty</p>
              {!user && (
                <p className="text-sm text-muted-foreground mb-6">
                  Have an account?{" "}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowAuthModal(true);
                    }}
                    className="text-primary underline underline-offset-2 font-medium"
                  >
                    Sign in
                  </button>{" "}
                  to view your bag
                </p>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/shop");
                }}
                className="w-full max-w-[280px] h-12 rounded-full bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity mb-3"
              >
                Start Shopping
              </button>
              {!user && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full max-w-[280px] h-12 rounded-full border border-foreground text-foreground text-sm font-semibold uppercase tracking-wider hover:bg-muted/20 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Recently Viewed */}
              {recentProducts.length > 0 && (
                <div className="w-full mt-8 pt-6 border-t border-border text-left">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Recently Viewed
                  </p>
                  <div className="space-y-3">
                    {recentProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex gap-3 group/rv"
                      >
                        <div className="w-14 h-[72px] rounded-md overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={p.images?.[0] || "/placeholder.svg"}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1 group-hover/rv:underline">
                            {p.name}
                          </p>
                          <p className="text-sm font-bold text-foreground mt-0.5">
                            {formatPrice(p.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Filled cart */
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {items.map((item) => {
              const key = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
              return (
                <div key={key} className="flex gap-4">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.product.images?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {item.product.name}
                      </p>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-sm font-bold text-foreground mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="inline-flex items-center border border-border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-muted/20 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-muted/20 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer - only when has items */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">{formatPrice(subtotal)}</span>
            </div>

            {/* View Bag */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/cart");
              }}
              className="w-full h-12 rounded-full border border-foreground text-foreground text-sm font-semibold uppercase tracking-wider hover:bg-muted/20 transition-colors"
            >
              View Bag
            </button>

            {/* Checkout */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/checkout");
              }}
              className="w-full h-12 rounded-full bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Checkout
            </button>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                Paystack
              </span>
              <div className="flex items-center gap-1.5">
                <CreditCard size={18} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Visa</span>
                <span className="text-[10px] text-muted-foreground">•</span>
                <span className="text-[10px] text-muted-foreground">Mastercard</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Express payment options at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
};
