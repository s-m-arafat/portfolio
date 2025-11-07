# 🚀 Storybook Quick Start Guide

## ✅ What's Been Set Up

Your storybook system is now fully functional! Here's what you have:

### 📦 Installed
- ✅ All required dependencies
- ✅ Complete folder structure
- ✅ All components and providers
- ✅ 3 example stories with content
- ✅ Responsive layouts
- ✅ Background music system
- ✅ Animation support (Lottie, Three.js)

### 🎯 Access Your Storybook

Visit these pages:
- **Story Collection**: `http://localhost:3000/storybook`
- **Example Story 1**: `http://localhost:3000/storybook/the-magical-forest`
- **Example Story 2**: `http://localhost:3000/storybook/the-star-collector`
- **Example Story 3**: `http://localhost:3000/storybook/the-time-weaver`

## 🎵 Next Steps

### 1. Add Background Music (Optional)

```bash
# Add your music file:
public/assets/stories/audio/background-music.mp3
```

The music toggle button appears in the bottom-right corner of all pages.

### 2. Replace Placeholder Images

Current stories use Unsplash placeholder images. To use your own:

**Option A**: Use local images
```json
{
  "coverImage": "/assets/stories/images/my-cover.jpg"
}
```
Place images in: `public/assets/stories/images/`

**Option B**: Use external URLs
```json
{
  "coverImage": "https://your-cdn.com/image.jpg"
}
```
Remember to add the domain to `next.config.mjs` under `images.remotePatterns`

### 3. Create Your First Story

1. **Create JSON file**: `content/stories/my-first-story.json`

```json
{
  "id": "4",
  "slug": "my-first-story",
  "title": "My First Story",
  "shortDescription": "This is my amazing story about...",
  "author": "Your Name",
  "coverImage": "https://images.unsplash.com/photo-YOUR-IMAGE",
  "content": "# My First Story\n\nOnce upon a time...",
  "tags": ["adventure", "fantasy"],
  "publishedAt": "2025-11-07T00:00:00.000Z",
  "bgColor": "bg-amber-50"
}
```

2. **Restart dev server** (if running)
3. **Visit** `/storybook` to see your story!

## 🎨 Customization Tips

### Change Color Scheme

Edit any story's `bgColor` field:
- `bg-amber-50` - Warm (default)
- `bg-green-50` - Nature
- `bg-blue-50` - Ocean
- `bg-purple-50` - Magic
- `bg-pink-50` - Romance

### Add Audio Narration

```json
{
  "audio": {
    "narrationUrl": "/assets/stories/audio/my-narration.mp3",
    "duration": 120
  }
}
```

Place audio file in: `public/assets/stories/audio/`

### Add Videos

```json
{
  "videos": [
    {
      "url": "/assets/stories/videos/my-video.mp4",
      "caption": "Watch the adventure unfold",
      "poster": "/assets/stories/images/poster.jpg"
    }
  ]
}
```

### Add Lottie Animation

```json
{
  "lottie": {
    "url": "/assets/stories/lottie/animation.json",
    "loop": true,
    "autoplay": true
  }
}
```

Get free Lottie animations from: https://lottiefiles.com/

## 📱 Testing Checklist

- [ ] Visit `/storybook` - see story grid
- [ ] Click a story card - navigate to detail page
- [ ] Read story content - markdown renders correctly
- [ ] Click music toggle - background music controls work
- [ ] Test on mobile - responsive layout works
- [ ] Check console - no errors

## 🐛 Common Issues

### "Cannot find module" error
```bash
rm -rf .next
npm install
npm run dev
```

### Images not loading
- Check file path in JSON
- For external images, add domain to `next.config.mjs`
- Restart dev server

### Story not showing
- Verify JSON syntax is valid
- Check file is in `content/stories/`
- Restart dev server

## 📚 Learn More

For detailed documentation, see: `README_STORYBOOK.md`

## 🎉 You're Ready!

Your interactive storybook system is complete and ready to use. Start adding your stories and bring them to life with:
- 📝 Rich markdown content
- 🎵 Audio narration
- 🎬 Videos
- ✨ Animations
- 🖼️ Beautiful illustrations

**Happy storytelling!** 📖✨
