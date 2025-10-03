import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';
import { AsymptoteAnimations } from '@/lib/asymptote/animations';
import { AsymptoteUtils } from '@/lib/asymptote/utils';

const InteractiveAsymptoteCharacter = forwardRef(({ 
  className = '', 
  size = 250,
  enableMouseTracking = true,
  enableIdleAnimations = true,
  enableContinuousBlinking = true,
  blinkInterval = 1500, // Blink every 1.5 seconds
  interactionIntensity = 1,
  onInteraction = null 
}, ref) => {
  const containerRef = useRef(null);
  const eyesRef = useRef(null);
  const blushRef = useRef(null);
  const smileRef = useRef(null);
  const faceBodyRef = useRef(null);
  
  const [components, setComponents] = useState({
    faceBody: null,
    blush: null,
    eyes: null,
    smile: null
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const idleAnimationRef = useRef(null);
  const blinkAnimationRef = useRef(null);
  const mouseTrackingRef = useRef(null);

  useEffect(() => {
    const loadComponents = async () => {
      const componentFiles = {
        faceBody: '/asymptote/face-body.svg',
        blush: '/asymptote/blush.svg',
        eyes: '/asymptote/eyes.svg',
        smile: '/asymptote/smile.svg'
      };

      const loadedComponents = {};
      
      for (const [key, path] of Object.entries(componentFiles)) {
        try {
          const response = await fetch(path);
          const svgText = await response.text();
          loadedComponents[key] = svgText;
        } catch (error) {
          console.error(`Failed to load ${path}:`, error);
        }
      }
      
      setComponents(loadedComponents);
      setIsLoaded(true);
    };

    loadComponents();
  }, []);

  const startIdleAnimations = React.useCallback(() => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
    }

    const tl = gsap.timeline({ repeat: -1 });
    
    // Breathing animation for the whole character
    tl.add(AsymptoteAnimations.breathingAnimation(containerRef.current, 0.3, 4), 0);
    
    // Subtle rotation for face
    tl.add(AsymptoteAnimations.subtleRotation(faceBodyRef.current, 3, 6), 0);

    idleAnimationRef.current = tl;
  }, []);

  const startContinuousBlinking = React.useCallback(() => {
    if (blinkAnimationRef.current) {
      blinkAnimationRef.current.kill();
    }

    const createBlinkSequence = () => {
      const randomDelay = blinkInterval + (Math.random() * 2000 - 1000); // ±1 second variation
      
      return gsap.timeline()
        .to(eyesRef.current, {
          duration: 0.08,
          scaleY: 0.1,
          ease: "power2.inOut"
        })
        .to(eyesRef.current, {
          duration: 0.08,
          scaleY: 1,
          ease: "power2.inOut"
        })
        .to({}, { duration: randomDelay / 1000 }) // Wait for next blink
        .call(() => {
          if (enableContinuousBlinking && eyesRef.current) {
            blinkAnimationRef.current = createBlinkSequence();
          }
        });
    };

    blinkAnimationRef.current = createBlinkSequence();
  }, [blinkInterval, enableContinuousBlinking]);

  // Initialize animations when components are loaded
  useEffect(() => {
    if (!isLoaded) return;

    // Set up initial animation state
    gsap.set([eyesRef.current, blushRef.current, smileRef.current, faceBodyRef.current], {
      transformOrigin: "center center"
    });

    // Start idle animations
    if (enableIdleAnimations) {
      startIdleAnimations();
    }

    // Start continuous blinking
    if (enableContinuousBlinking) {
      startContinuousBlinking();
    }

    return () => {
      if (idleAnimationRef.current) {
        idleAnimationRef.current.kill();
      }
      if (blinkAnimationRef.current) {
        blinkAnimationRef.current.kill();
      }
    };
  }, [isLoaded, enableIdleAnimations, enableContinuousBlinking, startIdleAnimations, startContinuousBlinking]);

  // Setup mouse tracking separately
  useEffect(() => {
    if (!isLoaded || !enableMouseTracking) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current || isInteracting) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      const maxRotation = 5 * interactionIntensity;
      const rotationX = deltaY * maxRotation;
      const rotationY = deltaX * maxRotation;

      // Eyes follow cursor
      gsap.to(eyesRef.current, {
        duration: 0.3,
        x: deltaX * 2 * interactionIntensity,
        y: deltaY * 2 * interactionIntensity,
        ease: "power2.out"
      });

      // Face rotates slightly
      gsap.to(faceBodyRef.current, {
        duration: 0.5,
        rotationY: rotationY,
        rotationX: -rotationX,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      if (onInteraction) onInteraction('hover');
      
      gsap.to(blushRef.current, {
        duration: 0.3,
        opacity: 0.8,
        scale: 1.05,
        ease: "power2.out"
      });

      gsap.to(smileRef.current, {
        duration: 0.3,
        scaleX: 1.1,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([eyesRef.current, faceBodyRef.current], {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        ease: "elastic.out(1, 0.3)"
      });

      gsap.to(blushRef.current, {
        duration: 0.3,
        opacity: 0.5,
        scale: 1,
        ease: "power2.out"
      });

      gsap.to(smileRef.current, {
        duration: 0.3,
        scaleX: 1,
        ease: "power2.out"
      });
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);

      mouseTrackingRef.current = {
        kill: () => {
          if (containerRef.current) {
            containerRef.current.removeEventListener('mousemove', handleMouseMove);
            containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
            containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
          }
        }
      };
    }

    return () => {
      if (mouseTrackingRef.current) {
        mouseTrackingRef.current.kill();
      }
    };
  }, [isLoaded, enableMouseTracking, interactionIntensity, onInteraction, isInteracting]);



  const stopIdleAnimations = React.useCallback(() => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.pause();
    }
  }, []);

  const resumeIdleAnimations = React.useCallback(() => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.resume();
    }
  }, []);

  const stopBlinking = React.useCallback(() => {
    if (blinkAnimationRef.current) {
      blinkAnimationRef.current.kill();
    }
  }, []);

  const resumeBlinking = React.useCallback(() => {
    if (enableContinuousBlinking) {
      startContinuousBlinking();
    }
  }, [enableContinuousBlinking, startContinuousBlinking]);

  // Expose animation methods through ref
  useImperativeHandle(ref, () => ({
    playWink: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      stopBlinking();
      
      return AsymptoteAnimations.winkAnimation(eyesRef.current)
        .call(() => {
          setIsInteracting(false);
          if (enableIdleAnimations) resumeIdleAnimations();
          resumeBlinking();
        });
    },
    
    playHappy: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.happyAnimation({
        smile: smileRef.current,
        blush: blushRef.current,
        eyes: eyesRef.current
      }).call(() => {
        setIsInteracting(false);
        if (enableIdleAnimations) resumeIdleAnimations();
      });
    },

    playExcited: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.excitedAnimation({
        container: containerRef.current,
        eyes: eyesRef.current,
        smile: smileRef.current
      }).call(() => {
        setIsInteracting(false);
        if (enableIdleAnimations) resumeIdleAnimations();
      });
    },

    playShake: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.shakeAnimation(containerRef.current)
        .call(() => {
          setIsInteracting(false);
          if (enableIdleAnimations) resumeIdleAnimations();
        });
    },

    playMorph: (morphType = 'squeeze') => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.morphAnimation(faceBodyRef.current, morphType)
        .call(() => {
          setIsInteracting(false);
          if (enableIdleAnimations) resumeIdleAnimations();
        });
    },

    playBounce: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.bounceAnimation(containerRef.current)
        .call(() => {
          setIsInteracting(false);
          if (enableIdleAnimations) resumeIdleAnimations();
        });
    },

    playRotate: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.rotateAnimation(faceBodyRef.current)
        .call(() => {
          setIsInteracting(false);
          if (enableIdleAnimations) resumeIdleAnimations();
        });
    },

    playPulse: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      return AsymptoteAnimations.pulseAnimation(containerRef.current)
        .call(() => {
          setIsInteracting(false);
          if (enableIdleAnimations) resumeIdleAnimations();
        });
    },

    setIdleAnimations: (enabled) => {
      if (enabled && !enableIdleAnimations) {
        startIdleAnimations();
      } else if (!enabled && enableIdleAnimations) {
        stopIdleAnimations();
      }
    },

    setContinuousBlinking: (enabled) => {
      if (enabled) {
        startContinuousBlinking();
      } else {
        stopBlinking();
      }
    },

    resetAnimations: () => {
      setIsInteracting(false);
      AsymptoteUtils.killAllAnimations([
        containerRef.current, 
        eyesRef.current, 
        blushRef.current, 
        smileRef.current, 
        faceBodyRef.current
      ]);
      
      // Restart idle animations and blinking after a brief delay
      setTimeout(() => {
        if (enableIdleAnimations) startIdleAnimations();
        if (enableContinuousBlinking) startContinuousBlinking();
      }, 100);
    }
  }), [
    enableIdleAnimations, 
    enableContinuousBlinking, 
    startIdleAnimations, 
    startContinuousBlinking, 
    stopIdleAnimations, 
    resumeIdleAnimations, 
    stopBlinking, 
    resumeBlinking
  ]);

  return (
    <div 
      ref={containerRef}
      className={`asymptote-character ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-block',
        cursor: enableMouseTracking ? 'pointer' : 'default'
      }}
    >
      <style jsx>{`
        .asymptote-character {
          position: relative;
        }
        
        .asymptote-character .component-face-body svg,
        .asymptote-character .component-blush svg,
        .asymptote-character .component-eyes svg,
        .asymptote-character .component-smile svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
      
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {components.faceBody && (
          <g 
            ref={faceBodyRef}
            className="component-face-body"
            dangerouslySetInnerHTML={{ 
              __html: components.faceBody
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>/, '')
                .replace(/<\?xml[^>]*>/, '')
            }}
          />
        )}
        
        {components.blush && (
          <g 
            ref={blushRef}
            className="component-blush"
            dangerouslySetInnerHTML={{ 
              __html: components.blush
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>/, '')
                .replace(/<\?xml[^>]*>/, '')
            }}
          />
        )}
        
        {components.eyes && (
          <g 
            ref={eyesRef}
            className="component-eyes"
            dangerouslySetInnerHTML={{ 
              __html: components.eyes
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>/, '')
                .replace(/<\?xml[^>]*>/, '')
            }}
          />
        )}
        
        {components.smile && (
          <g 
            ref={smileRef}
            className="component-smile"
            dangerouslySetInnerHTML={{ 
              __html: components.smile
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>/, '')
                .replace(/<\?xml[^>]*>/, '')
            }}
          />
        )}
      </svg>
    </div>
  );
});

InteractiveAsymptoteCharacter.displayName = 'InteractiveAsymptoteCharacter';

export default InteractiveAsymptoteCharacter;