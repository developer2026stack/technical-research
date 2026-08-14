/* Inline SVG flags — drawn rather than emoji, because regional-indicator emoji
   do not render as flags on Windows browsers. These are simplified but keep the
   correct colours, layout and 3:2 proportion at small sizes. */

export type CountryCode = "SA" | "CN" | "HK" | "AE" | "EU" | "GB" | "US" | "DE";

const star = (cx: number, cy: number, r: number, rot = -90) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = ((rot + i * 36) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.382;
    pts.push(`${(cx + rr * Math.cos(rad)).toFixed(2)},${(cy + rr * Math.sin(rad)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
};

export const COUNTRY_NAME: Record<CountryCode, string> = {
  SA: "Saudi Arabia",
  CN: "China",
  HK: "Hong Kong",
  AE: "United Arab Emirates",
  EU: "European Union",
  GB: "United Kingdom",
  US: "United States",
  DE: "Germany",
};

function Art({ code }: { code: CountryCode }) {
  switch (code) {
    case "SA":
      return (
        <>
          <rect width="24" height="16" fill="#006C35" />
          {/* shahada, suggested at this size rather than written */}
          <path
            d="M4.6 5.4h14.8"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2.6 1.1"
          />
          <path
            d="M5.2 7.4h13.6"
            stroke="#fff"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="1.6 0.9"
          />
          {/* sword */}
          <path d="M6.4 10.8h11.4" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
          <path d="M17.6 9.7l2.4 1.1-2.4 1.1z" fill="#fff" />
          <rect x="4.2" y="9.9" width="2.2" height="1.8" rx="0.7" fill="#fff" />
        </>
      );
    case "CN":
      return (
        <>
          <rect width="24" height="16" fill="#EE1C25" />
          <path d={star(4.8, 5, 2.8)} fill="#FFDE00" />
          <path d={star(9.6, 2.2, 0.95, -70)} fill="#FFDE00" />
          <path d={star(11.4, 4.2, 0.95, -85)} fill="#FFDE00" />
          <path d={star(11.4, 6.8, 0.95, -100)} fill="#FFDE00" />
          <path d={star(9.6, 8.7, 0.95, -115)} fill="#FFDE00" />
        </>
      );
    case "HK":
      return (
        <>
          <rect width="24" height="16" fill="#DE2910" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx="12"
              cy="4.7"
              rx="1.15"
              ry="2.7"
              fill="#fff"
              transform={`rotate(${i * 72} 12 8)`}
            />
          ))}
        </>
      );
    case "AE":
      return (
        <>
          <rect width="24" height="16" fill="#fff" />
          <rect y="0" width="24" height="5.33" fill="#00732F" />
          <rect y="10.67" width="24" height="5.33" fill="#000" />
          <rect width="6" height="16" fill="#FF0000" />
        </>
      );
    case "EU":
      return (
        <>
          <rect width="24" height="16" fill="#003399" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            return (
              <path
                key={i}
                d={star(12 + 4.7 * Math.cos(a), 8 + 4.7 * Math.sin(a), 0.95)}
                fill="#FFCC00"
              />
            );
          })}
        </>
      );
    case "DE":
      return (
        <>
          <rect width="24" height="5.33" fill="#000" />
          <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
          <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
        </>
      );
    case "GB":
      return (
        <>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.4" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.7" />
          <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.4" />
          <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3.2" />
        </>
      );
    case "US":
      return (
        <>
          <rect width="24" height="16" fill="#fff" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} y={i * 2.46} width="24" height="1.23" fill="#B31942" />
          ))}
          <rect width="10.2" height="8.6" fill="#0A3161" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={1.3 + c * 2}
                cy={1.2 + r * 2.1}
                r="0.42"
                fill="#fff"
              />
            ))
          )}
        </>
      );
  }
}

/* Keeps every clip-path id unique on a page. Pages are statically rendered on the
   server, so this never has to match a client render. */
let seq = 0;

/**
 * A flag chip. Pass `x`/`y` to nest it inside a diagram's SVG.
 */
export function Flag({
  code,
  size = 20,
  x,
  y,
  title,
}: {
  code: CountryCode;
  size?: number;
  x?: number;
  y?: number;
  title?: string;
}) {
  const id = `flagclip-${code}-${(seq += 1)}`;
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={(size / 24) * 16}
      viewBox="0 0 24 16"
      role="img"
      aria-label={title ?? COUNTRY_NAME[code]}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <title>{title ?? COUNTRY_NAME[code]}</title>
      <defs>
        <clipPath id={id}>
          <rect width="24" height="16" rx="2.4" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <Art code={code} />
      </g>
      <rect
        width="24"
        height="16"
        rx="2.4"
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
