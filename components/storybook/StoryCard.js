import Image from "next/image";
import Link from "next/link";

export default function StoryCard({ story }) {
  return (
    <Link
      href={`/storybook/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-l-sm rounded-r-md border border-l-4 border-book-rule border-l-book-accent bg-book-page shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-book-accent motion-reduce:transition-none"
    >
      <div className="relative aspect-[3/2] overflow-hidden border-b border-book-rule bg-book-paper sm:aspect-[4/5]">
        <Image src={story.coverImage} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 lang={story.lang} className="text-xl font-semibold leading-[1.45] text-book-ink decoration-book-accent decoration-1 underline-offset-4 group-hover:underline">
          {story.title}
        </h2>
        <p lang={story.lang} className="mt-2 line-clamp-3 leading-[1.7] text-book-muted">
          {story.shortDescription}
        </p>
        {story.tags?.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-4">
            {story.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-book-rule px-2.5 py-0.5 text-xs text-book-muted">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
