import { createContext, useContext, useState, FC, ReactNode, useCallback } from "react";

interface UserData {
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserData | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  signOut: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalView: "signin" | "signup";
  setAuthModalView: (view: "signin" | "signup") => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    try {
      const stored = localStorage.getItem("ace-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<"signin" | "signup">("signin");

  const signIn = useCallback((email: string, _password: string): boolean => {
    // localStorage-based auth for now
    const usersRaw = localStorage.getItem("ace-users");
    const users: Record<string, { name: string; password: string }> = usersRaw ? JSON.parse(usersRaw) : {};
    const entry = users[email.toLowerCase()];
    if (!entry || entry.password !== _password) return false;
    const userData = { name: entry.name, email: email.toLowerCase() };
    setUser(userData);
    localStorage.setItem("ace-user", JSON.stringify(userData));
    return true;
  }, []);

  const signUp = useCallback((name: string, email: string, password: string): boolean => {
    const usersRaw = localStorage.getItem("ace-users");
    const users: Record<string, { name: string; password: string }> = usersRaw ? JSON.parse(usersRaw) : {};
    const key = email.toLowerCase();
    if (users[key]) return false; // already exists
    users[key] = { name, password };
    localStorage.setItem("ace-users", JSON.stringify(users));
    const userData = { name, email: key };
    setUser(userData);
    localStorage.setItem("ace-user", JSON.stringify(userData));
    return true;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ace-user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, showAuthModal, setShowAuthModal, authModalView, setAuthModalView }}
    >
      {children}
    </AuthContext.Provider>
  );
};
