/**
 * PLACEHOLDER IMAGES — every image in this project is drawn by this file.
 *
 * There are no photo files in the repo. `ProductArt` draws a simple wooden
 * object (with grain and carving lines) and `EditorialArt` draws an abstract
 * interior "photo" block, both as inline SVG. To use real photography, replace the two components' bodies
 * with <Image src=... /> from next/image (the props tell you which product,
 * colour and view is being requested) — nothing else in the app changes.
 */
import { useId } from "react";
import type { ProductType } from "@/lib/products";
import { site } from "@/lib/site";

/* deterministic pseudo-random numbers from a string seed */
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

type Shape =
  | "plate"
  | "elephant"
  | "candle"
  | "vase"
  | "mirror"
  | "lamp"
  | "tray"
  | "bowl"
  | "coaster"
  | "board"
  | "spoons"
  | "chest"
  | "box"
  | "desk"
  | "comb"
  | "bangle"
  | "card";

const shapeFor: Record<ProductType, Shape> = {
  "wall-decor": "plate",
  sculpture: "elephant",
  "candle-holder": "candle",
  vase: "vase",
  mirror: "mirror",
  lamp: "lamp",
  tray: "tray",
  bowl: "bowl",
  coaster: "coaster",
  board: "board",
  cutlery: "spoons",
  "jewellery-box": "chest",
  "storage-box": "box",
  desk: "desk",
  comb: "comb",
  jewellery: "bangle",
  "gift-card": "card",
};

/**
 * body   = filled wooden silhouette (also the clip for the grain)
 * strap  = stroked in the wood colour (pens, hooks)
 * extra  = carving / inlay lines, stroked in the highlight colour
 * accents = flat fills drawn on top (candle, glass, lampshade, brass clasp)
 */
const shapes: Record<
  Shape,
  { body: string; strap?: string; extra?: string; accents?: { d: string; fill: string; opacity?: number }[] }
> = {
  plate: {
    body: "M22 140 A78 78 0 1 0 178 140 A78 78 0 1 0 22 140 Z",
    strap: "M100 62 V48",
    extra:
      "M50 140 A50 50 0 1 0 150 140 A50 50 0 1 0 50 140 M76 140 A24 24 0 1 0 124 140 A24 24 0 1 0 76 140 M100 66 V214 M26 140 H174 M48 88 L152 192 M152 88 L48 192",
  },
  elephant: {
    body: "M150 96 Q178 100 172 136 L170 210 H152 L150 178 Q124 184 104 178 L102 210 H84 L82 170 Q72 164 68 152 Q60 162 58 180 Q54 202 42 206 Q34 208 34 200 Q46 196 46 176 Q46 150 50 128 Q56 94 92 92 Z",
    extra:
      "M88 104 Q114 106 112 134 Q104 152 86 148 M60 152 Q66 162 78 158 M118 120 H158 M118 136 H160 M118 152 H160 M130 112 V164 M146 110 V166",
    accents: [{ d: "M70 116 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0", fill: "#1b120c" }],
  },
  candle: {
    body: "M62 222 H138 Q138 208 118 204 L112 150 Q130 146 130 132 H70 Q70 146 88 150 L82 204 Q62 208 62 222 Z",
    extra: "M84 164 H116 M82 178 H118 M82 192 H118 M70 140 H130",
    accents: [
      { d: "M90 132 V94 Q90 88 96 88 H104 Q110 88 110 94 V132 Z", fill: "#f4ecdc" },
      { d: "M100 84 Q91 74 100 58 Q109 74 100 84 Z", fill: "#f0a43a" },
    ],
  },
  vase: {
    body: "M80 64 H120 V78 Q118 88 112 94 Q150 118 146 170 Q142 214 112 222 H88 Q58 214 54 170 Q50 118 88 94 Q82 88 80 78 Z",
    extra: "M62 140 H138 M56 170 H144 M66 200 H134 M84 78 H116",
  },
  mirror: {
    body: "M100 50 C152 50 170 100 170 140 C170 188 146 228 100 228 C54 228 30 188 30 140 C30 100 48 50 100 50 Z",
    extra: "M100 56 V70 M100 214 V224 M36 140 H48 M152 140 H164",
    accents: [
      {
        d: "M100 76 C134 76 146 108 146 140 C146 174 132 204 100 204 C68 204 54 174 54 140 C54 108 66 76 100 76 Z",
        fill: "#dfe7ea",
      },
      { d: "M78 104 L96 86 M74 124 L112 86", fill: "none" },
    ],
  },
  lamp: {
    body: "M74 222 H126 Q128 212 116 208 Q124 180 112 150 H88 Q76 180 84 208 Q72 212 74 222 Z",
    extra: "M86 174 H114 M84 196 H116",
    accents: [{ d: "M58 150 L78 78 H122 L142 150 Z", fill: "#efe2c8" }],
  },
  tray: {
    body: "M20 140 Q20 130 30 130 H170 Q180 130 180 140 L170 198 Q168 206 158 206 H42 Q32 206 30 198 Z",
    extra: "M38 154 H162 L156 192 H44 Z M36 142 Q46 136 56 142 M144 142 Q154 136 164 142",
  },
  bowl: {
    body: "M26 148 H174 Q172 206 120 218 L116 226 H84 L80 218 Q28 206 26 148 Z",
    extra: "M40 176 Q100 196 160 176 M52 198 Q100 212 148 198",
    accents: [{ d: "M26 148 Q100 128 174 148 Q100 168 26 148 Z", fill: "#000", opacity: 0.22 }],
  },
  coaster: {
    body: "M40 160 Q40 146 100 146 Q160 146 160 160 V206 Q160 220 100 220 Q40 220 40 206 Z",
    extra:
      "M40 160 Q100 174 160 160 M40 172 Q100 186 160 172 M40 184 Q100 198 160 184 M40 196 Q100 210 160 196",
  },
  board: {
    body: "M88 46 Q88 34 100 34 Q112 34 112 46 V70 H128 Q144 70 144 86 V210 Q144 224 130 224 H70 Q56 224 56 210 V86 Q56 70 72 70 H88 Z",
    extra: "M64 90 V206 M136 90 V206",
    accents: [{ d: "M95 50 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0", fill: "#000", opacity: 0.35 }],
  },
  spoons: {
    body:
      "M78 58 Q100 58 100 90 Q100 114 88 120 L85 220 Q84 228 78 228 Q72 228 71 220 L68 120 Q56 114 56 90 Q56 58 78 58 Z " +
      "M124 58 H140 Q148 58 148 68 V110 Q148 120 138 122 L136 220 Q135 228 130 228 Q124 228 124 220 L122 122 Q114 120 114 110 V68 Q114 58 124 58 Z",
    accents: [{ d: "M78 68 Q92 68 92 90 Q92 108 78 108 Q64 108 64 90 Q64 68 78 68 Z", fill: "#000", opacity: 0.18 }],
  },
  chest: {
    body: "M44 134 H156 V214 Q156 220 150 220 H50 Q44 220 44 214 Z M40 134 Q40 96 100 96 Q160 96 160 134 Z",
    extra: "M40 134 H160 M58 152 H142 V204 H58 Z M60 122 Q100 106 140 122 M70 178 H130 M100 156 V200",
    accents: [{ d: "M94 126 H106 V146 H94 Z", fill: "#c9a24a" }],
  },
  box: {
    body: "M34 120 H166 V214 Q166 222 158 222 H42 Q34 222 34 214 Z M28 98 Q28 92 34 92 H166 Q172 92 172 98 V120 H28 Z",
    extra: "M28 120 H172 M52 140 H148 V204 H52 Z M100 140 V204",
    accents: [{ d: "M94 112 H106 V130 H94 Z", fill: "#c9a24a" }],
  },
  desk: {
    body: "M62 122 H138 V214 Q138 222 130 222 H70 Q62 222 62 214 Z",
    strap: "M84 122 L72 60 M112 122 L128 66",
    extra: "M62 140 H138 M62 200 H138",
  },
  comb: {
    body: "M40 110 Q40 94 56 94 H144 Q160 94 160 110 V132 H40 Z M44.0 132 h3.6 v64 q-1.8 5 -3.6 0 Z M50.4 132 h3.6 v64 q-1.8 5 -3.6 0 Z M56.8 132 h3.6 v64 q-1.8 5 -3.6 0 Z M63.2 132 h3.6 v64 q-1.8 5 -3.6 0 Z M69.6 132 h3.6 v64 q-1.8 5 -3.6 0 Z M76.0 132 h3.6 v64 q-1.8 5 -3.6 0 Z M82.4 132 h3.6 v64 q-1.8 5 -3.6 0 Z M88.8 132 h3.6 v64 q-1.8 5 -3.6 0 Z M95.2 132 h3.6 v64 q-1.8 5 -3.6 0 Z M101.6 132 h3.6 v64 q-1.8 5 -3.6 0 Z M108.0 132 h3.6 v64 q-1.8 5 -3.6 0 Z M114.4 132 h3.6 v64 q-1.8 5 -3.6 0 Z M120.8 132 h3.6 v64 q-1.8 5 -3.6 0 Z M127.2 132 h3.6 v64 q-1.8 5 -3.6 0 Z M133.6 132 h3.6 v64 q-1.8 5 -3.6 0 Z M140.0 132 h3.6 v64 q-1.8 5 -3.6 0 Z M146.4 132 h3.6 v64 q-1.8 5 -3.6 0 Z M152.8 132 h3.6 v64 q-1.8 5 -3.6 0 Z",
    extra: "M52 112 H148",
  },
  bangle: {
    body: "M28 150 A72 72 0 1 0 172 150 A72 72 0 1 0 28 150 Z M50 150 A50 50 0 1 1 150 150 A50 50 0 1 1 50 150 Z",
    extra: "M39 150 A61 61 0 1 0 161 150 A61 61 0 1 0 39 150",
  },
  card: {
    body: "M26 84 Q26 74 36 74 H164 Q174 74 174 84 V176 Q174 186 164 186 H36 Q26 186 26 176 Z",
    extra: "M26 104 H174",
  },
};

/* each "view" is just a different crop of the same drawing */
const views = [
  "", // 0 front
  "translate(100 140) scale(1.9) translate(-100 -150)", // 1 close-up
  "translate(200 0) scale(-1 1) rotate(-6 100 140)", // 2 angled
  "translate(100 140) scale(0.72) translate(-100 -140)", // 3 scale
  "translate(100 150) scale(2.6) translate(-118 -168)", // 4 detail
  "rotate(8 100 140) translate(100 140) scale(1.25) translate(-100 -150)", // 5 tilt
];

function DummyTag({ label }: { label: string }) {
  if (!site.showPlaceholderTags || !label) return null;
  return (
    <span className="pointer-events-none absolute left-2 top-2 z-[1] bg-white/75 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] text-ink/60">
      {label}
    </span>
  );
}

/** Product image stand-in. `view` 0–5 picks a different crop. */
export function ProductArt({
  seed,
  type,
  palette,
  view = 0,
  className = "",
  tag = "Dummy image",
  bg,
}: {
  seed: string;
  type: ProductType;
  palette: [string, string, string];
  view?: number;
  className?: string;
  tag?: string;
  bg?: string;
}) {
  const id = useId();
  const shape = shapes[shapeFor[type]];
  const rand = rng(seed);
  const grain = Array.from({ length: 16 }, (_, i) => {
    const y = 34 + i * 13 + rand() * 6;
    const w = 3 + rand() * 7;
    return { d: `M0 ${y} Q50 ${y + w} 100 ${y} T200 ${y}`, width: 0.8 + rand() * 1.8 };
  });
  const knots = Array.from({ length: 2 }, () => ({
    x: 40 + rand() * 120,
    y: 80 + rand() * 120,
    rx: 4 + rand() * 6,
  }));
  const backdrop = bg ?? (view === 2 || view === 5 ? "#f3ece1" : "#ece4d8");

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: backdrop }}>
      <DummyTag label={tag} />
      <svg
        viewBox="0 0 200 250"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Placeholder product illustration"
      >
        <defs>
          <clipPath id={id}>
            <path d={shape.body} clipRule="evenodd" />
          </clipPath>
        </defs>
        <g transform={views[view % views.length]}>
          <ellipse cx="100" cy="230" rx="70" ry="6" fill="#000" opacity="0.08" />
          {shape.strap && (
            <path d={shape.strap} fill="none" stroke={palette[0]} strokeWidth="9" strokeLinecap="round" />
          )}
          <path d={shape.body} fill={palette[0]} fillRule="evenodd" />
          <g clipPath={`url(#${id})`}>
            {grain.map((g, i) => (
              <path key={i} d={g.d} fill="none" stroke={palette[1]} strokeWidth={g.width} opacity="0.55" />
            ))}
            {knots.map((k, i) => (
              <ellipse key={i} cx={k.x} cy={k.y} rx={k.rx} ry={k.rx * 0.45} fill="none" stroke={palette[1]} strokeWidth="1.4" opacity="0.6" />
            ))}
          </g>
          {shape.extra && (
            <path d={shape.extra} fill="none" stroke={palette[2]} strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {shape.accents?.map((a, i) =>
            a.fill === "none" ? (
              <path key={i} d={a.d} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path key={i} d={a.d} fill={a.fill} opacity={a.opacity ?? 1} />
            ),
          )}
          <path d={shape.body} fill="none" stroke="#000" strokeOpacity="0.2" strokeWidth="2" fillRule="evenodd" />
        </g>
        {view === 3 && (
          <g stroke="#1b1b15" strokeWidth="0.8" fill="#1b1b15" fontSize="7" fontFamily="sans-serif">
            <path d="M48 212 H152 M48 208 V216 M152 208 V216" fill="none" />
            <text x="100" y="224" textAnchor="middle" stroke="none">
              width
            </text>
            <path d="M166 86 V196 M162 86 H170 M162 196 H170" fill="none" />
            <text x="176" y="143" stroke="none">
              height
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

const editorialPalettes: [string, string, string][] = [
  ["#b5552b", "#f0d6c0", "#6e2f14"], // terracotta wall
  ["#d8ccbb", "#eee6da", "#8a6f52"], // limewash
  ["#7d8a6a", "#dfe3d2", "#3f4a35"], // sage
  ["#c9a24a", "#f3e6c4", "#7a5a1e"], // brass
  ["#5e3d29", "#a88466", "#2b1d14"], // walnut
  ["#2c3e7a", "#cfd6ea", "#1b2752"], // indigo
  ["#cfa676", "#f1e3cc", "#7a5534"], // natural wood
  ["#9c3b2e", "#e8c9bf", "#4e1a12"], // sindoor red
];

/**
 * Lifestyle / campaign photo stand-in: soft abstract colour fields.
 * Pass `children` to overlay text on top.
 */
export function EditorialArt({
  seed,
  className = "",
  tag = "Dummy photo",
  children,
}: {
  seed: string;
  className?: string;
  tag?: string;
  children?: React.ReactNode;
}) {
  const id = useId();
  const rand = rng(seed);
  const pal = editorialPalettes[Math.floor(rand() * editorialPalettes.length)];
  const fields = Array.from({ length: 5 }, (_, i) => ({
    x: rand() * 200,
    y: rand() * 250,
    r: 50 + rand() * 80,
    fill: pal[i % 3],
  }));
  const fx = 70 + rand() * 60;
  const shelfY = 160 + rand() * 40;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: pal[1] }}>
      <DummyTag label={tag} />
      <svg
        viewBox="0 0 200 250"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g filter={`url(#${id})`}>
          {fields.map((f, i) => (
            <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.fill} opacity="0.85" />
          ))}
        </g>
        {/* a loose interior vignette (shelf, vase, wall plate) so tiles read as room photos, not flat colour */}
        <g fill={pal[2]} opacity="0.55">
          <circle cx={200 - fx} cy="70" r={20 + (fx % 10)} />
          <rect x="0" y={shelfY} width="200" height="6" />
          <path d={`M${fx - 12} ${shelfY} Q${fx - 22} ${shelfY - 30} ${fx - 6} ${shelfY - 52} V${shelfY - 64} H${fx + 6} V${shelfY - 52} Q${fx + 22} ${shelfY - 30} ${fx + 12} ${shelfY} Z`} />
          <rect x={fx + 26} y={shelfY - 22} width="30" height="22" rx="2" />
        </g>
      </svg>
      {children && <div className="relative z-[1] h-full w-full">{children}</div>}
    </div>
  );
}
