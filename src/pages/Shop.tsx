import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/database";

const categories = ["All", "Men", "Women", "Couples", "Accessories"];

const formatPrice = (price: number) =>
  "₦" + price.toLocaleString("en-NG");

const Shop: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await supabase.from("products").select("*");
      setProducts(data ?? []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) =>
        p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (p.description?.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Shop All
          </h1>

          {/* Category filters */}
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] rounded-lg bg-muted" />
                  <div className="mt-3 h-4 bg-muted rounded w-3/4" />
                  <div className="mt-2 h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="group">
                  <Link to={`/product/${product.slug}`}>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="pt-3">
                    <Link to={`/product/${product.slug}`}>
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {product.name}
                      </p>
                    </Link>
                    <p className="text-base font-bold text-foreground mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <a
                      href={`https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(formatPrice(product.price))})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors"
                      style={{ backgroundColor: "#eab308", color: "#000" }}
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
