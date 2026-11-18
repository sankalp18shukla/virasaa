"use client";

import { useState } from "react";

/** DEMO: nothing is sent. Post this to your helpdesk / email service. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="border border-ink/15 bg-paper p-8 text-center">
        <p className="text-[17px] uppercase tracking-[0.04em]">Message received</p>
        <p className="mt-2 text-[14px] text-ink/80">
          Thanks for writing. (Demo: this form isn&rsquo;t connected, so nothing was actually sent.)
        </p>
        <button onClick={() => setSent(false)} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="c-name" className="field-label">
          Name
        </label>
        <input id="c-name" name="name" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="c-email" className="field-label">
          Email
        </label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-topic" className="field-label">
          What is this about?
        </label>
        <select id="c-topic" name="topic" className="field">
          <option>An existing order</option>
          <option>Returns or exchange</option>
          <option>Warranty</option>
          <option>Product question</option>
          <option>Corporate gifting</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-order" className="field-label">
          Order number (optional)
        </label>
        <input id="c-order" name="order" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="field-label">
          Message
        </label>
        <textarea id="c-message" name="message" required rows={6} className="field h-auto py-3" />
      </div>
      <button type="submit" className="btn h-12 sm:col-span-2">
        Send message
      </button>
    </form>
  );
}
