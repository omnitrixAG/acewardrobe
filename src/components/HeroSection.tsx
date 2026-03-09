import { FC } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import heroModel from "@/assets/ace-hero-model.png";

const scrollToSection = (sectionId: string, offset: number = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const HeroSection: FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-[55%] bg-ace-yellow" />
        <div className="w-[45%] bg-background" />
      </div>

      {/* Mobile: stacked background */}
      <div className="absolute inset-0 flex flex-col md:hidden">
        <div className="h-[55%] bg-ace-yellow" />
        <div className="h-[45%] bg-background" />
      </div>

      {/* Desktop split (hidden on mobile) */}
      <div className="absolute inset-0 hidden md:flex">
        <div className="w-[55%] bg-ace-yellow" />
        <div className="w-[45%] bg-background" />
      </div>

      {/* Gold circle behind model */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-ace-yellow z-[5]"
      />

      {/* Model image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 w-[320px] md:w-[480px] lg:w-[540px]"
      >
        <img
          src={heroModel}
          alt="Well-dressed man in premium fashion"
          className="w-full h-auto object-contain scale-110 md:scale-125"
        />
      </motion.div>

      {/* Left side content — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-20 md:bottom-24 left-6 md:left-12 z-20 max-w-[280px]"
      >
        <p className="text-sm leading-relaxed text-foreground/80 font-body">
          Premium menswear for the modern gentleman. Classic tailoring meets contemporary style.
        </p>
        <button
          onClick={() => scrollToSection("packages")}
          className="mt-3 text-sm font-medium text-foreground underline underline-offset-4 font-body hover:text-foreground/70 transition-colors"
        >
          Shop Now
        </button>
      </motion.div>

      {/* Right side content — large text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 z-20 text-right hidden md:block"
      >
        <h1 className="font-display font-extrabold text-7xl lg:text-9xl text-foreground leading-[0.9] tracking-tight">
          dress like
          <br />
          royalty.
        </h1>
      </motion.div>

      {/* Mobile large text — below center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-32 right-6 z-20 text-right md:hidden"
      >
        <h1 className="font-display font-extrabold text-5xl text-foreground leading-[0.9] tracking-tight">
          dress like
          <br />
          royalty.
        </h1>
      </motion.div>

      {/* Footer — social + location */}
      <div className="absolute bottom-6 left-0 right-0 z-30 px-6 md:px-12 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center gap-4"
        >
          <a href="https://instagram.com/acewardrobe" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://tiktok.com/@acewardrobe" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
            <TikTokIcon />
          </a>
          <a href="https://wa.me/2347039178489" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
            <WhatsAppIcon />
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80 font-body"
        >
          Maitama, Abuja
        </motion.p>
      </div>
    </section>
  );
};
