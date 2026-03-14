import { FC, useState } from "react";
import { X, Check, Search } from "lucide-react";
import { currencies, CurrencyOption, useCurrency } from "@/context/CurrencyContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CurrencyModal: FC<Props> = ({ open, onClose }) => {
  const { selected, setSelected } = useCurrency();
  const [search, setSearch] = useState("");

  if (!open) return null;

  const filtered = currencies.filter(
    (c) =>
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (c: CurrencyOption) => {
    setSelected(c);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-background rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Blue header */}
        <div className="bg-[hsl(210,80%,50%)] px-6 py-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Your Currency and Region
          </h2>
          <button onClick={onClose} className="text-white hover:text-white/80 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Select Region / Currency
          </p>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Options */}
          <div className="space-y-1">
            {filtered.map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelect(c)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm transition-colors ${
                  selected.code === c.code
                    ? "bg-muted font-semibold"
                    : "hover:bg-muted/50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="font-semibold text-foreground">{c.code}</span>
                  <span className="text-foreground">
                    {c.country}
                    {c.recommended && (
                      <span className="text-muted-foreground text-xs ml-1">(Recommended)</span>
                    )}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {c.label} {c.symbol}
                  </span>
                  {selected.code === c.code && (
                    <Check size={16} className="text-[hsl(210,80%,50%)]" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
