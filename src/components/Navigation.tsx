import { FC, useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, ShoppingBag, Search, Clock, User, Heart,
  LayoutDashboard, Package, FileEdit, Bell, Check, Camera,
} from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { SpadeIcon } from "./icons/SpadeIcon";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency, CURRENCIES, type CurrencyOption } from "@/context/CurrencyContext";

/* ─── helpers ─── */
const scrollToSection = (sectionId: string, offset: number = 104) => {
  const el = document.getElementById(sectionId);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

/* ─── nav data ─── */
const navLinks = [
  { label: "WOMEN", href: "/shop?category=women", mega: true },
  { label: "MEN", href: "/shop?category=men", mega: true },
  { label: "COUPLES", href: "/shop?category=couples" },
  { label: "NEW IN", href: "/shop?filter=new" },
  { label: "SALE", href: "/shop?filter=sale", sale: true },
];

const megaMenuData: Record<string, {
  shopAll: { label: string; href: string }[];
  categories: { label: string; href: string }[];
  occasions: { label: string; href: string }[];
  image: string;
  imageLabel: string;
}> = {
  MEN: {
    shopAll: [
      { label: "All Men's", href: "/shop?category=men" },
      { label: "New Arrivals", href: "/shop?category=men&filter=new" },
      { label: "Best Sellers", href: "/shop?category=men&filter=best-sellers" },
      { label: "Sale", href: "/shop?category=men&filter=sale" },
    ],
    categories: [
      { label: "Suits", href: "/shop?category=suits" },
      { label: "Agbada", href: "/shop?category=agbada" },
      { label: "Blazers", href: "/shop?category=blazers" },
      { label: "Shirts", href: "/shop?category=shirts" },
      { label: "Trousers", href: "/shop?category=trousers" },
      { label: "Accessories", href: "/shop?category=accessories" },
    ],
    occasions: [
      { label: "Wedding Guest", href: "/shop?occasion=wedding" },
      { label: "Business", href: "/shop?occasion=business" },
      { label: "Casual", href: "/shop?occasion=casual" },
      { label: "Traditional", href: "/shop?occasion=traditional" },
    ],
    image: "/images/category-mens.png",
    imageLabel: "Shop Men's",
  },
  WOMEN: {
    shopAll: [
      { label: "All Women's", href: "/shop?category=women" },
      { label: "New Arrivals", href: "/shop?category=women&filter=new" },
      { label: "Best Sellers", href: "/shop?category=women&filter=best-sellers" },
      { label: "Sale", href: "/shop?category=women&filter=sale" },
    ],
    categories: [
      { label: "Dresses", href: "/shop?category=dresses" },
      { label: "Tops", href: "/shop?category=tops" },
      { label: "Skirts", href: "/shop?category=skirts" },
      { label: "Jumpsuits", href: "/shop?category=jumpsuits" },
      { label: "Co-ords", href: "/shop?category=co-ords" },
      { label: "Accessories", href: "/shop?category=accessories" },
    ],
    occasions: [
      { label: "Wedding Guest", href: "/shop?occasion=wedding" },
      { label: "Business", href: "/shop?occasion=business" },
      { label: "Casual", href: "/shop?occasion=casual" },
      { label: "Traditional", href: "/shop?occasion=traditional" },
    ],
    image: "/images/category-womens.png",
    imageLabel: "Shop Women's",
  },
};

/* ─── Mega Dropdown ─── */
const MegaDropdown: FC<{ menuKey: string; onNavigate: (href: string) => void }> = ({ menuKey, onNavigate }) => {
  const data = megaMenuData[menuKey];
  if (!data) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] max-w-[calc(100vw-40px)] bg-background border border-border shadow-lg p-8 grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop All</h3>
        <ul className="space-y-2.5">
          {data.shopAll.map((item) => (
            <li key={item.label}>
              <button onClick={() => onNavigate(item.href)} className="text-sm text-foreground hover:text-primary transition-colors">{item.label}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop by Category</h3>
        <ul className="space-y-2.5">
          {data.categories.map((item) => (
            <li key={item.label}>
              <button onClick={() => onNavigate(item.href)} className="text-sm text-foreground hover:text-primary transition-colors">{item.label}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop by Occasion</h3>
        <ul className="space-y-2.5">
          {data.occasions.map((item) => (
            <li key={item.label}>
              <button onClick={() => onNavigate(item.href)} className="text-sm text-foreground hover:text-primary transition-colors">{item.label}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative rounded-lg overflow-hidden group cursor-pointer" onClick={() => onNavigate(data.shopAll[0].href)}>
        <img src={data.image} alt={data.imageLabel} className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-foreground/30 flex items-end p-4">
          <span className="text-background text-sm font-semibold uppercase tracking-wider">{data.imageLabel} →</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Currency Modal ─── */
const CurrencyModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { currency, setCurrency } = useCurrency();
  const [search, setSearch] = useState("");

  if (!open) return null;

  const filtered = CURRENCIES.filter(
    (c) =>
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (c: CurrencyOption) => {
    setCurrency(c);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Blue header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider">Your Currency and Region</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X size={20} /></button>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Select Region / Currency</p>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
          />
          <div className="space-y-1 max-h-[280px] overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelect(c)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                  currency.code === c.code ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1 text-left text-foreground font-medium">
                  {c.flag} - {c.country}
                  {c.recommended && <span className="text-xs text-muted-foreground ml-1">(Recommended)</span>}
                </span>
                <span className="text-muted-foreground text-sm">{c.code} {c.symbol}</span>
                {currency.code === c.code && <Check size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Profile Dropdown ─── */
const ProfileDropdown: FC<{ open: boolean; onClose: () => void; onNavigate: (href: string) => void }> = ({ open, onClose, onNavigate }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Orders", icon: Package, href: "/orders" },
    { label: "My Info", icon: FileEdit, href: "/account" },
    { label: "Notifications", icon: Bell, href: "/notifications" },
    { label: "Wishlist", icon: Heart, href: "/wishlist" },
  ];

  return (
    <div ref={ref} className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
      <div className="p-4 space-y-2">
        <button
          onClick={() => onNavigate("/signin")}
          className="w-full py-2 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => onNavigate("/signup")}
          className="w-full py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-colors"
        >
          Sign Up
        </button>
      </div>
      <div className="border-t border-border" />
      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => { onNavigate(item.href); onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
          >
            <item.icon size={16} className="text-muted-foreground" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════ */
/* ─── MAIN NAVIGATION ─── */
/* ═══════════════════════════════════════════ */
export const Navigation: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleMegaEnter = useCallback((label: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    megaTimeout.current = setTimeout(() => setActiveMega(label), 150);
  }, []);

  const handleMegaLeave = useCallback(() => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
    setMobileOpen(false);
  };

  const handleNavClick = (href: string) => {
    setActiveMega(null);
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection(id), 100);
      } else scrollToSection(id);
    } else navigate(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* ─── PROMO BANNER ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-center px-5" style={{ backgroundColor: "#eab308" }}>
        <p className="text-sm font-semibold text-foreground text-center flex-1">
          🚚 FREE DELIVERY ON ORDERS OVER ₦100,000
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="hidden sm:block text-xs font-bold uppercase tracking-wider text-foreground hover:underline ml-4 whitespace-nowrap"
        >
          Shop Now
        </button>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header
        className={`fixed top-10 left-0 right-0 z-50 h-16 flex items-center bg-background border-b border-border transition-shadow duration-200 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-8 flex items-center justify-between gap-4">
          {/* Mobile: hamburger */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(true)} aria-label="Open Menu">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 flex-shrink-0">
            <SpadeIcon size={28} showLetters={false} />
            <span className="font-display text-lg font-bold tracking-tight text-foreground hidden sm:inline">
              ACE WARDROBE
            </span>
          </a>

          {/* Center nav – desktop */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.mega ? handleMegaEnter(link.label) : undefined}
                onMouseLeave={() => link.mega ? handleMegaLeave() : undefined}
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors py-5 ${
                    link.sale
                      ? "text-destructive hover:text-destructive/80"
                      : activeMega === link.label
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
                {link.mega && activeMega === link.label && (
                  <MegaDropdown menuKey={link.label} onNavigate={handleNavClick} />
                )}
              </div>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Search – desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <div className="flex items-center border border-border rounded-md overflow-hidden w-[280px] h-9 bg-muted/30">
                <Search size={16} className="ml-3 text-muted-foreground flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-2 py-1.5 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button type="button" className="pr-3 text-muted-foreground hover:text-foreground">
                  <Camera size={16} />
                </button>
              </div>
            </form>

            {/* Search – mobile */}
            <button className="md:hidden text-foreground" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <Search size={22} />
            </button>

            {/* Currency */}
            <button
              onClick={() => setCurrencyModal(true)}
              className="hidden md:flex text-xs font-bold text-foreground hover:text-primary transition-colors"
            >
              {currency.flag}
            </button>

            {/* Recently Viewed */}
            <button
              onClick={() => navigate("/recently-viewed")}
              className="hidden md:flex text-foreground hover:text-primary transition-colors"
              aria-label="Recently Viewed"
            >
              <Clock size={22} />
            </button>

            {/* Profile */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="text-foreground hover:text-primary transition-colors"
                aria-label="Profile"
              >
                <User size={22} />
              </button>
              <ProfileDropdown open={profileOpen} onClose={() => setProfileOpen(false)} onNavigate={handleNavClick} />
            </div>

            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative text-foreground hover:text-primary transition-colors hidden md:flex"
              aria-label="Wishlist"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-foreground hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile search bar ─── */}
      {searchOpen && (
        <div className="fixed top-[104px] left-0 right-0 z-[55] bg-background border-b border-border px-5 py-3 md:hidden animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="flex items-center border border-border rounded-md overflow-hidden h-10 bg-muted/30">
            <Search size={16} className="ml-3 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-2 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* ─── Currency Modal ─── */}
      <CurrencyModal open={currencyModal} onClose={() => setCurrencyModal(false)} />

      {/* ─── Mobile overlay ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="h-16 flex items-center justify-between px-5">
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
              <SpadeIcon size={28} showLetters={false} />
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                ACE WARDROBE
              </span>
            </a>
            <button onClick={() => setMobileOpen(false)} aria-label="Close Menu">
              <X size={24} className="text-foreground" />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-4 gap-1 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`text-left text-lg font-semibold py-3 border-b border-border transition-colors ${
                  link.sale ? "text-destructive" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="mt-6 space-y-3">
              <button onClick={() => { handleNavClick("/recently-viewed"); }} className="flex items-center gap-3 text-sm text-foreground py-2">
                <Clock size={18} className="text-muted-foreground" /> Recently Viewed
              </button>
              <button onClick={() => { handleNavClick("/wishlist"); }} className="flex items-center gap-3 text-sm text-foreground py-2">
                <Heart size={18} className="text-muted-foreground" /> Wishlist {wishlistCount > 0 && <span className="text-xs text-muted-foreground">({wishlistCount})</span>}
              </button>
              <button onClick={() => { handleNavClick("/dashboard"); }} className="flex items-center gap-3 text-sm text-foreground py-2">
                <User size={18} className="text-muted-foreground" /> My Account
              </button>
              <button onClick={() => { setCurrencyModal(true); setMobileOpen(false); }} className="flex items-center gap-3 text-sm text-foreground py-2">
                <span className="text-base">{currency.flag}</span> {currency.code} ({currency.symbol})
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
