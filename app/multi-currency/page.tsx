import type { Metadata } from "next";
import { CurrencyDiagram } from "@/components/diagrams";
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
  Steps,
  Sub,
  Table,
  MoneyTag,
} from "@/components/ui";
import { currencies } from "@/lib/markets";

export const metadata: Metadata = { title: "Multi-Currency" };

export default function MultiCurrencyPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Section 7"
        title="Multi-Currency"
        lede="The same bottle of Oud is 120 riyals in Jeddah, 118 dirhams in Dubai and 32 dollars in New York. One product, one truth, many prices — and a refund six months later must still add up."
      />

      <Section kicker="The trap" title="Why currency breaks so many platforms">
        <p>
          Most systems start with one currency and a column called{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 text-[13px]">price</code>. Then
          the first export order arrives, someone multiplies by today&apos;s rate, and the
          number is stored. Six months later the buyer asks for a refund, the rate has moved,
          and nobody can explain the difference to the accountant or the auditor.
        </p>
        <p>
          The fix is boring and non-negotiable: an amount is never just a number. It is an
          amount, a currency, the rate that was used, and the moment that rate was true.
        </p>
        <Callout tone="violet" title="The stored shape">
          <code className="text-[13.5px] text-text">
            amount_minor: 12000 · currency: &quot;SAR&quot; · fx_rate: 1.0 · rate_at:
            2026-08-14T09:00Z
          </code>
          <br />
          Integer minor units — halalas, cents, fils. Never a floating point number, because
          0.1 + 0.2 is not 0.3 and money does not forgive that.
        </Callout>
      </Section>

      <Section kicker="The flow" title="One price in, many prices out, one ledger back">
        <Figure
          title="Figure 7 — Multi-currency money flow"
          caption="Prices are held in SAR, presented in the buyer's currency, settled by whichever gateway suits that market, and recorded back in SAR for the books."
        >
          <CurrencyDiagram />
        </Figure>
        <p>
          Every portal asks the same price engine for a price. No portal calculates its own,
          which is the only way twelve storefronts can agree on what something costs.
        </p>
      </Section>

      <Section kicker="The engine" title="How a displayed price is built">
        <Steps
          items={[
            {
              title: "Start from the base",
              body: "Every product has one base price in SAR. This is the number the business actually reasons about, and the only one a manager edits.",
            },
            {
              title: "Apply the day's rate",
              body: "FX rates are pulled once a day from a single trusted source and stored as a dated snapshot. We never call a live rate API during checkout — if it is slow or down, the sale must not be.",
            },
            {
              title: "Add a safety buffer",
              body: "A small margin (typically 1–2%) absorbs movement between display and settlement. Without it, a volatile week quietly eats the profit on every export order.",
            },
            {
              title: "Round for the market",
              body: "A Saudi shopper expects 119 SAR, not 118.73. A US buyer expects $31.99. Rounding rules are set per currency, applied after conversion, never before.",
            },
            {
              title: "Add tax the local way",
              body: "15% VAT for domestic sales, zero-rated for exports, and prices shown tax-inclusive for consumers but tax-exclusive for business buyers — the way each audience reads a price.",
            },
            {
              title: "Lock it at checkout",
              body: "When the buyer reaches payment, the rate is frozen for 15 minutes and stored with the order. What she was shown is what she is charged.",
            },
          ]}
        />
      </Section>

      <Section kicker="Markets" title="Currency by market">
        <Table
          head={["Currency", "Where it is used", "Gateway", "Rounding", "Tax"]}
          rows={currencies.map((c) => [
            <span key="c" className="flex items-center gap-2.5">
              <Flag code={c.country} size={22} />
              <MoneyTag
                symbol={c.symbol}
                code={c.code}
                tone={c.code === "CNY" || c.code === "HKD" ? "violet" : "gold"}
              />
            </span>,
            c.use,
            c.gateway,
            c.rounding,
            c.tax,
          ])}
        />

        <Sub title="The same bottle of Oud, in every currency">
          <p>
            One base price of <strong className="text-text">﷼ 120</strong> becomes these
            numbers after conversion, buffer and market rounding. The buyer never sees a
            calculation — only a price that looks native to them.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {currencies
              .filter((c) => c.code !== "HKD" && c.code !== "CNY")
              .map((c) => (
                <div
                  key={c.code}
                  className="rounded-xl border border-line bg-surface px-4 py-4 text-center"
                  style={{ boxShadow: "var(--shadow)" }}
                >
                  <span className="inline-flex">
                    <Flag code={c.country} size={26} />
                  </span>
                  <p className="mt-2 text-[19px] font-semibold tracking-tight text-text" dir="ltr">
                    {c.example}
                  </p>
                  <p className="mt-0.5 text-[12px] text-text-dim">{c.name}</p>
                </div>
              ))}
          </div>
          <p className="text-[13px] text-text-dim">
            Illustrative figures at sample rates — the real numbers come from the daily FX
            snapshot, not from anything hard-coded in a portal.
          </p>
        </Sub>
        <Callout tone="ocean" title="Buying currencies matter too">
          Money goes out as well as in. Suppliers in China invoice in CNY or USD, freight is
          often billed in USD, and customs duty is always paid in SAR. Purchase orders carry
          their own currency and rate, so true landed cost is a fact rather than an estimate.
        </Callout>
      </Section>

      <Section kicker="The books" title="One base currency, and the truth about FX">
        <p>
          The ledger is kept in SAR. Every transaction, in any currency, is recorded twice:
          the original amount as the customer experienced it, and the SAR value at the rate
          used. The gap between what we expected and what the bank actually settled has a
          name — FX gain or loss — and it gets its own account instead of quietly polluting
          gross margin.
        </p>
        <Card>
          <Bullets
            items={[
              "Orders store the buyer's currency, the SAR equivalent, the rate and the timestamp.",
              "Refunds are issued in the original currency at the original rate — never at today's rate.",
              "Partial refunds and returns reuse the order's stored rate, so nothing drifts.",
              "Settlement differences from the gateway are reconciled daily into the FX account.",
              "ZATCA tax invoices always show SAR alongside the buyer's currency and the rate applied.",
              "Supplier payouts carry the agreed contract currency, so payables never depend on a display rate.",
            ]}
          />
        </Card>
      </Section>

      <Section kicker="Presentation" title="What the buyer actually experiences">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <Pill tone="gold">Detection</Pill>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
              Currency is suggested from the delivery country, never from the browser
              language — and the buyer can always change it. A Saudi living in London still
              wants to ship to Riyadh in riyals.
            </p>
          </Card>
          <Card>
            <Pill tone="teal">Consistency</Pill>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
              The chosen currency follows the buyer across catalogue, cart, checkout, email
              and invoice. Switching currency mid-basket re-prices everything at once, not
              item by item.
            </p>
          </Card>
          <Card>
            <Pill tone="ocean">Honesty</Pill>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-soft">
              Export prices show the landed total — goods, shipping and duty — before
              payment. A surprise customs bill at the door is the fastest way to lose an
              international customer for good.
            </p>
          </Card>
        </div>
        <Sub title="Arabic, English, and the numbers in between">
          <p>
            The interface runs right-to-left in Arabic and left-to-right in English, but
            currency symbols, decimal separators and digit grouping follow the buyer&apos;s
            locale, not the page direction. It is a small detail that quietly signals whether
            a platform was built for this region or translated into it.
          </p>
        </Sub>
      </Section>

      <PrevNext href="/multi-currency" />
    </Page>
  );
}
