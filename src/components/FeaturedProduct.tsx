"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { cx, money } from "@/lib/format";
import { AddToBag } from "./AddToBag";
import { ProductArt } from "./Placeholder";

/** Homepage spotlight: thumbnail rail + large image + quick buy. */
export function FeaturedProduct({ product: p }: { product: Product }) {
  const [view, setView] = useState(0);
  const color = p.colors[0];

  return (
    <section className="gutter grid gap-8 py-16 md:py-24 lg:grid-cols-2 lg:gap-16" aria-label="Featured product">
      <div className="flex gap-3">
        <div className="no-scrollbar hidden max-h-[640px] w-20 shrink-0 flex-col gap-3 overflow-y-auto sm:flex">
          {[0, 1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-label={`Show image ${v + 1}`}
              aria-pressed={v === view}
              className={cx("cursor-pointer border", v === view ? "border-ink" : "border-transparent")}
            >
              <ProductArt seed={p.handle} type={p.type} palette={color.palette} view={v} tag="" className="aspect-[4/5]" />
            </button>
          ))}
        </div>
        <ProductArt
          seed={p.handle}
          type={p.type}
          palette={color.palette}
          view={view}
          bg="#f3ece1"
          className="aspect-[4/5] max-h-[640px] flex-1"
        />
      </div>

      <div className="flex flex-col justify-center lg:max-w-md">
        <p className="eyebrow mb-4">{p.tagline}</p>
        <h2 className="display">{p.name}</h2>
        <p className="mt-5 text-[20px] uppercase tracking-[0.02em]">{money(p.price)}</p>
        <p className="mt-1 text-[10.5px] uppercase tracking-[0.1em] text-muted">
          Tax included.{" "}
          <Link href="/policies/shipping" className="underline underline-offset-2">
            Shipping
          </Link>{" "}
          calculated at checkout.
        </p>
        <div className="mt-7 space-y-2">
          <AddToBag handle={p.handle} color={color.name} disabled={!p.inStock} />
          <Link href="/checkout" className="btn-outline w-full">
            Go to checkout
          </Link>
        </div>
        <Link
          href={`/products/${p.handle}`}
          className="mt-7 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 hover:opacity-60"
        >
          More details <ArrowRight size={18} strokeWidth={1.3} />
        </Link>
      </div>
    </section>
  );
}
