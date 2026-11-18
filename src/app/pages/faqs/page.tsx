import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "FAQs" };

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQs" />
      <div className="gutter mx-auto max-w-3xl py-16">
        {faqs.map((group) => (
          <section key={group.group} className="mb-14">
            <h2 className="mb-4 text-[17px] uppercase tracking-[0.04em]">{group.group}</h2>
            <div className="border-t border-line">
              {group.items.map((item) => (
                <details key={item.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus size={16} className="shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 text-[14.5px] leading-relaxed text-ink/80">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        <p className="text-center text-[14px]">
          Still stuck?{" "}
          <Link href="/pages/contact" className="underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
}
