import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { collectionProducts, collections, getCollection } from "@/lib/collections";
import { CollectionView } from "@/components/CollectionView";

// Every page is pre-generated from generateStaticParams, so reading params is fine here.
export const instant = false;

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const c = getCollection(handle);
  return c ? { title: c.title, description: c.description } : {};
}

export default async function CollectionPage({ params }: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();
  const products = collectionProducts(handle);

  return (
    <>
      <header className="gutter mx-auto max-w-4xl pt-12 text-center md:pt-16">
        <h1 className="display">{collection.title}</h1>
        <p className="mt-6 text-[14px] leading-relaxed">{collection.description}</p>
        {collection.chips && (
          <ul className="mt-9 flex flex-wrap justify-center gap-3">
            {collection.chips.map((chip) => (
              <li key={chip.label}>
                <Link
                  href={chip.href}
                  className="inline-flex h-10 items-center rounded-[3px] border border-ink px-5 text-[13px] transition-colors hover:bg-ink hover:text-cream"
                >
                  {chip.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>
      {/* filters read ?for= from the URL, so this part renders on the client */}
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CollectionView products={products} basePath={`/collections/${handle}`} />
      </Suspense>
    </>
  );
}
