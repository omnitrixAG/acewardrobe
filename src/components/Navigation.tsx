import { FC, useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SpadeIcon } from "./icons/SpadeIcon";

const scrollToSection = (sectionId: string, offset: number = 64) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const navLinks = [
  { label: "New In", href: "#packages" },
  { label: "Shop", href: "#collections" },
  { label: "Men", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection" },
  { label: "Women", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection" },
  { label: "About", href: "#about" },
];

export const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
            {navLinks.map((link) =>
              link.href.startsWith("http") ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
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
            {navLinks.map((link) =>
              link.href.startsWith("http") ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
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
