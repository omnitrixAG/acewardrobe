import { FC, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import aceLogo from "@/assets/ace-logo.jpg";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const navLinks = [
  { label: "New In", href: "#new-arrivals" },
  { label: "Shop", href: "#collections" },
  { label: "Men", href: "#packages" },
  { label: "Women", href: "#packages" },
  { label: "About", href: "#about" },
];

export const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  const handleLogo = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border h-16 flex items-center">
        <div className="max-w-[1200px] w-full mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="/" onClick={handleLogo} className="flex items-center gap-2.5">
            <img src={aceLogo} alt="Ace Wardrobe" className="h-8 w-8 object-contain rounded" />
            <span className="font-bold text-lg tracking-tight text-foreground">ACE WARDROBE</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right */}
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
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="flex items-center justify-between h-16 px-5 border-b border-border">
            <a href="/" onClick={handleLogo} className="flex items-center gap-2.5">
              <img src={aceLogo} alt="Ace Wardrobe" className="h-8 w-8 object-contain rounded" />
              <span className="font-bold text-lg tracking-tight text-foreground">ACE WARDROBE</span>
            </a>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={24} className="text-foreground" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="p-6 border-t border-border">
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <MessageCircle size={18} />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};
