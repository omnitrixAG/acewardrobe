import { FC, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { addRecentlyViewed } from "@/lib/recently-viewed";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/types/database";
import { Minus, Plus, ArrowLeft, Heart, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const colorMap: Record<string, string> = {
  navy: "#1e3a5f",
  black: "#000000",
  cream: "#fffdd0",
  beige: "#f5f5dc",
  white: "#ffffff",
  brown: "#8b4513",
  gray: "#808080",
  grey: "#808080",
  gold: "#ffd700",
  khaki: "#c3b091",
  red: "#dc2626",
  blue: "#2563eb",
  green: "#16a34a",
  pink: "#ec4899",
  orange: "#f97316",
  purple: "#7c3aed",
  yellow: "#eab308",
  maroon: "#800000",
  tan: "#d2b48c",
  charcoal: "#36454f",
};

const getColorHex = (name: string) => colorMap[name.toLowerCase()] || name;

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const getEstimatedDelivery = () => {
  const now = new Date();
  const from = new Date(now);
  from.setDate(from.getDate() + 5);
  const to = new Date(now);
  to.setDate(to.getDate() + 7);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${from.toLocaleDateString("en-NG", opts)} – ${to.toLocaleDateString("en-NG", opts)}`;
};

const ProductDetail: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const isMobile = useIsMobile();
  const galleryRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setActiveImageIdx(0);
      setQuantity(1);
      setWishlisted(false);
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
        // Fetch related
        if (typedData.category_id) {
          const { data: relData } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", typedData.category_id)
            .neq("id", typedData.id)
            .limit(6);
          setRelated((relData as Product[]) ?? []);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-[104px]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex gap-4">
                <div className="hidden md:flex flex-col gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-20 h-20 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
                <div className="flex-1 aspect-[3/4] rounded-lg bg-muted animate-pulse" />
              </div>
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

  const images = product.images?.length ? product.images : ["/placeholder.svg"];
  const hasSale = product.compare_at_price != null && product.compare_at_price > product.price;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart({ product, quantity, selectedSize, selectedColor });
  };

  const scrollGallery = (dir: number) => {
    const next = activeImageIdx + dir;
    if (next >= 0 && next < images.length) {
      setActiveImageIdx(next);
      if (galleryRef.current) {
        const child = galleryRef.current.children[next] as HTMLElement;
        child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-[104px]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-8 md:py-14">
          {/* Back link */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* IMAGE GALLERY */}
            {isMobile ? (
              /* Mobile: horizontal swipe */
              <div className="relative">
                <div
                  ref={galleryRef}
                  className="flex gap-2 overflow-x-auto snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none" }}
                >
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-full aspect-[3/4] rounded-lg overflow-hidden bg-secondary snap-center"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                        style={{ fontSize: 0, color: "transparent" }}
                      />
                    </div>
                  ))}
                </div>
                {images.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveImageIdx(i);
                          if (galleryRef.current) {
                            const child = galleryRef.current.children[i] as HTMLElement;
                            child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                          }
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${i === activeImageIdx ? "bg-foreground" : "bg-border"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Desktop: thumbnails + main */
              <div className="flex gap-4">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-col gap-3 flex-shrink-0">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          activeImageIdx === i ? "border-foreground" : "border-transparent hover:border-border"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                          style={{ fontSize: 0, color: "transparent" }}
                        />
                      </button>
                    ))}
                  </div>
                )}
                {/* Main image */}
                <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-secondary relative">
                  <img
                    src={images[activeImageIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                    style={{ fontSize: 0, color: "transparent" }}
                  />
                  {/* Prev / Next arrows */}
                  {images.length > 1 && (
                    <>
                      {activeImageIdx > 0 && (
                        <button
                          onClick={() => scrollGallery(-1)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5 text-foreground" />
                        </button>
                      )}
                      {activeImageIdx < images.length - 1 && (
                        <button
                          onClick={() => scrollGallery(1)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronRight className="h-5 w-5 text-foreground" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* DETAILS */}
            <div className="flex flex-col gap-5">
              {/* Name */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Price row */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
                {hasSale && (
                  <>
                    <span className="text-base text-muted-foreground line-through">
                      {formatPrice(product.compare_at_price!)}
                    </span>
                    <span className="text-xs text-muted-foreground">Comp. Value</span>
                  </>
                )}
              </div>

              {/* Promo */}
              <p className="text-xs font-medium text-primary bg-primary/10 rounded-md px-3 py-2">
                Free Delivery on Orders Over ₦100,000
              </p>

              {/* Size selector */}
              {product.sizes?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground">Size</p>
                    <button className="text-xs text-primary hover:underline font-medium">View Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
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
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => {
                      const hex = getColorHex(color);
                      const isLight = ["#ffffff", "#fffdd0", "#f5f5dc"].includes(hex.toLowerCase());
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-9 h-9 rounded-full transition-all ${
                            selectedColor === color
                              ? "ring-2 ring-offset-2 ring-foreground scale-110"
                              : "hover:scale-105"
                          } ${isLight ? "border border-border" : ""}`}
                          style={{ backgroundColor: hex }}
                          title={color}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Quantity</p>
                <div className="inline-flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Bag + Wishlist */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3.5 rounded-lg text-base font-semibold transition-colors ${
                    product.stock === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
                </button>
                <button
                  onClick={() => setWishlisted((p) => !p)}
                  className={`w-14 flex items-center justify-center rounded-lg border transition-colors ${
                    wishlisted ? "border-destructive" : "border-border hover:border-foreground"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      wishlisted ? "fill-destructive text-destructive" : "text-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Shipping info */}
              <div className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Estimated Delivery: {getEstimatedDelivery()}</p>
                    <p className="text-xs text-muted-foreground">Free shipping on orders over ₦100,000</p>
                  </div>
                </div>
              </div>

              {/* Product Details accordion */}
              <Accordion type="single" collapsible defaultValue="details">
                <AccordionItem value="details" className="border-border">
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description || "No description available."}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* YOU MIGHT ALSO LIKE */}
          {related.length > 0 && (
            <section className="mt-16 md:mt-20">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
                You Might Also Like
              </h2>
              <div
                className="flex gap-4 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "none" }}
              >
                {related.map((p) => (
                  <div key={p.id} className="flex-shrink-0 w-[200px] md:w-[240px]">
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
