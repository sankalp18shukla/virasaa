"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cx } from "@/lib/format";

/** Footer column. Phones: a collapsible row so the footer stays short.
 *  md and up: an always-open, centred column with a plain heading. */
export function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-cream/15 md:border-0 md:text-center">
      <h3 className="text-[15px] uppercase tracking-[0.04em] md:mb-5 md:text-[17px] md:tracking-[0.02em]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full cursor-pointer items-center justify-between py-4 text-left uppercase md:hidden"
        >
          {title}
          <Plus size={16} strokeWidth={1.5} className={cx("transition-transform", open && "rotate-45")} />
        </button>
        <span className="hidden md:inline">{title}</span>
      </h3>
      <div id={id} className={cx("pb-6 md:block md:pb-0", open ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}
