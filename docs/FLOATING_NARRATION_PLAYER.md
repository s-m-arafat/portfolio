# Floating Narration Player Implementation

## Overview
The floating narration player allows users to listen to story narrations while navigating across the entire website. When a user starts playing audio narration on a story page, it automatically minimizes to a floating mini-player at the bottom of the screen.

## Architecture

### 1. **NarrationPlayerProvider** (`providers/NarrationPlayerProvider.js`)
Global context provider that manages narration state across the entire site.

**State:**
- `currentTrack`: { url, title, storySlug }
- `isPlaying`: boolean
- `currentTime`: number
- `duration`: number
- `volume`: number (0-1)
- `isMuted`: boolean
- `playbackRate`: number (1.0, 1.25, 1.5, 1.75, 2.0)
- `isMinimized`: boolean

**Actions:**
- `loadTrack(url, title, storySlug)`: Load a new audio track
- `play()`, `pause()`, `togglePlay()`: Playback controls
- `seek(time)`: Jump to specific time
- `restart()`: Reset to beginning
- `changeVolume(volume)`: Set volume level
- `toggleMute()`: Mute/unmute
- `changePlaybackRate(rate)`: Change speed
- `minimize()`, `maximize()`: Toggle mini-player
- `closePlayer()`: Stop and clear current track

### 2. **FloatingNarrationPlayer** (`components/storybook/FloatingNarrationPlayer.js`)
Compact player that floats at the bottom of the screen when minimized.

**Features:**
- Displays current track title
- Click to navigate back to story
- Full playback controls (play/pause, seek, volume, speed)
- Minimize/maximize toggle
- Close button
- Only visible when `isMinimized === true`

**Controls:**
- **Story Info**: Click to navigate to story page
- **Progress Bar**: Click to seek
- **Play/Pause**: Toggle playback
- **Volume**: Mute button + slider + percentage display
- **Speed**: Dropdown menu (1x, 1.25x, 1.5x, 1.75x, 2x)
- **Maximize**: Return to story page and expand player
- **Close**: Stop playback and dismiss player

### 3. **Updated NarrationPlayer** (`components/storybook/NarrationPlayer.js`)
Enhanced with global player integration.

**New Props:**
- `storyTitle`: Story title for display in mini-player
- `storySlug`: Story slug for navigation

**Behavior:**
- When user clicks play, it loads the track into global player
- Automatically minimizes to floating player
- Syncs all controls with global player state
- Shows "Playing in mini-player" badge when minimized
- Displays minimize button when player is active but not minimized

**State Synchronization:**
- Detects if controlled by global player (`isControlledByGlobal`)
- All controls (play, pause, seek, volume, speed) route through global player
- Local state updates from global player state

### 4. **Root Layout Integration** (`app/layout.js`)
Providers and floating player added to layout for site-wide access.

```jsx
<NarrationPlayerProvider>
  <Header />
  <main>{children}</main>
  <Footer />
  <FloatingNarrationPlayer />
</NarrationPlayerProvider>
```

## User Flow

1. **User visits a story page** with audio narration
2. **Clicks play** on the NarrationPlayer
3. **Audio loads** into global player and starts playing
4. **Player minimizes** automatically to floating bar at bottom
5. **User navigates** to other pages - mini-player persists
6. **User can:**
   - Control playback from mini-player
   - Click to return to story
   - Close player to stop playback
   - Maximize player on story page

## Styling

**Floating Player:**
- Fixed position at bottom
- Full width with max-width container
- Gradient amber/orange background
- Shadow and border for elevation
- Compact height (~60-70px)
- z-index: 50 (above most content)

**Controls:**
- Compact icons and buttons
- Hover states for interactivity
- Dropdown menu for speed control
- Responsive layout

## Benefits

✅ Uninterrupted listening experience
✅ Navigate site while audio plays
✅ Consistent controls across pages
✅ Visual indication of active playback
✅ Easy access to return to story
✅ Full playback controls always available

## Future Enhancements

- Playlist support (queue multiple stories)
- Skip to next/previous story
- Remember playback position (localStorage)
- Keyboard shortcuts
- Mobile optimizations
- Background music auto-pause when narration plays
