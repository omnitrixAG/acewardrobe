import { FC, useState } from "react";
import { Check, MessageCircle, Loader2, Users } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);

export const RSVPSection: FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Curved top edge accent */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[400px] bg-primary/5 rounded-[100%]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {isSubmitted ? (
            /* Success State */
            <div className="py-8 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <Check size={40} className="text-primary" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                You're on the list!
              </h3>
              <p className="font-body text-muted-foreground text-lg">
                We'll send you exclusive updates and early access offers.
              </p>
            </div>
          ) : (
            /* Form State */
            <>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/30 mb-8">
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Join The Club</span>
              </div>

              {/* Headline */}
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-foreground">Join the </span>
                <span className="text-chrome-gradient">Inner Circle</span>
              </h2>
              
              <p className="font-body text-muted-foreground text-lg md:text-xl mb-10 max-w-lg mx-auto">
                Get early access to new drops, exclusive offers, and style inspiration.
              </p>

              {/* Inline Email Form */}
              <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
                <div className="flex items-center p-1.5 rounded-full border border-border bg-secondary/30 backdrop-blur-sm transition-all duration-300 focus-within:border-primary/50 focus-within:bg-secondary/50">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-body text-base"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Join Now"
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-3 text-sm text-destructive font-body text-left pl-5">{error}</p>
                )}
              </form>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border-2 border-background flex items-center justify-center">
                    <Users size={14} className="text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chrome/40 to-chrome/20 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/10 border-2 border-background" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Join <span className="text-foreground font-medium">500+</span> already signed up
                </p>
              </div>

              {/* WhatsApp Alternative */}
              <div className="mt-10 pt-8 border-t border-border/30">
                <p className="font-body text-sm text-muted-foreground mb-3">
                  Prefer to message us directly?
                </p>
                <a
                  href="https://wa.me/2347039178489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
