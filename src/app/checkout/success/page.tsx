import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmation } from "@/components/OrderConfirmation";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <OrderConfirmation />
    </Suspense>
  );
}
