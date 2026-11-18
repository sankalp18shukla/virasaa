/**
 * PAGE CONTENT — ALL DUMMY / TEMPLATE TEXT.
 *
 * The policies below are generic starter templates written for this demo.
 * They are NOT legal advice and are not specific to any business. Have your
 * own policies reviewed before you publish a real store.
 */
import { site } from "./site";

const B = site.name;
const CO = site.company.legalName;
const MAIL = site.company.email;

/* ------------------------------------------------------------------
   Policies
------------------------------------------------------------------- */

export interface Section {
  heading: string;
  body?: string[];
  list?: string[];
}

export interface Policy {
  slug: string;
  title: string;
  intro: string;
  sections: Section[];
}

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms and Conditions",
    intro: `These terms govern your use of the ${B} website and any order you place with ${CO}. By using the site you agree to them.`,
    sections: [
      {
        heading: "1. Using this website",
        body: [
          "You may browse the site and place orders for personal, non-commercial use. You agree not to misuse the site, attempt to gain unauthorised access to it, or use it in a way that breaks any applicable law.",
        ],
      },
      {
        heading: "2. Your account",
        body: [
          "You are responsible for keeping your login details confidential and for all activity under your account. Tell us straight away if you think someone else has used your account.",
        ],
      },
      {
        heading: "3. Products and availability",
        body: [
          "We try to show wood tones, finishes and dimensions as accurately as possible. Because every piece is carved, turned or painted by hand from natural wood, variations in grain, knots, tone and size are normal and are not defects. All products are subject to availability.",
        ],
      },
      {
        heading: "4. Orders and acceptance",
        body: [
          "Your order is an offer to buy. A contract is formed only when we confirm that the order has shipped. We may decline or cancel an order, for example if an item is out of stock, a price was listed in error, or a payment cannot be verified. If we cancel, you receive a full refund.",
        ],
      },
      {
        heading: "5. Prices and payment",
        body: [
          "Prices are shown in Indian Rupees and include applicable taxes unless stated otherwise. Payment is taken at checkout through our payment partners. See the Payments Policy and the Pricing and Discounts policy for details.",
        ],
      },
      {
        heading: "6. Shipping, returns and warranty",
        body: [
          "Delivery, returns, refunds, cancellations and warranty cover are described in their own policies, which form part of these terms.",
        ],
      },
      {
        heading: "7. Liability",
        body: [
          `To the extent the law allows, ${CO} is not liable for indirect or consequential losses, and our total liability for any order is limited to the amount you paid for it. Nothing in these terms limits rights you have under consumer law.`,
        ],
      },
      {
        heading: "8. Governing law",
        body: [
          "These terms are governed by the laws of India. Courts at [Your City] have exclusive jurisdiction over any dispute.",
        ],
      },
      {
        heading: "9. Changes and contact",
        body: [
          `We may update these terms from time to time; the version on this page applies to new orders. Questions? Write to ${MAIL}.`,
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    intro: `This policy explains what personal information ${CO} collects when you use the ${B} website, why we collect it and the choices you have.`,
    sections: [
      {
        heading: "Information we collect",
        list: [
          "Details you give us: name, email, phone number, delivery and billing addresses.",
          "Order details: items bought, amounts paid, delivery status and any returns.",
          "Technical data: device, browser, pages viewed and approximate location, collected through cookies and similar tools.",
          "Messages you send us through forms, email or chat.",
        ],
      },
      {
        heading: "How we use it",
        list: [
          "To process, deliver and support your orders.",
          "To run your account and keep it secure.",
          "To send service messages, and marketing if you have opted in.",
          "To understand how the site is used and improve it.",
          "To meet legal, tax and accounting obligations.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "We share only what is needed with service providers such as payment gateways, courier partners, email and analytics tools, and with authorities where the law requires it. We do not sell your personal information.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Card and bank details are entered directly with our payment partner. We do not see or store full card numbers.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "We keep order records for as long as tax and accounting rules require, and account information until you ask us to delete your account.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          `You can view and update your details in your account, unsubscribe from marketing at any time, and ask for a copy or deletion of your data by writing to ${MAIL}.`,
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refunds Policy",
    intro: "This policy explains when a refund is due and how and when it reaches you.",
    sections: [
      {
        heading: "When a refund is issued",
        list: [
          "An order is cancelled before it ships.",
          "A returned item passes our quality check (see Returns & Exchange).",
          "An item arrives damaged, defective or incorrect and you prefer a refund over a replacement.",
          "We are unable to fulfil all or part of your order.",
        ],
      },
      {
        heading: "How refunds are paid",
        body: [
          "Prepaid orders are refunded to the original payment method. Cash-on-delivery orders are refunded to a bank account or UPI ID that you confirm with our support team, or as store credit if you prefer.",
        ],
      },
      {
        heading: "Timelines",
        body: [
          "We start the refund within 2 working days of approving it. Banks and card networks usually take a further 5 to 7 working days to show the credit.",
        ],
      },
      {
        heading: "What is not refunded",
        list: [
          "Cash-on-delivery handling fees.",
          "Gift cards and store credit.",
          "Items returned used, oiled, altered or without original packaging and tags.",
        ],
      },
      {
        heading: "Need help?",
        body: [`If a refund is late, write to ${MAIL} with your order number and we will trace it.`],
      },
    ],
  },
  {
    slug: "returns-and-exchange",
    title: "Returns & Exchange Policy",
    intro: "Not quite right? Unused items can be returned or exchanged within 14 days of delivery.",
    sections: [
      {
        heading: "Conditions for a return or exchange",
        list: [
          "The request is raised within 14 days of delivery.",
          "The item is unused, with its security tag intact.",
          "The original packaging, tags and any accessories (inserts, holders, hooks) are included.",
        ],
      },
      {
        heading: "Items that cannot be returned",
        list: [
          "Gift cards.",
          "Personalised, engraved or made-to-order pieces.",
          "Kitchen and dining pieces that have been used with food.",
          "Items marked final sale at the time of purchase.",
        ],
      },
      {
        heading: "How it works",
        list: [
          `Email ${MAIL} with your order number and reason, or start from your account's order page.`,
          "We arrange a pickup from your address where our courier partners serve it.",
          "The item is inspected within 3 working days of reaching us.",
          "Once approved, we ship your exchange or start your refund.",
        ],
      },
      {
        heading: "Exchanges",
        body: [
          "You can exchange for a different finish or a different product. If the new item costs more you pay the difference; if it costs less we refund the difference.",
        ],
      },
      {
        heading: "Damaged or incorrect items",
        body: [
          "Wood is packed carefully, but if something arrives cracked, broken or is not what you ordered, tell us within 48 hours of delivery with photos and an unboxing video if you have one, and we will replace or refund it at no cost to you.",
        ],
      },
    ],
  },
  {
    slug: "cancellations",
    title: "Cancellations Policy",
    intro: "Changed your mind? Here is when and how an order can be cancelled.",
    sections: [
      {
        heading: "Cancelling before dispatch",
        body: [
          "You can cancel free of charge any time before your order is packed and handed to the courier. Contact support with your order number and we will confirm the cancellation and refund.",
        ],
      },
      {
        heading: "After dispatch",
        body: [
          "Once an order has shipped it can no longer be cancelled. You can refuse delivery or raise a return after it arrives, and the Returns & Exchange policy applies.",
        ],
      },
      {
        heading: "Changing an order",
        body: [
          "Need a different finish or address? Tell us before dispatch and we will update the order where possible.",
        ],
      },
      {
        heading: "Cancellations by us",
        body: [
          "We may cancel an order if an item is unavailable, a price was listed in error or the delivery address cannot be served. You are refunded in full.",
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping Policy",
    intro: "Where we deliver, how long it takes and what it costs.",
    sections: [
      {
        heading: "Processing time",
        body: ["Orders are packed within 1 to 2 working days. Orders placed on Sundays and public holidays are packed the next working day."],
      },
      {
        heading: "Delivery time",
        list: [
          "Metro cities: 3 to 5 working days after dispatch.",
          "Rest of India: 5 to 7 working days after dispatch.",
          "Remote pin codes may take a little longer.",
        ],
      },
      {
        heading: "Shipping charges",
        body: ["Standard delivery within India is free on all prepaid orders. A handling fee applies to cash-on-delivery orders and is shown at checkout."],
      },
      {
        heading: "Tracking",
        body: ["You receive a tracking link by email and SMS when your order ships. You can also check status any time on the Track Your Order page."],
      },
      {
        heading: "International orders",
        body: ["We currently ship within India only. Placeholder: add your international shipping terms, duties and timelines here if you offer them."],
      },
      {
        heading: "Delays",
        body: ["Weather, strikes and courier disruptions can occasionally cause delays outside our control. If your order is running late, contact us and we will chase it."],
      },
    ],
  },
  {
    slug: "warranty",
    title: "Warranty Policy",
    intro: "Every piece is covered for one year from the delivery date against manufacturing defects.",
    sections: [
      {
        heading: "What is covered",
        list: [
          "Joints or glued sections that come apart under normal use.",
          "Faulty hinges, clasps, hooks and lamp fittings.",
          "Cracks or splits caused by a manufacturing fault.",
        ],
      },
      {
        heading: "What is not covered",
        list: [
          "Natural variation in grain and knots, and the darkening or mellowing of wood over time.",
          "Normal wear and tear, scuffs, scratches and knife marks on boards.",
          "Damage from soaking, dishwashers, direct heat, sunlight, chemicals or accidents.",
          "Repairs or alterations made by anyone other than us.",
          "Products bought from unauthorised sellers.",
        ],
      },
      {
        heading: "How to claim",
        list: [
          `Email ${MAIL} with your order number, a description of the issue and clear photos.`,
          "We review the claim within 3 working days.",
          "If approved, we repair the item, or replace it if a repair is not possible.",
        ],
      },
      {
        heading: "Shipping for warranty claims",
        body: ["We cover shipping both ways for approved claims. If a claim is not covered, we can quote a paid repair before doing any work."],
      },
    ],
  },
  {
    slug: "payments",
    title: "Payments Policy",
    intro: "The payment methods we accept and how your payment is handled.",
    sections: [
      {
        heading: "Accepted methods",
        list: ["UPI", "Credit and debit cards", "Net banking", "Cash on delivery on eligible pin codes"],
      },
      {
        heading: "Security",
        body: ["Payments are processed by our payment partner over an encrypted connection. We never see or store your full card number, CVV or UPI PIN."],
      },
      {
        heading: "Failed or duplicate payments",
        body: ["If money leaves your account but the order is not confirmed, the amount is usually reversed automatically within 5 to 7 working days. If it is not, send us the transaction reference and we will follow up with the payment partner."],
      },
      {
        heading: "Cash on delivery",
        body: ["A small handling fee applies to cash-on-delivery orders. Please keep the exact amount ready; couriers may not carry change."],
      },
      {
        heading: "Invoices",
        body: ["A tax invoice is emailed with every order and is also available in your account."],
      },
    ],
  },
  {
    slug: "pricing",
    title: "Pricing and Discounts",
    intro: "How our prices, offers and promo codes work.",
    sections: [
      {
        heading: "Prices",
        body: ["All prices are in Indian Rupees and include applicable taxes. The price charged is the price shown at checkout when you place the order."],
      },
      {
        heading: "Promo codes",
        list: [
          "One promo code can be used per order.",
          "Codes cannot be combined with other offers unless stated.",
          "Codes have no cash value and cannot be applied after an order is placed.",
        ],
      },
      {
        heading: "Sale pricing",
        body: ["Sale prices are valid for the stated period or while stocks last. We do not offer price adjustments on orders placed before a sale begins."],
      },
      {
        heading: "Pricing errors",
        body: ["Mistakes happen. If an item is listed at an incorrect price, we may cancel the order and refund you in full, and you are welcome to re-order at the correct price."],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookies and Consent",
    intro: "Cookies are small files stored on your device. Here is how this site uses them.",
    sections: [
      {
        heading: "Types of cookies we use",
        list: [
          "Essential: keep your bag, login and checkout working. These cannot be switched off.",
          "Preferences: remember choices such as filters and recently viewed items.",
          "Analytics: help us understand which pages are used so we can improve the site.",
          "Marketing: measure and personalise advertising, only with your consent.",
        ],
      },
      {
        heading: "Managing cookies",
        body: ["You can change your choice at any time from the cookie settings link, and you can block or delete cookies in your browser settings. Blocking essential cookies will stop parts of the site from working."],
      },
      {
        heading: "Note for this demo",
        body: ["This demo site stores your bag, demo account and demo orders in your browser's local storage only. Nothing is sent to a server."],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    intro: `${B} should be usable by everyone. This statement describes what we do and how to tell us when we fall short.`,
    sections: [
      {
        heading: "What we aim for",
        body: ["We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA: readable contrast, full keyboard access, clear focus states, text alternatives for images and support for reduced motion."],
      },
      {
        heading: "Known limitations",
        body: ["Placeholder: list any parts of your site that are not yet fully accessible and when you plan to fix them."],
      },
      {
        heading: "Feedback",
        body: [`If you have trouble using any part of the site, write to ${MAIL}. We aim to reply within 2 working days.`],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    intro: "A few things to keep in mind when using this website.",
    sections: [
      {
        heading: "Product representation",
        body: ["Wood tones can look different from screen to screen, and every handmade piece varies in grain, colour and size. Dimensions are approximate."],
      },
      {
        heading: "Information on this site",
        body: ["We work to keep content accurate and current but do not guarantee it is free of errors. Content may change without notice."],
      },
      {
        heading: "External links",
        body: ["Links to other websites are provided for convenience. We are not responsible for their content or practices."],
      },
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property Policy",
    intro: `The designs, artwork and content on this site belong to ${CO} or its licensors.`,
    sections: [
      {
        heading: "Ownership",
        body: ["All carving patterns, product designs, photographs, text, logos and graphics on this site are protected by intellectual property laws."],
      },
      {
        heading: "What you may do",
        body: ["You may view and share pages for personal, non-commercial purposes with credit and a link back to the original page."],
      },
      {
        heading: "What you may not do",
        list: [
          "Copy, reproduce or sell our designs or artwork.",
          "Use our name or logo in a way that suggests endorsement.",
          "Scrape or bulk-download site content.",
        ],
      },
      {
        heading: "Reporting infringement",
        body: [`If you believe something on this site infringes your rights, or you have found copies of our work elsewhere, write to ${MAIL}.`],
      },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);

/* ------------------------------------------------------------------
   Simple info pages (about, sustainability, careers, corporate gifts)
------------------------------------------------------------------- */

export interface InfoPage {
  slug: string;
  title: string;
  eyebrow: string;
  lead: string;
  blocks: { heading: string; body: string }[];
  cta?: { label: string; href: string };
}

export const infoPages: InfoPage[] = [
  {
    slug: "about",
    title: `About ${B}`,
    eyebrow: "Our story",
    lead: "Placeholder brand story: who started Virasaa, why, and what heritage craft means to you.",
    blocks: [
      { heading: "Where it began", body: "Placeholder: the founding moment. A visit to a workshop, a family craft, a first piece. Two or three honest sentences work better than a long history." },
      { heading: "How we make things", body: "Placeholder: introduce the artisans and clusters you work with, and the steps a piece goes through from raw timber to the final coat of wax." },
      { heading: "What we stand for", body: "Placeholder: the two or three values you actually make decisions by, written plainly." },
    ],
    cta: { label: "Shop all products", href: "/collections/all" },
  },
  {
    slug: "sustainability",
    title: "Materials & Sustainability",
    eyebrow: "What it's made of",
    lead: "Placeholder: a clear, specific account of the woods you use, where they come from and what you are doing to reduce impact.",
    blocks: [
      { heading: "Materials", body: "Placeholder: name each wood (sheesham, mango, acacia, neem...), the finishes, oils and lacquers, and the packaging, and where each comes from." },
      { heading: "Made in small batches", body: "Placeholder: explain how small batches reduce waste and what happens to offcuts and sawdust." },
      { heading: "Built to last", body: "Placeholder: re-oiling, repairs, warranty and care advice that keep a piece in use for generations." },
    ],
    cta: { label: "Read the warranty policy", href: "/policies/warranty" },
  },
  {
    slug: "careers",
    title: "Careers",
    eyebrow: "Work with us",
    lead: "Placeholder: what it is like to work here and the kind of people you are looking for.",
    blocks: [
      { heading: "Open roles", body: "Placeholder: list current openings, or say there are none right now and invite speculative applications." },
      { heading: "How to apply", body: `Placeholder: send a short note and your portfolio or CV to ${MAIL}.` },
    ],
    cta: { label: "Contact us", href: "/pages/contact" },
  },
  {
    slug: "corporate-gifts",
    title: "Corporate Gifts",
    eyebrow: "For teams and clients",
    lead: "Placeholder: bulk orders, festive hampers, custom packaging and engraved pieces for teams, events and clients.",
    blocks: [
      { heading: "What we offer", body: "Placeholder: minimum quantities, customisation options and price tiers." },
      { heading: "Lead times", body: "Placeholder: typical timelines for stock items and for custom runs." },
      { heading: "Get a quote", body: `Placeholder: tell us quantity, budget and date at ${MAIL} and we will reply within 2 working days.` },
    ],
    cta: { label: "Request a quote", href: "/pages/contact" },
  },
];

export const getInfoPage = (slug: string) => infoPages.find((p) => p.slug === slug);

/* ------------------------------------------------------------------
   FAQs, stores, journal
------------------------------------------------------------------- */

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Orders & delivery",
    items: [
      { q: "How long does delivery take?", a: "Orders are packed in 1 to 2 working days and usually arrive 3 to 7 working days after dispatch, depending on your pin code." },
      { q: "How do I track my order?", a: "Use the tracking link in your dispatch email, or enter your order number on the Track Your Order page." },
      { q: "Do you offer cash on delivery?", a: "Yes, on eligible pin codes, with a small handling fee shown at checkout." },
    ],
  },
  {
    group: "Returns & warranty",
    items: [
      { q: "Can I return or exchange a piece?", a: "Yes. Unused items with tags intact can be returned or exchanged within 14 days of delivery." },
      { q: "What if my order arrives damaged?", a: "Tell us within 48 hours with photos and we will replace or refund it at no cost to you." },
      { q: "What does the warranty cover?", a: "Manufacturing defects such as failed joints, hinges or fittings for one year from delivery." },
      { q: "When will I get my refund?", a: "We start refunds within 2 working days of approval; banks usually take 5 to 7 working days after that." },
    ],
  },
  {
    group: "Product & care",
    items: [
      { q: "What woods do you use?", a: "Mostly solid sheesham, mango, acacia and neem. Each product page lists the exact wood and finish. (Placeholder answer.)" },
      { q: "Why does my piece look slightly different from the photo?", a: "Every piece is made by hand from natural wood, so grain, knots and tone vary. That is what makes each one unique." },
      { q: "Are the kitchen pieces food safe?", a: "Yes. Boards, bowls, trays and spoons are finished with food-safe oil. Hand wash only and never soak them. (Placeholder answer.)" },
      { q: "How do I look after wooden decor?", a: "Dust with a soft dry cloth, keep it away from direct sunlight and moisture, and wax it once or twice a year." },
    ],
  },
];

/** DUMMY store locations */
export const stores = [
  { name: "Store One", city: "City A", address: "12 Sample Street, City A 000001", hours: "11 AM to 9 PM, all days" },
  { name: "Store Two", city: "City B", address: "34 Demo Avenue, City B 000002", hours: "11 AM to 9 PM, all days" },
  { name: "Store Three", city: "City C", address: "56 Placeholder Lane, City C 000003", hours: "11 AM to 8 PM, closed Mondays" },
  { name: "Store Four", city: "City D", address: "78 Example Road, City D 000004", hours: "11 AM to 8 PM, closed Mondays" },
];

/** DUMMY journal posts */
export const posts = [
  {
    slug: "from-timber-to-jaali",
    title: "From a block of sheesham to a jaali panel",
    date: "2026-01-12",
    excerpt: "Seasoning, marking, cutting and finishing a lattice panel, in six steps.",
    body: [
      "Placeholder article. Open with the single most interesting thing about the process, then walk through it step by step: choosing the timber, seasoning, marking the pattern, cutting, sanding and waxing.",
      "Every paragraph here is dummy text. Replace it with your own writing, or connect this page to a CMS so your team can publish without touching code.",
      "End with a pointer to the pieces that came out of the process you just described.",
    ],
  },
  {
    slug: "styling-a-wooden-wall",
    title: "Five ways to style a wall with wood",
    date: "2026-02-03",
    excerpt: "One big panel, a cluster of plates, a mirror and a shelf, and more.",
    body: [
      "Placeholder article. Styling guides work best with one photo per idea and a sentence or two each.",
      "Every paragraph here is dummy text. Replace it with your own writing.",
    ],
  },
  {
    slug: "caring-for-wooden-kitchenware",
    title: "Caring for wooden kitchenware",
    date: "2026-03-20",
    excerpt: "Hand wash, dry quickly, oil monthly, and three things to avoid.",
    body: [
      "Placeholder article. Care guides reduce returns and build trust; keep them short and practical.",
      "Every paragraph here is dummy text. Replace it with your own writing.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
