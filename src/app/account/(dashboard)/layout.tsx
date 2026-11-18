import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountShell } from "@/components/account/AccountShell";

export const metadata: Metadata = { title: "My account" };

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <AccountShell>{children}</AccountShell>
    </Suspense>
  );
}
