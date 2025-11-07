# 🗺️ Storybook Component Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Root Layout                              │
│                      (app/layout.js)                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         BackgroundMusicProvider (Global)                  │  │
│  │  - Manages global background music                        │  │
│  │  - Persists user preferences (localStorage)               │  │
│  │  - Provides pause/resume controls                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         BackgroundMusicToggle (Global)                    │  │
│  │  - Fixed position button (bottom-right)                   │  │
│  │  - Toggles background music on/off                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Page: /storybook (Story Collection)

```
┌─────────────────────────────────────────────────────────────────┐
│                     Storybook Index Page                         │
│                  (app/storybook/page.js)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   Page Header                           │    │
│  │  - Title: "Storybook"                                   │    │
│  │  - Description                                           │    │
│  │  - Icon                                                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   StoryGrid                             │    │
│  │                                                          │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │    │
│  │  │  StoryCard   │  │  StoryCard   │  │  StoryCard   │ │    │
│  │  │              │  │              │  │              │ │    │
│  │  │  - Cover     │  │  - Cover     │  │  - Cover     │ │    │
│  │  │  - Title     │  │  - Title     │  │  - Title     │ │    │
│  │  │  - Desc      │  │  - Desc      │  │  - Desc      │ │    │
│  │  │  - Tags      │  │  - Tags      │  │  - Tags      │ │    │
│  │  │  - Author    │  │  - Author    │  │  - Author    │ │    │
│  │  │              │  │              │  │              │ │    │
│  │  │  [Animated]  │  │  [Animated]  │  │  [Animated]  │ │    │
│  │  │  [Link to]   │  │  [Link to]   │  │  [Link to]   │ │    │
│  │  │  detail page │  │  detail page │  │  detail page │ │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │    │
│  │                                                          │    │
│  │  [Responsive Grid: 1 col (mobile), 2 (tablet), 3 (desktop)]│
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Page: /storybook/[slug] (Story Detail)

```
┌─────────────────────────────────────────────────────────────────┐
│                 Story Detail Page Layout                         │
│              (app/storybook/[slug]/page.js)                     │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                  StoryLayout                            │    │
│  │  - Custom background color                              │    │
│  │  - Background illustration (optional)                   │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │         StoryContent Component                    │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  Back to Stories Link                       │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  Cover Image (Next.js Image optimized)     │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  Story Title & Meta                         │ │  │    │
│  │  │  │  - Author                                    │ │  │    │
│  │  │  │  - Published Date                            │ │  │    │
│  │  │  │  - Tags                                      │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  NarrationPlayer (if audio provided)        │ │  │    │
│  │  │  │  - Play/Pause button                        │ │  │    │
│  │  │  │  - Progress bar (seekable)                  │ │  │    │
│  │  │  │  - Time display                             │ │  │    │
│  │  │  │  - Restart button                           │ │  │    │
│  │  │  │  [Auto-pauses background music]             │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  Story Content (Markdown)                   │ │  │    │
│  │  │  │  - ReactMarkdown component                  │ │  │    │
│  │  │  │  - GitHub Flavored Markdown support         │ │  │    │
│  │  │  │  - Styled with Tailwind prose               │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  LottieAnimation (if provided)              │ │  │    │
│  │  │  │  - Dynamically imported                     │ │  │    │
│  │  │  │  - Loading placeholder shown first          │ │  │    │
│  │  │  │  - Configurable loop/autoplay               │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  ThreeScene (if provided)                   │ │  │    │
│  │  │  │  - Dynamically imported                     │ │  │    │
│  │  │  │  - Three.js + GSAP animations               │ │  │    │
│  │  │  │  - Loading placeholder shown first          │ │  │    │
│  │  │  │  - Example: rotating cube                   │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  MediaPlayer (if videos provided)           │ │  │    │
│  │  │  │  - HTML5 video player                       │ │  │    │
│  │  │  │  - Multiple video support                   │ │  │    │
│  │  │  │  - Video selector buttons                   │ │  │    │
│  │  │  │  - Caption display                          │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  │  ┌─────────────────────────────────────────────┐ │  │    │
│  │  │  │  IllustFrame (if illustration provided)     │ │  │    │
│  │  │  │  - Decorative illustration                  │ │  │    │
│  │  │  │  - Background or inline display             │ │  │    │
│  │  │  └─────────────────────────────────────────────┘ │  │    │
│  │  │                                                    │  │    │
│  │  └────────────────────────────────────────────────┘  │    │
│  │                                                          │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        Story Data Flow                           │
└─────────────────────────────────────────────────────────────────┘

[JSON Files in content/stories/]
          ↓
    lib/stories.js
    - getAllStories()
    - getStoryBySlug()
    - getAllStorySlugs()
          ↓
    ┌─────────┴─────────┐
    ↓                   ↓
[Index Page]      [Detail Page]
getAllStories()   getStoryBySlug(slug)
    ↓                   ↓
StoryGrid          StoryContent
    ↓                   ↓
StoryCard(s)      [Render all components]
```

## Component Dependencies

```
BackgroundMusicProvider
├── useBackgroundMusic() hook
│   ├── BackgroundMusicToggle (uses hook)
│   └── NarrationPlayer (uses hook)

StoryGrid
└── StoryCard (multiple instances)
    └── Links to detail pages

StoryLayout
├── IllustFrame (background)
└── Children components

StoryContent
├── NarrationPlayer
├── ReactMarkdown
├── LottieAnimation (dynamic)
├── ThreeScene (dynamic)
├── MediaPlayer
└── IllustFrame
```

## Utility Components

```
LoadingPlaceholder
├── Used by LottieAnimation
├── Used by ThreeScene
└── Generic loading states

ErrorFallback
├── Used for media load failures
└── Generic error display
```

## Provider Hierarchy

```
html
└── body
    └── ThemeProvider (next-themes)
        └── BackgroundMusicProvider (custom)
            ├── Header
            ├── Main (children/pages)
            ├── Footer
            └── BackgroundMusicToggle
```

## State Management

### Global State
- **BackgroundMusicProvider**
  - `isPlaying`: boolean
  - `volume`: number (0-1)
  - Persisted to: `localStorage['bgm-enabled']`

### Local State (NarrationPlayer)
- `isPlaying`: boolean
- `currentTime`: number
- `audioDuration`: number
- Interacts with: BackgroundMusicProvider (pause/resume)

### Local State (MediaPlayer)
- `currentVideo`: number (index)
- Manages: video selection

### Local State (LottieAnimation)
- `lottie`: Lottie module
- `animationRef`: Lottie instance

### Local State (ThreeScene)
- `error`: string | null
- `isLoading`: boolean
- Manages: Three.js scene, camera, renderer

## File Import Patterns

### Server Components (SSG)
- `app/storybook/page.js`
- `app/storybook/[slug]/page.js`
- Import server-side utilities
- No React hooks

### Client Components
- All components in `components/storybook/`
- `'use client'` directive
- Use React hooks
- Handle browser APIs

### Dynamic Imports (Code Splitting)
```javascript
// LottieAnimation
const lottie = await import('lottie-web');

// ThreeScene
const THREE = await import('three');
const gsap = await import('gsap');
```

## Asset Loading Strategy

```
Images:
- Next.js Image component
- Automatic optimization
- Lazy loading by default
- Remote patterns configured

Audio:
- Native HTML5 Audio API
- Preload: metadata
- Loaded on demand

Video:
- Native HTML5 video element
- Controls: true
- Preload: metadata

Lottie:
- Dynamic import
- Loaded only when visible
- SVG renderer

Three.js:
- Dynamic import
- Loaded only when visible
- WebGL renderer
```

## Performance Optimizations

1. **Static Site Generation (SSG)**
   - All story pages pre-rendered
   - Fast initial load

2. **Code Splitting**
   - Heavy libraries loaded on demand
   - Smaller initial bundle

3. **Lazy Loading**
   - Images lazy load by default
   - Animations load when needed

4. **Optimized Images**
   - Next.js automatic optimization
   - Responsive sizes

5. **Loading States**
   - Placeholders prevent layout shift
   - Better perceived performance

## Build Output

```
Route (app)                    Size      First Load JS
┌ ○ /storybook                 38.1 kB   153 kB
└ ● /storybook/[slug]          48.3 kB   163 kB
    ├ the-magical-forest
    ├ the-star-collector
    └ the-time-weaver

○  Static
●  SSG (Static Site Generation)
```

---

This architecture provides:
- ✅ Modularity
- ✅ Performance
- ✅ Scalability
- ✅ Maintainability
- ✅ Type safety (via JSDoc)
- ✅ SEO optimization
- ✅ Accessibility features
