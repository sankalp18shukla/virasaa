"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

/** DEMO: no email is sent or stored anywhere. Wire this to your email tool. */
export function Newsletter() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className="text-[13px] text-cream/85">
        You&rsquo;re on the list. (Demo: nothing was actually sent.)
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="max-w-sm text-left md:mx-auto md:max-w-xs"
    >
      <div className="flex items-center border-b border-cream/70">
        <input
          type="email"
          required
          placeholder="EMAIL"
          aria-label="Email address"
          className="h-11 min-w-0 flex-1 bg-transparent text-[12px] tracking-[0.1em] text-cream outline-none placeholder:text-cream/50 touch:text-[16px]"
        />
        <button type="submit" aria-label="Subscribe" className="grid h-11 w-10 cursor-pointer place-items-center">
          <ArrowRight size={20} strokeWidth={1.5} />
        </button>
      </div>
      <label className="mt-4 flex items-start gap-3 text-[12px] leading-snug text-cream/85">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#ffffe6]" />
        <span>
          I have read and agree to the{" "}
          <Link href="/policies/terms" className="underline underline-offset-4">
            Terms and Conditions
          </Link>
          .
        </span>
      </label>
      <p className="mt-4 text-[12px] text-cream/60 md:text-center">
        New drops and early access, a couple of times a month.
      </p>
    </form>
  );
}
