# Bright Ocean Trading — Platform Documentation

A Next.js documentation site for the **12-Portal Sourcing-to-Market Trade & Logistics
Platform**, built from the Technical Research Document. Written in plain English, with
hand-drawn SVG diagrams that follow the light/dark theme.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

The project is a stock Next.js App Router app — Vercel detects everything automatically.

**Option A — CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

**Option B — Git**

1. Push this folder to a GitHub/GitLab repository.
2. On [vercel.com/new](https://vercel.com/new), import the repository.
3. Framework preset: **Next.js**. Build command and output are detected — no env vars needed.
4. Deploy.

Every page is statically prerendered, so hosting cost is effectively zero.

## Pages

| Route | What it covers |
| --- | --- |
| `/` | The story: why the platform exists, the four-phase flow, six revenue streams |
| `/problem` | Five real problems, measurable goals, and scope boundaries |
| `/flow` | The full Sourcing-to-Market walk-through, phase by phase |
| `/portals` | All 12 portals: who uses them, what they do, what they talk to |
| `/architecture` | Six technical layers, service list, deliberate trade-offs |
| `/lifecycle` | One order followed end to end, order states, failure handling |
| `/multi-region` | Four regions, data classes, residency, failover and RTO/RPO targets |
| `/multi-currency` | Price engine, FX rates, rounding, settlement, SAR ledger, refunds |
| `/tech-stack` | Scored technology choices for frontend, backend, data, security, payments |
| `/integrations` | Shipping engine (SMSA, Aramex, DHL), payment routing, government systems |
| `/security` | Checkpoints, roles, data protection, KSA compliance |
| `/iso-compliance` | ISO 27001, 27701, 22301, 28000 and 9001 mapped to features, controls and evidence |
| `/roadmap` | Five build phases over 12 months, plus risks and mitigations |
| `/references` | Flexport, Forto, Salasa / Zid Ship — what to borrow from each |

## Diagrams

All twelve figures are hand-written inline SVG in `components/diagrams.tsx`, built from the
primitives in `components/diagram-kit.tsx` (`Node`, `Cluster`, `Arrow`, `EdgeTag`,
`Legend`). They use CSS variables for colour, so they re-theme automatically and stay
crisp at any zoom. Wide diagrams scroll inside their own container — the page never
scrolls sideways.

## Flags and currencies

Countries are drawn as inline SVG in `components/flags.tsx` rather than emoji, because
regional-indicator emoji do not render as flags on Windows browsers — they fall back to
letter pairs. Eight are included: 🇸🇦 SA, 🇨🇳 CN, 🇭🇰 HK, 🇦🇪 AE, 🇪🇺 EU, 🇬🇧 GB, 🇺🇸 US, 🇩🇪 DE.

```tsx
<Flag code="SA" size={24} />          // in normal markup
<Flag code="SA" size={24} x={40} y={12} />  // nested inside a diagram's SVG
```

Currency symbols and market data live in `lib/markets.ts`: SAR ﷼, AED د.إ, USD $, EUR €,
GBP £, CNY ¥, HKD HK$. Use `<MoneyTag symbol="$" code="USD" />` to show one, and
`<CountryTag code="SA" />` for a flag with its country name.

## Editing content

Content lives next to the page that uses it:

- `lib/portals.ts` — the 12 portals (names, stories, jobs, connections, countries)
- `lib/markets.ts` — countries and currencies used across the platform
- `lib/nav.ts` — sidebar structure and prev/next order
- `app/*/page.tsx` — the prose for each section

## Structure

```
app/            one folder per documentation page
components/     site shell, UI kit, diagram kit, diagrams
lib/            portal and navigation data
```
