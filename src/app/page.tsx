import Link from "next/link";
import { ArrowRight, Hammer, HandHeart, MapPin, Sparkles, TreePine } from "lucide-react";
import { collectionProducts } from "@/lib/collections";
import { getProduct, type Product } from "@/lib/products";
import { stores } from "@/lib/content";
import { site } from "@/lib/site";
import { money } from "@/lib/format";
import { AddToBag } from "@/components/AddToBag";
import { Carousel } from "@/components/Carousel";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { EditorialArt, ProductArt } from "@/components/Placeholder";
import { ProductCard } from "@/components/ProductCard";

/* All copy on this page is DUMMY placeholder text. */

export default function HomePage() {
  const bestSellers = collectionProducts("best-sellers");
  const decor = collectionProducts("home-decor").slice(0, 8);
  const kitchen = collectionProducts("kitchen-dining").slice(0, 8);
  const signature = collectionProducts("jaali");
  const featured = getProduct("jaali-mandala-wall-panel")!;

  return (
    <>
      <Hero />
      <Intro />
      <ValueMarquee />
      <FeaturedProduct product={featured} />
      <BestSellers products={bestSellers} />

      <SplitCollection
        eyebrow="For walls, shelves and corners"
        title="Home decor"
        body="Carved wall panels, figurines, candle holders, vases and mirrors that bring the warmth of wood into a room. Placeholder copy: two or three lines about your decor range."
        cta="Shop home decor"
        href="/collections/home-decor"
        products={decor}
        seed="split-decor"
      />
      <hr className="gutter mx-auto border-line" />
      <SplitCollection
        flip
        eyebrow="Made to be used"
        title="Kitchen & dining"
        body="Serving trays, salad bowls, chopping boards and hand-carved spoons, finished with food-safe oil. Placeholder copy: two or three lines about your kitchen range."
        cta="Shop kitchen & dining"
        href="/collections/kitchen-dining"
        products={kitchen}
        seed="split-kitchen"
      />

      <CollectionsRail />
      <WideTiles />
      <ExploreAll />

      <SplitCollection
        flip
        eyebrow="Signature collection"
        title="The Jaali collection"
        body="Lattice patterns cut by hand into solid sheesham, so light and shadow become part of the piece. Placeholder copy: tell the story of your signature craft here."
        cta="Explore the collection"
        ctaStyle="link"
        href="/collections/jaali"
        products={signature}
        seed="split-signature"
      />

      <Craft />
      <PressWall />
      <Beyond />
      <Stores />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  const row = (offset: number) =>
    Array.from({ length: 7 }, (_, i) => `hero-${offset}-${i}`).map((seed, i) => (
      <EditorialArt
        key={seed}
        seed={seed}
        tag={i === 0 ? "Dummy campaign photo" : ""}
        className={i % 3 === 1 ? "h-full w-[36vw] shrink-0 md:w-[24vw]" : "h-full w-[30vw] shrink-0 md:w-[18vw]"}
      />
    ));

  return (
    <section className="relative h-[calc(100svh-64px)] min-h-[520px] overflow-hidden bg-tile" aria-label="Campaign">
      <h1 className="sr-only">
        {site.name}: {site.tagline}
      </h1>
      <div className="flex h-full flex-col gap-1">
        {[0, 1].map((r) => (
          <div key={r} className="h-1/2 overflow-hidden">
            <div
              className="flex h-full w-max animate-marquee-slow gap-1"
              style={r === 1 ? { animationDirection: "reverse" } : undefined}
            >
              {row(r)}
              {row(r)}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-24 flex justify-center gap-3 px-5 md:bottom-10">
        <Link href="/collections/home-decor" className="btn flex-1 whitespace-nowrap px-3 hover:!bg-white sm:w-52 sm:flex-none">
          Shop home decor
        </Link>
        <Link href="/collections/accessories" className="btn-outline flex-1 whitespace-nowrap bg-white/85 px-3 backdrop-blur sm:w-52 sm:flex-none">
          Shop accessories
        </Link>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="gutter py-20 text-center md:py-28">
      <p className="eyebrow mb-6">Welcome to {site.name}</p>
      <h2 className="display mx-auto max-w-3xl">Handcrafted wood for homes with a story</h2>
      <p className="mx-auto mt-7 max-w-xl text-[14px] leading-relaxed">
        <span className="block uppercase tracking-[0.04em]">{site.tagline}</span>
        Wooden home decor, kitchenware and accessories, carved, turned and painted by hand. Placeholder copy: one or
        two sentences about your artisans and where they work.
      </p>
    </section>
  );
}

function ValueMarquee() {
  const items = [
    { icon: HandHeart, label: "Made by hand" },
    { icon: TreePine, label: "Solid wood" },
    { icon: Hammer, label: "Artisan crafted" },
    { icon: MapPin, label: "Made in India" },
    { icon: Sparkles, label: "No two alike" },
  ];
  const run = (hidden: boolean) =>
    items.map(({ icon: Icon, label }) => (
      <li key={label} aria-hidden={hidden} className="flex items-center gap-4 px-8">
        <Icon size={26} strokeWidth={1.3} className="text-accent" />
        <span className="whitespace-nowrap text-[22px] uppercase tracking-[0.01em] md:text-[26px]">{label}</span>
      </li>
    ));
  return (
    <section className="overflow-hidden bg-ink py-6 text-cream" aria-label="What we stand for">
      <ul className="flex w-max animate-marquee">
        {run(false)}
        {run(true)}
        {run(true)}
        {run(true)}
      </ul>
    </section>
  );
}

function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="best-sellers">
      <h2 id="best-sellers" className="display gutter mb-12 text-center">
        Our best selling products
      </h2>
      <Carousel label="Best sellers" arrows="overlay" className="gap-5 px-5 md:gap-8 md:px-8 lg:px-12">
        {products.map((p) => (
          <article key={p.handle} className="w-[78vw] shrink-0 snap-start scroll-ml-5 sm:w-[400px] md:scroll-ml-12">
            <Link href={`/products/${p.handle}`} aria-label={p.name} className="relative block">
              <EditorialArt seed={`best-${p.handle}`} className="aspect-[4/5] rounded-xl">
                <div className="flex h-full items-end justify-center p-6">
                  <ProductArt
                    seed={p.handle}
                    type={p.type}
                    palette={p.colors[0].palette}
                    tag=""
                    bg="transparent"
                    className="h-[62%] w-[70%]"
                  />
                </div>
              </EditorialArt>
            </Link>
            <div className="mt-4 flex items-center gap-3">
              <ProductArt seed={p.handle} type={p.type} palette={p.colors[0].palette} tag="" className="h-14 w-12 shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[11.5px] uppercase tracking-[0.06em]">
                  <Link href={`/products/${p.handle}`} className="hover:underline">
                    {p.name}
                  </Link>
                </h3>
                <p className="text-[11px] uppercase tracking-[0.06em] text-muted">{money(p.price)}</p>
              </div>
              <AddToBag
                handle={p.handle}
                color={p.colors[0].name}
                iconOnly
                className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center bg-ink text-cream hover:opacity-80"
              />
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
}

function SplitCollection({
  eyebrow,
  title,
  body,
  cta,
  ctaStyle = "button",
  href,
  products,
  seed,
  flip,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  ctaStyle?: "button" | "link";
  href: string;
  products: Product[];
  seed: string;
  flip?: boolean;
}) {
  return (
    <section className="gutter grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : undefined}>
        <EditorialArt
          seed={seed}
          tag="Dummy lifestyle photo"
          className="aspect-[4/5] lg:sticky lg:top-24 lg:aspect-auto lg:h-[calc(100vh-8rem)]"
        />
      </div>
      <div>
        <div className="mx-auto max-w-lg pb-14 text-center lg:pt-6">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="display">{title}</h2>
          <p className="mt-6 text-[14px] leading-relaxed">{body}</p>
          {ctaStyle === "button" ? (
            <Link href={href} className="btn mt-8">
              {cta}
            </Link>
          ) : (
            <Link href={href} className="link-underline mt-8 inline-block text-[11px] uppercase tracking-[0.12em]">
              {cta}
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-12">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} className="mx-auto w-full max-w-[260px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionsRail() {
  const tiles = [
    { eyebrow: "Small and special", title: "Accessories", body: "Jewellery boxes, combs, desk pieces and turned bangles.", cta: "Shop accessories", href: "/collections/accessories" },
    { eyebrow: "", title: "Wall decor", body: "Carved panels and inlaid plates that anchor a wall.", cta: "Shop wall decor", href: "/collections/wall-decor" },
    { eyebrow: "", title: "Candle holders", body: "Carved and lacquered stands for diyas, pillars and tea lights.", cta: "Shop candle holders", href: "/collections/candle-holders" },
    { eyebrow: "", title: "Serving trays", body: "Carved handles and painted florals for tea time and festivals.", cta: "Shop trays", href: "/collections/serving-trays" },
    { eyebrow: "For the altar", title: "Pooja room", body: "Wood that belongs in your most peaceful corner.", cta: "Shop pooja room", href: "/collections/pooja" },
  ];
  const textBg = ["", "bg-accent text-white", "bg-ink text-cream", "bg-accent text-white", ""];

  return (
    <HorizontalScroll label="Shop by collection">
      <div className="flex h-full w-[86vw] shrink-0 flex-col justify-center px-8 text-center text-cream md:w-[50vw] md:px-16">
        <p className="eyebrow mb-5 !text-cream/70">For every room</p>
        <h2 className="display">Explore the full range</h2>
        <p className="mx-auto mt-6 max-w-sm text-[14px] text-cream/85">
          Each craft has its own character. Pick the pieces that suit your home, your table and your rituals.
        </p>
      </div>

      {tiles.map((t, i) => {
        const overlay = i === 0 || i === 4;
        if (overlay) {
          // full-height photo with text over it
          return (
            <Link key={t.title} href={t.href} className="group block h-full w-[78vw] shrink-0 sm:w-[46vw] lg:w-[33.4vw]">
              <EditorialArt seed={`rail-${t.title}`} className="h-full">
                <div className="flex h-full flex-col items-center justify-end bg-gradient-to-t from-ink/60 to-transparent p-10 text-center text-white">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/80">{t.eyebrow}</p>
                  <h3 className="mt-2 text-[34px] uppercase leading-tight">{t.title}</h3>
                  <p className="mt-2 text-[13px]">{t.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 group-hover:opacity-70">
                    {t.cta} <ArrowRight size={14} />
                  </span>
                </div>
              </EditorialArt>
            </Link>
          );
        }
        // half text block, half photo; order alternates
        const text = (
          <div className={`flex h-1/2 flex-col items-center justify-center p-8 text-center ${textBg[i]}`}>
            <h3 className="text-[30px] uppercase leading-tight md:text-[34px]">{t.title}</h3>
            <p className="mt-3 max-w-[280px] text-[13px] opacity-90">{t.body}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 group-hover:opacity-70">
              {t.cta} <ArrowRight size={14} />
            </span>
          </div>
        );
        const photo = <EditorialArt seed={`rail-${t.title}`} tag="" className="h-1/2" />;
        return (
          <Link key={t.title} href={t.href} className="group flex h-full w-[78vw] shrink-0 flex-col sm:w-[46vw] lg:w-[33.4vw]">
            {i % 2 === 1 ? (
              <>
                {text}
                {photo}
              </>
            ) : (
              <>
                {photo}
                {text}
              </>
            )}
          </Link>
        );
      })}
    </HorizontalScroll>
  );
}

function WideTiles() {
  const tiles = [
    { eyebrow: "Gather round", title: "The living room", body: "Statement pieces for the room everyone sees.", cta: "Shop living room", href: "/collections/living", solid: true },
    { eyebrow: "Keep it close", title: "Jewellery boxes", body: "Carved and inlaid boxes, lined in velvet.", cta: "Shop jewellery boxes", href: "/collections/jewellery-boxes", solid: false },
  ];
  return (
    <section className="grid md:grid-cols-2" aria-label="More collections">
      {tiles.map((t) => (
        <EditorialArt key={t.title} seed={`wide-${t.title}`} className="aspect-[4/3] md:aspect-[16/10]">
          <div className="flex h-full flex-col items-center justify-center bg-ink/35 p-8 text-center text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/80">{t.eyebrow}</p>
            <h3 className="mt-3 text-[32px] uppercase leading-tight md:text-[38px]">{t.title}</h3>
            <p className="mt-3 text-[13px]">{t.body}</p>
            <Link
              href={t.href}
              className={
                t.solid
                  ? "btn mt-6 !border-white !bg-white !text-ink hover:!bg-transparent hover:!text-white"
                  : "btn-outline mt-6 !border-white !text-white hover:!bg-white hover:!text-ink"
              }
            >
              {t.cta}
            </Link>
          </div>
        </EditorialArt>
      ))}
    </section>
  );
}

function ExploreAll() {
  return (
    <section className="pattern-grain px-5 py-10 md:py-14" aria-label="All products">
      <div className="mx-auto max-w-3xl bg-ink px-8 py-16 text-center text-cream md:px-16">
        <p className="eyebrow mb-5 !text-cream/70">No filters needed</p>
        <h2 className="display">Explore every piece by {site.name}</h2>
        <hr className="mx-auto my-9 max-w-md border-cream/25" />
        <Link href="/collections/all" className="btn-cream-outline">
          Shop all products
        </Link>
      </div>
    </section>
  );
}

function Craft() {
  return (
    <section className="grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12">
      <EditorialArt seed="craft" tag="Dummy workshop photo / video" className="aspect-[16/11] lg:col-span-7" />
      <div className="gutter text-center lg:col-span-5 lg:px-16">
        <p className="eyebrow mb-5">Where it begins</p>
        <h2 className="display">Carved by hand, finished slowly</h2>
        <p className="mx-auto mt-8 grid h-24 w-24 place-items-center rounded-full border border-ink text-[10px] uppercase leading-tight tracking-[0.12em]">
          Dummy
          <br />
          badge
        </p>
        <p className="mt-8 text-[14px] leading-relaxed">
          Placeholder copy: introduce the artisans who make your pieces and how. From choosing the timber to the
          last coat of wax, what does the process look like and why does it matter?
        </p>
        <Link href="/pages/about" className="btn mt-8">
          Discover the process
        </Link>
      </div>
    </section>
  );
}

function PressWall() {
  return (
    <section className="relative overflow-hidden" aria-label="Press">
      <div className="grid grid-cols-4 gap-1 md:grid-cols-8">
        {Array.from({ length: 24 }, (_, i) => (
          <EditorialArt
            key={i}
            seed={`press-${i}`}
            tag={i === 0 ? "Dummy press tiles" : ""}
            className={`aspect-square ${i >= 16 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center p-5">
        <div className="w-full max-w-2xl bg-ink px-8 py-12 text-center text-cream md:px-14">
          <p className="eyebrow mb-4 !text-cream/70">As seen in</p>
          <h2 className="display">{site.name} in the spotlight</h2>
          <p className="mx-auto mt-5 max-w-md text-[13.5px] text-cream/85">
            Placeholder copy: mention the magazines, platforms and collaborations that have featured your work.
          </p>
          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noreferrer"
            className="link-underline mt-6 inline-block text-[11px] uppercase tracking-[0.12em]"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function Beyond() {
  const cards = [
    { title: "E-gift cards", body: "Let them choose their own. Simple and thoughtful.", cta: "Buy gift cards", href: "/products/e-gift-card" },
    { title: "About us", body: "The story shaping every design.", cta: "Read our story", href: "/pages/about" },
    { title: "Journal", body: "Stories, thoughts and inspiration behind the brand.", cta: "Read the journal", href: "/journal" },
    { title: "Contact us", body: "Reach out for support, questions or collaborations.", cta: "Get in touch", href: "/pages/contact" },
  ];
  return (
    <section className="bg-ink py-20 text-cream md:py-24" aria-labelledby="beyond">
      <div className="gutter">
        <p className="eyebrow mb-4 text-center !text-cream/70">Get to know {site.name}</p>
        <h2 id="beyond" className="display mb-14 text-center">
          Beyond the workshop
        </h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article key={c.title} className="text-center">
              <EditorialArt seed={`beyond-${c.title}`} className="aspect-[4/3]" />
              <h3 className="mt-7 text-[17px] uppercase tracking-[0.02em]">{c.title}</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-[13px] text-cream/85">{c.body}</p>
              <Link href={c.href} className="btn-cream-outline mt-5 h-10 px-5">
                {c.cta} <ArrowRight size={13} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stores() {
  const tile = (s: (typeof stores)[number]) => (
    <figure key={s.name} className="text-center">
      <EditorialArt seed={`store-${s.name}`} tag="Dummy store photo" className="aspect-[6/5]" />
      <figcaption className="mt-4 text-[11px] uppercase leading-relaxed tracking-[0.1em]">
        {s.name}
        <br />
        <span className="text-muted">{s.city}</span>
      </figcaption>
    </figure>
  );
  return (
    <section className="gutter grid gap-12 py-16 md:py-24 lg:grid-cols-3 lg:gap-20" aria-labelledby="stores">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-16">{stores.slice(0, 2).map(tile)}</div>
      <div className="order-first self-start text-center lg:sticky lg:top-32 lg:order-none lg:pt-10">
        <p className="eyebrow mb-5">See it in person</p>
        <h2 id="stores" className="display">
          Visit our stores
        </h2>
        <p className="mx-auto mt-6 max-w-xs text-[14px]">
          Feel the grain, the weight and the carving up close. Find a store near you.
        </p>
        <Link href="/pages/stores" className="btn mt-8">
          Find store locations
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-16">{stores.slice(2, 4).map(tile)}</div>
    </section>
  );
}
