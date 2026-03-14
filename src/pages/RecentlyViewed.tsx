import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { getRecentlyViewed, clearRecentlyViewed } from "@/lib/recently-viewed";
import { LayoutGrid, Grid3X3 } from "lucide-react";
import type { Product } from "@/types/database";

const RecentlyViewed: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState<3 | 4>(4);

  const fetchProducts = async () => {
    setLoading(true);
    const ids = getRecentlyViewed();
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("products")
      .select("*")
      .in("id", ids);
    // Preserve order from localStorage
    const map = new Map((data as Product[] ?? []).map((p) => [p.id, p]));
    setProducts(ids.map((id) => map.get(id)).filter(Boolean) as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClear = () => {
    clearRecentlyViewed();
    setProducts([]);
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
            <span className="text-foreground">Recently Viewed</span>
          </nav>

          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wide mb-6">
            Recently Viewed
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                You haven't viewed any products yet
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  {products.length} item{products.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleClear}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear all
                  </button>
                  <div className="hidden md:flex items-center gap-1 border border-border rounded-md overflow-hidden">
                    <button
                      onClick={() => setCols(3)}
                      className={`p-1.5 transition-colors ${cols === 3 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                      aria-label="3 columns"
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setCols(4)}
                      className={`p-1.5 transition-colors ${cols === 4 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                      aria-label="4 columns"
                    >
                      <LayoutGrid size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product grid */}
              <div className={`grid grid-cols-2 gap-4 md:gap-6 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecentlyViewed;
