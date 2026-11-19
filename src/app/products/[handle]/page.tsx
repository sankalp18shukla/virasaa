import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Hammer, HandHeart, Lock, TreePine, Truck } from "lucide-react";
import { getProduct, products, relatedProducts } from "@/lib/products";
import { Carousel } from "@/components/Carousel";
import { ProductCard } from "@/components/ProductCard";
import { ProductView } from "@/components/ProductView";

// Every page is pre-generated from generateStaticParams, so reading params is fine here.
export const instant = false;

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const p = getProduct(handle);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <>
      <nav aria-label="Breadcrumb" className="gutter py-4 text-[11px] uppercase tracking-[0.1em] text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/collections/all" className="hover:text-ink">
          All products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductView product={product} />

      <section className="pb-20" aria-labelledby="related">
        <h2 id="related" className="display gutter mb-10 text-center">
          You may also like
        </h2>
        <Carousel label="Related products" className="gap-5 px-5 md:gap-10 md:px-8 lg:px-12">
          {related.map((p) => (
            <ProductCard key={p.handle} product={p} className="w-[46vw] shrink-0 snap-start sm:w-[220px] lg:w-[calc((100vw-6rem-10rem)/5)]" />
          ))}
        </Carousel>
      </section>

      {/* DUMMY brand pillars */}
      <section className="bg-ink py-16 text-cream md:py-20">
        <ul className="gutter mx-auto grid max-w-md gap-9 md:max-w-none md:grid-cols-3 md:gap-12 md:text-center">
          {[
            { icon: HandHeart, title: "Made by hand", body: "Every piece is carved, turned or painted by an artisan, not a machine line." },
            { icon: TreePine, title: "Solid wood", body: "Real hardwood with its own grain, so no two pieces are ever quite the same." },
            { icon: Award, title: "Made to last", body: "Built to be used every day and handed down. Placeholder copy: your promise here." },
          ].map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex items-start gap-5 md:block">
              <Icon strokeWidth={1} className="h-10 w-10 shrink-0 text-accent md:mx-auto md:mb-5 md:h-11 md:w-11" />
              <div>
                <h3 className="text-[20px] md:text-[24px]">{title}</h3>
                <p className="mt-1 max-w-xs text-[13px] text-cream/85 md:mx-auto md:mt-2">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="gutter py-16">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4 md:gap-10">
          {[
            { icon: Truck, label: "Free shipping" },
            { icon: HandHeart, label: "Handcrafted in small batches" },
            { icon: Hammer, label: "Hand-finished detail" },
            { icon: Lock, label: "Secure payments" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="text-[12px] uppercase tracking-[0.1em]">
              <Icon size={34} strokeWidth={1.2} className="mx-auto mb-4" />
              {label}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
