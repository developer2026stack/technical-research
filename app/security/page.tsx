import type { Metadata } from "next";
import Link from "next/link";
import { SecurityDiagram } from "@/components/diagrams";
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

export const metadata: Metadata = { title: "Security & Compliance" };

export default function SecurityPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 10"
        title="Security & Compliance"
        lede="This platform holds trade licences, customs documents, prices and customer addresses. Losing any of that is not a bug — it is a business-ending event. Here is how it is protected."
      />

      <Section kicker="The path" title="Every request passes five checkpoints">
        <Figure
          title="Figure 10 — Security checkpoints"
          caption="A request that fails any checkpoint stops there. Whatever happens, the attempt is written to the audit log."
        >
          <SecurityDiagram />
        </Figure>
        <p>
          Nothing here is exotic. It is the ordinary set of controls, applied consistently —
          which is the part most platforms get wrong.
        </p>
      </Section>

      <Section kicker="Access" title="Who can see what">
        <p>
          With twelve portals and many kinds of partner, the important question is not
          &ldquo;is the user logged in?&rdquo; but &ldquo;is this person allowed to see this
          particular shipment?&rdquo; Keycloak answers the first; our permission rules answer
          the second.
        </p>
        <Table
          head={["Role", "Can see", "Cannot see"]}
          rows={[
            ["Supplier", "Their own products, quotes and purchase orders", "Other suppliers' prices, customer data"],
            ["Customs broker", "Only shipments assigned to them", "Stock levels, margins, other brokers' bids"],
            ["Warehouse clerk", "Stock, locations, picking lists", "Prices, margins, customer payment details"],
            ["Logistics staff", "Routes, trips, shipment status", "Financial reports, supplier contracts"],
            ["B2B buyer", "Their own orders, invoices and credit", "Cost prices, other buyers' orders"],
            ["Management", "Revenue and KPIs across all portals", "Raw card data — nobody sees that"],
          ]}
        />
        <Callout tone="violet" title="Deny by default">
          A new role starts with access to nothing. Permissions are added deliberately, one
          at a time, and every addition is recorded. It is slower to set up and far safer to
          live with.
        </Callout>
      </Section>

      <Section kicker="Data" title="Protecting what is stored">
        <Card>
          <Bullets
            items={[
              "Encryption in transit with TLS everywhere, including between internal services.",
              "Encryption at rest with AES-256 for documents, contracts, licences and API keys.",
              "Card details never touch our servers — gateways return tokens, and only tokens are stored.",
              "Personal data is separated from operational data so reports can run without exposing customers.",
              "Documents are reachable only through short-lived signed links, never a public URL.",
              "Daily backups with point-in-time recovery, and restore drills on a schedule.",
            ]}
          />
        </Card>

        <Sub title="Keeping data inside Saudi Arabia">
          <p>
            Saudi rules expect certain personal and financial data to stay in the Kingdom.
            The database and document storage are hosted in a KSA region, while the public
            website and its images can still be cached worldwide for speed. This split is a
            design decision made now, not a migration to be regretted later.
          </p>
        </Sub>
      </Section>

      <Section kicker="Compliance" title="The rules we build around">
        <Table
          head={["Requirement", "What it means for the build"]}
          rows={[
            ["ZATCA e-invoicing", "Invoices are generated in the approved format, with QR codes, and reported on time"],
            ["Personal data protection (PDPL)", "Consent recorded, data kept in the Kingdom, deletion requests honoured"],
            ["Customs documentation", "Every declaration, certificate and duty payment is retained and searchable"],
            ["Company licensing", "Renewal dates tracked in the Administration Portal with reminders before expiry"],
            ["Audit trail", "Who changed what, when and from where — kept for regulators and internal review"],
            ["ISO 27001 / 27701 / 22301 / 28000 / 9001", "Controls implemented as features that generate their own evidence"],
          ]}
        />
        <Callout tone="teal" title="Compliance as a feature, not a chore">
          The Administration Portal turns compliance into a working screen: renewals with
          dates, filings with statuses, policies with versions. Most trading companies keep
          this in one person's head, and it fails the day that person is on holiday.
        </Callout>
        <p>
          The five ISO standards, what each one demands and how we get certified are covered
          on the{" "}
          <Link
            href="/iso-compliance"
            className="font-semibold text-ocean underline underline-offset-2"
          >
            ISO Compliance
          </Link>{" "}
          page. Where the data physically sits — and why that satisfies both PDPL and ISO
          27701 — is on the{" "}
          <Link
            href="/multi-region"
            className="font-semibold text-ocean underline underline-offset-2"
          >
            Multi-Region
          </Link>{" "}
          page.
        </p>
      </Section>

      <PrevNext href="/security" />
    </Page>
  );
}
