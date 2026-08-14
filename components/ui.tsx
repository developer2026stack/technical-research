import Link from "next/link";
import { neighbours } from "@/lib/nav";
import { COUNTRY_NAME, Flag, type CountryCode } from "./flags";

/* ---------------- Page scaffolding ---------------- */

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="doc-body mx-auto w-full max-w-4xl px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pt-16">
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="fade-up border-b border-line pb-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ocean">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-[40px] sm:leading-[1.1]">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-text-soft">{lede}</p>
    </header>
  );
}

export function Section({
  id,
  title,
  kicker,
  children,
}: {
  id?: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      {kicker && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-dim">
          {kicker}
        </p>
      )}
      <h2 className="mt-1.5 text-[22px] font-semibold tracking-tight text-text sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h3 className="text-[16px] font-semibold text-text">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

/* ---------------- Content blocks ---------------- */

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className}`}
      style={{ boxShadow: "var(--shadow)" }}
    >
      {children}
    </div>
  );
}

const tones = {
  ocean: { c: "var(--ocean)", b: "var(--ocean-soft)" },
  teal: { c: "var(--teal)", b: "var(--teal-soft)" },
  gold: { c: "var(--gold)", b: "var(--gold-soft)" },
  violet: { c: "var(--violet)", b: "var(--violet-soft)" },
  rose: { c: "var(--rose)", b: "var(--rose-soft)" },
} as const;

export type Tone = keyof typeof tones;

export function Callout({
  tone = "ocean",
  title,
  children,
}: {
  tone?: Tone;
  title: string;
  children: React.ReactNode;
}) {
  const t = tones[tone];
  return (
    <div
      className="rounded-xl border-l-[3px] px-5 py-4"
      style={{ borderLeftColor: t.c, background: t.b }}
    >
      <p className="text-[13.5px] font-semibold" style={{ color: t.c }}>
        {title}
      </p>
      <div className="mt-1.5 text-[14.5px] leading-relaxed text-text-soft">{children}</div>
    </div>
  );
}

export function Figure({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-line bg-surface">
      <figcaption className="flex items-center gap-2 border-b border-line-soft bg-surface-2 px-5 py-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ocean)" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
        </svg>
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-soft">
          {title}
        </span>
      </figcaption>
      <div className="scroll-x scroll-thin blueprint p-4 sm:p-6">{children}</div>
      {caption && (
        <p className="border-t border-line-soft px-5 py-3 text-[13px] leading-relaxed text-text-dim">
          {caption}
        </p>
      )}
    </figure>
  );
}

export function Pill({ tone = "ocean", children }: { tone?: Tone; children: React.ReactNode }) {
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
      style={{ color: t.c, background: t.b }}
    >
      {children}
    </span>
  );
}

/* ---------------- Country & currency chips ---------------- */

/** Flag + country name, for use in body text, tables and cards. */
export function CountryTag({
  code,
  label,
  size = 18,
}: {
  code: CountryCode;
  label?: string;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap align-middle">
      <Flag code={code} size={size} />
      <span className="text-[14px] font-medium text-text">
        {label ?? COUNTRY_NAME[code]}
      </span>
    </span>
  );
}

/** A row of flags, e.g. the countries one portal serves. */
export function FlagRow({
  codes,
  size = 18,
}: {
  codes: CountryCode[];
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {codes.map((c) => (
        <Flag key={c} code={c} size={size} />
      ))}
    </span>
  );
}

/** Currency symbol in a monospace badge, plus its ISO code. */
export function MoneyTag({
  symbol,
  code,
  tone = "gold",
}: {
  symbol: string;
  code: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap align-middle">
      <span
        className="grid h-6 min-w-6 place-items-center rounded-md px-1.5 text-[13px] font-bold"
        style={{ color: t.c, background: t.b }}
      >
        {symbol}
      </span>
      <span className="text-[13.5px] font-semibold text-text">{code}</span>
    </span>
  );
}

export function Stat({
  value,
  label,
  tone = "ocean",
}: {
  value: string;
  label: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-4">
      <p className="text-2xl font-semibold tracking-tight" style={{ color: t.c }}>
        {value}
      </p>
      <p className="mt-1 text-[12.5px] leading-snug text-text-dim">{label}</p>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[14.5px] leading-relaxed text-text-soft">
          <svg
            className="mt-[5px] shrink-0"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ol className="relative space-y-6 border-l border-line pl-7">
      {items.map((s, i) => (
        <li key={s.title} className="relative">
          <span className="absolute -left-[38px] grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-[11px] font-semibold text-ocean">
            {i + 1}
          </span>
          <p className="text-[15px] font-semibold text-text">{s.title}</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-text-soft">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- Table ---------------- */

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="scroll-x scroll-thin rounded-xl border border-line">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="bg-surface-2">
            {head.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-text-dim"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line-soft align-top">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3.5 text-[14px] leading-relaxed text-text-soft">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Score({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  const tone: Tone = value >= 9.4 ? "teal" : value >= 8.9 ? "ocean" : "gold";
  return (
    <div className="flex min-w-[92px] items-center gap-2">
      <span className="w-9 text-[13px] font-semibold text-text">{value.toFixed(1)}</span>
      <span className="h-1.5 w-full max-w-[70px] overflow-hidden rounded-full bg-surface-2">
        <span
          className="block h-full rounded-full"
          style={{ width: `${pct}%`, background: tones[tone].c }}
        />
      </span>
    </div>
  );
}

/* ---------------- Footer nav ---------------- */

export function PrevNext({ href }: { href: string }) {
  const { prev, next } = neighbours(href);
  return (
    <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-xl border border-line bg-surface p-4 transition hover:border-ocean"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-text-dim">Previous</p>
          <p className="mt-1 text-[15px] font-semibold text-text group-hover:text-ocean">
            ← {prev.title}
          </p>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="group rounded-xl border border-line bg-surface p-4 text-right transition hover:border-ocean sm:col-start-2"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-text-dim">Next</p>
          <p className="mt-1 text-[15px] font-semibold text-text group-hover:text-ocean">
            {next.title} →
          </p>
        </Link>
      )}
    </nav>
  );
}
