"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CircleHelp, Clock, Link2, Plus, ShieldCheck, Truck } from "lucide-react";
import { productCare, productDescription, productFeatures, productSpecs, type Product } from "@/lib/products";
import { cart } from "@/lib/store";
import { cx, money } from "@/lib/format";
import { AddToBag } from "./AddToBag";
import { QtyStepper } from "./CartDrawer";
import { ProductArt } from "./Placeholder";
import { ScrollHint } from "./ScrollHint";

const viewLabels = ["Front", "Close-up", "Angle", "Scale", "Grain detail", "Styled"];

function Accordion({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group border-b border-line" open={open}>
      <summary className="flex cursor-pointer list-none items-center gap-2 py-3.5 text-[11px] uppercase tracking-[0.12em] [&::-webkit-details-marker]:hidden">
        {title}
        <Plus size={14} className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-[14px] leading-relaxed text-ink/80">{children}</div>
    </details>
  );
}

export function ProductView({ product: p }: { product: Product }) {
  const router = useRouter();
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);

  const color = p.colors[colorIdx];
  const isGift = p.type === "gift-card";

  // show the sticky add-to-bag bar once the main button scrolls out of view
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <div className="gutter grid gap-10 pb-20 pt-4 lg:grid-cols-12 lg:gap-14">
        {/* gallery: swipe on mobile, 2-column grid on desktop */}
        <div className="relative lg:col-span-8">
          <ScrollHint target={gallery} className="md:hidden" />
          <div ref={gallery} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:px-0">
            {viewLabels.map((label, view) => (
              <ProductArt
                key={`${color.name}-${view}`}
                seed={p.handle}
                type={p.type}
                palette={color.palette}
                view={view}
                tag={`Dummy image: ${label}`}
                className="aspect-[4/5] w-[82%] shrink-0 snap-center md:w-auto"
              />
            ))}
          </div>
        </div>

        {/* info */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow mb-3">{p.tagline}</p>
            <h1 className="text-[26px] uppercase leading-[1.2] tracking-[-0.005em] md:text-[30px]">{p.name}</h1>
            <p className="mt-5 text-[18px] uppercase tracking-[0.02em]">
              {p.compareAt && <s className="mr-3 text-muted">{money(p.compareAt)}</s>}
              {money(p.price)}
            </p>
            <p className="mt-1 text-[10.5px] uppercase tracking-[0.1em] text-muted">
              Tax included.{" "}
              <Link href="/policies/shipping" className="underline underline-offset-2">
                Shipping
              </Link>{" "}
              calculated at checkout.
            </p>

            {p.colors.length > 1 && (
              <fieldset className="mt-7">
                <legend className="eyebrow mb-3">
                  Finish: <span className="text-ink">{color.name}</span>
                </legend>
                <div className="flex gap-2">
                  {p.colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColorIdx(i)}
                      aria-label={c.name}
                      aria-pressed={i === colorIdx}
                      title={c.name}
                      className={cx(
                        "h-11 w-11 cursor-pointer rounded-full border-2 p-[3px] transition-colors",
                        i === colorIdx ? "border-ink" : "border-transparent hover:border-ink/30",
                      )}
                    >
                      <span
                        className="block h-full w-full rounded-full border border-ink/20"
                        style={{ background: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* DUMMY: pay-later / EMI widget slot */}
            {!isGift && (
              <div className="mt-6 border border-ink/15 bg-paper px-4 py-3 text-[12.5px] leading-snug">
                <span className="font-medium">Pay in 3 interest-free parts of {money(Math.round(p.price / 3))}.</span>
                <span className="block text-muted">Dummy widget: your EMI / pay-later provider goes here.</span>
              </div>
            )}

            <div ref={buyRef} className="mt-6 space-y-2">
              <div className="flex gap-2">
                <QtyStepper qty={qty} onChange={(q) => setQty(Math.min(Math.max(q, 1), 10))} />
                <AddToBag handle={p.handle} color={color.name} qty={qty} disabled={!p.inStock} className="btn flex-1" />
              </div>
              {p.inStock && (
                <button
                  type="button"
                  onClick={() => {
                    cart.add(p.handle, color.name, qty);
                    router.push("/checkout");
                  }}
                  className="btn-outline w-full"
                >
                  Buy it now
                </button>
              )}
            </div>

            {!isGift && (
              <ul className="mt-7 grid grid-cols-3 gap-3 text-[10.5px] uppercase leading-snug tracking-[0.08em]">
                <li>
                  <ShieldCheck size={22} strokeWidth={1.4} className="mb-2" />
                  1-year warranty
                </li>
                <li>
                  <Clock size={22} strokeWidth={1.4} className="mb-2" />
                  Easy returns (14 days)
                </li>
                <li>
                  <Truck size={22} strokeWidth={1.4} className="mb-2" />
                  Free delivery (5 to 7 days)
                </li>
              </ul>
            )}

            <div className="mt-7 border-t border-line">
              <Accordion title="Key features" open>
                <ul className="list-disc space-y-1 pl-5">
                  {productFeatures(p).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Wood & care">
                {p.material}. {productCare(p)} Natural variation in grain and tone is part of handmade wood.
              </Accordion>
              <Accordion title="Warranty">
                Covered for one year against manufacturing defects.{" "}
                <Link href="/policies/warranty" className="underline underline-offset-2">
                  Read the warranty policy
                </Link>
                .
              </Accordion>
              <Accordion title="Returns & exchanges">
                Unused items can be returned within 14 days of delivery.{" "}
                <Link href="/policies/returns-and-exchange" className="underline underline-offset-2">
                  Read the returns policy
                </Link>
                .
              </Accordion>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/pages/contact"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] hover:opacity-60"
              >
                <CircleHelp size={18} strokeWidth={1.4} /> Ask a question
              </Link>
              <button
                onClick={copyLink}
                className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.1em] hover:opacity-60"
              >
                <Link2 size={18} strokeWidth={1.4} /> {copied ? "Link copied" : "Copy link"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* details + specs */}
      <section className="gutter mx-auto max-w-4xl pb-20 text-center">
        <p className="eyebrow mb-3">Product details</p>
        <h2 className="display mb-6">{p.name}</h2>
        <p className="mx-auto max-w-2xl text-[15px] leading-[1.8] text-ink/85">{productDescription(p)}</p>
        <dl className="mt-12 border-t border-line text-left">
          {productSpecs(p).map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-4 border-b border-line py-3 text-[13.5px]">
              <dt className="text-muted">{k}</dt>
              <dd className="col-span-2">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* sticky add-to-bag bar */}
      {showBar && p.inStock && (
        <div className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-xl animate-fade-in items-center gap-3 bg-white p-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.22)]">
          <ProductArt seed={p.handle} type={p.type} palette={color.palette} tag="" sizes="96px" className="h-14 w-12 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] uppercase tracking-[0.04em]">{p.name}</p>
            <p className="text-[11px] uppercase tracking-[0.06em] text-muted">
              {money(p.price)} · {color.name}
            </p>
          </div>
          <AddToBag handle={p.handle} color={color.name} qty={qty} className="btn h-10 shrink-0 px-5" />
        </div>
      )}
    </>
  );
}
