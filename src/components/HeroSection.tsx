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
      {/* 3-column layout */}
      <div className="absolute inset-0 flex">
        {/* Left: yellow */}
        <div className="flex-1 bg-ace-yellow" />
        {/* Center: model column */}
        <div className="w-[420px] shrink-0 relative">
          {/* Split background behind model */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 bg-ace-yellow" />
            <div className="w-1/2 bg-background" />
          </div>
        </div>
        {/* Right: white */}
        <div className="flex-1 bg-background" />
      </div>

      {/* Model image — centered in the 420px column */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute inset-0 z-10 flex items-end justify-center"
      >
        <img
          src={heroModel}
          alt="Ace Wardrobe model"
          className="h-[92vh] max-h-[960px] w-auto object-contain grayscale"
        />
      </motion.div>

      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        className="absolute left-8 md:left-16 bottom-32 z-20 max-w-[320px]"
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
        className="absolute right-8 md:right-16 z-20 text-right"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-foreground">
          dress like
          <br />
          royalty.
        </h1>
      </motion.div>
    </section>
  );
};
