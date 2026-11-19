"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollHint } from "./ScrollHint";

/** Scroll-snap carousel with arrow buttons. Children are the slides. */
export function Carousel({
  children,
  label,
  className = "",
  arrows = "below",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  arrows?: "below" | "overlay";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const buttons = (
    <>
      <button
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className={
          arrows === "overlay"
            ? "absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-ink text-cream hover:opacity-80 md:grid"
            : "grid h-10 w-14 cursor-pointer place-items-center hover:opacity-60"
        }
      >
        <ArrowLeft size={arrows === "overlay" ? 18 : 26} strokeWidth={1.2} />
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Next"
        className={
          arrows === "overlay"
            ? "absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-ink text-cream hover:opacity-80 md:grid"
            : "grid h-10 w-14 cursor-pointer place-items-center hover:opacity-60"
        }
      >
        <ArrowRight size={arrows === "overlay" ? 18 : 26} strokeWidth={1.2} />
      </button>
    </>
  );

  return (
    <div className="relative" role="region" aria-label={label}>
      <div className="relative">
        <div
          ref={ref}
          className={`no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${className}`}
        >
          {children}
        </div>
        {/* phones get no arrow buttons over the slides, so show a swipe hint instead */}
        <ScrollHint target={ref} className="md:hidden" />
      </div>
      {arrows === "overlay" ? buttons : <div className="mt-8 flex justify-center">{buttons}</div>}
    </div>
  );
}
