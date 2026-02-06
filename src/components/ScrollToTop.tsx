import { FC, useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showScrollTop) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};
