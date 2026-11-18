import type { Metadata } from "next";
import { stores } from "@/lib/content";
import { EditorialArt } from "@/components/Placeholder";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Store locator" };

export default function StoresPage() {
  return (
    <>
      <PageHero title="Our stores" />
      <div className="gutter grid gap-x-8 gap-y-14 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {stores.map((s) => (
          <article key={s.name}>
            <EditorialArt seed={`store-${s.name}`} tag="Dummy store photo" className="aspect-[6/5]" />
            <h2 className="mt-5 text-[17px] uppercase tracking-[0.02em]">{s.name}</h2>
            <p className="eyebrow mt-1">{s.city}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed">
              {s.address}
              <br />
              <span className="text-muted">{s.hours}</span>
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-3 inline-block text-[11px] uppercase tracking-[0.12em]"
            >
              Get directions
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
