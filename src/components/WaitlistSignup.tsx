import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export const WaitlistSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Store in local state for now (can connect to Supabase later)
    console.log("Waitlist signup:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="waitlist-card p-6 md:p-8 rounded-2xl">
        {!isSubmitted ? (
          <>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 text-center">
              Be First to Know
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 text-center">
              Join the waitlist for exclusive access and early offers
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="waitlist-input h-12 text-base focus:border-b-2 focus:border-b-primary focus:rounded-b-none transition-all duration-300"
                />
                {error && (
                  <p className="text-xs text-primary mt-1.5">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold waitlist-button"
              >
                Join Waitlist
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border/30 text-center">
              <a
                href="https://wa.me/2347039178489"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Or message us on WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-scale-in">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              You're on the list!
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Check your email for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
