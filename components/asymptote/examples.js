import React from 'react';
import { InteractiveAsymptoteCharacter } from '@/components/asymptote';

/**
 * Example usage of the InteractiveAsymptoteCharacter in various scenarios
 */

// 1. Basic usage with default settings
export function BasicAsymptoteExample() {
  return (
    <div className="flex items-center justify-center p-4">
      <InteractiveAsymptoteCharacter size={100} />
    </div>
  );
}

// 2. Controlled character with custom settings
export function ControlledAsymptoteExample() {
  const characterRef = React.useRef(null);

  const handleHappyClick = () => {
    characterRef.current?.playHappy();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <InteractiveAsymptoteCharacter 
        ref={characterRef}
        size={120}
        enableMouseTracking={true}
        enableContinuousBlinking={true}
        blinkInterval={4000}
        interactionIntensity={0.8}
        onInteraction={(type) => console.log(`Character interaction: ${type}`)}
      />
      <button
        onClick={handleHappyClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Make Happy
      </button>
    </div>
  );
}

// 3. Performance-optimized version (for multiple characters)
export function OptimizedAsymptoteExample() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {[1, 2, 3].map(id => (
        <InteractiveAsymptoteCharacter 
          key={id}
          size={80}
          enableMouseTracking={false}  // Disable for performance
          enableIdleAnimations={false} // Disable for performance  
          enableContinuousBlinking={true}
          blinkInterval={3000 + (id * 500)} // Stagger blinking
        />
      ))}
    </div>
  );
}

// 4. Avatar-style usage in header/navigation
export function AsymptoteAvatar() {
  const characterRef = React.useRef(null);

  React.useEffect(() => {
    // Greet on mount
    const timer = setTimeout(() => {
      characterRef.current?.playWink();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <InteractiveAsymptoteCharacter 
        ref={characterRef}
        size={60}
        enableMouseTracking={true}
        enableIdleAnimations={true}
        enableContinuousBlinking={true}
        blinkInterval={5000}
        interactionIntensity={0.5}
        className="cursor-pointer"
      />
      <span className="text-lg font-medium">Asymptote Assistant</span>
    </div>
  );
}

// 5. Interactive storytelling character
export function StorytellerAsymptote() {
  const characterRef = React.useRef(null);
  const [currentEmotion, setCurrentEmotion] = React.useState('neutral');

  const emotions = {
    happy: () => characterRef.current?.playHappy(),
    excited: () => characterRef.current?.playExcited(),
    surprised: () => characterRef.current?.playExcited(),
    thinking: () => characterRef.current?.playMorph('wobble'),
    greeting: () => characterRef.current?.playWink()
  };

  const handleEmotionChange = (emotion) => {
    setCurrentEmotion(emotion);
    emotions[emotion]?.();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <InteractiveAsymptoteCharacter 
        ref={characterRef}
        size={150}
        enableMouseTracking={true}
        enableIdleAnimations={true}
        enableContinuousBlinking={true}
        blinkInterval={3500}
        interactionIntensity={1.2}
      />
      
      <div className="flex flex-wrap gap-2">
        {Object.keys(emotions).map(emotion => (
          <button
            key={emotion}
            onClick={() => handleEmotionChange(emotion)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              currentEmotion === emotion
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

const AsymptoteExamples = {
  BasicAsymptoteExample,
  ControlledAsymptoteExample,
  OptimizedAsymptoteExample,
  AsymptoteAvatar,
  StorytellerAsymptote
};

export default AsymptoteExamples;