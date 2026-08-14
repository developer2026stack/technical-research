/* Shared SVG building blocks for every diagram in this documentation.
   Everything is drawn with CSS variables, so diagrams follow the theme. */

export const TONE = {
  ocean: "var(--ocean)",
  teal: "var(--teal)",
  gold: "var(--gold)",
  violet: "var(--violet)",
  rose: "var(--rose)",
  dim: "var(--text-dim)",
} as const;

export type ToneKey = keyof typeof TONE;

const TONE_SOFT: Record<ToneKey, string> = {
  ocean: "var(--ocean-soft)",
  teal: "var(--teal-soft)",
  gold: "var(--gold-soft)",
  violet: "var(--violet-soft)",
  rose: "var(--rose-soft)",
  dim: "var(--surface-2)",
};

/** Arrow heads, one per tone (markers cannot inherit a path's stroke colour). */
export function Defs() {
  return (
    <defs>
      {(Object.keys(TONE) as ToneKey[]).map((k) => (
        <marker
          key={k}
          id={`ah-${k}`}
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 1.5 L9 5 L0 8.5 z" fill={TONE[k]} />
        </marker>
      ))}
    </defs>
  );
}

export function Svg({
  viewBox,
  minWidth,
  children,
  label,
}: {
  viewBox: string;
  minWidth: number;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className="h-auto w-full"
      style={{ minWidth, fontFamily: "var(--font-sans)" }}
    >
      <Defs />
      {children}
    </svg>
  );
}

/** A labelled box: soft card, colour accent bar, title and optional sub-line. */
export function Node({
  x,
  y,
  w,
  h = 54,
  title,
  sub,
  tone = "ocean",
  filled = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  tone?: ToneKey;
  filled?: boolean;
}) {
  const c = TONE[tone];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={filled ? TONE_SOFT[tone] : "var(--surface)"}
        stroke={filled ? c : "var(--line)"}
        strokeWidth={1.2}
      />
      <rect x={x + 8} y={y + 11} width={3} height={h - 22} rx={1.5} fill={c} />
      <text
        x={x + 20}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4.5}
        fontSize={13}
        fontWeight={600}
        fill="var(--text)"
      >
        {title}
      </text>
      {sub && (
        <text x={x + 20} y={y + h / 2 + 14} fontSize={10.5} fill="var(--text-dim)">
          {sub}
        </text>
      )}
    </g>
  );
}

/** A dashed container that groups related nodes. */
export function Cluster({
  x,
  y,
  w,
  h,
  label,
  note,
  tone = "ocean",
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  note?: string;
  tone?: ToneKey;
  children?: React.ReactNode;
}) {
  const c = TONE[tone];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        fill={TONE_SOFT[tone]}
        fillOpacity={0.55}
        stroke={c}
        strokeOpacity={0.45}
        strokeWidth={1.2}
        strokeDasharray="5 5"
      />
      <text x={x + 16} y={y + 24} fontSize={12} fontWeight={700} fill={c}>
        {label.toUpperCase()}
      </text>
      {note && (
        <text x={x + 16} y={y + 40} fontSize={10.5} fill="var(--text-dim)">
          {note}
        </text>
      )}
      {children}
    </g>
  );
}

/** Straight or elbowed connector with an arrow head. */
export function Arrow({
  d,
  tone = "dim",
  dashed = false,
  animated = false,
  width = 1.6,
}: {
  d: string;
  tone?: ToneKey;
  dashed?: boolean;
  animated?: boolean;
  width?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed && !animated ? "5 5" : undefined}
      className={animated ? "flow-dash" : undefined}
      markerEnd={`url(#ah-${tone})`}
      opacity={dashed ? 0.7 : 1}
    />
  );
}

export function Label({
  x,
  y,
  children,
  tone,
  anchor = "middle",
  size = 11,
  bold = false,
}: {
  x: number;
  y: number;
  children: string;
  tone?: ToneKey;
  anchor?: "start" | "middle" | "end";
  size?: number;
  bold?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={bold ? 700 : 500}
      textAnchor={anchor}
      fill={tone ? TONE[tone] : "var(--text-dim)"}
    >
      {children}
    </text>
  );
}

/** A pill sitting on top of a connector, e.g. "Sea / Air freight". */
export function EdgeTag({
  x,
  y,
  text,
  tone = "dim",
  w,
}: {
  x: number;
  y: number;
  text: string;
  tone?: ToneKey;
  w?: number;
}) {
  const width = w ?? text.length * 6 + 18;
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 10}
        width={width}
        height={20}
        rx={10}
        fill="var(--surface)"
        stroke={TONE[tone]}
        strokeOpacity={0.4}
      />
      <text
        x={x}
        y={y + 4}
        fontSize={10.5}
        fontWeight={600}
        textAnchor="middle"
        fill={TONE[tone]}
      >
        {text}
      </text>
    </g>
  );
}

export function Legend({
  x,
  y,
  items,
}: {
  x: number;
  y: number;
  items: { tone: ToneKey; text: string }[];
}) {
  let cursor = x;
  return (
    <g>
      {items.map((it) => {
        const at = cursor;
        cursor += it.text.length * 6.2 + 34;
        return (
          <g key={it.text}>
            <rect x={at} y={y - 8} width={10} height={10} rx={3} fill={TONE[it.tone]} />
            <text x={at + 16} y={y + 1} fontSize={11} fill="var(--text-dim)">
              {it.text}
            </text>
          </g>
        );
      })}
    </g>
  );
}
