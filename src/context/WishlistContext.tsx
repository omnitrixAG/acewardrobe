import { createContext, useContext, useState, useEffect, FC, ReactNode, useCallback } from "react";

interface WishlistContextType {
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);
const STORAGE_KEY = "ace-wardrobe-wishlist";

const load = (): string[] => {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
};

export const WishlistProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);
  const clearWishlist = useCallback(() => setWishlist([]), []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist, wishlistCount: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
