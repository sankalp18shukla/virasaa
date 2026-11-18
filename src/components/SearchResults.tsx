"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function SearchResults() {
  const router = useRouter();
  const q = useSearchParams().get("q") ?? "";
  const results = searchProducts(q);

  return (
    <div className="gutter min-h-[70vh] pb-24 pt-12">
      <h1 className="text-center text-[17px] uppercase tracking-[0.04em]" aria-live="polite">
        {q ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${q}”` : "Search"}
      </h1>
      <form
        role="search"
        key={q}
        onSubmit={(e) => {
          e.preventDefault();
          const value = String(new FormData(e.currentTarget).get("q") ?? "").trim();
          router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
        }}
        className="mx-auto mt-8 flex max-w-2xl items-center border-b border-ink"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Search products"
          aria-label="Search products"
          className="h-12 flex-1 bg-transparent text-[17px] uppercase outline-none focus-visible:outline-none placeholder:normal-case placeholder:text-muted"
        />
        <button type="submit" aria-label="Search" className="grid h-12 w-10 cursor-pointer place-items-center">
          <Search size={20} strokeWidth={1.6} />
        </button>
      </form>

      {q && results.length === 0 && (
        <p className="mt-16 text-center text-[14px] text-muted">
          Nothing matches that. Try &ldquo;tray&rdquo;, &ldquo;elephant&rdquo;, &ldquo;sheesham&rdquo; or a finish like &ldquo;walnut&rdquo;.
        </p>
      )}

      <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-10 xl:grid-cols-4 xl:gap-x-16">
        {results.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </div>
  );
}
