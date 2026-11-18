"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, X } from "lucide-react";
import { computeTotals, promoCodes, shippingMethods, type PaymentMethod, type ShippingMethod } from "@/lib/pricing";
import { auth, cart, orders, paymentLabels, useCart, useHydrated, useUser, type Address, type Order } from "@/lib/store";
import { cx, money } from "@/lib/format";
import { ProductArt } from "./Placeholder";

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other",
];

type Form = {
  email: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

const emptyForm: Form = { email: "", fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" };

function validate(f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email, like name@example.com.";
  if (f.fullName.trim().length < 2) e.fullName = "Enter the recipient's full name.";
  if (!/^\d{10}$/.test(f.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit mobile number.";
  if (f.line1.trim().length < 4) e.line1 = "Enter the house / flat number and street.";
  if (!f.city.trim()) e.city = "Enter the city.";
  if (!f.state) e.state = "Choose a state.";
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a 6-digit PIN code.";
  return e;
}

function Field({
  label,
  error,
  className,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `co-${props.name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cx("field", error && "!border-accent")}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[12px] text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

type Quote = { orderId: string; gatewayRef: string; subtotal: number; discount: number; shipping: number; codFee: number; total: number };

export function CheckoutView() {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useUser();
  const { lines, subtotal } = useCart();

  const [form, setForm] = useState<Form>(emptyForm);
  const [prefilledFor, setPrefilledFor] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [shipping, setShipping] = useState<ShippingMethod>("standard");
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [saveAddress, setSaveAddress] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null); // set => gateway modal is open
  const [paying, setPaying] = useState(false);

  // prefill once from the signed-in user's profile and default address
  if (user && prefilledFor !== user.email) {
    const a = user.addresses.find((x) => x.isDefault) ?? user.addresses[0];
    setPrefilledFor(user.email);
    setForm({
      email: user.email,
      fullName: a?.fullName ?? `${user.firstName} ${user.lastName}`.trim(),
      phone: a?.phone ?? user.phone,
      line1: a?.line1 ?? "",
      line2: a?.line2 ?? "",
      city: a?.city ?? "",
      state: a?.state ?? "",
      pincode: a?.pincode ?? "",
    });
  }

  const totals = computeTotals(subtotal, { promo, method, shipping });
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
    if (formError) setFormError("");
  };

  const fillFrom = (a: Address) =>  {
    setForm((f) => ({ ...f, fullName: a.fullName, phone: a.phone, line1: a.line1, line2: a.line2 ?? "", city: a.city, state: a.state, pincode: a.pincode }));
    setErrors({});
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (promoCodes[code]) {
      setPromo(code);
      setPromoError("");
    } else {
      setPromo(null);
      setPromoError("That code isn't valid. Try DEMO10.");
    }
  };

  const finalize = (q: Quote) => {
    setPaying(true);
    const order: Order = {
      id: q.orderId,
      email: user?.email ?? form.email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
      items: lines.map((l) => ({ handle: l.handle, name: l.product.name, color: l.color, qty: l.qty, price: l.product.price })),
      subtotal: q.subtotal,
      discount: q.discount,
      shipping: q.shipping,
      codFee: q.codFee,
      total: q.total,
      promo: promo ?? undefined,
      paymentMethod: method,
      shippingMethod: shipping,
      paymentRef: method === "cod" ? "Pay on delivery" : q.gatewayRef,
      status: "Confirmed",
      address: { fullName: form.fullName.trim(), phone: form.phone.trim(), line1: form.line1.trim(), line2: form.line2.trim() || undefined, city: form.city.trim(), state: form.state, pincode: form.pincode },
    };
    orders.add(order);
    if (user && saveAddress) {
      const same = user.addresses.some((a) => a.line1 === order.address.line1 && a.pincode === order.address.pincode);
      if (!same) auth.saveAddress({ ...order.address });
    }
    router.push(`/checkout/success?order=${q.orderId}`);
    // empty the bag after navigation starts so this page doesn't flash "empty"
    setTimeout(() => cart.clear(), 400);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const errs = validate(form);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      setFormError("Some details need fixing before you can pay. Check the fields marked in red.");
      const first = Object.keys(errs)[0];
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    setBusy(true);
    try {
      // the server re-prices the bag; the browser's totals are never trusted
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ handle: l.handle, color: l.color, qty: l.qty })),
          promo,
          method,
          shipping,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "We couldn't start your order.");
      if (method === "cod") finalize(data as Quote);
      else setQuote(data as Quote);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "We couldn't start your order. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!hydrated) return <div className="min-h-[70vh]" />;

  if (lines.length === 0 && !paying && !quote) {
    return (
      <div className="gutter flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="display">Checkout</h1>
        <p className="text-[15px]">Your bag is empty, so there is nothing to check out yet.</p>
        <Link href="/collections/all" className="btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="gutter mx-auto max-w-6xl pb-24 pt-10">
      <h1 className="display text-center">Checkout</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-[12.5px] text-muted">
        Demo checkout: no real payment is taken and nothing is shipped.
      </p>

      <form onSubmit={submit} noValidate className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-7">
          {/* 1. contact */}
          <section aria-labelledby="co-contact">
            <div className="mb-5 flex items-baseline justify-between">
              <h2 id="co-contact" className="text-[17px] uppercase tracking-[0.04em]">
                1. Contact
              </h2>
              {!user && (
                <p className="text-[12.5px]">
                  Have an account?{" "}
                  <Link href="/account/login?next=/checkout" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </p>
              )}
            </div>
            <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} readOnly={!!user} />
            <p className="mt-2 text-[12px] text-muted">Your order confirmation goes here.</p>
          </section>

          {/* 2. delivery */}
          <section aria-labelledby="co-delivery">
            <h2 id="co-delivery" className="mb-5 text-[17px] uppercase tracking-[0.04em]">
              2. Delivery address
            </h2>
            {user && user.addresses.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {user.addresses.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => fillFrom(a)}
                    className={cx(
                      "cursor-pointer border px-3 py-2 text-left text-[12px] leading-snug",
                      form.line1 === a.line1 && form.pincode === a.pincode ? "border-ink" : "border-ink/25 hover:border-ink",
                    )}
                  >
                    <span className="block font-medium">{a.fullName}</span>
                    {a.line1}, {a.city} {a.pincode}
                  </button>
                ))}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="fullName" autoComplete="name" value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
              <Field label="Mobile number" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} error={errors.phone} />
              <Field className="sm:col-span-2" label="Address" name="line1" autoComplete="address-line1" value={form.line1} onChange={set("line1")} error={errors.line1} />
              <Field className="sm:col-span-2" label="Apartment, landmark (optional)" name="line2" autoComplete="address-line2" value={form.line2} onChange={set("line2")} />
              <Field label="City" name="city" autoComplete="address-level2" value={form.city} onChange={set("city")} error={errors.city} />
              <div>
                <label htmlFor="co-state" className="field-label">
                  State
                </label>
                <select id="co-state" name="state" value={form.state} onChange={set("state")} aria-invalid={!!errors.state} className={cx("field", errors.state && "!border-accent")}>
                  <option value="">Select</option>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-[12px] text-accent">{errors.state}</p>}
              </div>
              <Field label="PIN code" name="pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={form.pincode} onChange={set("pincode")} error={errors.pincode} />
            </div>
            {user && (
              <label className="mt-4 flex cursor-pointer items-center gap-3 text-[13px]">
                <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} className="h-4 w-4 accent-[#1b1b15]" />
                Save this address to my account
              </label>
            )}
          </section>

          {/* 3. shipping */}
          <section aria-labelledby="co-shipping">
            <h2 id="co-shipping" className="mb-5 text-[17px] uppercase tracking-[0.04em]">
              3. Delivery option
            </h2>
            <div className="space-y-2">
              {(Object.keys(shippingMethods) as ShippingMethod[]).map((key) => {
                const m = shippingMethods[key];
                return (
                  <label key={key} className={cx("flex cursor-pointer items-center gap-4 border p-4", shipping === key ? "border-ink" : "border-ink/20")}>
                    <input type="radio" name="shipping" checked={shipping === key} onChange={() => setShipping(key)} className="h-4 w-4 accent-[#1b1b15]" />
                    <span className="flex-1 text-[14px]">
                      {m.label}
                      <span className="block text-[12px] text-muted">{m.eta}</span>
                    </span>
                    <span className="text-[13px]">{m.price === 0 ? "Free" : money(m.price)}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 4. payment */}
          <section aria-labelledby="co-payment">
            <h2 id="co-payment" className="mb-5 text-[17px] uppercase tracking-[0.04em]">
              4. Payment
            </h2>
            <div className="space-y-2">
              {(Object.keys(paymentLabels) as PaymentMethod[]).map((key) => (
                <label key={key} className={cx("flex cursor-pointer items-center gap-4 border p-4", method === key ? "border-ink" : "border-ink/20")}>
                  <input type="radio" name="method" checked={method === key} onChange={() => setMethod(key)} className="h-4 w-4 accent-[#1b1b15]" />
                  <span className="flex-1 text-[14px]">
                    {paymentLabels[key]}
                    <span className="block text-[12px] text-muted">
                      {key === "cod"
                        ? `Pay the courier in cash. Adds a ${money(computeTotals(1, { method: "cod" }).codFee)} handling fee.`
                        : "You'll complete this on the payment partner's secure page."}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-2 text-[12px] text-muted">
              <Lock size={14} className="mt-0.5 shrink-0" />
              Card, UPI and bank details are never typed into this site. In a real store your payment gateway collects
              them; in this demo a simulated gateway window opens instead.
            </p>
          </section>
        </div>

        {/* summary */}
        <aside className="lg:col-span-5" aria-label="Order summary">
          <div className="bg-paper p-6 md:p-8 lg:sticky lg:top-24">
            <h2 className="mb-5 text-[17px] uppercase tracking-[0.04em]">Order summary</h2>
            <ul className="divide-y divide-ink/10">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-4 py-3">
                  <div className="relative shrink-0">
                    <ProductArt seed={l.handle} type={l.product.type} palette={l.colorInfo.palette} tag="" sizes="96px" className="h-[72px] w-14" />
                    <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] text-cream">
                      {l.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] uppercase leading-snug tracking-[0.04em]">{l.product.name}</p>
                    <p className="text-[12px] text-muted">{l.color}</p>
                  </div>
                  <span className="text-[13px]">{money(l.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-2">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyPromo();
                  }
                }}
                placeholder="Promo code (try DEMO10)"
                aria-label="Promo code"
                className="field h-11 flex-1 uppercase placeholder:normal-case"
              />
              <button type="button" onClick={applyPromo} className="btn-outline px-5">
                Apply
              </button>
            </div>
            {promoError && <p className="mt-2 text-[12px] text-accent">{promoError}</p>}
            {promo && (
              <p className="mt-2 flex items-center justify-between text-[12px]">
                <span>
                  {promo}: {totals.promoLabel}
                </span>
                <button type="button" onClick={() => setPromo(null)} className="cursor-pointer underline underline-offset-2">
                  Remove
                </button>
              </p>
            )}

            <dl className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-[14px]">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-accent">
                  <dt>Discount</dt>
                  <dd>-{money(totals.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd>{totals.shipping === 0 ? "Free" : money(totals.shipping)}</dd>
              </div>
              {totals.codFee > 0 && (
                <div className="flex justify-between">
                  <dt>Cash on delivery fee</dt>
                  <dd>{money(totals.codFee)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink/10 pt-4 text-[17px] uppercase tracking-[0.02em]">
                <dt>Total</dt>
                <dd>{money(totals.total)}</dd>
              </div>
            </dl>
            <p className="mt-1 text-[11.5px] text-muted">Including taxes.</p>

            {formError && (
              <p role="alert" className="mt-5 border border-accent bg-white p-3 text-[13px] text-accent">
                {formError}
              </p>
            )}

            <button type="submit" disabled={busy} className="btn mt-6 h-12 w-full">
              {busy ? "Starting your order..." : method === "cod" ? "Place order" : `Pay ${money(totals.total)}`}
            </button>
            <p className="mt-4 text-center text-[11.5px] leading-relaxed text-muted">
              By placing this order you agree to the{" "}
              <Link href="/policies/terms" className="underline underline-offset-2">
                Terms
              </Link>
              ,{" "}
              <Link href="/policies/refunds" className="underline underline-offset-2">
                Refunds
              </Link>{" "}
              and{" "}
              <Link href="/policies/returns-and-exchange" className="underline underline-offset-2">
                Returns
              </Link>{" "}
              policies.
            </p>
          </div>
        </aside>
      </form>

      {/* ---------------- simulated payment gateway ---------------- */}
      {quote && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Demo payment gateway">
          <div className="absolute inset-0 bg-ink/60" />
          <div className="relative w-full max-w-md animate-fade-in bg-white shadow-2xl">
            <header className="flex items-center justify-between bg-ink px-6 py-4 text-cream">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-cream/70">Simulated gateway</p>
                <p className="text-[17px] uppercase tracking-[0.04em]">Demo Pay</p>
              </div>
              {!paying && (
                <button
                  onClick={() => {
                    setQuote(null);
                    setFormError("Payment cancelled. Nothing was charged. You can try again when you're ready.");
                  }}
                  aria-label="Cancel payment"
                  className="cursor-pointer hover:opacity-70"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              )}
            </header>
            <div className="p-6">
              <dl className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-muted">Order</dt>
                  <dd>{quote.orderId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Method</dt>
                  <dd>{paymentLabels[method]}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-[18px]">
                  <dt>Amount</dt>
                  <dd>{money(quote.total)}</dd>
                </div>
              </dl>
              <p className="mt-5 bg-paper p-3 text-[12.5px] leading-relaxed">
                This window stands in for your payment provider&rsquo;s hosted page (Razorpay, Stripe, PayU...). No
                money moves and no payment details are collected. Pick an outcome to test:
              </p>
              {paying ? (
                <p className="mt-6 flex items-center justify-center gap-3 py-3 text-[13px]" role="status">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                  Confirming payment...
                </p>
              ) : (
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => {
                      setPaying(true);
                      setTimeout(() => finalize(quote), 1300);
                    }}
                    className="btn w-full"
                  >
                    Simulate successful payment
                  </button>
                  <button
                    onClick={() => {
                      setQuote(null);
                      setFormError("The payment didn't go through and nothing was charged. Try again or choose another method.");
                    }}
                    className="btn-outline w-full"
                  >
                    Simulate failed payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
