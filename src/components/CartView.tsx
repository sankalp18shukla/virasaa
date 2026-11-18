"use client";

import Link from "next/link";
import { useCart, useHydrated, useUser } from "@/lib/store";
import { money } from "@/lib/format";
import { CartLineRow } from "./CartDrawer";

export function CartView() {
  const hydrated = useHydrated();
  const user = useUser();
  const { lines, count, subtotal } = useCart();

  if (!hydrated) return <div className="min-h-[70vh]" />;

  if (lines.length === 0) {
    return (
      <div className="gutter flex min-h-[70vh] flex-col items-center pb-20 pt-12 text-center">
        <h1 className="display">Bag (0)</h1>
        <p className="mt-24 text-[17px] uppercase tracking-[0.04em]">Your bag is empty</p>
        <div className="mt-auto grid w-full max-w-2xl gap-2 pt-24 sm:grid-cols-2">
          {user ? (
            <Link href="/account" className="btn">
              My account
            </Link>
          ) : (
            <Link href="/account/login" className="btn">
              Log in
            </Link>
          )}
          <Link href="/collections/all" className="btn-outline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gutter mx-auto max-w-5xl pb-24 pt-12">
      <h1 className="display text-center">Bag ({count})</h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <ul className="divide-y divide-line border-y border-line lg:col-span-7">
          {lines.map((l) => (
            <CartLineRow key={l.key} line={l} />
          ))}
        </ul>
        <aside className="lg:col-span-5" aria-label="Summary">
          <div className="bg-paper p-6 md:p-8 lg:sticky lg:top-24">
            <div className="flex items-center justify-between text-[17px] uppercase tracking-[0.04em]">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <p className="mt-2 text-[12.5px] text-muted">
              Tax included. Delivery and discounts are calculated at checkout.
            </p>
            <Link href="/checkout" className="btn mt-6 h-12 w-full">
              Checkout
            </Link>
            <Link href="/collections/all" className="btn-outline mt-2 w-full">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
