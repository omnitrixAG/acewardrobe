import { FC, useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";

export const Navigation: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shop", href: "#shop" },
    { label: "Collections", href: "#collections" },
    { label: "Valentine Event", href: "#valentine" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-dark py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <SpadeIcon 
              size={40} 
              className="transition-all duration-300 group-hover:scale-110 glow-pulse" 
            />
            <span className="hidden md:block font-display text-xl font-semibold tracking-wide text-foreground">
              Ace Wardrobe
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 hover:text-primary transition-colors">
              <ShoppingBag size={22} />
            </a>
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block btn-primary rounded-full text-xs"
            >
              Book Appointment
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/30 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/2347039178489"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-full text-center text-xs mt-2"
              >
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
