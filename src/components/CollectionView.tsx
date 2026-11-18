"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { Product, Room } from "@/lib/products";
import { rooms } from "@/lib/site";
import { cx } from "@/lib/format";
import { ProductCard } from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name" | "new";

const roomHandles = rooms.map((r) => r.handle);
const roomLabel = (r: Room) => rooms.find((x) => x.handle === r)?.label ?? r;

function FilterMenu({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 text-[11px] uppercase tracking-[0.1em] hover:opacity-60 [&::-webkit-details-marker]:hidden">
        {label}
        <Plus size={14} className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="absolute left-0 top-full z-20 mt-3 w-72 border border-line bg-white p-5 shadow-xl">
        {children}
      </div>
    </details>
  );
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
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4 py-8">
        <p className="text-[11px] uppercase tracking-[0.1em] text-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? "product" : "products"}
        </p>

        <label className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.1em]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="peer sr-only"
          />
          <span className="relative h-[18px] w-8 rounded-full bg-ink/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-[14px] after:w-[14px] after:rounded-full after:bg-white after:transition-transform peer-checked:bg-ink peer-checked:after:translate-x-[14px] peer-focus-visible:ring-2 peer-focus-visible:ring-accent" />
          In stock only
        </label>

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

        {hasFilters && (
          <button onClick={reset} className="link-underline cursor-pointer text-[11px] uppercase tracking-[0.1em] text-muted">
            Clear all{room ? ` (showing ${roomLabel(room).toLowerCase()})` : ""}
          </button>
        )}

        <label className="ml-auto flex items-center gap-3 text-[11px] uppercase tracking-[0.1em]">
          Sort by:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 cursor-pointer border border-ink bg-white px-3 text-[11px] uppercase tracking-[0.1em]"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Alphabetically, A to Z</option>
          </select>
        </label>
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
