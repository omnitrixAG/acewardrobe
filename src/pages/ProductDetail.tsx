import { FC, useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/database";
import { Minus, Plus, ArrowLeft, Heart, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const colorMap: Record<string, string> = {
  navy: "#1e3a5f", black: "#000000", cream: "#fffdd0", beige: "#f5f5dc",
  white: "#ffffff", brown: "#8b4513", gray: "#808080", grey: "#808080",
  gold: "#ffd700", khaki: "#c3b091", red: "#dc2626", blue: "#2563eb",
  green: "#16a34a", pink: "#ec4899", orange: "#f97316", purple: "#7c3aed",
  yellow: "#eab308", maroon: "#800000", tan: "#d2b48c", charcoal: "#36454f",
};

const getColorHex = (name: string) => colorMap[name.toLowerCase()] || name;
const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");
const FREE_SHIPPING_THRESHOLD = 100000;

const getEstimatedDelivery = () => {
  const start = new Date();
  start.setDate(start.getDate() + 5);
  const end = new Date();
  end.setDate(end.getDate() + 7);
  const fmt = (d: Date) => d.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
  return `${fmt(start)} – ${fmt(end)}`;
};

const ProductDetail: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug ?? "")
        .maybeSingle();
      const p = data as Product | null;
      setProduct(p);
      if (p) {
        if (p.sizes?.length) setSelectedSize(p.sizes[0]);
        if (p.colors?.length) setSelectedColor(p.colors[0]);
        setMainImage(0);
        setQuantity(1);
        setWishlisted(false);
        setDetailsOpen(false);

        // fetch related
        if (p.category_id) {
          const { data: rel } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", p.category_id)
            .neq("id", p.id)
            .limit(6);
          setRelated((rel as Product[]) || []);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  const images = product?.images?.length ? product.images : ["/placeholder.svg"];
  const hasSale = product?.compare_at_price != null && product.compare_at_price > (product?.price ?? 0);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addToCart({ product, quantity, selectedSize, selectedColor });
    toast({ title: "Added to bag", description: `${product.name} × ${quantity}` });
  };

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left" && mainImage < images.length - 1) setMainImage((i) => i + 1);
    if (dir === "right" && mainImage > 0) setMainImage((i) => i - 1);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
          <main className="pt-[104px]">
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
          <main className="pt-[104px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isLightColor = (c: string) => ["white", "cream", "beige"].includes(c.toLowerCase());

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-[104px]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-8 md:py-14">
          {/* Back */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* ===== IMAGE GALLERY ===== */}
            <div className="flex gap-4">
              {/* Thumbnails – desktop only */}
              <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      mainImage === i ? "border-foreground" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div
                className="flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-secondary relative"
                onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchStart === null) return;
                  const diff = e.changedTouches[0].clientX - touchStart;
                  if (Math.abs(diff) > 50) handleSwipe(diff < 0 ? "left" : "right");
                  setTouchStart(null);
                }}
              >
                <img
                  src={images[mainImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                {/* Mobile dots */}
                {images.length > 1 && (
                  <div className="md:hidden absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setMainImage(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${mainImage === i ? "bg-foreground" : "bg-foreground/30"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ===== PRODUCT DETAILS ===== */}
            <div className="flex flex-col gap-5">
              {/* Name */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {hasSale && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compare_at_price!)}</span>
                    <span className="text-xs text-muted-foreground">Comp. Value</span>
                  </>
                )}
              </div>

              {/* Free delivery promo */}
              {product.price >= FREE_SHIPPING_THRESHOLD && (
                <p className="text-sm text-green-600 font-medium">🎉 Free Delivery on This Order</p>
              )}

              {/* Size */}
              {product.sizes?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-foreground">Size</p>
                    <button className="text-xs text-primary hover:underline">View Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[44px] px-4 py-2.5 rounded-md text-sm font-medium border transition-all ${
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

              {/* Color */}
              {product.colors?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    Color: <span className="text-muted-foreground capitalize">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full transition-all ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-foreground scale-110"
                            : "hover:scale-105"
                        } ${isLightColor(color) ? "border border-border" : ""}`}
                        style={{ backgroundColor: getColorHex(color) }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
                <div className="inline-flex items-center border border-border rounded-md">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 hover:bg-muted/50 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-semibold min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="p-3 hover:bg-muted/50 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Bag + Wishlist */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3.5 rounded-md text-base font-semibold transition-colors ${
                    product.stock === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
                </button>
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className={`w-14 flex items-center justify-center rounded-md border transition-colors ${
                    wishlisted ? "border-destructive bg-destructive/5" : "border-border hover:border-foreground"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? "fill-destructive text-destructive" : "text-foreground"}`} />
                </button>
              </div>

              {/* Stock */}
              {product.stock > 0 && product.stock < 5 && (
                <p className="text-sm font-medium text-orange-500">Only {product.stock} left in stock</p>
              )}

              {/* Shipping info */}
              <div className="border border-border rounded-lg p-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-foreground">
                  <Truck className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>Estimated Delivery: <span className="font-medium">{getEstimatedDelivery()}</span></span>
                </div>
                <p className="text-xs text-muted-foreground pl-[26px]">
                  Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                </p>
              </div>

              {/* Product Details accordion */}
              {product.description && (
                <div className="border-t border-border pt-4">
                  <button
                    onClick={() => setDetailsOpen((d) => !d)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-foreground py-2"
                  >
                    Product Details
                    {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {detailsOpen && (
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2 pb-1">
                      {product.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ===== YOU MIGHT ALSO LIKE ===== */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-24">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
                You Might Also Like
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
                {related.map((p) => (
                  <div key={p.id} className="min-w-[200px] w-[200px] md:min-w-[220px] md:w-[220px] flex-shrink-0 snap-start">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
