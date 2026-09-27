import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllStorySlugs, getStoryBySlug } from "@/lib/stories";
import NarrationPlayer from "@/components/storybook/NarrationPlayer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  return story ? { title: `${story.title} · Storybook`, description: story.shortDescription } : {};
}

const formatDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <article className="mx-auto my-8 w-[calc(100%-2rem)] max-w-3xl border border-book-rule bg-book-page px-5 py-8 shadow-sm sm:my-12 sm:w-[calc(100%-3rem)] sm:px-12 sm:py-12">
      <Link
        href="/storybook"
        className="-ml-1 inline-flex min-h-11 items-center gap-2 rounded-sm px-1 text-sm text-book-muted underline-offset-4 transition-colors duration-200 hover:text-book-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All stories
      </Link>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-sm border border-book-rule bg-book-paper">
        <Image src={story.coverImage} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
      </div>
      <h1 lang={story.lang} className="mt-8 text-balance text-3xl font-semibold leading-[1.4] text-book-ink sm:text-4xl">
        {story.title}
      </h1>
      <p className="mt-3 text-sm text-book-muted">
        By {story.author} ·{" "}
        <time dateTime={story.publishedAt} className="whitespace-nowrap">
          {formatDate(story.publishedAt)}
        </time>
      </p>
      {story.tags?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-book-rule px-2.5 py-0.5 text-xs text-book-muted">
              {tag}
            </li>
          ))}
        </ul>
      )}
      {story.audio?.narrationUrl && (
        <NarrationPlayer track={{ url: story.audio.narrationUrl, title: story.title, slug: story.slug, artwork: story.coverImage, lang: story.lang }} />
      )}
      <div className="story-prose mt-10" lang={story.lang}>
        <Markdown remarkPlugins={[remarkGfm]}>{story.content}</Markdown>
      </div>
      {story.illustration && (
        <figure className="mx-auto mt-14 max-w-xl border-t border-book-rule pt-10">
          <Image src={story.illustration} alt="" width={1200} height={800} className="h-auto w-full rounded-sm bg-book-paper p-2 ring-1 ring-book-rule" />
        </figure>
      )}
    </article>
  );
}
