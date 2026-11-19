import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Gem, Gift, Lamp, PartyPopper, PenTool, Truck } from "lucide-react";
import { giftingEnquiryHref } from "@/lib/site";

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
    <section className="border-t border-line bg-white py-20 md:py-28" aria-labelledby="gifting">
      <div className="gutter mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Gifting in bulk</p>
          <h2 id="gifting" className="display">
            Corporate &amp; event gifting
          </h2>
          <p className="mt-6 text-[14px] leading-relaxed text-ink/75">
            Handmade wooden gifts for your team, clients and guests, from 20 pieces to 2,000. Tell us the occasion,
            quantity and budget and we&rsquo;ll put together a curated selection with custom packaging.
          </p>
        </header>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:gap-5 lg:grid-cols-4">
          {occasions.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col items-center border border-line px-3 py-7 text-center md:px-6 md:py-9">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-accent md:h-14 md:w-14">
                <Icon size={22} strokeWidth={1.4} aria-hidden />
              </span>
              <h3 className="mt-4 text-[12px] uppercase leading-snug tracking-[0.08em] md:mt-5 md:text-[13px] md:tracking-[0.1em]">{title}</h3>
              <p className="mt-2 max-w-[220px] text-[12px] leading-relaxed text-ink/70 md:text-[13px]">{body}</p>
            </li>
          ))}
        </ul>

        <ul className="mx-auto mt-10 flex w-fit flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted">
              <Icon size={15} strokeWidth={1.5} className="text-accent" aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
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
