"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@/lib/format";

/** Which sides of a horizontal scroller still have content hidden past the edge. */
function useScrollEdges(ref: React.RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ left: false, right: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      // 8px of slack so snap rounding never leaves an arrow showing at the very end
      const next = { left: el.scrollLeft > 8, right: max - el.scrollLeft > 8 };
      setEdges((prev) => (prev.left === next.left && prev.right === next.right ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", schedule);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
  return edges;
}

/**
 * Watermark arrows over a horizontal scroller, telling phone users there is more to
 * swipe. Purely visual: taps go straight through to whatever is underneath.
 * Place it inside a `relative` box that wraps the scroller and pass the scroller's ref.
 *
 * - "badge": a round translucent arrow, vertically centred (carousels, galleries)
 * - "edge":  a soft fade with a small chevron, for short rows such as tabs
 *
 * `className` decides where it appears, e.g. "md:hidden" for phones only.
 */
export function ScrollHint({
  target,
  variant = "badge",
  tone = "light",
  className = "",
}: {
  target: React.RefObject<HTMLElement | null>;
  variant?: "badge" | "edge";
  /** "dark" for scrollers on a dark background */
  tone?: "light" | "dark";
  className?: string;
}) {
  const { left, right } = useScrollEdges(target);

  if (variant === "edge") {
    const fade = tone === "dark" ? "from-ink" : "from-[#fffcf7]";
    return (
      <div aria-hidden className={cx("pointer-events-none", className)}>
        <span
          className={cx(
            "absolute inset-y-0 left-0 flex w-10 items-center justify-start bg-gradient-to-r to-transparent transition-opacity duration-300",
            fade,
            left ? "opacity-100" : "opacity-0",
          )}
        >
          <ChevronLeft size={16} strokeWidth={1.6} className="text-muted" />
        </span>
        <span
          className={cx(
            "absolute inset-y-0 right-0 flex w-10 items-center justify-end bg-gradient-to-l to-transparent transition-opacity duration-300",
            fade,
            right ? "opacity-100" : "opacity-0",
          )}
        >
          <ChevronRight size={16} strokeWidth={1.6} className="animate-nudge text-muted" />
        </span>
      </div>
    );
  }

  const badge = cx(
    "absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-opacity duration-300",
    tone === "dark" ? "bg-ink/55 text-cream" : "bg-white/75 text-ink",
  );
  return (
    <div aria-hidden className={cx("pointer-events-none", className)}>
      <span className={cx(badge, "left-2.5", left ? "opacity-90" : "opacity-0")}>
        <ChevronLeft size={20} strokeWidth={1.6} />
      </span>
      <span className={cx(badge, "right-2.5", right ? "opacity-90" : "opacity-0")}>
        <ChevronRight size={20} strokeWidth={1.6} className="animate-nudge" />
      </span>
    </div>
  );
}
