import { FC } from "react";
import { motion } from "framer-motion";
import heroModel from "@/assets/hero-model.png";
import aceLogo from "@/assets/ace-wardrobe-logo.png";

const scrollToSection = (sectionId: string, offset: number = 64) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

export const HeroSection: FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden">
      {/* ── DESKTOP (md+): side-by-side split ── */}
      <div className="hidden md:block h-screen min-h-[600px] relative">
        {/* 50/50 split background with zoom-in */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 flex origin-center"
        >
          <div className="w-1/2" style={{ background: "#eab308" }} />
          <div className="w-1/2 bg-background" />
        </motion.div>

        {/* Model — centered exactly at 50% page width, full height top to bottom */}
        <div
          className="absolute inset-y-0 z-10 flex items-end justify-center"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <motion.img
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            src={heroModel}
            alt="Ace Wardrobe model"
            className="h-full w-auto object-cover object-bottom grayscale"
          />
        </div>

        {/* Left content — Ace logo + tagline, contained within yellow half */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="absolute left-12 lg:left-16 bottom-24 lg:bottom-32 z-20 max-w-[calc(50vw-120px)]"
        >
          <img
            src={aceLogo}
            alt="Ace Wardrobe"
            className="h-20 lg:h-24 w-auto object-contain mb-6"
          />
          <p className="text-sm leading-relaxed text-foreground/70 font-body">
            Premium menswear for the modern gentleman.
            <br />
            Classic tailoring meets contemporary style.
          </p>
          <button
            onClick={() => scrollToSection("packages")}
            className="mt-5 text-sm font-semibold uppercase tracking-wider underline underline-offset-4 text-foreground hover:text-foreground/80 transition-colors"
          >
            Shop Now
          </button>
        </motion.div>

        {/* Right headline — capitalized, professional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute right-12 lg:right-16 z-20 text-right max-w-[calc(50vw-180px)]"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-foreground">
            Dress Like
            <br />
            Royalty.
          </h1>
          <p className="mt-6 text-sm text-muted-foreground font-body tracking-wide">
            Elevate your style. Redefine your presence.
          </p>
        </motion.div>
      </div>

      {/* ── MOBILE (<md): stacked layout ── */}
      <div className="flex flex-col md:hidden min-h-screen">
        {/* Top: Yellow panel with logo, headline and model */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex flex-col items-center justify-end pt-20 pb-0 px-6 origin-center"
          style={{ background: "#eab308" }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src={aceLogo}
            alt="Ace Wardrobe"
            className="h-16 w-auto object-contain mb-4"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="font-display text-5xl font-black leading-[0.9] tracking-tight text-foreground text-center mb-6"
          >
            Dress Like
            <br />
            Royalty.
          </motion.h1>

          {/* Model image */}
          <motion.img
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            src={heroModel}
            alt="Ace Wardrobe model"
            className="h-[55vh] w-auto object-cover object-bottom grayscale relative z-10"
          />
        </motion.div>

        {/* Bottom: White panel with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="bg-background flex flex-col items-center justify-center px-6 py-10 text-center"
        >
          <p className="text-sm leading-relaxed text-muted-foreground max-w-[280px] font-body">
            Premium menswear for the modern gentleman.
            <br />
            Classic tailoring meets contemporary style.
          </p>
          <button
            onClick={() => scrollToSection("packages")}
            className="mt-5 text-sm font-semibold uppercase tracking-wider underline underline-offset-4 text-foreground hover:text-foreground/80 transition-colors"
          >
            Shop Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};
