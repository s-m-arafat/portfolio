# 📚 Storybook System Documentation

A complete interactive storytelling system for your Next.js portfolio with animations, audio narration, videos, and beautiful illustrations.

## 🌟 Features

- **Interactive Story Collection** - Grid-based story browsing with beautiful cards
- **Rich Story Pages** - Individual story pages with full markdown support
- **Background Music** - Global looping music with user controls and persistence
- **Audio Narration** - Story-specific narration that auto-pauses background music
- **3D Animations** - Three.js powered 3D scenes with GSAP animations
- **Lottie Animations** - Lightweight vector animations
- **Video Support** - Embedded videos with captions
- **Decorative Illustrations** - Beautiful background and inline illustrations
- **Responsive Design** - Mobile-first, works beautifully on all devices
- **Light Mode Optimized** - Warm, playful aesthetic perfect for storytelling
- **SEO Optimized** - Proper metadata and Open Graph tags
- **Performance** - Lazy-loading for heavy assets, optimized images

## 📁 Project Structure

```
portfolio/
├── app/
│   └── storybook/
│       ├── page.js                    # Story collection page
│       └── [slug]/
│           ├── page.js                # Story detail page (SSG)
│           └── StoryContent.js        # Story rendering component
├── components/
│   ├── storybook/
│   │   ├── StoryCard.js              # Individual story card
│   │   ├── StoryGrid.js              # Grid layout for stories
│   │   ├── NarrationPlayer.js        # Audio player for narration
│   │   ├── LottieAnimation.js        # Lottie animation component
│   │   ├── ThreeScene.js             # Three.js 3D scene
│   │   ├── IllustFrame.js            # Illustration wrapper
│   │   ├── MediaPlayer.js            # Video player
│   │   ├── LoadingPlaceholder.js     # Loading states
│   │   ├── ErrorFallback.js          # Error states
│   │   └── StoryLayout.js            # Story page layout
│   └── BackgroundMusicToggle.js      # BGM control button
├── providers/
│   └── BackgroundMusicProvider.js    # Global music context
├── lib/
│   └── stories.js                    # Story data loading utilities
├── content/
│   └── stories/
│       ├── the-magical-forest.json
│       ├── the-star-collector.json
│       └── the-time-weaver.json
└── public/
    └── assets/
        └── stories/
            ├── audio/
            │   └── background-music.mp3
            ├── images/
            ├── videos/
            └── lottie/
```

## 🚀 Getting Started

### Prerequisites

The system is already installed and configured with these dependencies:
- `next` (v15+)
- `react` & `react-dom`
- `framer-motion` - For smooth animations
- `lottie-web` - For Lottie animations
- `three` - For 3D graphics
- `gsap` - For advanced animations
- `react-markdown` - For markdown rendering
- `remark-gfm` - For GitHub Flavored Markdown
- `lucide-react` - For icons

### Background Music Setup

1. Add your background music file:
   ```
   public/assets/stories/audio/background-music.mp3
   ```

2. The music toggle button appears in the bottom-right corner
3. User preferences are saved to `localStorage`
4. Music auto-pauses when story narration plays

### Adding a New Story

1. **Create a JSON file** in `content/stories/`:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Your Story Title",
  "shortDescription": "A brief description for the card",
  "author": "Author Name",
  "coverImage": "https://example.com/cover.jpg",
  "illustration": "https://example.com/illustration.jpg",
  "audio": {
    "narrationUrl": "/assets/stories/audio/your-narration.mp3",
    "duration": 180
  },
  "videos": [
    {
      "url": "/assets/stories/videos/your-video.mp4",
      "caption": "Video description",
      "poster": "/assets/stories/images/poster.jpg"
    }
  ],
  "lottie": {
    "url": "/assets/stories/lottie/animation.json",
    "loop": true,
    "autoplay": true
  },
  "threeScene": {
    "entryUrl": "/assets/stories/three/scene.js"
  },
  "content": "# Your Story Content\n\nWrite your story in **Markdown** format...",
  "tags": ["tag1", "tag2"],
  "publishedAt": "2025-11-07T00:00:00.000Z",
  "bgColor": "bg-amber-50"
}
```

2. **Add assets** to the appropriate folders:
   - Images: `public/assets/stories/images/`
   - Audio: `public/assets/stories/audio/`
   - Videos: `public/assets/stories/videos/`
   - Lottie: `public/assets/stories/lottie/`

3. **The story will automatically appear** on the `/storybook` page

## 📖 Story Schema

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `slug` | string | URL-friendly identifier |
| `title` | string | Story title |
| `shortDescription` | string | Brief description (shown on card) |
| `coverImage` | string | Cover image URL or path |
| `content` | string | Story content in Markdown |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `author` | string | Author name |
| `illustration` | string | Background/decorative image |
| `audio` | object | Narration audio details |
| `audio.narrationUrl` | string | Audio file path |
| `audio.duration` | number | Duration in seconds |
| `videos` | array | Array of video objects |
| `videos[].url` | string | Video file path |
| `videos[].caption` | string | Video caption |
| `videos[].poster` | string | Video poster image |
| `lottie` | object | Lottie animation details |
| `lottie.url` | string | Lottie JSON file path |
| `lottie.loop` | boolean | Loop animation |
| `lottie.autoplay` | boolean | Auto-play animation |
| `threeScene` | object | Three.js scene details |
| `threeScene.entryUrl` | string | Scene entry file |
| `tags` | array | Story tags |
| `publishedAt` | string | ISO date string |
| `bgColor` | string | Tailwind background class |

## 🎨 Customization

### Background Colors

Use Tailwind CSS background classes in `bgColor`:
- `bg-amber-50` - Warm amber (default)
- `bg-green-50` - Nature/forest stories
- `bg-indigo-50` - Night/space stories
- `bg-purple-50` - Magic/fantasy stories
- `bg-blue-50` - Water/ocean stories
- `bg-pink-50` - Romance/love stories

### Styling

All components use Tailwind CSS. Key color scheme:
- Primary: Amber/Orange tones
- Text: Gray-900 for titles, Gray-700 for body
- Backgrounds: Warm neutrals (amber, orange, yellow)
- Accents: Adjust in individual components

### Typography

- **Headlines**: `font-serif` - For story titles and headers
- **Body**: Default sans-serif - For UI and readable text
- **Markdown**: `prose` classes - For story content

## 🎵 Audio System

### Background Music

The `BackgroundMusicProvider` manages global background music:

```javascript
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

function MyComponent() {
  const { isPlaying, toggle, pause, resume, volume, changeVolume } = useBackgroundMusic();
  
  // Use the controls
  toggle();        // Play/pause
  pause();         // Pause only
  resume();        // Resume only
  changeVolume(0.5); // Set volume (0-1)
}
```

### Story Narration

The `NarrationPlayer` component:
- Auto-pauses background music when playing
- Resumes background music when finished
- Shows progress bar and time
- Includes play/pause and restart controls

## 🎬 Animation System

### Lottie Animations

Add Lottie animations (JSON format):

1. Export from After Effects or download from LottieFiles
2. Place in `public/assets/stories/lottie/`
3. Reference in story JSON:

```json
"lottie": {
  "url": "/assets/stories/lottie/your-animation.json",
  "loop": true,
  "autoplay": true
}
```

### Three.js Scenes

The default `ThreeScene` component creates a rotating cube. To customize:

1. Create a custom Three.js scene component
2. Import necessary Three.js modules dynamically
3. Use GSAP for animations
4. Reference in story JSON

## 📱 Responsive Design

The system is mobile-first:
- **Mobile**: Single column grid
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid

All components adapt to screen size automatically.

## ⚡ Performance

### Lazy Loading

Heavy components are lazy-loaded:
- `LottieAnimation` - Loads only when needed
- `ThreeScene` - Loads only when needed
- Loading placeholders shown during load

### Image Optimization

- Uses Next.js Image component
- Automatic optimization and lazy loading
- Proper `sizes` attribute for responsive images

### Static Generation

- Story pages use `generateStaticParams`
- Pre-rendered at build time
- Fast page loads

## 🔍 SEO

Each story page includes:
- Dynamic `<title>` tags
- Meta descriptions
- Open Graph tags for social sharing
- Proper semantic HTML

## 🧪 Testing Your Stories

1. **Development server**:
   ```bash
   npm run dev
   ```

2. **Visit pages**:
   - Story collection: `http://localhost:3000/storybook`
   - Individual story: `http://localhost:3000/storybook/your-slug`

3. **Test features**:
   - ✅ Story card appears on grid
   - ✅ Cover image loads
   - ✅ Story detail page renders
   - ✅ Markdown content displays correctly
   - ✅ Audio player works (if added)
   - ✅ Animations load (if added)
   - ✅ Background music toggle functions
   - ✅ Responsive on mobile

## 🐛 Troubleshooting

### Images Not Loading

**Problem**: Cover images show broken image icon

**Solutions**:
1. Check file path is correct
2. For external URLs, add domain to `next.config.mjs`:
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'your-domain.com',
       },
     ],
   }
   ```
3. Ensure image file exists in `public/` folder

### Background Music Not Playing

**Problem**: Music doesn't play on page load

**Cause**: Browsers block autoplay until user interaction

**Solution**: This is expected behavior. Users must click the music toggle to start playback.

### Build Errors

**Problem**: `Error: Cannot find module`

**Solutions**:
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`

### Story Not Appearing

**Problem**: New story doesn't show on grid

**Checklist**:
- ✅ JSON file is in `content/stories/`
- ✅ JSON is valid (no syntax errors)
- ✅ Required fields are present
- ✅ Slug is unique
- ✅ Server was restarted after adding file

## 📚 Example Stories

Three example stories are included:

1. **The Magical Forest** - Features audio and video placeholders
2. **The Star Collector** - Features Three.js scene placeholder
3. **The Time Weaver** - Text-only story

These use Unsplash images as placeholders. Replace with your own images.

## 🎯 Best Practices

### Content

- ✅ Keep `shortDescription` under 150 characters
- ✅ Use high-quality cover images (1200x800px recommended)
- ✅ Write stories in Markdown for easy formatting
- ✅ Add proper alt text considerations for accessibility

### Assets

- ✅ Optimize images before uploading (use WebP or optimized JPG)
- ✅ Keep audio files under 5MB if possible
- ✅ Compress videos (MP4, H.264 codec recommended)
- ✅ Test Lottie animations for performance

### Performance

- ✅ Use external image URLs or Next.js Image optimization
- ✅ Lazy load heavy animations
- ✅ Keep story content under 5000 words for readability
- ✅ Test on mobile devices

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy

All stories will be statically generated at build time.

## 🤝 Contributing

To add new features:

1. **New Component**: Add to `components/storybook/`
2. **New Provider**: Add to `providers/`
3. **Update Schema**: Document in this README
4. **Test Thoroughly**: Ensure responsive and accessible

## 📄 License

Part of your portfolio project.

## 🎉 Enjoy Your Storybook!

Visit `/storybook` to see your interactive story collection!

---

**Need Help?** Check the example stories in `content/stories/` for reference implementations.
