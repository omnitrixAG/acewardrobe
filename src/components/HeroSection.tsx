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
      <div className="relative h-full flex items-end justify-center">
        {/* Yellow circle behind model */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute z-[1] rounded-full w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
          style={{
            background: "#eab308",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -40%)",
            boxShadow: "0 0 80px rgba(234, 179, 8, 0.4)",
          }}
        />

        {/* Model image — centered, straddling the divide */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 z-[2]"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          <img
            src={heroModel}
            alt="Ace Wardrobe model in dark blazer"
            className="h-[90vh] max-h-[900px] w-auto object-contain"
          />
        </motion.div>

        {/* Left content — bottom left on yellow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="absolute left-6 md:left-16 bottom-28 md:bottom-32 z-[30] max-w-[280px]"
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

        {/* Right content — large typography, positioned to the right of model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute z-[30] text-right right-6 md:right-12 lg:right-16"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight"
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
