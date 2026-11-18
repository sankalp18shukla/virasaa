import { Suspense } from "react";
import { OrderDetail } from "@/components/account/AccountPages";

// AccountShell only renders once the browser-side session is read, so this
// segment is never in the server shell. Opt it out of instant-nav validation.
export const instant = false;

// Order ids only exist in the visitor's browser (demo), so this page is
// rendered on the client and reads the id with useParams().
export default function OrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderDetail />
    </Suspense>
  );
}
