import type { Metadata } from "next";
import Link from "next/link";
import { JourneyDiagram } from "@/components/diagrams";
import { Flag, type CountryCode } from "@/components/flags";
import {
  Bullets,
  Callout,
  Card,
  Figure,
  Page,
  PageHeader,
  Pill,
  PrevNext,
  Section,
  Steps,
} from "@/components/ui";
import { phaseMeta, portalsByPhase, type Phase } from "@/lib/portals";

export const metadata: Metadata = { title: "How It Works" };

const story: Record<Exclude<Phase, "core">, { headline: string; text: string[] }> = {
  sourcing: {
    headline: "It starts with a price, not a product",
    text: [
      "A buying manager in Jeddah needs 5,000 glass bottles. She opens the Supplier Portal and sees the same bottle offered by four verified suppliers — two in Guangzhou, one in Hong Kong, one in Dubai — with price, minimum order and lead time side by side.",
      "If she wanted her own brand on those bottles instead, she would use the Factory Portal: post the design, get samples, agree a price, and watch production move through milestones with photos at each stage.",
      "Once the goods exist, the Advertisement Portal starts making people want them — a banner on the platform, a billboard near a mall, both booked and measured from one screen.",
    ],
  },
  hub: {
    headline: "Then the paperwork stops being scary",
    text: [
      "The container reaches Jeddah Islamic Port. The Clearance Portal offers the job to eight partner customs companies; the best price and time wins it. Every document, duty payment and inspection note lands in one timeline the customer can watch.",
      "After release, goods roll into the hub. The Warehouse Portal gives each pallet a location, a barcode and a daily rent — the more space you take, the cheaper each unit becomes, calculated automatically.",
      "What is already in the hub becomes sellable immediately through the Stock Portal, priced as one bundle: goods plus clearance plus delivery. A buyer who cannot wait 40 days for the sea can buy today.",
    ],
  },
  logistics: {
    headline: "Then it moves, and everyone can see it move",
    text: [
      "The Logistics Portal is the control room. It belongs to staff, not customers. Dispatchers see every truck, every route and every open shipment on a shared map, and delays show up here before the buyer notices them.",
      "The Delivery Service Portal handles the last mile. Behind it sits one shipping engine that asks SMSA, Aramex and DHL for a price at the same time, picks the right one for that parcel, and hands the customer a single tracking page.",
    ],
  },
  market: {
    headline: "And finally, somebody buys it",
    text: [
      "The Customer Portal is the shop front for both markets. A shopper sees a normal store with Mada and Apple Pay. A registered business sees bulk tiers, credit terms and a proper tax invoice. Same catalogue, two faces.",
      "The Saudi Export Portal runs the whole flow in reverse: a local Oud maker lists a product, the system prepares export papers and HS codes, prices it in the buyer's currency, and DHL carries it from Jeddah to London or New York.",
    ],
  },
};

const order: Exclude<Phase, "core">[] = ["sourcing", "hub", "logistics", "market"];

const phaseFlags: Record<Exclude<Phase, "core">, CountryCode[]> = {
  sourcing: ["CN", "HK", "AE"],
  hub: ["SA"],
  logistics: ["SA", "AE"],
  market: ["SA", "EU", "GB", "US"],
};

export default function FlowPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 2"
        title="How It Works"
        lede="Follow the goods. This page walks the full Sourcing-to-Market road once, in plain language, and shows which portal is doing the work at each step."
      />

      <Section kicker="The whole road" title="One picture to keep in mind">
        <p>
          Before the detail, here is the shape of the entire platform. Four phases, twelve
          portals, one direction of travel.
        </p>
        <Figure
          title="Figure 1 — Sourcing-to-Market flow"
          caption="Goods move left to right. Information travels back the other way, which is how the platform gets smarter over time."
        >
          <JourneyDiagram />
        </Figure>
      </Section>

      {order.map((phase, i) => {
        const meta = phaseMeta[phase];
        const list = portalsByPhase(phase);
        const tone = phase === "sourcing" ? "violet" : phase === "hub" ? "ocean" : phase === "logistics" ? "teal" : "gold";
        return (
          <Section key={phase} kicker={meta.label} title={story[phase].headline}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5">
                {phaseFlags[phase].map((f) => (
                  <Flag key={f} code={f} size={22} />
                ))}
              </span>
              <Pill tone={tone}>{meta.where}</Pill>
              <Pill tone="ocean">{`${list.length} portal${list.length > 1 ? "s" : ""}`}</Pill>
            </div>
            {story[phase].text.map((t) => (
              <p key={t.slice(0, 30)}>{t}</p>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              {list.map((p) => (
                <Link
                  key={p.id}
                  href={`/portals#portal-${p.id}`}
                  className="group rounded-xl border border-line bg-surface p-4 transition hover:border-ocean"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                    Portal {p.id}
                  </p>
                  <p className="mt-1 text-[14.5px] font-semibold text-text group-hover:text-ocean">
                    {p.short}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-dim">
                    {p.oneLine}
                  </p>
                </Link>
              ))}
            </div>
            {i === 1 && (
              <Callout tone="ocean" title="Why the hub is the heart">
                Phase 2 is where the platform earns its keep. Clearance and storage are paid
                services from the very first container — long before a single retail order
                exists. Everything else is built on top of that cash flow.
              </Callout>
            )}
          </Section>
        );
      })}

      <Section kicker="Core operations" title="The two portals nobody sees">
        <p>
          Ten portals touch goods. Two do not. The{" "}
          <strong className="text-text">Management Portal</strong> is the revenue engine: it
          adds up commission, storage rent, clearance fees, ad spend and shipping margin,
          and shows what is growing and what is leaking. The{" "}
          <strong className="text-text">Administration Portal</strong> keeps the company
          registered, licensed and compliant with the ministry — with a reminder before
          anything expires, not after.
        </p>
        <Card>
          <Bullets
            items={[
              "Management Portal: revenue by portal, region and product line, plus operational KPIs and partner payouts.",
              "Administration Portal: licences, government filings, policy versions and a full audit trail of every change.",
            ]}
          />
        </Card>
      </Section>

      <Section kicker="In short" title="The whole platform in eight steps">
        <Steps
          items={[
            { title: "Compare and buy", body: "Suppliers across China, Hong Kong and the UAE quote the same product; the best offer wins." },
            { title: "Brand it (optional)", body: "A private-label brief goes to a verified factory, with samples and production milestones." },
            { title: "Ship to Jeddah", body: "Goods travel by sea or air; the shipment is tracked from the moment it leaves the supplier." },
            { title: "Clear customs", body: "Eight partner brokers bid; documents, duty and inspections live in one timeline." },
            { title: "Store it", body: "Pallets are scanned into the hub, rent is charged by volume, and discounts apply automatically." },
            { title: "Sell it", body: "Stock becomes sellable to businesses and shoppers, priced with clearance and delivery included." },
            { title: "Deliver it", body: "The shipping engine picks SMSA, Aramex or DHL and gives the buyer one tracking page." },
            { title: "Count it", body: "Cash, proof of delivery and delays flow back to the Management Portal, which prices the next round better." },
          ]}
        />
      </Section>

      <PrevNext href="/flow" />
    </Page>
  );
}
