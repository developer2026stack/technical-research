import type { Metadata } from "next";
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

export const metadata: Metadata = { title: "Problem & Goals" };

const problems = [
  {
    tone: "violet" as const,
    tag: "Scattered",
    title: "Nothing lives in one place",
    pain: "Sourcing is on WhatsApp, clearance is in email, storage is in a notebook, delivery is on a courier website. Four systems that never speak.",
    fix: "Twelve portals, one login, one database. If it happened to the goods, it is recorded once and visible to everyone who is allowed to see it.",
  },
  {
    tone: "ocean" as const,
    tag: "Complicated",
    title: "Logistics is a black box",
    pain: "A container leaves Shenzhen and disappears for weeks. Nobody can say if the delay is the ship, the port, the broker or the truck.",
    fix: "Every shipment carries a live status from origin to doorstep, with the delay named and the responsible party attached.",
  },
  {
    tone: "gold" as const,
    tag: "Two markets",
    title: "B2B and B2C need different shops",
    pain: "Businesses need bulk tiers, credit terms and tax invoices. Shoppers need Mada, Apple Pay and next-day delivery. Most platforms pick one and annoy the other.",
    fix: "One catalogue, two faces. The system decides which prices, payment methods and documents to show based on who logged in.",
  },
  {
    tone: "teal" as const,
    tag: "Export",
    title: "Saudi products cannot reach the world easily",
    pain: "A small Oud maker in Jeddah has a great product and no idea how to sell it to a buyer in London — papers, currency, courier, all unknown.",
    fix: "A dedicated export portal that prepares documents, prices in the buyer's currency and books a worldwide courier automatically.",
  },
  {
    tone: "rose" as const,
    tag: "Manufacturing",
    title: "New brands cannot find real factories",
    pain: "Anyone can find a factory online. Finding one that is verified, meets your minimum order and actually delivers is the hard part.",
    fix: "A factory portal with verified partners, sample tracking and production milestones backed by photo proof.",
  },
];

export default function ProblemPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 1"
        title="Problem & Goals"
        lede="Five real problems in international trade — described the way the people living with them would describe them — and exactly what this system promises in return."
      />

      <Section kicker="The pain" title="What is broken today">
        <p>
          None of these problems are new. Traders have worked around them for years with
          phone calls and spreadsheets. The cost is not that the work is impossible; the
          cost is that nobody can see it, so nobody can improve it.
        </p>

        <div className="space-y-4">
          {problems.map((p, i) => (
            <Card key={p.title}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-surface-2 text-[12px] font-semibold text-text-dim">
                  {i + 1}
                </span>
                <h3 className="text-[16.5px] font-semibold text-text">{p.title}</h3>
                <Pill tone={p.tone}>{p.tag}</Pill>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-surface-2 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                    The problem
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-soft">
                    {p.pain}
                  </p>
                </div>
                <div
                  className="rounded-lg p-4"
                  style={{ background: `var(--${p.tone}-soft)` }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: `var(--${p.tone})` }}
                  >
                    What we build
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-soft">
                    {p.fix}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker="The goals" title="How we will know it worked">
        <p>
          A goal that cannot be measured is a wish. These are the numbers the Management
          Portal will report from day one, so progress is a fact and not an opinion.
        </p>
        <Table
          head={["Goal", "Measured by", "Target"]}
          rows={[
            ["One source of truth", "Portals sharing the same order record", "12 of 12"],
            ["Faster clearance", "Average days from port arrival to release", "Under 3 days"],
            ["Visible shipments", "Shipments with live status end to end", "Over 95%"],
            ["Delivery success", "First-attempt delivery rate inside KSA", "Over 90%"],
            ["Export growth", "Saudi products shipped abroad each month", "Rising quarter on quarter"],
            ["Trusted stock", "Difference between system stock and shelf stock", "Under 1%"],
          ]}
        />
      </Section>

      <Section kicker="Boundaries" title="What this platform is not">
        <p>
          Being clear about what we are not building protects the budget and the timeline
          just as much as the feature list does.
        </p>
        <Card>
          <Bullets
            items={[
              "Not a shipping line. We book carriers and brokers; we do not own vessels or planes.",
              "Not a customs authority. Brokers file; we organise, track and pay on time.",
              "Not a bank. Payment gateways move the money; we record it, split it and invoice it.",
              "Not a factory. We connect brands to verified factories and watch the milestones.",
            ]}
          />
        </Card>
        <Callout tone="teal" title="The honest summary">
          This platform sells coordination. The goods, the ships and the money belong to
          other people — the value we add is that all of them finally show up in the same
          place, at the same time, with the same numbers.
        </Callout>
      </Section>

      <PrevNext href="/problem" />
    </Page>
  );
}
