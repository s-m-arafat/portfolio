# UI Spec S4 — Storybook, narration player, audio dock

- Date: 2026-09-10 · Task 2 of `docs/superpowers/plans/2026-09-10-portfolio-overhaul.md` (section S4; S1–S3 and S5 live in `2026-09-10-ui-spec.md`).
- Sources: spec §7 (storybook) and §8 (audio), UX brief §2 `/storybook` routes and §5 audio UX. Copy strings come from the brief; this file only adds visual values and class strings.
- Tailwind 3.4 core utilities only (arbitrary values allowed, no plugins). Icons from `lucide-react` 0.475. Light only: no dark-mode variants.
- Storybook pages use `book-*` colors only. The global `AudioDock` and the icon-only `MusicToggle` use portfolio token names only (`canvas`, `surface`, `line`, `line-strong`, `ink`, `muted`, `accent`, `accent-hover`, `accent-soft`); S1 owns their hex values.
- Mood: a printed book on a reading desk. Warm paper ground, a lighter page sheet, dark brown ink, one oxblood binding accent. Calm: no gradients, no textures, no animation beyond ≤ 200 ms color and shadow transitions.

## S4.1 Book palette

Merge into `theme.extend.colors` in `tailwind.config.js`, next to the S1 portfolio tokens. This gives `bg-book-paper`, `text-book-ink`, `border-book-rule`, `accent-book-accent`, `outline-book-accent` and so on.

```js
book: {
  paper: "#F7F1E3",
  page: "#FFFCF5",
  ink: "#2B2118",
  muted: "#6B5B4B",
  rule: "#9C8668",
  accent: "#8B3A2B",
},
```

| Token | Hex | Role |
|---|---|---|
| `book.paper` | `#F7F1E3` | Storybook ground (the desk), hero frame, player panel |
| `book.page` | `#FFFCF5` | Sheets laid on the paper: story article, story card, hero title plate, controls |
| `book.ink` | `#2B2118` | Body text, headings, icon buttons, hover fill of filled buttons |
| `book.muted` | `#6B5B4B` | Secondary text (byline, description, tags, time, tip, blockquote) and the border of unfilled controls |
| `book.rule` | `#9C8668` | Hairlines: sheet and card edges, tag outlines, dividers, text selection |
| `book.accent` | `#8B3A2B` | The one binding accent: card spine, links, ornament, filled buttons, pressed toggle, seek fill, focus ring, error text |

Rules:
- One refinement: `book.rule` darkens from the spec §7 value `#E3D5BC` (1.29–1.41:1) to `#9C8668`, so every hairline, including the StoryCard link edge, clears 3:1 (3.10:1 on paper, 3.40:1 on page). Selected text stays readable on it (`book.ink` 4.52:1). The spec marks the palette refinable as long as AA holds. The other five hexes are unchanged.
- Control edges use `book.muted` (select, unpressed toggle) or `book.accent` (Try again, pressed toggle), which contrast more strongly than `book.rule`.
- `book.page` text only appears on `book.accent` or `book.ink` fills.
- Focus ring on every storybook control: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent` (6.81:1 on paper, 7.49:1 on page).

### Contrast (WCAG 2.x relative luminance, computed with node)

The dock rows use the spec §4 starting hexes for the portfolio tokens. They are provisional: re-run this with the final S1 hexes if S1 changes them.

```bash
node -e '
const L = (h) => { const c = h.slice(1).match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const R = (a, b) => { const [x, y] = [L(a), L(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const c = { "book-paper": "#F7F1E3", "book-page": "#FFFCF5", "book-ink": "#2B2118", "book-muted": "#6B5B4B", "book-rule": "#9C8668", "book-accent": "#8B3A2B",
  canvas: "#FAFAF9", surface: "#FFFFFF", line: "#E7E5E4", "line-strong": "#8A847E", ink: "#1C1917", muted: "#57534E", accent: "#0F766E", "accent-hover": "#115E59", "accent-soft": "#F0FDFA" };
for (const [f, g, min, use] of [
  ["book-ink", "book-page", 4.5, "story text, h1, card title"],
  ["book-ink", "book-paper", 4.5, "icon buttons on the player panel"],
  ["book-muted", "book-page", 4.5, "byline, card description, tags, tip, blockquote"],
  ["book-muted", "book-paper", 4.5, "player time and Speed label (panel is paper)"],
  ["book-accent", "book-page", 4.5, "prose links, error text, Try again"],
  ["book-accent", "book-paper", 4.5, "accent on the paper ground"],
  ["book-page", "book-accent", 4.5, "Listen, play/pause, pressed music toggle"],
  ["book-page", "book-ink", 4.5, "hover fill of Listen and play/pause"],
  ["book-muted", "book-page", 3, "UI boundary: select, unpressed music toggle"],
  ["book-accent", "book-page", 3, "UI boundary: Try again, focus ring on sheet"],
  ["book-accent", "book-paper", 3, "UI boundary: focus ring and seek fill on paper"],
  ["book-rule", "book-page", 3, "hairline: sheet, card and tag edges on page"],
  ["book-rule", "book-paper", 3, "hairline: StoryCard link edge, frame, panel on paper"],
  ["book-ink", "book-rule", 4.5, "selected text (::selection)"],
  ["muted", "surface", 4.5, "dock time text, toggle and close icons"],
  ["ink", "surface", 4.5, "dock title link"],
  ["surface", "accent", 4.5, "dock play/pause icon on fill"],
  ["surface", "accent-hover", 4.5, "dock play/pause hover"],
  ["accent", "accent-soft", 3, "pressed music toggle icon and border"],
  ["accent", "surface", 3, "dock focus ring, seek fill"],
  ["accent", "canvas", 3, "dock focus ring over page ground"],
  ["muted", "surface", 3, "UI boundary: dock speed select"],
  ["line-strong", "surface", 3, "UI boundary: dock music toggle (off), portfolio"],
  ["line-strong", "canvas", 3, "UI boundary: dock music toggle (off), portfolio"],
  ["line-strong", "book-paper", 3, "UI boundary: dock music toggle (off), storybook"],
  ["line-strong", "book-page", 3, "UI boundary: dock music toggle (off), storybook"],
  ["accent", "book-paper", 3, "dock focus ring over storybook paper"],
  ["accent", "book-page", 3, "dock focus ring over storybook page"],
  ["line", "surface", 0, "decorative card edge (shadow carries the lift)"],
]) { const r = R(c[f], c[g]); console.log(`${f} on ${g}`.padEnd(26), (r.toFixed(2) + ":1").padStart(8), min ? `min ${min} ${r >= min ? "PASS" : "FAIL"}` : "decorative ", "|", use); }'
```

Output:

```text
book-ink on book-page       15.37:1 min 4.5 PASS | story text, h1, card title
book-ink on book-paper      13.98:1 min 4.5 PASS | icon buttons on the player panel
book-muted on book-page      6.36:1 min 4.5 PASS | byline, card description, tags, tip, blockquote
book-muted on book-paper     5.78:1 min 4.5 PASS | player time and Speed label (panel is paper)
book-accent on book-page     7.49:1 min 4.5 PASS | prose links, error text, Try again
book-accent on book-paper    6.81:1 min 4.5 PASS | accent on the paper ground
book-page on book-accent     7.49:1 min 4.5 PASS | Listen, play/pause, pressed music toggle
book-page on book-ink       15.37:1 min 4.5 PASS | hover fill of Listen and play/pause
book-muted on book-page      6.36:1 min 3 PASS | UI boundary: select, unpressed music toggle
book-accent on book-page     7.49:1 min 3 PASS | UI boundary: Try again, focus ring on sheet
book-accent on book-paper    6.81:1 min 3 PASS | UI boundary: focus ring and seek fill on paper
book-rule on book-page       3.40:1 min 3 PASS | hairline: sheet, card and tag edges on page
book-rule on book-paper      3.10:1 min 3 PASS | hairline: StoryCard link edge, frame, panel on paper
book-ink on book-rule        4.52:1 min 4.5 PASS | selected text (::selection)
muted on surface             7.63:1 min 4.5 PASS | dock time text, toggle and close icons
ink on surface              17.49:1 min 4.5 PASS | dock title link
surface on accent            5.47:1 min 4.5 PASS | dock play/pause icon on fill
surface on accent-hover      7.58:1 min 4.5 PASS | dock play/pause hover
accent on accent-soft        5.25:1 min 3 PASS | pressed music toggle icon and border
accent on surface            5.47:1 min 3 PASS | dock focus ring, seek fill
accent on canvas             5.24:1 min 3 PASS | dock focus ring over page ground
muted on surface             7.63:1 min 3 PASS | UI boundary: dock speed select
line-strong on surface       3.70:1 min 3 PASS | UI boundary: dock music toggle (off), portfolio
line-strong on canvas        3.54:1 min 3 PASS | UI boundary: dock music toggle (off), portfolio
line-strong on book-paper    3.28:1 min 3 PASS | UI boundary: dock music toggle (off), storybook
line-strong on book-page     3.61:1 min 3 PASS | UI boundary: dock music toggle (off), storybook
accent on book-paper         4.86:1 min 3 PASS | dock focus ring over storybook paper
accent on book-page          5.34:1 min 3 PASS | dock focus ring over storybook page
line on surface              1.26:1 decorative  | decorative card edge (shadow carries the lift)
```

## S4.2 `app/storybook/storybook.css` (whole file)

- Imported by `app/storybook/layout.js`, whose wrapper is `<div className={`storybook ${book.variable} ${bengali.variable}`}>`. Next keeps this CSS loaded after client navigation away, so every selector starts with `.storybook`.
- Colors come from `theme("colors.book.*")`, so the palette lives only in `tailwind.config.js`. `postcss.config.mjs` runs `tailwindcss` on every CSS file, which resolves `theme()` at build time.
- Tailwind preflight removes list bullets and heading sizes, so `.story-prose` restores them here. That is the fix for bug B2 (no typography plugin).
- Font stack: Literata has no Bengali glyphs (next/font sets a `unicode-range`), so Bengali text falls through to Noto Serif Bengali one glyph at a time. Preflight makes `button`, `input` and `select` inherit the font, so the player controls get the book face too.
- Measure is about 65ch. Line-height is 1.75 for Latin text and 1.9 for `:lang(bn)`, because Bengali conjuncts and vowel signs need taller lines.

```css
/* Storybook book theme. Loaded by app/storybook/layout.js and kept loaded after
   client navigation, so every selector is scoped under .storybook. */

.storybook {
  background-color: theme("colors.book.paper");
  color: theme("colors.book.ink");
  font-family: var(--font-book), var(--font-bengali), Georgia, serif;
  font-kerning: normal;
  font-optical-sizing: auto;
}

.storybook ::selection {
  background-color: theme("colors.book.rule");
  color: theme("colors.book.ink");
}

/* Story text */
.storybook .story-prose {
  max-width: 65ch;
  margin-inline: auto;
  font-size: 1.125rem;
  line-height: 1.75;
  color: theme("colors.book.ink");
  overflow-wrap: break-word;
}

/* Bengali conjuncts and vowel signs need taller lines. */
.storybook .story-prose:lang(bn) {
  line-height: 1.9;
}

.storybook .story-prose > :first-child {
  margin-top: 0;
}

.storybook .story-prose p {
  margin-top: 1.25em;
}

.storybook .story-prose:lang(en) p {
  hyphens: auto;
}

.storybook .story-prose h1,
.storybook .story-prose h2,
.storybook .story-prose h3 {
  margin-top: 2em;
  margin-bottom: 0;
  font-weight: 600;
  line-height: 1.35;
  color: theme("colors.book.ink");
  text-wrap: balance;
}

.storybook .story-prose:lang(bn) h1,
.storybook .story-prose:lang(bn) h2,
.storybook .story-prose:lang(bn) h3 {
  line-height: 1.55;
}

.storybook .story-prose h1 { font-size: 1.75em; }
.storybook .story-prose h2 { font-size: 1.4em; }
.storybook .story-prose h3 { font-size: 1.15em; }

.storybook .story-prose h1 + *,
.storybook .story-prose h2 + *,
.storybook .story-prose h3 + * {
  margin-top: 0.6em;
}

.storybook .story-prose ul,
.storybook .story-prose ol {
  margin-top: 1.25em;
  padding-left: 1.5em;
}

.storybook .story-prose ul { list-style-type: disc; }
.storybook .story-prose ol { list-style-type: decimal; }

.storybook .story-prose li {
  margin-top: 0.4em;
  padding-left: 0.25em;
}

.storybook .story-prose li::marker {
  color: theme("colors.book.muted");
}

.storybook .story-prose li > ul,
.storybook .story-prose li > ol {
  margin-top: 0.4em;
}

.storybook .story-prose blockquote {
  margin: 1.75em 0 0;
  padding: 0.1em 0 0.1em 1.25em;
  border-left: 2px solid theme("colors.book.accent");
  color: theme("colors.book.muted");
}

.storybook .story-prose blockquote > :first-child {
  margin-top: 0;
}

.storybook .story-prose a {
  color: theme("colors.book.accent");
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

.storybook .story-prose a:hover {
  text-decoration-thickness: 2px;
}

.storybook .story-prose a:focus-visible {
  outline: 2px solid theme("colors.book.accent");
  outline-offset: 2px;
  border-radius: 2px;
}

.storybook .story-prose strong {
  font-weight: 600;
  color: theme("colors.book.ink");
}

.storybook .story-prose em {
  font-style: italic;
}

/* Bengali has no italic; a synthesized slant reads as a rendering fault. */
.storybook .story-prose em:lang(bn) {
  font-style: normal;
  font-weight: 500;
}

/* Section break as a centered ornament instead of a line. */
.storybook .story-prose hr {
  height: auto;
  margin: 2.5em 0 0;
  border: 0;
  overflow: visible;
  text-align: center;
  color: theme("colors.book.accent");
}

/* Second declaration hides the ornament from screen readers; browsers without
   the alt-text syntax drop it and keep the first. */
.storybook .story-prose hr::after {
  content: "* * *";
  content: "* * *" / "";
  display: inline-block;
  font-size: 1.25em;
  line-height: 1;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
}

.storybook .story-prose hr + * {
  margin-top: 1.5em;
}

@media (min-width: 640px) {
  .storybook .story-prose {
    font-size: 1.1875rem;
  }
}
```

`.story-prose` element (in `app/storybook/[slug]/page.js`): `<div className="story-prose mt-10" lang={story.lang}>`. The CSS sets `margin-inline: auto` and the utility sets `margin-top`, so the two never set the same property.

## S4.3 `/storybook` index (`app/storybook/page.js`)

Frontispiece: the video fills the whole frame behind a framed title plate. The plate is solid `book.page`, so text contrast never depends on the video frame. The video plays once for 5 s (`#t=0,5`, no `loop`) and then rests on its last frame. Under `prefers-reduced-motion: reduce` it is `display: none`. The frame's `min-h` and padding set its height, not the video, so the paper ground, plate, h1, intro and toggle stay where they are (UX brief §5). The title plate `div` is the one element this adds to the plan skeleton.

```jsx
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
```

| Element | className |
|---|---|
| Index wrapper | `mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12` |
| Hero frame (`header`) | `relative isolate flex min-h-[24rem] items-center justify-center overflow-hidden rounded-sm border border-book-rule bg-book-paper px-6 py-12 sm:min-h-[30rem]` |
| Video | `absolute inset-0 -z-10 size-full object-cover motion-reduce:hidden` |
| Title plate | `max-w-lg border border-book-rule bg-book-page px-6 py-8 text-center shadow-sm ring-1 ring-book-rule ring-offset-[6px] ring-offset-book-page sm:px-10 sm:py-10` |
| Title (h1) | `text-4xl font-semibold leading-tight tracking-tight text-book-ink sm:text-5xl` |
| Intro | `mx-auto mb-6 mt-3 max-w-sm text-base leading-relaxed text-book-muted sm:text-lg` |
| Story list grid (`ul`) | `mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3` |
| Empty state | `mt-12 text-center text-book-muted` |

The plate's `border` plus the `ring` with a 6 px `book.page` offset draws a printed double rule. The frame's `px-6` leaves room for the 7 px ring at 390 px.

## S4.4 `StoryCard` (`components/storybook/StoryCard.js`, server)

A book cover: a 4 px `book.accent` spine on the left edge, a squarer spine side (`rounded-l-sm`) and rounder fore-edge (`rounded-r-md`). The cover is landscape on phones, so title and text stay on the first screen, and portrait from 640 px. Hover only deepens the shadow and underlines the title (bug B27: no framer-motion; the focus ring is now visible).

```jsx
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
```

| Element | className |
|---|---|
| Link (whole card) | `group flex h-full flex-col overflow-hidden rounded-l-sm rounded-r-md border border-l-4 border-book-rule border-l-book-accent bg-book-page shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-book-accent motion-reduce:transition-none` |
| Cover aspect box | `relative aspect-[3/2] overflow-hidden border-b border-book-rule bg-book-paper sm:aspect-[4/5]` |
| Cover image (`next/image`, `fill`) | `object-cover` |
| Card body | `flex flex-1 flex-col p-5` |
| Title (h2) | `text-xl font-semibold leading-[1.45] text-book-ink decoration-book-accent decoration-1 underline-offset-4 group-hover:underline` |
| Description | `mt-2 line-clamp-3 leading-[1.7] text-book-muted` |
| Tags (`ul`) | `mt-auto flex flex-wrap gap-2 pt-4` |
| Tag (`li`, shared with the story page) | `rounded-full border border-book-rule px-2.5 py-0.5 text-xs text-book-muted` |

## S4.5 Story page (`app/storybook/[slug]/page.js`, server)

The story is one printed sheet (`book.page`) on the paper ground. The width is `calc(100% - gutter)` with `mx-auto` and `max-w-3xl`, so there is a 16 px gutter at 390 px, a 24 px gutter from 640 px, and it is centered at every width. Inner padding is 20 px on phones and 48 px from 640 px. The prose is capped at 65ch inside the sheet, while the cover and header use the full sheet width. The back link needs `import { ArrowLeft } from "lucide-react";` (UX brief: arrow icon + `All stories`).

```jsx
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
```

| Element | className |
|---|---|
| Article wrapper (the sheet) | `mx-auto my-8 w-[calc(100%-2rem)] max-w-3xl border border-book-rule bg-book-page px-5 py-8 shadow-sm sm:my-12 sm:w-[calc(100%-3rem)] sm:px-12 sm:py-12` |
| Back link | `-ml-1 inline-flex min-h-11 items-center gap-2 rounded-sm px-1 text-sm text-book-muted underline-offset-4 transition-colors duration-200 hover:text-book-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none` |
| Back link icon (`ArrowLeft`) | `size-4` |
| Cover aspect box | `relative mt-4 aspect-[16/9] overflow-hidden rounded-sm border border-book-rule bg-book-paper` |
| Cover image (`fill`, `priority`) | `object-cover` |
| h1 | `mt-8 text-balance text-3xl font-semibold leading-[1.4] text-book-ink sm:text-4xl` |
| Byline (`p`) | `mt-3 text-sm text-book-muted` |
| `time` | `whitespace-nowrap` |
| Tags (`ul`) | `mt-4 flex flex-wrap gap-2` |
| Tag (`li`) | `rounded-full border border-book-rule px-2.5 py-0.5 text-xs text-book-muted` |
| Prose | `story-prose mt-10` |
| End-plate `figure` | `mx-auto mt-14 max-w-xl border-t border-book-rule pt-10` |
| End-plate image | `h-auto w-full rounded-sm bg-book-paper p-2 ring-1 ring-book-rule` |

The h1 uses `leading-[1.4]`, not `leading-tight`: at 1.25 the Bengali vowel signs of the current title collide across wrapped lines. The end-plate image's `p-2` over `bg-book-paper` works as a printed mat inside a hairline frame. There is no caption (UX brief).

## S4.6 `NarrationPlayer` (`components/storybook/NarrationPlayer.js`, client)

The plan's Step 5 markup and logic stay unchanged. Only `className`s are added (and the icons get size classes). Copy is from UX brief §5.

### Not started (this story is not the loaded track)

A quiet band between two hairlines on the sheet: one filled accent button and a muted tip.

```jsx
<section aria-label="Audio narration" className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-book-rule py-4">
  <button
    type="button"
    onClick={() => p.load(track, { autoplay: true })}
    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-book-accent px-5 font-medium text-book-page transition-colors duration-200 hover:bg-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none"
  >
    <Play aria-hidden="true" className="size-4" /> Listen to this story
  </button>
  <p className="inline-flex items-center gap-1.5 text-sm text-book-muted">
    <Headphones aria-hidden="true" className="size-4" /> Best with headphones
  </p>
</section>
```

### Active (loading, playing, paused, error)

A `book.paper` panel inset on the page sheet. It is a grid, so rows stay the same whether `Loading…` or the error is showing, and the DOM order matches the plan exactly (no `order-*`).

```jsx
<section aria-label="Audio narration" className="mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-md border border-book-rule bg-book-paper p-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-4">
  <div className="flex items-center gap-1">
    <button type="button" onClick={() => p.skip(-10)} aria-label="Back 10 seconds" className="inline-flex size-11 items-center justify-center rounded-full text-book-ink transition-colors duration-200 hover:bg-book-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none">
      <RotateCcw aria-hidden="true" className="size-5" />
    </button>
    <button type="button" onClick={p.toggle} aria-label={busy ? "Pause" : "Play"} className="inline-flex size-12 items-center justify-center rounded-full bg-book-accent text-book-page transition-colors duration-200 hover:bg-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none">
      {busy ? <Pause aria-hidden="true" className="size-5" /> : <Play aria-hidden="true" className="size-5" />}
    </button>
    <button type="button" onClick={() => p.skip(10)} aria-label="Forward 10 seconds" className="inline-flex size-11 items-center justify-center rounded-full text-book-ink transition-colors duration-200 hover:bg-book-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none">
      <RotateCw aria-hidden="true" className="size-5" />
    </button>
  </div>
  <input
    type="range"
    min={0}
    max={p.duration || 0}
    step={1}
    value={Math.min(p.currentTime, p.duration || 0)}
    onChange={(e) => p.seek(Number(e.target.value))}
    disabled={!p.duration}
    aria-label="Seek"
    aria-valuetext={`${formatTime(p.currentTime)} of ${formatTime(p.duration)}`}
    className="h-11 w-full cursor-pointer accent-book-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent"
  />
  <p className="whitespace-nowrap text-sm tabular-nums text-book-muted">
    <span>{formatTime(p.currentTime)}</span> / <span>{formatTime(p.duration)}</span>
  </p>
  <label className="inline-flex items-center gap-2 justify-self-end text-sm text-book-muted sm:justify-self-start">
    Speed
    <select value={p.rate} onChange={(e) => p.setRate(Number(e.target.value))} className="min-h-11 cursor-pointer rounded-md border border-book-muted bg-book-page px-2 text-sm text-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent">
      {RATES.map((r) => (
        <option key={r} value={r}>
          {r}×
        </option>
      ))}
    </select>
  </label>
  <div className="hidden items-center gap-1 justify-self-end sm:col-span-2 sm:flex">
    <button type="button" onClick={p.toggleMute} aria-label={p.muted ? "Unmute" : "Mute"} className="inline-flex size-11 items-center justify-center rounded-full text-book-ink transition-colors duration-200 hover:bg-book-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none">
      {p.muted || p.volume === 0 ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
    </button>
    <input
      type="range"
      min={0}
      max={1}
      step={0.05}
      value={p.muted ? 0 : p.volume}
      onChange={(e) => p.setVolume(Number(e.target.value))}
      aria-label="Volume"
      className="h-11 w-24 cursor-pointer accent-book-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent"
    />
  </div>
  {p.status === "loading" && <p role="status" className="col-span-full text-sm text-book-muted">Loading…</p>}
  {p.status === "error" && (
    <p role="alert" className="col-span-full flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-book-accent">
      Couldn’t load the audio.{" "}
      <button type="button" onClick={p.play} className="inline-flex min-h-11 items-center rounded-full border border-book-accent bg-book-page px-4 font-medium text-book-accent transition-colors duration-200 hover:bg-book-accent hover:text-book-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none">
        Try again
      </button>
    </p>
  )}
</section>
```

| Element | className |
|---|---|
| Section, not started | `mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-book-rule py-4` |
| Listen button | `inline-flex min-h-11 items-center gap-2 rounded-full bg-book-accent px-5 font-medium text-book-page transition-colors duration-200 hover:bg-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none` |
| Listen icon (`Play`), tip icon (`Headphones`) | `size-4` |
| Headphones tip (`p`) | `inline-flex items-center gap-1.5 text-sm text-book-muted` |
| Section, active | `mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-md border border-book-rule bg-book-paper p-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-4` |
| Transport group | `flex items-center gap-1` |
| Skip buttons (back 10 s, forward 10 s) and mute button | `inline-flex size-11 items-center justify-center rounded-full text-book-ink transition-colors duration-200 hover:bg-book-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none` |
| Play/pause button | `inline-flex size-12 items-center justify-center rounded-full bg-book-accent text-book-page transition-colors duration-200 hover:bg-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none` |
| Icons in skip, play/pause and mute buttons | `size-5` |
| Seek range (native, `accent-color`) | `h-11 w-full cursor-pointer accent-book-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent` |
| Time text (`p`) | `whitespace-nowrap text-sm tabular-nums text-book-muted` |
| Speed label | `inline-flex items-center gap-2 justify-self-end text-sm text-book-muted sm:justify-self-start` |
| Speed select (native) | `min-h-11 cursor-pointer rounded-md border border-book-muted bg-book-page px-2 text-sm text-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent` |
| Volume group (replaces the plan's `hidden sm:flex`) | `hidden items-center gap-1 justify-self-end sm:col-span-2 sm:flex` |
| Volume range (native) | `h-11 w-24 cursor-pointer accent-book-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent` |
| Loading status (`role="status"`) | `col-span-full text-sm text-book-muted` |
| Error alert (`role="alert"`) | `col-span-full flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-book-accent` |
| Retry button | `inline-flex min-h-11 items-center rounded-full border border-book-accent bg-book-page px-4 font-medium text-book-accent transition-colors duration-200 hover:bg-book-accent hover:text-book-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none` |

Grid placement (automatic, in DOM order):

| Width | Row 1 | Row 2 | Row 3 (only when present) |
|---|---|---|---|
| < 640 px (2 columns) | transport · seek | time · Speed (right-aligned) | Loading… or error, full width |
| ≥ 640 px (3 columns) | transport · seek · time | Speed · volume (spans to the right edge) | Loading… or error, full width |

- Width at 390 px: sheet 358 px, minus `px-5`, minus panel `p-3` and border, leaves 292 px. Transport is 44 + 48 + 44 + 2 × 4 = 144 px, plus the 12 px gap, leaves 136 px for seek. Nothing wraps unpredictably, because the grid, not flex-wrap, places items.
- Every hit target is ≥ 44 px: `size-11`, `size-12`, `min-h-11`, and range inputs at `h-11` (the track stays thin and centered; the input box is the touch area).
- Seek is disabled until the duration is known (plan logic). `disabled:opacity-50` marks that; WCAG contrast does not apply to disabled controls.
- Playing and paused differ by glyph and accessible name, not by color alone.

## S4.7 `MusicToggle` (`components/storybook/MusicToggle.js`, client)

The one component has two looks. The icon-only form sits in the global `AudioDock` on every page, so it uses portfolio tokens only. The labeled form sits in the `/storybook` hero plate, inside `.storybook`, so it uses book tokens and the book font. Pressed state uses Tailwind's `aria-pressed:` variant (`[aria-pressed="true"]`), so it comes from the attribute the plan already sets, with no extra state or class logic. The glyph also changes (`VolumeX` → `Volume2`), so on/off never relies on color alone.

```js
const ICON =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-muted shadow-md transition-colors duration-150 hover:bg-canvas hover:text-ink hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent aria-pressed:hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const LABELED =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-book-muted bg-book-page px-4 text-sm font-medium text-book-ink transition-colors duration-200 hover:bg-book-paper aria-pressed:border-book-accent aria-pressed:bg-book-accent aria-pressed:text-book-page aria-pressed:hover:border-book-ink aria-pressed:hover:bg-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none";
```

```jsx
<button
  type="button"
  onClick={toggle}
  aria-pressed={playing}
  aria-label={showLabel ? undefined : "Background music"}
  title="Background music"
  className={showLabel ? LABELED : ICON}
>
  <Icon aria-hidden="true" className={showLabel ? "size-4" : "size-5"} />
  {showLabel && <span>Background music</span>}
</button>
```

| State | Icon-only (dock) | Labeled (hero) |
|---|---|---|
| Off (`aria-pressed="false"`) | `VolumeX`, `text-muted` on `bg-surface`, `border-line-strong` (3.28:1+ on every ground), `shadow-md` to lift it off page content | `VolumeX`, `text-book-ink` on `bg-book-page`, `border-book-muted` (6.36:1 edge) |
| Hover, off | `bg-canvas`, `text-ink`, `border-ink` | `bg-book-paper` |
| On (`aria-pressed="true"`) | `Volume2`, `text-accent` on `bg-accent-soft`, `border-accent` (5.25:1) | `Volume2`, `text-book-page` on `bg-book-accent` (7.49:1), `border-book-accent` |
| Hover, on | `text-accent-hover` | `bg-book-ink`, `border-book-ink` (15.37:1) |
| Focus | 2 px `outline-accent`, offset 2 px | 2 px `outline-book-accent`, offset 2 px |
| Ducked (narration playing) | unchanged: stays pressed (UX brief §5) | unchanged |

The pressed rules come after `hover:` in Tailwind's variant order, so a pressed toggle keeps its pressed colors while hovered unless an `aria-pressed:hover:` rule overrides them.

## S4.8 `AudioDock` (`components/storybook/AudioDock.js`, client, global)

The dock is rendered by the root layout on every page, outside `.storybook`, so it uses portfolio tokens and Geist even on storybook pages. It is calm: white surface, hairline edge, soft shadow, one accent fill (play/pause). Nothing animates in or out. Speed options, at module scope:

```js
// RATES is imported from "@/providers/NarrationPlayerProvider" (plan Task 8 Step 3).
```

```jsx
<div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex max-w-[calc(100vw-2rem)] items-end gap-2">
  {showMini && (
    <div role="region" aria-label="Now playing" className="flex w-80 min-w-0 flex-wrap items-center gap-x-1 rounded-xl border border-line bg-surface p-1 shadow-lg sm:w-96">
      <Link
        href={`/storybook/${p.track.slug}`}
        lang={p.track.lang}
        className="hidden basis-full truncate rounded-md px-2 pt-1 text-sm font-medium leading-6 text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block"
      >
        {p.track.title}
      </Link>
      <button type="button" onClick={p.toggle} aria-label={busy ? "Pause narration" : "Play narration"} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-surface transition-colors duration-150 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        {busy ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
      </button>
      <input
        type="range"
        min={0}
        max={p.duration || 0}
        step={1}
        value={Math.min(p.currentTime, p.duration || 0)}
        onChange={(e) => p.seek(Number(e.target.value))}
        disabled={!p.duration}
        aria-label="Seek narration"
        aria-valuetext={`${formatTime(p.currentTime)} of ${formatTime(p.duration)}`}
        className="h-10 min-w-0 flex-1 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
      <span className="hidden shrink-0 px-1 font-mono text-xs tabular-nums text-muted sm:inline">
        {formatTime(p.currentTime)} / {formatTime(p.duration)}
      </span>
      <select value={p.rate} onChange={(e) => p.setRate(Number(e.target.value))} aria-label="Speed" className="hidden h-8 shrink-0 cursor-pointer rounded-md border border-muted bg-surface px-1 font-mono text-xs text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block">
        {RATES.map((r) => (
          <option key={r} value={r}>
            {r}×
          </option>
        ))}
      </select>
      <button type="button" onClick={p.close} aria-label="Close player" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-canvas hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  )}
  <MusicToggle />
</div>
```

| Element | className |
|---|---|
| Dock container (replaces the plan's `fixed bottom-4 right-4 z-40 flex items-end gap-2`) | `fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex max-w-[calc(100vw-2rem)] items-end gap-2` |
| Mini-player card (`role="region"`) | `flex w-80 min-w-0 flex-wrap items-center gap-x-1 rounded-xl border border-line bg-surface p-1 shadow-lg sm:w-96` |
| Title link (hidden below 640 px) | `hidden basis-full truncate rounded-md px-2 pt-1 text-sm font-medium leading-6 text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block` |
| Play/pause button | `inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-surface transition-colors duration-150 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` |
| Seek range (native) | `h-10 min-w-0 flex-1 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` |
| Time text (hidden below 640 px) | `hidden shrink-0 px-1 font-mono text-xs tabular-nums text-muted sm:inline` |
| Speed select (`aria-label="Speed"`, between time and close; hidden below 640 px) | `hidden h-8 shrink-0 cursor-pointer rounded-md border border-muted bg-surface px-1 font-mono text-xs text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block` |
| Close button | `inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-canvas hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` |
| Icons (play, pause, close) | `size-4` |
| Music toggle | `ICON` from S4.7 (44 × 44 px, `shrink-0`) |

Layout rules:
- **Never overlaps itself** (bug B4): the mini-player and the toggle are siblings in one flex row with `gap-2`. The toggle is `shrink-0` and the card is `min-w-0`, so the card shrinks, never the toggle. `items-end` pins the toggle to the same bottom-right corner whether or not the card is shown (UX brief §5).
- **Safe area:** the `bottom` and `right` offsets are `1rem + env(safe-area-inset-*)`, so the dock clears the iOS home indicator and landscape notches. Tailwind 3.4 keeps `safe-area-inset-*` intact inside `calc()` (the compiled CSS is `calc(1rem + env(safe-area-inset-bottom))`).
- **Width at 390 px:** the container is capped at 358 px; minus the toggle (44) and the gap (8), the card gets 306 px of its 320 px `w-80`. Inside it, play (40) + close (36) + gaps leave about 214 px for seek. From 640 px the card is `w-96` (384 px): the title takes row 1, and play · seek · time · close sit in row 2 with about 190 px of seek (about 135 px with the speed select).
- **Below 640 px:** play/pause, progress, close only (title link and time are `hidden`), per UX brief §5.
- **Hit targets:** play 40 px, close 36 px, toggle 44 px, title link 28 px tall, all ≥ 24 × 24 px. The seek input box is 40 px tall.
- **Footprint for S3's footer padding:** the dock is at most 50 px tall below 640 px and 78 px from 640 px, plus the 16 px offset and the safe area. A footer bottom padding of `pb-[calc(6rem+env(safe-area-inset-bottom))]` keeps footer links clear of it.
- Color use: the only accent fill is play/pause, and the pressed toggle uses `accent-soft`. No `book-*` class appears in the dock.

## S4.9 Deviations from spec §7 and plan notes

- Palette: `book.rule` `#E3D5BC` → `#9C8668` so hairlines clear 3:1 on paper and page. The other spec §7 hexes are unchanged; all pairs pass (S4.1).
- `/storybook` hero: adds one title-plate `div` inside the frame, so the title never sits directly on video. With reduced motion the video is hidden and the frame keeps its height.
- Hero video plays once for 5 s (`#t=0,5`, no loop) for WCAG 2.2.2; refines spec §7 "loop". If the owner insists on looping, add instead a `<button type="button" aria-pressed>` "Pause background video" in the title plate.
- Mini-player title link gets `lang={p.track.lang}` (WCAG 3.1.2), so the story page's NarrationPlayer track carries `lang: story.lang`.
- Dock `MusicToggle` (off) edge is `border-line-strong`, per S1's control-boundary rule; dock transitions are `duration-150` with no `motion-reduce:` utilities, per S5.
- Story page: the back link imports `ArrowLeft` from `lucide-react` (plan Step 11 lists no icon import; UX brief asks for an arrow).
- Mini-player speed select: Required by spec §8; overrides plan Step 6's omission.
- Plan Step 6 `bottom-4 right-4` becomes safe-area-aware `calc()` offsets (the plan asks for safe-area handling).

Verified 2026-09-10 (re-run after the audit fixes, with `line.strong` added and `book.rule` `#9C8668`): the S4.2 CSS block and every class string in this file were compiled with the repo's Tailwind 3.4.14 CLI, using `book` plus the spec §4 portfolio tokens. Every token generated CSS, every CSS selector starts with `.storybook`, no `theme()` was left unresolved, and the dock strings contain no `book-*` color.
