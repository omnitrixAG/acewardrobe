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
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* 50/50 split background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2" style={{ background: "#eab308" }} />
        <div className="w-1/2 bg-white" />
      </div>

      {/* Model — centered exactly on the vertical split */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 z-10"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <img
          src={heroModel}
          alt="Ace Wardrobe model"
          className="h-[92vh] max-h-[960px] w-auto object-contain grayscale"
        />
      </motion.div>

      {/* Left content — lower left on yellow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="absolute left-8 md:left-16 bottom-32 z-20 max-w-[320px]"
      >
        <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
          Premium menswear for the modern gentleman. Classic tailoring meets contemporary style.
        </p>
        <button
          onClick={() => scrollToSection("packages")}
          className="mt-3 text-sm font-medium underline underline-offset-4"
          style={{ color: "hsl(var(--deep-black))" }}
        >
          Shop Now
        </button>
      </motion.div>

      {/* Right content — large headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        className="absolute right-8 md:right-16 z-20 text-right"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <h1
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight"
          style={{ color: "hsl(var(--deep-black))" }}
        >
          dress like
          <br />
          royalty.
        </h1>
      </motion.div>
    </section>
  );
};
