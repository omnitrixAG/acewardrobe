import { FC } from "react";
import { Instagram, MessageCircle } from "lucide-react";

const TikTokIcon: FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const footerLinks = {
  Help: [
    { label: "Track Order", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20track%20my%20order" },
    { label: "Shipping Info", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20know%20about%20shipping" },
    { label: "Returns", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20inquire%20about%20returns" },
    { label: "Contact Us", href: "https://wa.me/2347039178489" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Stores", href: "https://maps.google.com/?q=6+Euphrates+Crescent+Maitama+Abuja" },
    { label: "Careers", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20career%20opportunities" },
  ],
  Shop: [
    { label: "Men's", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection" },
    { label: "Women's", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection" },
    { label: "Couples", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20couple%20outfits" },
    { label: "Accessories", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20accessories" },
  ],
};

export const Footer: FC = () => {
  return (
    <footer style={{ background: "hsl(0, 0%, 10%)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-16 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Visit Us column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
              Visit Us
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>6 Euphrates Crescent</p>
              <p>Maitama, Abuja</p>
              <a href="tel:+2347039178489" className="block hover:text-white transition-colors mt-3">
                +234 703 917 8489
              </a>
              <a href="mailto:hello@acewardrobe.com" className="block hover:text-white transition-colors">
                hello@acewardrobe.com
              </a>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 mt-8 mb-8">
          <a href="https://www.instagram.com/ace_wardrobe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://www.tiktok.com/@mista_ace" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
            <TikTokIcon size={20} />
          </a>
          <a href="https://wa.me/2347039178489" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2026 Ace Wardrobe. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
