export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$",   name: "US Dollar" },
  { code: "EUR", symbol: "€",   name: "Euro" },
  { code: "GBP", symbol: "£",   name: "British Pound" },
  { code: "CAD", symbol: "C$",  name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$",  name: "Australian Dollar" },
  { code: "INR", symbol: "₹",   name: "Indian Rupee" },
  { code: "JPY", symbol: "¥",   name: "Japanese Yen" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "BRL", symbol: "R$",  name: "Brazilian Real" },
  { code: "SGD", symbol: "S$",  name: "Singapore Dollar" },
  { code: "CHF", symbol: "Fr",  name: "Swiss Franc" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
];

export const DEFAULT_CURRENCY = CURRENCIES[0];
