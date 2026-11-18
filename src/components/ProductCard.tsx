import Link from "next/link";
import type { Product } from "@/lib/products";
import { money } from "@/lib/format";
import { ProductArt } from "./Placeholder";

/** Grid card: image (swaps on hover), price, name, finish swatches. */
export function ProductCard({ product: p, className = "" }: { product: Product; className?: string }) {
  const palette = p.colors[0].palette;
  return (
    <article className={`group text-center ${className}`}>
      <Link href={`/products/${p.handle}`} className="relative block" aria-label={p.name}>
        <ProductArt seed={p.handle} type={p.type} palette={palette} view={0} className="aspect-[4/5]" />
        <ProductArt
          seed={p.handle}
          type={p.type}
          palette={palette}
          view={2}
          tag=""
          className="!absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {!p.inStock && (
          <span className="absolute bottom-2 left-2 bg-white px-2 py-1 text-[10px] uppercase tracking-[0.12em]">
            Sold out
          </span>
        )}
        {p.isNew && p.inStock && (
          <span className="absolute bottom-2 left-2 bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-cream">
            New
          </span>
        )}
      </Link>
      <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-ink/80">
        {p.compareAt && <s className="mr-2 text-muted">{money(p.compareAt)}</s>}
        {money(p.price)}
      </p>
      <h3 className="mx-auto mt-1.5 max-w-[240px] text-[11.5px] uppercase leading-snug tracking-[0.06em]">
        <Link href={`/products/${p.handle}`} className="hover:underline hover:underline-offset-4">
          {p.name}
        </Link>
      </h3>
      {p.colors.length > 1 && (
        <ul className="mt-3 flex justify-center gap-1.5" aria-label="Available finishes">
          {p.colors.map((c) => (
            <li
              key={c.name}
              title={c.name}
              className="h-5 w-5 rounded-full border border-ink/30"
              style={{ background: c.hex }}
            >
              <span className="sr-only">{c.name}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
