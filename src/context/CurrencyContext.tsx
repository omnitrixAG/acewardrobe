import { createContext, useContext, useState, FC, ReactNode } from "react";

export interface CurrencyOption {
  code: string;
  country: string;
  symbol: string;
  label: string;
  recommended?: boolean;
}

export const currencies: CurrencyOption[] = [
  { code: "NG", country: "Nigeria", symbol: "₦", label: "NGN", recommended: true },
  { code: "US", country: "United States", symbol: "$", label: "USD" },
  { code: "GB", country: "United Kingdom", symbol: "£", label: "GBP" },
  { code: "GH", country: "Ghana", symbol: "₵", label: "GHS" },
];

interface CurrencyContextType {
  selected: CurrencyOption;
  setSelected: (c: CurrencyOption) => void;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selected, setSelectedState] = useState<CurrencyOption>(() => {
    try {
      const stored = localStorage.getItem("ace-currency");
      if (stored) {
        const parsed = JSON.parse(stored);
        return currencies.find((c) => c.code === parsed.code) || currencies[0];
      }
    } catch {}
    return currencies[0];
  });

  const setSelected = (c: CurrencyOption) => {
    setSelectedState(c);
    localStorage.setItem("ace-currency", JSON.stringify({ code: c.code }));
  };

  return (
    <CurrencyContext.Provider value={{ selected, setSelected }}>
      {children}
    </CurrencyContext.Provider>
  );
};
