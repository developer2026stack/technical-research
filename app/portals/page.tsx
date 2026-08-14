import type { Metadata } from "next";
import { PortalMapDiagram } from "@/components/diagrams";
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
} from "@/components/ui";
import { phaseMeta, portals, type Phase } from "@/lib/portals";

export const metadata: Metadata = { title: "The 12 Portals" };

const toneOf = (p: Phase) =>
  p === "sourcing" ? "violet" : p === "hub" ? "ocean" : p === "logistics" ? "teal" : p === "market" ? "gold" : "rose";

const groups: Phase[] = ["sourcing", "hub", "logistics", "market", "core"];

export default function PortalsPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 3"
        title="The 12 Portals"
        lede="Twelve doors into the same building. Each one is written here the same way: who walks through it, what they came for, and what the system does for them."
      />

      <Section kicker="The map" title="All twelve, grouped">
        <p>
          Portals are not twelve separate products. They are twelve views of one shared
          record — the same shipment, the same stock, the same invoice, shown to different
          people with different permissions.
        </p>
        <Figure
          title="Figure 3 — Portal map"
          caption="Solid arrows follow the goods. Dashed arrows are oversight: the two core portals read everything and touch nothing."
        >
          <PortalMapDiagram />
        </Figure>
      </Section>

      {groups.map((g) => {
        const meta = phaseMeta[g];
        const tone = toneOf(g);
        const list = portals.filter((p) => p.phase === g);
        return (
          <Section key={g} kicker={meta.label} title={meta.note}>
            <div className="space-y-5">
              {list.map((p) => (
                <Card key={p.id}>
                  <div id={`portal-${p.id}`} className="scroll-mt-28">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                          Portal {p.id}
                        </p>
                        <h3 className="mt-1 text-[19px] font-semibold tracking-tight text-text">
                          {p.name}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Pill tone={tone}>{p.users}</Pill>
                        <span className="inline-flex items-center gap-1.5">
                          {p.countries.map((c) => (
                            <Flag key={c} code={c} size={20} />
                          ))}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-[15px] font-medium text-text">{p.oneLine}</p>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
                      {p.story}
                    </p>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                          What it does
                        </p>
                        <div className="mt-2.5">
                          <Bullets items={p.jobs} />
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-dim">
                          Talks to
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {p.talksTo.map((t) => (
                            <span
                              key={t}
                              className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-text-soft"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        );
      })}

      <Section kicker="Design rule" title="Twelve portals, one codebase">
        <Callout tone="ocean" title="Built once, dressed twelve times">
          Every portal shares the same components, the same login and the same API. A button
          fixed in the shared kit is fixed everywhere. Without that rule, twelve portals
          would need twelve teams — and would drift apart within a year.
        </Callout>
      </Section>

      <PrevNext href="/portals" />
    </Page>
  );
}
