import Image from "next/image";
import Link from "next/link";
import { footerLegal, footerNav, site } from "@/lib/site";
import { Newsletter } from "./Newsletter";

export function Footer() {
  const { company } = site;
  return (
    <footer className="bg-ink text-cream">
      <div className="gutter flex flex-col items-center pb-14 pt-16 text-center md:pt-20">
        <Link href="/" aria-label={`${site.name} home`} className="block w-fit">
          <Image src="/brand/virasaa-logo.png" alt="" width={758} height={685} className="h-auto w-[150px] md:w-[180px]" />
        </Link>
        <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-cream/85">
          {site.description}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={`${s.label} (dummy link)`}
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/50 text-[11px] font-medium uppercase transition-colors hover:bg-cream hover:text-ink"
              >
                {s.label.slice(0, 2)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="gutter">
        <div className="border-t border-cream/15" />
      </div>

      <div className="gutter grid gap-x-8 gap-y-14 pb-20 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <h3 className="mb-5 text-[17px] uppercase tracking-[0.02em]">Contact</h3>
          <address className="text-[13px] not-italic leading-relaxed text-cream/85">
            {company.legalName}
            <br />
            {company.addressLines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
            <span className="mt-4 block">
              Mobile:{" "}
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
                {company.phone}
              </a>
              <br />
              Email:{" "}
              <a href={`mailto:${company.email}`} className="underline underline-offset-4">
                {company.email}
              </a>
            </span>
            <span className="mt-4 block text-[11px] uppercase tracking-[0.12em]">Timings</span>
            {company.hours}
          </address>
        </div>

        {footerNav.map((col) => (
          <div key={col.title} className="text-center">
            <h3 className="mb-5 text-[17px] uppercase tracking-[0.02em]">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-cream/85 underline-offset-4 hover:text-cream hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center">
          <h3 className="mb-5 text-[17px] uppercase tracking-[0.02em]">Newsletter</h3>
          <Newsletter />
        </div>
      </div>

      <div className="gutter">
        <div className="flex flex-col items-center gap-4 border-t border-cream/15 pb-24 pt-10 md:pb-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLegal.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-[11px] uppercase tracking-[0.1em] text-cream/75 hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-cream/50">
            &copy; {site.company.legalName}. Demo storefront with placeholder content.
          </p>
        </div>
      </div>
    </footer>
  );
}
