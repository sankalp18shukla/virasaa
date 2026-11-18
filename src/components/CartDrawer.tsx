"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { cart, ui, useCart, type ResolvedLine } from "@/lib/store";
import { money } from "@/lib/format";
import { Drawer } from "./Drawer";
import { ProductArt } from "./Placeholder";

export function QtyStepper({
  qty,
  onChange,
  small,
}: {
  qty: number;
  onChange: (qty: number) => void;
  small?: boolean;
}) {
  const size = small ? "h-8 w-8" : "h-11 w-11";
  return (
    <div className="inline-flex items-center border border-ink/25">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
        className={`${size} grid cursor-pointer place-items-center hover:bg-paper`}
      >
        <Minus size={13} />
      </button>
      <span className="w-8 text-center text-[13px]" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= 10}
        aria-label="Increase quantity"
        className={`${size} grid cursor-pointer place-items-center hover:bg-paper disabled:opacity-30`}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

export function CartLineRow({ line, onNavigate }: { line: ResolvedLine; onNavigate?: () => void }) {
  const { product: p } = line;
  return (
    <li className="flex gap-4 py-5">
      <Link href={`/products/${p.handle}`} onClick={onNavigate} className="shrink-0">
        <ProductArt
          seed={p.handle}
          type={p.type}
          palette={line.colorInfo.palette}
          tag=""
          sizes="128px"
          className="h-28 w-[88px]"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/products/${p.handle}`}
            onClick={onNavigate}
            className="text-[13px] uppercase leading-snug tracking-[0.04em] hover:underline"
          >
            {p.name}
          </Link>
          <span className="shrink-0 text-[13px]">{money(line.lineTotal)}</span>
        </div>
        <p className="mt-1 text-[12px] text-muted">{line.color}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QtyStepper small qty={line.qty} onChange={(q) => cart.setQty(p.handle, line.color, q)} />
          <button
            onClick={() => cart.remove(p.handle, line.color)}
            className="link-underline cursor-pointer text-[11px] uppercase tracking-[0.1em] text-muted"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer({ open }: { open: boolean }) {
  const { lines, count, subtotal } = useCart();

  return (
    <Drawer
      open={open}
      onClose={ui.close}
      title={`Bag (${count})`}
      footer={
        lines.length > 0 ? (
          <div>
            <div className="mb-1 flex items-center justify-between text-[15px] uppercase tracking-[0.04em]">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <p className="mb-4 text-[12px] text-muted">Tax included. Shipping calculated at checkout.</p>
            <Link href="/checkout" onClick={ui.close} className="btn w-full">
              Checkout
            </Link>
            <Link href="/cart" onClick={ui.close} className="btn-outline mt-2 w-full">
              View bag
            </Link>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-6 px-6 py-20 text-center">
          <p className="text-[17px] uppercase tracking-[0.04em]">Your bag is empty</p>
          <Link href="/collections/all" onClick={ui.close} className="btn">
            Continue shopping
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line px-6">
          {lines.map((l) => (
            <CartLineRow key={l.key} line={l} onNavigate={ui.close} />
          ))}
        </ul>
      )}
    </Drawer>
  );
}
