import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/lib/photos";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Photo credits" };

export default function PhotoCreditsPage() {
  return (
    <>
      <PageHero title="Photo credits" />
      <div className="gutter py-16">
        <p className="mx-auto mb-12 max-w-2xl text-center text-[13.5px] leading-relaxed">
          The photographs on this demo storefront are placeholder images of Indian handicrafts from Wikimedia Commons,
          used under the licences listed below. They are not photos of our products.
        </p>
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((ph) => (
            <li key={ph.slug}>
              <div className="relative aspect-[4/3] overflow-hidden bg-tile">
                <Image src={ph.src} alt={ph.alt} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
              </div>
              <p className="mt-3 text-[13px]">{ph.alt}</p>
              <p className="mt-1 text-[12px] text-muted">
                By {ph.credit}, {ph.license},{" "}
                <a href={ph.source} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  via Wikimedia Commons
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
