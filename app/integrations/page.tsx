import type { Metadata } from "next";
import { PaymentDiagram, ShippingEngineDiagram } from "@/components/diagrams";
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
  MoneyTag,
  Sub,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Integrations" };

export default function IntegrationsPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 9"
        title="Integrations"
        lede="The platform does not carry parcels or hold money. It talks to the companies that do — couriers, payment gateways, customs systems — and hides all of that from the person using it."
      />

      <Section kicker="Couriers" title="One shipping engine, three networks">
        <p>
          Instead of building against SMSA, then Aramex, then DHL separately inside every
          portal, we build one internal shipping engine. Portals ask it for a shipment; it
          decides who carries it.
        </p>
        <Figure
          title="Figure 8 — The shipping engine"
          caption="Rates are requested in parallel. The winner is booked, and every carrier's status codes are translated into one shared language."
        >
          <ShippingEngineDiagram />
        </Figure>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <div className="flex items-center justify-between gap-2">
              <Pill tone="teal">KSA domestic</Pill>
              <Flag code="SA" size={24} />
            </div>
            <p className="mt-3 text-[15px] font-semibold text-text">SMSA Express</p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              Local B2C and B2B delivery across every region of Saudi Arabia, including cash
              on delivery — still a large share of Saudi orders.
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between gap-2">
              <Pill tone="teal">GCC</Pill>
              <span className="inline-flex gap-1.5">
                <Flag code="AE" size={24} />
                <Flag code="SA" size={24} />
              </span>
            </div>
            <p className="mt-3 text-[15px] font-semibold text-text">Aramex</p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              Cross-border movement around the Gulf and wider Middle East, used heavily on
              the sourcing side from the UAE.
            </p>
          </Card>
          <Card>
            <div className="flex items-center justify-between gap-2">
              <Pill tone="teal">Worldwide</Pill>
              <span className="inline-flex gap-1.5">
                <Flag code="CN" size={24} />
                <Flag code="EU" size={24} />
                <Flag code="US" size={24} />
              </span>
            </div>
            <p className="mt-3 text-[15px] font-semibold text-text">DHL / FedEx</p>
            <p className="mt-2 text-[14px] leading-relaxed text-text-soft">
              Premium express both ways: China to Jeddah on import, and Jeddah to the world
              for the Saudi Export Portal.
            </p>
          </Card>
        </div>

        <Sub title="What the engine actually standardises">
          <Card>
            <Bullets
              items={[
                "Rates: one request shape, three answers, compared on landed price and delivery time.",
                "Labels: every carrier's label is stored the same way and printed from the same screen.",
                "Tracking: 40+ different carrier status codes are mapped to 8 states the buyer understands.",
                "Failures: if a carrier's API is down, the engine books the next best one instead of failing the order.",
                "Cash on delivery: collections are reconciled against orders automatically, per carrier, per day.",
              ]}
            />
          </Card>
        </Sub>

        <Callout tone="ocean" title="The test of a good integration layer">
          Adding a fourth courier should be one adapter and zero changes to any portal. If
          it is not, the abstraction was drawn in the wrong place.
        </Callout>
      </Section>

      <Section kicker="Payments" title="Three gateways, one checkout">
        <p>
          The buyer sees the payment methods they trust. Behind the screen, the platform
          picks the gateway that is cheapest and most reliable for that country and that
          kind of buyer.
        </p>
        <Figure
          title="Figure 9 — Payment routing"
          caption="Routing is decided by country and buyer type. Whatever gateway is used, one ledger entry and one ZATCA-format invoice come out the other side."
        >
          <PaymentDiagram />
        </Figure>
        <Table
          head={["Gateway", "Used for", "Settles in", "Methods"]}
          rows={[
            [
              <span key="m" className="flex items-center gap-2 font-semibold text-text">
                <Flag code="SA" size={22} /> Moyasar
              </span>,
              "Saudi retail and small business",
              <MoneyTag key="s" symbol="\uFDFC" code="SAR" />,
              "Mada, STC Pay, Apple Pay, local cards",
            ],
            [
              <span key="h" className="flex items-center gap-2 font-semibold text-text">
                <Flag code="AE" size={22} /> HyperPay
              </span>,
              "MENA enterprise B2B",
              <MoneyTag key="s" symbol="\u062f.\u0625" code="AED" />,
              "Regional cards, invoicing, instalments",
            ],
            [
              <span key="c" className="flex flex-wrap items-center gap-2 font-semibold text-text">
                <Flag code="US" size={22} />
                <Flag code="EU" size={22} />
                <Flag code="GB" size={22} /> Checkout.com
              </span>,
              "Export and international buyers",
              <span key="s" className="flex flex-wrap gap-2">
                <MoneyTag symbol="$" code="USD" />
                <MoneyTag symbol="\u20ac" code="EUR" />
                <MoneyTag symbol="\u00a3" code="GBP" />
              </span>,
              "Visa, Mastercard, multi-currency settlement",
            ],
          ]}
        />
      </Section>

      <Section kicker="Government & customs" title="The integrations we cannot avoid">
        <p>
          Trading in Saudi Arabia means talking to systems that were not designed for
          startups. We plan for them from the beginning rather than bolting them on later.
        </p>
        <Table
          head={["System", "What it is for", "Where it appears"]}
          rows={[
            ["ZATCA e-invoicing", "Every invoice must be issued in the approved format and reported", "Customer, Stock, Export portals"],
            ["Customs broker systems", "Eight partner companies file declarations on our behalf", "Clearance Portal"],
            ["SABER / product conformity", "Certificates for regulated imported goods", "Clearance, Supplier portals"],
            ["Commercial registration", "Company licences, renewals and ministry filings", "Administration Portal"],
          ]}
        />
        <Callout tone="rose" title="Plan for slow partners">
          Government and broker systems go down, time out and change formats without warning.
          Every one of these integrations is queued and retried, never called in the middle
          of a customer's checkout.
        </Callout>
      </Section>

      <PrevNext href="/integrations" />
    </Page>
  );
}
