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
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-[55%]" style={{ background: "#eab308" }} />
        <div className="w-[45%] bg-white" />
      </div>

      {/* Content layer */}
      <div className="relative h-full">
        {/* Model image — cropped from top, centered at the yellow/white split */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="absolute z-10 overflow-hidden"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-65%, -45%)",
            height: "85%",
            width: "auto",
          }}
        >
          <img
            src={heroModel}
            alt="Ace Wardrobe model in dark blazer"
            className="h-full w-auto object-cover object-top"
            style={{ transform: "scale(2.2)", transformOrigin: "top center" }}
          />
        </motion.div>

        {/* Left content — bottom left on yellow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="absolute left-6 md:left-16 bottom-28 md:bottom-32 z-20 max-w-[280px]"
        >
          <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.7)" }}>
            Premium menswear for the modern gentleman. Classic tailoring meets contemporary style.
          </p>
          <button
            onClick={() => scrollToSection("packages")}
            className="mt-3 text-sm font-medium underline underline-offset-4"
            style={{ color: "#1a1a1a" }}
          >
            Shop Now
          </button>
        </motion.div>

        {/* Right content — large typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute right-6 md:right-16 z-20 text-right"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tight"
            style={{ color: "#1a1a1a" }}
          >
            dress like
            <br />
            royalty.
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
