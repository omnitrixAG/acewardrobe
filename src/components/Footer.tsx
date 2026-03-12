import { FC } from "react";
import { Instagram, MessageCircle } from "lucide-react";

const TikTokIcon: FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const footerLinks = {
  navigate: [
    { label: "Collections", href: "#collections" },
    { label: "About Us", href: "#about" },
    { label: "Men's Edit", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20men's%20collection" },
    { label: "Women's Edit", href: "https://wa.me/2347039178489?text=Hi!%20I'm%20interested%20in%20your%20women's%20collection" },
  ],
  services: [
    { label: "Private Shopping", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20book%20a%20private%20shopping%20session" },
    { label: "Styling Consultation", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20a%20styling%20consultation" },
    { label: "Worldwide Delivery", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20know%20about%20international%20shipping" },
    { label: "Custom Orders", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20place%20a%20custom%20order" },
  ],
  discover: [
    { label: "Newsletter", href: "#newsletter" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "Peaches by Ema", href: "https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20know%20about%20Peaches%20by%20Ema" },
    { label: "Our Story", href: "#about" },
  ],
};

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/ace_wardrobe/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@mista_ace", label: "TikTok" },
  { icon: MessageCircle, href: "https://wa.me/2347039178489", label: "WhatsApp" },
];

const FooterColumn: FC<{ title: string; links: { label: string; href: string }[] }> = ({ title, links }) => (
  <div>
    <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: FC = () => {
  return (
    <footer className="pt-16 pb-8" style={{ background: "#1a1a1a" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <FooterColumn title="Help" links={footerLinks.help} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Shop" links={footerLinks.shop} />

          {/* Visit Us */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Visit Us</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>6 Euphrates Crescent</p>
              <p>Maitama, Abuja</p>
              <a href="tel:+2347039178489" className="block hover:text-white transition-colors">
                +234 703 917 8489
              </a>
              <a href="mailto:hello@acewardrobe.com" className="block hover:text-white transition-colors">
                hello@acewardrobe.com
              </a>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 my-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Ace Wardrobe. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
