import type { Metadata } from "next";
import { IsoDiagram } from "@/components/diagrams";
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

export const metadata: Metadata = { title: "ISO Compliance" };

const standards = [
  {
    code: "ISO/IEC 27001",
    name: "Information security management",
    tone: "ocean" as const,
    why: "The one customers and partners actually ask for. A large B2B buyer or a bank will request the certificate before signing.",
    asks: [
      "A named owner for information security, not a shared responsibility",
      "Risks written down, rated, and reviewed on a schedule",
      "Access granted by role and reviewed regularly",
      "Encryption, patching, logging and backup as documented practice",
      "Incidents recorded, investigated and closed with a lesson",
    ],
    build: "Keycloak roles, deny-by-default permissions, AES-256 at rest, TLS everywhere, and an audit log that records who changed what, when and from where.",
  },
  {
    code: "ISO/IEC 27701",
    name: "Privacy information management",
    tone: "violet" as const,
    why: "Extends 27001 to personal data, and lines up almost exactly with Saudi PDPL — one programme satisfies both.",
    asks: [
      "A map of what personal data is held and where it lives",
      "A lawful reason and recorded consent for collecting it",
      "Retention periods, and actual deletion when they expire",
      "Honouring access and deletion requests within a deadline",
    ],
    build: "Data classes enforced in the schema, Class 3 records pinned to the KSA region, consent and retention stored with the record, and a self-service export or delete flow.",
  },
  {
    code: "ISO 22301",
    name: "Business continuity management",
    tone: "teal" as const,
    why: "A trade platform that stops for a day stops containers, customs slots and deliveries. Continuity is a commercial promise, not an IT preference.",
    asks: [
      "Knowing which services must never stop, and for how long they may",
      "Recovery time and recovery point targets agreed with the business",
      "A tested plan, not a written one",
      "Evidence that the tests actually happened",
    ],
    build: "Multi-region failover with a Saudi standby, RTO under 15 minutes for the primary database, quarterly drills, and a report produced from each drill automatically.",
  },
  {
    code: "ISO 28000",
    name: "Supply chain security management",
    tone: "gold" as const,
    why: "Written for exactly this business: goods moving across borders through many hands. It is the standard that separates a serious logistics operator from a broker with a spreadsheet.",
    asks: [
      "Security assessment of the whole chain, not just our own building",
      "Vetting of partners: brokers, couriers, warehouses",
      "Custody recorded at every handover",
      "A response plan for theft, tampering and diversion",
    ],
    build: "Partner due-diligence records in the Supplier and Clearance portals, barcode scans at every movement, sealed handovers, and a chain-of-custody trail per shipment.",
  },
  {
    code: "ISO 9001",
    name: "Quality management",
    tone: "rose" as const,
    why: "The oldest and most familiar. It turns 'we try hard' into measurable service levels that a customer can hold us to.",
    asks: [
      "Documented processes that people actually follow",
      "Measured performance against stated targets",
      "Customer complaints captured and answered",
      "Corrective actions with an owner and a due date",
    ],
    build: "SLA tracking in the Management Portal, clearance and delivery KPIs, a complaint register tied to orders, and a corrective-action log with owners.",
  },
];

export default function IsoPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 11"
        title="ISO Compliance"
        lede="Certification is not a badge we buy at the end. It is a set of habits designed into the platform now — so that when an auditor asks for proof, the proof is already sitting there."
      />

      <Section kicker="The idea" title="Build the evidence, not the paperwork">
        <p>
          Companies usually meet ISO the hard way: six weeks before the audit, someone starts
          writing documents that describe a process nobody follows, and screenshots get
          pasted into a folder. It passes, once, and then rots.
        </p>
        <p>
          We are doing the opposite. Each standard asks for a behaviour; each behaviour is
          implemented as a feature; each feature produces its own record as a side effect of
          normal work. The audit becomes an export, not a project.
        </p>
        <Callout tone="ocean" title="The measure of success">
          On any given Tuesday, we should be able to answer an auditor&apos;s question in
          minutes — who has access to customs documents, when did we last test failover, what
          happened to complaint 4471 — without anyone preparing anything.
        </Callout>
      </Section>

      <Section kicker="The map" title="Five standards, and where they live in the system">
        <Figure
          title="Figure 11 — ISO standards mapped to controls and evidence"
          caption="Read each row left to right: the standard asks for something, the platform implements it, and the daily use of the platform produces the proof."
        >
          <IsoDiagram />
        </Figure>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value="5" label="Standards in scope" tone="ocean" />
          <Stat value="27001" label="Certified first" tone="violet" />
          <Stat value="M12" label="Target for Stage 2 audit" tone="teal" />
          <Stat value="100%" label="Evidence generated automatically" tone="gold" />
        </div>
      </Section>

      <Section kicker="Standard by standard" title="What each one demands, in plain words">
        <div className="space-y-4">
          {standards.map((s) => (
            <Card key={s.code}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-[19px] font-semibold tracking-tight text-text">
                    {s.code}
                  </h3>
                  <p className="mt-0.5 text-[13.5px] text-text-dim">{s.name}</p>
                </div>
                <Pill tone={s.tone}>Why it matters here</Pill>
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">{s.why}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                    The standard asks for
                  </p>
                  <div className="mt-2.5">
                    <Bullets items={s.asks} />
                  </div>
                </div>
                <div
                  className="rounded-lg p-4"
                  style={{ background: `var(--${s.tone}-soft)` }}
                >
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: `var(--${s.tone})` }}
                  >
                    What we build
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-soft">
                    {s.build}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker="Controls" title="ISO 27001 Annex A, mapped to real features">
        <p>
          Auditors work from control themes, not from our page titles. This table is the
          translation between the two, and it is the first thing we hand over at Stage 1.
        </p>
        <Table
          head={["Control theme", "Where it lives in the platform", "Evidence it produces"]}
          rows={[
            ["Access control", "Keycloak SSO, role-based permissions per portal", "Role assignments and quarterly access review reports"],
            ["Cryptography", "TLS in transit, AES-256 at rest, tokenised cards", "Key rotation log, certificate inventory"],
            ["Logging and monitoring", "Central audit log across all 12 portals", "Immutable trail of every change, retained for the required period"],
            ["Supplier relationships", "Supplier and Clearance portals with document verification", "Vetting records and signed partner terms"],
            ["Operations security", "CI/CD with reviewed changes and preview deploys", "Change history per release, tied to an approver"],
            ["Business continuity", "Multi-region failover, daily backups", "Drill reports with measured RTO and RPO"],
            ["Incident management", "Incident register linked to affected orders", "Timeline, root cause and closure for each incident"],
            ["Data residency and privacy", "Class 3 data pinned to the KSA region", "Data map showing what sits where"],
          ]}
        />
        <Callout tone="teal" title="Two pages, one story">
          The controls above lean on the{" "}
          <span className="font-semibold text-text">Multi-Region</span> design for residency
          and continuity, and on the <span className="font-semibold text-text">Security</span>{" "}
          page for the technical detail. ISO does not add a new system — it demands that the
          existing one be provable.
        </Callout>
      </Section>

      <Section kicker="Getting certified" title="The road to the certificate">
        <Steps
          items={[
            {
              title: "Gap analysis — month 3",
              body: "An honest list of what the standard expects versus what the platform does today. Done early, so gaps become backlog items instead of emergencies.",
            },
            {
              title: "Build the management system — months 4 to 7",
              body: "Scope, risk register, policies, and named owners. Written to match how the team actually works, because a policy nobody follows fails the audit anyway.",
            },
            {
              title: "Operate it — months 7 to 10",
              body: "An auditor wants to see the system running, not just written. Three months of real access reviews, real incidents and real drills is the minimum credible history.",
            },
            {
              title: "Internal audit and management review — month 10",
              body: "We find our own non-conformities first and fix them. Every one we catch is one the certification body does not raise.",
            },
            {
              title: "Stage 1 audit — month 11",
              body: "The certification body reviews documentation and readiness. Usually a paperwork check, and it tells us exactly what Stage 2 will probe.",
            },
            {
              title: "Stage 2 audit and certificate — month 12",
              body: "The full assessment: evidence, interviews, sampling. The certificate then runs three years with annual surveillance audits.",
            },
          ]}
        />
        <Sub title="What we do not promise">
          <p>
            No platform is &ldquo;ISO certified&rdquo; on its own — organisations are
            certified, not software. What this system does is remove the usual obstacles:
            the missing logs, the unknown data locations, the untested backups, the access
            list nobody maintained. The remaining work is management effort, and it is
            budgeted in the{" "}
            <span className="font-semibold text-text">roadmap</span> rather than discovered
            later.
          </p>
        </Sub>
      </Section>

      <PrevNext href="/iso-compliance" />
    </Page>
  );
}
