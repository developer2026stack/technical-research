import type { Metadata } from "next";
import { RegionDiagram } from "@/components/diagrams";
import { Flag } from "@/components/flags";
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
  Steps,
  Sub,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Multi-Region" };

export default function MultiRegionPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 6"
        title="Multi-Region"
        lede="This platform serves a shopper in Riyadh, a factory in Shenzhen and a boutique in London — on the same afternoon. It has to feel local to all three, while keeping Saudi data inside Saudi Arabia."
      />

      <Section kicker="The tension" title="Two demands that pull in opposite directions">
        <p>
          Speed says: put everything close to the user. Law says: keep Saudi personal and
          financial data in the Kingdom. You cannot obey both by copying everything
          everywhere, and you cannot obey both by keeping everything in one place.
        </p>
        <p>
          So we split the problem. <strong className="text-text">What you can see</strong>{" "}
          — the catalogue, product photos, prices — travels the world and is cached near
          every buyer. <strong className="text-text">What identifies or bills you</strong> —
          names, addresses, invoices, licences, customs papers — never leaves the KSA
          region.
        </p>
        <Callout tone="ocean" title="The rule in one line">
          Reads are served from the nearest region. Writes always travel home to the Saudi
          primary. Nothing about a person is copied outside the Kingdom.
        </Callout>
      </Section>

      <Section kicker="The shape" title="Four regions, one primary">
        <Figure
          title="Figure 6 — Multi-region topology"
          caption="Each region runs the portals its users actually need, with a local cache and a read-only copy of what it is allowed to hold. Only the KSA region accepts writes."
        >
          <RegionDiagram />
        </Figure>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value="4" label="Active regions" tone="ocean" />
          <Stat value="1" label="Write primary (KSA)" tone="violet" />
          <Stat value="<150ms" label="Page response target, any region" tone="teal" />
          <Stat value="0" label="Personal records outside KSA" tone="rose" />
        </div>

        <Table
          head={["Region", "Why it exists", "What runs there", "What data it may hold"]}
          rows={[
            [
              <span key="a" className="flex items-center gap-2 font-semibold text-text">
                <Flag code="SA" size={22} /> KSA — Riyadh / Jeddah
              </span>,
              "Home. Every buyer, every invoice, every customs file.",
              "All 12 portals, all services",
              "Everything, including personal and financial records",
            ],
            [
              <span key="b" className="flex items-center gap-2 font-semibold text-text">
                <Flag code="AE" size={22} /> GCC — Dubai
              </span>,
              "Sourcing partners and cross-border logistics sit here.",
              "Supplier and Logistics portals",
              "Operational data (shipments, stock) — no personal records",
            ],
            [
              <span key="c" className="flex items-center gap-2 font-semibold text-text">
                <Flag code="EU" size={22} />
                <Flag code="GB" size={22} /> Europe — Frankfurt
              </span>,
              "Export buyers in the EU and UK need a fast shop.",
              "Saudi Export Portal, public catalogue",
              "Catalogue and prices only",
            ],
            [
              <span key="d" className="flex items-center gap-2 font-semibold text-text">
                <Flag code="CN" size={22} />
                <Flag code="HK" size={22} /> Asia — Hong Kong
              </span>,
              "Factories and suppliers work at the other end of the day.",
              "Supplier and Factory portals",
              "Catalogue, quotes and RFQs",
            ],
          ]}
        />
      </Section>

      <Section kicker="Data classes" title="What is allowed to travel">
        <p>
          Every table and every document in the system carries a class. The class — not the
          developer — decides where a copy is allowed to exist. This is checked in code
          review and enforced in the replication configuration.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <Pill tone="teal">Class 1 · Public</Pill>
            <p className="mt-3 text-[15px] font-semibold text-text">Travels anywhere</p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              Product listings, photos, public prices, shipping estimates. Cached at every
              edge location on earth.
            </p>
          </Card>
          <Card>
            <Pill tone="ocean">Class 2 · Operational</Pill>
            <p className="mt-3 text-[15px] font-semibold text-text">Regional replicas</p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              Shipment status, stock counts, supplier quotes. Replicated read-only to GCC
              and Asia so staff screens are fast.
            </p>
          </Card>
          <Card>
            <Pill tone="rose">Class 3 · Restricted</Pill>
            <p className="mt-3 text-[15px] font-semibold text-text">KSA only, always</p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              Names, addresses, payment records, invoices, trade licences, customs
              documents. Never replicated, never cached outside.
            </p>
          </Card>
        </div>
      </Section>

      <Section kicker="A request in motion" title="What actually happens when a buyer in London clicks">
        <Steps
          items={[
            {
              title: "The edge answers first",
              body: "Cloudflare and Vercel serve the page shell, images and catalogue from Frankfurt. Nothing has travelled to Saudi Arabia yet, and the page is already visible.",
            },
            {
              title: "Local reads stay local",
              body: "Product details and stock availability come from the Frankfurt read replica — milliseconds away instead of a round trip to the Gulf.",
            },
            {
              title: "Checkout crosses the border",
              body: "The moment she enters a name and address, the request is routed to the KSA region. That data is written once, in Riyadh, and stays there.",
            },
            {
              title: "The invoice is born in KSA",
              body: "Payment, ZATCA invoice and customer record all live in the Saudi primary. Frankfurt only ever learns that an order exists, not who placed it.",
            },
            {
              title: "Replication catches up",
              body: "Operational facts — order shipped, tracking number — flow back out to the regions within a second or two, which is far faster than any parcel moves.",
            },
          ]}
        />
      </Section>

      <Section kicker="When a region dies" title="Failover, and what we promise">
        <p>
          Regions do fail. Cloud providers lose availability zones, cables get cut, and
          somebody eventually deploys something bad on a Friday. The question is not whether
          it happens but what the user sees when it does.
        </p>
        <Table
          head={["What fails", "What the user sees", "Recovery target"]}
          rows={[
            [
              "One edge location",
              "Nothing. Traffic moves to the next nearest location automatically.",
              "Seconds, automatic",
            ],
            [
              "A secondary region (GCC, EU, Asia)",
              "Slightly slower pages — that region's traffic is served from KSA.",
              "Under 1 minute, automatic",
            ],
            [
              "The KSA primary database",
              "A short read-only window: browsing works, checkout pauses.",
              "RTO under 15 minutes, RPO under 1 minute",
            ],
            [
              "A whole cloud region",
              "Standby promoted in the second Saudi availability zone.",
              "RTO under 1 hour, tested quarterly",
            ],
          ]}
        />
        <Callout tone="teal" title="Tested, not assumed">
          Failover is rehearsed on a schedule and the results are written down. That test
          report is also the evidence ISO 22301 asks for — see the{" "}
          <span className="font-semibold text-text">ISO Compliance</span> page.
        </Callout>
      </Section>

      <Section kicker="Guardrails" title="Rules that keep this from rotting">
        <Card>
          <Bullets
            items={[
              "One primary. Multi-master sounds attractive and creates conflicts nobody can resolve at 3am.",
              "Replicas are read-only by configuration, not by convention — a stray write fails loudly.",
              "Every new table declares its data class in the migration, or the migration does not merge.",
              "Region is never hard-coded in a portal; the platform routes, the app just asks.",
              "Backups are stored in the Kingdom, encrypted, and restore drills are scheduled like any other release.",
              "Latency budgets are monitored per region, so a slow replica is a visible alert, not a customer complaint.",
            ]}
          />
        </Card>
        <Sub title="What this costs">
          <p>
            Four regions cost more than one — roughly the price of the extra replicas and
            caches, since the edge layer is priced by traffic and not by location. In return,
            an export buyer in London gets a shop that feels local, and a regulator in Riyadh
            gets a straight answer about where the data lives. Both are worth more than the
            server bill.
          </p>
        </Sub>
      </Section>

      <PrevNext href="/multi-region" />
    </Page>
  );
}
