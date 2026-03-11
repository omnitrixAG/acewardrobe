import { motion } from 'framer-motion';

export const HeroSection = () => {

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-[55%] bg-[#eab308]" />
        <div className="w-[45%] bg-white" />
      </div>

      <div className="relative z-10 min-h-screen grid grid-cols-12 items-center px-6 md:px-12 lg:px-20">
        
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

        <div className="col-span-12 md:col-span-6 flex items-center justify-center relative">
          <motion.div
            className="relative z-10 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <img
              src="/model-suit.png"
              alt="Man in black suit"
              className="w-auto h-[150%] object-cover object-top"
            />
          </motion.div>
        </div>

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
