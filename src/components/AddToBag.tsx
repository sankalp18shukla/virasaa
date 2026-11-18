"use client";

import { ShoppingBag } from "lucide-react";
import { cart, ui } from "@/lib/store";

/** Adds a product to the bag and opens the bag drawer. */
export function AddToBag({
  handle,
  color,
  qty = 1,
  disabled,
  className = "btn w-full",
  children = "Add to bag",
  iconOnly,
}: {
  handle: string;
  color: string;
  qty?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  iconOnly?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={iconOnly ? "Add to bag" : undefined}
      onClick={() => {
        cart.add(handle, color, qty);
        ui.open("cart");
      }}
      className={className}
    >
      {iconOnly ? <ShoppingBag size={15} strokeWidth={1.8} /> : disabled ? "Sold out" : children}
    </button>
  );
}
