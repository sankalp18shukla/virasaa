"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { useHydrated, useOrder, useUser } from "@/lib/store";
import { OrderSummary } from "./OrderSummary";

export function OrderConfirmation() {
  const id = useSearchParams().get("order");
  const hydrated = useHydrated();
  const order = useOrder(id);
  const user = useUser();

  if (!hydrated) return <div className="min-h-[70vh]" />;

  if (!order) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="display">Order not found</h1>
        <p className="max-w-md text-[15px]">
          We couldn&rsquo;t find that order in this browser. Demo orders are stored locally, so they only show up on
          the device that placed them.
        </p>
        <Link href="/collections/all" className="btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="gutter mx-auto max-w-3xl pb-24 pt-14 text-center">
      <CircleCheck size={48} strokeWidth={1} className="mx-auto mb-6 text-[#2f7d4f]" />
      <p className="eyebrow mb-3">Order {order.id}</p>
      <h1 className="display">Thank you, {order.address.fullName.split(" ")[0]}</h1>
      <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-relaxed">
        Your order is confirmed. In a real store a confirmation email would now be on its way to{" "}
        <span className="font-medium">{order.email}</span>. This is a demo, so nothing was charged or sent.
      </p>

      <div className="mt-14">
        <OrderSummary order={order} />
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-2">
        <Link href="/collections/all" className="btn">
          Continue shopping
        </Link>
        {user ? (
          <Link href="/account/orders" className="btn-outline">
            View my orders
          </Link>
        ) : (
          <Link href={`/pages/track-order?order=${order.id}`} className="btn-outline">
            Track this order
          </Link>
        )}
      </div>
    </div>
  );
}
