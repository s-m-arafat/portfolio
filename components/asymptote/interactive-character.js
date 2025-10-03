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
    eyes: null
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
        eyes: '/asymptote/eyes.svg'
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

    // Set up initial animation state and ensure proper initial values
    gsap.set([eyesRef.current, blushRef.current, smileRef.current, faceBodyRef.current], {
      transformOrigin: "center center"
    });

    // Set initial blush opacity
    gsap.set(blushRef.current, { opacity: 0.9 });

    // Ensure mouth starts in neutral state
    if (smileRef.current) {
      const mouth = smileRef.current.querySelector('#morphing-mouth');
      if (mouth) {
        mouth.setAttribute('d', 'M 58 70 L 62 70');
        mouth.setAttribute('fill', 'none');
        mouth.setAttribute('stroke', '#2E2B3A');
      }
    }

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

      // Eyes container moves slightly
      gsap.to(eyesRef.current, {
        duration: 0.3,
        x: deltaX * 1.5 * interactionIntensity,
        y: deltaY * 1.5 * interactionIntensity,
        ease: "power2.out"
      });

      // Eyeballs (pupils, iris, highlights) move more dramatically with natural patterns
      if (eyesRef.current) {
        // Different movement intensities for different eye parts
        const pupils = eyesRef.current.querySelectorAll('.pupil');
        const irisDetails = eyesRef.current.querySelectorAll('.iris-detail');
        const highlights = eyesRef.current.querySelectorAll('.highlight');
        const reflections = eyesRef.current.querySelectorAll('.reflection');
        
        // Pupils move the most (main eyeball movement)
        pupils.forEach(pupil => {
          const moveX = deltaX * 3.5 * interactionIntensity;
          const moveY = deltaY * 3.5 * interactionIntensity;
          const constrainedX = Math.max(-2.5, Math.min(2.5, moveX));
          const constrainedY = Math.max(-2.5, Math.min(2.5, moveY));
          
          gsap.to(pupil, {
            duration: 0.15,
            x: constrainedX,
            y: constrainedY,
            ease: "power2.out"
          });
        });
        
        // Iris details move with pupils but slightly less
        irisDetails.forEach(iris => {
          const moveX = deltaX * 3 * interactionIntensity;
          const moveY = deltaY * 3 * interactionIntensity;
          const constrainedX = Math.max(-2, Math.min(2, moveX));
          const constrainedY = Math.max(-2, Math.min(2, moveY));
          
          gsap.to(iris, {
            duration: 0.15,
            x: constrainedX,
            y: constrainedY,
            ease: "power2.out"
          });
        });
        
        // Highlights move more dramatically for realistic light reflection
        highlights.forEach(highlight => {
          const moveX = deltaX * 4 * interactionIntensity;
          const moveY = deltaY * 4 * interactionIntensity;
          const constrainedX = Math.max(-3, Math.min(3, moveX));
          const constrainedY = Math.max(-3, Math.min(3, moveY));
          
          gsap.to(highlight, {
            duration: 0.12,
            x: constrainedX,
            y: constrainedY,
            ease: "power2.out"
          });
        });
        
        // Small reflections move the most for extra sparkle effect
        reflections.forEach(reflection => {
          const moveX = deltaX * 4.5 * interactionIntensity;
          const moveY = deltaY * 4.5 * interactionIntensity;
          const constrainedX = Math.max(-3.5, Math.min(3.5, moveX));
          const constrainedY = Math.max(-3.5, Math.min(3.5, moveY));
          
          gsap.to(reflection, {
            duration: 0.1,
            x: constrainedX,
            y: constrainedY,
            ease: "power2.out"
          });
        });
      }

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
      // Reset eye container and face position
      gsap.to([eyesRef.current, faceBodyRef.current], {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        ease: "elastic.out(1, 0.3)"
      });

      // Reset eyeball positions with natural timing
      if (eyesRef.current) {
        const pupils = eyesRef.current.querySelectorAll('.pupil');
        const irisDetails = eyesRef.current.querySelectorAll('.iris-detail');
        const highlights = eyesRef.current.querySelectorAll('.highlight');
        const reflections = eyesRef.current.querySelectorAll('.reflection');
        
        // Reset with slightly different timings for natural movement
        gsap.to(pupils, {
          duration: 0.4,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)"
        });
        
        gsap.to(irisDetails, {
          duration: 0.4,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
          delay: 0.05
        });
        
        gsap.to([highlights, reflections], {
          duration: 0.3,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
          delay: 0.1
        });
      }

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
      
      // Kill any existing mouth animations to prevent conflicts
      if (smileRef.current) {
        const mouth = smileRef.current.querySelector('#morphing-mouth');
        if (mouth) {
          gsap.killTweensOf({});
        }
      }
      
      return AsymptoteAnimations.happyAnimation({
        smile: smileRef.current,
        blush: blushRef.current,
        eyes: eyesRef.current
      }).call(() => {
        // Reset mouth back to neutral after animation
        if (smileRef.current) {
          setTimeout(() => {
            const mouth = smileRef.current.querySelector('#morphing-mouth');
            if (mouth) {
              // Smooth morph back to neutral
              AsymptoteAnimations.morphMouthToNeutral(mouth);
            }
          }, 1200); // Reduced wait time for better responsiveness
        }
        setIsInteracting(false);
        if (enableIdleAnimations) resumeIdleAnimations();
      });
    },

    playExcited: () => {
      setIsInteracting(true);
      stopIdleAnimations();
      
      // Kill any existing mouth animations to prevent conflicts
      if (smileRef.current) {
        const mouth = smileRef.current.querySelector('#morphing-mouth');
        if (mouth) {
          gsap.killTweensOf({});
        }
      }
      
      return AsymptoteAnimations.excitedAnimation({
        container: containerRef.current,
        eyes: eyesRef.current,
        smile: smileRef.current
      }).call(() => {
        // Reset mouth back to neutral after excited animation
        if (smileRef.current) {
          setTimeout(() => {
            const mouth = smileRef.current.querySelector('#morphing-mouth');
            if (mouth) {
              // Smooth morph back to neutral
              AsymptoteAnimations.morphMouthToNeutral(mouth);
            }
          }, 1200); // Reduced wait time for better responsiveness
        }
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
      
      // Reset mouth to neutral state
      if (smileRef.current) {
        const mouth = smileRef.current.querySelector('#morphing-mouth');
        if (mouth) {
          // Kill all animations first
          gsap.killTweensOf({});
          // Set clean neutral state
          mouth.setAttribute('d', 'M 58 70 L 62 70');
          mouth.setAttribute('fill', 'none');
          mouth.setAttribute('stroke', '#2E2B3A');
          mouth.setAttribute('stroke-width', '3');
        }
      }
      
      // Reset all transforms and styles
      gsap.set([containerRef.current, eyesRef.current, blushRef.current, smileRef.current, faceBodyRef.current], {
        clearProps: "all"
      });
      
      // Reset eyeball positions
      if (eyesRef.current) {
        const eyeballElements = eyesRef.current.querySelectorAll('.pupil, .iris-detail, .highlight, .reflection');
        gsap.set(eyeballElements, {
          clearProps: "all"
        });
      }
      
      // Set initial state for blush
      gsap.set(blushRef.current, { opacity: 0.9 });
      
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
        
        {/* Smile component with morphing mouth */}
        <g ref={smileRef} className="component-smile">
          <path 
            id="morphing-mouth"
            d="M 58 70 L 62 70" 
            stroke="#2E2B3A" 
            strokeWidth="3" 
            strokeLinecap="round" 
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
});

InteractiveAsymptoteCharacter.displayName = 'InteractiveAsymptoteCharacter';

export default InteractiveAsymptoteCharacter;