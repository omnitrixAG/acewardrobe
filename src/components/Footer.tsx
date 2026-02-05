import { FC } from "react";
import { Instagram, MessageCircle, MapPin, Phone, Mail, Heart, ArrowRight } from "lucide-react";
import { SpadeIcon } from "./icons/SpadeIcon";
import { Button } from "./ui/button";

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

const FooterLink: FC<{ href: string; children: React.ReactNode; external?: boolean }> = ({ 
  href, 
  children, 
  external 
}) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
  >
    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
    {children}
  </a>
);

export const Footer: FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-b from-background to-card">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L45 15L30 30L15 15z M0 30L15 45L0 60z M60 30L45 45L60 60z' fill='%23c41e3a' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 text-center relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-pulse">
            <SpadeIcon size={32} className="text-primary" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Book An Appointment Today
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Experience personalized styling with our fashion experts. Private shopping sessions available in-store or virtually.
          </p>
          
          <Button
            variant="solid"
            size="lg"
            className="group/btn"
            asChild
          >
            <a
              href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20book%20a%20private%20shopping%20appointment%20at%20Ace%20Wardrobe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Book Appointment
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-card border-t border-border/30">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Contact Column */}
            <div className="lg:col-span-1">
              <h4 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="text-primary">♠</span> Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://wa.me/2347039178489" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>+234 703 917 8489</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://maps.google.com/?q=6+Euphrates+Crescent+Maitama+Abuja" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>6 Euphrates Crescent,<br />Maitama, Abuja</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:hello@acewardrobe.com"
                    className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Mail size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>hello@acewardrobe.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigate Column */}
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="text-primary">♠</span> Navigate
              </h4>
              <ul className="space-y-3">
                <li><FooterLink href="#collections">Collections</FooterLink></li>
                <li><FooterLink href="#packages">Valentine Packages</FooterLink></li>
                <li><FooterLink href="#about">About Us</FooterLink></li>
                <li><FooterLink href="/valentine-event">Valentine Event</FooterLink></li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="text-primary">♠</span> Services
              </h4>
              <ul className="space-y-3">
                <li><FooterLink href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20inquire%20about%20private%20shopping" external>Private Shopping</FooterLink></li>
                <li><FooterLink href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20inquire%20about%20styling%20consultation" external>Styling Consultation</FooterLink></li>
                <li><FooterLink href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20inquire%20about%20worldwide%20delivery" external>Worldwide Delivery</FooterLink></li>
                <li><FooterLink href="https://wa.me/2347039178489?text=Hi!%20I'd%20like%20to%20inquire%20about%20custom%20orders" external>Custom Orders</FooterLink></li>
              </ul>
            </div>

            {/* Discover Column */}
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="text-primary">♠</span> Discover
              </h4>
              <ul className="space-y-3">
                <li><FooterLink href="#rsvp">Join Waitlist</FooterLink></li>
                <li><FooterLink href="https://www.instagram.com/ace_wardrobe/" external>New Arrivals</FooterLink></li>
                <li><FooterLink href="https://www.instagram.com/peachesbyema/" external>Peaches by Ema</FooterLink></li>
                <li><FooterLink href="#about">Our Story</FooterLink></li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="text-primary">♠</span> Follow Us
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.instagram.com/ace_wardrobe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@mista_ace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <TikTokIcon size={18} className="group-hover:scale-110 transition-transform" />
                    <span>TikTok</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/2347039178489"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                    <span>WhatsApp</span>
                  </a>
                </li>
              </ul>
              
              {/* Social Icons Row */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://www.instagram.com/ace_wardrobe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="text-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://www.tiktok.com/@mista_ace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={16} className="text-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://wa.me/2347039178489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-secondary/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={16} className="text-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Banner */}
        <div className="border-t border-border/30 py-8">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">In Collaboration With</p>
              <div className="flex items-center gap-8">
                <a
                  href="https://www.instagram.com/ace_wardrobe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group"
                >
                  <SpadeIcon size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors">Ace Wardrobe</span>
                </a>
                <span className="text-border">×</span>
                <a
                  href="https://www.instagram.com/peachesbyema/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group"
                >
                  <span className="text-lg">🍑</span>
                  <span className="font-display text-sm text-foreground group-hover:text-rose-400 transition-colors">Peaches by Ema</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 py-6 bg-background/50">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                © 2026 <span className="text-foreground font-medium">Ace Wardrobe</span>. All rights reserved. Made with <Heart size={12} className="text-primary fill-primary" /> in Abuja
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};