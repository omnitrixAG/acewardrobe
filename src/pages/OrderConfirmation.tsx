import { FC, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle, MessageCircle } from "lucide-react";
import type { Order, OrderItem } from "@/types/database";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const OrderConfirmation: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) { setLoading(false); return; }
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      setOrder(data as Order | null);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-[104px]">
          <div className="max-w-[600px] mx-auto px-5 md:px-10 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse mx-auto mb-6" />
            <div className="h-8 bg-muted rounded w-3/4 mx-auto animate-pulse mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-[104px]">
          <div className="max-w-[600px] mx-auto px-5 md:px-10 py-20 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">Order not found</h1>
            <p className="text-muted-foreground mb-6">We couldn't find this order. Please check your order ID.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:underline">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const items = (order.items ?? []) as OrderItem[];
  const whatsappMessage = `Hi! I'd like to track my order.\n\nOrder ID: ${order.id}\nName: ${order.customer_name}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-[104px]">
        <div className="max-w-[600px] mx-auto px-5 md:px-10 py-16 md:py-24">
          {/* Success header */}
          <div className="text-center mb-10">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Thank you for your order!
            </h1>
            <p className="text-muted-foreground">
              A confirmation has been sent to <span className="text-foreground font-medium">{order.customer_email}</span>
            </p>
          </div>

          {/* Order details card */}
          <div className="border border-border rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-sm font-semibold text-foreground">Order Details</h2>
              <span className="text-xs text-muted-foreground font-mono">
                {order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-5">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <div className="flex-1 min-w-0">
                    <span className="text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">
                      {item.size ? ` · ${item.size}` : ""}
                      {item.color ? ` · ${item.color}` : ""}
                      {" × "}{item.quantity}
                    </span>
                  </div>
                  <span className="text-foreground font-medium ml-4 whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {order.shipping_fee === 0 ? "Free" : formatPrice(order.shipping_fee)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                <span className="text-foreground">Total Paid</span>
                <span className="text-foreground">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="border border-border rounded-xl p-6 mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-3">Shipping To</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="text-foreground font-medium">{order.customer_name}</p>
              <p>{order.shipping_address}</p>
              <p>{order.city}, {order.state}</p>
              <p>{order.customer_phone}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="flex-1 text-center py-3.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: "#eab308", color: "#000" }}
            >
              Continue Shopping
            </Link>
            <a
              href={`https://wa.me/2347039178489?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3.5 rounded-lg text-sm font-semibold border border-border text-foreground hover:bg-muted/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Track Order
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
