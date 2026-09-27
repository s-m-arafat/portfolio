import { getAllStories } from "@/lib/stories";
import StoryCard from "@/components/storybook/StoryCard";
import MusicToggle from "@/components/storybook/MusicToggle";

export const metadata = { title: "Storybook", description: "Illustrated stories with narration." };

export default function StorybookPage() {
  const stories = getAllStories();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <header className="relative isolate flex min-h-[24rem] items-center justify-center overflow-hidden rounded-sm border border-book-rule bg-book-paper px-6 py-12 sm:min-h-[30rem]">
        <video
          src="/assets/stories/videos/kashful.mp4#t=0,5"
          autoPlay
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden"
        />
        <div className="max-w-lg border border-book-rule bg-book-page px-6 py-8 text-center shadow-sm ring-1 ring-book-rule ring-offset-[6px] ring-offset-book-page sm:px-10 sm:py-10">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-book-ink sm:text-5xl">Storybook</h1>
          <p className="mx-auto mb-6 mt-3 max-w-sm text-base leading-relaxed text-book-muted sm:text-lg">
            Illustrated stories to read or listen to.
          </p>
          <MusicToggle showLabel />
        </div>
      </header>
      {stories.length > 0 ? (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <li key={s.slug}>
              <StoryCard story={s} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-center text-book-muted">No stories yet.</p>
      )}
    </div>
  );
}
