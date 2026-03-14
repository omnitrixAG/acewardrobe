import { createContext, useContext, useState, FC, ReactNode, useCallback } from "react";

export interface CurrencyOption {
  code: string;
  symbol: string;
  country: string;
  flag: string;
  recommended?: boolean;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "NGN", symbol: "₦", country: "Nigeria", flag: "NG", recommended: true },
  { code: "USD", symbol: "$", country: "United States", flag: "US" },
  { code: "GBP", symbol: "£", country: "United Kingdom", flag: "GB" },
  { code: "GHS", symbol: "₵", country: "Ghana", flag: "GH" },
];

interface CurrencyContextType {
  currency: CurrencyOption;
  setCurrency: (c: CurrencyOption) => void;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = "ace-wardrobe-currency";

const loadCurrency = (): CurrencyOption => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const found = CURRENCIES.find((c) => c.code === parsed.code);
      if (found) return found;
    }
  } catch {}
  return CURRENCIES[0];
};

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyOption>(loadCurrency);

  const setCurrency = useCallback((c: CurrencyOption) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code: c.code }));
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
