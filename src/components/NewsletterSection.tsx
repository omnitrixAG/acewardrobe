import { FC, useState } from "react";
import { Check, Loader2 } from "lucide-react";
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
    <section id="newsletter" className="py-16 md:py-20 bg-secondary">
      <div className="max-w-[640px] mx-auto px-5 text-center">
        {isSubmitted ? (
          <div className="py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Check size={32} className="text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              You're in!
            </h3>
            <p className="text-muted-foreground">
              We'll send you exclusive updates and early access offers.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Join the Ace Family
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe for exclusive drops, style tips, and VIP offers
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[448px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-lg bg-foreground text-background text-xs font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Subscribe"}
              </button>
            </form>

            {error && (
              <p className="mt-2 text-sm text-destructive">{error}</p>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              No spam, unsubscribe anytime. <a href="#" className="underline underline-offset-2 hover:text-primary transition-colors">Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </section>
  );
};
