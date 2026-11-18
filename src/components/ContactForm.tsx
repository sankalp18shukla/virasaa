"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const topics = [
  { value: "order", label: "An existing order" },
  { value: "returns", label: "Returns or exchange" },
  { value: "warranty", label: "Warranty" },
  { value: "product", label: "Product question" },
  { value: "gifting", label: "Corporate & event gifting" },
  { value: "other", label: "Something else" },
];

const occasions = ["Corporate / client gifts", "Employee gifts", "Wedding", "Festive hampers", "Event or conference", "Other"];

/** DEMO: nothing is sent. Post this to your helpdesk / email service. */
export function ContactForm() {
  const params = useSearchParams();
  const fromUrl = params.get("topic");
  const [topic, setTopic] = useState(topics.some((t) => t.value === fromUrl) ? fromUrl! : "order");
  const [sent, setSent] = useState(false);
  const gifting = topic === "gifting";

  if (sent) {
    return (
      <div role="status" className="border border-ink/15 bg-paper p-8 text-center">
        <p className="text-[17px] uppercase tracking-[0.04em]">{gifting ? "Enquiry received" : "Message received"}</p>
        <p className="mt-2 text-[14px] text-ink/80">
          {gifting ? "Thanks! Our gifting team will get back to you with ideas and a quote. " : "Thanks for writing. "}
          (Demo: this form isn&rsquo;t connected, so nothing was actually sent.)
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
        <select id="c-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="field">
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {gifting ? (
        <>
          <div>
            <label htmlFor="c-company" className="field-label">
              Company or organisation (optional)
            </label>
            <input id="c-company" name="company" autoComplete="organization" className="field" />
          </div>
          <div>
            <label htmlFor="c-phone" className="field-label">
              Phone
            </label>
            <input id="c-phone" name="phone" type="tel" required autoComplete="tel" className="field" />
          </div>
          <div>
            <label htmlFor="c-occasion" className="field-label">
              Occasion
            </label>
            <select id="c-occasion" name="occasion" className="field">
              {occasions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="c-quantity" className="field-label">
              Number of gifts
            </label>
            <input id="c-quantity" name="quantity" type="number" min={1} required inputMode="numeric" className="field" />
          </div>
          <div>
            <label htmlFor="c-budget" className="field-label">
              Budget per gift (Rs., optional)
            </label>
            <input id="c-budget" name="budget" type="number" min={0} inputMode="numeric" className="field" />
          </div>
          <div>
            <label htmlFor="c-date" className="field-label">
              Needed by (optional)
            </label>
            <input id="c-date" name="date" type="date" className="field" />
          </div>
        </>
      ) : (
        <div className="sm:col-span-2">
          <label htmlFor="c-order" className="field-label">
            Order number (optional)
          </label>
          <input id="c-order" name="order" className="field" />
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="field-label">
          {gifting ? "Tell us more (engraving, packaging, delivery cities…)" : "Message"}
        </label>
        <textarea id="c-message" name="message" required={!gifting} rows={6} className="field h-auto py-3" />
      </div>
      <button type="submit" className="btn h-12 sm:col-span-2">
        {gifting ? "Send gifting enquiry" : "Send message"}
      </button>
    </form>
  );
}
