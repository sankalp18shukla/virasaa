"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop: the section pins to the viewport and vertical scrolling moves the
 * row of panels sideways. Mobile / tablet: a normal swipeable row.
 */
export function HorizontalScroll({ children, label }: { children: React.ReactNode; label: string }) {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // how far the track has to travel
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const pinned = window.innerWidth >= 1024 && !reduced.matches;
      setDistance(pinned ? Math.max(el.scrollWidth - window.innerWidth, 0) : 0);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // map vertical scroll to horizontal offset
  useEffect(() => {
    const el = track.current;
    const section = outer.current;
    if (!el || !section) return;
    if (distance === 0) {
      el.style.transform = "";
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerOffset = 64;
      const scrolled = headerOffset - section.getBoundingClientRect().top;
      const x = Math.min(Math.max(scrolled, 0), distance);
      el.style.transform = `translate3d(${-x}px,0,0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  const pinned = distance > 0;

  return (
    <section
      ref={outer}
      aria-label={label}
      className="relative bg-ink"
      style={pinned ? { height: `calc(100vh - 64px + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-16 h-[calc(100vh-64px)] overflow-hidden"
            : "no-scrollbar h-[560px] overflow-x-auto lg:h-[calc(100vh-64px)]"
        }
      >
        <div ref={track} className="flex h-full w-max will-change-transform">
          {children}
        </div>
      </div>
    </section>
  );
}
