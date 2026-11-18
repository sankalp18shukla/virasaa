import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { stores } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  const { company } = site;
  return (
    <>
      <PageHero title="Contact us" />
      <div className="gutter grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <h2 className="mb-3 text-[17px] uppercase tracking-[0.02em]">Visit us</h2>
          <address className="text-[13.5px] not-italic leading-relaxed">
            {company.legalName}
            <br />
            {company.addressLines.join(", ")}
          </address>
        </section>
        <section>
          <h2 className="mb-3 text-[17px] uppercase tracking-[0.02em]">Support</h2>
          <p className="text-[13.5px] leading-relaxed">
            Email{" "}
            <a href={`mailto:${company.email}`} className="underline underline-offset-4">
              {company.email}
            </a>
            <br />
            Phone{" "}
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
              {company.phone}
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-[17px] uppercase tracking-[0.02em]">Timings</h2>
          <p className="text-[13.5px] leading-relaxed">{company.hours}</p>
        </section>
        <section>
          <h2 className="mb-3 text-[17px] uppercase tracking-[0.02em]">Stores</h2>
          <p className="text-[13.5px] leading-relaxed">
            {stores.map((s) => s.city).join(" · ")}
            <br />
            <Link href="/pages/stores" className="underline underline-offset-4">
              Visit here
            </Link>
          </p>
        </section>
      </div>
      <section className="gutter mx-auto max-w-2xl pb-24">
        <h2 className="display mb-3 text-center">Write to us</h2>
        <p className="mb-10 text-center text-[14px] text-ink/80">We usually reply within 2 working days.</p>
        <ContactForm />
      </section>
    </>
  );
}
