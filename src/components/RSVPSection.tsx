import { FC, useState } from "react";
import { Check, MessageCircle, Loader2 } from "lucide-react";
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
    <section id="contact" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="glass-dark rounded-2xl p-8 md:p-12 border border-border/50">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <Check size={40} className="text-primary" />
                </div>
                <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                  You're on the list!
                </h3>
                <p className="font-body text-muted-foreground">
                  We'll send you exclusive updates about the Valentine event.
                </p>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Reserve Your Spot
                  </h2>
                  <p className="font-body text-muted-foreground">
                    Be the first to know about exclusive offers
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email"
                        className={`w-full px-5 py-4 rounded-xl bg-secondary/50 border ${
                          error ? "border-destructive" : "border-border"
                        } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body transition-all`}
                        disabled={isLoading}
                      />
                      {error && (
                        <p className="mt-2 text-sm text-destructive font-body">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary rounded-xl px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        "Join Waitlist"
                      )}
                    </button>
                  </div>
                </form>

                {/* WhatsApp Alternative */}
                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    Or message us directly on WhatsApp
                  </p>
                  <a
                    href="https://wa.me/2347039178489"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-body"
                  >
                    <MessageCircle size={18} />
                    +234 703 917 8489
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
