"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth, useHydrated, useUser } from "@/lib/store";
import { cx } from "@/lib/format";

const nav = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Profile", href: "/account/profile" },
];

/** Guards every /account page and draws the side navigation. */
export function AccountShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHydrated();
  const user = useUser();

  useEffect(() => {
    if (hydrated && !user) router.replace("/account/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) return <div className="min-h-[70vh]" />;

  return (
    <div className="gutter mx-auto max-w-6xl pb-24 pt-12">
      <header className="mb-12 text-center">
        <p className="eyebrow mb-3">My account</p>
        <h1 className="display">Hello, {user.firstName}</h1>
      </header>
      <div className="grid gap-10 lg:grid-cols-12">
        <nav aria-label="Account" className="lg:col-span-3">
          <ul className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line lg:flex-col lg:border-b-0">
            {nav.map((item) => {
              const active = item.href === "/account" ? pathname === "/account" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "block whitespace-nowrap px-4 py-3 text-[12px] uppercase tracking-[0.1em] lg:border-l-2",
                      active ? "border-ink bg-paper font-medium" : "border-transparent text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                /* the guard above sends signed-out visitors to the log-in page */
                onClick={() => auth.logout()}
                className="block cursor-pointer whitespace-nowrap px-4 py-3 text-[12px] uppercase tracking-[0.1em] text-muted hover:text-ink lg:border-l-2 lg:border-transparent"
              >
                Sign out
              </button>
            </li>
          </ul>
        </nav>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
