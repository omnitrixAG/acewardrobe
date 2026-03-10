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
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden pt-16">
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-[55%]" style={{ background: "#eab308" }} />
        <div className="w-[45%] bg-white" />
      </div>

      {/* Content layer */}
      <div className="relative h-full flex items-center justify-center">
        {/* Yellow circle behind model */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute rounded-full w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
          style={{ background: "#eab308", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Model image */}
        <motion.img
          src={heroModel}
          alt="Ace Wardrobe model in dark blazer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 h-[75vh] max-h-[700px] object-contain"
        />

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="absolute left-6 md:left-16 bottom-16 md:bottom-20 z-20 max-w-[280px]"
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

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute right-6 md:right-16 z-20 text-right"
        >
          <h1
            className="font-display text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tight"
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
