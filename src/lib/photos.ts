/**
 * STOCK PHOTOS — placeholder photography of Indian handicrafts from Wikimedia Commons.
 * Files live in public/images/crafts/. Each is used under the licence listed here;
 * CC BY / CC BY-SA photos need this attribution kept (see /pages/photo-credits).
 * Replace with your own product photography when ready.
 */

export interface Photo {
  slug: string;
  src: string;
  alt: string;
  credit: string;
  license: string;
  source: string;
}

export const photos: Photo[] = [
  {
    slug: "channapatna-painting",
    src: "/images/crafts/channapatna-painting.webp",
    alt: "Artisan hand-painting Channapatna wooden dolls",
    credit: "MaximusPrasad",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Channapatna_toys107.jpg",
  },
  {
    slug: "channapatna-artisan",
    src: "/images/crafts/channapatna-artisan.webp",
    alt: "Artisan painting the face of a Channapatna wooden toy",
    credit: "MaximusPrasad",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Channapatna_toys13.jpg",
  },
  {
    slug: "channapatna-workbench",
    src: "/images/crafts/channapatna-workbench.webp",
    alt: "Channapatna toy being painted on a paint-splashed workbench",
    credit: "MaximusPrasad",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Channapatna_toys26.jpg",
  },
  {
    slug: "channapatna-toys",
    src: "/images/crafts/channapatna-toys.webp",
    alt: "Lacquered Channapatna wooden toys and fruit magnets",
    credit: "KartikMistry",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Finished_Channapatna_toys.jpg",
  },
  {
    slug: "channapatna-flute",
    src: "/images/crafts/channapatna-flute.webp",
    alt: "Red lacquered wooden toy flute from Channapatna",
    credit: "Subhashish Panigrahi",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Toy_flute_from_Channapatna,_Karnataka,_India.jpg",
  },
  {
    slug: "kondapalli-toys",
    src: "/images/crafts/kondapalli-toys.webp",
    alt: "Hand-painted Kondapalli wooden figurines of a royal procession",
    credit: "Balamurugan Natarajan from chennai, India",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Kondapalli_Toys_(3404488827).jpg",
  },
  {
    slug: "etikoppaka-toys",
    src: "/images/crafts/etikoppaka-toys.webp",
    alt: "Lathe-turned Etikoppaka lacquer toys",
    credit: "Adityamadhav83",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Etikoppaka_Toys_at_an_Exhibition_in_Visakhapatnam.JPG",
  },
  {
    slug: "emporium-shelves",
    src: "/images/crafts/emporium-shelves.webp",
    alt: "Shelves of carved wooden elephants and handicrafts",
    credit: "Gpkp",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Rajasthan_Emporium_and_Handicrafts,_MG_Road,_Bangalore_(2024)_08.jpg",
  },
  {
    slug: "dhokra-relief",
    src: "/images/crafts/dhokra-relief.webp",
    alt: "Dhokra metal-craft relief panel",
    credit: "TAPAS KUMAR HALDER",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Dhokra_Art_is_now_Eco-friendly_tribal_art.jpg",
  },
  {
    slug: "terracotta-horses",
    src: "/images/crafts/terracotta-horses.webp",
    alt: "Bankura terracotta horses",
    credit: "Rajes jana",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Terracotta_horse_,_bankura_panchmura.jpg",
  },
  {
    slug: "papier-mache-boxes",
    src: "/images/crafts/papier-mache-boxes.webp",
    alt: "Hand-painted Kashmiri papier-mache trinket boxes",
    credit: "Catlemur",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Kashmir_papier-m%C3%A2ch%C3%A9_trinket_boxes.jpg",
  },
  {
    slug: "papier-mache-vases",
    src: "/images/crafts/papier-mache-vases.webp",
    alt: "Painted Kashmiri papier-mache vases and boxes",
    credit: "flowcomm",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Papier_mache_goods,_Kashmir_(8141417742).jpg",
  },
];

/** Which photo leads each product's gallery (by product handle). */
const productLead: Record<string, string> = {
  "jaali-mandala-wall-panel": "dhokra-relief",
  "jaali-carved-elephant": "emporium-shelves",
  "jaali-pillar-candle-holder": "kondapalli-toys",
  "jaali-oval-mirror": "papier-mache-vases",
  "jaali-jewellery-box": "papier-mache-boxes",
  "jaali-serving-tray": "terracotta-horses",
  "lacquer-bangle-set": "channapatna-toys",
  "lacquer-bud-vase": "channapatna-flute",
  "lacquer-nesting-bowls": "etikoppaka-toys",
  "lacquer-candle-stand": "channapatna-painting",
  "lacquer-pen-stand": "channapatna-workbench",
  "brass-inlay-jewellery-chest": "papier-mache-boxes",
  "brass-inlay-coasters": "dhokra-relief",
  "brass-inlay-wall-plate": "emporium-shelves",
  "brass-inlay-tea-box": "papier-mache-vases",
  "hand-painted-elephant-pair": "kondapalli-toys",
  "hand-painted-floral-tray": "papier-mache-boxes",
  "hand-painted-table-lamp": "channapatna-artisan",
  "hand-painted-neem-comb": "channapatna-painting",
  "raw-grain-chopping-board": "terracotta-horses",
  "raw-grain-serving-paddle": "channapatna-workbench",
  "raw-grain-salad-bowl": "etikoppaka-toys",
  "hand-carved-spoon-set": "channapatna-artisan",
  "raw-grain-coasters": "channapatna-toys",
  "raw-grain-turned-vase": "papier-mache-vases",
  "raw-grain-desk-organiser": "emporium-shelves",
  "raw-grain-keepsake-box": "papier-mache-boxes",
  "raw-grain-pocket-comb": "channapatna-flute",
  "e-gift-card": "emporium-shelves",
};

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** a prime step that doesn't divide the photo count, so gallery views never repeat early */
const stride = [7, 5, 3].find((s) => photos.length % s !== 0) ?? 1;

const indexOf = (slug: string | undefined) => photos.findIndex((p) => p.slug === slug);

/** Photo for a product handle; `view` > 0 steps through other photos for the gallery. */
export function productPhoto(handle: string, view = 0): Photo {
  const lead = indexOf(productLead[handle]);
  const start = lead >= 0 ? lead : hash(handle) % photos.length;
  return photos[(start + view * stride) % photos.length];
}

/** Photo for an editorial / lifestyle tile: a fixed `index`, or one chosen from `seed`. */
export function photoFor(seed: string, index?: number): Photo {
  const i = index ?? hash(seed);
  return photos[i % photos.length];
}
