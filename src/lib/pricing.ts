/**
 * PRICING RULES — shared by the browser and the server route so both always
 * compute the same totals. All numbers and codes here are DUMMY values.
 */
import { getProduct } from "./products";
import { site } from "./site";

export type PaymentMethod = "upi" | "card" | "netbanking" | "cod";
export type ShippingMethod = "standard" | "express";

/** DUMMY promo codes */
export const promoCodes: Record<string, { label: string; percent: number }> = {
  DEMO10: { label: "10% off (demo code)", percent: 10 },
  WELCOME15: { label: "15% off your first order (demo code)", percent: 15 },
};

/** DUMMY shipping options */
export const shippingMethods: Record<ShippingMethod, { label: string; eta: string; price: number }> = {
  standard: { label: "Standard delivery", eta: "5 to 7 working days", price: 0 },
  express: { label: "Express delivery", eta: "2 to 3 working days", price: 199 },
};

export interface PricedItem {
  handle: string;
  color: string;
  qty: number;
}

export function subtotalOf(items: PricedItem[]): number {
  return items.reduce((sum, i) => sum + (getProduct(i.handle)?.price ?? 0) * i.qty, 0);
}

export function computeTotals(
  subtotal: number,
  opts: { promo?: string | null; method?: PaymentMethod; shipping?: ShippingMethod } = {},
) {
  const code = opts.promo ? promoCodes[opts.promo.trim().toUpperCase()] : undefined;
  const discount = code ? Math.round((subtotal * code.percent) / 100) : 0;
  const shipping = subtotal === 0 ? 0 : shippingMethods[opts.shipping ?? "standard"].price;
  const codFee = opts.method === "cod" ? site.codFee : 0;
  const total = Math.max(subtotal - discount, 0) + shipping + codFee;
  return { subtotal, discount, shipping, codFee, total, promoLabel: code?.label };
}
