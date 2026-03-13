import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import type { OrderItem } from "@/types/database";

const SHIPPING_FEE = 5000;
const FREE_SHIPPING_THRESHOLD = 100000;

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const nigerianStates = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

const checkoutSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Phone number is required").max(20),
  address: z.string().trim().min(1, "Shipping address is required").max(500),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().min(1, "Please select a state"),
});

type FormData = z.infer<typeof checkoutSchema>;

const Checkout: FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", phone: "", address: "", city: "", state: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (items.length === 0) return;

    setSubmitting(true);

    try {
      const orderItems: OrderItem[] = items.map((i) => ({
        product_id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        size: i.selectedSize || undefined,
        color: i.selectedColor || undefined,
      }));

      const { data: order, error } = await supabase.from("orders").insert({
        customer_name: result.data.fullName,
        customer_email: result.data.email,
        customer_phone: result.data.phone,
        shipping_address: result.data.address,
        city: result.data.city,
        state: result.data.state,
        items: orderItems,
        subtotal,
        shipping_fee: shippingFee,
        total,
        payment_status: "pending" as const,
        order_status: "pending" as const,
        payment_reference: null,
      }).select().maybeSingle();

      if (error) throw error;

      clearCart();
      navigate("/order-confirmation", { state: { order } });
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items before checking out.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-[1fr_400px] gap-10 md:gap-14">
            {/* Shipping Form */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Shipping Information</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="John Doe"
                  className={inputClass("fullName")}
                  maxLength={100}
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john@example.com"
                    className={inputClass("email")}
                    maxLength={255}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="08012345678"
                    className={inputClass("phone")}
                    maxLength={20}
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Shipping Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="123 Main Street, Lekki"
                  className={inputClass("address")}
                  maxLength={500}
                />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">City *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Lagos"
                    className={inputClass("city")}
                    maxLength={100}
                  />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">State *</label>
                  <select
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className={inputClass("state")}
                  >
                    <option value="">Select state</option>
                    {nigerianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-5">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <div className="w-14 h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={item.product.images?.[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize && `${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && " · "}
                          {item.selectedColor && `${item.selectedColor}`}
                          {" × "}{item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {shippingFee === 0 && (
                    <p className="text-xs text-green-500">🎉 Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
                  )}
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full py-3.5 rounded-lg text-base font-semibold transition-colors disabled:opacity-60"
                  style={{ backgroundColor: "#eab308", color: "#000" }}
                >
                  {submitting ? "Processing..." : "Place Order"}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Paystack payment will be integrated soon.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
