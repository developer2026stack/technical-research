import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/diagrams";
import {
  Bullets,
  Callout,
  Card,
  Figure,
  Page,
  PageHeader,
  PrevNext,
  Section,
  Sub,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Architecture" };

export default function ArchitecturePage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 4"
        title="Architecture"
        lede="What runs where, and how the pieces talk to each other. Read it top to bottom: a request starts with a person and ends at a database."
      />

      <Section kicker="The stack, drawn" title="Six layers, one request">
        <p>
          Every layer below has one job and can be made bigger on its own. If Black Friday
          doubles the shoppers, we add frontend capacity — the warehouse services do not
          care.
        </p>
        <Figure
          title="Figure 4 — System architecture"
          caption="Clients → edge → frontend apps → identity and gateway → backend services → data. Nothing skips a layer."
        >
          <ArchitectureDiagram />
        </Figure>
      </Section>

      <Section kicker="Layer by layer" title="Why each layer looks like this">
        <Sub title="1 · The edge — Cloudflare and Vercel">
          <p>
            The first thing any request meets is Cloudflare: it drops bad traffic, absorbs
            attacks and caches images close to the user. What survives goes to Vercel, which
            serves all twelve apps from servers near the buyer — Jeddah, Dubai, London.
          </p>
        </Sub>

        <Sub title="2 · The frontend — one monorepo, twelve apps">
          <p>
            All twelve portals live in a single repository managed by Turborepo. They share
            one design system, one component library and one set of API types. Build a
            table once; every portal gets it.
          </p>
          <Callout tone="ocean" title="The rule that keeps this cheap">
            If a portal needs something the shared kit does not have, it goes into the
            shared kit — not into that portal. This is the difference between one product
            with twelve faces and twelve products nobody can maintain.
          </Callout>
        </Sub>

        <Sub title="3 · The door check — Keycloak and the API gateway">
          <p>
            One login works across all twelve portals, and each person carries roles that
            decide what they can see. A customs broker sees their own shipments and nothing
            else. A warehouse clerk can move stock but cannot change a price. The gateway
            also rate-limits partners so one noisy integration cannot slow the platform.
          </p>
        </Sub>

        <Sub title="4 · The backend — small NestJS services">
          <p>
            Instead of one giant application, the backend is a set of focused services that
            each own one part of the business. They are written in TypeScript, the same
            language as the frontend, so an order shape is defined once and used everywhere.
          </p>
          <Table
            head={["Service", "Owns", "Talks to"]}
            rows={[
              ["Sourcing & RFQ", "Suppliers, quotes, factory briefs", "Supplier, Factory portals"],
              ["Clearance", "Broker bids, documents, duty", "Customs partners, Administration"],
              ["Warehouse & stock", "Locations, movements, rent", "Warehouse, Stock portals"],
              ["Orders & pricing", "Carts, B2B tiers, credit terms", "Customer, Export portals"],
              ["Shipping engine", "Rates, bookings, tracking", "SMSA, Aramex, DHL"],
              ["Payments & invoicing", "Charges, refunds, ZATCA invoices", "Moyasar, HyperPay, Checkout.com"],
              ["Tracking", "Live positions over WebSocket", "Logistics, Customer portals"],
              ["Reporting", "Revenue, KPIs, alerts", "Management Portal"],
            ]}
          />
        </Sub>

        <Sub title="5 · The data — the right store for the right job">
          <p>
            PostgreSQL holds anything that must be exactly right: orders, invoices, stock
            counts and money. Redis holds anything that must be instant: live stock numbers
            and shipment positions. MongoDB collects logs and activity. Documents and photos
            sit in object storage, encrypted.
          </p>
          <Card>
            <Bullets
              items={[
                "PostgreSQL is the single source of truth — everything else can be rebuilt from it.",
                "Redis is a cache, never a record. If Redis is emptied, the platform still works, just slower.",
                "Every document is encrypted at rest with AES-256 and reachable only through a signed, expiring link.",
                "Backups run daily with point-in-time recovery, and restores are tested — not assumed.",
              ]}
            />
          </Card>
        </Sub>

        <Sub title="6 · The same six layers, in four regions">
          <p>
            Everything above describes one region. In production the whole stack runs in
            four: Saudi Arabia as the write primary, plus Dubai, Frankfurt and Hong Kong for
            local reads. The edge layer decides which one answers, and the class of the data
            decides which one is allowed to hold it — the full design is on the{" "}
            <Link
              href="/multi-region"
              className="font-semibold text-ocean underline underline-offset-2"
            >
              Multi-Region
            </Link>{" "}
            page.
          </p>
        </Sub>
      </Section>

      <Section kicker="Trade-offs" title="Decisions we made on purpose">
        <Table
          head={["Decision", "Why", "What it costs us"]}
          rows={[
            [
              "Monorepo instead of 12 repositories",
              "Shared UI and types; one change fixes every portal",
              "Build tooling must be set up properly on day one",
            ],
            [
              "TypeScript on both sides",
              "The same order shape front and back; fewer integration bugs",
              "The team must be strong in TypeScript, not just JavaScript",
            ],
            [
              "Services, not one big app",
              "Clearance can be scaled or replaced without touching checkout",
              "More moving parts to monitor",
            ],
            [
              "Our own shipping engine",
              "Couriers can be added or dropped without touching any portal",
              "We maintain three adapters instead of using one reseller",
            ],
            [
              "One write primary, many read replicas",
              "Simple, correct data with fast local reads in every region",
              "Writes from far regions pay one round trip to Saudi Arabia",
            ],
            [
              "Money stored as minor units plus currency and rate",
              "Refunds, reports and audits still add up years later",
              "Every developer must handle money objects, never plain numbers",
            ],
            [
              "Keycloak instead of custom auth",
              "Proven SSO and role control across twelve portals, free to license",
              "A server to run and upgrade ourselves",
            ],
          ]}
        />
      </Section>

      <PrevNext href="/architecture" />
    </Page>
  );
}
