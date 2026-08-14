import type { Metadata } from "next";
import { RoadmapDiagram } from "@/components/diagrams";
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
  Stat,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Build Roadmap" };

const phases = [
  {
    n: 1,
    name: "Foundation",
    months: "Month 1 – 2",
    tone: "ocean" as const,
    goal: "Nothing visible to customers. Everything that makes the next four phases fast.",
    items: [
      "Monorepo, CI/CD and preview deployments on Vercel",
      "Design system and shared component library",
      "Keycloak with roles for every portal defined up front",
      "PostgreSQL schema for orders, stock, shipments and documents",
    ],
    done: "A staff member can log in once and reach an empty version of any portal.",
  },
  {
    n: 2,
    name: "Hub first",
    months: "Month 2 – 5",
    tone: "violet" as const,
    goal: "Turn the Jeddah hub into a paid service before any shop exists.",
    items: [
      "Clearance Portal with broker bidding and a document vault",
      "Warehouse Portal with barcode put-away and volume pricing",
      "Stock Portal showing what is available today",
      "Administration Portal for licences and filings",
    ],
    done: "A real container is cleared, stored and invoiced entirely inside the platform.",
  },
  {
    n: 3,
    name: "Money flowing",
    months: "Month 4 – 8",
    tone: "gold" as const,
    goal: "Open the shop to both markets and start taking payments.",
    items: [
      "Customer Portal with B2B tiers and B2C checkout",
      "Moyasar for Mada, STC Pay and Apple Pay",
      "ZATCA-compliant invoicing",
      "Arabic and English, right to left",
    ],
    done: "First paid retail order, delivered and invoiced without manual work.",
  },
  {
    n: 4,
    name: "Moving goods",
    months: "Month 7 – 10",
    tone: "teal" as const,
    goal: "Take control of the last mile instead of renting it.",
    items: [
      "Shipping engine with SMSA, Aramex and DHL adapters",
      "One tracking page for every carrier",
      "Logistics Portal with live map and exception handling",
      "Cash on delivery reconciliation",
    ],
    done: "90% of shipments booked automatically, with no one copying tracking numbers by hand.",
  },
  {
    n: 5,
    name: "Reach out",
    months: "Month 9 – 12",
    tone: "rose" as const,
    goal: "Grow beyond the Kingdom and turn the data into decisions.",
    items: [
      "Saudi Export Portal with documents and multi-currency pricing",
      "Factory Portal for private-label production",
      "Advertisement Portal for on-site and offline campaigns",
      "Management Portal reporting across all revenue streams",
    ],
    done: "Saudi products shipped abroad, and every portal's profit visible on one screen.",
  },
];

export default function RoadmapPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 12"
        title="Build Roadmap"
        lede="Twelve portals cannot be launched on the same day, and they should not be. This is the order that earns money soonest and carries the least risk."
      />

      <Section kicker="The plan" title="Five phases over twelve months">
        <Figure
          title="Figure 12 — Delivery roadmap"
          caption="Phases overlap on purpose: while one team is finishing the hub, another is already starting the shop."
        >
          <RoadmapDiagram />
        </Figure>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value="12" label="Months to all 12 portals" tone="ocean" />
          <Stat value="M5" label="First invoice from the hub" tone="violet" />
          <Stat value="M8" label="First retail revenue" tone="gold" />
          <Stat value="M10" label="Last mile under our control" tone="teal" />
        </div>
      </Section>

      <Section kicker="Phase by phase" title="What gets built, and how we know it is done">
        <div className="space-y-4">
          {phases.map((p) => (
            <Card key={p.n}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-xl text-[14px] font-bold"
                    style={{ color: `var(--${p.tone})`, background: `var(--${p.tone}-soft)` }}
                  >
                    {p.n}
                  </span>
                  <h3 className="text-[18px] font-semibold tracking-tight text-text">
                    {p.name}
                  </h3>
                </div>
                <Pill tone={p.tone}>{p.months}</Pill>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">{p.goal}</p>
              <div className="mt-4">
                <Bullets items={p.items} />
              </div>
              <div
                className="mt-4 rounded-lg px-4 py-3"
                style={{ background: `var(--${p.tone}-soft)` }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: `var(--${p.tone})` }}
                >
                  Done means
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-text-soft">{p.done}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker="Order of work" title="Why the hub comes before the shop">
        <p>
          The instinct is to build the shop first, because it is the part everyone can
          picture. We build the hub first because it is the part that gets paid first.
        </p>
        <Callout tone="gold" title="The commercial logic">
          Clearance and storage earn on the very first container, from customers who already
          exist. A marketplace earns nothing until it has both stock and shoppers — two hard
          problems at once. Building the hub first funds the shop and fills it with stock.
        </Callout>
      </Section>

      <Section kicker="Parallel tracks" title="Three things that run through every phase">
        <p>
          Regions, currencies and ISO evidence are not phases of their own. They are threads
          woven through all five, because each of them touches the database schema — and a
          schema is the one thing that is genuinely expensive to change later.
        </p>
        <Table
          head={["Track", "Phase 1–2", "Phase 3–4", "Phase 5"]}
          rows={[
            [
              <span key="r" className="font-semibold text-text">Multi-region</span>,
              "KSA primary plus a standby zone; data classes declared in every migration",
              "GCC read replica for supplier and logistics screens",
              "Europe and Asia regions added for export buyers and factories",
            ],
            [
              <span key="c" className="font-semibold text-text">Multi-currency</span>,
              "Money stored as minor units + currency + rate from the very first table",
              "SAR and AED live; FX snapshots, rounding rules and locked checkout rates",
              "USD, EUR and GBP for export; supplier payables in CNY",
            ],
            [
              <span key="i" className="font-semibold text-text">ISO evidence</span>,
              "Audit log, RBAC and backups in place; gap analysis at month 3",
              "Management system operating: risk register, access reviews, DR drills",
              "Internal audit, Stage 1 and Stage 2 certification for ISO 27001",
            ],
          ]}
        />
        <Callout tone="violet" title="Cheap now, painful later">
          Adding a currency column to a live orders table means reprocessing every historical
          invoice. Adding data residency after launch means migrating personal records out of
          three regions. Both are a week of design now, or a quarter of rework later.
        </Callout>
      </Section>

      <Section kicker="Risks" title="What could go wrong, and the plan for it">
        <Table
          head={["Risk", "Why it hurts", "How we handle it"]}
          rows={[
            [
              "Customs and government APIs are slow or unreliable",
              "Clearance is on the critical path for every import",
              "Queue and retry everything; keep a manual entry path so work never stops",
            ],
            [
              "Twelve portals stretch the team thin",
              "Quality drops and portals drift apart",
              "One shared component kit and a strict build order — never two new portals at once",
            ],
            [
              "Courier APIs change without notice",
              "Bookings and tracking break silently",
              "Adapters behind one engine, contract tests running daily, automatic fallback carrier",
            ],
            [
              "Stock in the system does not match the shelf",
              "Overselling destroys trust faster than anything else",
              "Barcode scanning on every movement, cycle counts, and reservations instead of raw counts",
            ],
            [
              "Currency rates move between display and settlement",
              "Export margins quietly disappear on volatile weeks",
              "A buffer on the daily rate, rates locked at checkout, and FX difference tracked in its own account",
            ],
            [
              "Data residency rules tighten",
              "Personal records in the wrong region become a legal problem overnight",
              "Data classes enforced in every migration, so residency is a configuration change and not a rewrite",
            ],
            [
              "Compliance changes mid-build",
              "Rework at the worst possible time",
              "Invoicing and document handling kept in one service, so a rule change is one change",
            ],
          ]}
        />
      </Section>

      <PrevNext href="/roadmap" />
    </Page>
  );
}
