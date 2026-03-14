import { FC } from "react";
import { motion } from "framer-motion";
import heroModel from "@/assets/hero-model.png";

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

        {/* Model — centered exactly at 50% page width */}
        <div
          className="absolute bottom-0 z-10 flex justify-center"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <motion.img
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            src={heroModel}
            alt="Ace Wardrobe model"
            className="h-[92vh] max-h-[960px] w-auto object-contain grayscale"
          />
        </div>

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="absolute left-16 bottom-32 z-20 max-w-[320px]"
        >
          <p className="text-sm leading-relaxed text-foreground/60">
            Premium menswear for the modern gentleman.
            <br />
            Classic tailoring meets contemporary style.
          </p>
          <button
            onClick={() => scrollToSection("packages")}
            className="mt-4 text-sm font-medium underline underline-offset-4 text-foreground"
          >
            Shop Now
          </button>
        </motion.div>

        {/* Right headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute right-16 z-20 text-right max-w-[30vw]"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <h1 className="font-display text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-foreground">
            dress like
            <br />
            royalty.
          </h1>
        </motion.div>
      </div>

      {/* ── MOBILE (<md): stacked layout ── */}
      <div className="flex flex-col md:hidden min-h-screen">
        {/* Top: Yellow panel with headline */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex flex-col items-center justify-end pt-24 pb-0 px-6 origin-center"
          style={{ background: "#eab308" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="font-display text-5xl font-black leading-[0.9] tracking-tight text-foreground text-center mb-6"
          >
            dress like
            <br />
            royalty.
          </motion.h1>

          {/* Model image overlapping into white section */}
          <motion.img
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            src={heroModel}
            alt="Ace Wardrobe model"
            className="h-[55vh] w-auto object-contain grayscale relative z-10"
          />
        </motion.div>

        {/* Bottom: White panel with CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="bg-background flex flex-col items-center justify-center px-6 py-10 text-center"
        >
          <p className="text-sm leading-relaxed text-foreground/60 max-w-[280px]">
            Premium menswear for the modern gentleman.
            <br />
            Classic tailoring meets contemporary style.
          </p>
          <button
            onClick={() => scrollToSection("packages")}
            className="mt-5 text-sm font-medium underline underline-offset-4 text-foreground"
          >
            Shop Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};
