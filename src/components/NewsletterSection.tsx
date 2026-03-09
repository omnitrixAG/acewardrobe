import { FC, useState } from "react";
import { Check, MessageCircle, Loader2, Users } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);

export const NewsletterSection: FC = () => {
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'hsl(0, 0%, 6%)' }}>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {isSubmitted ? (
            <div className="py-8 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <Check size={40} className="text-primary" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                You're in the circle!
              </h3>
              <p className="font-body text-[hsl(30,10%,65%)] text-lg">
                We'll send you exclusive updates and early access offers.
              </p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <span className="text-xs font-medium tracking-[0.2em] text-primary uppercase">Inner Circle</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                Stay In The Know
              </h2>

              <p className="font-body text-[hsl(30,10%,65%)] text-lg md:text-xl mb-10 max-w-lg mx-auto">
                Early access to new drops, exclusive offers, and style updates.
              </p>

              <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
                <div className="flex items-center p-1.5 rounded-full border border-[hsl(0,0%,20%)] bg-[hsl(0,0%,10%)] backdrop-blur-sm transition-all duration-300 focus-within:border-primary/50">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 bg-transparent text-white placeholder:text-[hsl(0,0%,45%)] focus:outline-none font-body text-base"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Subscribe"}
                  </button>
                </div>
                {error && (
                  <p className="mt-3 text-sm text-destructive font-body text-left pl-5">{error}</p>
                )}
              </form>

              <p className="mt-4 text-xs text-[hsl(0,0%,40%)]">
                No spam. Unsubscribe anytime.
              </p>

              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-[hsl(0,0%,6%)] flex items-center justify-center">
                    <Users size={14} className="text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/15 border-2 border-[hsl(0,0%,6%)]" />
                  <div className="w-8 h-8 rounded-full bg-[hsl(0,0%,20%)] border-2 border-[hsl(0,0%,6%)]" />
                </div>
                <p className="text-sm text-[hsl(30,10%,65%)]">
                  Join <span className="text-white font-medium">500+</span> stylish subscribers
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-[hsl(0,0%,15%)]">
                <p className="font-body text-sm text-[hsl(30,10%,65%)] mb-3">
                  Prefer WhatsApp?
                </p>
                <a
                  href="https://wa.me/2347039178489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium"
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
