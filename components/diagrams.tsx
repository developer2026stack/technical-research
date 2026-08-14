import { Arrow, Cluster, EdgeTag, Label, Legend, Node, Svg, TONE } from "./diagram-kit";
import { Flag, type CountryCode } from "./flags";

/* ============================================================
   1. The big picture — factory to front door, in four phases
   ============================================================ */

export function JourneyDiagram() {
  const lanes = [
    {
      px: 18,
      title: "PHASE 1 · SOURCING",
      geo: "China · Hong Kong · UAE",
      tone: "violet" as const,
      nodes: ["Supplier Portal", "Factory Portal", "Advertisement Portal"],
    },
    {
      px: 318,
      title: "PHASE 2 · THE KSA HUB",
      geo: "Jeddah head office",
      tone: "ocean" as const,
      nodes: ["Clearance Portal", "Warehouse Portal", "Stock Portal"],
    },
    {
      px: 618,
      title: "PHASE 3 · MOVEMENT",
      geo: "Roads, air and sea",
      tone: "teal" as const,
      nodes: ["Logistics Portal", "Delivery Portal"],
    },
    {
      px: 918,
      title: "PHASE 4 · THE MARKET",
      geo: "KSA and worldwide",
      tone: "gold" as const,
      nodes: ["Customer Portal", "Saudi Export Portal"],
    },
  ];

  return (
    <Svg viewBox="0 0 1180 412" minWidth={940} label="Four phase journey from sourcing to market">
      {lanes.map((lane) => (
        <g key={lane.title}>
          <rect
            x={lane.px}
            y={8}
            width={234}
            height={272}
            rx={16}
            fill="var(--surface-2)"
            fillOpacity={0.6}
            stroke="var(--line)"
          />
          <text x={lane.px + 16} y={32} fontSize={11.5} fontWeight={700} fill={TONE[lane.tone]}>
            {lane.title}
          </text>
          <text x={lane.px + 16} y={49} fontSize={10.5} fill="var(--text-dim)">
            {lane.geo}
          </text>
          {lane.nodes.map((n, i) => (
            <Node
              key={n}
              x={lane.px + 12}
              y={64 + i * 62}
              w={210}
              title={n}
              tone={lane.tone}
            />
          ))}
        </g>
      ))}

      {/* movement between phases */}
      <Arrow d="M256,150 H316" tone="dim" animated />
      <Arrow d="M556,150 H616" tone="dim" animated />
      <Arrow d="M856,150 H916" tone="dim" animated />
      <EdgeTag x={286} y={150} text="Sea / Air" tone="violet" />
      <EdgeTag x={586} y={150} text="Cleared" tone="ocean" />
      <EdgeTag x={886} y={150} text="Dispatched" tone="teal" />

      {/* the two back-office portals watch every phase */}
      <rect
        x={18}
        y={314}
        width={1134}
        height={56}
        rx={14}
        fill="var(--rose-soft)"
        stroke={TONE.rose}
        strokeOpacity={0.5}
        strokeDasharray="5 5"
      />
      <text x={38} y={338} fontSize={12.5} fontWeight={700} fill={TONE.rose}>
        CORE OPERATIONS · Management Portal + Administration Portal
      </text>
      <text x={38} y={355} fontSize={10.5} fill="var(--text-dim)">
        Money, performance and legal compliance are watched across all four phases.
      </text>
      {[135, 435, 735, 1035].map((x) => (
        <Arrow key={x} d={`M${x},310 V286`} tone="rose" dashed />
      ))}

      <Legend
        x={18}
        y={398}
        items={[
          { tone: "violet", text: "Origin countries" },
          { tone: "ocean", text: "Saudi hub" },
          { tone: "teal", text: "Distribution" },
          { tone: "gold", text: "End buyer" },
        ]}
      />
    </Svg>
  );
}

/* ============================================================
   2. The 12 portals, grouped
   ============================================================ */

export function PortalMapDiagram() {
  return (
    <Svg viewBox="0 0 1120 600" minWidth={900} label="Map of the twelve portals grouped by phase">
      <Cluster x={20} y={40} w={340} h={250} label="Sourcing" note="Find it, brand it, market it" tone="violet">
        <Node x={40} y={104} w={300} title="1 · Supplier / Vendor" sub="Prices compared by country" tone="violet" />
        <Node x={40} y={168} w={300} title="2 · Factory" sub="Private label production" tone="violet" />
        <Node x={40} y={232} w={300} title="3 · Advertisement" sub="Online and offline campaigns" tone="violet" />
      </Cluster>

      <Cluster x={390} y={40} w={340} h={250} label="The Jeddah Hub" note="Clear it, store it, sell it ready" tone="ocean">
        <Node x={410} y={104} w={300} title="4 · Clearance" sub="8 partner customs brokers" tone="ocean" />
        <Node x={410} y={168} w={300} title="5 · Warehouse / Hub" sub="Volume-based storage pricing" tone="ocean" />
        <Node x={410} y={232} w={300} title="6 · Stock" sub="Goods + clearance + delivery" tone="ocean" />
      </Cluster>

      <Cluster x={760} y={40} w={340} h={190} label="Movement" note="Route it and deliver it" tone="teal">
        <Node x={780} y={104} w={300} title="7 · Logistics" sub="Internal control room" tone="teal" />
        <Node x={780} y={168} w={300} title="8 · Delivery Service" sub="Local and cross-border" tone="teal" />
      </Cluster>

      <Cluster x={760} y={260} w={340} h={190} label="Market" note="Where money comes in" tone="gold">
        <Node x={780} y={324} w={300} title="9 · Customer" sub="B2B and B2C in one shop" tone="gold" />
        <Node x={780} y={388} w={300} title="10 · Saudi Export" sub="Oud, abayas, beauty — worldwide" tone="gold" />
      </Cluster>

      <Cluster x={20} y={340} w={710} h={170} label="Core operations" note="Always on, behind every portal" tone="rose">
        <Node x={40} y={404} w={320} title="11 · Management" sub="The revenue engine" tone="rose" />
        <Node x={380} y={404} w={330} title="12 · Administration" sub="Registration, ministry, policy" tone="rose" />
      </Cluster>

      <Arrow d="M362,165 H386" tone="dim" />
      <Arrow d="M732,135 H756" tone="dim" />
      <Arrow d="M930,232 V256" tone="dim" />
      <Arrow d="M180,336 V296" tone="rose" dashed />
      <Arrow d="M560,336 V296" tone="rose" dashed />
      <Arrow d="M734,420 H756" tone="rose" dashed />

      <Legend
        x={20}
        y={555}
        items={[
          { tone: "dim", text: "Goods and orders flow" },
          { tone: "rose", text: "Oversight and compliance" },
        ]}
      />
    </Svg>
  );
}

/* ============================================================
   3. Technical architecture
   ============================================================ */

export function ArchitectureDiagram() {
  return (
    <Svg viewBox="0 0 1120 872" minWidth={900} label="Technical architecture layers from clients to data">
      <Cluster x={20} y={20} w={1080} h={100} label="Who uses it" tone="gold">
        <Node x={40} y={56} w={326} h={48} title="Buyers — web and mobile" tone="gold" />
        <Node x={387} y={56} w={326} h={48} title="Staff — hub, logistics, admin" tone="gold" />
        <Node x={734} y={56} w={326} h={48} title="Partners — suppliers, brokers" tone="gold" />
      </Cluster>
      <Arrow d="M560,124 V140" tone="dim" />

      <Cluster x={20} y={144} w={1080} h={100} label="Edge" note="First line of defence and speed" tone="rose">
        <Node x={40} y={180} w={500} h={48} title="Cloudflare — WAF, DDoS, CDN" tone="rose" />
        <Node x={560} y={180} w={500} h={48} title="Vercel — global hosting for 12 apps" tone="rose" />
      </Cluster>
      <Arrow d="M560,248 V266" tone="dim" />

      <Cluster
        x={20}
        y={270}
        w={1080}
        h={120}
        label="Frontend — one monorepo"
        note="Turborepo keeps 12 Next.js apps sharing the same UI kit"
        tone="ocean"
      >
        <Node x={40} y={322} w={326} h={48} title="Public apps — SEO first" tone="ocean" />
        <Node x={387} y={322} w={326} h={48} title="Staff dashboards" tone="ocean" />
        <Node x={734} y={322} w={326} h={48} title="Shared UI + design tokens" tone="ocean" />
      </Cluster>
      <Arrow d="M560,394 V412" tone="dim" />

      <Cluster x={20} y={416} w={1080} h={100} label="Door check" note="Every request is named and permitted" tone="violet">
        <Node x={40} y={452} w={500} h={48} title="Keycloak — one login, 12 portals" tone="violet" />
        <Node x={560} y={452} w={500} h={48} title="API gateway — rate limits, routing" tone="violet" />
      </Cluster>
      <Arrow d="M560,520 V538" tone="dim" />

      <Cluster
        x={20}
        y={542}
        w={1080}
        h={170}
        label="Backend services — NestJS"
        note="Small services, one job each, all speaking TypeScript"
        tone="teal"
      >
        <Node x={40} y={588} w={243} h={44} title="Sourcing & RFQ" tone="teal" />
        <Node x={299} y={588} w={243} h={44} title="Clearance" tone="teal" />
        <Node x={558} y={588} w={243} h={44} title="Warehouse & stock" tone="teal" />
        <Node x={817} y={588} w={243} h={44} title="Orders & pricing" tone="teal" />
        <Node x={40} y={646} w={243} h={44} title="Shipping engine" tone="teal" />
        <Node x={299} y={646} w={243} h={44} title="Payments & invoicing" tone="teal" />
        <Node x={558} y={646} w={243} h={44} title="Tracking (WebSocket)" tone="teal" />
        <Node x={817} y={646} w={243} h={44} title="Reporting & alerts" tone="teal" />
      </Cluster>
      <Arrow d="M560,716 V734" tone="dim" />

      <Cluster x={20} y={738} w={1080} h={100} label="Where data lives" tone="ocean">
        <Node x={40} y={774} w={243} h={48} title="PostgreSQL" sub="Orders, money, truth" tone="ocean" />
        <Node x={299} y={774} w={243} h={48} title="Redis" sub="Live stock and tracking" tone="ocean" />
        <Node x={558} y={774} w={243} h={48} title="MongoDB" sub="Logs and activity" tone="ocean" />
        <Node x={817} y={774} w={243} h={48} title="Object storage" sub="Documents, photos" tone="ocean" />
      </Cluster>

      <Label x={20} y={862} anchor="start">
        Requests travel top to bottom; every layer can be scaled on its own.
      </Label>
    </Svg>
  );
}

/* ============================================================
   4. One order, followed step by step
   ============================================================ */

export function LifecycleDiagram() {
  const lanes = [
    { name: "Buyer", tone: "gold" as const },
    { name: "Platform", tone: "ocean" as const },
    { name: "Hub & customs", tone: "violet" as const },
    { name: "Courier", tone: "teal" as const },
  ];
  const laneY = (i: number) => 60 + i * 88;
  const cols = [180, 342, 504, 666, 828, 990];

  const steps: { lane: number; col: number; title: string; sub: string; tone: "gold" | "ocean" | "violet" | "teal" }[] = [
    { lane: 0, col: 0, title: "Order placed", sub: "B2B tier or B2C price", tone: "gold" },
    { lane: 1, col: 1, title: "Stock reserved", sub: "Payment authorised", tone: "ocean" },
    { lane: 2, col: 2, title: "Picked & packed", sub: "Barcode scanned", tone: "violet" },
    { lane: 2, col: 3, title: "Customs cleared", sub: "Duty paid, papers filed", tone: "violet" },
    { lane: 3, col: 4, title: "Best courier books", sub: "SMSA · Aramex · DHL", tone: "teal" },
    { lane: 0, col: 5, title: "Delivered", sub: "POD + ZATCA invoice", tone: "gold" },
  ];

  return (
    <Svg viewBox="0 0 1180 470" minWidth={940} label="Swimlane diagram of one order from placement to delivery">
      {lanes.map((l, i) => (
        <g key={l.name}>
          <rect
            x={20}
            y={laneY(i)}
            width={1140}
            height={88}
            fill={i % 2 ? "var(--surface-2)" : "var(--surface)"}
            fillOpacity={0.65}
            stroke="var(--line-soft)"
          />
          <text x={38} y={laneY(i) + 46} fontSize={12.5} fontWeight={700} fill={TONE[l.tone]}>
            {l.name}
          </text>
        </g>
      ))}

      <Label x={180} y={40} anchor="start" bold>
        Hour 0
      </Label>
      <Label x={1130} y={40} anchor="end" bold>
        Delivered — 24h local, 3–5 days export
      </Label>
      <line x1={160} y1={48} x2={1160} y2={48} stroke="var(--line)" strokeDasharray="4 6" />

      {steps.map((s, i) => (
        <Node
          key={s.title}
          x={cols[s.col]}
          y={laneY(s.lane) + 20}
          w={140}
          h={48}
          title={`${i + 1} · ${s.title}`}
          sub={s.sub}
          tone={s.tone}
        />
      ))}

      {/* connectors between consecutive steps */}
      {steps.slice(0, -1).map((s, i) => {
        const n = steps[i + 1];
        const x1 = cols[s.col] + 140;
        const y1 = laneY(s.lane) + 44;
        const x2 = cols[n.col];
        const y2 = laneY(n.lane) + 44;
        const mid = x1 + (x2 - x1) / 2;
        const d =
          y1 === y2
            ? `M${x1},${y1} H${x2 - 4}`
            : `M${x1},${y1} H${mid} V${y2} H${x2 - 4}`;
        return <Arrow key={i} d={d} tone="dim" />;
      })}

      {/* the loop back: money and data return to the platform */}
      <Arrow d="M1060,150 V420 H240 V150" tone="ocean" dashed />
      <Label x={640} y={412} tone="ocean">
        Cash, proof of delivery and performance data flow back into the Management Portal
      </Label>
    </Svg>
  );
}

/* ============================================================
   5. The shipping engine (courier aggregator)
   ============================================================ */

export function ShippingEngineDiagram() {
  return (
    <Svg viewBox="0 0 1040 400" minWidth={820} label="Shipping engine comparing three couriers">
      <Node
        x={20}
        y={158}
        w={200}
        h={64}
        title="Parcel details"
        sub="Weight · size · destination"
        tone="gold"
      />
      <Arrow d="M224,190 H286" tone="dim" />

      <rect x={290} y={130} width={240} height={124} rx={14} fill="var(--ocean-soft)" stroke={TONE.ocean} />
      <text x={310} y={158} fontSize={13.5} fontWeight={700} fill={TONE.ocean}>
        Shipping Engine
      </text>
      <text x={310} y={180} fontSize={11} fill="var(--text-soft)">
        1 · Ask every carrier at once
      </text>
      <text x={310} y={200} fontSize={11} fill="var(--text-soft)">
        2 · Compare price, speed, coverage
      </text>
      <text x={310} y={220} fontSize={11} fill="var(--text-soft)">
        3 · Book the winner, store the label
      </text>
      <text x={310} y={240} fontSize={11} fill="var(--text-soft)">
        4 · Normalise every status code
      </text>

      <Arrow d="M534,180 H616" tone="teal" />
      <Arrow d="M534,192 H616" tone="teal" />
      <Arrow d="M534,204 H616" tone="teal" />

      <Node x={620} y={76} w={240} h={56} title="SMSA Express" sub="Inside KSA · COD ready" tone="teal" />
      <Node x={620} y={164} w={240} h={56} title="Aramex" sub="GCC cross-border" tone="teal" />
      <Node x={620} y={252} w={240} h={56} title="DHL / FedEx" sub="Worldwide express" tone="teal" />

      <Arrow d="M864,104 H930 V300" tone="dim" dashed />
      <Arrow d="M864,192 H930 V300" tone="dim" dashed />
      <Arrow d="M864,280 H930 V300" tone="dim" dashed />

      <Node x={290} y={300} w={240} h={56} title="One tracking page" sub="Same view, any carrier" tone="gold" />
      <Arrow d="M930,328 H536" tone="gold" />

      <Label x={20} y={380} anchor="start">
        Adding a fourth courier later means one new adapter — no change to any portal.
      </Label>
    </Svg>
  );
}

/* ============================================================
   6. Payment routing
   ============================================================ */

export function PaymentDiagram() {
  return (
    <Svg viewBox="0 0 1060 360" minWidth={840} label="How a payment is routed to the right gateway">
      <Node x={20} y={140} w={180} h={60} title="Checkout" sub="Cart is confirmed" tone="gold" />
      <Arrow d="M204,170 H246" tone="dim" />
      <Node x={250} y={140} w={190} h={60} title="Who is paying?" sub="Country + buyer type" tone="ocean" filled />

      <Arrow d="M444,160 H480 V96 H516" tone="dim" />
      <Arrow d="M444,170 H516" tone="dim" />
      <Arrow d="M444,180 H480 V264 H516" tone="dim" />

      <Node x={520} y={68} w={250} h={56} title="Moyasar" sub="Mada · STC Pay · Apple Pay" tone="teal" />
      <Node x={520} y={142} w={250} h={56} title="HyperPay" sub="MENA B2B enterprise" tone="teal" />
      <Node x={520} y={236} w={250} h={56} title="Checkout.com" sub="Cards, multi-currency" tone="teal" />

      <Label x={478} y={58} anchor="middle" tone="dim" size={10}>
        KSA retail
      </Label>
      <Label x={478} y={132} anchor="middle" tone="dim" size={10}>
        Regional business
      </Label>
      <Label x={478} y={226} anchor="middle" tone="dim" size={10}>
        International
      </Label>

      <Arrow d="M774,96 H820 V150" tone="dim" dashed />
      <Arrow d="M774,170 H820 V150" tone="dim" dashed />
      <Arrow d="M774,264 H820 V190" tone="dim" dashed />
      <Node x={824} y={140} w={210} h={60} title="Ledger + ZATCA" sub="One invoice format for all" tone="violet" />

      <Label x={20} y={336} anchor="start">
        The buyer never sees this choice — they only see the payment methods they already trust.
      </Label>
    </Svg>
  );
}

/* ============================================================
   7. Build roadmap
   ============================================================ */

export function RoadmapDiagram() {
  const months = 12;
  const x0 = 230;
  const x1 = 1030;
  const step = (x1 - x0) / months;
  const bars = [
    { name: "Foundation", note: "Monorepo, auth, design system", start: 0, end: 2, tone: "ocean" as const },
    { name: "Hub first", note: "Clearance + Warehouse + Stock", start: 1.5, end: 5, tone: "violet" as const },
    { name: "Money flowing", note: "Customer Portal + payments", start: 4, end: 7.5, tone: "gold" as const },
    { name: "Moving goods", note: "Shipping engine + Logistics", start: 6.5, end: 9.5, tone: "teal" as const },
    { name: "Reach out", note: "Export, Factory, Ads, Management", start: 9, end: 12, tone: "rose" as const },
  ];

  return (
    <Svg viewBox="0 0 1060 400" minWidth={860} label="Twelve month build roadmap in five phases">
      {Array.from({ length: months + 1 }).map((_, i) => (
        <g key={i}>
          <line
            x1={x0 + i * step}
            y1={54}
            x2={x0 + i * step}
            y2={352}
            stroke="var(--line-soft)"
            strokeWidth={1}
          />
          {i < months && (
            <text
              x={x0 + i * step + step / 2}
              y={44}
              fontSize={10.5}
              textAnchor="middle"
              fill="var(--text-dim)"
            >
              {`M${i + 1}`}
            </text>
          )}
        </g>
      ))}

      {bars.map((b, i) => {
        const y = 74 + i * 56;
        return (
          <g key={b.name}>
            <text x={20} y={y + 20} fontSize={13} fontWeight={600} fill="var(--text)">
              {b.name}
            </text>
            <text x={20} y={y + 36} fontSize={10.5} fill="var(--text-dim)">
              {b.note}
            </text>
            <rect
              x={x0 + b.start * step}
              y={y}
              width={(b.end - b.start) * step}
              height={34}
              rx={9}
              fill={TONE[b.tone]}
              fillOpacity={0.22}
              stroke={TONE[b.tone]}
            />
            <text
              x={x0 + b.start * step + 12}
              y={y + 22}
              fontSize={11.5}
              fontWeight={600}
              fill={TONE[b.tone]}
            >
              {`Phase ${i + 1}`}
            </text>
          </g>
        );
      })}

      <line x1={x0 + 7.5 * step} y1={54} x2={x0 + 7.5 * step} y2={368} stroke={TONE.gold} strokeDasharray="5 4" />
      <text x={x0 + 7.5 * step + 8} y={384} fontSize={11} fontWeight={700} fill={TONE.gold}>
        First real revenue
      </text>
    </Svg>
  );
}

/* ============================================================
   8. Security path
   ============================================================ */

export function SecurityDiagram() {
  const chain = [
    { title: "Request arrives", sub: "Browser or partner API", tone: "gold" as const },
    { title: "Cloudflare WAF", sub: "Bad traffic dropped", tone: "rose" as const },
    { title: "Keycloak login", sub: "SSO + 2-factor", tone: "violet" as const },
    { title: "Role check", sub: "RBAC per portal", tone: "ocean" as const },
    { title: "Service + data", sub: "AES-256 at rest", tone: "teal" as const },
  ];
  return (
    <Svg viewBox="0 0 1120 300" minWidth={880} label="Security checkpoints a request passes through">
      {chain.map((c, i) => {
        const x = 20 + i * 220;
        return (
          <g key={c.title}>
            <Node x={x} y={70} w={180} h={64} title={c.title} sub={c.sub} tone={c.tone} />
            {i < chain.length - 1 && <Arrow d={`M${x + 184},102 H${x + 216}`} tone="dim" />}
            <Arrow d={`M${x + 90},138 V186`} tone="rose" dashed />
          </g>
        );
      })}
      <rect
        x={20}
        y={190}
        width={1080}
        height={52}
        rx={12}
        fill="var(--rose-soft)"
        stroke={TONE.rose}
        strokeOpacity={0.5}
        strokeDasharray="5 5"
      />
      <text x={40} y={212} fontSize={12.5} fontWeight={700} fill={TONE.rose}>
        Audit log — every step is written down
      </text>
      <text x={40} y={230} fontSize={10.5} fill="var(--text-dim)">
        Who did it, what changed, from where, and at what time. Kept for regulators and for us.
      </text>
      <Label x={20} y={276} anchor="start">
        A request that fails any checkpoint stops there — it never reaches the database.
      </Label>
    </Svg>
  );
}

/* ============================================================
   9. Revenue streams (used on the story page)
   ============================================================ */

export function RevenueDiagram() {
  const streams = [
    { title: "Sourcing commission", sub: "Per supplier order", tone: "violet" as const },
    { title: "Clearance fee", sub: "Shared with brokers", tone: "ocean" as const },
    { title: "Storage rent", sub: "Per cubic metre, per day", tone: "ocean" as const },
    { title: "Shipping margin", sub: "Bought low, sold fair", tone: "teal" as const },
    { title: "Marketplace cut", sub: "B2C and B2B sales", tone: "gold" as const },
    { title: "Advertising", sub: "Banners and offline media", tone: "gold" as const },
  ];
  return (
    <Svg viewBox="0 0 1060 340" minWidth={820} label="Six revenue streams feeding the management portal">
      {streams.map((s, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <Node
            key={s.title}
            x={20 + col * 350}
            y={20 + row * 78}
            w={330}
            h={60}
            title={s.title}
            sub={s.sub}
            tone={s.tone}
          />
        );
      })}
      {[185, 535, 885].map((x) => (
        <Arrow key={x} d={`M${x},176 V230`} tone="dim" dashed />
      ))}
      <rect x={20} y={234} width={1020} height={64} rx={14} fill="var(--rose-soft)" stroke={TONE.rose} />
      <text x={44} y={262} fontSize={14} fontWeight={700} fill={TONE.rose}>
        Management Portal — the revenue engine
      </text>
      <text x={44} y={282} fontSize={11} fill="var(--text-dim)">
        Six income streams, one honest number at the end of the month.
      </text>
      <Label x={20} y={330} anchor="start">
        No single stream carries the business — that is the point of building twelve portals, not one shop.
      </Label>
    </Svg>
  );
}

/* ============================================================
   10. Multi-region topology
   ============================================================ */

const regions = [
  {
    x: 20,
    label: "KSA · Primary",
    note: "Riyadh / Jeddah",
    flags: ["SA"] as CountryCode[],
    tone: "ocean" as const,
    rows: [
      { t: "All 12 portals", s: "Full read + write" },
      { t: "Redis (local)", s: "Live stock, tracking" },
      { t: "PostgreSQL PRIMARY", s: "The only place writes land" },
      { t: "Document storage", s: "Licences, customs papers" },
    ],
  },
  {
    x: 310,
    label: "GCC · Dubai",
    note: "Sourcing & partners",
    flags: ["AE"] as CountryCode[],
    tone: "teal" as const,
    rows: [
      { t: "Supplier + Logistics", s: "Read-heavy screens" },
      { t: "Redis (local)", s: "Regional cache" },
      { t: "Read replica", s: "Operational data" },
      { t: "No personal data", s: "Restricted class blocked" },
    ],
  },
  {
    x: 600,
    label: "Europe · Frankfurt",
    note: "Export buyers",
    flags: ["EU", "GB"] as CountryCode[],
    tone: "violet" as const,
    rows: [
      { t: "Saudi Export Portal", s: "Fast for EU / UK buyers" },
      { t: "Redis (local)", s: "Catalogue cache" },
      { t: "Catalogue replica", s: "Products and prices only" },
      { t: "No personal data", s: "Checkout calls KSA" },
    ],
  },
  {
    x: 890,
    label: "Asia · Hong Kong",
    note: "Factories & suppliers",
    flags: ["CN", "HK"] as CountryCode[],
    tone: "gold" as const,
    rows: [
      { t: "Supplier + Factory", s: "Near the source" },
      { t: "Redis (local)", s: "Quote cache" },
      { t: "Catalogue replica", s: "Products and RFQs" },
      { t: "No personal data", s: "Restricted class blocked" },
    ],
  },
];

export function RegionDiagram() {
  return (
    <Svg viewBox="0 0 1180 590" minWidth={960} label="Multi-region deployment with a Saudi primary and regional read replicas">
      {(
        [
          { t: "Shoppers in KSA", f: ["SA"] },
          { t: "Partners across the GCC", f: ["AE"] },
          { t: "Buyers in Europe & US", f: ["EU", "GB", "US"] },
          { t: "Suppliers in China & HK", f: ["CN", "HK"] },
        ] as { t: string; f: CountryCode[] }[]
      ).map((u, i) => (
        <g key={u.t}>
          <Node x={20 + i * 290} y={14} w={270} h={48} title={u.t} tone="dim" />
          {u.f.map((f, fi) => (
            <Flag
              key={f}
              code={f}
              size={22}
              x={20 + i * 290 + 254 - (u.f.length - fi) * 26}
              y={28}
            />
          ))}
        </g>
      ))}

      <Node
        x={20}
        y={100}
        w={1140}
        h={52}
        title="Cloudflare + Vercel edge — whichever location is nearest answers first"
        tone="rose"
        filled
      />
      {[155, 445, 735, 1025].map((x) => (
        <Arrow key={x} d={`M${x},66 V96`} tone="dim" />
      ))}
      {[155, 445, 735, 1025].map((x) => (
        <Arrow key={`d${x}`} d={`M${x},156 V176`} tone="dim" />
      ))}

      {regions.map((r) => (
        <g key={r.label}>
          <Cluster x={r.x} y={180} w={270} h={280} label={r.label} note={r.note} tone={r.tone} />
          {r.flags.map((f, fi) => (
            <Flag key={f} code={f} size={24} x={r.x + 246 - (r.flags.length - fi) * 28} y={192} />
          ))}
          {r.rows.map((row, i) => (
            <Node
              key={row.t}
              x={r.x + 20}
              y={234 + i * 56}
              w={230}
              h={48}
              title={row.t}
              sub={row.s}
              tone={r.tone}
            />
          ))}
        </g>
      ))}

      {[
        { from: 445, drop: 478 },
        { from: 735, drop: 486 },
        { from: 1025, drop: 494 },
      ].map((p) => (
        <Arrow key={p.from} d={`M${p.from},464 V${p.drop} H155 V463`} tone="ocean" dashed />
      ))}
      <EdgeTag x={300} y={478} text="Every write goes home to KSA" tone="ocean" />

      <rect
        x={20}
        y={510}
        width={1140}
        height={54}
        rx={14}
        fill="var(--rose-soft)"
        stroke={TONE.rose}
        strokeOpacity={0.55}
        strokeDasharray="5 5"
      />
      <text x={40} y={533} fontSize={12.5} fontWeight={700} fill={TONE.rose}>
        DATA RESIDENCY — personal and financial records never leave Saudi Arabia
      </text>
      <text x={40} y={550} fontSize={10.5} fill="var(--text-dim)">
        Other regions hold catalogue and operational copies only. The class of the data decides where it may travel.
      </text>

      <Legend
        x={20}
        y={584}
        items={[
          { tone: "dim", text: "User traffic" },
          { tone: "ocean", text: "Writes to the primary" },
          { tone: "rose", text: "Residency boundary" },
        ]}
      />
    </Svg>
  );
}

/* ============================================================
   11. Multi-currency money flow
   ============================================================ */

export function CurrencyDiagram() {
  const buyers: { c: string; m: string; s: string; f: CountryCode }[] = [
    { c: "SAR", m: "Saudi Arabia", s: "\uFDFC", f: "SA" },
    { c: "AED", m: "UAE & GCC", s: "\u062f.\u0625", f: "AE" },
    { c: "USD", m: "Global export", s: "$", f: "US" },
    { c: "EUR", m: "Europe", s: "\u20ac", f: "EU" },
    { c: "GBP", m: "United Kingdom", s: "\u00a3", f: "GB" },
  ];
  return (
    <Svg viewBox="0 0 1180 480" minWidth={960} label="How one price becomes many currencies and comes back to one ledger">
      <Label x={20} y={44} anchor="start" bold>
        The buyer sees
      </Label>
      {buyers.map((b, i) => (
        <g key={b.c}>
          <Node x={20} y={60 + i * 54} w={200} h={44} title={b.c} sub={b.m} tone="gold" />
          <text
            x={172}
            y={87 + i * 54}
            fontSize={13}
            fontWeight={700}
            textAnchor="end"
            direction="ltr"
            fill="var(--gold)"
          >
            {b.s}
          </text>
          <Flag code={b.f} size={24} x={180} y={71 + i * 54} />
          <path
            d={`M224,${82 + i * 54} H252 V196`}
            fill="none"
            stroke={TONE.dim}
            strokeWidth={1.4}
            opacity={0.55}
          />
        </g>
      ))}
      <Arrow d="M252,196 H286" tone="dim" />

      <rect x={290} y={60} width={300} height={272} rx={14} fill="var(--ocean-soft)" stroke={TONE.ocean} />
      <text x={312} y={88} fontSize={13.5} fontWeight={700} fill={TONE.ocean}>
        Price engine
      </text>
      {[
        "1 · Base price is held in SAR",
        "2 · Daily FX rate + safety buffer",
        "3 · Rounding rule for that market",
        "4 · Tax: 15% VAT, or zero-rated export",
        "5 · Landed cost: duty + shipping",
        "6 · Rate locked for 15 min at checkout",
      ].map((t, i) => (
        <text key={t} x={312} y={116 + i * 22} fontSize={11} fill="var(--text-soft)">
          {t}
        </text>
      ))}
      <text x={312} y={310} fontSize={10.5} fontWeight={600} fill={TONE.ocean}>
        One rule set — no portal prices anything on its own.
      </text>

      <Arrow d="M594,140 H636" tone="dim" />
      <Arrow d="M594,230 H636" tone="dim" />
      <Node x={640} y={110} w={250} h={60} title="Checkout" sub="Shown in the buyer's currency" tone="teal" />
      <Node x={640} y={200} w={250} h={60} title="Gateway settles" sub="Moyasar SAR · Checkout.com multi" tone="teal" />

      <Arrow d="M894,140 H926" tone="dim" />
      <Arrow d="M894,230 H926" tone="dim" />
      <Node x={930} y={110} w={230} h={60} title="Ledger in SAR" sub="One base currency for the books" tone="violet" />
      <Node x={930} y={200} w={230} h={60} title="Supplier payouts" sub="CNY · AED · USD as agreed" tone="violet" />

      <rect
        x={20}
        y={362}
        width={1140}
        height={58}
        rx={14}
        fill="var(--violet-soft)"
        stroke={TONE.violet}
        strokeOpacity={0.55}
      />
      <text x={40} y={386} fontSize={12.5} fontWeight={700} fill={TONE.violet}>
        STORED SHAPE — amount in minor units + currency + FX rate + rate timestamp
      </text>
      <text x={40} y={404} fontSize={10.5} fill="var(--text-dim)">
        Never a bare number. A refund six months later must use the rate the buyer actually paid at.
      </text>

      <Label x={20} y={452} anchor="start">
        Money enters in five currencies, is recorded in one, and leaves in whichever currency the supplier agreed to.
      </Label>
    </Svg>
  );
}

/* ============================================================
   12. ISO standards mapped to platform controls
   ============================================================ */

export function IsoDiagram() {
  const rows = [
    {
      std: "ISO/IEC 27001",
      stdSub: "Information security",
      ctrl: "Keycloak RBAC, deny by default",
      ctrlSub: "Encryption, patching, access reviews",
      ev: "Audit log of every change",
      evSub: "Who, what, when, from where",
      tone: "ocean" as const,
    },
    {
      std: "ISO/IEC 27701",
      stdSub: "Privacy (aligns with PDPL)",
      ctrl: "Consent, retention, deletion",
      ctrlSub: "Personal data kept inside KSA",
      ev: "Data map + consent records",
      evSub: "Exportable on request",
      tone: "violet" as const,
    },
    {
      std: "ISO 22301",
      stdSub: "Business continuity",
      ctrl: "Multi-region failover, backups",
      ctrlSub: "RTO and RPO agreed per service",
      ev: "DR test reports",
      evSub: "Drills run, not assumed",
      tone: "teal" as const,
    },
    {
      std: "ISO 28000",
      stdSub: "Supply chain security",
      ctrl: "Vetted partners, sealed handovers",
      ctrlSub: "Broker and courier due diligence",
      ev: "Chain of custody per shipment",
      evSub: "Every scan and handover stored",
      tone: "gold" as const,
    },
    {
      std: "ISO 9001",
      stdSub: "Quality management",
      ctrl: "SLA tracking, incident register",
      ctrlSub: "Corrective actions with owners",
      ev: "KPI dashboards + CAPA log",
      evSub: "Straight out of the Management Portal",
      tone: "rose" as const,
    },
  ];
  return (
    <Svg viewBox="0 0 1180 490" minWidth={960} label="ISO standards mapped to platform controls and the evidence they produce">
      <Label x={20} y={32} anchor="start" bold>
        The standard asks for…
      </Label>
      <Label x={370} y={32} anchor="start" bold>
        …the platform implements…
      </Label>
      <Label x={780} y={32} anchor="start" bold>
        …and produces the proof
      </Label>

      <Cluster x={350} y={44} w={380} h={382} label="Controls" tone="ocean" />
      <Cluster x={760} y={44} w={400} h={382} label="Evidence" tone="teal" />

      {rows.map((r, i) => {
        const y = 84 + i * 70;
        const c = y + 30;
        return (
          <g key={r.std}>
            <Node x={20} y={y} w={280} h={60} title={r.std} sub={r.stdSub} tone={r.tone} />
            <Arrow d={`M304,${c} H366`} tone="dim" />
            <Node x={370} y={y} w={340} h={60} title={r.ctrl} sub={r.ctrlSub} tone={r.tone} />
            <Arrow d={`M714,${c} H776`} tone="dim" />
            <Node x={780} y={y} w={360} h={60} title={r.ev} sub={r.evSub} tone={r.tone} />
          </g>
        );
      })}

      <Label x={20} y={462} anchor="start">
        Certification is 20% technology and 80% evidence — so the platform generates the evidence by itself, every day.
      </Label>
    </Svg>
  );
}
