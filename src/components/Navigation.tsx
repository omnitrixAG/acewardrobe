import { FC, useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, Menu, X, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { SpadeIcon } from "./icons/SpadeIcon";
import { useCart } from "@/context/CartContext";

const scrollToSection = (sectionId: string, offset: number = 64) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const navLinks = [
  { label: "New In", href: "/shop?filter=new" },
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/shop?category=men", mega: true },
  { label: "Women", href: "/shop?category=women", mega: true },
  { label: "About", href: "#about" },
];

const megaMenuData: Record<string, {
  shopAll: { label: string; href: string }[];
  categories: { label: string; href: string }[];
  occasions: { label: string; href: string }[];
  image: string;
  imageLabel: string;
}> = {
  Men: {
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
  Women: {
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

const MegaDropdown: FC<{ menuKey: string; onNavigate: (href: string) => void }> = ({ menuKey, onNavigate }) => {
  const data = megaMenuData[menuKey];
  if (!data) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] max-w-[calc(100vw-40px)] bg-background border border-border rounded-b-lg shadow-lg p-8 grid grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-1 duration-200">
      {/* Column 1 */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop All</h3>
        <ul className="space-y-2.5">
          {data.shopAll.map((item) => (
            <li key={item.label}>
              <button onClick={() => onNavigate(item.href)} className="text-sm text-foreground hover:text-primary transition-colors">
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Column 2 */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop by Category</h3>
        <ul className="space-y-2.5">
          {data.categories.map((item) => (
            <li key={item.label}>
              <button onClick={() => onNavigate(item.href)} className="text-sm text-foreground hover:text-primary transition-colors">
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Column 3 */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Shop by Occasion</h3>
        <ul className="space-y-2.5">
          {data.occasions.map((item) => (
            <li key={item.label}>
              <button onClick={() => onNavigate(item.href)} className="text-sm text-foreground hover:text-primary transition-colors">
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Column 4 - Image */}
      <div className="relative rounded-lg overflow-hidden group cursor-pointer" onClick={() => onNavigate(data.shopAll[0].href)}>
        <img src={data.image} alt={data.imageLabel} className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-foreground/30 flex items-end p-4">
          <span className="text-background text-sm font-semibold uppercase tracking-wider">{data.imageLabel} →</span>
        </div>
      </div>
    </div>
  );
};

export const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setIsOpen(false);
  };

  const handleNavClick = (href: string) => {
    setActiveMega(null);
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-background border-b border-border transition-shadow duration-200 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-[1200px] w-full mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <SpadeIcon size={28} showLetters={false} />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              ACE WARDROBE
            </span>
          </a>

          {/* Center nav - desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.mega ? handleMegaEnter(link.label) : undefined}
                onMouseLeave={() => link.mega ? handleMegaLeave() : undefined}
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors py-5 ${
                    activeMega === link.label ? "text-primary" : "text-foreground hover:text-primary"
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

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* WhatsApp - desktop */}
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <MessageCircle size={18} />
              Chat
            </a>

            {/* Cart icon */}
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

            {/* Hamburger - mobile */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="h-16 flex items-center justify-between px-5">
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
              <SpadeIcon size={28} showLetters={false} />
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                ACE WARDROBE
              </span>
            </a>
            <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
              <X size={24} className="text-foreground" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pb-10 px-5">
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};
