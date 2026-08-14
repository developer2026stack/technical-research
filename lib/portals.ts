import type { CountryCode } from "@/components/flags";

export type Phase = "sourcing" | "hub" | "logistics" | "market" | "core";

export type Portal = {
  id: number;
  name: string;
  short: string;
  phase: Phase;
  users: string;
  oneLine: string;
  story: string;
  jobs: string[];
  talksTo: string[];
  /** Countries this portal actually operates across. */
  countries: CountryCode[];
};

export const phaseMeta: Record<
  Phase,
  { label: string; where: string; color: string; soft: string; note: string }
> = {
  sourcing: {
    label: "Phase 1 — Sourcing & Branding",
    where: "China · Hong Kong · UAE",
    color: "var(--violet)",
    soft: "var(--violet-soft)",
    note: "Goods are found, priced and branded before anything moves.",
  },
  hub: {
    label: "Phase 2 — Transit & Processing",
    where: "Jeddah Hub, KSA",
    color: "var(--ocean)",
    soft: "var(--ocean-soft)",
    note: "Goods land in Saudi Arabia, clear customs and rest in a warehouse.",
  },
  logistics: {
    label: "Phase 3 — Logistics & Distribution",
    where: "Across KSA & abroad",
    color: "var(--teal)",
    soft: "var(--teal-soft)",
    note: "Cleared stock is routed, loaded and driven to the buyer.",
  },
  market: {
    label: "Phase 4 — Market & End User",
    where: "Local & worldwide",
    color: "var(--gold)",
    soft: "var(--gold-soft)",
    note: "Buyers order, and Saudi products go out to the world.",
  },
  core: {
    label: "Core Operations",
    where: "Back office",
    color: "var(--rose)",
    soft: "var(--rose-soft)",
    note: "The two portals that keep the other ten honest and legal.",
  },
};

export const portals: Portal[] = [
  {
    id: 1,
    name: "Supplier / Vendor Portal",
    short: "Supplier",
    phase: "sourcing",
    users: "Factories & trading houses abroad",
    oneLine: "Where international suppliers sign up and quote their prices.",
    story:
      "A supplier in Guangzhou opens the portal, uploads their trade licence and product list, and sets prices. The system checks their papers, then shows their offer next to suppliers from Shenzhen, Hong Kong and Dubai — same product, side by side, country by country.",
    jobs: [
      "Supplier sign-up with document upload and verification",
      "Product catalogue with tiered (bulk) pricing",
      "Country-by-country price comparison for the buying team",
      "Quote requests (RFQ) and counter-offers in one thread",
    ],
    talksTo: ["Factory Portal", "Clearance Portal", "Management Portal"],
    countries: ["CN", "HK", "AE"],
  },
  {
    id: 2,
    name: "Factory Portal",
    short: "Factory",
    phase: "sourcing",
    users: "New brands & private-label buyers",
    oneLine: "Where a new brand meets a factory that can actually make it.",
    story:
      "Someone wants to launch their own perfume label. Instead of flying to China, they post their idea here — size, material, quantity, logo. Verified factories reply with samples and a per-unit price. When both agree, the order becomes a real production job with milestones.",
    jobs: [
      "Private-label brief builder (specs, artwork, quantity)",
      "Verified factory matching and sample tracking",
      "Production milestones with photo proof at each stage",
      "Mould, tooling and minimum-order (MOQ) handling",
    ],
    talksTo: ["Supplier Portal", "Advertisement Portal", "Warehouse Portal"],
    countries: ["CN", "HK"],
  },
  {
    id: 3,
    name: "Advertisement Portal",
    short: "Ads",
    phase: "sourcing",
    users: "Sellers & brand owners",
    oneLine: "Where a brand buys visibility, online and offline.",
    story:
      "A seller with stock sitting in Jeddah books a homepage banner for two weeks and a billboard near a mall. Both are ordered from the same screen, paid the same way, and measured against the sales they actually caused.",
    jobs: [
      "Campaign booking for on-site placements and offline media",
      "Budget, schedule and creative approval flow",
      "Performance reporting tied back to real orders",
      "Invoice generation into the revenue engine",
    ],
    talksTo: ["Customer Portal", "Management Portal", "Factory Portal"],
    countries: ["SA", "AE"],
  },
  {
    id: 4,
    name: "Clearance Portal",
    short: "Clearance",
    phase: "hub",
    users: "8 partner customs brokers",
    oneLine: "Where paperwork stops being a mystery.",
    story:
      "A container reaches Jeddah Islamic Port. The job is offered to the eight partner customs companies; the one with the best price and time wins it. Every document, duty payment and inspection note lands in one timeline the customer can watch — with or without onward delivery.",
    jobs: [
      "Broker bidding and assignment for each shipment",
      "Document vault (BOL, invoice, certificate of origin, SABER)",
      "Duty and VAT calculation with payment tracking",
      "Clearance-only or clearance-plus-delivery packages",
    ],
    talksTo: ["Warehouse Portal", "Logistics Portal", "Administration Portal"],
    countries: ["SA"],
  },
  {
    id: 5,
    name: "Warehouse / Hub Portal",
    short: "Warehouse",
    phase: "hub",
    users: "Hub staff & storage customers",
    oneLine: "Where space is sold by the cubic metre, and cheaper in bulk.",
    story:
      "Cleared goods roll into the Jeddah hub. Each pallet gets a location, a barcode and a daily rent. Store more, pay less per unit — the discount is worked out automatically, so nobody argues over the invoice at month end.",
    jobs: [
      "Container handling: unstuffing, palletising, put-away",
      "Bin-level stock locations with barcode scanning",
      "Volume-based storage pricing and automatic discounts",
      "Inbound and outbound gate passes",
    ],
    talksTo: ["Stock Portal", "Clearance Portal", "Logistics Portal"],
    countries: ["SA"],
  },
  {
    id: 6,
    name: "Stock Portal",
    short: "Stock",
    phase: "hub",
    users: "Sellers holding inventory",
    oneLine: "Where ready stock is sold as one bundle: goods + clearance + delivery.",
    story:
      "A buyer does not want to wait 40 days for a sea shipment. This portal shows what is already sitting in Jeddah, today, with a single price that already includes clearing and delivery to their door.",
    jobs: [
      "Live, reserved and available stock counts",
      "Bundled pricing: goods + clearance + last-mile",
      "Low-stock alerts and reorder suggestions",
      "Batch and expiry tracking for regulated goods",
    ],
    talksTo: ["Customer Portal", "Warehouse Portal", "Delivery Portal"],
    countries: ["SA"],
  },
  {
    id: 7,
    name: "Logistics Portal",
    short: "Logistics",
    phase: "logistics",
    users: "Internal logistics teams",
    oneLine: "The control room: who is driving what, and where they are now.",
    story:
      "This one is not for customers. Dispatchers see every truck, every route and every open shipment on one map. If a driver is stuck at a checkpoint, the delay is visible here first — long before the buyer notices.",
    jobs: [
      "Route planning and trip assignment to staff",
      "Live GPS tracking on a shared map",
      "Exception handling: delays, damage, failed pickups",
      "Fleet, fuel and driver duty records",
    ],
    talksTo: ["Delivery Portal", "Warehouse Portal", "Management Portal"],
    countries: ["SA", "AE"],
  },
  {
    id: 8,
    name: "Delivery Service Portal",
    short: "Delivery",
    phase: "logistics",
    users: "Courier partners & end buyers",
    oneLine: "The last mile — inside KSA and across borders.",
    story:
      "One shipping engine sits behind this portal. It asks SMSA, Aramex and DHL for a price at the same time, picks the best one for that parcel, books it, and hands the customer a single tracking page — no matter which courier actually carries the box.",
    jobs: [
      "Multi-courier rate shopping and auto-booking",
      "One tracking page for every carrier",
      "Cash on delivery collection and reconciliation",
      "Proof of delivery, returns and re-attempts",
    ],
    talksTo: ["Customer Portal", "Logistics Portal", "Saudi Export Portal"],
    countries: ["SA", "AE", "EU", "GB", "US"],
  },
  {
    id: 9,
    name: "Customer Portal",
    short: "Customer",
    phase: "market",
    users: "B2B buyers & B2C shoppers",
    oneLine: "The shop front — for a company buying 500 units or a person buying one.",
    story:
      "The same catalogue serves two very different buyers. A shopper sees a normal store with Mada and Apple Pay. A registered business sees bulk tiers, credit terms and a tax invoice. The system decides which face to show based on who logged in.",
    jobs: [
      "Dual B2B / B2C pricing and checkout rules",
      "Credit limits, purchase orders and ZATCA e-invoices",
      "Order history with live shipment tracking",
      "Arabic and English, right-to-left ready",
    ],
    talksTo: ["Stock Portal", "Delivery Portal", "Advertisement Portal"],
    countries: ["SA", "AE"],
  },
  {
    id: 10,
    name: "Saudi Export Portal",
    short: "Export",
    phase: "market",
    users: "Saudi producers selling abroad",
    oneLine: "Saudi products — Oud, abayas, beauty — going out to the world.",
    story:
      "This one runs the flow in reverse. A local Oud maker lists their product, the system prepares export papers and HS codes, prices it in the buyer's currency, and DHL carries it from Jeddah to London or New York.",
    jobs: [
      "Export documentation and HS code assistance",
      "Multi-currency pricing and international checkout",
      "Worldwide courier booking with landed-cost estimates",
      "Made-in-KSA storefronts for local producers",
    ],
    talksTo: ["Delivery Portal", "Administration Portal", "Management Portal"],
    countries: ["SA", "EU", "GB", "US"],
  },
  {
    id: 11,
    name: "Management Portal",
    short: "Management",
    phase: "core",
    users: "Owners & operations leadership",
    oneLine: "The revenue engine — every portal's numbers on one screen.",
    story:
      "Ten portals earn money in ten different ways: commission, storage rent, clearance fees, ad spend, shipping margin. This portal adds it all up in one place and shows what is growing, what is leaking, and where the next riyal should go.",
    jobs: [
      "Revenue by portal, product line and region",
      "Operational KPIs: clearance time, delivery success, stock ageing",
      "Commission and partner payout runs",
      "Alerts when any portal drifts off target",
    ],
    talksTo: ["All 10 operational portals"],
    countries: ["SA"],
  },
  {
    id: 12,
    name: "Administration Portal",
    short: "Administration",
    phase: "core",
    users: "Legal & compliance team",
    oneLine: "Keeps the company registered, legal and audit-ready.",
    story:
      "Licences expire, ministries ask questions, and rules change. This portal holds every company record, every renewal date and every policy version — with a reminder before anything lapses, not after.",
    jobs: [
      "Company registration and licence renewal calendar",
      "Government and ministry filing records",
      "Policy versioning and staff acknowledgement",
      "Full audit trail of who changed what, and when",
    ],
    talksTo: ["Clearance Portal", "Saudi Export Portal", "Management Portal"],
    countries: ["SA"],
  },
];

export const portalsByPhase = (phase: Phase) =>
  portals.filter((p) => p.phase === phase);
