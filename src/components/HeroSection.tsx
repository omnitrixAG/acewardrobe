import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TikTokIcon: FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const heroNavLinks = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#packages" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
];

export const HeroSection: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-[55%] h-full" style={{ background: "hsl(var(--ace-yellow))" }} />
        <div className="w-[45%] h-full bg-background" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider text-foreground"
        >
          ACE WARDROBE
        </motion.span>

        {/* Desktop nav */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-8"
        >
          {heroNavLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="text-sm uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
            >
              {l.label}
            </button>
          ))}
        </motion.nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground z-40"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[35] bg-background flex flex-col items-center justify-center gap-8">
          {heroNavLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.href)}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* Center: Gold circle + Model */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Gold circle */}
          <div
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
            style={{ background: "hsl(var(--ace-yellow))", opacity: 0.9 }}
          />

          {/* Model image */}
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&crop=top"
            alt="Well-dressed gentleman in premium fashion"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[450px] md:h-[750px] w-auto object-cover object-top"
          />
        </motion.div>
      </div>

      {/* Left content — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-20 md:bottom-24 left-6 md:left-12 z-20 max-w-[280px]"
      >
        <p className="text-sm leading-relaxed text-foreground/80 font-body mb-4">
          Premium menswear for the modern gentleman. Classic tailoring meets contemporary style.
        </p>
        <button
          onClick={() => handleNav("#packages")}
          className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Shop Now
        </button>
      </motion.div>

      {/* Right content — large text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 text-right"
      >
        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-9xl text-foreground leading-[0.9]">
          dress like
          <br />
          royalty.
        </h1>
      </motion.div>

      {/* Footer bar */}
      <div className="absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 z-30 flex items-center justify-between">
        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center gap-4"
        >
          <a href="https://www.instagram.com/ace_wardrobe/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://www.tiktok.com/@mista_ace" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors" aria-label="TikTok">
            <TikTokIcon size={20} />
          </a>
          <a href="https://wa.me/2347039178489" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
        </motion.div>

        {/* Location */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          Maitama, Abuja
        </motion.span>
      </div>
    </section>
  );
};
