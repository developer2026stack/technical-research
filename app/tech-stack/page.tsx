import type { Metadata } from "next";
import {
  Callout,
  Card,
  Page,
  PageHeader,
  Pill,
  PrevNext,
  Score,
  Section,
  Sub,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Tech Stack" };

type Row = {
  name: string;
  score: number;
  cost: string;
  use: string;
  pick?: boolean;
};

const table = (rows: Row[]) => (
  <Table
    head={["Technology", "Rating", "Cost", "Best use case"]}
    rows={rows.map((r) => [
      <span key="n" className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-text">{r.name}</span>
        {r.pick && <Pill tone="teal">Recommended</Pill>}
      </span>,
      <Score key="s" value={r.score} />,
      r.cost,
      r.use,
    ])}
  />
);

export default function TechStackPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 8"
        title="Tech Stack"
        lede="What we chose, what we scored it, and — more usefully — why. Ratings are out of ten and reflect fit for this project, not general popularity."
      />

      <Section kicker="Summary" title="The short answer">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Frontend", "Next.js + Turborepo", "Twelve apps sharing one UI kit, strong SEO"],
              ["Backend", "NestJS (Node.js)", "TypeScript shared with the frontend, great WebSockets"],
              ["Database", "PostgreSQL + Redis", "Exact money, instant tracking"],
              ["Identity", "Keycloak", "One login and strict roles across twelve portals"],
              ["Payments", "Moyasar + Checkout.com", "Mada and Apple Pay locally, cards worldwide"],
              ["Edge", "Cloudflare + Vercel", "Attack protection and fast delivery near the buyer"],
            ].map(([k, v, why]) => (
              <div key={k} className="rounded-xl border border-line bg-surface-2 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                  {k}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-text">{v}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-dim">{why}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section kicker="Frontend" title="What the twelve portals are built with">
        <p>
          The main question here is not which framework is fastest. It is how twelve
          different portals stay consistent for years without twelve teams. That is a
          monorepo question, and Next.js with Turborepo answers it best.
        </p>
        {table([
          {
            name: "Next.js + Turborepo",
            score: 9.5,
            cost: "High efficiency",
            use: "Recommended. One repository shares code and Tailwind components across all 12 portals. Excellent SEO for the public shops and the export portal.",
            pick: true,
          },
          {
            name: "Nuxt 3 (Vue)",
            score: 9.0,
            cost: "Very high",
            use: "Very fast to build with — the right pick only if the team is already expert in Vue.",
          },
          {
            name: "React + Vite",
            score: 8.5,
            cost: "High",
            use: "Fine for internal admin screens where search engines do not matter.",
          },
        ])}
      </Section>

      <Section kicker="Backend" title="Where the business rules live">
        <p>
          Trade rules are fussy: duty calculations, credit limits, storage discounts. We
          want a framework that keeps that logic organised and a language that matches the
          frontend so an order means the same thing on both sides.
        </p>
        {table([
          {
            name: "NestJS (Node.js)",
            score: 9.5,
            cost: "Very high",
            use: "Recommended. TypeScript end to end, clear structure for many services, and first-class WebSockets for live tracking.",
            pick: true,
          },
          {
            name: "Go (Golang)",
            score: 9.0,
            cost: "High",
            use: "Excellent for heavy data processing and lower server bills — worth adding later for the shipping engine if volume demands it.",
          },
          {
            name: "Python (FastAPI)",
            score: 8.5,
            cost: "High",
            use: "The natural home for AI features: demand forecasting, document reading, price suggestions.",
          },
        ])}
        <Callout tone="ocean" title="One language, two sides">
          Sharing TypeScript between frontend and backend is not a style choice. It means
          the shape of an order is written once. When the backend adds a field, every portal
          that forgets to handle it fails at build time, not in front of a customer.
        </Callout>
      </Section>

      <Section kicker="Data" title="Where information rests">
        {table([
          {
            name: "PostgreSQL",
            score: 9.8,
            cost: "Very high",
            use: "Main database. Orders, invoices and money need strict correctness — this is the only layer allowed to be the truth.",
            pick: true,
          },
          {
            name: "Redis",
            score: 9.5,
            cost: "High",
            use: "Cache and live layer. Essential for real-time stock counts and shipment tracking without hammering PostgreSQL.",
            pick: true,
          },
          {
            name: "MongoDB",
            score: 8.5,
            cost: "High",
            use: "Secondary store for logs, activity trails and anything without a fixed shape.",
          },
        ])}
      </Section>

      <Section kicker="Security" title="Identity and protection">
        {table([
          {
            name: "Keycloak",
            score: 9.5,
            cost: "Free / open source",
            use: "Recommended. Single sign-on plus strict role-based access control across all 12 portals.",
            pick: true,
          },
          {
            name: "Cloudflare",
            score: 9.5,
            cost: "High",
            use: "Web application firewall and DDoS protection in front of everything.",
            pick: true,
          },
          {
            name: "AES-256",
            score: 9.0,
            cost: "High",
            use: "Encryption for stored government documents, contracts and API keys.",
            pick: true,
          },
        ])}
      </Section>

      <Section kicker="Payments" title="Taking money in three markets">
        {table([
          {
            name: "Moyasar",
            score: 9.5,
            cost: "High",
            use: "KSA local. The best API for Mada, STC Pay and Apple Pay — the methods Saudi buyers actually use.",
            pick: true,
          },
          {
            name: "HyperPay",
            score: 9.2,
            cost: "Medium",
            use: "Regional MENA enterprise B2B payments.",
          },
          {
            name: "Checkout.com",
            score: 9.0,
            cost: "High",
            use: "Global export. International cards and multi-currency settlement.",
            pick: true,
          },
        ])}
        <Sub title="Why three and not one">
          <p>
            No single gateway is strong in all three markets. Mada is essential in Saudi
            Arabia and unavailable elsewhere; international cards need a global acquirer.
            Routing is decided by the platform, never by the buyer — details are on the{" "}
            <span className="font-semibold text-text">Integrations</span> page.
          </p>
        </Sub>
      </Section>

      <PrevNext href="/tech-stack" />
    </Page>
  );
}
