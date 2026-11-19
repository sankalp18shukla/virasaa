"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { auth, useOrder, useOrders, useUser, type Address, type Order } from "@/lib/store";
import { formatDate, money } from "@/lib/format";
import { OrderSummary } from "../OrderSummary";

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
        <h2 className="text-[17px] uppercase tracking-[0.04em]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function OrderRow({ order }: { order: Order }) {
  const count = order.items.reduce((n, i) => n + i.qty, 0);
  return (
    <li>
      <Link href={`/account/orders/${order.id}`} className="grid grid-cols-2 gap-2 py-4 text-[13.5px] hover:bg-paper sm:grid-cols-5 sm:px-3">
        <span className="font-medium">{order.id}</span>
        <span className="text-right text-muted sm:text-left">{formatDate(order.createdAt)}</span>
        <span>
          {count} {count === 1 ? "item" : "items"}
        </span>
        <span className="text-right sm:text-left">{order.status}</span>
        <span className="col-span-2 sm:col-span-1 sm:text-right">{money(order.total)}</span>
      </Link>
    </li>
  );
}

function EmptyOrders() {
  return (
    <div className="py-10 text-center">
      <p className="text-[14.5px]">You haven&rsquo;t placed an order yet.</p>
      <Link href="/collections/all" className="btn mt-5">
        Start shopping
      </Link>
    </div>
  );
}

function AddressBlock({ a }: { a: Address }) {
  return (
    <address className="text-[13.5px] not-italic leading-relaxed">
      <span className="font-medium">{a.fullName}</span>
      <br />
      {a.line1}
      {a.line2 ? `, ${a.line2}` : ""}
      <br />
      {a.city}, {a.state} {a.pincode}
      <br />
      {a.phone}
    </address>
  );
}

/* ------------------------------------------------------------------ */

export function Overview() {
  const user = useUser();
  const list = useOrders(user?.email);
  if (!user) return null;
  const def = user.addresses.find((a) => a.isDefault);

  return (
    <>
      <Panel title="Recent orders" action={list.length > 0 && <Link href="/account/orders" className="text-[12px] underline underline-offset-4">View all</Link>}>
        {list.length === 0 ? <EmptyOrders /> : <ul className="divide-y divide-line">{list.slice(0, 3).map((o) => <OrderRow key={o.id} order={o} />)}</ul>}
      </Panel>
      <div className="grid gap-10 sm:grid-cols-2">
        <Panel title="Profile" action={<Link href="/account/profile" className="text-[12px] underline underline-offset-4">Edit</Link>}>
          <p className="text-[13.5px] leading-relaxed">
            {user.firstName} {user.lastName}
            <br />
            {user.email}
            <br />
            {user.phone || <span className="text-muted">No mobile number added</span>}
          </p>
        </Panel>
        <Panel title="Default address" action={<Link href="/account/addresses" className="text-[12px] underline underline-offset-4">Manage</Link>}>
          {def ? <AddressBlock a={def} /> : <p className="text-[13.5px] text-muted">No address saved yet.</p>}
        </Panel>
      </div>
    </>
  );
}

export function OrdersList() {
  const user = useUser();
  const list = useOrders(user?.email);
  return (
    <Panel title={`Orders (${list.length})`}>
      {list.length === 0 ? <EmptyOrders /> : <ul className="divide-y divide-line">{list.map((o) => <OrderRow key={o.id} order={o} />)}</ul>}
    </Panel>
  );
}

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const user = useUser();
  const order = useOrder(id);

  if (!order || order.email !== user?.email) {
    return (
      <Panel title="Order not found">
        <p className="text-[14px]">We couldn&rsquo;t find that order on your account.</p>
        <Link href="/account/orders" className="btn mt-5">
          Back to orders
        </Link>
      </Panel>
    );
  }
  return (
    <Panel title={`Order ${order.id}`} action={<Link href="/account/orders" className="text-[12px] underline underline-offset-4">All orders</Link>}>
      <OrderSummary order={order} />
      <p className="mt-10 text-[13px] text-muted">
        Need to return or exchange something? Read the{" "}
        <Link href="/policies/returns-and-exchange" className="underline underline-offset-4">
          returns policy
        </Link>{" "}
        or{" "}
        <Link href="/pages/contact" className="underline underline-offset-4">
          contact us
        </Link>
        .
      </p>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */

const blank = { fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" };

export function Addresses() {
  const user = useUser();
  const [editing, setEditing] = useState<(Omit<Address, "id"> & { id?: string }) | null>(null);
  const [error, setError] = useState("");
  if (!user) return null;

  const field = (key: keyof typeof blank, label: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className={key === "line1" || key === "line2" ? "sm:col-span-2" : undefined}>
      <label htmlFor={`ad-${key}`} className="field-label">
        {label}
      </label>
      <input
        id={`ad-${key}`}
        value={editing?.[key] ?? ""}
        onChange={(e) => setEditing((a) => (a ? { ...a, [key]: e.target.value } : a))}
        className="field"
        {...extra}
      />
    </div>
  );

  return (
    <Panel
      title="Addresses"
      action={
        !editing && (
          <button onClick={() => setEditing({ ...blank, fullName: `${user.firstName} ${user.lastName}`, phone: user.phone })} className="cursor-pointer text-[12px] underline underline-offset-4">
            Add address
          </button>
        )
      }
    >
      {editing ? (
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\d{6}$/.test(editing.pincode)) return setError("Enter a 6-digit PIN code.");
            if (!/^\d{10}$/.test(editing.phone.replace(/\D/g, "").slice(-10))) return setError("Enter a 10-digit mobile number.");
            auth.saveAddress(editing);
            setEditing(null);
            setError("");
          }}
        >
          {error && (
            <p role="alert" className="border border-accent p-3 text-[13px] text-accent sm:col-span-2">
              {error}
            </p>
          )}
          {field("fullName", "Full name", { required: true, autoComplete: "name" })}
          {field("phone", "Mobile number", { required: true, type: "tel", autoComplete: "tel" })}
          {field("line1", "Address", { required: true, autoComplete: "address-line1" })}
          {field("line2", "Apartment, landmark (optional)", { autoComplete: "address-line2" })}
          {field("city", "City", { required: true, autoComplete: "address-level2" })}
          {field("state", "State", { required: true, autoComplete: "address-level1" })}
          {field("pincode", "PIN code", { required: true, inputMode: "numeric", maxLength: 6, autoComplete: "postal-code" })}
          <label className="flex cursor-pointer items-center gap-3 self-end pb-3 text-[13px]">
            <input type="checkbox" checked={!!editing.isDefault} onChange={(e) => setEditing({ ...editing, isDefault: e.target.checked })} className="h-4 w-4 accent-[#1b1b15]" />
            Make this my default address
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" className="btn">
              Save address
            </button>
            <button type="button" onClick={() => { setEditing(null); setError(""); }} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      ) : user.addresses.length === 0 ? (
        <p className="py-6 text-[14px] text-muted">No saved addresses yet. Add one to check out faster.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {user.addresses.map((a) => (
            <li key={a.id} className="border border-ink/15 p-5">
              {a.isDefault && <p className="eyebrow mb-2 !text-ink">Default</p>}
              <AddressBlock a={a} />
              <div className="mt-4 flex gap-5 text-[12px] touch:mt-2 touch:[&>button]:min-h-10">
                <button onClick={() => setEditing({ ...a, line2: a.line2 ?? "" })} className="cursor-pointer underline underline-offset-4">
                  Edit
                </button>
                {!a.isDefault && (
                  <button onClick={() => auth.saveAddress({ ...a, isDefault: true })} className="cursor-pointer underline underline-offset-4">
                    Set as default
                  </button>
                )}
                <button onClick={() => auth.deleteAddress(a.id)} className="cursor-pointer text-muted underline underline-offset-4">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

export function Profile() {
  const user = useUser();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  return (
    <Panel title="Profile">
      <form
        className="grid max-w-xl gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          auth.updateProfile({
            firstName: String(d.get("firstName")).trim(),
            lastName: String(d.get("lastName")).trim(),
            phone: String(d.get("phone")).trim(),
            marketing: d.get("marketing") === "on",
          });
          setSaved(true);
        }}
        onChange={() => setSaved(false)}
      >
        <div>
          <label htmlFor="firstName" className="field-label">
            First name
          </label>
          <input id="firstName" name="firstName" defaultValue={user.firstName} required autoComplete="given-name" className="field" />
        </div>
        <div>
          <label htmlFor="lastName" className="field-label">
            Last name
          </label>
          <input id="lastName" name="lastName" defaultValue={user.lastName} required autoComplete="family-name" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input id="email" value={user.email} readOnly className="field bg-paper text-muted" />
          <p className="mt-1 text-[12px] text-muted">Your email is your sign-in and can&rsquo;t be changed here.</p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="field-label">
            Mobile number
          </label>
          <input id="phone" name="phone" type="tel" defaultValue={user.phone} autoComplete="tel" className="field" />
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-[13px] sm:col-span-2">
          <input type="checkbox" name="marketing" defaultChecked={user.marketing} className="h-4 w-4 accent-[#1b1b15]" />
          Email me about new drops and offers.
        </label>
        <div className="flex items-center gap-4 sm:col-span-2">
          <button type="submit" className="btn">
            Save changes
          </button>
          {saved && (
            <span role="status" className="text-[13px] text-[#2f7d4f]">
              Saved.
            </span>
          )}
        </div>
      </form>
      <p className="mt-10 text-[13px]">
        Want a new password?{" "}
        <Link href="/account/forgot-password" className="underline underline-offset-4">
          Reset it here
        </Link>
        .
      </p>
    </Panel>
  );
}
