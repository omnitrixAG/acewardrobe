import { FC, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import type { Product } from "@/types/database";
import { Minus, Plus, ArrowLeft } from "lucide-react";

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString("en-NG");

const ProductDetail: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug ?? "")
        .maybeSingle();
      const typedData = data as Product | null;
      setProduct(typedData);
      if (typedData) {
        if (typedData.sizes?.length) setSelectedSize(typedData.sizes[0]);
        if (typedData.colors?.length) setSelectedColor(typedData.colors[0]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
                <div className="h-20 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Product not found
            </h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stockLabel =
    product.stock === 0
      ? "Out of Stock"
      : product.stock < 5
        ? `Only ${product.stock} left`
        : "In Stock";

  const stockColor =
    product.stock === 0
      ? "text-destructive"
      : product.stock < 5
        ? "text-orange-500"
        : "text-green-500";

  const whatsappMessage = `Hi! I'd like to order ${product.name} (${formatPrice(product.price)})${selectedSize ? `, Size: ${selectedSize}` : ""}${selectedColor ? `, Color: ${selectedColor}` : ""}, Qty: ${quantity}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
          {/* Back link */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image */}
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
              <img
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.compare_at_price)}
                    </span>
                  )}
                </div>
                <p className={`text-sm font-medium mt-2 ${stockColor}`}>
                  {stockLabel}
                </p>
              </div>

              {product.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Size selector */}
              {product.sizes?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {product.colors?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Color: <span className="text-muted-foreground">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-foreground scale-110"
                            : "border-border hover:border-foreground/50"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
                <div className="inline-flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-muted/20 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-medium min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-3 hover:bg-muted/20 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <a
                href={`https://wa.me/2347039178489?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-3.5 rounded-lg text-base font-semibold transition-colors ${
                  product.stock === 0
                    ? "bg-muted text-muted-foreground pointer-events-none"
                    : ""
                }`}
                style={product.stock > 0 ? { backgroundColor: "#eab308", color: "#000" } : {}}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
