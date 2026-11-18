"use client";

/**
 * CLIENT STATE — DEMO ONLY.
 *
 * Cart, session, user accounts and orders all live in the browser's
 * localStorage so the whole flow works with no backend. This is NOT how a
 * production store should handle accounts or orders:
 *   - replace `auth` with a real provider (Auth.js, Clerk, Supabase Auth, ...)
 *   - replace `orders` with your database / commerce backend
 *   - keep the cart here or move it server-side, both are fine
 *
 * Each store is a tiny external store read with `useSyncExternalStore`, so
 * server render and first client render always agree (no hydration mismatch).
 */

import { useSyncExternalStore } from "react";
import { getProduct, type Product, type ProductColor } from "./products";
import type { PaymentMethod, ShippingMethod } from "./pricing";

/* ------------------------------------------------------------------
   Store primitive
------------------------------------------------------------------- */

interface Store<T> {
  get: () => T;
  getServer: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

function createStore<T>(initial: T, storageKey?: string): Store<T> {
  let state = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    if (!storageKey) return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) state = JSON.parse(raw) as T;
    } catch {
      /* ignore corrupt or unavailable storage */
    }
  };

  return {
    get: () => {
      load();
      return state;
    },
    getServer: () => initial,
    set: (next) => {
      load();
      state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
      if (storageKey) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(state));
        } catch {
          /* storage full or blocked: state still works in memory */
        }
      }
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServer);
}

const noopSubscribe = () => () => {};
/** false on the server and during hydration, true afterwards */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* ------------------------------------------------------------------
   UI (drawers) — not persisted
------------------------------------------------------------------- */

type Panel = "cart" | "menu" | "search" | null;
const uiStore = createStore<{ panel: Panel }>({ panel: null });

export const ui = {
  open: (panel: Exclude<Panel, null>) => uiStore.set({ panel }),
  close: () => uiStore.set({ panel: null }),
};
export const usePanel = () => useStore(uiStore).panel;

/* ------------------------------------------------------------------
   Cart
------------------------------------------------------------------- */

export interface CartLine {
  handle: string;
  color: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  key: string;
  product: Product;
  colorInfo: ProductColor;
  lineTotal: number;
}

const EMPTY_CART: CartLine[] = [];
const cartStore = createStore<CartLine[]>(EMPTY_CART, "demo-store:cart");

export const cart = {
  add(handle: string, color: string, qty = 1) {
    cartStore.set((lines) => {
      const i = lines.findIndex((l) => l.handle === handle && l.color === color);
      if (i === -1) return [...lines, { handle, color, qty }];
      return lines.map((l, idx) => (idx === i ? { ...l, qty: Math.min(l.qty + qty, 10) } : l));
    });
  },
  setQty(handle: string, color: string, qty: number) {
    cartStore.set((lines) =>
      qty <= 0
        ? lines.filter((l) => !(l.handle === handle && l.color === color))
        : lines.map((l) =>
            l.handle === handle && l.color === color ? { ...l, qty: Math.min(qty, 10) } : l,
          ),
    );
  },
  remove(handle: string, color: string) {
    cartStore.set((lines) => lines.filter((l) => !(l.handle === handle && l.color === color)));
  },
  clear() {
    cartStore.set(EMPTY_CART);
  },
};

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  const out: ResolvedLine[] = [];
  for (const l of lines) {
    const product = getProduct(l.handle);
    if (!product) continue;
    const colorInfo = product.colors.find((c) => c.name === l.color) ?? product.colors[0];
    out.push({
      ...l,
      key: `${l.handle}::${l.color}`,
      product,
      colorInfo,
      lineTotal: product.price * l.qty,
    });
  }
  return out;
}

export function useCart() {
  const raw = useStore(cartStore);
  const lines = resolveLines(raw);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  return { lines, count, subtotal };
}

/* ------------------------------------------------------------------
   Accounts + session (DEMO ONLY — browser storage, no server)
------------------------------------------------------------------- */

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UserRecord {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  /** SHA-256 hex of the password. Demo only: real apps hash on the server. */
  passwordHash: string;
  addresses: Address[];
  marketing: boolean;
  createdAt: string;
}

const usersStore = createStore<Record<string, UserRecord>>({}, "demo-store:users");
const sessionStore = createStore<{ email: string | null }>({ email: null }, "demo-store:session");

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const normEmail = (e: string) => e.trim().toLowerCase();
export const uid = (prefix: string) =>
  `${prefix}${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

type Result = { ok: true } | { ok: false; error: string };

export const auth = {
  async register(input: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    marketing: boolean;
  }): Promise<Result> {
    const email = normEmail(input.email);
    if (usersStore.get()[email]) {
      return { ok: false, error: "An account with this email already exists. Try signing in." };
    }
    const user: UserRecord = {
      email,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      phone: input.phone.trim(),
      passwordHash: await sha256(input.password),
      addresses: [],
      marketing: input.marketing,
      createdAt: new Date().toISOString(),
    };
    usersStore.set((u) => ({ ...u, [email]: user }));
    sessionStore.set({ email });
    return { ok: true };
  },

  async login(emailInput: string, password: string): Promise<Result> {
    const email = normEmail(emailInput);
    const user = usersStore.get()[email];
    if (!user || user.passwordHash !== (await sha256(password))) {
      return { ok: false, error: "That email and password don't match. Check both and try again." };
    }
    sessionStore.set({ email });
    return { ok: true };
  },

  /** Demo reset: sets a new password directly. A real app emails a reset link. */
  async resetPassword(emailInput: string, password: string): Promise<Result> {
    const email = normEmail(emailInput);
    const user = usersStore.get()[email];
    if (!user) return { ok: false, error: "No account found for that email." };
    const passwordHash = await sha256(password);
    usersStore.set((u) => ({ ...u, [email]: { ...user, passwordHash } }));
    return { ok: true };
  },

  exists(emailInput: string): boolean {
    return !!usersStore.get()[normEmail(emailInput)];
  },

  logout() {
    sessionStore.set({ email: null });
  },

  updateProfile(patch: Partial<Pick<UserRecord, "firstName" | "lastName" | "phone" | "marketing">>) {
    const email = sessionStore.get().email;
    if (!email) return;
    usersStore.set((u) => (u[email] ? { ...u, [email]: { ...u[email], ...patch } } : u));
  },

  saveAddress(address: Omit<Address, "id"> & { id?: string }) {
    const email = sessionStore.get().email;
    if (!email) return;
    usersStore.set((u) => {
      const user = u[email];
      if (!user) return u;
      const id = address.id ?? uid("ADR");
      let list = user.addresses.some((a) => a.id === id)
        ? user.addresses.map((a) => (a.id === id ? { ...address, id } : a))
        : [...user.addresses, { ...address, id }];
      if (address.isDefault || list.length === 1) {
        list = list.map((a) => ({ ...a, isDefault: a.id === id }));
      }
      return { ...u, [email]: { ...user, addresses: list } };
    });
  },

  deleteAddress(id: string) {
    const email = sessionStore.get().email;
    if (!email) return;
    usersStore.set((u) => {
      const user = u[email];
      if (!user) return u;
      const list = user.addresses.filter((a) => a.id !== id);
      if (list.length && !list.some((a) => a.isDefault)) list[0] = { ...list[0], isDefault: true };
      return { ...u, [email]: { ...user, addresses: list } };
    });
  },
};

export function useUser(): UserRecord | null {
  const session = useStore(sessionStore);
  const users = useStore(usersStore);
  return session.email ? (users[session.email] ?? null) : null;
}

/* ------------------------------------------------------------------
   Orders (DEMO ONLY — browser storage)
------------------------------------------------------------------- */

export interface OrderItem {
  handle: string;
  name: string;
  color: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  email: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  codFee: number;
  total: number;
  promo?: string;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  paymentRef: string;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
  address: Omit<Address, "id" | "isDefault">;
}

const EMPTY_ORDERS: Order[] = [];
const ordersStore = createStore<Order[]>(EMPTY_ORDERS, "demo-store:orders");

export const orders = {
  add(order: Order) {
    ordersStore.set((list) => [order, ...list]);
  },
  find(id: string): Order | undefined {
    return ordersStore.get().find((o) => o.id.toLowerCase() === id.trim().toLowerCase());
  },
};

export function useOrders(email?: string | null): Order[] {
  const all = useStore(ordersStore);
  if (!email) return EMPTY_ORDERS;
  return all.filter((o) => o.email === email);
}

export function useOrder(id: string | null | undefined): Order | undefined {
  const all = useStore(ordersStore);
  if (!id) return undefined;
  return all.find((o) => o.id === id);
}

export const paymentLabels: Record<PaymentMethod, string> = {
  upi: "UPI",
  card: "Credit / Debit card",
  netbanking: "Net banking",
  cod: "Cash on delivery",
};
