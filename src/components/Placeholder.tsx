/**
 * PLACEHOLDER IMAGES — stock photos of Indian handicrafts stand in for real
 * product and campaign photography.
 *
 * The photos live in `public/images/crafts/` and are listed (with credits) in
 * `src/lib/photos.ts`. `ProductArt` picks a photo per product (and a different
 * one per gallery `view`); `EditorialArt` picks one per seed for lifestyle and
 * campaign tiles. To use your own photography, change what these two
 * components render — the props tell you which product, colour and view is
 * being requested — nothing else in the app changes.
 */
import Image from "next/image";
import type { ProductType } from "@/lib/products";
import { photoFor, productPhoto } from "@/lib/photos";
import { site } from "@/lib/site";

function DummyTag({ label }: { label: string }) {
  if (!site.showPlaceholderTags || !label) return null;
  return (
    <span className="pointer-events-none absolute left-2 top-2 z-[1] bg-white/75 px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.14em] text-ink/60">
      {label}
    </span>
  );
}

/** Product image stand-in. `view` 0–5 picks a different photo for the gallery. */
export function ProductArt({
  seed,
  view = 0,
  className = "",
  tag = "Dummy image",
  bg,
  sizes = "(max-width: 768px) 80vw, 33vw",
}: {
  seed: string;
  /** kept for when real per-type photography is wired in */
  type?: ProductType;
  /** kept for when real per-finish photography is wired in */
  palette?: [string, string, string];
  view?: number;
  className?: string;
  tag?: string;
  bg?: string;
  sizes?: string;
}) {
  const photo = productPhoto(seed, view);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: bg ?? "#ece4d8" }}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      <DummyTag label={tag} />
    </div>
  );
}

/**
 * Lifestyle / campaign photo stand-in. Pass `index` to pick a specific photo
 * (useful for grids where neighbours should differ), otherwise it is chosen
 * from `seed`. Pass `children` to overlay text on top.
 */
export function EditorialArt({
  seed,
  index,
  className = "",
  tag = "Dummy photo",
  sizes = "(max-width: 768px) 100vw, 50vw",
  children,
}: {
  seed: string;
  index?: number;
  className?: string;
  tag?: string;
  sizes?: string;
  children?: React.ReactNode;
}) {
  const photo = photoFor(seed, index);
  return (
    <div className={`relative overflow-hidden bg-tile ${className}`}>
      <Image src={photo.src} alt={children ? "" : photo.alt} fill sizes={sizes} className="object-cover" />
      <DummyTag label={tag} />
      {children && <div className="relative z-[1] h-full w-full">{children}</div>}
    </div>
  );
}
