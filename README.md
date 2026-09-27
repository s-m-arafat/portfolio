# Shakil Mahmud Arafat — portfolio

Next.js (App Router) site. `npm run dev` · `npm run build` · `npm test`

## Add a project

1. Create `content/projects/<slug>.md`:

   ```md
   ---
   title: Project title
   summary: One sentence for cards and search results.
   fields: [embedded]        # analog | digital | embedded | research
   order: 150                # list position
   featured: false           # show on the home page
   tools: [KiCad, ESP32]
   highlights:
     - What you built or verified.
   links:
     - { label: Source code, href: "https://github.com/..." }
   files:
     - { label: Schematic (PDF), href: /projects/<slug>/schematic.pdf }
   ---
   Overview in Markdown.
   ```

2. Put any files in `public/projects/<slug>/`. The build fails if a listed file is missing or a field is unknown.

## Add a story

Add `content/stories/<slug>.json` (see `story-of-the-memories.json`) and put audio in `public/assets/stories/audio/`.
