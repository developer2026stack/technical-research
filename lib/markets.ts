import type { CountryCode } from "@/components/flags";

export type Market = {
  code: CountryCode;
  name: string;
  city: string;
  role: string;
  phase: string;
  currency: CurrencyCode;
};

export type CurrencyCode = "SAR" | "AED" | "USD" | "EUR" | "GBP" | "CNY" | "HKD";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  name: string;
  country: CountryCode;
  use: string;
  gateway: string;
  rounding: string;
  tax: string;
  /** Example: what one 120 SAR bottle of Oud costs in this currency. */
  example: string;
};

/** Every country the platform actually touches, in flow order. */
export const markets: Market[] = [
  {
    code: "CN",
    name: "China",
    city: "Guangzhou · Shenzhen",
    role: "Sourcing and private-label manufacturing",
    phase: "Phase 1",
    currency: "CNY",
  },
  {
    code: "HK",
    name: "Hong Kong",
    city: "Hong Kong",
    role: "Trading houses and consolidation",
    phase: "Phase 1",
    currency: "HKD",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    city: "Dubai · Jebel Ali",
    role: "Regional sourcing and GCC transit",
    phase: "Phase 1 & 3",
    currency: "AED",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    city: "Jeddah · Riyadh",
    role: "Head office, customs hub, warehouse and home market",
    phase: "Phase 2, 3 & 4",
    currency: "SAR",
  },
  {
    code: "EU",
    name: "European Union",
    city: "Frankfurt region",
    role: "Export market for Saudi products",
    phase: "Phase 4",
    currency: "EUR",
  },
  {
    code: "GB",
    name: "United Kingdom",
    city: "London",
    role: "Export market for Saudi products",
    phase: "Phase 4",
    currency: "GBP",
  },
  {
    code: "US",
    name: "United States",
    city: "Nationwide",
    role: "Export market for Saudi products",
    phase: "Phase 4",
    currency: "USD",
  },
];

/** Every currency that appears anywhere in the platform. */
export const currencies: Currency[] = [
  {
    code: "SAR",
    symbol: "﷼",
    name: "Saudi Riyal",
    country: "SA",
    use: "Base currency. All prices, books and duty are held here.",
    gateway: "Moyasar",
    rounding: "Nearest whole riyal",
    tax: "15% VAT",
    example: "﷼ 120",
  },
  {
    code: "AED",
    symbol: "د.إ",
    name: "UAE Dirham",
    country: "AE",
    use: "GCC buyers and regional B2B contracts.",
    gateway: "HyperPay",
    rounding: "Nearest whole dirham",
    tax: "Per destination rules",
    example: "د.إ 118",
  },
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    country: "US",
    use: "Default export currency, and most freight invoices.",
    gateway: "Checkout.com",
    rounding: "Ends in .99",
    tax: "Zero-rated export",
    example: "$ 31.99",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    country: "EU",
    use: "European buyers on the Saudi Export Portal.",
    gateway: "Checkout.com",
    rounding: "Ends in .95",
    tax: "Zero-rated export",
    example: "€ 29.95",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "Pound Sterling",
    country: "GB",
    use: "United Kingdom buyers.",
    gateway: "Checkout.com",
    rounding: "Ends in .99",
    tax: "Zero-rated export",
    example: "£ 25.99",
  },
  {
    code: "CNY",
    symbol: "¥",
    name: "Chinese Yuan",
    country: "CN",
    use: "Supplier and factory payables — money going out, not coming in.",
    gateway: "Bank transfer",
    rounding: "Contract terms",
    tax: "Not applicable",
    example: "¥ 232",
  },
  {
    code: "HKD",
    symbol: "HK$",
    name: "Hong Kong Dollar",
    country: "HK",
    use: "Trading-house invoices from Hong Kong.",
    gateway: "Bank transfer",
    rounding: "Contract terms",
    tax: "Not applicable",
    example: "HK$ 250",
  },
];

export const currencyBy = (code: CurrencyCode) =>
  currencies.find((c) => c.code === code)!;
