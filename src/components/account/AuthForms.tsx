"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { auth, useHydrated, useUser } from "@/lib/store";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** only allow same-site paths in ?next= */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/account";
}

function DemoNote() {
  return (
    <p className="mt-8 border border-ink/15 bg-paper p-3 text-left text-[12px] leading-relaxed text-ink/80">
      <strong className="font-medium">Demo accounts.</strong> Accounts here are saved only in this browser&rsquo;s
      local storage, with no server and no email. Use any made-up details, and don&rsquo;t reuse a real password.
    </p>
  );
}

function PasswordField({ label, name, autoComplete, hint }: { label: string; name: string; autoComplete: string; hint?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <div className="relative">
        <input id={name} name={name} type={show ? "text" : "password"} autoComplete={autoComplete} required minLength={8} className="field pr-12" />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-0 top-0 grid h-12 w-12 cursor-pointer place-items-center text-muted hover:text-ink"
        >
          {show ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
        </button>
      </div>
      {hint && <p className="mt-1 text-[12px] text-muted">{hint}</p>}
    </div>
  );
}

function Shell({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <div className="gutter mx-auto max-w-md pb-24 pt-14 text-center">
      <h1 className="display">{title}</h1>
      <p className="mt-4 text-[14px] text-ink/80">{intro}</p>
      {children}
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="border border-accent p-3 text-left text-[13px] text-accent">
      {message}
    </p>
  );
}

/** send signed-in users away from the auth pages */
function useRedirectIfSignedIn(to: string) {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useUser();
  useEffect(() => {
    if (hydrated && user) router.replace(to);
  }, [hydrated, user, router, to]);
}

/* ------------------------------------------------------------------ */

export function LoginForm() {
  const next = safeNext(useSearchParams().get("next"));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useRedirectIfSignedIn(next);

  return (
    <Shell title="Log in" intro="Welcome back. Sign in to see your orders and saved addresses.">
      <form
        className="mt-10 space-y-4 text-left"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          setBusy(true);
          const res = await auth.login(String(data.get("email")), String(data.get("password")));
          setBusy(false);
          setError(res.ok ? "" : res.error);
        }}
      >
        <ErrorBox message={error} />
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" />
        </div>
        <PasswordField label="Password" name="password" autoComplete="current-password" />
        <div className="text-right">
          <Link href="/account/forgot-password" className="text-[12.5px] underline underline-offset-4">
            Forgot your password?
          </Link>
        </div>
        <button type="submit" disabled={busy} className="btn h-12 w-full">
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-8 text-[13.5px]">
        New here?{" "}
        <Link href={`/account/register${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`} className="underline underline-offset-4">
          Create an account
        </Link>
      </p>
      <DemoNote />
    </Shell>
  );
}

export function RegisterForm() {
  const next = safeNext(useSearchParams().get("next"));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useRedirectIfSignedIn(next);

  return (
    <Shell title="Create account" intro="Save your addresses, track orders and check out faster.">
      <form
        className="mt-10 space-y-4 text-left"
        onSubmit={async (e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          const email = String(d.get("email"));
          const password = String(d.get("password"));
          const phone = String(d.get("phone")).replace(/\D/g, "");
          if (!emailOk(email)) return setError("Enter a valid email, like name@example.com.");
          if (phone && phone.length !== 10) return setError("Enter a 10-digit mobile number, or leave it blank.");
          if (password.length < 8) return setError("Use at least 8 characters for your password.");
          if (password !== String(d.get("confirm"))) return setError("The two passwords don't match.");
          setBusy(true);
          const res = await auth.register({
            firstName: String(d.get("firstName")),
            lastName: String(d.get("lastName")),
            email,
            phone,
            password,
            marketing: d.get("marketing") === "on",
          });
          setBusy(false);
          setError(res.ok ? "" : res.error);
        }}
      >
        <ErrorBox message={error} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="field-label">
              First name
            </label>
            <input id="firstName" name="firstName" autoComplete="given-name" required className="field" />
          </div>
          <div>
            <label htmlFor="lastName" className="field-label">
              Last name
            </label>
            <input id="lastName" name="lastName" autoComplete="family-name" required className="field" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            Mobile number (optional)
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <PasswordField label="Password" name="password" autoComplete="new-password" hint="At least 8 characters." />
        <PasswordField label="Confirm password" name="confirm" autoComplete="new-password" />
        <label className="flex cursor-pointer items-start gap-3 text-[13px]">
          <input type="checkbox" name="marketing" className="mt-0.5 h-4 w-4 accent-[#1b1b15]" />
          Email me about new drops and offers.
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-[13px]">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#1b1b15]" />
          <span>
            I agree to the{" "}
            <Link href="/policies/terms" className="underline underline-offset-4">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/policies/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <button type="submit" disabled={busy} className="btn h-12 w-full">
          {busy ? "Creating your account..." : "Create account"}
        </button>
      </form>
      <p className="mt-8 text-[13.5px]">
        Already have an account?{" "}
        <Link href="/account/login" className="underline underline-offset-4">
          Log in
        </Link>
      </p>
      <DemoNote />
    </Shell>
  );
}

export function ForgotForm() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Shell title="Password updated" intro="Your new password is set. You can sign in with it now.">
        <Link href="/account/login" className="btn mt-10">
          Back to log in
        </Link>
      </Shell>
    );
  }

  return (
    <Shell
      title="Reset password"
      intro="A real store emails you a reset link. This demo has no email, so you set the new password right here."
    >
      <form
        className="mt-10 space-y-4 text-left"
        onSubmit={async (e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          const password = String(d.get("password"));
          if (password.length < 8) return setError("Use at least 8 characters for your password.");
          const res = await auth.resetPassword(String(d.get("email")), password);
          if (res.ok) setDone(true);
          else setError(res.error);
        }}
      >
        <ErrorBox message={error} />
        <div>
          <label htmlFor="email" className="field-label">
            Account email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" />
        </div>
        <PasswordField label="New password" name="password" autoComplete="new-password" hint="At least 8 characters." />
        <button type="submit" className="btn h-12 w-full">
          Set new password
        </button>
      </form>
      <p className="mt-8 text-[13.5px]">
        <Link href="/account/login" className="underline underline-offset-4">
          Back to log in
        </Link>
      </p>
      <DemoNote />
    </Shell>
  );
}
