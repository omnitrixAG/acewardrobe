import { FC, useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product, Category } from "@/types/database";

const formatPrice = (price: number) => "₦" + price.toLocaleString("en-NG");

const COLOR_OPTIONS = [
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1e3a5f" },
  { name: "White", hex: "#ffffff" },
  { name: "Cream", hex: "#fffdd0" },
  { name: "Brown", hex: "#8b4513" },
  { name: "Gray", hex: "#808080" },
  { name: "Gold", hex: "#ffd700" },
  { name: "Beige", hex: "#f5f5dc" },
];

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];
const STYLE_OPTIONS = ["Casual", "Formal", "Streetwear", "Traditional", "Smart Casual"];
const OCCASION_OPTIONS = ["Wedding", "Party", "Work", "Everyday", "Date Night"];

// --- Filter Sidebar Content ---
const FilterContent: FC<{
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedSizes: string[];
  toggleSize: (s: string) => void;
  selectedColors: string[];
  toggleColor: (c: string) => void;
  selectedStyles: string[];
  toggleStyle: (s: string) => void;
  selectedOccasions: string[];
  toggleOccasion: (o: string) => void;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  showMoreSizes: boolean;
  setShowMoreSizes: (v: boolean) => void;
}> = ({
  searchQuery, setSearchQuery,
  selectedSizes, toggleSize,
  selectedColors, toggleColor,
  selectedStyles, toggleStyle,
  selectedOccasions, toggleOccasion,
  hasActiveFilters, clearAllFilters,
  showMoreSizes, setShowMoreSizes,
}) => (
  <div className="space-y-6">
    {/* Clear All */}
    {hasActiveFilters && (
      <button
        onClick={clearAllFilters}
        className="text-sm font-medium text-destructive hover:underline"
      >
        Clear All Filters
      </button>
    )}

    {/* Search */}
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
        Search
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>
    </div>

    {/* Size */}
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
        Size
      </label>
      <div className="flex flex-wrap gap-2">
        {(showMoreSizes ? SIZE_OPTIONS : SIZE_OPTIONS.slice(0, 4)).map((size) => (
          <button
            key={size}
            onClick={() => toggleSize(size)}
            className={`px-4 py-1.5 rounded border text-xs font-medium transition-colors ${
              selectedSizes.includes(size)
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      {!showMoreSizes && SIZE_OPTIONS.length > 4 && (
        <button
          onClick={() => setShowMoreSizes(true)}
          className="text-xs font-semibold uppercase tracking-wider text-primary mt-2 hover:underline"
        >
          View More
        </button>
      )}
    </div>

    {/* Colors */}
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
        Color
      </label>
      <div className="grid grid-cols-4 gap-3">
        {COLOR_OPTIONS.map((color) => {
          const isSelected = selectedColors.includes(color.name);
          const isLight = ["White", "Cream", "Beige"].includes(color.name);
          return (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className="flex flex-col items-center gap-1 group"
              title={color.name}
            >
              <span
                className={`w-8 h-8 rounded-full transition-all ${
                  isSelected ? "ring-2 ring-offset-2 ring-foreground scale-110" : "hover:scale-105"
                } ${isLight ? "border border-border" : ""}`}
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[10px] text-muted-foreground">{color.name}</span>
            </button>
          );
        })}
      </div>
    </div>

    {/* Style */}
    <Accordion type="single" collapsible>
      <AccordionItem value="style" className="border-border">
        <AccordionTrigger className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 hover:no-underline">
          Style
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {STYLE_OPTIONS.map((style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                  selectedStyles.includes(style)
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    {/* Occasion */}
    <Accordion type="single" collapsible>
      <AccordionItem value="occasion" className="border-border">
        <AccordionTrigger className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 hover:no-underline">
          Occasion
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {OCCASION_OPTIONS.map((occasion) => (
              <button
                key={occasion}
                onClick={() => toggleOccasion(occasion)}
                className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                  selectedOccasions.includes(occasion)
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

// --- Main Component ---
const Shop: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  
  const isMobile = useIsMobile();

  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");
  const [activeSlug, setActiveSlug] = useState(categoryParam?.toLowerCase() || "all");

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [showMoreSizes, setShowMoreSizes] = useState(false);

  // Sort & grid
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState(4);

  // Mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setActiveSlug(categoryParam.toLowerCase());
    else setActiveSlug("all");
  }, [categoryParam, filterParam]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("categories").select("*"),
      ]);
      setProducts(prodRes.data ?? []);
      setCategories(catRes.data ?? []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const categoryIdBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));
  const activeCategory = categories.find((c) => c.slug === activeSlug);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const toggleSize = (s: string) => setSelectedSizes((p) => toggleArray(p, s));
  const toggleColor = (c: string) => setSelectedColors((p) => toggleArray(p, c));
  const toggleStyle = (s: string) => setSelectedStyles((p) => toggleArray(p, s));
  const toggleOccasion = (o: string) => setSelectedOccasions((p) => toggleArray(p, o));

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedStyles.length > 0 ||
    selectedOccasions.length > 0;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedStyles([]);
    setSelectedOccasions([]);
  };

  // Filtering & sorting
  const filtered = useMemo(() => {
    let result =
      filterParam === "new"
        ? products.filter((p) => p.is_new)
        : activeSlug === "all"
          ? products
          : products.filter((p) => p.category_id === categoryIdBySlug[activeSlug]);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((c) => selectedColors.some((sc) => c.toLowerCase() === sc.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [products, filterParam, activeSlug, categoryIdBySlug, searchQuery, selectedSizes, selectedColors, sortBy]);

  // Category filter tabs
  const filterTabs = [
    { label: "All", slug: "all" },
    ...categories.map((c) => ({ label: c.name, slug: c.slug })),
  ];

  const filterProps = {
    searchQuery, setSearchQuery,
    selectedSizes, toggleSize,
    selectedColors, toggleColor,
    selectedStyles, toggleStyle,
    selectedOccasions, toggleOccasion,
    hasActiveFilters, clearAllFilters,
    showMoreSizes, setShowMoreSizes,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {activeCategory ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/shop">Shop</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeCategory.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>Shop All</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            {activeCategory?.name || "Shop All"}
          </h1>

          {/* Category tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {filterTabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveSlug(tab.slug)}
                className={`flex-shrink-0 px-5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeSlug === tab.slug
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <aside className="w-[240px] flex-shrink-0">
                <FilterContent {...filterProps} />
              </aside>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {isMobile && (
                    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                      <SheetTrigger asChild>
                        <button className="flex items-center gap-1.5 text-sm font-medium text-foreground border border-border rounded-lg px-3 py-1.5">
                          <SlidersHorizontal className="h-4 w-4" />
                          Filters
                          {hasActiveFilters && (
                            <span className="ml-1 w-5 h-5 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center">
                              {selectedSizes.length + selectedColors.length + selectedStyles.length + selectedOccasions.length}
                            </span>
                          )}
                        </button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterContent {...filterProps} />
                        </div>
                      </SheetContent>
                    </Sheet>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {filtered.length} product{filtered.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-9 text-xs font-semibold uppercase tracking-wider">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>

                  {!isMobile && (
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setGridCols(3)}
                        className={`p-1.5 transition-colors ${gridCols === 3 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                        title="3 columns"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setGridCols(4)}
                        className={`p-1.5 transition-colors ${gridCols === 4 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                        title="4 columns"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Active filter pills */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSizes.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 text-xs bg-secondary text-foreground rounded-full px-3 py-1">
                      Size: {s}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleSize(s)} />
                    </span>
                  ))}
                  {selectedColors.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 text-xs bg-secondary text-foreground rounded-full px-3 py-1">
                      {c}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleColor(c)} />
                    </span>
                  ))}
                  {selectedStyles.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 text-xs bg-secondary text-foreground rounded-full px-3 py-1">
                      {s}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleStyle(s)} />
                    </span>
                  ))}
                  {selectedOccasions.map((o) => (
                    <span key={o} className="inline-flex items-center gap-1 text-xs bg-secondary text-foreground rounded-full px-3 py-1">
                      {o}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleOccasion(o)} />
                    </span>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              {loading ? (
                <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : gridCols === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] rounded-lg bg-muted" />
                      <div className="mt-3 h-4 bg-muted rounded w-3/4" />
                      <div className="mt-2 h-4 bg-muted rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-20">No products found.</p>
              ) : (
                <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : gridCols === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
