import { FC } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const OrderConfirmation: FC = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-[600px] mx-auto px-5 md:px-10 py-16 md:py-24 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Order Placed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We'll send a confirmation to your email shortly.
          </p>

          {order && (
            <div className="border border-border rounded-xl p-6 text-left mb-8">
              <h2 className="text-sm font-semibold text-foreground mb-4">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">{order.customer_email}</span>
                </div>
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
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          )}

          <Link
            to="/shop"
            className="inline-block px-8 py-3 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#eab308", color: "#000" }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
