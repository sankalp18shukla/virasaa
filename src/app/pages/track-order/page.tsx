import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { TrackOrder } from "@/components/TrackOrder";

export const metadata: Metadata = { title: "Track your order" };

export default function TrackOrderPage() {
  return (
    <>
      <PageHero title="Track your order" />
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <TrackOrder />
      </Suspense>
    </>
  );
}
