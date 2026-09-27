# Portfolio Overhaul — Design Spec

- Date: 2026-09-10 · Branch: `portfolio-overhaul` (from `v0.4`)
- Status: approved by owner ("approve and go")
- Stack stays: Next.js 15 App Router (JS, no TS), React 19, Tailwind 3, lucide-react, react-markdown, remark-gfm, gray-matter. **No new runtime dependencies.**
- Principle: ponytail — reuse installed deps and existing patterns, native elements first, delete over add, fewest files.

## 1. Goals

1. Recruiter-facing, professional, **light-only** portfolio for Shakil Mahmud Arafat, rebuilt from three CVs (Analog, Digital, Embedded).
2. Multi-page navigation; every project has a dedicated page (description, highlights, tools, links, files).
3. Projects filterable by field.
4. Keep the Storybook with a **bookish** theme and a better audio player; reachable from the nav on every page, **never mentioned anywhere else** in portfolio content.
5. Fix the existing bugs (§9); remove the 3D renderer, dark theme, placeholders (§10).

Non-goals: CMS, blog, contact form/backend, CV PDF downloads, dark mode, analytics, i18n, test framework.

## 2. Owner decisions (fixed — do not revisit)

| Topic | Decision |
|---|---|
| Storybook visibility | Normal nav item "Storybook" (last) on every page. No other page text references stories/storybook/narration. Narration mini-player persists across all routes. |
| Positioning | Multi-field, filter-led. Headline **"Embedded Systems & VLSI Engineer"**. Analog, Digital, Embedded weigh equally. |
| CV files | **No downloads.** Delete `public/assets/Resume.pdf`. |
| Removed | Posts page, contact form, "The Time Weaver" story. |
| Background-music button | **Stays on every page**, restyled discreetly and docked together with the mini-player (no overlap). |
| Not shown on site | Grades (CGPA/GPA), phone number, referees, Facebook, profile photo. Header uses a text wordmark instead of the chip logo. |

## 3. Routes & information architecture

Nav (every page): Home `/` · Projects `/projects` · About `/about` · Contact `/contact` · Storybook `/storybook`. Current page marked with `aria-current="page"`.

| Route | Rendering | Content |
|---|---|---|
| `/` | static | Hero: name, headline, 1–2 sentence summary, location, CTA "View projects" → `/projects`, secondary "Get in touch" → `/contact`, LinkedIn/GitHub/email icon links. Current-role line (Embedded System Engineer (R&D) · Ulterior Engineering Intl. · Sep 2026–Present). Three field cards (Analog IC, Digital & Verification, Embedded & PCB) with blurb + project count → `/projects?field=<slug>`. Featured projects (§5). Short contact band. |
| `/projects` | static page + client filter | H1, one-line intro, filter chips **All · Analog IC · Digital & Verification · Embedded & PCB · Research** with counts (`<button aria-pressed>`). Selected field lives in `?field=` (`router.replace(..., { scroll: false })`); unknown/missing → All. Result count announced (`aria-live="polite"`). Grid of project cards sorted by `order`. `useSearchParams` component wrapped in `<Suspense>` whose fallback renders the full unfiltered grid. |
| `/projects/[slug]` | SSG (`generateStaticParams`, `dynamicParams = false`) | Breadcrumb (Projects › title) · title · field chips (link to filtered list) · meta (context, period — only if present) · summary lead · **Key work** (highlights) · **Tools & skills** chips · **Links** (only if any) · **Files** (only if any; open in new tab) · **Overview** (markdown body; placed last per the UX brief) · Previous/Next project nav. Per-page `generateMetadata` (title, description = summary). |
| `/about` | static | Intro paragraph · Experience (professional roles) · Skills (grouped) · Education (no grades) · Coursework · Certifications & training · Leadership & activities (last, per the UX brief). |
| `/contact` | static | Email (mailto link + copy-to-clipboard button with visible confirmation), LinkedIn, GitHub, location, availability line. No form. |
| `/storybook`, `/storybook/[slug]` | SSG | Bookish theme (§7). |
| `app/not-found.js` | static | Plain branded 404 with links to Home and Projects. |

Redirects in `next.config.mjs` (`permanent: true`): `/portfolio` → `/about`; `/research` → `/projects/snn-environmental-sound`; `/posts` → `/projects`; `/posts/:path*` → `/projects`.

Metadata: root `title: { default: "Shakil Mahmud Arafat — Embedded Systems & VLSI Engineer", template: "%s · Shakil Mahmud Arafat" }` + description. Every page sets its own `title`. Remove the invalid `charset` metadata key.

## 4. Visual design system (light only)

Starting constraints — the UI design pass may refine values but must keep AA contrast and the single-accent rule.

- Colors: background `#FAFAF9`, surface `#FFFFFF`, border `#E7E5E4` (decorative), control border `#8A847E`, text `#1C1917`, muted text `#57534E`, accent `#0F766E`, accent-hover `#115E59`, accent-soft `#F0FDFA`. One accent only. All text ≥ WCAG AA.
- Type: **Geist Sans** (body/UI) and **Geist Mono** (tool chips, dates, meta) via `next/font/local` from the existing `app/fonts/GeistVF.woff` and `app/fonts/GeistMonoVF.woff`, exposed as CSS variables and mapped to Tailwind `fontFamily.sans` / `fontFamily.mono`.
- Layout: content container max width 72rem with fluid side padding (UI spec S1); sticky solid-surface header with bottom border (static at viewport heights ≤ 30rem); footer with name, current year (computed), social links.
- Mobile nav: `<button aria-expanded aria-controls>`; panel closes on link click, Escape, and route change; visible focus rings.
- Primitives (only what pages need): button-style link (primary/secondary), tag/chip, section heading. Cards: white, 1px border, `rounded-xl`, subtle hover; each card is a single `<Link>` (no nested interactive elements).
- Motion: CSS transitions ≤ 200 ms; disabled under `prefers-reduced-motion: reduce`.
- Remove entirely: `dark:` classes, `next-themes`, Tailwind `darkMode`, `.grid-pattern`, `.gradient-fade-edges`, custom scrollbar CSS, the Google Font `@import`s, `.text-paragraph`/`.text-title`/`.bg-title`/`.bg-component`/`.border-primary` utility hacks and the custom color overrides that shadow Tailwind's `blue`/`green`/`cyan`/`white` palettes.

## 5. Content model

### Fields — `lib/site.js`

```js
export const FIELDS = [
  { slug: "analog",   label: "Analog IC",              blurb: "Transistor-level design and SPICE characterization in Cadence Virtuoso — op-amps, comparators and SRAM." },
  { slug: "digital",  label: "Digital & Verification", blurb: "RTL design, UVM and SVA verification, and synthesis through place-and-route." },
  { slug: "embedded", label: "Embedded & PCB",         blurb: "Firmware for ESP32, STM32 and AVR, industrial protocols, and PCB design in KiCad." },
  { slug: "research", label: "Research",               blurb: "Spiking neural networks for neuromorphic sound classification." },
];
```

`lib/site.js` also exports the profile (name, headline, summary, email, location, availability, socials, nav) and the About-page data (experience, activities, skills, education, coursework, certifications) — all from Appendix A. It replaces `lib/data.js`.

### Project file — `content/projects/<slug>.md`

```yaml
---
title: Two-Stage Miller-Compensated Op-Amp
summary: One sentence, ≤ 160 chars; used on cards and as meta description.
fields: [analog]              # ≥ 1 FIELDS slug; first is primary
context: University project   # optional, only when the CV states it
period: "2025"                # optional, only when the CV states it
order: 10                     # ascending sort
featured: true                # optional; shown on home
tools: [Cadence Virtuoso, ADE]
highlights:                   # 2–5 bullets, from Appendix A only
  - Designed a two-stage op-amp with Miller compensation and current-mirror biasing.
links:                        # optional
  - { label: Source code, href: "https://github.com/..." }
files:                        # optional; files live in public/projects/<slug>/
  - { label: Schematic (PDF), href: /projects/<slug>/schematic.pdf }
---
Overview write-up in Markdown (2–4 short paragraphs).
```

Loader `lib/projects.js` (server only; mirrors `lib/stories.js`): `getAllProjects()` (sorted by `order`), `getProject(slug)`. Validates on load and **throws with the file name** (so `next build` fails) when: `title`/`summary` missing; `fields` empty or contains an unknown slug; `tools`/`highlights` not arrays; a `links[].href` is not `https://`; a `files[].href` does not start with `/projects/<slug>/` or does not exist under `public/`. Slug = file name.

**Content rule:** no fabricated facts, numbers, results, dates, links or files. Write-ups may only restate/expand Appendix A with definitional context (e.g. what a StrongARM latch is). Omit `context`/`period` unless the CV states them.

## 6. Pages — copy basis

- Summary (home/about), merged from the three CV objectives: EEE graduate working across embedded systems and VLSI — firmware and PCB design, transistor-level analog design with SPICE simulation and DRC/LVS in Cadence Virtuoso, and RTL design with UVM-based verification; uses Python and object-oriented programming to automate simulation and verification.
- Availability line: "Open to embedded systems and VLSI design & verification roles."
- Featured on home (one per field + thesis): `rv32i-pipelined-core`, `6t-sram-array`, `modbus-tcp-mqtt-dashboard`, `snn-environmental-sound`.

## 7. Storybook (bookish)

- Scoped styling: `app/storybook/layout.js` imports `app/storybook/storybook.css` and loads serif fonts via `next/font/google`: **Literata** (latin) and **Noto Serif Bengali** (bengali), as CSS variables. Book styles must not leak into portfolio pages.
- Palette (refinable, AA required): paper `#F7F1E3`, page `#FFFCF5`, ink `#2B2118`, muted ink `#6B5B4B`, rule `#9C8668`, binding accent `#8B3A2B`.
- `/storybook`: keeps `kashful.mp4` hero (muted, plays once for 5 s with no loop per WCAG 2.2.2, playsInline, decorative) framed like a frontispiece; serif title "Storybook"; stories as book-cover cards (cover, title, short description, tags); background-music toggle in the hero. **No autoplay.**
- `/storybook/[slug]`: **server component**; `notFound()` on server; Markdown rendered on the server with react-markdown + remark-gfm into `.story-prose` (serif, ~65ch, generous line-height suited to Bengali, styled h1–h3/lists/blockquote, `hr` as an ornament). Shows cover, title, author, date (formatted on the server with a fixed locale), tags, the `NarrationPlayer` (client), and `illustration` as an end-plate figure if present. Back link to all stories.
- Remove unused story features: `threeScene`, `lottie`, `videos` (MediaPlayer), background `IllustFrame`.
- Data fixes: `story-of-the-memories.json` `narrationUrl` → `/assets/stories/audio/nostalogia-remastered.mp3` (same 111.5 s as the 39 MB WAV). Delete `the-time-weaver.json`.

## 8. Audio architecture

### `BackgroundMusicProvider` (wraps the narration provider in root layout)
- API: `{ playing, toggle, duck, unduck }`.
- `Audio` object created **lazily on first toggle** (no 6 MB fetch for every visitor). Loop, volume ~0.3.
- No autoplay, no localStorage persistence (removes the blocked-autoplay → persisted-`false` bug). Music starts only from a user click.
- `duck()` pauses without changing `playing`; `unduck()` resumes only if `playing`. A failed `play()` sets `playing=false` and warns once.

### `NarrationPlayerProvider` — single source of truth
- Renders the **only** narration `<audio preload="metadata">`, in root layout, so playback survives client navigation.
- State: `track {url, title, slug, artwork?} | null`, `status: "idle"|"loading"|"playing"|"paused"|"error"`, `currentTime`, `duration`, `volume`, `muted`, `rate`.
- Actions: `load(track, { autoplay })`, `play`, `pause`, `toggle`, `seek(t)`, `skip(delta)`, `setVolume`, `toggleMute`, `setRate`, `close`.
- Media event listeners attached once; `status` derived from `play`/`playing`/`pause`/`waiting`/`ended`/`error` events (no optimistic flags, no `canplay` wait loop, no timeouts).
- Ducking lives here: `play` event → `bgm.duck()`; `pause`/`ended`/`error`/`close` → `bgm.unduck()`. Applies regardless of which view triggered it.
- Media Session API (guarded by `"mediaSession" in navigator`): metadata (title, artist "Storybook", artwork = cover) and handlers for play, pause, seekbackward, seekforward, seekto.
- No `minimized` state: visibility is derived from the route (below).

### Views
- `NarrationPlayer` (story page): no `<audio>` of its own. If this story isn't the loaded track → "Listen" button calling `load(track, { autoplay: true })`. If it is → play/pause, −10 s / +10 s, `<input type="range">` seek (`aria-valuetext` like "1:23 of 1:51"), elapsed/total time, `<select>` speed (0.75–2×), mute + `<input type="range">` volume (hidden on small screens), loading indicator, error message with retry. Small headphones tip.
- `AudioDock` (root layout, fixed bottom-right, safe-area aware): one flex container holding
  - the background-music toggle (icon button, `aria-pressed`, label "Background music") — always present;
  - the **mini-player** — shown only when a track is loaded **and** the current path is not that track's story page: title (link to story), play/pause, thin range progress, time, speed, close. On narrow screens: play/pause, progress, close.
  - The dock must never cover page content permanently (footer gets bottom padding).

## 9. Bugs to fix (each must be verifiably fixed or eliminated)

| ID | Bug | Where (pre-change) |
|---|---|---|
| B1 | `.text-paragraph` forces `#fff` → invisible text on light background | `app/globals.css:118` |
| B2 | Story Markdown unstyled: `prose` classes without the typography plugin | `StoryContent.js:157` |
| B3 | Playing from the mini-player doesn't pause BGM; closing doesn't resume → overlapping audio | `FloatingNarrationPlayer.js:80`, provider |
| B4 | BGM button overlaps the mini-player (both fixed bottom, `z-50`) | `BackgroundMusicToggle.js:20`, `FloatingNarrationPlayer.js:90` |
| B5 | Autoplay attempt is blocked, then `bgm-enabled=false` is persisted forever | `hooks/useAutoPlayMusic.js`, `BackgroundMusicProvider.js:60` |
| B6 | BGM `pause()` doesn't track state; `resume()` uses stale state | `BackgroundMusicProvider.js:76-86` |
| B7 | Narration served as 39 MB WAV (2.8 Mbps) | `story-of-the-memories.json:10` |
| B8 | Two narration `<audio>` elements with effect-synced state and a 100 ms `setTimeout` race | `NarrationPlayer.js:21-122` |
| B9 | `play()` awaits `canplay` forever if the source fails | `NarrationPlayerProvider.js:60` |
| B10 | Progress width `NaN%` while duration is 0 | `NarrationPlayer.js:265`, `FloatingNarrationPlayer.js:129` |
| B11 | Seek/volume are click-only `div role="slider"` (no keyboard) | both players |
| B12 | `xs:` breakpoint doesn't exist → speed label never visible | `FloatingNarrationPlayer.js:196` |
| B13 | Provider re-subscribes media listeners on every volume/rate change | `NarrationPlayerProvider.js:41` |
| B14 | Placeholder links: `mailto:your-email@example.com`, `#` project/PDF links, Posts "Read More" → 404 | `app/page.js:134`, `lib/data.js`, `research-card.js:95`, `post-card.js:75` |
| B15 | Controls that do nothing: projects filter `<select>`, "Start a Project", "View GitHub", "Contact for Collaboration", "View Full CV", contact form, newsletter | projects/research/contact/posts pages |
| B16 | Broken dead modules: `responsive-nav.js` (Pages-Router `next/router`), `introcard.js` (missing `@/components/ui/dialog`); unused `lib/utils.js` | components, lib |
| B17 | Education image is an absolute local filesystem path; Experience image file doesn't exist | `lib/data.js:58,88` |
| B18 | Every portfolio page titled "Arafat \| Home"; invalid `charset` metadata key | `app/layout.js:14` |
| B19 | Six render-blocking Google Font CSS `@import`s | `app/globals.css:1-4` |
| B20 | Mobile menu toggles on any click in its wrapper; no Escape, no `aria-expanded`, no close on navigation | `components/mobileNav.js` |
| B21 | Malformed Tailwind `darkMode` value | `tailwind.config.js:3` |
| B22 | Hardcoded "© 2025" | `components/footer.js:6` |
| B23 | Typo class `bg-whit`; stale "α-Overhaul" label | `components/header.js:22`, `components/logo.js:17` |
| B24 | Story page is a client component calling `notFound()` and shipping the Markdown renderer to the client | `StoryContent.js` |
| B25 | Locale-less `toLocaleDateString()` → hydration mismatch risk | `StoryContent.js:123` |
| B26 | Dark scrollbar track on a light theme | `app/globals.css:72` |
| B27 | `framer-motion` pulled in only for a card hover lift; card link lacks focus styling | `StoryCard.js` |
| B28 | BGM `Audio` created on every page load (6 MB fetch for every visitor) | `BackgroundMusicProvider.js:23-41` |
| B29 | Outdated/incorrect content: fake posts, projects and research areas; "June 2025" start date vs CV "Jul 2025" | `lib/data.js`, pages |

## 10. Removals

- Routes: `app/portfolio/`, `app/posts/`, `app/research/`; `app/storybook/StorybookClient.js`, `app/storybook/[slug]/StoryContent.js`.
- Components replaced or dead: `components/{BackgroundMusicToggle,expertise,explore,introcard,logo,mobileNav,nav,responsive-nav,socialgroup,themeSwitcher}.js`, all of `components/ui/*` (replaced by minimal primitives), `components/storybook/{ThreeScene,LottieAnimation,MediaPlayer,IllustFrame,LoadingPlaceholder,ErrorFallback,MusicToggleButton,StorybookEmptyState,StoryGrid,StoryLayout,StorybookHero,FloatingNarrationPlayer}.js` (merge what's needed into the new files).
- `hooks/useAutoPlayMusic.js`, `lib/utils.js`, `lib/svg.js`, `lib/data.js`, `content/stories/the-time-weaver.json`, `components.json`.
- Docs: `docs/*.md` (8 storybook docs describing removed features); README rewritten with "Add a project" / "Add a story" sections. Keep `docs/superpowers/`.
- npm packages: `three`, `gsap`, `lottie-web`, `next-themes`, `framer-motion`, `@radix-ui/react-dialog`, `class-variance-authority`, `clsx`, `tailwind-merge`, and `tailwindcss-animate` if unused after the rebuild.
- Public assets: `assets/Resume.pdf`, `assets/stories/audio/nostalogia.wav`, `assets/stories/audio/README.md`, `assets/{bg-1.jpg,bg-2.jpg,bg-mobile.jpg}`, `images/{bg-1.png,bg-3.png,bg-mobile-2.jpg,brain-chip.webp,chip-bg.png,chip-bg-2.png,chip-bg-3.jpg,chip.png,circuit.jpg,circuit.png,under-construction.png}`, `icons/{logo.png,menu.svg}`.
- Keep: `favicon.ico`, `images/logo.svg`, `images/profile-pic.jpg`, `asymptote/*`, `assets/stories/images/*`, `assets/stories/videos/kashful.mp4`, `assets/stories/audio/{background-music.mp3,nostalogia-remastered.mp3}`, `app/fonts/*`.

## 11. Verification

1. `npx next build` succeeds (runs content validation) and `npx next lint` is clean.
2. Greps return nothing: `dark:`; imports of any removed module/package; `text-paragraph`; `href="#"`; `your-email`; storybook/story/narration mentions in `app/page.js`, `app/about`, `app/contact`, `app/projects`, `content/projects` (nav/dock/storybook routes excepted).
3. Exactly one narration `<audio>` element in the rendered DOM.
4. Headless Chrome screenshots from `next start` at 390×844 and 1280×800: `/`, `/projects`, `/projects?field=embedded`, one project page, `/about`, `/contact`, `/storybook`, `/storybook/story-of-the-memories`, and a 404 page.
5. Each §9 bug checked off with evidence (code location or screenshot).

---

## Appendix A — CV facts (authoritative; add nothing beyond this)

**Profile.** Shakil Mahmud Arafat · Dhaka, Bangladesh · shakilmahmudarafat@gmail.com · LinkedIn https://www.linkedin.com/in/shakil-mahmud-arafat/ · GitHub https://github.com/s-m-arafat

**Experience**
1. **Embedded System Engineer (R&D)** — Ulterior Engineering Intl., Mohakhali, Dhaka — Sep 2026 – Present. Skills: STM32, PCB design, FPGA, firmware development, communication protocols.
   - Research and development on multiple MCUs and firmware development for optimized client solutions.
   - Schematic and PCB design for customized modules; component soldering.
2. **Software Engineer** — Ekagra Health Inc. (ekagrahealth.ai), remote, US-based — Jul 2025 – Aug 2026. Skills: Python, object-oriented programming, system architecture design.
   - Architected and maintained EHR software using object-oriented design patterns, building modular, reusable class hierarchies for scalability and long-term maintainability.
   - Developed an AI-assisted clinician workflow, integrating Scribing and Wound Care models into the EHR to automate clinical tasks.
   - Led a team of 4 engineers, working with clinical product stakeholders to turn requirements into technical specs.

**Leadership & activities**
- **Programming Team Lead (R&D)** — AUST Satellite and Communication Laboratory — Apr 2023 – Apr 2024: experimented with an image recognition system on satellite images; built a website and project management system for the lab.
- **Sub-Executive (Web Team)** — AUST Innovation and Design Club — Apr 2023 – Apr 2024: automated email communication and certificate generation; helped organize club workshops and events with the executive team.

**Education** (no grades on site)
- BSc in Electrical and Electronic Engineering (major: Electronics) — Ahsanullah University of Science and Technology (AUST), Dhaka — 2025
- HSC (Science) — New Govt. Degree College, Rajshahi — 2019
- SSC (Science) — Rajshahi Collegiate School, Rajshahi — 2017

**Skills**
- Analog design: transistor-level design, two-stage op-amps, StrongARM comparators, stick diagrams, PVT corners; SPICE simulation (DC, AC, transient, noise)
- Digital design: Verilog, SystemVerilog, RTL design, FSMs and sequential circuits, RISC-V (RV32I); UART, SPI, I2C; APB, AHB, AXI4-Lite
- Verification: SystemVerilog OOP/class-based verification, UVM, SVA
- Embedded systems: ESP32, STM32, AVR/Arduino, ARM Cortex-M, FPGA; GPIO, interrupts, timers, PWM, ADC, DMA; FreeRTOS, bare-metal C/C++, PlatformIO
- Communication protocols: UART, SPI, I2C, RS-485, Modbus RTU/TCP, MQTT, Ethernet/TCP-IP
- PCB & hardware: Altium Designer, KiCad, PCB soldering
- EDA & simulation: Cadence Virtuoso (schematic, ADE), Cadence Genus, Cadence Innovus, DRC/LVS, LTspice, Proteus, Wokwi, Icarus Verilog, ModelSim, Intel Quartus, AMD Vivado XSim, EDA Playground
- Programming & tools: C, C++, Python, MATLAB, Bash, JavaScript, Linux, Git

**Coursework**
- VLSI I — CMOS networks, transmission gates, pass transistors, Elmore delay, DC and transient response, linear delay model, dynamic circuits, layout, fault analysis, stick diagrams, Cadence, Verilog
- VLSI II — physical design, floorplanning, routing (maze, dogleg, left-edge), timing analysis, KL and FM partitioning, Dijkstra's shortest path, testbenches, Genus, Innovus
- Digital Logic Design — combinational and sequential circuits, K-maps, FSMs, memory, counters
- Electronic Circuits I & II — BJTs, MOSFETs, op-amps, power amplifiers, feedback amplifiers, active filters
- Computer Architecture — SAP I & II, cache mapping, memory organization, pipelining
- Microprocessor, Interfacing & System Design — 16-bit architecture, memory organization, bus activities, instruction set, 8255, 8279, 8253 PIT
- Processing & Fabrication Technology
- Power Electronics — SCR, IGBT, GTO, TRIAC, UJT, DIAC, rectifiers, buck, boost and buck-boost converters
- Programming Language — C++, OOP, data structures and algorithms

**Certifications & training**
- Verification Series Part 1: SystemVerilog Essentials
- Embedded Systems Essentials with Arm: Get Practical with Hardware — edX
- Learning FPGA Development — LinkedIn Learning
- 15-day Design Verification (DV) and DFT training — Ulkasemi

**Projects** (slug · fields · order · extra frontmatter · tools · highlights)

1. `two-stage-op-amp` — **Two-Stage Miller-Compensated Op-Amp** · [analog] · 10 · tools: Cadence Virtuoso, ADE, SPICE simulation
   - Designed a two-stage op-amp with Miller compensation and current-mirror biasing in Cadence Virtuoso.
   - Simulated gain, phase margin and slew rate.
2. `strongarm-comparator` — **StrongARM Latch Comparator** · [analog] · 20 · tools: Cadence Virtuoso, ADE, SPICE simulation
   - Designed a StrongARM latch comparator with an SR-latch output stage in Cadence Virtuoso.
   - Characterized delay and power.
3. `6t-sram-array` — **64×8 6T SRAM Array Design and Characterization** · [analog, digital] · 30 · featured · tools: Cadence Virtuoso, SPICE simulation, PVT corner analysis
   - Designed a 64×8 6T SRAM array with precharge, sense amplifier, write driver and row decoder in Cadence Virtuoso.
   - Characterized static noise margin (SNM), read/write margins and access time across PVT corners.
   - Used the characterization results for SRAM timing modeling.
4. `uvm-sram-verification` — **UVM Verification Environment for a Parameterized Synchronous SRAM** · [digital] · 40 · tools: SystemVerilog, UVM, functional coverage
   - Built a SystemVerilog UVM testbench with driver, monitor, agent, scoreboard and coverage.
   - Target: a configurable single-port SRAM with byte enables.
5. `axi4-lite-uvm-sva` — **AXI4-Lite Slave Verification Environment with SVA Protocol Checks** · [digital] · 50 · tools: SystemVerilog, UVM, SVA, AMD Vivado, AXI VIP
   - Built a UVM environment for an AXI4-Lite slave with constrained-random read/write tests and error injection.
   - Developed SVA checks for handshake stability, response ordering and WSTRB legality.
   - Verified the assertions against the Vivado AXI Verification IP.
6. `rv32i-pipelined-core` — **RV32I Pipelined Core with C++ Reference Model Co-Simulation** · [digital] · 60 · featured · tools: RISC-V (RV32I), RTL design, C++, randomized testing
   - Designed a five-stage RV32I processor with forwarding and hazard detection.
   - Verified the core against a self-written C++ instruction-set simulator.
   - Randomized instruction tests with instruction-by-instruction checking.
7. `sv32-mmu-synthesis-pnr` — **Sv32 Address Translation Unit: Synthesis and Place-and-Route** · [digital] · 70 · tools: RTL design, Cadence Genus, Cadence Innovus, AXI
   - Designed a two-level Sv32 page-table walker with a 16-entry fully associative TLB, permission checks, fault handling and AXI-based PTE fetching.
   - Took the design through Cadence Genus and Innovus, including floorplanning, clock-tree synthesis and routing.
   - Analyzed frequency, area and power.
8. `h-bridge-motor-driver` — **H-Bridge Motor Driver: Circuit Simulation and PCB Design** · [embedded] · 80 · tools: KiCad, Proteus, PWM, MOSFETs, flyback diodes
   - Schematic of a full H-bridge with MOSFET switching, motor direction control, PWM speed control and flyback protection.
   - Designed the PCB in KiCad: component selection, net connectivity, routing and design validation.
9. `48v-relay-lockout-controller` — **48 V Fail-Safe Relay Lockout Controller** · [embedded] · 90 · tools: KiCad, Proteus, ESP32-C3-WROOM-02, STM32, PC817 optocouplers, circuit isolation
   - Protected 48 V input front-end driving isolated relay outputs that inhibit vehicle operation on an interlock condition.
   - KiCad schematic and PCB design; Proteus simulation with an ESP32.
10. `rs485-modbus-rtu-bridge` — **Half-Duplex RS-485 to UART Bridge with Modbus RTU** · [embedded] · 100 · tools: MAX485, UART, RS-485, Modbus RTU
    - MAX485 transceiver with explicit DE/RE control and hand-built FC03 request frames — no protocol library.
    - Full hex TX/RX tracing to validate slave responses and timing against a Modbus master.
11. `attiny85-hardware-watchdog` — **ATtiny85 External Hardware Watchdog** · [embedded] · 110 · tools: ATtiny85, AVR C, AVR programmer, external interrupts, timers, ESP32-C3
    - External ATtiny85 hardware watchdog that supervises an ESP32-C3 IoT node via digital heartbeat pulses.
    - Bare-metal AVR C firmware with direct register configuration, external hardware interrupts and low-overhead internal timer tracking.
12. `modbus-tcp-mqtt-dashboard` — **Modbus TCP to MQTT Gateway with Live Web Dashboard** · [embedded] · 120 · featured · tools: Modbus TCP, MQTT, TCP/IP, Arduino Ethernet, ESP32, UART, Python
    - Siemens PAC3200 power meter polled over Modbus TCP (holding registers) by an Arduino Ethernet client.
    - Data relayed over UART to an ESP32 and republished to an MQTT broker.
    - Python HTTP dashboard subscribes to the same topics and issues commands back.
13. `rf-remote-controlled-car` — **2.4 GHz RF Remote-Controlled Car** · [embedded] · 130 · context: University project · tools: Arduino, ESP32, nRF24L01, SPI, L298N motor driver
    - Implemented 2.4 GHz wireless communication between Arduino boards using nRF24L01 RF transmitter/receiver modules.
    - Interfaced a joystick with the Arduino and mapped its analog inputs to motor direction and speed commands.
14. `snn-environmental-sound` — **Spiking Neural Network for Neuromorphic Classification of Environmental Sound** · [research] · 140 · featured · context: BSc thesis, AUST · period: 2025 · tools: Python, Jupyter, STFT, spiking neural networks · links: Source code → https://github.com/s-m-arafat/spiking-neural-network-experiments
    - Modeled biological neurons as RC circuits, with voltage level as the firing trigger.
    - Translated the circuit-level model into a neural network implementation.
    - STFT-based spectrogram preprocessing with adaptive thresholding and sparse keypoints to cut computational cost.
    - Owner's earlier abstract (usable in the overview): biologically inspired SNN architecture for environmental sound classification using event-based keypoint encoding and energy-efficient spiking computation, evaluated on UrbanSound8K, aimed at low-power and neuromorphic hardware.

No project other than #14 has a public link or files today.

## Appendix B — Storybook assets

- Story: `content/stories/story-of-the-memories.json` (Bengali title/content, author "Arafat", tags, Unsplash cover + illustration, `publishedAt` 2025-11-01).
- Narration: `/assets/stories/audio/nostalogia-remastered.mp3` (111.5 s, 3.3 MB).
- Background music: `/assets/stories/audio/background-music.mp3` (384 s, 6.2 MB, loops).
- Hero video: `/assets/stories/videos/kashful.mp4` (1.8 MB).
