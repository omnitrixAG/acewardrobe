import { FC, useState, useEffect, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import aceLogo from "@/assets/ace-logo.jpg";

const AnimatedNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
  const isExternal = href.startsWith('http');
  const isRouterLink = href.startsWith('/');
  
  const linkClasses = "group relative inline-block overflow-hidden h-5 flex items-center text-sm";
  const innerContent = (
    <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
      <span className="text-muted-foreground">{children}</span>
      <span className="text-foreground">{children}</span>
    </div>
  );

  if (isRouterLink) {
    return (
      <Link to={href} className={linkClasses} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      className={linkClasses}
      onClick={onClick}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {innerContent}
    </a>
  );
};

export const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }
    if (isOpen) {
      setHeaderShapeClass('rounded-xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }
    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Shop", href: "#shop" },
    { label: "Collections", href: "#collections" },
    { label: "Valentine Event", href: "/valentine" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const logoElement = (
    <Link to="/" className="flex items-center gap-3 group">
      <img 
        src={aceLogo} 
        alt="Ace Wardrobe Logo" 
        className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110" 
      />
      <span className="hidden md:block font-display text-base font-semibold tracking-wide text-foreground whitespace-nowrap">
        Ace Wardrobe
      </span>
    </Link>
  );

  return (
    <header 
      className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50
                 flex flex-col items-center
                 px-5 md:px-8 py-2.5 md:py-3 backdrop-blur-sm
                 ${headerShapeClass}
                 border border-border/50 bg-background/60
                 w-[calc(100%-1.5rem)] md:w-auto md:min-w-[700px] lg:min-w-[850px]
                 transition-[border-radius,background] duration-300 ease-in-out
                 ${isScrolled ? 'bg-background/80' : ''}`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 md:gap-x-10">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          {logoElement}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag size={20} />
          </a>
          <Button 
            variant="solid" 
            size="sm"
            asChild
          >
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap"
            >
              Book Appointment
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex items-center justify-center w-8 h-8 text-muted-foreground focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                      ${isOpen ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinks.map((link) => (
            <AnimatedNavLink 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-3 mt-4 w-full">
          <Button variant="outline" size="sm" className="w-full">
            <ShoppingBag size={16} />
            Cart
          </Button>
          <Button 
            variant="solid" 
            size="sm"
            className="w-full"
            asChild
          >
            <a
              href="https://wa.me/2347039178489"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Appointment
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
