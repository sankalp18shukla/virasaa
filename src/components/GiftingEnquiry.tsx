import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Gem, Gift, Lamp, PartyPopper, PenTool, Truck } from "lucide-react";
import { giftingEnquiryHref } from "@/lib/site";
import { EditorialArt } from "./Placeholder";

/* Copy here is DUMMY placeholder text: swap in your real minimums, lead times and offers. */

const occasions = [
  { icon: BriefcaseBusiness, title: "Corporate & clients", body: "Employee welcome kits, client thank-yous and milestone gifts." },
  { icon: Gem, title: "Weddings", body: "Return favours, trousseau pieces and gifts for the family." },
  { icon: Lamp, title: "Festive hampers", body: "Diwali, Eid, Christmas and new-year boxes, packed and ready." },
  { icon: PartyPopper, title: "Events", body: "Conferences, launches, offsites and speaker gifts." },
];

const perks = [
  { icon: PenTool, label: "Custom engraving & logos" },
  { icon: Gift, label: "Gift wrap & personal notes" },
  { icon: Truck, label: "Delivery to many addresses" },
];

/** Homepage section: invites event and corporate gifting enquiries. */
export function GiftingSection() {
  return (
    <section className="grid bg-paper lg:grid-cols-2" aria-labelledby="gifting">
      <EditorialArt seed="gifting-hampers" tag="Dummy gift hamper photo" className="aspect-[4/3] lg:aspect-auto lg:min-h-[640px]" />
      <div className="gutter flex flex-col justify-center py-16 md:py-20 lg:px-16 xl:px-20">
        <p className="eyebrow mb-5">Gifting in bulk</p>
        <h2 id="gifting" className="display">
          Corporate &amp; event gifting
        </h2>
        <p className="mt-6 max-w-lg text-[14px] leading-relaxed">
          Handmade wooden gifts for your team, clients and guests, from 20 pieces to 2,000. Tell us the occasion,
          quantity and budget and we&rsquo;ll put together a curated selection with custom packaging.
        </p>

        <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {occasions.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <Icon size={24} strokeWidth={1.3} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <h3 className="text-[13px] uppercase tracking-[0.08em]">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/75">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/15 pt-6">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted">
              <Icon size={15} strokeWidth={1.5} aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={giftingEnquiryHref} className="btn">
            Contact us for gifting
          </Link>
          <Link href="/pages/corporate-gifts" className="link-underline text-[11px] uppercase tracking-[0.12em]">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Compact banner for gift collections: points bulk / event buyers to the enquiry form. */
export function GiftingBanner() {
  return (
    <aside className="gutter" aria-label="Corporate and event gifting">
      <div className="flex flex-col items-center gap-6 bg-ink px-6 py-8 text-center text-cream md:flex-row md:justify-between md:px-10 md:text-left">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Gift size={30} strokeWidth={1.2} className="shrink-0 text-cream/80" aria-hidden />
          <div>
            <p className="text-[17px] uppercase tracking-[0.04em]">Gifting for a team, wedding or event?</p>
            <p className="mt-1 text-[13px] text-cream/80">
              Bulk orders, custom engraving and branded packaging. Contact us and we&rsquo;ll send a quote.
            </p>
          </div>
        </div>
        <Link href={giftingEnquiryHref} className="btn-cream-outline shrink-0">
          Contact us <ArrowRight size={13} />
        </Link>
      </div>
    </aside>
  );
}
