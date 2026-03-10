import { motion } from 'framer-motion';
import heroModel from "@/assets/hero-model.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <div className="w-[52%] bg-[#eab308]" />
        <div className="w-[48%] bg-white" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 min-h-screen grid grid-cols-12 items-center px-6 md:px-12 lg:px-20">
        
        {/* Left Column - Description Text */}
        <div className="col-span-12 md:col-span-3 self-end pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="text-sm leading-relaxed text-black/80 max-w-[260px] mb-4">
              Premium menswear for the modern gentleman. Classic tailoring meets contemporary style.
            </p>
            <a 
              href="#collections" 
              className="inline-block text-sm font-medium text-black underline underline-offset-4 decoration-black/50 hover:decoration-black transition-all"
            >
              Shop Now
            </a>
          </motion.div>
        </div>

        {/* Center Column - Model with Circle */}
        <div className="col-span-12 md:col-span-6 flex items-center justify-center relative">
          {/* Yellow Circle */}
          <motion.div 
            className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#eab308] opacity-95"
            style={{ transform: 'translateX(10%)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          
          {/* Model Image */}
          <motion.img
            src={heroModel}
            alt="Man in black suit"
            className="relative z-10 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[680px] w-auto object-contain drop-shadow-2xl"
            style={{ transform: 'translateX(5%)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Right Column - Large Typography */}
        <div className="col-span-12 md:col-span-3 flex items-center">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black leading-[0.85] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            dress
            <br />
            like
            <br />
            royalty.
          </motion.h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
