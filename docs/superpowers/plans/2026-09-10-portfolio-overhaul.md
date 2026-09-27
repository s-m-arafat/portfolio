# Portfolio Overhaul Implementation Plan

> **For agentic workers:** executed via the Workflow tool (owner-requested roles: UX Researcher, UI Designer, Frontend Developer, Reality Checker, Code Reviewer). Steps use checkbox (`- [ ]`) syntax for tracking. Each task lists the files it OWNS — never edit files owned by another task.

**Goal:** Rebuild the portfolio as a professional, light-only, multi-page site from the owner's three CVs, with per-project pages and a field filter, while keeping a bookish Storybook with a rebuilt audio player.

**Architecture:** Next.js App Router, statically rendered. Project content lives in `content/projects/*.md` (frontmatter + Markdown) loaded by `lib/projects.js`, which validates at build time. Profile/About data lives in `lib/site.js`. Two client providers in the root layout own all audio (one narration `<audio>`, one lazily created background-music `Audio`); views (`NarrationPlayer`, `AudioDock`) only render provider state.

**Tech Stack:** Next.js 15.1.7, React 19.0, JavaScript (no TypeScript), Tailwind CSS 3.4, lucide-react, react-markdown 10 + remark-gfm, gray-matter, `next/font` (local Geist, Google Literata / Noto Serif Bengali), Node 25 `node:test`.

**Spec:** `docs/superpowers/specs/2026-09-10-portfolio-overhaul-design.md` (read it fully — §2 decisions, §8 audio, §9 bug list, Appendix A facts).

## Global Constraints

- No new npm dependencies (runtime or dev). Only removals (Task 4).
- Light theme only. No `dark:` classes, no theme switcher.
- Facts only from spec Appendix A. No invented numbers, results, dates, links or files.
- The words story/stories/storybook/narration appear only in: `lib/site.js` NAV entry, `app/layout.js` imports, `components/storybook/*`, `providers/*`, `app/storybook/**`, `content/stories/**`, README. Nowhere else.
- Never shown: phone number, grades, referees, Facebook, profile photo, CV downloads.
- Accessibility: semantic landmarks; visible `:focus-visible` rings; WCAG AA contrast; native controls (`<button>`, `<input type="range">`, `<select>`); `aria-current="page"` on active nav; `aria-pressed` on filter chips and the music toggle; external links `target="_blank" rel="noopener noreferrer"`.
- Next 15: `params` is a Promise — always `const { slug } = await params`. Any component calling `useSearchParams` sits inside `<Suspense>`.
- CSS imported by `app/storybook/layout.js` stays loaded after client navigation away — every rule in `storybook.css` must be scoped under `.storybook`.
- Style: 2-space indent, double quotes, semicolons, function components, no PropTypes, comments only for non-obvious logic.
- JSX text never contains a straight `'` or `"`: `react/no-unescaped-entities` is an error and fails `next build`. Use `’ “ ”` or a string expression such as `{"doesn't"}`.
- AudioDock and MusicToggle render in the root layout, outside `.storybook` and often before `storybook.css` loads: style them with Tailwind utilities only — no `.storybook` selectors, no `var(--font-book)` / `var(--font-bengali)`.
- Section order on `/projects/[slug]` (Key work → Tools & skills → Links → Files → Overview) and `/about` (Leadership & activities last) follows the UX brief; spec §3 is updated to match.
- Ponytail: shortest correct code; no speculative abstractions, wrappers or config; delete over add.
- **Do not commit, push, or `git add`.** The owner commits.
- Do not touch: `public/asymptote/**`, `app/fonts/**`, `public/favicon.ico`, `public/images/logo.svg`, `public/images/profile-pic.jpg`, `docs/superpowers/**` (except your own task's doc).
- Design sources: UI values and class strings come from the UI spec (Task 2); copy and section order come from `docs/superpowers/specs/2026-09-10-ux-brief.md` (Task 1). Where they conflict with this plan's logic code, the logic code wins; where they conflict with the spec's §2 decisions, the spec wins.
- The UI spec is split across two files written by two UI Designer agents: **S1, S2, S3, S5** (portfolio tokens, type, components, motion) in `docs/superpowers/specs/2026-09-10-ui-spec.md`; **S4** (storybook palette as a `book` colors object, `storybook.css`, StoryCard, story page, NarrationPlayer, MusicToggle, AudioDock) in `docs/superpowers/specs/2026-09-10-ui-spec-storybook.md`. Every "UI spec S4" reference in this plan means the storybook file. Task 4 must merge that file's `book` colors object into `theme.extend.colors`.

## File ownership map

| Task | Owner role | Owns |
|---|---|---|
| 1 | UX Researcher | `docs/superpowers/specs/2026-09-10-ux-brief.md` |
| 2 | UI Designer ×2 | `docs/superpowers/specs/2026-09-10-ui-spec.md` (S1–S3, S5), `docs/superpowers/specs/2026-09-10-ui-spec-storybook.md` (S4) |
| 3 | Reality Checker | report only |
| 4 | Frontend Developer | `package.json`, `package-lock.json`, `tailwind.config.js`, `postcss.config.mjs`, `next.config.mjs`, `app/globals.css`, `app/layout.js`, `app/not-found.js`, `lib/site.js`, `components/header.js`, `components/footer.js`, `components/primitives.js`, `README.md`; deletes listed in Task 4 |
| 5 | Frontend Developer | `lib/projects.js`, `lib/projects.test.mjs`, `components/ProjectCard.js`, `app/projects/page.js`, `app/projects/ProjectFilter.js`, `app/projects/[slug]/page.js` |
| 6 | Technical Writer | `content/projects/*.md` |
| 7 | Frontend Developer | `app/page.js`, `app/about/page.js`, `app/contact/page.js`, `app/contact/CopyEmailButton.js` |
| 8 | Frontend Developer | `providers/*`, `components/storybook/*`, `app/storybook/**`, `content/stories/*`, `lib/stories.js`, `hooks/` (delete), `public/assets/stories/audio/{nostalogia.wav,README.md}` (delete) |
| 9 | Frontend Developer | any file, only to make verification pass |
| 10–12 | Code Reviewer / Frontend Developer / Reality Checker | review → fixes → final evidence |

Order: 1 → 2 (2 reads 1), 3 in parallel with 1–2 · then 4 · then 5, 6, 7, 8 in parallel · then 9 · then 10 → 11 → 12.

---

### Task 1: UX brief

**Files:** Create `docs/superpowers/specs/2026-09-10-ux-brief.md`

**Interfaces:** Produces copy and section order consumed by Tasks 5–8.

- [ ] **Step 1:** Read the spec and the CVs (`/home/arafat/Documents/official/SHAKIL_MAHMUD_ARAFAT_CV_{Analog,Digital,Embedded}.pdf`).
- [ ] **Step 2:** Write the brief with these sections, each concrete (final copy strings, not guidance):
  1. Primary users & top tasks (technical recruiter screening in < 60 s; hiring engineer checking depth; mobile vs desktop).
  2. Per page (`/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, `/storybook`, `/storybook/[slug]`, 404): ordered section list with final headings, intro/lead sentences, CTA labels, empty/edge states (e.g. project with no links/files, filter with 0 results cannot occur but define the message anyway).
  3. Filter UX: chip labels with counts format, URL behavior, keyboard behavior, announcement text.
  4. Project page reading order and scannability rules (what goes above the fold at 390 px and 1280 px).
  5. Audio UX: in-story player states (not started / loading / playing / paused / error), mini-player visibility rule, music toggle labeling, reduced-motion handling for the hero video.
  6. Mobile navigation behavior.
  7. Content style rules for Task 6 (tone, tense, person, banned hype words, overview length).
- [ ] **Step 3:** Self-check: every copy string respects spec §2 (no storybook mention outside allowed places; no phone/grades/referees).

### Task 2: UI spec

**Files:** Create `docs/superpowers/specs/2026-09-10-ui-spec.md`

**Interfaces:** Consumes Task 1 brief. Produces tokens + exact Tailwind class strings consumed by Tasks 4, 5, 7, 8.

- [ ] **Step 1:** Read spec §4 and §7, the UX brief, and the current code for context.
- [ ] **Step 2:** Write the UI spec with:
  - **S1 Tokens:** final hex values (portfolio + storybook), each text/background pair with its contrast ratio (must be ≥ 4.5:1 body, ≥ 3:1 large text/UI). The exact `theme.extend` block for `tailwind.config.js` (colors named `canvas`, `surface`, `line`, `ink`, `muted`, `accent` {DEFAULT, hover, soft}) and the `theme.container` config (`center: true`, padding, max width 72rem).
  - **S2 Type scale & spacing:** classes for h1/h2/h3/body/small/mono-meta; section vertical rhythm.
  - **S3 Portfolio components** — exact `className` strings for: header (desktop nav, active item, mobile button, mobile panel), footer, `ButtonLink` primary/secondary, `Tag` (static and link), `SectionHeading`, field card, `ProjectCard`, filter chip (default / pressed / focus), experience timeline item, skill group, education/cert rows, contact rows, project detail layout (breadcrumb, header, overview prose via arbitrary child selectors e.g. `[&_p]:mt-4`, key-work list, tools, links, files, prev/next), 404.
  - **S4 Storybook** — `.storybook`-scoped CSS for paper background and `.story-prose` (full CSS rules, including Bengali-friendly line-height and `hr` ornament); class strings for hero frame, book-cover `StoryCard`, story header, `NarrationPlayer` (all states), `AudioDock` (music toggle + mini-player, desktop and < 640 px), `MusicToggle` with label.
  - **S5 Motion & focus:** transitions, focus ring, reduced-motion rules.
- [ ] **Step 3:** Self-check: no `dark:`; no new dependencies; one accent color on portfolio pages.

### Task 3: Reality check of this plan

**Files:** none (report).

- [ ] **Step 1:** Read the spec, this plan, and the current repository.
- [ ] **Step 2:** Verify against the installed versions in `node_modules` (not memory): `next/font/local` accepting `.woff` variable fonts with `weight: "100 900"`; `next/font/google` exports `Literata` and `Noto_Serif_Bengali` with the subsets used; react-markdown 10 default export usable in a server component; `redirects()` with `:path*`; `dynamicParams = false`; `node --test` running `lib/projects.test.mjs` that imports ESM `lib/projects.js` without `"type": "module"`.
- [ ] **Step 3:** Report blocking problems (would fail build/runtime), spec items with no task, ownership conflicts, missed bugs in the current code, and ponytail violations — each with evidence (file:line or command output).

---

### Task 4: Foundation — cleanup, config, layout, shared data, header/footer, primitives

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm), `tailwind.config.js`, `next.config.mjs`, `app/globals.css`, `app/layout.js`, `components/header.js`, `components/footer.js`, `README.md`
- Create: `lib/site.js`, `components/primitives.js`, `app/not-found.js`
- Delete: `app/portfolio/`, `app/posts/`, `app/research/`, `components/{BackgroundMusicToggle,expertise,explore,introcard,logo,mobileNav,nav,responsive-nav,socialgroup,themeSwitcher}.js`, `components/ui/`, `lib/{utils,svg,data}.js`, `components.json`, `docs/{ARCHITECTURE,CHECKLIST,FLOATING_NARRATION_PLAYER,IMPLEMENTATION_SUMMARY,README_STORYBOOK,STORYBOOK_FIXES,STORYBOOK_MUSIC_UPDATE,STORYBOOK_QUICKSTART}.md`, `public/assets/{Resume.pdf,bg-1.jpg,bg-2.jpg,bg-mobile.jpg}`, `public/images/{bg-1.png,bg-3.png,bg-mobile-2.jpg,brain-chip.webp,chip-bg.png,chip-bg-2.png,chip-bg-3.jpg,chip.png,circuit.jpg,circuit.png,under-construction.png}`, `public/icons/`

**Interfaces:**
- Consumes: UI spec S1–S3, S5; UX brief (header/footer/404 copy).
- Produces:
  - `lib/site.js` named exports `site`, `NAV`, `FIELDS`, `experience`, `activities`, `skills`, `education`, `coursework`, `certifications` (shapes below).
  - `components/primitives.js` named exports `ButtonLink({ href, children, variant = "primary" | "secondary", external = false })`, `Tag({ children, href })` (renders `next/link` when `href`), `SectionHeading({ title, description, id, as = "h2" })`.
  - Root layout renders `<BackgroundMusicProvider><NarrationPlayerProvider>…<AudioDock /></NarrationPlayerProvider></BackgroundMusicProvider>` imported from `@/providers/BackgroundMusicProvider`, `@/providers/NarrationPlayerProvider` (named exports) and `@/components/storybook/AudioDock` (default export) — created by Task 8.
  - Tailwind: `container` class and color names from UI spec S1; `font-sans` / `font-mono` map to Geist CSS variables.

- [ ] **Step 1: Remove packages**

Run: `npm uninstall three gsap lottie-web next-themes framer-motion @radix-ui/react-dialog class-variance-authority clsx tailwind-merge tailwindcss-animate`
Expected: exits 0; `package.json` dependencies left: `gray-matter, lucide-react, next, react, react-dom, react-markdown, remark-gfm`.

Then add to `package.json` scripts: `"test": "node --test lib/projects.test.mjs"`.

- [ ] **Step 2: Delete dead files**

Run: `rm -rf app/portfolio app/posts app/research components/BackgroundMusicToggle.js components/expertise.js components/explore.js components/introcard.js components/logo.js components/mobileNav.js components/nav.js components/responsive-nav.js components/socialgroup.js components/themeSwitcher.js components/ui lib/utils.js lib/svg.js lib/data.js components.json docs/ARCHITECTURE.md docs/CHECKLIST.md docs/FLOATING_NARRATION_PLAYER.md docs/IMPLEMENTATION_SUMMARY.md docs/README_STORYBOOK.md docs/STORYBOOK_FIXES.md docs/STORYBOOK_MUSIC_UPDATE.md docs/STORYBOOK_QUICKSTART.md public/assets/Resume.pdf public/assets/bg-1.jpg public/assets/bg-2.jpg public/assets/bg-mobile.jpg public/images/bg-1.png public/images/bg-3.png public/images/bg-mobile-2.jpg public/images/brain-chip.webp public/images/chip-bg.png public/images/chip-bg-2.png public/images/chip-bg-3.jpg public/images/chip.png public/images/circuit.jpg public/images/circuit.png public/images/under-construction.png public/icons`
(All are tracked in git, so they stay recoverable from history. Do not touch the git index.)

- [ ] **Step 3: `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}", "./components/**/*.{js,jsx}", "./lib/**/*.js"],
  theme: {
    container: { /* UI spec S1 */ },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: { /* UI spec S1 */ },
    },
  },
  plugins: [],
};
```
Replace both `/* UI spec S1 */` comments with the exact objects from UI spec S1. No `darkMode` key.

- [ ] **Step 4: `app/globals.css`** (whole file)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :focus-visible {
    outline: 2px solid theme("colors.accent.DEFAULT");
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Add only additional rules UI spec S5 requires.

- [ ] **Step 5: `next.config.mjs`** (whole file)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { dirs: ["app", "components", "lib", "providers"] },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/about", permanent: true },
      { source: "/research", destination: "/projects/snn-environmental-sound", permanent: true },
      { source: "/posts/:path*", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 6: `lib/site.js`** (whole file)

```js
export const site = {
  name: "Shakil Mahmud Arafat",
  headline: "Embedded Systems & VLSI Engineer",
  summary:
    "EEE graduate working across embedded systems and VLSI — firmware and PCB design, transistor-level analog design with SPICE simulation and DRC/LVS in Cadence Virtuoso, and RTL design with UVM-based verification. I use Python and object-oriented programming to automate simulation and verification.",
  location: "Dhaka, Bangladesh",
  email: "shakilmahmudarafat@gmail.com",
  availability: "Open to embedded systems and VLSI design & verification roles.",
  currentRole: {
    title: "Embedded System Engineer (R&D)",
    org: "Ulterior Engineering Intl.",
    period: "Sep 2026 – Present",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shakil-mahmud-arafat/" },
    { label: "GitHub", href: "https://github.com/s-m-arafat" },
  ],
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Storybook", href: "/storybook" },
];

export const FIELDS = [
  {
    slug: "analog",
    label: "Analog IC",
    blurb: "Transistor-level design and SPICE characterization in Cadence Virtuoso — op-amps, comparators and SRAM.",
  },
  {
    slug: "digital",
    label: "Digital & Verification",
    blurb: "RTL design, UVM and SVA verification, and synthesis through place-and-route.",
  },
  {
    slug: "embedded",
    label: "Embedded & PCB",
    blurb: "Firmware for ESP32, STM32 and AVR, industrial protocols, and PCB design in KiCad.",
  },
  {
    slug: "research",
    label: "Research",
    blurb: "Spiking neural networks for neuromorphic sound classification.",
  },
];

export const experience = [
  {
    title: "Embedded System Engineer (R&D)",
    org: "Ulterior Engineering Intl.",
    location: "Mohakhali, Dhaka",
    period: "Sep 2026 – Present",
    skills: ["STM32", "PCB design", "FPGA", "Firmware development", "Communication protocols"],
    points: [
      "Research and development on multiple MCUs and firmware development for optimized client solutions.",
      "Schematic and PCB design for customized modules; component soldering.",
    ],
  },
  {
    title: "Software Engineer",
    org: "Ekagra Health Inc.",
    orgUrl: "https://ekagrahealth.ai",
    location: "Remote, US-based",
    period: "Jul 2025 – Aug 2026",
    skills: ["Python", "Object-oriented programming", "System architecture design"],
    points: [
      "Architected and maintained EHR software using object-oriented design patterns, building modular, reusable class hierarchies for scalability and long-term maintainability.",
      "Developed an AI-assisted clinician workflow, integrating Scribing and Wound Care models into the EHR to automate clinical tasks.",
      "Led a team of 4 engineers, working with clinical product stakeholders to turn requirements into technical specs.",
    ],
  },
];

export const activities = [
  {
    title: "Programming Team Lead (R&D)",
    org: "AUST Satellite and Communication Laboratory",
    period: "Apr 2023 – Apr 2024",
    points: [
      "Experimented with an image recognition system on satellite images.",
      "Built a website and project management system for the lab.",
    ],
  },
  {
    title: "Sub-Executive (Web Team)",
    org: "AUST Innovation and Design Club",
    period: "Apr 2023 – Apr 2024",
    points: [
      "Automated email communication and certificate generation.",
      "Helped organize club workshops and events with the executive team.",
    ],
  },
];

export const skills = [
  {
    group: "Analog design",
    items: ["Transistor-level design", "Two-stage op-amps", "StrongARM comparators", "Stick diagrams", "PVT corners", "SPICE (DC, AC, transient, noise)"],
  },
  {
    group: "Digital design",
    items: ["Verilog", "SystemVerilog", "RTL design", "FSMs & sequential circuits", "RISC-V (RV32I)", "UART, SPI, I2C", "APB, AHB, AXI4-Lite"],
  },
  { group: "Verification", items: ["SystemVerilog OOP", "UVM", "SVA"] },
  {
    group: "Embedded systems",
    items: ["ESP32", "STM32", "AVR/Arduino", "ARM Cortex-M", "FPGA", "GPIO, interrupts, timers", "PWM, ADC, DMA", "FreeRTOS", "Bare-metal C/C++", "PlatformIO"],
  },
  {
    group: "Communication protocols",
    items: ["UART", "SPI", "I2C", "RS-485", "Modbus RTU/TCP", "MQTT", "Ethernet/TCP-IP"],
  },
  { group: "PCB & hardware", items: ["Altium Designer", "KiCad", "PCB soldering"] },
  {
    group: "EDA & simulation",
    items: ["Cadence Virtuoso (schematic, ADE)", "Cadence Genus", "Cadence Innovus", "DRC/LVS", "LTspice", "Proteus", "Wokwi", "Icarus Verilog", "ModelSim", "Intel Quartus", "AMD Vivado XSim", "EDA Playground"],
  },
  { group: "Programming & tools", items: ["C", "C++", "Python", "MATLAB", "Bash", "JavaScript", "Linux", "Git"] },
];

export const education = [
  {
    degree: "BSc in Electrical and Electronic Engineering",
    detail: "Major: Electronics",
    institution: "Ahsanullah University of Science and Technology (AUST), Dhaka",
    year: "2025",
  },
  { degree: "HSC, Science", institution: "New Govt. Degree College, Rajshahi", year: "2019" },
  { degree: "SSC, Science", institution: "Rajshahi Collegiate School, Rajshahi", year: "2017" },
];

export const coursework = [
  {
    name: "VLSI I",
    topics: "CMOS networks, transmission gates, pass transistors, Elmore delay, DC and transient response, linear delay model, dynamic circuits, layout, fault analysis, stick diagrams, Cadence, Verilog",
  },
  {
    name: "VLSI II",
    topics: "Physical design, floorplanning, routing (maze, dogleg, left-edge), timing analysis, KL and FM partitioning, Dijkstra's shortest path, testbenches, Genus, Innovus",
  },
  { name: "Digital Logic Design", topics: "Combinational and sequential circuits, K-maps, FSMs, memory, counters" },
  { name: "Electronic Circuits I & II", topics: "BJTs, MOSFETs, op-amps, power amplifiers, feedback amplifiers, active filters" },
  { name: "Computer Architecture", topics: "SAP I & II, cache mapping, memory organization, pipelining" },
  {
    name: "Microprocessor, Interfacing & System Design",
    topics: "16-bit architecture, memory organization, bus activities, instruction set, 8255, 8279, 8253 PIT",
  },
  { name: "Processing & Fabrication Technology" },
  { name: "Power Electronics", topics: "SCR, IGBT, GTO, TRIAC, UJT, DIAC, rectifiers, buck, boost and buck-boost converters" },
  { name: "Programming Language", topics: "C++, OOP, data structures and algorithms" },
];

export const certifications = [
  { name: "Verification Series Part 1: SystemVerilog Essentials" },
  { name: "Embedded Systems Essentials with Arm: Get Practical with Hardware", issuer: "edX" },
  { name: "Learning FPGA Development", issuer: "LinkedIn Learning" },
  { name: "15-day Design Verification (DV) and DFT training", issuer: "Ulkasemi" },
];
```

- [ ] **Step 7: `components/primitives.js`** — implement the three exports with the signatures in **Interfaces**, class strings from UI spec S3. `ButtonLink` with `external` renders `<a target="_blank" rel="noopener noreferrer">`, otherwise `next/link`. Server components (no `"use client"`).

- [ ] **Step 8: `components/header.js`** (client) — logic:

```js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus(); // the focused link is being hidden; return focus to the toggle
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Render: <header> with wordmark Link to "/" (site.name), desktop <nav aria-label="Main">
  // listing NAV with aria-current={isActive(href) ? "page" : undefined}, and a mobile
  // <button ref={buttonRef} aria-expanded={open} aria-controls="mobile-nav" aria-label="Menu"> toggling
  // <nav id="mobile-nav" aria-label="Main" hidden={!open}>; every Link in that nav gets
  // onClick={() => setOpen(false)} (tapping the current page's link leaves pathname unchanged).
  // Classes: UI spec S3 header.
}
```
Write the JSX described in the comment (replace the comment with it).

- [ ] **Step 9: `components/footer.js`** (server) — name, `© {new Date().getFullYear()}`, LinkedIn/GitHub/email links from `site`; bottom padding so the fixed AudioDock never hides footer text (UI spec S3).

- [ ] **Step 10: `app/layout.js`** (whole file; body classes from UI spec S1/S2)

```js
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AudioDock from "@/components/storybook/AudioDock";
import { BackgroundMusicProvider } from "@/providers/BackgroundMusicProvider";
import { NarrationPlayerProvider } from "@/providers/NarrationPlayerProvider";
import { site } from "@/lib/site";

const sans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-sans", weight: "100 900" });
const mono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-mono", weight: "100 900" });

export const metadata = {
  title: { default: `${site.name} — ${site.headline}`, template: `%s · ${site.name}` },
  description: site.summary,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <BackgroundMusicProvider>
          <NarrationPlayerProvider>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <AudioDock />
          </NarrationPlayerProvider>
        </BackgroundMusicProvider>
      </body>
    </html>
  );
}
```
Add the UI spec's background/text color classes to `<body>` and a visually-hidden "Skip to content" link to `#main` as the first child of `<body>`.

- [ ] **Step 11: `app/not-found.js`** — `export const metadata = { title: "Page not found" };` (use the UX brief's 404 title if it differs), heading, one sentence, `ButtonLink` to `/` and `/projects` (copy: UX brief; the sentence uses a typographic apostrophe: `This page doesn’t exist or has moved.`).

- [ ] **Step 12: `README.md`** (whole file)

````md
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
````

- [ ] **Step 13: Verify** — `npx next lint` reports no errors in Task 4 files (build is expected to fail until Tasks 5–8 land). Run `grep -rn "dark:" app components lib || echo OK`.

---

### Task 5: Project loader, filter, list and detail pages

**Files:**
- Create: `lib/projects.js`, `lib/projects.test.mjs`, `components/ProjectCard.js`, `app/projects/ProjectFilter.js`, `app/projects/[slug]/page.js`
- Modify (rewrite): `app/projects/page.js`

**Interfaces:**
- Consumes: `FIELDS` from `lib/site.js`; `ButtonLink`, `Tag`, `SectionHeading` from `components/primitives.js`; UI spec S3; UX brief (projects copy).
- Produces:
  - `getAllProjects(dir?) => Project[]` sorted by `order`; `getProject(slug) => Project | undefined`, where `Project = { slug, title, summary, fields: string[], context?: string, period?: string, order: number, featured: boolean, tools: string[], highlights: string[], links: {label, href}[], files: {label, href}[], body: string }`.
  - `components/ProjectCard.js` default export `ProjectCard({ project })` and named export `ProjectGrid({ projects })`; both accept objects with at least `slug, title, summary, fields, tools`.

- [ ] **Step 1: Write the failing test** — `lib/projects.test.mjs`

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getAllProjects } from "./projects.js";

test("loads all 14 projects with expected field counts", () => {
  const projects = getAllProjects();
  assert.equal(projects.length, 14);
  const count = (field) => projects.filter((p) => p.fields.includes(field)).length;
  assert.deepEqual(
    ["analog", "digital", "embedded", "research"].map(count),
    [3, 5, 6, 1],
  );
  assert.equal(projects.filter((p) => p.featured).length, 4);
});

test("rejects unknown fields and missing files", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "projects-"));
  const write = (fm) => fs.writeFileSync(path.join(dir, "bad.md"), `---\n${fm}\n---\nBody\n`);

  write("title: X\nsummary: Y\nfields: [cooking]\ntools: []\nhighlights: []");
  assert.throws(() => getAllProjects(dir), /unknown field "cooking"/);

  write("title: X\nsummary: Y\nfields: [analog]\ntools: []\nhighlights: []\nfiles:\n  - { label: Gone, href: /projects/bad/gone.pdf }");
  assert.throws(() => getAllProjects(dir), /file not found/);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test lib/projects.test.mjs`
Expected: FAIL — cannot find module `./projects.js`.

- [ ] **Step 3: Implement `lib/projects.js`** (whole file)

```js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FIELDS } from "./site.js";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const FIELD_SLUGS = new Set(FIELDS.map((f) => f.slug));

function parse(dir, file) {
  const fail = (msg) => {
    throw new Error(`content/projects/${file}: ${msg}`);
  };
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));

  if (!data.title || !data.summary) fail("title and summary are required");
  if (!Array.isArray(data.fields) || data.fields.length === 0) fail("fields must be a non-empty list");
  for (const field of data.fields) if (!FIELD_SLUGS.has(field)) fail(`unknown field "${field}"`);
  for (const key of ["tools", "highlights"]) {
    if (!Array.isArray(data[key]) || !data[key].every((x) => typeof x === "string")) fail(`${key} must be a list of strings`);
  }

  const links = data.links ?? [];
  const files = data.files ?? [];
  if (!Array.isArray(links) || !Array.isArray(files)) fail("links and files must be lists");
  for (const link of links) if (!/^https:\/\//.test(link.href ?? "")) fail(`link "${link.label}" must use https`);
  for (const f of files) {
    if (!f.href?.startsWith(`/projects/${slug}/`)) fail(`file "${f.label}" must live in /projects/${slug}/`);
    if (!fs.statSync(path.join(PUBLIC_DIR, f.href), { throwIfNoEntry: false })?.isFile()) fail(`file not found: public${f.href}`);
  }

  return {
    ...data,
    slug,
    period: data.period == null ? undefined : String(data.period),
    order: data.order ?? 999,
    featured: Boolean(data.featured),
    links,
    files,
    body: content.trim(),
  };
}

export function getAllProjects(dir = CONTENT_DIR) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parse(dir, file))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug) {
  return getAllProjects().find((p) => p.slug === slug);
}
```

- [ ] **Step 4: Run the test** — `node --test lib/projects.test.mjs`. Expected: test 2 PASS. Until all 14 Task 6 files exist, test 1 fails with ENOENT (no `content/projects/` yet) or on the counts — do not change the loader for this; it is re-run in Task 9. The `MODULE_TYPELESS_PACKAGE_JSON` warning is expected; do not add `"type": "module"` to package.json (`tailwind.config.js` is CommonJS).

- [ ] **Step 5: `components/ProjectCard.js`** (server; classes from UI spec S3)

```js
import Link from "next/link";
import { FIELDS } from "@/lib/site";

const label = (slug) => FIELDS.find((f) => f.slug === slug)?.label;

export default function ProjectCard({ project }) {
  // Single <Link href={`/projects/${project.slug}`}> wrapping: field labels (fields.map(label)),
  // <h3>{title}</h3>, <p>{summary}</p>, first 4 tools as mono chips (+N more when longer).
}

export function ProjectGrid({ projects }) {
  // <ul role="list"> grid; each <li> renders <ProjectCard project={p} />.
}
```
Replace the comments with the described JSX.

- [ ] **Step 6: `app/projects/ProjectFilter.js`** (client)

```js
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FIELDS } from "@/lib/site";
import { ProjectGrid } from "@/components/ProjectCard";

export default function ProjectFilter({ projects }) {
  const router = useRouter();
  const requested = useSearchParams().get("field");
  const active = FIELDS.some((f) => f.slug === requested) ? requested : null;
  const shown = active ? projects.filter((p) => p.fields.includes(active)) : projects;
  const count = (slug) => projects.filter((p) => p.fields.includes(slug)).length;
  const select = (slug) => router.replace(slug ? `/projects?field=${slug}` : "/projects", { scroll: false });

  const chips = [{ slug: null, label: "All", n: projects.length }, ...FIELDS.map((f) => ({ ...f, n: count(f.slug) }))];

  // Render: <div role="group" aria-label="Filter by field"> of <button type="button"
  // aria-pressed={active === chip.slug} onClick={() => select(chip.slug)}>{label} {n}</button>;
  // <p aria-live="polite">{shown.length} projects</p> (exact wording: UX brief); <ProjectGrid projects={shown} />.
}
```
Replace the comment with the described JSX.

- [ ] **Step 7: `app/projects/page.js`** (whole file; headings/intro copy from UX brief)

```js
import { Suspense } from "react";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectCard";
import ProjectFilter from "./ProjectFilter";

export const metadata = { title: "Projects", description: "Analog IC, digital verification, embedded and research projects." };

export default function ProjectsPage() {
  const projects = getAllProjects().map(({ slug, title, summary, fields, tools }) => ({ slug, title, summary, fields, tools }));
  return (
    <div className="container py-12">
      {/* h1 + intro from UX brief, classes from UI spec */}
      <Suspense fallback={<ProjectGrid projects={projects} />}>
        <ProjectFilter projects={projects} />
      </Suspense>
    </div>
  );
}
```
Replace the JSX comment with the heading and intro.

- [ ] **Step 8: `app/projects/[slug]/page.js`**

```js
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllProjects, getProject } from "@/lib/projects";
import { FIELDS } from "@/lib/site";
import { Tag } from "@/components/primitives";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[index - 1];
  const next = projects[index + 1];

  // Render in this order (UI spec S3 "project detail", UX brief headings):
  // breadcrumb nav (Link "/projects" › title, aria-label="Breadcrumb");
  // header: <h1>; field tags as
  //   {project.fields.map((field) => <li key={field}><Tag href={`/projects?field=${field}`}>{FIELDS.find((f) => f.slug === field).label}</Tag></li>)};
  //   meta line with context/period only when present, summary lead;
  // <section> Key work: <ul> highlights;
  // <section> Tools & skills: Tag list;
  // links.length > 0 && <section> Links: external <a target="_blank" rel="noopener noreferrer">;
  // files.length > 0 && <section> Files: <a href target="_blank" rel="noopener noreferrer">;
  // project.body && <section> Overview: <Markdown remarkPlugins={[remarkGfm]}>{project.body}</Markdown>;
  // <nav aria-label="More projects"> prev/next Links (title + direction label), omitted at the ends.
}
```
Replace the comment block with the described JSX.

- [ ] **Step 9: Verify** — `node --test lib/projects.test.mjs` (see Step 4 note) and `npx next lint`.

---

### Task 6: Project content (14 files)

**Files:** Create `content/projects/{two-stage-op-amp,strongarm-comparator,6t-sram-array,uvm-sram-verification,axi4-lite-uvm-sva,rv32i-pipelined-core,sv32-mmu-synthesis-pnr,h-bridge-motor-driver,48v-relay-lockout-controller,rs485-modbus-rtu-bridge,attiny85-hardware-watchdog,modbus-tcp-mqtt-dashboard,rf-remote-controlled-car,snn-environmental-sound}.md`

**Interfaces:** Produces files matching the Task 5 loader contract. Consumes spec Appendix A (authoritative list of slug, title, fields, order, featured, context, period, tools, highlights, links) and the UX brief content style rules.

- [ ] **Step 1:** For each of the 14 Appendix A projects, create the file with frontmatter copied exactly from Appendix A (title, fields, order, `featured: true` only for the four marked, `context`/`period`/`links` only where listed, tools, highlights) plus a `summary` (≤ 160 characters, factual) and a Markdown overview body of 2–3 short paragraphs. Quote YAML strings that contain `:` or start with a digit or special character. Format reference — the complete first file:

```md
---
title: Two-Stage Miller-Compensated Op-Amp
summary: Transistor-level two-stage op-amp with Miller compensation and current-mirror biasing, designed and simulated in Cadence Virtuoso.
fields: [analog]
order: 10
tools: [Cadence Virtuoso, ADE, SPICE simulation]
highlights:
  - Designed a two-stage op-amp with Miller compensation and current-mirror biasing in Cadence Virtuoso.
  - Simulated gain, phase margin and slew rate.
---
A two-stage operational amplifier pairs a high-gain differential input stage with a common-source second stage that provides output swing. Because the second stage adds a pole close to the first, a Miller compensation capacitor across it splits the poles and keeps the amplifier stable in feedback.

The amplifier was designed at transistor level in Cadence Virtuoso, with current mirrors setting the bias currents of both stages. Simulations covered open-loop gain, phase margin and slew rate — the figures that trade against each other when sizing the compensation capacitor and bias currents.
```

- [ ] **Step 2:** Content rules: body may add only definitional context (what a technique/protocol/component is and why it is used). No numbers, results, dates, team sizes, links, file references or tools not present in Appendix A. No first-person hype. No mention of stories/storybook.
- [ ] **Step 3: Verify** — `node --test lib/projects.test.mjs` passes (requires Task 5 loader), and `grep -rniE "storybook|narrat" content/projects || echo OK`.

---

### Task 7: Home, About, Contact

**Files:**
- Modify (rewrite): `app/page.js`, `app/contact/page.js`
- Create: `app/about/page.js`, `app/contact/CopyEmailButton.js`

**Interfaces:**
- Consumes: `site`, `FIELDS`, `experience`, `activities`, `skills`, `education`, `coursework`, `certifications` from `lib/site.js`; `getAllProjects()` from `lib/projects.js`; `ProjectCard` / `ProjectGrid` from `components/ProjectCard.js`; primitives; UI spec S3; UX brief copy.
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: `app/page.js`** — data logic (JSX per UX brief section order, classes per UI spec):

```js
import { getAllProjects } from "@/lib/projects";
import { FIELDS, site } from "@/lib/site";
import { ProjectGrid } from "@/components/ProjectCard";
import { ButtonLink, SectionHeading } from "@/components/primitives";

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const count = (slug) => projects.filter((p) => p.fields.includes(slug)).length;
  const fieldCards = FIELDS.filter((f) => f.slug !== "research");
  // Sections: hero (site.name as h1, site.headline, site.summary, site.location,
  // ButtonLink "/projects" primary + "/contact" secondary, LinkedIn/GitHub/email links);
  // current role line (site.currentRole); field cards → `/projects?field=${f.slug}` with count(f.slug);
  // featured <ProjectGrid projects={featured} />; contact band.
}
```
No `metadata` export (root default title applies).

- [ ] **Step 2: `app/about/page.js`** — `export const metadata = { title: "About", description: site.summary }`; sections in UX brief order rendering `experience` (title, org — linked when `orgUrl` via external `<a>`, location, period, points, skills as Tags), `activities`, `skills`, `education` (no grades — the data has none), `coursework` (name + topics when present), `certifications` (name + issuer when present).
- [ ] **Step 3: `app/contact/CopyEmailButton.js`** (whole file; classes from UI spec)

```js
"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy}>
      <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
    </button>
  );
}
```

- [ ] **Step 4: `app/contact/page.js`** — `export const metadata = { title: "Contact", description: site.availability }`; email as `mailto:` link + `<CopyEmailButton email={site.email} />`; LinkedIn and GitHub as external links; location; availability. No form, no phone.
- [ ] **Step 5: Verify** — `npx next lint`; `grep -rniE "story|storybook|narrat|phone|cgpa|gpa|facebook" app/page.js app/about app/contact || echo OK`.

---

### Task 8: Storybook and audio

**Files:**
- Rewrite: `providers/BackgroundMusicProvider.js`, `providers/NarrationPlayerProvider.js`, `components/storybook/StoryCard.js`, `components/storybook/NarrationPlayer.js`, `app/storybook/page.js`, `app/storybook/[slug]/page.js`, `content/stories/story-of-the-memories.json`, `lib/stories.js`
- Create: `components/storybook/AudioDock.js`, `components/storybook/MusicToggle.js`, `app/storybook/layout.js`, `app/storybook/storybook.css`
- Delete: `components/storybook/{ThreeScene,LottieAnimation,MediaPlayer,IllustFrame,LoadingPlaceholder,ErrorFallback,MusicToggleButton,StorybookEmptyState,StoryGrid,StoryLayout,StorybookHero,FloatingNarrationPlayer}.js`, `app/storybook/StorybookClient.js`, `app/storybook/[slug]/StoryContent.js`, `hooks/`, `content/stories/the-time-weaver.json`, `public/assets/stories/audio/nostalogia.wav`, `public/assets/stories/audio/README.md`

**Interfaces:**
- Consumes: UI spec S4; UX brief audio + storybook sections. `lib/stories.js` keeps its export names `getAllStories`, `getStoryBySlug`, `getAllStorySlugs` (rewritten in Step 1b).
- Produces (used by Task 4 layout): named `BackgroundMusicProvider`, `useBackgroundMusic`; named `NarrationPlayerProvider`, `useNarration`, `formatTime`; default `AudioDock`.

- [ ] **Step 1: Delete** — `rm -r` the files listed under Delete.
- [ ] **Step 1b: `lib/stories.js`** (whole file) — the current version swallows every error, so a malformed story silently empties the storybook and 404s every story URL. Let bad content fail the build with the file name:

```js
import fs from "fs";
import path from "path";

const STORIES_DIR = path.join(process.cwd(), "content/stories");

function readStory(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(STORIES_DIR, file), "utf8"));
  } catch (err) {
    throw new Error(`content/stories/${file}: ${err.message}`);
  }
}

export function getAllStories() {
  return fs
    .readdirSync(STORIES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map(readStory)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getStoryBySlug(slug) {
  return getAllStories().find((story) => story.slug === slug);
}

export function getAllStorySlugs() {
  return getAllStories().map((story) => story.slug);
}
```
- [ ] **Step 2: `providers/BackgroundMusicProvider.js`** (whole file)

```js
"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const SRC = "/assets/stories/audio/background-music.mp3";
const BackgroundMusicContext = createContext(null);

export function BackgroundMusicProvider({ children }) {
  const audioRef = useRef(null);
  const playingRef = useRef(false);
  const duckedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const setOn = useCallback((on) => {
    playingRef.current = on;
    setPlaying(on);
  }, []);

  const start = useCallback(() => {
    // Created on first use so visitors who never press play don't download the track.
    audioRef.current ??= Object.assign(new Audio(SRC), { loop: true, volume: 0.3 });
    audioRef.current.play().catch((err) => {
      if (err.name === "AbortError") return; // our own pause() (duck/toggle) interrupted a pending play()
      console.warn("Background music could not start:", err.message);
      setOn(false);
    });
  }, [setOn]);

  const toggle = useCallback(() => {
    const on = !playingRef.current;
    setOn(on);
    if (!on) audioRef.current?.pause();
    else if (!duckedRef.current) start();
  }, [setOn, start]);

  const duck = useCallback(() => {
    duckedRef.current = true;
    audioRef.current?.pause();
  }, []);

  const unduck = useCallback(() => {
    duckedRef.current = false;
    if (playingRef.current) start();
  }, [start]);

  const value = useMemo(() => ({ playing, toggle, duck, unduck }), [playing, toggle, duck, unduck]);
  return <BackgroundMusicContext.Provider value={value}>{children}</BackgroundMusicContext.Provider>;
}

export function useBackgroundMusic() {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) throw new Error("useBackgroundMusic must be used inside BackgroundMusicProvider");
  return ctx;
}
```

- [ ] **Step 3: `providers/NarrationPlayerProvider.js`** (whole file)

```js
"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useBackgroundMusic } from "./BackgroundMusicProvider";

const NarrationContext = createContext(null);

export const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function NarrationPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const { duck, unduck } = useBackgroundMusic();
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);
  const [rate, setRateState] = useState(1);

  // Status comes from media events only, so every view (inline player, mini-player,
  // lock screen) stays consistent and background music ducks no matter who pressed play.
  useEffect(() => {
    const a = audioRef.current;
    const handlers = {
      play: duck, // "waiting" or "playing" always follows and sets the status
      playing: () => setStatus("playing"),
      waiting: () => setStatus("loading"),
      pause: () => {
        setStatus((s) => (s === "error" || s === "idle" ? s : "paused"));
        unduck();
      },
      error: () => {
        if (!a.getAttribute("src")) return; // clearing the source on close is not an error
        setStatus("error");
        unduck();
      },
      timeupdate: () => setCurrentTime(a.currentTime),
      durationchange: () => setDuration(Number.isFinite(a.duration) ? a.duration : 0),
      volumechange: () => {
        setVolumeState(a.volume);
        setMuted(a.muted);
      },
      ratechange: () => setRateState(a.playbackRate),
    };
    for (const [name, fn] of Object.entries(handlers)) a.addEventListener(name, fn);
    return () => {
      for (const [name, fn] of Object.entries(handlers)) a.removeEventListener(name, fn);
    };
  }, [duck, unduck]);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (a.error) a.load();
    a.play().catch((err) => {
      if (err.name === "NotAllowedError") setStatus("paused");
    });
  }, []);

  const pause = useCallback(() => audioRef.current.pause(), []);

  // After a media error some browsers leave paused === false, so treat an errored element as paused.
  const toggle = useCallback(() => (audioRef.current.paused || audioRef.current.error ? play() : pause()), [play, pause]);

  const load = useCallback(
    (next, { autoplay = false } = {}) => {
      const a = audioRef.current;
      setTrack(next);
      if (a.getAttribute("src") !== next.url) {
        a.src = next.url;
        setCurrentTime(0);
        setDuration(0);
        setStatus("paused");
      }
      if (autoplay) play();
      else unduck(); // changing src pauses without a "pause" event
    },
    [play, unduck],
  );

  const seek = useCallback((t) => {
    const a = audioRef.current;
    const max = Number.isFinite(a.duration) ? a.duration : 0;
    a.currentTime = Math.min(Math.max(0, t), max);
    setCurrentTime(a.currentTime);
  }, []);

  const skip = useCallback((delta) => seek(audioRef.current.currentTime + delta), [seek]);

  const setVolume = useCallback((v) => {
    const a = audioRef.current;
    a.volume = v;
    if (v > 0) a.muted = false;
  }, []);

  const toggleMute = useCallback(() => {
    audioRef.current.muted = !audioRef.current.muted;
  }, []);

  const setRate = useCallback((r) => {
    const a = audioRef.current;
    // defaultPlaybackRate survives a source reload; playbackRate alone resets.
    a.defaultPlaybackRate = r;
    a.playbackRate = r;
  }, []);

  const close = useCallback(() => {
    const a = audioRef.current;
    a.pause();
    a.removeAttribute("src");
    a.load();
    setTrack(null);
    setStatus("idle");
    setCurrentTime(0);
    setDuration(0);
    unduck();
  }, [unduck]);

  useEffect(() => {
    if (!track || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: "Storybook",
      artwork: track.artwork ? [{ src: track.artwork }] : [],
    });
    const actions = {
      play,
      pause,
      seekbackward: () => skip(-10),
      seekforward: () => skip(10),
      seekto: (details) => seek(details.seekTime),
    };
    for (const [name, fn] of Object.entries(actions)) {
      try {
        navigator.mediaSession.setActionHandler(name, fn);
      } catch {} // action unsupported by this browser
    }
    return () => {
      for (const name of Object.keys(actions)) {
        try {
          navigator.mediaSession.setActionHandler(name, null);
        } catch {} // action unsupported by this browser
      }
    };
  }, [track, play, pause, skip, seek]);

  const value = useMemo(
    () => ({ track, status, currentTime, duration, volume, muted, rate, load, play, pause, toggle, seek, skip, setVolume, toggleMute, setRate, close }),
    [track, status, currentTime, duration, volume, muted, rate, load, play, pause, toggle, seek, skip, setVolume, toggleMute, setRate, close],
  );

  return (
    <NarrationContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </NarrationContext.Provider>
  );
}

export function useNarration() {
  const ctx = useContext(NarrationContext);
  if (!ctx) throw new Error("useNarration must be used inside NarrationPlayerProvider");
  return ctx;
}
```

- [ ] **Step 4: `components/storybook/MusicToggle.js`** (whole file; classes UI spec S4)

```js
"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useBackgroundMusic } from "@/providers/BackgroundMusicProvider";

export default function MusicToggle({ showLabel = false }) {
  const { playing, toggle } = useBackgroundMusic();
  const Icon = playing ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={showLabel ? undefined : "Background music"}
      title="Background music"
    >
      <Icon aria-hidden="true" />
      {showLabel && <span>Background music</span>}
    </button>
  );
}
```

- [ ] **Step 5: `components/storybook/NarrationPlayer.js`** (client; classes UI spec S4, copy UX brief)

```js
"use client";

import { Headphones, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";
import { RATES, formatTime, useNarration } from "@/providers/NarrationPlayerProvider";

export default function NarrationPlayer({ track }) {
  const p = useNarration();
  const loaded = p.track?.url === track.url;
  const busy = loaded && (p.status === "playing" || p.status === "loading");
  // One return: the primary button keeps its parent and slot in both states, so React reuses
  // its DOM node and keyboard/screen-reader focus survives "Listen" -> "Pause".
  return (
    <section aria-label="Audio narration">
      <div>
        {loaded && (
          <button type="button" onClick={() => p.skip(-10)} aria-label="Back 10 seconds">
            <RotateCcw aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={loaded ? p.toggle : () => p.load(track, { autoplay: true })}
          aria-label={loaded ? (busy ? "Pause" : "Play") : undefined}
        >
          {busy ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {!loaded && " Listen to this story"}
        </button>
        {loaded && (
          <button type="button" onClick={() => p.skip(10)} aria-label="Forward 10 seconds">
            <RotateCw aria-hidden="true" />
          </button>
        )}
      </div>
      {loaded ? (
        <>
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
          />
          <p>
            <span>{formatTime(p.currentTime)}</span> / <span>{formatTime(p.duration)}</span>
          </p>
          <label>
            Speed
            <select value={p.rate} onChange={(e) => p.setRate(Number(e.target.value))}>
              {RATES.map((r) => (
                <option key={r} value={r}>
                  {r}×
                </option>
              ))}
            </select>
          </label>
          <div className="hidden sm:flex">
            <button type="button" onClick={p.toggleMute} aria-label={p.muted ? "Unmute" : "Mute"}>
              {p.muted || p.volume === 0 ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={p.muted ? 0 : p.volume}
              onChange={(e) => p.setVolume(Number(e.target.value))}
              aria-label="Volume"
            />
          </div>
          {p.status === "loading" && <p role="status">Loading…</p>}
          {p.status === "error" && (
            <p role="alert">
              Couldn’t load the audio.{" "}
              <button type="button" onClick={p.play}>
                Try again
              </button>
            </p>
          )}
        </>
      ) : (
        <p>
          <Headphones aria-hidden="true" /> Best with headphones
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 6: `components/storybook/AudioDock.js`** (client; classes UI spec S4)

```js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pause, Play, X } from "lucide-react";
import MusicToggle from "./MusicToggle";
import { RATES, formatTime, useNarration } from "@/providers/NarrationPlayerProvider";

export default function AudioDock() {
  const pathname = usePathname();
  const p = useNarration();
  // The inline player already shows on the track's own story page.
  const showMini = p.track && pathname !== `/storybook/${p.track.slug}`;
  const busy = p.status === "playing" || p.status === "loading";

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-2">
      {showMini && (
        <div role="region" aria-label="Now playing">
          <Link lang={p.track.lang} href={`/storybook/${p.track.slug}`}>{p.track.title}</Link>
          <button type="button" onClick={p.toggle} aria-label={busy ? "Pause narration" : "Play narration"}>
            {busy ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
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
          />
          <span>
            {formatTime(p.currentTime)} / {formatTime(p.duration)}
          </span>
          <select aria-label="Speed" value={p.rate} onChange={(e) => p.setRate(Number(e.target.value))}>
            {RATES.map((r) => (
              <option key={r} value={r}>
                {r}×
              </option>
            ))}
          </select>
          <button type="button" onClick={p.close} aria-label="Close player">
            <X aria-hidden="true" />
          </button>
        </div>
      )}
      <MusicToggle />
    </div>
  );
}
```
Apply UI spec S4.8 classes: the title link, time text and speed select are hidden below 640 px (only play/pause, seek and close remain), and the dock offsets include `env(safe-area-inset-*)`. Tailwind utilities only — no `.storybook` selectors or book fonts.

- [ ] **Step 7: `app/storybook/layout.js`** (whole file)

```js
import { Literata, Noto_Serif_Bengali } from "next/font/google";
import "./storybook.css";

const book = Literata({ subsets: ["latin"], variable: "--font-book" });
const bengali = Noto_Serif_Bengali({ subsets: ["bengali"], variable: "--font-bengali" });

export default function StorybookLayout({ children }) {
  return <div className={`storybook ${book.variable} ${bengali.variable}`}>{children}</div>;
}
```

- [ ] **Step 8: `app/storybook/storybook.css`** — the full `.storybook`-scoped CSS from UI spec S4 (paper background, `font-family: var(--font-book), var(--font-bengali), Georgia, serif;`, `.story-prose` rules). Every selector starts with `.storybook`.

- [ ] **Step 9: `components/storybook/StoryCard.js`** (server; no framer-motion)

```js
import Image from "next/image";
import Link from "next/link";

export default function StoryCard({ story }) {
  // Single <Link href={`/storybook/${story.slug}`}>: cover <Image src={story.coverImage} alt="" fill
  // sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"> in an aspect box;
  // <h2 lang={story.lang}>{title}</h2>; <p lang={story.lang}>{shortDescription}</p>; tags list.
}
```
Replace the comment with the described JSX (UI spec S4 book-cover card).

- [ ] **Step 10: `app/storybook/page.js`**

```js
import { getAllStories } from "@/lib/stories";
import StoryCard from "@/components/storybook/StoryCard";
import MusicToggle from "@/components/storybook/MusicToggle";

export const metadata = { title: "Storybook", description: "Illustrated stories with narration." };

export default function StorybookPage() {
  const stories = getAllStories();
  // Hero: <video src="/assets/stories/videos/kashful.mp4#t=0,5" autoPlay muted playsInline (no loop: WCAG 2.2.2)
  //   aria-hidden="true" className="... motion-reduce:hidden" /> in a frontispiece frame with the S4.3 title plate,
  //   <h1>Storybook</h1>, one-line intro (UX brief), <MusicToggle showLabel />.
  // List: <ul> of <li><StoryCard story={s} /></li>; when stories.length === 0, the UX brief empty-state line.
}
```
Replace the comment with the described JSX.

- [ ] **Step 11: `app/storybook/[slug]/page.js`**

```js
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

  // <article>: back Link "/storybook" (UX brief label); cover <Image alt="" fill priority
  // sizes="(min-width: 768px) 768px, 100vw"> in an aspect box; <h1 lang={story.lang}>;
  // byline: author · <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>; tags;
  // {story.audio?.narrationUrl && <NarrationPlayer track={{ url: story.audio.narrationUrl,
  //   title: story.title, slug: story.slug, artwork: story.coverImage, lang: story.lang }} />}
  // <div className="story-prose" lang={story.lang}><Markdown remarkPlugins={[remarkGfm]}>{story.content}</Markdown></div>
  // {story.illustration && <figure> end-plate <Image src={story.illustration} alt="" width={1200} height={800} />}
}
```
Replace the comment block with the described JSX.

- [ ] **Step 12: `content/stories/story-of-the-memories.json`** — set `"narrationUrl": "/assets/stories/audio/nostalogia-remastered.mp3"`, add `"lang": "bn"`, set `"coverImage"` to `"https://images.unsplash.com/photo-1651785070790-aee952ba32f4?w=1600&q=80&auto=format&fit=crop"`. Leave all other fields untouched.
- [ ] **Step 13: Verify** — `npx next lint`; `grep -rn "three\|gsap\|lottie\|framer-motion\|useAutoPlayMusic\|FloatingNarrationPlayer" app components providers || echo OK`.

---

### Task 9: Integrate and verify

**Files:** any, only to fix failures found here.

- [ ] **Step 1:** `npm test` → PASS (2 tests).
- [ ] **Step 2:** `npx next lint` → "No ESLint warnings or errors".
- [ ] **Step 3:** `npx next build` → success; route list includes `/`, `/about`, `/contact`, `/projects`, 14 `/projects/[slug]`, `/storybook`, `/storybook/story-of-the-memories`, `/_not-found`; no `/portfolio`, `/posts`, `/research`.
- [ ] **Step 4:** Greps (each prints OK):

```bash
grep -rn "dark:" app components lib providers || echo OK-dark
grep -rnE "from ['\"](three|gsap|lottie-web|next-themes|framer-motion|@radix-ui/react-dialog|class-variance-authority|clsx|tailwind-merge)" app components lib providers || echo OK-deps
grep -rnE 'href="#"|your-email|text-paragraph' app components lib || echo OK-placeholders
grep -rliwE "story|stories|storybook|narration|narrator" app/page.js app/about app/contact app/projects components/header.js components/footer.js components/primitives.js components/ProjectCard.js content/projects || echo OK-no-mentions
node -e "const d=Object.keys(require('./package.json').dependencies).sort().join(',');if(d!=='gray-matter,lucide-react,next,react,react-dom,react-markdown,remark-gfm')throw new Error(d);console.log('OK-package')"
```

- [ ] **Step 5:** Screenshots — `npx next start -p 3100` in background, then for each URL in spec §11.4 at 390×844 and 1280×800:
  `google-chrome --headless=new --no-sandbox --hide-scrollbars --virtual-time-budget=5000 --window-size=W,H --screenshot=<scratchpad>/<name>-W.png http://localhost:3100<path>`; also a tall capture at 1280×3200 for `/`, `/about` and one project page. Inspect each image; fix layout defects (overflow, overlap, unreadable contrast, dock covering content).
- [ ] **Step 6:** Stop the server. Report: command outputs + screenshot paths.

---

### Task 10: Code review (independent lenses)

- [ ] Review the full working-tree diff against `v0.4` (`git diff v0.4 --stat` + read changed files) through separate lenses: (a) Next.js/React correctness (RSC boundaries, hooks, hydration, Suspense, metadata, static generation); (b) audio logic (event ordering, ducking in every path, close/reload, Media Session, stale closures); (c) accessibility (keyboard, names, roles, contrast, reduced motion, focus); (d) spec & content compliance (§2 decisions, §9 bug list each resolved, Appendix A fidelity of `lib/site.js` and all 14 project files — cross-check the CV PDFs); (e) ponytail over-engineering (dead code, unused exports, needless abstractions, leftover files/deps).
- [ ] Each finding: file:line, concrete failure scenario, severity. Each finding is then independently verified (default to "not a bug" unless reproduced from code).

### Task 11: Fix confirmed findings

- [ ] Fix each confirmed finding with the smallest correct change; re-run Task 9 Steps 1–4.

### Task 12: Final reality check

- [ ] Re-run Task 9 Steps 1–5 independently. Additionally drive the running site with Chrome DevTools Protocol (headless Chrome `--remote-debugging-port`, `--autoplay-policy=no-user-gesture-required`; Node 25 global `WebSocket`; script lives in the scratchpad, not the repo). The background-music `Audio` is not in the DOM, so first instrument media via `Page.addScriptToEvaluateOnNewDocument` (wrap `HTMLMediaElement.prototype.play`/`pause` to record each element's `src` and paused state on `window`). Assert: on `/storybook/story-of-the-memories` clicking "Listen to this story" makes the single narration `<audio>` play and keyboard focus stays on that button (`document.activeElement`); toggling music on then starting narration leaves the music `Audio` paused, and pausing narration resumes it; client-side navigation to `/projects` keeps narration playing and shows the mini-player; the mini-player is absent on the story page; closing it stops audio; `document.querySelectorAll("audio").length === 1`; `/projects?field=embedded` shows 6 cards with the Embedded chip `aria-pressed="true"`; `/portfolio` redirects to `/about`.
- [ ] Verdict per spec §9 bug ID and §11 check with evidence; default NEEDS WORK unless every item has evidence.
