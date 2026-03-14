import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Minus, Plus, Heart, CreditCard, Tag } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const FREE_SHIPPING_THRESHOLD = 100000;
const SHIPPING_FEE = 5000;

const Cart: FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, itemCount } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const handleMoveToWishlist = (productId: string, size: string, color: string) => {
    addToWishlist(productId);
    removeFromCart(productId, size, color);
  };

  const handleApplyPromo = () => {
    // Placeholder – no real promo logic
    setPromoApplied(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-[104px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shopping Bag</span>
          </nav>

          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wide mb-2">
            Shopping Bag
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {itemCount} item{itemCount !== 1 ? "s" : ""} in your bag
          </p>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">Your bag is empty</p>
              <p className="text-sm text-muted-foreground mb-6">
                Looks like you haven't added anything yet
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* LEFT – Cart items */}
              <div className="flex-1 lg:w-[60%] space-y-6">
                {items.map((item) => {
                  const key = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
                  return (
                    <div
                      key={key}
                      className="flex gap-4 md:gap-6 pb-6 border-b border-border last:border-b-0"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="w-28 md:w-36 aspect-[3/4] rounded-lg overflow-hidden bg-secondary flex-shrink-0"
                      >
                        <img
                          src={item.product.images?.[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="text-sm md:text-base font-medium text-foreground line-clamp-2 hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                            }
                            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                          {item.selectedSize && (
                            <span className="px-2 py-0.5 rounded-sm bg-muted/50">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="px-2 py-0.5 rounded-sm bg-muted/50">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>

                        <p className="text-base font-bold text-foreground mt-2">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3">
                          {/* Quantity */}
                          <div className="inline-flex items-center border border-border rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 hover:bg-muted/20 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-4 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 hover:bg-muted/20 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Move to wishlist */}
                          <button
                            onClick={() =>
                              handleMoveToWishlist(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Heart size={14} />
                            <span>Move to Wishlist</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT – Order summary */}
              <div className="lg:w-[40%] lg:max-w-[420px]">
                <div className="sticky top-[120px] rounded-xl border border-border bg-card p-6 space-y-5">
                  <h2 className="font-display text-lg font-bold text-foreground uppercase tracking-wide">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-foreground">
                        {shipping === 0 ? (
                          <span className="text-primary font-semibold">FREE</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[11px] text-muted-foreground">
                        Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                      </p>
                    )}
                    <div className="border-t border-border pt-3 flex items-center justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Promo code */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground uppercase tracking-wider">
                        Promo Code
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={!promoCode.trim()}
                        className="h-10 px-4 rounded-md bg-foreground text-background text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-muted-foreground">
                        Promo codes coming soon!
                      </p>
                    )}
                  </div>

                  {/* Checkout button */}
                  <button
                    onClick={() => navigate("/checkout")}
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
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
