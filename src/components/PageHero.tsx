/** Patterned banner with a large title, used at the top of info pages. */
export function PageHero({ title }: { title: string }) {
  return (
    <header className="pattern-grain">
      <div className="gutter flex min-h-[260px] items-end bg-ink/45 pb-10 pt-24 md:min-h-[380px]">
        <h1 className="text-[40px] uppercase leading-none tracking-[-0.01em] text-white md:text-[64px]">{title}</h1>
      </div>
    </header>
  );
}
