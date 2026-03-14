import { FC, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const AuthModal: FC = () => {
  const { showAuthModal, setShowAuthModal, authModalView, setAuthModalView, signIn, signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!showAuthModal) return null;

  const isSignUp = authModalView === "signup";

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setFieldErrors({});
    setShowPassword(false);
    setShowConfirm(false);
  };

  const switchView = (view: "signin" | "signup") => {
    resetForm();
    setAuthModalView(view);
  };

  const close = () => {
    resetForm();
    setShowAuthModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (isSignUp) {
      const result = signUpSchema.safeParse({ name, email, password, confirmPassword });
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const key = err.path[0] as string;
          if (!errs[key]) errs[key] = err.message;
        });
        setFieldErrors(errs);
        return;
      }
      const ok = signUp(name.trim(), email.trim(), password);
      if (!ok) {
        setError("An account with this email already exists.");
        return;
      }
    } else {
      const result = signInSchema.safeParse({ email, password });
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const key = err.path[0] as string;
          if (!errs[key]) errs[key] = err.message;
        });
        setFieldErrors(errs);
        return;
      }
      const ok = signIn(email.trim(), password);
      if (!ok) {
        setError("Invalid email or password.");
        return;
      }
    }
    close();
  };

  const inputClass = (field: string) =>
    `w-full h-14 px-4 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      fieldErrors[field] ? "border-destructive" : "border-input"
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" onClick={close} />

      {/* Modal */}
      <div className="relative w-full max-w-[440px] mx-4 bg-background rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit} className="p-8 pt-10">
          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground text-center mb-2 uppercase tracking-wide">
            {isSignUp ? "Create Account" : "Welcome!"}
          </h2>

          {!isSignUp && (
            <p className="text-sm text-muted-foreground text-center mb-8">
              Sign In or{" "}
              <button
                type="button"
                onClick={() => switchView("signup")}
                className="text-[hsl(210,80%,50%)] hover:underline font-medium"
              >
                Create an Account
              </button>
            </p>
          )}

          {isSignUp && (
            <p className="text-sm text-muted-foreground text-center mb-8">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchView("signin")}
                className="text-[hsl(210,80%,50%)] hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Name - signup only */}
            {isSignUp && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass("name")}
                  maxLength={100}
                  autoComplete="name"
                />
                {fieldErrors.name && (
                  <p className="text-xs text-destructive mt-1">{fieldErrors.name}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass("email")}
                maxLength={255}
                autoComplete="email"
              />
              {fieldErrors.email && (
                <p className="text-xs text-destructive mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass("password")}
                  maxLength={128}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-destructive mt-1">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password - signup only */}
            {isSignUp && (
              <div>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass("confirmPassword")}
                    maxLength={128}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Forgot password */}
            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-[hsl(210,80%,50%)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-14 rounded-full bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              {isSignUp ? "Create Account" : "Continue"}
            </button>
          </div>

          {/* Terms */}
          <p className="text-[11px] text-muted-foreground text-center mt-6 leading-relaxed">
            By signing up, you agree to Ace Wardrobe's{" "}
            <button type="button" className="underline hover:text-foreground">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="underline hover:text-foreground">
              Privacy Policy
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
