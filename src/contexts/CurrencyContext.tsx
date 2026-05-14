"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CURRENCIES, Currency, DEFAULT_CURRENCY } from "@/lib/currencies";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  fmt: (n: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  fmt: (n) => `$${Math.abs(n).toFixed(2)}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY);

  useEffect(() => {
    const saved = localStorage.getItem("sharedue_currency");
    if (saved) {
      const found = CURRENCIES.find((c) => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    localStorage.setItem("sharedue_currency", c.code);
  }

  function fmt(n: number): string {
    const abs = Math.abs(n);
    const formatted = currency.code === "JPY" ? Math.round(abs).toString() : abs.toFixed(2);
    return `${currency.symbol}${formatted}`;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, fmt }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
