/**
 * PRODUCT CATALOG — ALL DUMMY DATA.
 * Names, prices, finishes, copy and specs are invented placeholders for
 * Virasaa's wooden handicrafts. Swap this file for a real data source
 * (Shopify Storefront API, Medusa, your own DB, a CMS...) — the rest of
 * the app only uses the helpers exported at the bottom.
 */
import { rooms as roomList, type ProductType, type Room } from "./site";

export type { ProductType, Room };

/** A finish option (wood tone, stain, lacquer or paint). Shown as a swatch. */
export interface ProductColor {
  name: string;
  /** swatch colour */
  hex: string;
  /** [wood body, grain, carving / inlay highlight] used to draw the placeholder artwork */
  palette: [string, string, string];
}

export interface Product {
  handle: string;
  name: string;
  price: number;
  compareAt?: number;
  type: ProductType;
  /** rooms the piece suits; drives the Room filter and room collections */
  rooms: Room[];
  /** craft collection handle, see `series` in site.ts */
  series: string;
  /** wood and finish, shown in the spec table */
  material: string;
  colors: ProductColor[];
  inStock: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  tagline: string;
  size: string;
}

const F = {
  natural: { name: "Natural", hex: "#c9a172", palette: ["#cfa676", "#a77c4e", "#efd9b6"] },
  honey: { name: "Honey", hex: "#b47a3c", palette: ["#bb8142", "#8d5a28", "#e8c08a"] },
  walnut: { name: "Walnut", hex: "#5a3a26", palette: ["#5e3d29", "#3f2719", "#b88a62"] },
  ebony: { name: "Ebony", hex: "#2a221d", palette: ["#2e2520", "#17110d", "#8c6c4f"] },
  whitewash: { name: "Whitewash", hex: "#e8e0d2", palette: ["#ebe3d5", "#cbbfa8", "#8f7f66"] },
  brass: { name: "Brass Inlay", hex: "#c9a24a", palette: ["#4b3122", "#33211a", "#d6b25a"] },
  lacRed: { name: "Lacquer Red", hex: "#b3261e", palette: ["#b3261e", "#86190f", "#f2c14e"] },
  lacTeal: { name: "Lacquer Teal", hex: "#1f6f6b", palette: ["#1f7a74", "#124d49", "#f2c14e"] },
  lacMustard: { name: "Lacquer Mustard", hex: "#d49b22", palette: ["#d9a325", "#a8761a", "#b3261e"] },
  indigo: { name: "Painted Indigo", hex: "#2c3e7a", palette: ["#2c3e7a", "#1b2752", "#f2d27a"] },
} satisfies Record<string, ProductColor>;

const SHEESHAM = "Solid sheesham (Indian rosewood), hand-rubbed wax finish";
const MANGO = "Solid mango wood, food-safe oil finish";
const ACACIA = "Solid acacia wood, food-safe oil finish";
const TURNED = "Turned hardwood, natural lac (lacquer) finish";
const INLAY = "Solid sheesham with hand-set brass inlay";
const PAINTED = "Mango wood, hand-painted with water-based colours, matte sealed";

export const products: Product[] = [
  // ---------- Jaali ----------
  {
    handle: "jaali-mandala-wall-panel",
    name: "Jaali Mandala Wall Panel",
    price: 4499,
    type: "wall-decor",
    rooms: ["living", "bedroom", "pooja"],
    series: "jaali",
    material: SHEESHAM,
    colors: [F.walnut, F.natural],
    inStock: true,
    bestSeller: true,
    isNew: true,
    tagline: "Light falls through it differently every hour.",
    size: "Ø 60 cm, 2 cm deep",
  },
  {
    handle: "jaali-carved-elephant",
    name: "Jaali Carved Elephant",
    price: 2999,
    type: "sculpture",
    rooms: ["living", "study", "pooja"],
    series: "jaali",
    material: SHEESHAM,
    colors: [F.walnut, F.natural],
    inStock: true,
    bestSeller: true,
    tagline: "A good-luck charm with lattice-carved flanks.",
    size: "Medium (22 x 9 x 18 cm)",
  },
  {
    handle: "jaali-pillar-candle-holder",
    name: "Jaali Pillar Candle Holder",
    price: 1499,
    type: "candle-holder",
    rooms: ["living", "dining", "pooja"],
    series: "jaali",
    material: SHEESHAM,
    colors: [F.natural, F.ebony],
    inStock: true,
    tagline: "Carved to throw patterned shadows.",
    size: "Ø 9 x 16 cm",
  },
  {
    handle: "jaali-oval-mirror",
    name: "Jaali Carved Oval Mirror",
    price: 7999,
    type: "mirror",
    rooms: ["living", "bedroom"],
    series: "jaali",
    material: SHEESHAM,
    colors: [F.walnut, F.natural],
    inStock: true,
    isNew: true,
    tagline: "A frame that is the main event.",
    size: "Large (45 x 70 cm)",
  },
  {
    handle: "jaali-jewellery-box",
    name: "Jaali Jewellery Box",
    price: 1999,
    type: "jewellery-box",
    rooms: ["bedroom"],
    series: "jaali",
    material: `${SHEESHAM}, velvet lined`,
    colors: [F.walnut, F.natural],
    inStock: true,
    bestSeller: true,
    tagline: "Lined in velvet, carved on every side.",
    size: "Small (18 x 12 x 9 cm)",
  },
  {
    handle: "jaali-serving-tray",
    name: "Jaali Serving Tray",
    price: 2499,
    type: "tray",
    rooms: ["dining", "living"],
    series: "jaali",
    material: SHEESHAM,
    colors: [F.natural, F.walnut],
    inStock: true,
    tagline: "Tea for four, carved handles included.",
    size: "Medium (40 x 28 x 5 cm)",
  },

  // ---------- Lacquer & Lathe ----------
  {
    handle: "lacquer-bangle-set",
    name: "Lacquer Turned Bangle Set (3)",
    price: 899,
    type: "jewellery",
    rooms: ["bedroom"],
    series: "lacquer",
    material: TURNED,
    colors: [F.lacRed, F.lacTeal, F.lacMustard],
    inStock: true,
    bestSeller: true,
    isNew: true,
    tagline: "Turned on a lathe, polished in lac.",
    size: "Inner Ø 6.2 cm (size 2.6)",
  },
  {
    handle: "lacquer-bud-vase",
    name: "Lacquer Bud Vase",
    price: 1299,
    type: "vase",
    rooms: ["living", "bedroom", "study"],
    series: "lacquer",
    material: TURNED,
    colors: [F.lacTeal, F.lacRed, F.lacMustard],
    inStock: true,
    tagline: "One dried stem is all it needs.",
    size: "Small (Ø 8 x 18 cm)",
  },
  {
    handle: "lacquer-nesting-bowls",
    name: "Lacquer Nesting Bowls (Set of 3)",
    price: 1799,
    type: "bowl",
    rooms: ["dining", "living"],
    series: "lacquer",
    material: TURNED,
    colors: [F.lacRed, F.lacMustard],
    inStock: true,
    tagline: "For dry snacks, keys and trinkets.",
    size: "Ø 10, 13 and 16 cm",
  },
  {
    handle: "lacquer-candle-stand",
    name: "Lacquer Candle Stand",
    price: 1199,
    type: "candle-holder",
    rooms: ["pooja", "living"],
    series: "lacquer",
    material: TURNED,
    colors: [F.lacMustard, F.lacRed],
    inStock: true,
    isNew: true,
    tagline: "Turned and banded in festival colours.",
    size: "Ø 10 x 20 cm",
  },
  {
    handle: "lacquer-pen-stand",
    name: "Lacquer Pen Stand",
    price: 799,
    type: "desk",
    rooms: ["study"],
    series: "lacquer",
    material: TURNED,
    colors: [F.lacTeal, F.lacRed],
    inStock: true,
    tagline: "Keeps the good pens findable.",
    size: "Ø 8 x 11 cm",
  },

  // ---------- Brass Inlay ----------
  {
    handle: "brass-inlay-jewellery-chest",
    name: "Brass Inlay Jewellery Chest",
    price: 3499,
    type: "jewellery-box",
    rooms: ["bedroom"],
    series: "brass-inlay",
    material: `${INLAY}, velvet lined`,
    colors: [F.brass],
    inStock: true,
    bestSeller: true,
    tagline: "Hand-set brass wire, one line at a time.",
    size: "Medium (22 x 14 x 12 cm)",
  },
  {
    handle: "brass-inlay-coasters",
    name: "Brass Inlay Coasters (Set of 6)",
    price: 1499,
    compareAt: 1799,
    type: "coaster",
    rooms: ["dining", "living"],
    series: "brass-inlay",
    material: INLAY,
    colors: [F.brass],
    inStock: true,
    tagline: "Six rounds and a holder that stays on the table.",
    size: "Ø 10 cm each",
  },
  {
    handle: "brass-inlay-wall-plate",
    name: "Brass Inlay Wall Plate",
    price: 2799,
    type: "wall-decor",
    rooms: ["living", "pooja"],
    series: "brass-inlay",
    material: INLAY,
    colors: [F.brass],
    inStock: true,
    tagline: "One plate that holds a whole wall.",
    size: "Ø 30 cm",
  },
  {
    handle: "brass-inlay-tea-box",
    name: "Brass Inlay Tea Box",
    price: 2299,
    type: "storage-box",
    rooms: ["dining"],
    series: "brass-inlay",
    material: INLAY,
    colors: [F.brass],
    inStock: true,
    isNew: true,
    tagline: "Four compartments, one heirloom.",
    size: "Medium (24 x 16 x 9 cm)",
  },

  // ---------- Hand-Painted ----------
  {
    handle: "hand-painted-elephant-pair",
    name: "Hand-Painted Elephant Pair",
    price: 2499,
    type: "sculpture",
    rooms: ["living", "pooja"],
    series: "hand-painted",
    material: PAINTED,
    colors: [F.indigo, F.lacRed],
    inStock: true,
    bestSeller: true,
    tagline: "Painted in fine brush lines, sold as a pair.",
    size: "Small (12 x 5 x 10 cm each)",
  },
  {
    handle: "hand-painted-floral-tray",
    name: "Hand-Painted Floral Tray",
    price: 1999,
    type: "tray",
    rooms: ["dining", "living"],
    series: "hand-painted",
    material: PAINTED,
    colors: [F.indigo, F.whitewash],
    inStock: true,
    isNew: true,
    tagline: "Florals that never wilt.",
    size: "Medium (36 x 24 x 4 cm)",
  },
  {
    handle: "hand-painted-table-lamp",
    name: "Hand-Painted Table Lamp",
    price: 4999,
    type: "lamp",
    rooms: ["living", "bedroom", "study"],
    series: "hand-painted",
    material: `${PAINTED}, linen shade`,
    colors: [F.whitewash, F.indigo],
    inStock: true,
    tagline: "A warm glow on a painted base.",
    size: "Base Ø 14 x 32 cm, shade Ø 30 cm",
  },
  {
    handle: "hand-painted-neem-comb",
    name: "Painted Neem Wood Comb",
    price: 499,
    type: "comb",
    rooms: ["bedroom"],
    series: "hand-painted",
    material: "Neem wood, hand-painted handle",
    colors: [F.indigo, F.lacRed],
    inStock: true,
    tagline: "Wide teeth, smooth glide, no static.",
    size: "18 x 5 cm",
  },

  // ---------- Raw Grain ----------
  {
    handle: "raw-grain-chopping-board",
    name: "Raw Grain Chopping Board",
    price: 1299,
    type: "board",
    rooms: ["dining"],
    series: "raw-grain",
    material: ACACIA,
    colors: [F.natural, F.honey],
    inStock: true,
    bestSeller: true,
    tagline: "Chop, serve, hang it up.",
    size: "Large (40 x 22 x 2 cm)",
  },
  {
    handle: "raw-grain-serving-paddle",
    name: "Raw Grain Serving Paddle",
    price: 1699,
    type: "board",
    rooms: ["dining"],
    series: "raw-grain",
    material: ACACIA,
    colors: [F.walnut, F.natural],
    inStock: true,
    tagline: "Cheese, bread, whatever is for the table.",
    size: "48 x 20 x 2 cm",
  },
  {
    handle: "raw-grain-salad-bowl",
    name: "Raw Grain Salad Bowl",
    price: 1899,
    type: "bowl",
    rooms: ["dining"],
    series: "raw-grain",
    material: MANGO,
    colors: [F.natural, F.honey],
    inStock: true,
    tagline: "Big enough for the whole family's salad.",
    size: "Ø 28 x 10 cm",
  },
  {
    handle: "hand-carved-spoon-set",
    name: "Hand-Carved Spoon Set (4)",
    price: 899,
    type: "cutlery",
    rooms: ["dining"],
    series: "raw-grain",
    material: "Solid neem wood, food-safe oil finish",
    colors: [F.natural, F.honey],
    inStock: true,
    isNew: true,
    tagline: "Kind to your pans, good in the hand.",
    size: "24 to 30 cm long",
  },
  {
    handle: "raw-grain-coasters",
    name: "Raw Grain Coasters (Set of 4)",
    price: 699,
    type: "coaster",
    rooms: ["dining", "study", "living"],
    series: "raw-grain",
    material: ACACIA,
    colors: [F.natural, F.walnut, F.ebony],
    inStock: true,
    tagline: "No more rings on the table.",
    size: "Ø 9.5 cm each",
  },
  {
    handle: "raw-grain-turned-vase",
    name: "Raw Grain Turned Vase",
    price: 1599,
    type: "vase",
    rooms: ["living", "bedroom"],
    series: "raw-grain",
    material: MANGO,
    colors: [F.natural, F.ebony],
    inStock: true,
    tagline: "Made for dried pampas and palm.",
    size: "Medium (Ø 12 x 24 cm)",
  },
  {
    handle: "raw-grain-desk-organiser",
    name: "Raw Grain Desk Organiser",
    price: 1499,
    type: "desk",
    rooms: ["study"],
    series: "raw-grain",
    material: MANGO,
    colors: [F.natural, F.walnut],
    inStock: true,
    tagline: "Pens, phone and cards, sorted.",
    size: "22 x 10 x 10 cm",
  },
  {
    handle: "raw-grain-keepsake-box",
    name: "Raw Grain Keepsake Box",
    price: 1299,
    type: "storage-box",
    rooms: ["bedroom", "study"],
    series: "raw-grain",
    material: MANGO,
    colors: [F.natural, F.walnut],
    inStock: false, // DUMMY: one sold-out product so you can see that state
    tagline: "Letters, watches and small treasures.",
    size: "20 x 14 x 8 cm",
  },
  {
    handle: "raw-grain-pocket-comb",
    name: "Raw Grain Pocket Comb",
    price: 399,
    type: "comb",
    rooms: ["bedroom"],
    series: "raw-grain",
    material: "Neem wood, unfinished",
    colors: [F.natural, F.ebony],
    inStock: true,
    tagline: "Pocket-sized and static-free.",
    size: "12 x 4.5 cm",
  },

  // ---------- Gift card ----------
  {
    handle: "e-gift-card",
    name: "E-Gift Card",
    price: 2500,
    type: "gift-card",
    rooms: [],
    series: "raw-grain",
    material: "Digital",
    colors: [{ name: "Digital", hex: "#2b1d14", palette: ["#5e3d29", "#3f2719", "#d6b25a"] }],
    inStock: true,
    tagline: "Let them choose their own.",
    size: "Delivered by email",
  },
];

/* ------------------------------------------------------------------
   Derived copy (DUMMY). Generated from the product type so every
   product page has something to show.
------------------------------------------------------------------- */

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const typeLabel: Record<ProductType, string> = {
  "wall-decor": "wall piece",
  sculpture: "sculpture",
  "candle-holder": "candle holder",
  vase: "vase",
  mirror: "mirror",
  lamp: "table lamp",
  tray: "serving tray",
  bowl: "bowl",
  coaster: "coaster set",
  board: "board",
  cutlery: "spoon set",
  "jewellery-box": "jewellery box",
  "storage-box": "box",
  desk: "desk accessory",
  comb: "comb",
  jewellery: "jewellery set",
  "gift-card": "gift card",
};

export const isFoodContact = (p: Product) => ["tray", "bowl", "board", "cutlery"].includes(p.type);

export function productDescription(p: Product): string {
  if (p.type === "gift-card") {
    return "A digital gift card delivered by email, redeemable on anything in the store. This is placeholder copy: describe validity, delivery time and how to redeem.";
  }
  return `${p.name} is a handcrafted ${typeLabel[p.type]} in ${lowerFirst(p.material.split(",")[0])}, shaped and finished by hand. Because every piece is made individually, grain, tone and size vary slightly. This paragraph is placeholder copy: describe the craft, the artisan and the best place for this piece in two or three sentences.`;
}

export function productFeatures(p: Product): string[] {
  if (p.type === "gift-card") {
    return ["Delivered by email within minutes", "Valid for 12 months", "Redeemable across the store"];
  }
  const base = ["Handcrafted by artisans", "Natural wood grain, so no two pieces are identical"];
  const byType: Partial<Record<ProductType, string[]>> = {
    "wall-decor": ["Keyhole hanger on the back", "Light enough for a single nail"],
    sculpture: ["Carved from a single block", "Felt pads underneath to protect surfaces"],
    "candle-holder": ["Metal drip cup insert", "Fits standard pillar and tea-light candles"],
    vase: ["For dried flowers and stems only", "Weighted base, hard to tip over"],
    mirror: ["Bevelled glass", "Ready to hang with D-rings and wire"],
    lamp: ["E27 bulb holder, inline switch", "1.8 m braided cable"],
    tray: ["Carved side handles", "Sealed surface, wipe clean"],
    bowl: ["Turned from one piece of wood", "Food-safe finish"],
    coaster: ["Cork backing, will not slide", "Comes with a matching holder"],
    board: ["Food-safe oil finish", "Hanging hole in the handle"],
    cutlery: ["Smooth, splinter-free finish", "Will not scratch non-stick pans"],
    "jewellery-box": ["Velvet-lined interior", "Brass hinges and clasp"],
    "storage-box": ["Snug-fitting lid", "Soft felt base"],
    desk: ["Compartments for pens, phone and cards", "Felt base protects the desk"],
    comb: ["Wide, rounded teeth", "Static-free, gentle on the scalp"],
    jewellery: ["Lightweight and smooth to wear", "Bright, long-lasting lac finish"],
  };
  return [...base, ...(byType[p.type] ?? [])];
}

export function productSpecs(p: Product): [string, string][] {
  if (p.type === "gift-card") {
    return [
      ["Format", "Digital code sent by email"],
      ["Validity", "12 months from purchase"],
      ["Returns", "Gift cards are non-refundable"],
    ];
  }
  const roomNames = p.rooms.map((r) => roomList.find((x) => x.handle === r)?.label ?? r).join(", ");
  return [
    ["Material", p.material],
    ["Finishes", p.colors.map((c) => c.name).join(", ")],
    ["Size", p.size],
    ["Best for", roomNames],
    ["Care", productCare(p)],
    ["Warranty", "1 year against manufacturing defects, see the warranty policy"],
    ["Return policy", "Eligible for 14-day returns, see the returns policy"],
  ];
}

export function productCare(p: Product): string {
  if (isFoodContact(p)) {
    return "Hand wash with mild soap and dry straight away. Do not soak or put in the dishwasher. Rub with food-safe oil once a month.";
  }
  return "Dust with a soft dry cloth. Keep away from direct sunlight, heat and moisture. A little wax once or twice a year keeps the finish fresh.";
}

/* ------------------------------------------------------------------
   Lookup helpers — the only API the UI uses.
------------------------------------------------------------------- */

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function relatedProducts(p: Product, count = 8): Product[] {
  const same = products.filter((x) => x.handle !== p.handle && x.series === p.series && x.type !== "gift-card");
  const others = products.filter(
    (x) => x.handle !== p.handle && x.series !== p.series && x.type !== "gift-card",
  );
  return [...same, ...others].slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, typeLabel[p.type], p.series, p.tagline, p.material, ...p.rooms, ...p.colors.map((c) => c.name)]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
