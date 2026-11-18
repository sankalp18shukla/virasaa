# Dummy content map

Everything listed here is a placeholder. Nothing in this project is real brand, product,
legal or contact information. Use this as your replacement checklist.

Tip: search the codebase for `DUMMY` and `Placeholder` to find every spot in code.

## 1. Brand and contact

| What | Dummy value | File |
| --- | --- | --- |
| Brand name / wordmark | `Virasaa` (real) | `src/lib/site.ts` → `site.name` |
| Tagline and meta description | "Heritage, carved by hand." (draft wording) | `src/lib/site.ts` → `site.tagline`, `site.description` |
| Company name | `Your Company Pvt. Ltd.` | `src/lib/site.ts` → `site.company.legalName` |
| Address | `123 Placeholder Road, Sector 00, Your City` | `src/lib/site.ts` → `site.company.addressLines` |
| Phone / email | `+91 00000 00000`, `support@example.com` | `src/lib/site.ts` → `site.company` |
| Support hours | Monday to Saturday, 10 AM to 6 PM IST | `src/lib/site.ts` → `site.company.hours` |
| Social links | `https://example.com/...` | `src/lib/site.ts` → `site.socials` |
| Logo | Real: swan & lotus emblem + wordmark, cut out of the supplied artwork | `public/brand/*.png`, `Logo` in `src/components/Header.tsx`, footer |
| Heading font | Cormorant Garamond, the closest free match to the wordmark (swap in the exact font file if you have it) | `src/app/globals.css` → `--font-display` |
| Favicon | Real: logo emblem on beige | `src/app/icon.png`, `src/app/apple-icon.png` |
| Floating help button | links to the contact page | `src/app/layout.tsx` |

## 2. Images (all of them)

Every picture is a **stock photo of Indian handicrafts** from Wikimedia Commons (Channapatna,
Etikoppaka and Kondapalli toys, Kashmiri papier-mache, Dhokra, Bankura terracotta...). They are
not photos of the catalogue products.

- Files: `public/images/crafts/*.webp`
- Registry, credits, licences and the product → photo mapping: `src/lib/photos.ts`
- Rendered by `src/components/Placeholder.tsx`: `ProductArt` (product cards, gallery, bag,
  checkout, search) and `EditorialArt` (hero mosaic, lifestyle panels, collection rail, press wall,
  store photos, journal covers, info pages, mega menu tiles).
- Attribution page (required by the CC BY / CC BY-SA licences): `/pages/photo-credits`, linked in the footer.

The small **DUMMY IMAGE / DUMMY PHOTO** corner tags are off; turn them back on with
`site.showPlaceholderTags = true` in `src/lib/site.ts`.

To use real product photography, add your files and point `src/lib/photos.ts` (or the two
components) at them. The props already tell you which product, colour and view is wanted.

Other decorative stand-ins:

- Wood-grain pattern on banners: CSS only, `.pattern-grain` in `src/app/globals.css`
- "Dummy badge" circle in the craft section on the homepage: `Craft()` in `src/app/page.tsx`

## 3. Catalogue

| What | File |
| --- | --- |
| 28 invented wooden products + gift card (names, prices, woods, finishes, sizes, taglines) | `src/lib/products.ts` → `products` |
| Product description, feature bullets, spec table, care text (generated from the product type) | `src/lib/products.ts` → `productDescription`, `productFeatures`, `productSpecs`, `productCare` |
| One deliberately sold-out product (`raw-grain-keepsake-box`) to show that state | `src/lib/products.ts` |
| One product with a struck-through compare price (`brass-inlay-coasters`) | `src/lib/products.ts` |
| Five craft collections: Jaali, Lacquer & Lathe, Brass Inlay, Hand-Painted, Raw Grain | `src/lib/site.ts` → `series` |
| Collection titles and descriptions | `src/lib/collections.ts` |
| Departments, product types and rooms in the menus and filters | `src/lib/site.ts` → `departments`, `productTypes`, `rooms` |
| Pay-later widget, trust icons on the product page | `src/components/ProductView.tsx` |
| Brand pillars and icon strip under each product | `src/app/products/[handle]/page.tsx` |

## 4. Homepage copy

All headings and paragraphs in `src/app/page.tsx` are placeholder marketing copy, including
the value strip ("Made by hand", "Solid wood", "Made in India" ...), collection tiles, the craft
story, the "in the spotlight" press block and the store section. Check every claim (for example
"Made in India", "food-safe") is true for your products. The featured product is
hard-coded to `jaali-mandala-wall-panel` at the top of that file.

## 5. Pricing, shipping and promo codes

| What | Dummy value | File |
| --- | --- | --- |
| Currency display | `Rs. 0,000.00` | `src/lib/site.ts` → `site.currency`, `src/lib/format.ts` |
| Promo codes | `DEMO10` (10%), `WELCOME15` (15%) | `src/lib/pricing.ts` → `promoCodes` |
| Delivery options | Standard free (5 to 7 days), Express Rs. 199 (2 to 3 days) | `src/lib/pricing.ts` → `shippingMethods` |
| Cash-on-delivery fee | Rs. 99 | `src/lib/site.ts` → `site.codFee` |
| Payment methods shown | UPI, card, net banking, COD | `src/lib/store.ts` → `paymentLabels` |
| Indian states list at checkout (partial) | 24 entries | `src/components/CheckoutView.tsx` → `STATES` |

## 6. Simulated back-end pieces

| What | What it does now | File |
| --- | --- | --- |
| Payment gateway | "Demo Pay" window with success / failure buttons, collects no payment details | `src/components/CheckoutView.tsx` |
| Order API | Validates and re-prices the bag, returns a made-up order id, saves nothing | `src/app/api/orders/route.ts` |
| Accounts, sessions | Stored in browser `localStorage`, password only SHA-256 hashed in the browser | `src/lib/store.ts` → `auth` |
| Orders and order status | Stored in `localStorage`, status always "Confirmed" | `src/lib/store.ts` → `orders`, `src/components/OrderSummary.tsx` |
| Password reset | Sets the new password on the spot, no email | `src/components/account/AuthForms.tsx` → `ForgotForm` |
| Order tracking | Looks the order up in this browser only | `src/components/TrackOrder.tsx` |
| Newsletter signup | Shows a thank-you, sends nothing | `src/components/Newsletter.tsx` |
| Contact form | Shows a thank-you, sends nothing | `src/components/ContactForm.tsx` |
| Order confirmation email | Not sent (the success page says so) | `src/components/OrderConfirmation.tsx` |

## 7. Policies and legal text

All thirteen policies in `src/lib/content.ts` → `policies` are **generic templates written
for this demo**. They are not legal advice and are not tailored to any business:
terms, privacy, refunds, returns and exchange, cancellations, shipping, warranty, payments,
pricing and discounts, cookies, accessibility, disclaimer, intellectual property.

Numbers used inside them are placeholders too: 14-day returns, 1-year warranty, 48-hour
damage reporting, 5 to 7 working days for refunds and delivery, and `[Your City]` as the
jurisdiction. Each policy page shows a notice saying it is template text; remove that notice
in `src/app/policies/[slug]/page.tsx` once your own policies are in.

## 8. Other pages

| What | File |
| --- | --- |
| About, Sustainability, Careers, Corporate Gifts (all "Placeholder: ..." text) | `src/lib/content.ts` → `infoPages` |
| FAQs (9 questions) | `src/lib/content.ts` → `faqs` |
| Four store locations (`Store One`, `City A` ...) | `src/lib/content.ts` → `stores` |
| Three journal posts | `src/lib/content.ts` → `posts` |
| Contact page details | pulled from `site.company` and `stores` |
