import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { EditorialArt } from "@/components/Placeholder";

// Every page is pre-generated from generateStaticParams, so reading params is fine here.
export const instant = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="gutter mx-auto max-w-3xl pb-24 pt-12">
      <header className="text-center">
        <p className="eyebrow mb-3">{formatDate(post.date)}</p>
        <h1 className="display">{post.title}</h1>
        <p className="mt-4 text-[15px] text-ink/80">{post.excerpt}</p>
      </header>
      <EditorialArt seed={`post-${post.slug}`} className="my-10 aspect-[16/9]" />
      <div className="prose-store">
        {post.body.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
      <p className="mt-12 text-center">
        <Link href="/journal" className="link-underline text-[11px] uppercase tracking-[0.12em]">
          Back to the journal
        </Link>
      </p>
    </article>
  );
}
