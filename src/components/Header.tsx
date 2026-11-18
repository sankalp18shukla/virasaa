"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ChevronDown, Search, ShoppingBag, User, X } from "lucide-react";
import { mainNav, site } from "@/lib/site";
import { searchProducts } from "@/lib/products";
import { ui, useCart, usePanel } from "@/lib/store";
import { cx, money } from "@/lib/format";
import { Drawer } from "./Drawer";
import { CartDrawer } from "./CartDrawer";
import { EditorialArt, ProductArt } from "./Placeholder";

/** Brand lock-up: swan & lotus emblem + "virasaa" wordmark (files in public/brand). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cx("flex shrink-0 items-center gap-2.5", className)}>
      <Image src="/brand/virasaa-emblem.png" alt="" width={758} height={523} preload className="h-9 w-auto md:h-11" />
      <Image src="/brand/virasaa-wordmark.png" alt="" width={644} height={147} preload className="h-[22px] w-auto md:h-[26px]" />
    </Link>
  );
}

/** Closes any open drawer when the route changes. Kept in its own Suspense
 *  boundary because reading the pathname is request-time data. */
function CloseOnNavigate() {
  const pathname = usePathname();
  useEffect(() => {
    ui.close();
  }, [pathname]);
  return null;
}

export function Header() {
  const panel = usePanel();
  const { count } = useCart();
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const active = openMenu !== null ? mainNav[openMenu] : null;

  return (
    <>
      <Suspense fallback={null}>
        <CloseOnNavigate />
      </Suspense>
      <header
        className="sticky top-0 z-40 border-b border-line/70 bg-white"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="gutter flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {mainNav.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setOpenMenu(i)}
                onFocus={() => setOpenMenu(i)}
                onClick={() => setOpenMenu(null)}
                className={cx(
                  "flex h-16 items-center gap-1 text-[12px] uppercase tracking-[0.08em] transition-opacity hover:opacity-60",
                  item.highlight && "text-accent",
                  openMenu === i && "underline decoration-1 underline-offset-[6px]",
                )}
              >
                {item.label}
                <ChevronDown size={12} strokeWidth={2} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => ui.open("search")}
              aria-label="Search"
              className="grid h-10 w-10 cursor-pointer place-items-center hover:opacity-60"
            >
              <Search size={21} strokeWidth={1.6} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="grid h-10 w-10 place-items-center hover:opacity-60"
            >
              <User size={21} strokeWidth={1.6} />
            </Link>
            <button
              onClick={() => ui.open("cart")}
              aria-label={`Bag, ${count} items`}
              className="relative grid h-10 w-10 cursor-pointer place-items-center hover:opacity-60"
            >
              <ShoppingBag size={21} strokeWidth={1.6} />
              {count > 0 && (
                <span className="absolute right-0.5 top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-accent px-1 text-[10px] font-medium leading-none text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => ui.open("menu")}
              aria-label="Menu"
              className="grid h-10 w-10 cursor-pointer place-items-center hover:opacity-60"
            >
              <span className="flex w-[22px] flex-col gap-[5px]">
                <span className="h-[1.6px] w-full bg-ink" />
                <span className="h-[1.6px] w-full bg-ink" />
              </span>
            </button>
          </div>
        </div>

        {/* mega menu */}
        {active?.columns && (
          <div className="absolute inset-x-0 top-full hidden animate-fade-in border-b border-line bg-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.25)] lg:block">
            <div className="gutter grid grid-cols-12 gap-8 py-10">
              <div className="col-span-3">
                <p className="eyebrow mb-3">{active.label}</p>
                <p className="text-[26px] uppercase leading-[1.15] tracking-[-0.01em]">{active.heading}</p>
                <Link
                  href={active.href}
                  onClick={() => setOpenMenu(null)}
                  className="link-underline mt-6 inline-block text-[11px] uppercase tracking-[0.12em]"
                >
                  View all
                </Link>
              </div>
              <div className="col-span-5 grid grid-cols-2 gap-8">
                {active.columns.map((col) => (
                  <div key={col.title}>
                    <p className="eyebrow mb-4">{col.title}</p>
                    <ul className="space-y-2">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            onClick={() => setOpenMenu(null)}
                            className="text-[12px] uppercase tracking-[0.06em] text-ink/80 hover:text-ink hover:underline hover:underline-offset-4"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-3">
                {active.tiles?.map((seed) => (
                  <EditorialArt key={seed} seed={seed} sizes="15vw" className="aspect-[4/5]" />
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={panel === "cart"} />
      <MenuDrawer open={panel === "menu"} />
      <SearchOverlay open={panel === "search"} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function MenuDrawer({ open }: { open: boolean }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <Drawer open={open} onClose={ui.close} title="Menu">
      <nav aria-label="Menu" className="px-6 py-4">
        <ul>
          {mainNav.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <li key={item.label} className="border-b border-line">
                <button
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                  className={cx(
                    "flex w-full cursor-pointer items-center justify-between py-4 text-left text-[20px] uppercase tracking-[0.02em]",
                    item.highlight && "text-accent",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    className={cx("transition-transform", isOpen && "rotate-180")}
                  />
                </button>
                {isOpen && (
                  <div className="grid grid-cols-2 gap-6 pb-6">
                    {item.columns?.map((col) => (
                      <div key={col.title}>
                        <p className="eyebrow mb-3">{col.title}</p>
                        <ul className="space-y-2">
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link href={l.href} onClick={ui.close} className="text-[13px] hover:underline">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href={item.href}
                      onClick={ui.close}
                      className="link-underline col-span-2 text-[11px] uppercase tracking-[0.12em]"
                    >
                      View all {item.label}
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <ul className="mt-8 space-y-3 text-[13px] uppercase tracking-[0.08em]">
          {[
            ["My Account", "/account"],
            ["Track Your Order", "/pages/track-order"],
            ["Returns & Exchange", "/policies/returns-and-exchange"],
            ["FAQs", "/pages/faqs"],
            ["Contact Us", "/pages/contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} onClick={ui.close} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[13px] text-muted">
          {site.company.phone}
          <br />
          {site.company.email}
        </p>
      </nav>
    </Drawer>
  );
}

/* ------------------------------------------------------------------ */

function SearchOverlay({ open }: { open: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const results = searchProducts(q).slice(0, 5);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && ui.close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
      <button
        aria-label="Close search"
        onClick={ui.close}
        className="absolute inset-0 animate-fade-in cursor-default bg-ink/45"
      />
      <div className="relative animate-fade-in bg-white">
        <div className="gutter mx-auto max-w-4xl py-8">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (!q.trim()) return;
              ui.close();
              router.push(`/search?q=${encodeURIComponent(q.trim())}`);
            }}
            className="flex items-center gap-3 border-b border-ink pb-3"
          >
            <Search size={20} strokeWidth={1.6} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search trays, wall decor, jewellery boxes..."
              aria-label="Search products"
              className="h-10 flex-1 bg-transparent text-[18px] uppercase tracking-[0.02em] outline-none focus-visible:outline-none placeholder:normal-case placeholder:text-muted"
            />
            <button
              type="button"
              onClick={ui.close}
              aria-label="Close search"
              className="grid h-10 w-10 cursor-pointer place-items-center hover:opacity-60"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </form>

          {q.trim() && (
            <div className="pt-6">
              {results.length === 0 ? (
                <p className="text-[14px] text-muted">
                  Nothing matches &ldquo;{q}&rdquo;. Try &ldquo;tote&rdquo;, &ldquo;backpack&rdquo; or
                  &ldquo;wallet&rdquo;.
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {results.map((p) => (
                    <li key={p.handle}>
                      <Link
                        href={`/products/${p.handle}`}
                        onClick={ui.close}
                        className="flex items-center gap-4 py-3 hover:opacity-70"
                      >
                        <ProductArt
                          seed={p.handle}
                          type={p.type}
                          palette={p.colors[0].palette}
                          tag=""
                          sizes="128px"
                          className="h-16 w-14 shrink-0"
                        />
                        <span className="flex-1 text-[13px] uppercase tracking-[0.04em]">{p.name}</span>
                        <span className="text-[13px] text-muted">{money(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {results.length > 0 && (
                <Link
                  href={`/search?q=${encodeURIComponent(q.trim())}`}
                  onClick={ui.close}
                  className="link-underline mt-5 inline-block text-[11px] uppercase tracking-[0.12em]"
                >
                  View all results
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
