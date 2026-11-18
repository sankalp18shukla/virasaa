import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPolicy, policies } from "@/lib/content";

// Every page is pre-generated from generateStaticParams, so reading params is fine here.
export const instant = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  return policy ? { title: policy.title, description: policy.intro } : {};
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <article className="gutter mx-auto max-w-3xl pb-24 pt-12">
      <h1 className="text-center text-[20px] uppercase tracking-[0.04em] md:text-[24px]">{policy.title}</h1>
      <p className="mx-auto mt-6 max-w-xl border border-ink/15 bg-paper p-3 text-center text-[12px] leading-relaxed text-ink/75">
        Template text for this demo store. It is not legal advice; replace it with your own reviewed policy.
      </p>
      <div className="prose-store mt-10">
        <p>{policy.intro}</p>
        {policy.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body?.map((para) => <p key={para}>{para}</p>)}
            {s.list && (
              <ul>
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <nav aria-label="Other policies" className="mt-16 border-t border-line pt-8">
        <p className="eyebrow mb-4">More policies</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          {policies
            .filter((p) => p.slug !== policy.slug)
            .map((p) => (
              <li key={p.slug}>
                <Link href={`/policies/${p.slug}`} className="underline underline-offset-4 hover:opacity-60">
                  {p.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </article>
  );
}
