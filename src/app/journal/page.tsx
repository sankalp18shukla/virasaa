import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { EditorialArt } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <div className="gutter pb-24 pt-12">
      <header className="mb-14 text-center">
        <p className="eyebrow mb-3">Stories and notes</p>
        <h1 className="display">Journal</h1>
      </header>
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/journal/${post.slug}`} aria-label={post.title}>
              <EditorialArt seed={`post-${post.slug}`} className="aspect-[4/3]" />
            </Link>
            <p className="eyebrow mt-5">{formatDate(post.date)}</p>
            <h2 className="mt-2 text-[20px] uppercase leading-snug tracking-[-0.005em]">
              <Link href={`/journal/${post.slug}`} className="hover:underline hover:underline-offset-4">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-[14px] text-ink/80">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
