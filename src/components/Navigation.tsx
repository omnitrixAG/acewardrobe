import { FC, useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
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

interface MegaMenuColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const getMegaData = (gender: "men" | "women"): { columns: MegaMenuColumn[]; image: string; imageLabel: string } => {
  const prefix = gender === "men" ? "men" : "women";
  return {
    columns: [
      {
        heading: "Shop All",
        links: [
          { label: `All ${gender === "men" ? "Men's" : "Women's"}`, href: `/shop?category=${prefix}` },
          { label: "New Arrivals", href: "/shop?filter=new" },
          { label: "Best Sellers", href: `/shop?category=${prefix}` },
          { label: "Sale", href: `/shop?category=sale` },
        ],
      },
      {
        heading: "Shop by Category",
        links: [
          { label: "Suits", href: "/shop?category=suits" },
          { label: "Agbada", href: "/shop?category=agbada" },
          { label: "Blazers", href: "/shop?category=blazers" },
          { label: "Shirts", href: "/shop?category=shirts" },
          { label: "Trousers", href: "/shop?category=trousers" },
          { label: "Accessories", href: "/shop?category=accessories" },
        ],
      },
      {
        heading: "Shop by Occasion",
        links: [
          { label: "Wedding Guest", href: "/shop?occasion=wedding" },
          { label: "Business", href: "/shop?occasion=business" },
          { label: "Casual", href: "/shop?occasion=casual" },
          { label: "Traditional", href: "/shop?occasion=traditional" },
        ],
      },
    ],
    image: gender === "men" ? "/images/category-mens.png" : "/images/category-womens.png",
    imageLabel: gender === "men" ? "Shop Men's" : "Shop Women's",
  };
};

export const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<"men" | "women" | null>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile accordion
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close mega on route change
  useEffect(() => {
    setActiveMega(null);
  }, [location]);

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
    setActiveMega(null);
  };

  const openMega = useCallback((gender: "men" | "women") => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => setActiveMega(gender), 150);
  }, []);

  const closeMega = useCallback(() => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const keepMegaOpen = useCallback(() => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
  }, []);

  const megaData = activeMega ? getMegaData(activeMega) : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-background border-b border-border transition-shadow duration-200 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <SpadeIcon size={28} showLetters={false} />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              ACE WARDROBE
            </span>
          </a>

          {/* Center nav - desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.mega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => openMega(link.label.toLowerCase() as "men" | "women")}
                  onMouseLeave={closeMega}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                      activeMega === link.label.toLowerCase() ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMega === link.label.toLowerCase() ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <MessageCircle size={18} />
              Chat
            </a>

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

      {/* Mega dropdown - desktop */}
      {activeMega && megaData && (
        <div
          className="fixed top-16 left-0 right-0 z-40 bg-background border-b border-border shadow-lg animate-in fade-in slide-in-from-top-1 duration-200"
          onMouseEnter={keepMegaOpen}
          onMouseLeave={closeMega}
        >
          <div className="max-w-[1400px] mx-auto px-10 py-8">
            <div className="grid grid-cols-4 gap-8">
              {megaData.columns.map((col) => (
                <div key={col.heading}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                    {col.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Featured image */}
              <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
                <img
                  src={megaData.image}
                  alt={megaData.imageLabel}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/20 flex items-end p-4">
                  <button
                    onClick={() => handleNavClick(`/shop?category=${activeMega}`)}
                    className="bg-background text-foreground text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {megaData.imageLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col overflow-y-auto">
          <div className="h-16 flex items-center justify-between px-5 flex-shrink-0">
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

          <nav className="flex flex-col px-5 py-6 gap-1 flex-1">
            {navLinks.map((link) =>
              link.mega ? (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    className="flex items-center justify-between w-full py-3 text-lg font-semibold text-foreground"
                  >
                    {link.label}
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="pl-4 pb-4 space-y-5 animate-in fade-in slide-in-from-top-1 duration-200">
                      {getMegaData(link.label.toLowerCase() as "men" | "women").columns.map((col) => (
                        <div key={col.heading}>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                            {col.heading}
                          </h4>
                          <div className="space-y-2">
                            {col.links.map((l) => (
                              <button
                                key={l.label}
                                onClick={() => handleNavClick(l.href)}
                                className="block text-sm text-foreground hover:text-primary transition-colors"
                              >
                                {l.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          <div className="pb-10 px-5 flex-shrink-0">
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
