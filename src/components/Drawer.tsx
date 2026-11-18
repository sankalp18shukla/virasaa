"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

/** Right-hand slide-over panel used by the bag and the menu. */
export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in cursor-default bg-ink/45"
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[460px] animate-slide-in flex-col bg-white shadow-2xl">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
          <h2 className="text-[17px] uppercase tracking-[0.04em]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 grid h-10 w-10 cursor-pointer place-items-center hover:opacity-60"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <footer className="shrink-0 border-t border-line p-6">{footer}</footer>}
      </aside>
    </div>
  );
}
