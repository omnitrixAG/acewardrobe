import { FC } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";

// TikTok icon component
const TikTokIcon: FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Peaches by Ema logo
const PeachesLogo: FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="text-2xl">🍑</span>
    <span className="font-display text-lg">Peaches by Ema</span>
  </div>
);

export const Footer: FC = () => {
  return (
    <footer className="bg-card border-t border-border/30">
      {/* Partner Logos */}
      <div className="py-12 border-b border-border/30">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8 font-body tracking-wider uppercase">
            In Collaboration With
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Ace Wardrobe */}
            <a
              href="https://www.instagram.com/ace_wardrobe/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <SpadeIcon size={40} className="group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-display text-xl font-semibold text-foreground">
                  Ace Wardrobe
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  @ace_wardrobe
                </p>
              </div>
            </a>

            <div className="hidden md:block w-px h-12 bg-border/50" />

            {/* Peaches by Ema */}
            <a
              href="https://www.instagram.com/peachesbyema/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <PeachesLogo className="group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-body text-sm text-muted-foreground">
                  @peachesbyema
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/ace_wardrobe/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://wa.me/2347039178489"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} className="text-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@mista_ace"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                aria-label="TikTok"
              >
                <TikTokIcon size={20} className="text-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>

            {/* Location */}
            <div className="text-center md:text-right">
              <p className="font-body text-sm text-muted-foreground">
                6 Euphrates Crescent, Maitama, Abuja
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 border-t border-border/30">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-center text-sm text-muted-foreground font-body">
            © 2026 Ace Wardrobe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
