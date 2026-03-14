import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { useWishlist } from "@/context/WishlistContext";
import { LayoutGrid, Grid3X3 } from "lucide-react";
import type { Product } from "@/types/database";

const Wishlist: FC = () => {
  const { items: wishlistIds, clearWishlist, itemCount } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState<3 | 4>(4);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("id", wishlistIds);
      const map = new Map((data as Product[] ?? []).map((p) => [p.id, p]));
      setProducts(wishlistIds.map((id) => map.get(id)).filter(Boolean) as Product[]);
      setLoading(false);
    };
    fetchProducts();
  }, [wishlistIds]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-[104px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Wishlist</span>
          </nav>

          {/* Title */}
          <div className="flex items-center gap-3 mb-1">
            <Heart size={28} className="text-destructive fill-destructive" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wide">
              My Wishlist
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {itemCount} item{itemCount !== 1 ? "s" : ""} saved
          </p>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Heart size={64} className="text-muted-foreground/40 mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground mb-6">
                Save items you love by clicking the heart icon
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
              <div className="flex items-center justify-end mb-6 gap-4">
                <button
                  onClick={clearWishlist}
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

export default Wishlist;
