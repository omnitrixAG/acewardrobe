import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

export const CartDrawer: FC = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, clearCart, getCartTotal, itemCount } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = getCartTotal();

  // Build WhatsApp checkout message
  const checkoutMessage = items
    .map(
      (i) =>
        `• ${i.product.name}${i.selectedSize ? ` (${i.selectedSize})` : ""}${i.selectedColor ? ` [${i.selectedColor}]` : ""} x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`
    )
    .join("\n");
  const whatsappUrl = `https://wa.me/2347039178489?text=${encodeURIComponent(
    `Hi! I'd like to place an order:\n\n${checkoutMessage}\n\nSubtotal: ${formatPrice(subtotal)}`
  )}`;

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
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <span className="font-display text-lg font-bold">Cart ({itemCount})</span>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X size={22} className="text-foreground" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {items.map((item) => {
              const key = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
              return (
                <div key={key} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.product.images?.[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {item.product.name}
                    </p>
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-sm font-bold text-foreground mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>

                    {/* Quantity & Remove */}
                    <div className="flex items-center justify-between mt-2">
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
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3.5 rounded-lg text-base font-semibold"
              style={{ backgroundColor: "#eab308", color: "#000" }}
            >
              Checkout via WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};
