/**
 * SITE CONFIG — brand, taxonomy and navigation for Virasaa.
 * Values marked DUMMY are still placeholders. See DUMMY_CONTENT.md for the full list.
 */

export const site = {
  /** Brand name + wordmark text */
  name: "Virasaa",
  /** One-line brand promise used in the hero and <title> (placeholder wording, edit freely) */
  tagline: "Heritage, carved by hand.",
  description:
    "Virasaa makes handcrafted wooden home decor, kitchenware and accessories, carved and finished by artisans in small batches.",
  /** Show a small "DUMMY" tag on every placeholder image. Set to false to hide. */
  showPlaceholderTags: true,

  currency: { code: "INR", prefix: "Rs. " },
  freeShippingThreshold: 0, // 0 = always free (demo)
  codFee: 99,

  /** DUMMY: company + contact details */
  company: {
    legalName: "Your Company Pvt. Ltd.",
    addressLines: ["123 Placeholder Road", "Sector 00, Your City", "Your State - 000000"],
    phone: "+91 00000 00000",
    email: "support@example.com",
    hours: "Monday to Saturday, 10 AM to 6 PM IST",
  },

  /** DUMMY: social links */
  socials: [
    { label: "Instagram", href: "https://example.com/instagram" },
    { label: "Pinterest", href: "https://example.com/pinterest" },
    { label: "Facebook", href: "https://example.com/facebook" },
    { label: "YouTube", href: "https://example.com/youtube" },
  ],
};

/* ------------------------------------------------------------------
   CATALOGUE TAXONOMY
   Departments -> product types. Rooms and craft collections cut across them.
------------------------------------------------------------------- */

export type Department = "home-decor" | "kitchen-dining" | "accessories";

export type ProductType =
  | "wall-decor"
  | "sculpture"
  | "candle-holder"
  | "vase"
  | "mirror"
  | "lamp"
  | "tray"
  | "bowl"
  | "coaster"
  | "board"
  | "cutlery"
  | "jewellery-box"
  | "storage-box"
  | "desk"
  | "comb"
  | "jewellery"
  | "gift-card";

export const departments: { label: string; handle: Department }[] = [
  { label: "Home Decor", handle: "home-decor" },
  { label: "Kitchen & Dining", handle: "kitchen-dining" },
  { label: "Accessories", handle: "accessories" },
];

/** Every product type, the collection page it gets, and its department. */
export const productTypes: { label: string; handle: string; type: Exclude<ProductType, "gift-card">; department: Department }[] = [
  { label: "Wall Decor", handle: "wall-decor", type: "wall-decor", department: "home-decor" },
  { label: "Sculptures & Figurines", handle: "sculptures", type: "sculpture", department: "home-decor" },
  { label: "Candle Holders", handle: "candle-holders", type: "candle-holder", department: "home-decor" },
  { label: "Vases", handle: "vases", type: "vase", department: "home-decor" },
  { label: "Mirrors", handle: "mirrors", type: "mirror", department: "home-decor" },
  { label: "Lamps", handle: "lamps", type: "lamp", department: "home-decor" },
  { label: "Serving Trays", handle: "serving-trays", type: "tray", department: "kitchen-dining" },
  { label: "Bowls", handle: "bowls", type: "bowl", department: "kitchen-dining" },
  { label: "Coasters", handle: "coasters", type: "coaster", department: "kitchen-dining" },
  { label: "Chopping & Serving Boards", handle: "boards", type: "board", department: "kitchen-dining" },
  { label: "Spoons & Ladles", handle: "spoons", type: "cutlery", department: "kitchen-dining" },
  { label: "Jewellery Boxes", handle: "jewellery-boxes", type: "jewellery-box", department: "accessories" },
  { label: "Storage Boxes", handle: "storage-boxes", type: "storage-box", department: "accessories" },
  { label: "Desk Accessories", handle: "desk-accessories", type: "desk", department: "accessories" },
  { label: "Wooden Combs", handle: "combs", type: "comb", department: "accessories" },
  { label: "Wooden Jewellery", handle: "wooden-jewellery", type: "jewellery", department: "accessories" },
];

export const departmentOf = (t: ProductType): Department | null =>
  productTypes.find((x) => x.type === t)?.department ?? null;

export type Room = "living" | "bedroom" | "dining" | "study" | "pooja";

export const rooms: { label: string; handle: Room }[] = [
  { label: "Living Room", handle: "living" },
  { label: "Bedroom", handle: "bedroom" },
  { label: "Kitchen & Dining", handle: "dining" },
  { label: "Study & Office", handle: "study" },
  { label: "Pooja Room", handle: "pooja" },
];

/** DUMMY: craft collections (rename to your real lines) */
export const series = [
  { label: "Jaali", handle: "jaali", blurb: "Lattice carving that turns light into pattern." },
  { label: "Lacquer & Lathe", handle: "lacquer", blurb: "Turned on the lathe, polished in bright lac." },
  { label: "Brass Inlay", handle: "brass-inlay", blurb: "Fine brass wire set into dark wood by hand." },
  { label: "Hand-Painted", handle: "hand-painted", blurb: "Brushwork in fine lines, one piece at a time." },
  { label: "Raw Grain", handle: "raw-grain", blurb: "Plain, oiled wood for everyday use." },
];

export type NavColumn = { title: string; links: { label: string; href: string }[] };
export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  heading?: string;
  columns?: NavColumn[];
  /** seeds for the placeholder tiles in the mega menu */
  tiles?: string[];
};

const typesIn = (d: Department) =>
  productTypes.filter((t) => t.department === d).map((t) => ({ label: t.label, href: `/collections/${t.handle}` }));

const byCollection: NavColumn = {
  title: "By collection",
  links: series.map((s) => ({ label: s.label, href: `/collections/${s.handle}` })),
};

export const mainNav: NavItem[] = [
  {
    label: "New In",
    href: "/collections/new-in",
    highlight: true,
    heading: "Fresh off the workbench.",
    columns: [
      {
        title: "Start here",
        links: [
          { label: "New Arrivals", href: "/collections/new-in" },
          { label: "Best Sellers", href: "/collections/best-sellers" },
          { label: "All Products", href: "/collections/all" },
        ],
      },
      byCollection,
    ],
    tiles: ["nav-new-1", "nav-new-2"],
  },
  {
    label: "Home Decor",
    href: "/collections/home-decor",
    heading: "Warmth for every wall and shelf.",
    columns: [
      { title: "Shop by type", links: typesIn("home-decor") },
      {
        title: "Shop by room",
        links: rooms.map((r) => ({ label: r.label, href: `/collections/home-decor?room=${r.handle}` })),
      },
    ],
    tiles: ["nav-decor-1", "nav-decor-2"],
  },
  {
    label: "Kitchen & Dining",
    href: "/collections/kitchen-dining",
    heading: "Wood that belongs at the table.",
    columns: [
      { title: "Shop by type", links: typesIn("kitchen-dining") },
      {
        title: "Quick picks",
        links: [
          { label: "Best Sellers", href: "/collections/best-sellers" },
          { label: "Raw Grain Collection", href: "/collections/raw-grain" },
          { label: "Gifts under Rs. 999", href: "/collections/under-999" },
        ],
      },
    ],
    tiles: ["nav-kitchen-1", "nav-kitchen-2"],
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    heading: "Small pieces, carried every day.",
    columns: [{ title: "Shop by type", links: typesIn("accessories") }, byCollection],
    tiles: ["nav-acc-1", "nav-acc-2"],
  },
  {
    label: "Gifts",
    href: "/collections/gifts",
    heading: "Gifts that last for years.",
    columns: [
      {
        title: "By occasion",
        links: [
          { label: "Housewarming", href: "/collections/home-decor" },
          { label: "Festive & Pooja", href: "/collections/pooja" },
          { label: "Corporate", href: "/pages/corporate-gifts" },
        ],
      },
      {
        title: "By budget",
        links: [
          { label: "Under Rs. 999", href: "/collections/under-999" },
          { label: "Under Rs. 2,499", href: "/collections/gifts" },
          { label: "Gift Cards", href: "/products/e-gift-card" },
        ],
      },
    ],
    tiles: ["nav-gift-1", "nav-gift-2"],
  },
  {
    label: "Our Craft",
    href: "/pages/about",
    heading: "Beyond the workshop.",
    columns: [
      {
        title: "The brand",
        links: [
          { label: "About Us", href: "/pages/about" },
          { label: "Wood & Sustainability", href: "/pages/sustainability" },
          { label: "Our Stores", href: "/pages/stores" },
          { label: "Journal", href: "/journal" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "FAQs", href: "/pages/faqs" },
          { label: "Track Your Order", href: "/pages/track-order" },
          { label: "Contact Us", href: "/pages/contact" },
        ],
      },
    ],
    tiles: ["nav-exp-1", "nav-exp-2"],
  },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "/pages/contact" },
      { label: "Track Your Order", href: "/pages/track-order" },
      { label: "Returns & Exchange", href: "/policies/returns-and-exchange" },
      { label: "Warranty Policy", href: "/policies/warranty" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "FAQs", href: "/pages/faqs" },
    ],
  },
  {
    title: `About ${site.name}`,
    links: [
      { label: "About Us", href: "/pages/about" },
      { label: "Wood & Sustainability", href: "/pages/sustainability" },
      { label: "Store Locator", href: "/pages/stores" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/pages/careers" },
      { label: "Corporate Gifts", href: "/pages/corporate-gifts" },
    ],
  },
  {
    title: "Shop & Account",
    links: [
      { label: "Home", href: "/" },
      { label: "My Account", href: "/account" },
      { label: "View Bag", href: "/cart" },
      { label: "Gift Cards", href: "/products/e-gift-card" },
    ],
  },
  {
    title: "Policies & Payments",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms and Conditions", href: "/policies/terms" },
      { label: "Refunds Policy", href: "/policies/refunds" },
      { label: "Cancellations Policy", href: "/policies/cancellations" },
      { label: "Payments Policy", href: "/policies/payments" },
      { label: "Pricing and Discounts", href: "/policies/pricing" },
      { label: "Cookies and Consent", href: "/policies/cookies" },
    ],
  },
];

export const footerLegal = [
  { label: "Accessibility", href: "/policies/accessibility" },
  { label: "Disclaimer", href: "/policies/disclaimer" },
  { label: "Intellectual Property", href: "/policies/intellectual-property" },
  { label: "Sitemap", href: "/sitemap" },
];
