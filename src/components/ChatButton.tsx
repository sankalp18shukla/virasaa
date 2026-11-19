"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { cx } from "@/lib/format";

/** Pages whose bottom edge already holds the main action on phones (the sticky
 *  add-to-bag bar, checkout / pay buttons); the bubble would sit on top of it. */
const BUSY_BOTTOM = ["/products/", "/cart", "/checkout"];

/** DUMMY: floating help button. Point it at WhatsApp / live chat. */
export function ChatButton() {
  const pathname = usePathname();
  const hideOnPhones = BUSY_BOTTOM.some((p) => pathname.startsWith(p));

  return (
    <Link
      href="/pages/contact"
      aria-label="Chat with us"
      className={cx(
        "fixed bottom-4 right-4 z-30 h-11 w-11 place-items-center rounded-full bg-ink text-cream shadow-lg ring-1 ring-cream/40 transition-transform hover:scale-105 md:bottom-5 md:right-5 md:h-12 md:w-12",
        hideOnPhones ? "hidden lg:grid" : "grid",
      )}
    >
      <MessageCircle size={21} strokeWidth={1.6} />
    </Link>
  );
}
