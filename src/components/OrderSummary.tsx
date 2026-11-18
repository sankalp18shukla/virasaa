"use client";

import Link from "next/link";
import { getProduct } from "@/lib/products";
import { shippingMethods } from "@/lib/pricing";
import { paymentLabels, type Order } from "@/lib/store";
import { formatDate, money } from "@/lib/format";
import { ProductArt } from "./Placeholder";

const steps: Order["status"][] = ["Confirmed", "Packed", "Shipped", "Delivered"];

/** Order details block shared by the confirmation, account and tracking pages. */
export function OrderSummary({ order }: { order: Order }) {
  const current = steps.indexOf(order.status);
  const a = order.address;

  return (
    <div className="text-left">
      {/* DUMMY tracker: every demo order stays at "Confirmed" */}
      <ol className="mb-10 grid grid-cols-4 text-center text-[10.5px] uppercase tracking-[0.1em]">
        {steps.map((s, i) => (
          <li key={s} className={i <= current ? "text-ink" : "text-muted/60"} aria-current={i === current ? "step" : undefined}>
            <span className="relative mb-3 block h-[2px] bg-line">
              <span className={`absolute inset-0 ${i <= current ? "bg-ink" : ""}`} />
              <span className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink ${i <= current ? "bg-ink" : "bg-white"}`} />
            </span>
            {s}
          </li>
        ))}
      </ol>

      <ul className="divide-y divide-line border-y border-line">
        {order.items.map((item) => {
          const p = getProduct(item.handle);
          const palette = p?.colors.find((c) => c.name === item.color)?.palette ?? p?.colors[0].palette;
          return (
            <li key={`${item.handle}-${item.color}`} className="flex items-center gap-4 py-4">
              {p && palette && <ProductArt seed={p.handle} type={p.type} palette={palette} tag="" className="h-20 w-16 shrink-0" />}
              <div className="min-w-0 flex-1">
                <Link href={`/products/${item.handle}`} className="text-[13px] uppercase tracking-[0.04em] hover:underline">
                  {item.name}
                </Link>
                <p className="text-[12px] text-muted">
                  {item.color} · Qty {item.qty}
                </p>
              </div>
              <span className="text-[13px]">{money(item.price * item.qty)}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div className="space-y-6 text-[13.5px] leading-relaxed">
          <div>
            <h3 className="eyebrow mb-2">Delivering to</h3>
            {a.fullName}
            <br />
            {a.line1}
            {a.line2 ? `, ${a.line2}` : ""}
            <br />
            {a.city}, {a.state} {a.pincode}
            <br />
            {a.phone}
          </div>
          <div>
            <h3 className="eyebrow mb-2">Delivery</h3>
            {shippingMethods[order.shippingMethod].label} ({shippingMethods[order.shippingMethod].eta})
          </div>
          <div>
            <h3 className="eyebrow mb-2">Payment</h3>
            {paymentLabels[order.paymentMethod]}
            <br />
            <span className="text-muted">Ref: {order.paymentRef}</span>
          </div>
        </div>
        <dl className="space-y-2 text-[14px]">
          <div className="flex justify-between">
            <dt>Placed on</dt>
            <dd>{formatDate(order.createdAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{money(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-accent">
              <dt>Discount{order.promo ? ` (${order.promo})` : ""}</dt>
              <dd>-{money(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>Delivery</dt>
            <dd>{order.shipping === 0 ? "Free" : money(order.shipping)}</dd>
          </div>
          {order.codFee > 0 && (
            <div className="flex justify-between">
              <dt>Cash on delivery fee</dt>
              <dd>{money(order.codFee)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-3 text-[17px] uppercase tracking-[0.02em]">
            <dt>Total</dt>
            <dd>{money(order.total)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
