/**
 * POST /api/orders — DEMO order endpoint.
 *
 * What it really does: re-validates the cart against the catalog and
 * re-computes totals on the server, so the browser can never set its own
 * price. That part is how a real store works.
 *
 * What is fake: nothing is saved and no payment provider is called. In a
 * real store this is where you would
 *   1. save a "pending" order in your database, and
 *   2. create a payment order with your gateway (Razorpay, Stripe, ...)
 *      using your SECRET key, and return its id to the browser,
 * then confirm the payment in a webhook before marking the order paid.
 */
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import {
  computeTotals,
  shippingMethods,
  subtotalOf,
  type PaymentMethod,
  type PricedItem,
  type ShippingMethod,
} from "@/lib/pricing";

const methods: PaymentMethod[] = ["upi", "card", "netbanking", "cod"];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { items, promo, method, shipping } = (body ?? {}) as {
    items?: PricedItem[];
    promo?: string;
    method?: PaymentMethod;
    shipping?: ShippingMethod;
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }
  if (!method || !methods.includes(method)) {
    return NextResponse.json({ error: "Choose a payment method." }, { status: 400 });
  }
  if (shipping && !(shipping in shippingMethods)) {
    return NextResponse.json({ error: "Choose a delivery option." }, { status: 400 });
  }

  for (const item of items) {
    const product = getProduct(item?.handle);
    if (!product) {
      return NextResponse.json({ error: "An item in your bag is no longer available." }, { status: 400 });
    }
    if (!product.inStock) {
      return NextResponse.json({ error: `${product.name} is sold out. Remove it to continue.` }, { status: 409 });
    }
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 10) {
      return NextResponse.json({ error: `Check the quantity for ${product.name}.` }, { status: 400 });
    }
  }

  const totals = computeTotals(subtotalOf(items), { promo, method, shipping });
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();

  return NextResponse.json({
    orderId: `ORD-${stamp}${rand}`,
    gatewayRef: `demo_pay_${stamp.toLowerCase()}${rand.toLowerCase()}`,
    currency: "INR",
    ...totals,
  });
}
