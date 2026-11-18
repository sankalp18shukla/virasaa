import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInfoPage, infoPages } from "@/lib/content";
import { EditorialArt } from "@/components/Placeholder";
import { PageHero } from "@/components/PageHero";

// Every page is pre-generated from generateStaticParams, so reading params is fine here.
export const instant = false;

export function generateStaticParams() {
  return infoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  return page ? { title: page.title, description: page.lead } : {};
}

export default async function InfoPage({ params }: PageProps<"/pages/[slug]">) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} />
      <div className="gutter mx-auto max-w-3xl py-16 text-center md:py-20">
        <p className="eyebrow mb-4">{page.eyebrow}</p>
        <p className="text-[20px] leading-relaxed md:text-[24px]">{page.lead}</p>
      </div>
      <div className="gutter space-y-16 pb-24 md:space-y-24">
        {page.blocks.map((b, i) => (
          <section key={b.heading} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <EditorialArt seed={`${page.slug}-${i}`} className={`aspect-[4/3] ${i % 2 ? "md:order-2" : ""}`} />
            <div className="mx-auto max-w-md text-center md:text-left">
              <h2 className="display !text-[26px] md:!text-[32px]">{b.heading}</h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-ink/85">{b.body}</p>
            </div>
          </section>
        ))}
        {page.cta && (
          <p className="text-center">
            <Link href={page.cta.href} className="btn">
              {page.cta.label}
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
