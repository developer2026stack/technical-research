import Link from "next/link";
import { JourneyDiagram, RevenueDiagram } from "@/components/diagrams";
import { Flag } from "@/components/flags";
import { Bullets, Callout, Card, Figure, Pill, Section, Stat } from "@/components/ui";
import { nav } from "@/lib/nav";
import { currencyBy, markets } from "@/lib/markets";

export default function HomePage() {
  return (
    <div className="pb-24">
      {/* ---------------- Hero ---------------- */}
      <section className="blueprint relative overflow-hidden border-b border-line">
        <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="ocean">Technical Research Document</Pill>
              <Pill tone="teal">v1.0</Pill>
              <Pill tone="gold">Bright Ocean Trading</Pill>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-[54px]">
              One box.
              <br />
              Three countries.
              <br />
              <span className="text-ocean">Twelve portals.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-text-soft">
              A box of perfume bottles leaves a factory in Guangzhou. Forty days later it
              is on a shelf in Riyadh — or in a parcel flying to London. Between those two
              moments sit a dozen companies, six kinds of paperwork, and a lot of guessing.
            </p>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-text-soft">
              This platform removes the guessing. It puts sourcing, customs, storage,
              delivery and selling under one roof — twelve connected portals, one login,
              one honest set of numbers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/flow"
                className="rounded-xl bg-ocean px-5 py-3 text-[14.5px] font-semibold text-white transition hover:opacity-90"
              >
                See how it works →
              </Link>
              <Link
                href="/portals"
                className="rounded-xl border border-line bg-surface px-5 py-3 text-[14.5px] font-semibold text-text transition hover:border-ocean hover:text-ocean"
              >
                Meet the 12 portals
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] text-text-dim">
              <span className="font-semibold uppercase tracking-[0.14em]">Sourced in</span>
              <Flag code="CN" size={24} />
              <Flag code="HK" size={24} />
              <Flag code="AE" size={24} />
              <span className="text-text-dim">→</span>
              <span className="font-semibold uppercase tracking-[0.14em]">Hub</span>
              <Flag code="SA" size={24} />
              <span className="text-text-dim">→</span>
              <span className="font-semibold uppercase tracking-[0.14em]">Sold to</span>
              <Flag code="SA" size={24} />
              <Flag code="EU" size={24} />
              <Flag code="GB" size={24} />
              <Flag code="US" size={24} />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat value="12" label="Connected portals" tone="ocean" />
            <Stat value="4" label="Phases, origin to buyer" tone="violet" />
            <Stat value="3" label="Courier networks in one engine" tone="teal" />
            <Stat value="4" label="Cloud regions, one Saudi primary" tone="ocean" />
            <Stat value="5" label="Buyer currencies, one ledger" tone="gold" />
            <Stat value="5" label="ISO standards designed in" tone="rose" />
          </div>
        </div>
      </section>

      <div className="doc-body mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-12">
        {/* ---------------- The story ---------------- */}
        <Section kicker="The story" title="Why anyone needs this at all">
          <p>
            Trading is not hard because goods are hard to move. It is hard because nobody
            can see the whole road at once.
          </p>
          <p>
            The buyer talks to a supplier on WhatsApp. The supplier books a shipping line
            by email. A customs broker sends a PDF. The warehouse writes numbers in a
            notebook. The courier has its own tracking page. Five systems, five stories,
            and no single answer to a simple question:{" "}
            <em className="text-text">where is my stuff, and what has it cost me so far?</em>
          </p>
          <p>
            Bright Ocean Trading wanted one answer. So we designed one building with twelve
            doors. Each door serves a different person — a factory in Shenzhen, a customs
            broker in Jeddah, a shopper in Riyadh, an Oud maker selling to Paris — but
            behind those doors, they all walk on the same floor.
          </p>

          <Callout tone="ocean" title="The one-line version">
            Goods come in from China and the UAE, land at the Jeddah hub, get cleared and
            stored, then go out to buyers in Saudi Arabia and the rest of the world — and
            every step is visible on one screen.
          </Callout>
        </Section>

        {/* ---------------- The journey ---------------- */}
        <Section kicker="The whole platform" title="Four phases, start to finish">
          <p>
            Everything in this document hangs off the picture below. Read it left to right:
            goods are found, goods arrive and clear, goods move, goods are sold. The two
            red portals at the bottom never touch a box — they watch the money and the law.
          </p>
          <Figure
            title="Figure 1 — Sourcing-to-Market flow"
            caption="Phase 1 buys and brands. Phase 2 clears and stores. Phase 3 moves. Phase 4 sells. Management and Administration sit under all four."
          >
            <JourneyDiagram />
          </Figure>
          <p>
            Notice that the flow only points one way, except for information. A box never
            goes backwards, but data does: proof of delivery, cash collected and delays all
            travel back up so the next order is planned better than the last one.
          </p>
        </Section>

        {/* ---------------- Money ---------------- */}
        <Section kicker="The business idea" title="Six ways this platform earns">
          <p>
            A normal online shop has one income: the sale. This platform touches the goods
            six separate times, and each touch is worth something. That is what makes
            twelve portals worth building instead of one storefront.
          </p>
          <Figure
            title="Figure 2 — Revenue streams"
            caption="Every stream reports into the Management Portal, so profit is measured per portal, not just per order."
          >
            <RevenueDiagram />
          </Figure>
          <Callout tone="gold" title="Why this matters for the build order">
            The fastest money is in the hub: clearance and storage earn on day one, before a
            single retail sale happens. That is why the{" "}
            <Link href="/roadmap" className="font-semibold text-ocean underline underline-offset-2">
              roadmap
            </Link>{" "}
            builds the warehouse side first and the shop second.
          </Callout>
        </Section>

        {/* ---------------- Promises ---------------- */}
        <Section kicker="What we promise" title="Five things the system must do">
          <Card>
            <Bullets
              items={[
                "Centralise: one login and one truth across sourcing, clearance, storage and delivery.",
                "Simplify logistics: follow any shipment from China or the UAE to Jeddah and on to the buyer.",
                "Serve both markets: a company buying 500 units and a person buying one, in the same shop.",
                "Export Saudi products: take local Oud, abayas and beauty goods to buyers worldwide.",
                "Enable new brands: connect anyone with an idea to a factory that can actually make it.",
              ]}
            />
          </Card>
        </Section>

        {/* ---------------- Where we operate ---------------- */}
        <Section kicker="On the map" title="Seven countries, seven currencies">
          <p>
            This is the whole world of the platform. Three countries on the buying side, one
            hub in the middle, and three export markets on the far end — each with its own
            currency, its own payment habits and its own paperwork.
          </p>
          <Card>
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {markets.map((m) => {
                const cur = currencyBy(m.currency);
                return (
                  <div
                    key={m.code}
                    className="flex items-start gap-3 border-b border-line-soft pb-4 last:border-0"
                  >
                    <Flag code={m.code} size={30} />
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-text">
                        {m.name}
                        <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[11.5px] font-semibold text-text-dim">
                          {cur.symbol} {cur.code}
                        </span>
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-text-dim">{m.city}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-text-soft">
                        {m.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Callout tone="teal" title="Two directions, not one">
            Goods flow in from China, Hong Kong and the UAE. Goods flow out to Europe, the UK
            and the US. Saudi Arabia is the only country that appears on both sides of that
            sentence — which is exactly why the hub sits there.
          </Callout>
        </Section>

        {/* ---------------- Built to cross borders ---------------- */}
        <Section kicker="Built to cross borders" title="Three things we refused to bolt on later">
          <p>
            A platform that trades between China, the Gulf, Saudi Arabia and Europe cannot
            treat regions, currencies and audits as version two. Each of them changes the
            database schema, so each of them is designed in from the first migration.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                href: "/multi-region",
                pill: "Multi-region",
                tone: "ocean" as const,
                title: "Fast everywhere, resident in KSA",
                body: "Four cloud regions serve buyers and suppliers locally, while personal and financial data never leaves Saudi Arabia.",
              },
              {
                href: "/multi-currency",
                pill: "Multi-currency",
                tone: "gold" as const,
                title: "Five currencies, one truth",
                body: "Prices are held in SAR, shown in the buyer's currency, and every amount is stored with the rate it was made at.",
              },
              {
                href: "/iso-compliance",
                pill: "ISO ready",
                tone: "rose" as const,
                title: "Evidence, not paperwork",
                body: "ISO 27001, 27701, 22301, 28000 and 9001 turned into features that produce their own audit trail.",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-xl border border-line bg-surface p-5 transition hover:border-ocean"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <Pill tone={c.tone}>{c.pill}</Pill>
                <p className="mt-3 text-[15.5px] font-semibold text-text group-hover:text-ocean">
                  {c.title}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-text-dim">{c.body}</p>
              </Link>
            ))}
          </div>
          <Callout tone="violet" title="Why these three are one decision">
            Regions decide where a row may live. Currency decides what a number means. ISO
            decides what must be provable about both. Change any one of them after launch and
            you are rewriting the same tables twice.
          </Callout>
        </Section>

        {/* ---------------- Where to go next ---------------- */}
        <Section kicker="Read on" title="The rest of this document">
          <div className="grid gap-3 sm:grid-cols-2">
            {nav
              .flatMap((g) => g.items)
              .filter((i) => i.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-line bg-surface p-4 transition hover:border-ocean"
                  style={{ boxShadow: "var(--shadow)" }}
                >
                  <p className="text-[15px] font-semibold text-text group-hover:text-ocean">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-text-dim">
                    {item.blurb}
                  </p>
                </Link>
              ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
