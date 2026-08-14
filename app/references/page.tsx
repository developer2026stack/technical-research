import type { Metadata } from "next";
import { Flag, type CountryCode } from "@/components/flags";
import {
  Bullets,
  Callout,
  Card,
  Page,
  PageHeader,
  Pill,
  PrevNext,
  Section,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Reference Projects" };

const refs = [
  {
    name: "Flexport",
    country: "US" as CountryCode,
    tag: "Global freight forwarder",
    tone: "ocean" as const,
    what: "A digital freight forwarder that moves containers worldwide and shows the whole journey in one dashboard.",
    steal: [
      "Their shipment timeline: one vertical story per container, with documents attached at the step where they were needed.",
      "How they show exceptions — a delay is stated in plain words with a cause and an owner, not a red icon.",
      "Landed cost breakdown: freight, duty and fees shown together so a buyer knows the real price.",
    ],
    mirrors: "Our Clearance and Logistics portals",
  },
  {
    name: "Forto",
    country: "DE" as CountryCode,
    tag: "European digital logistics",
    tone: "violet" as const,
    what: "A European platform whose supplier management and customs flow is very close to what this project needs.",
    steal: [
      "Supplier onboarding: documents requested once, verified, and reused on every future shipment.",
      "Booking flow that asks only what it needs at each step instead of one huge form.",
      "Clear separation between what the customer sees and what the operations team sees.",
    ],
    mirrors: "Our Supplier and Clearance portals",
  },
  {
    name: "Salasa / Zid Ship",
    country: "SA" as CountryCode,
    tag: "KSA fulfilment",
    tone: "gold" as const,
    what: "Local Saudi fulfilment and logistics networks that already solved the Saudi-specific problems.",
    steal: [
      "Mada-first checkout and cash on delivery handled as a normal case, not an edge case.",
      "Arabic-first interface design where right-to-left is the default, not a translation layer.",
      "Local customs integration patterns and realistic delivery promises by region.",
    ],
    mirrors: "Our Customer, Stock and Delivery portals",
  },
];

export default function ReferencesPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 13"
        title="Reference Projects"
        lede="Three platforms worth studying before we draw a single screen. Two show how global logistics should feel; one shows what Saudi buyers already expect."
      />

      <Section kicker="Why look at all" title="Copying homework, carefully">
        <p>
          Every one of these companies has already paid for the mistakes we would otherwise
          make: how to show a delayed container, how to onboard a supplier without a
          twenty-field form, how to make cash on delivery feel normal. Studying them is the
          cheapest research available.
        </p>
        <p>
          The goal is not to look like them. It is to understand which decisions they made
          twice — because those are the ones that were hard.
        </p>
      </Section>

      <Section kicker="The three" title="What to take from each">
        <div className="space-y-4">
          {refs.map((r) => (
            <Card key={r.name}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2.5 text-[19px] font-semibold tracking-tight text-text">
                  <Flag code={r.country} size={26} />
                  {r.name}
                </h3>
                <Pill tone={r.tone}>{r.tag}</Pill>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">{r.what}</p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                Worth borrowing
              </p>
              <div className="mt-2.5">
                <Bullets items={r.steal} />
              </div>
              <p className="mt-4 text-[13px] text-text-dim">
                Closest to:{" "}
                <span className="font-semibold" style={{ color: `var(--${r.tone})` }}>
                  {r.mirrors}
                </span>
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker="Side by side" title="Where each one is strongest">
        <Table
          head={["", "Flexport", "Forto", "Salasa / Zid Ship"]}
          rows={[
            ["Live tracking", "Excellent", "Good", "Good"],
            ["Document handling", "Excellent", "Excellent", "Basic"],
            ["Supplier onboarding", "Good", "Excellent", "—"],
            ["Local KSA payments", "—", "—", "Excellent"],
            ["Arabic / RTL design", "—", "—", "Excellent"],
            ["Warehouse and fulfilment", "Good", "Good", "Excellent"],
          ]}
        />
        <Callout tone="ocean" title="The gap we are filling">
          Flexport and Forto move goods brilliantly but do not sell them. Salasa and Zid Ship
          serve Saudi sellers brilliantly but do not source from China. This platform is the
          two halves joined — sourcing through to market, in one place.
        </Callout>
      </Section>

      <PrevNext href="/references" />
    </Page>
  );
}
