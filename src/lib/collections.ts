/**
 * COLLECTIONS — DUMMY copy, real logic.
 * A collection is just a title, a description and a filter over the catalog.
 */
import { products, type Product } from "./products";
import { departmentOf, departments, productTypes, rooms, series } from "./site";

export interface Collection {
  handle: string;
  title: string;
  description: string;
  /** quick links shown as chips under the description */
  chips?: { label: string; href: string }[];
  filter: (p: Product) => boolean;
}

const notGift = (p: Product) => p.type !== "gift-card";

const typeChips = (dept?: string) =>
  productTypes
    .filter((t) => !dept || t.department === dept)
    .slice(0, dept ? undefined : 6)
    .map((t) => ({ label: t.label, href: `/collections/${t.handle}` }));

const departmentCopy: Record<string, string> = {
  "home-decor":
    "Carved wall pieces, figurines, candle holders, vases and mirrors that bring the warmth of wood into a room. Placeholder copy: two or three lines about your decor range.",
  "kitchen-dining":
    "Trays, bowls, boards and spoons made to be used every day and to look good on the table. Placeholder copy: two or three lines about your kitchen range.",
  accessories:
    "Jewellery boxes, desk pieces, combs and turned jewellery: small pieces, made with the same care. Placeholder copy: two or three lines about your accessories.",
};

const base: Collection[] = [
  {
    handle: "all",
    title: "All Products",
    description:
      "Every piece in one place. Placeholder copy: one or two lines describing the full range and the craft that ties it together.",
    chips: typeChips(),
    filter: notGift,
  },
  {
    handle: "new-in",
    title: "New In",
    description: "The latest pieces, fresh off the workbench. Placeholder copy for your new-arrivals collection.",
    filter: (p) => !!p.isNew,
  },
  {
    handle: "best-sellers",
    title: "Best Sellers",
    description: "The pieces people keep coming back for. Placeholder copy for your best-sellers collection.",
    filter: (p) => !!p.bestSeller,
  },
  ...departments.map((d) => ({
    handle: d.handle,
    title: d.label,
    description: departmentCopy[d.handle],
    chips: typeChips(d.handle),
    filter: (p: Product) => departmentOf(p.type) === d.handle,
  })),
  {
    handle: "gifts",
    title: "Gifts under Rs. 2,499",
    description: "Thoughtful, handmade and easy to wrap. Placeholder copy for the gifting edit.",
    chips: [
      { label: "Under Rs. 999", href: "/collections/under-999" },
      { label: "Jewellery Boxes", href: "/collections/jewellery-boxes" },
      { label: "Gift Cards", href: "/products/e-gift-card" },
      { label: "Corporate Gifts", href: "/pages/corporate-gifts" },
    ],
    filter: (p) => notGift(p) && p.price <= 2499,
  },
  {
    handle: "under-999",
    title: "Gifts under Rs. 999",
    description: "Small handmade pieces that still feel special. Placeholder copy for this edit.",
    filter: (p) => notGift(p) && p.price <= 999,
  },
];

const byType: Collection[] = productTypes.map((t) => ({
  handle: t.handle,
  title: t.label,
  description: `Placeholder copy for ${t.label.toLowerCase()}: the woods you use, how they are made and where they look best.`,
  filter: (p) => p.type === t.type,
}));

const byRoom: Collection[] = rooms.map((r) => ({
  handle: r.handle,
  title: `For the ${r.label}`,
  description: `Pieces picked for the ${r.label.toLowerCase()}. Placeholder copy for this edit.`,
  filter: (p) => p.rooms.includes(r.handle),
}));

const bySeries: Collection[] = series.map((s) => ({
  handle: s.handle,
  title: `${s.label} Collection`,
  description: `${s.blurb} Placeholder copy: tell the story of this craft in two or three lines.`,
  filter: (p) => notGift(p) && p.series === s.handle,
}));

export const collections: Collection[] = [...base, ...byType, ...byRoom, ...bySeries];

export function getCollection(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function collectionProducts(handle: string): Product[] {
  const c = getCollection(handle);
  return c ? products.filter(c.filter) : [];
}
