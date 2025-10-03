# GSAP Animation Integration - Asymptote Character

## Overview

This project includes a sophisticated GSAP (GreenSock Animation Platform) integration specifically designed for the Asymptote character. The system provides:

- High-performance SVG animations
- Continuous blinking and idle animations  
- Interactive mouse tracking
- Complex morphing and transformation animations
- Modular animation library
- Optimized performance with proper cleanup

## Architecture

### Component Structure
```
components/
  asymptote/
    interactive-character.js  # Main interactive character component
    index.js                 # Component exports

lib/
  asymptote/
    animations.js            # Animation library
    utils.js                # Utility functions  
    index.js                # Library exports
```

## Components

### InteractiveAsymptoteCharacter
Located: `/components/asymptote/interactive-character.js`

Fully-featured interactive character with continuous blinking and mouse tracking:

```javascript
import { InteractiveAsymptoteCharacter } from "@/components/asymptote";

// Usage
const characterRef = useRef(null);

<InteractiveAsymptoteCharacter 
  ref={characterRef}
  enableMouseTracking={true}
  enableIdleAnimations={true}
  enableContinuousBlinking={true}
  blinkInterval={3000}
  interactionIntensity={1}
  size={150}
  onInteraction={(type) => console.log(`Interaction: ${type}`)}
/>

// Available animation methods
characterRef.current.playWink();
characterRef.current.playHappy();
characterRef.current.playExcited();
characterRef.current.playShake();
characterRef.current.playMorph('squeeze');
characterRef.current.playBounce();
characterRef.current.playRotate();
characterRef.current.playPulse();
characterRef.current.resetAnimations();

// Control methods
characterRef.current.setContinuousBlinking(false);
characterRef.current.setIdleAnimations(false);
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Additional CSS classes |
| `size` | number | `120` | Character size in pixels |
| `enableMouseTracking` | boolean | `true` | Enable mouse cursor tracking |
| `enableIdleAnimations` | boolean | `true` | Enable automatic idle animations |
| `enableContinuousBlinking` | boolean | `true` | Enable automatic blinking |
| `blinkInterval` | number | `3000` | Time between blinks in milliseconds |
| `interactionIntensity` | number | `1` | Intensity of mouse interactions (0-2) |
| `onInteraction` | function | `null` | Callback for interaction events |

## Animation Library

### AsymptoteAnimations
Located: `/lib/asymptote/animations.js`

Specialized animation functions for the Asymptote character:

```javascript
import { AsymptoteAnimations } from '@/lib/asymptote';

// Available animations
AsymptoteAnimations.breathingAnimation(element, intensity, duration);
AsymptoteAnimations.subtleRotation(element, angle, duration);
AsymptoteAnimations.winkAnimation(eyesElement);
AsymptoteAnimations.happyAnimation({ smile, blush, eyes });
AsymptoteAnimations.excitedAnimation({ container, eyes, smile });
AsymptoteAnimations.shakeAnimation(element, intensity);
AsymptoteAnimations.morphAnimation(element, morphType);
AsymptoteAnimations.bounceAnimation(element, height);
AsymptoteAnimations.rotateAnimation(element);
AsymptoteAnimations.pulseAnimation(element, scale);
AsymptoteAnimations.blinkAnimation(eyesElement);
AsymptoteAnimations.surpriseAnimation(eyesElement);
AsymptoteAnimations.sleepyAnimation(eyesElement);
AsymptoteAnimations.entranceAnimation(element, direction);
```

### AsymptoteUtils
Located: `/lib/asymptote/utils.js`

Utility functions for animation management:

```javascript
import { AsymptoteUtils } from '@/lib/asymptote';

// Utility functions
AsymptoteUtils.killAllAnimations(elements);
AsymptoteUtils.resetToDefaults(elements);
AsymptoteUtils.initializeElements(elements);
AsymptoteUtils.getRandomBlinkDelay(baseInterval, variance);
AsymptoteUtils.isAnimating(element);
AsymptoteUtils.getRelativeMousePosition(element, mouseEvent);
AsymptoteUtils.createManagedTimeline(options);
AsymptoteUtils.validateElements(elementRefs);
AsymptoteUtils.debounce(func, wait, immediate);
```

## Key Features

### 🎯 Continuous Blinking
- Automatic blinking every 3 seconds (configurable)
- Random variation (±1 second) for natural feel
- Pauses during other animations
- Resumes automatically after animations complete

### 🖱️ Interactive Mouse Tracking
- Eyes follow cursor movement
- Face rotates subtly based on mouse position
- Hover effects on mouse enter/leave
- Configurable interaction intensity

### 🔄 Idle Animations
- Breathing animation (subtle up/down movement)
- Gentle face rotation
- Runs continuously when not interacting
- Automatically pauses during triggered animations

### 🎭 Advanced Animations
1. **Wink**: Double-blink sequence
2. **Happy**: Smile + blush + squinted eyes
3. **Excited**: Bounce + eye expansion + smile rotation
4. **Shake**: Horizontal shake motion
5. **Morph**: Face morphing (squeeze/stretch/wobble)
6. **Bounce**: Vertical bounce with physics
7. **Rotate**: 360-degree rotation
8. **Pulse**: Scale pulsing effect

## Performance Optimizations

- **Proper Cleanup**: All animations cleaned up on component unmount
- **Animation State Management**: Prevents animation conflicts
- **React.useCallback**: Optimized function references
- **GSAP Performance**: Uses transform properties for optimal rendering
- **Selective Animation**: Only animates when needed

## Usage in Playground

The playground (`/app/asymptote/playground/page.js`) demonstrates:

1. **Interactive Character**: Full mouse tracking and continuous blinking
2. **Animation Controls**: Trigger specific animations via buttons
3. **Real-time Feedback**: Console logging of interactions
4. **Visual Indicators**: Animation state management
5. **Zoom/Rotate Controls**: External transformation controls

## Best Practices

### Animation Management
```javascript
// Always check animation state
if (isAnimating || !characterRef.current) return;

// Use proper async/await for animations
const animation = await characterRef.current.playWink();

// Handle animation completion
animation.then(() => {
  // Animation completed
});
```

### Performance Considerations
- Continuous blinking uses minimal CPU when not visible
- Mouse tracking is debounced for performance  
- Animations use GPU-accelerated transforms
- Proper cleanup prevents memory leaks

### Customization
```javascript
// Adjust blinking frequency
<InteractiveAsymptoteCharacter blinkInterval={5000} />

// Reduce mouse tracking sensitivity  
<InteractiveAsymptoteCharacter interactionIntensity={0.5} />

// Disable features for performance
<InteractiveAsymptoteCharacter 
  enableMouseTracking={false}
  enableContinuousBlinking={false}
/>
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation in older browsers
- Mobile touch support
- Optimized for both desktop and mobile devices

## Dependencies

- **GSAP**: Animation engine (`npm install gsap`)
- **React**: Component framework
- **Next.js**: Build system and routing

## Migration from Basic Version

The basic GSAP version has been removed. All functionality is now consolidated into the `InteractiveAsymptoteCharacter` component with enhanced features and better performance.