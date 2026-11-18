import type { Metadata } from "next";
import Link from "next/link";
import { collections } from "@/lib/collections";
import { infoPages, policies, posts } from "@/lib/content";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Sitemap" };

export default function SitemapPage() {
  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Shop",
      links: [
        { label: "Home", href: "/" },
        { label: "Bag", href: "/cart" },
        { label: "Checkout", href: "/checkout" },
        { label: "Search", href: "/search" },
      ],
    },
    { title: "Collections", links: collections.map((c) => ({ label: c.title, href: `/collections/${c.handle}` })) },
    { title: "Products", links: products.map((p) => ({ label: p.name, href: `/products/${p.handle}` })) },
    {
      title: "Account",
      links: [
        { label: "Log in", href: "/account/login" },
        { label: "Create account", href: "/account/register" },
        { label: "Reset password", href: "/account/forgot-password" },
        { label: "My account", href: "/account" },
        { label: "Orders", href: "/account/orders" },
        { label: "Addresses", href: "/account/addresses" },
        { label: "Profile", href: "/account/profile" },
      ],
    },
    {
      title: "Help & info",
      links: [
        ...infoPages.map((p) => ({ label: p.title, href: `/pages/${p.slug}` })),
        { label: "Contact us", href: "/pages/contact" },
        { label: "FAQs", href: "/pages/faqs" },
        { label: "Track your order", href: "/pages/track-order" },
        { label: "Store locator", href: "/pages/stores" },
        { label: "Journal", href: "/journal" },
        ...posts.map((p) => ({ label: p.title, href: `/journal/${p.slug}` })),
      ],
    },
    { title: "Policies", links: policies.map((p) => ({ label: p.title, href: `/policies/${p.slug}` })) },
  ];

  return (
    <div className="gutter pb-24 pt-12">
      <h1 className="display mb-14 text-center">Sitemap</h1>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-4 border-b border-line pb-2 text-[17px] uppercase tracking-[0.04em]">{g.title}</h2>
            <ul className="space-y-1.5 text-[13.5px]">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline hover:underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
