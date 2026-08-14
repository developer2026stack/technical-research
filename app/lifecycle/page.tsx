import type { Metadata } from "next";
import { LifecycleDiagram } from "@/components/diagrams";
import {
  Callout,
  Card,
  Figure,
  Page,
  PageHeader,
  Pill,
  PrevNext,
  Section,
  Steps,
  Table,
} from "@/components/ui";

export const metadata: Metadata = { title: "Order Lifecycle" };

export default function LifecyclePage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 5"
        title="Order Lifecycle"
        lede="One order, followed from the tap on 'Buy' to the signature at the door — and then back again, because the money and the proof have to return home."
      />

      <Section kicker="The walk-through" title="Sara orders 200 bottles">
        <p>
          Sara runs a small perfume brand in Riyadh. She is a registered business on the
          platform, so when she logs in she sees bulk prices, a credit limit and a proper
          tax invoice at the end. Here is what happens after she taps buy.
        </p>
        <Figure
          title="Figure 5 — Order lifecycle across four teams"
          caption="Four lanes, six steps. Nobody re-types anything: each step hands the next one the same record."
        >
          <LifecycleDiagram />
        </Figure>

        <Steps
          items={[
            {
              title: "The order is placed",
              body: "Because Sara is a B2B account, the system applies her tier price, checks her credit limit, and reserves 200 units in the Stock Portal so nobody else can sell them.",
            },
            {
              title: "Payment is authorised",
              body: "Her card is authorised — not captured. Money only leaves her account when the goods actually ship, which is the difference between a happy customer and a refund queue.",
            },
            {
              title: "The hub picks and packs",
              body: "A picking list appears on a warehouse scanner. Every bottle is scanned out of its bin, so system stock and shelf stock stay identical.",
            },
            {
              title: "Customs, if needed",
              body: "For goods still arriving from abroad, the Clearance Portal handles broker, duty and documents first. For stock already in Jeddah, this step is skipped entirely — that is why the Stock Portal exists.",
            },
            {
              title: "The best courier is booked",
              body: "The shipping engine asks SMSA, Aramex and DHL at the same time and books the one that wins on price and speed for this parcel, to this address.",
            },
            {
              title: "Delivered and invoiced",
              body: "Sara follows one tracking page regardless of the carrier. On delivery, proof is captured, the payment is settled, and a ZATCA-compliant e-invoice is issued automatically.",
            },
          ]}
        />

        <Callout tone="teal" title="The quiet part">
          Notice what Sara never had to do: chase a broker, ask which courier has her parcel,
          or request an invoice. Every one of those was a phone call in the old way of
          working.
        </Callout>
      </Section>

      <Section kicker="Order states" title="The words the system uses">
        <p>
          Every order sits in exactly one state, and only certain moves are allowed. This is
          what stops an order being delivered before it is paid, or cancelled after it has
          shipped.
        </p>
        <Table
          head={["State", "Means", "Can move to"]}
          rows={[
            ["Draft", "Cart exists, not confirmed", "Placed, Abandoned"],
            ["Placed", "Confirmed; stock reserved", "Paid, Cancelled"],
            ["Paid", "Payment authorised or received", "Processing, Refunded"],
            ["Processing", "Being picked, packed or cleared", "Shipped, On hold"],
            ["On hold", "Customs query, damage or stock issue", "Processing, Cancelled"],
            ["Shipped", "Handed to a courier, tracking live", "Delivered, Returned"],
            ["Delivered", "Proof of delivery captured", "Closed, Returned"],
            ["Closed", "Invoiced and settled", "—"],
          ]}
        />
      </Section>

      <Section kicker="When it goes wrong" title="The three failures we plan for">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <Pill tone="rose">Customs hold</Pill>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
              The order moves to <strong className="text-text">On hold</strong>, the buyer is
              told the real reason, and the broker gets a task with a deadline. No silent
              waiting.
            </p>
          </Card>
          <Card>
            <Pill tone="gold">Failed delivery</Pill>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
              Two more attempts are booked automatically. After that, the parcel returns to
              the hub and the stock goes back on the shelf the moment it is scanned in.
            </p>
          </Card>
          <Card>
            <Pill tone="ocean">Stock mismatch</Pill>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
              The reservation is released, the buyer is offered the nearest match or a
              refund, and the difference is logged for the next stock count.
            </p>
          </Card>
        </div>
      </Section>

      <PrevNext href="/lifecycle" />
    </Page>
  );
}
