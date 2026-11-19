"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { Product, Room } from "@/lib/products";
import { rooms } from "@/lib/site";
import { cx } from "@/lib/format";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name" | "new";

const roomHandles = rooms.map((r) => r.handle);
const roomLabel = (r: Room) => rooms.find((x) => x.handle === r)?.label ?? r;

/** Phones: one cell of the full-width filter bar, its panel spanning the bar.
 *  Desktop: an inline label with a 288px popover under it. */
function FilterMenu({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details data-filter className="group md:relative md:order-3">
      <summary className="flex h-12 cursor-pointer list-none items-center justify-center gap-1 text-[11px] uppercase tracking-[0.1em] hover:opacity-60 md:h-auto md:justify-start [&::-webkit-details-marker]:hidden">
        {label}
        <Plus size={14} className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="absolute inset-x-0 top-full z-20 border border-line bg-white p-5 shadow-xl md:left-0 md:right-auto md:mt-3 md:w-72">
        {children}
      </div>
    </details>
  );
}

/** One open filter at a time, and a tap anywhere else closes it. */
function useFilterMenus(toolbar: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = toolbar.current;
    if (!el) return;
    const menus = () => [...el.querySelectorAll<HTMLDetailsElement>("details[data-filter]")];
    const onToggle = (e: Event) => {
      const opened = e.target as HTMLDetailsElement;
      if (opened.open) menus().forEach((d) => d !== opened && (d.open = false));
    };
    const onPointer = (e: PointerEvent) => {
      menus().forEach((d) => d.open && !d.contains(e.target as Node) && (d.open = false));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") menus().forEach((d) => (d.open = false));
    };
    el.addEventListener("toggle", onToggle, true); // toggle doesn't bubble
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [toolbar]);
}

/** Product grid with client-side filtering and sorting. */
export function CollectionView({ products, basePath }: { products: Product[]; basePath: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const roomParam = params.get("room");
  const room = roomHandles.includes(roomParam as Room) ? (roomParam as Room) : null;

  const maxPrice = Math.max(...products.map((p) => p.price), 0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const toolbar = useRef<HTMLDivElement>(null);
  useFilterMenus(toolbar);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return [...map.entries()];
  }, [products]);

  const visible = useMemo(() => {
    const lo = Number(min) || 0;
    const hi = Number(max) || Infinity;
    const list = products.filter(
      (p) =>
        (!room || p.rooms.includes(room)) &&
        (!inStockOnly || p.inStock) &&
        p.price >= lo &&
        p.price <= hi &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))),
    );
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "new":
        return [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      default:
        return list;
    }
  }, [products, room, inStockOnly, min, max, colors, sort]);

  const hasFilters = inStockOnly || min || max || colors.length > 0 || room;
  const reset = () => {
    setInStockOnly(false);
    setMin("");
    setMax("");
    setColors([]);
    if (room) router.replace(basePath, { scroll: false });
  };
  const setRoom = (r: Room | null) =>
    router.replace(r ? `${basePath}?room=${r}` : basePath, { scroll: false });

  return (
    <div className="gutter pb-24">
      {/* Phones: a three-cell filter bar, then [in stock … sort], then [count … clear].
          Desktop: one row; the wrappers below are `md:contents` and md:order-* restores the order. */}
      <div ref={toolbar} className="py-6 md:flex md:flex-wrap md:items-center md:gap-x-7 md:gap-y-4 md:py-8">
        <div className="relative grid grid-cols-3 divide-x divide-line border-y border-line md:contents">
        <FilterMenu label="Room">
          <div className="flex flex-wrap gap-2">
            {[null, ...roomHandles].map((r) => (
              <button
                key={r ?? "all"}
                onClick={() => setRoom(r)}
                aria-pressed={room === r}
                className={cx(
                  "h-9 cursor-pointer border px-3 text-[11px] uppercase tracking-[0.1em]",
                  room === r ? "border-ink bg-ink text-cream" : "border-ink/25 hover:border-ink",
                )}
              >
                {r ? roomLabel(r) : "Any room"}
              </button>
            ))}
          </div>
        </FilterMenu>

        <FilterMenu label="Price">
          <p className="mb-4 text-[11px] uppercase tracking-[0.08em] text-muted">
            The highest price is Rs. {maxPrice.toLocaleString("en-IN")}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="field-label">From</span>
              <input inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} placeholder="0" className="field h-10" />
            </label>
            <label>
              <span className="field-label">To</span>
              <input inputMode="numeric" value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} placeholder={String(maxPrice)} className="field h-10" />
            </label>
          </div>
        </FilterMenu>

        <FilterMenu label="Finish">
          <ul className="grid grid-cols-2 gap-2">
            {allColors.map(([name, hex]) => {
              const on = colors.includes(name);
              return (
                <li key={name}>
                  <label className="flex cursor-pointer items-center gap-2 text-[12px]">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setColors(on ? colors.filter((c) => c !== name) : [...colors, name])}
                      className="peer sr-only"
                    />
                    <span
                      className="h-5 w-5 shrink-0 rounded-full border border-ink/30 ring-offset-2 peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent"
                      style={{ background: hex }}
                    />
                    {name}
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterMenu>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-4 md:contents">
          <label className="flex min-h-10 cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.1em] md:order-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="peer sr-only"
            />
            <span className="relative h-[18px] w-8 rounded-full bg-ink/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-[14px] after:w-[14px] after:rounded-full after:bg-white after:transition-transform peer-checked:bg-ink peer-checked:after:translate-x-[14px] peer-focus-visible:ring-2 peer-focus-visible:ring-accent" />
            In stock only
          </label>

          <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.1em] md:order-5 md:ml-auto">
            <span className="sr-only md:not-sr-only">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 max-w-[11.5rem] cursor-pointer border border-ink bg-white px-3 text-[11px] uppercase tracking-[0.1em] touch:text-[16px] touch:normal-case touch:tracking-normal md:max-w-none"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="name">Alphabetically, A to Z</option>
            </select>
          </label>

          <div className="flex w-full items-center justify-between gap-4 md:contents">
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted md:order-1" aria-live="polite">
              {visible.length} {visible.length === 1 ? "product" : "products"}
            </p>
            {hasFilters && (
              <button onClick={reset} className="link-underline cursor-pointer text-right text-[11px] uppercase tracking-[0.1em] text-muted md:order-4">
                Clear all{room ? ` (showing ${roomLabel(room).toLowerCase()})` : ""}
              </button>
            )}
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[17px] uppercase tracking-[0.04em]">No products match these filters</p>
          <button onClick={reset} className="btn mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-10 xl:grid-cols-4 xl:gap-x-16">
          {visible.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
