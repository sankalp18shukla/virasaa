"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { orders, useHydrated, type Order } from "@/lib/store";
import { OrderSummary } from "./OrderSummary";

/** DEMO: looks the order up in this browser's storage. Use your courier / OMS API. */
export function TrackOrder() {
  const initial = useSearchParams().get("order") ?? "";
  const hydrated = useHydrated();
  const [query, setQuery] = useState<{ id: string; email: string } | null>(null);

  let result: Order | undefined;
  let searched = false;
  if (hydrated && query) {
    searched = true;
    const found = orders.find(query.id);
    if (found && found.email === query.email.trim().toLowerCase()) result = found;
  }

  return (
    <div className="gutter mx-auto max-w-2xl py-16">
      <p className="mb-8 text-center text-[14.5px] text-ink/80">
        Enter your order number and the email you used at checkout.
      </p>
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          setQuery({ id: String(d.get("order")), email: String(d.get("email")) });
        }}
      >
        <div>
          <label htmlFor="t-order" className="field-label">
            Order number
          </label>
          <input id="t-order" name="order" defaultValue={initial} required placeholder="ORD-..." className="field uppercase placeholder:normal-case" />
        </div>
        <div>
          <label htmlFor="t-email" className="field-label">
            Email
          </label>
          <input id="t-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <button type="submit" className="btn h-12 sm:col-span-2">
          Track order
        </button>
      </form>

      <div className="mt-12" aria-live="polite">
        {searched && !result && (
          <p className="border border-accent p-4 text-[13.5px] text-accent">
            We couldn&rsquo;t find an order with that number and email. Check both and try again. (Demo orders are
            stored in the browser that placed them.)
          </p>
        )}
        {result && (
          <>
            <h2 className="mb-8 text-center text-[17px] uppercase tracking-[0.04em]">Order {result.id}</h2>
            <OrderSummary order={result} />
          </>
        )}
      </div>
    </div>
  );
}
