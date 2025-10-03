import { gsap } from 'gsap';

/**
 * Asymptote Character Animation Library
 * Specialized GSAP animations for the Asymptote character with natural morphing
 */

export class AsymptoteAnimations {
  /**
   * Create a breathing/floating animation for the character
   */
  static breathingAnimation(element, intensity = 0.5, duration = 3) {
    return gsap.to(element, {
      duration: duration,
      y: `-=${10 * intensity}`,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }

  /**
   * Create a subtle rotation animation for the face
   */
  static subtleRotation(element, angle = 5, duration = 4) {
    return gsap.to(element, {
      duration: duration,
      rotation: angle,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  /**
   * Wink animation for the eyes
   */
  static winkAnimation(eyesElement) {
    return gsap.timeline()
      .to(eyesElement, {
        duration: 0.08,
        scaleY: 0.1,
        ease: "power2.inOut"
      })
      .to(eyesElement, {
        duration: 0.08,
        scaleY: 1,
        ease: "power2.inOut"
      })
      .to(eyesElement, {
        duration: 0.08,
        scaleY: 0.1,
        ease: "power2.inOut"
      }, "+=0.1")
      .to(eyesElement, {
        duration: 0.08,
        scaleY: 1,
        ease: "power2.inOut"
      });
  }

  /**
   * Happy animation combining smile, blush, and eyes with natural mouth morphing
   */
  static happyAnimation({ smile, blush, eyes }) {
    const tl = gsap.timeline();
    
    // Natural mouth morphing from flat to smile
    const mouth = smile.querySelector('#morphing-mouth');
    if (mouth) {
      // Kill any existing mouth animations first
      gsap.killTweensOf({});
      tl.add(this.morphMouthToHappy(mouth), 0);
    }
    
    return tl
      .to(smile, {
        duration: 0.4,
        scaleX: 1.1,
        scaleY: 1.05,
        ease: "back.out(1.7)"
      }, 0)
      .to(blush, {
        duration: 0.4,
        opacity: 1,
        scale: 1.15,
        ease: "power2.out"
      }, 0.1)
      .to(eyes, {
        duration: 0.25,
        scaleX: 0.85,
        scaleY: 1.1,
        ease: "power2.out"
      }, 0.1)
      .to([smile, eyes], {
        duration: 0.5,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        ease: "elastic.out(1, 0.3)"
      }, 0.6)
      .to(blush, {
        duration: 0.5,
        scale: 1,
        opacity: 0.9,
        ease: "elastic.out(1, 0.3)"
      }, 0.6);
  }

  /**
   * Excited animation with bounce and scaling with natural mouth morphing
   */
  static excitedAnimation({ container, eyes, smile }) {
    const tl = gsap.timeline();
    
    // Natural mouth morphing from flat to excited circle
    const mouth = smile.querySelector('#morphing-mouth');
    if (mouth) {
      // Kill any existing mouth animations first
      gsap.killTweensOf({});
      tl.add(this.morphMouthToExcited(mouth), 0);
    }
    
    return tl
      .to(container, {
        duration: 0.3,
        y: -15,
        ease: "power2.out"
      })
      .to(container, {
        duration: 0.3,
        y: 0,
        ease: "bounce.out"
      })
      .to(eyes, {
        duration: 0.2,
        scaleX: 1.3,
        scaleY: 1.3,
        ease: "back.out(1.7)"
      }, 0)
      .to(smile, {
        duration: 0.3,
        scaleX: 1.3,
        scaleY: 1.3,
        ease: "power2.out"
      }, 0.1)
      .to([eyes, smile], {
        duration: 0.3,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        ease: "elastic.out(1, 0.3)"
      }, 0.6);
  }

  /**
   * Shake animation for expressing confusion or disagreement
   */
  static shakeAnimation(element, intensity = 3) {
    return gsap.timeline()
      .to(element, {
        duration: 0.08,
        x: intensity,
        repeat: 6,
        yoyo: true,
        ease: "power2.inOut"
      })
      .to(element, {
        duration: 0.08,
        x: 0
      });
  }

  /**
   * Morph animations for the face
   */
  static morphAnimation(element, morphType = 'squeeze') {
    const morphParams = {
      squeeze: { scaleX: 0.7, scaleY: 1.3, duration: 0.4 },
      stretch: { scaleX: 1.3, scaleY: 0.7, duration: 0.4 },
      wobble: { scaleX: 1.2, scaleY: 0.8, duration: 0.2 }
    };
    
    const { scaleX, scaleY, duration } = morphParams[morphType] || morphParams.squeeze;
    
    return gsap.timeline()
      .to(element, {
        duration: duration,
        scaleX: scaleX,
        scaleY: scaleY,
        ease: "back.out(1.7)"
      })
      .to(element, {
        duration: duration,
        scaleX: 1,
        scaleY: 1,
        ease: "elastic.out(1, 0.3)"
      });
  }

  /**
   * Bounce animation for the entire character
   */
  static bounceAnimation(element, height = 20) {
    return gsap.timeline()
      .to(element, {
        duration: 0.4,
        y: -height,
        ease: "power2.out"
      })
      .to(element, {
        duration: 0.4,
        y: 0,
        ease: "bounce.out"
      });
  }

  /**
   * Rotation animation for the face
   */
  static rotateAnimation(element) {
    return gsap.to(element, {
      duration: 1,
      rotation: "+=360",
      ease: "power2.inOut"
    });
  }

  /**
   * Pulse animation for attention
   */
  static pulseAnimation(element, scale = 1.1) {
    return gsap.to(element, {
      duration: 0.3,
      scale: scale,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  }

  /**
   * Blink animation - single blink
   */
  static blinkAnimation(eyesElement) {
    return gsap.timeline()
      .to(eyesElement, {
        duration: 0.08,
        scaleY: 0.1,
        ease: "power2.inOut"
      })
      .to(eyesElement, {
        duration: 0.08,
        scaleY: 1,
        ease: "power2.inOut"
      });
  }

  /**
   * Entrance animation from different directions
   */
  static entranceAnimation(element, direction = 'bottom') {
    const directions = {
      left: { x: -50, y: 0 },
      right: { x: 50, y: 0 },
      top: { x: 0, y: -50 },
      bottom: { x: 0, y: 50 }
    };

    const { x, y } = directions[direction] || directions.bottom;

    gsap.set(element, {
      x: x,
      y: y,
      opacity: 0,
      scale: 0.8
    });

    return gsap.timeline()
      .to(element, {
        duration: 0.6,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)"
      });
  }

  /**
   * Surprise animation with eye expansion
   */
  static surpriseAnimation(eyesElement) {
    return gsap.timeline()
      .to(eyesElement, {
        duration: 0.2,
        scaleX: 1.4,
        scaleY: 1.4,
        ease: "back.out(1.7)"
      })
      .to(eyesElement, {
        duration: 0.3,
        scale: 1,
        ease: "elastic.out(1, 0.3)"
      }, 0.3);
  }

  /**
   * Sleepy animation with slow blinking
   */
  static sleepyAnimation(eyesElement) {
    return gsap.timeline()
      .to(eyesElement, {
        duration: 0.3,
        scaleY: 0.3,
        ease: "power2.inOut"
      })
      .to(eyesElement, {
        duration: 0.8,
        scaleY: 0.1,
        ease: "power2.inOut"
      })
      .to(eyesElement, {
        duration: 0.3,
        scaleY: 1,
        ease: "power2.out"
      });
  }

  /**
   * Natural mouth morphing animations
   */
  static morphMouthToHappy(mouthElement) {
    // Ensure clean state first
    mouthElement.setAttribute('fill', 'none');
    mouthElement.setAttribute('stroke', '#2E2B3A');
    mouthElement.setAttribute('stroke-width', '3');
    
    // Use GSAP's smooth morphing instead of discrete steps
    return gsap.timeline()
      .to({}, { 
        duration: 0.4,
        ease: "power2.out",
        onUpdate: function() {
          const progress = this.progress();
          // Smooth interpolation from flat to smile
          const y1 = 70;
          const y2 = 70 + (4.5 * progress); // Curve depth
          const x1 = 58 - (2.5 * progress);   // Start point
          const x2 = 62 + (2.5 * progress);   // End point
          const cx = 60;                       // Control point x
          const cy = y2;                       // Control point y
          
          const path = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y1}`;
          mouthElement.setAttribute('d', path);
        }
      });
  }

  static morphMouthToExcited(mouthElement) {
    // Ensure clean state first - remove any previous path
    mouthElement.setAttribute('fill', 'none');
    mouthElement.setAttribute('stroke', 'none');
    
    return gsap.timeline()
      .to({}, {
        duration: 0.3,
        ease: "power2.out",
        onUpdate: function() {
          const progress = this.progress();
          if (progress < 0.5) {
            // First half: morph from line to curve
            const curveDepth = progress * 4;
            const path = `M 58 70 Q 60 ${70 + curveDepth} 62 70`;
            mouthElement.setAttribute('d', path);
            mouthElement.setAttribute('fill', 'none');
            mouthElement.setAttribute('stroke', '#2E2B3A');
            mouthElement.setAttribute('stroke-width', '3');
          } else {
            // Second half: transform to filled circle
            const radius = 2 + ((progress - 0.5) * 2); // Grow from 2 to 4
            const path = `M 60 ${70-radius} A ${radius} ${radius} 0 1 1 60 ${70+radius} A ${radius} ${radius} 0 1 1 60 ${70-radius} Z`;
            mouthElement.setAttribute('d', path);
            mouthElement.setAttribute('fill', '#2E2B3A');
            mouthElement.setAttribute('stroke', 'none');
          }
        }
      });
  }

  static morphMouthToNeutral(mouthElement) {
    // Get current path to determine starting state
    const currentPath = mouthElement.getAttribute('d');
    
    return gsap.timeline()
      .to({}, {
        duration: 0.3,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = this.progress();
          const reverseProgress = 1 - progress;
          
          if (currentPath.includes('A')) {
            // Coming from excited (circle) - reverse to flat
            if (reverseProgress > 0.5) {
              // First half: keep as circle but shrink
              const radius = 2 + ((reverseProgress - 0.5) * 4);
              const path = `M 60 ${70-radius} A ${radius} ${radius} 0 1 1 60 ${70+radius} A ${radius} ${radius} 0 1 1 60 ${70-radius} Z`;
              mouthElement.setAttribute('d', path);
              mouthElement.setAttribute('fill', '#2E2B3A');
            } else {
              // Second half: curve to flat line
              const curveDepth = reverseProgress * 4;
              const path = `M 58 70 Q 60 ${70 + curveDepth} 62 70`;
              mouthElement.setAttribute('d', path);
              mouthElement.setAttribute('fill', 'none');
              mouthElement.setAttribute('stroke', '#2E2B3A');
              mouthElement.setAttribute('stroke-width', '3');
            }
          } else if (currentPath.includes('Q')) {
            // Coming from happy (curve) - flatten curve
            const curveDepth = reverseProgress * 4.5;
            const x1 = 58 - (2.5 * reverseProgress);
            const x2 = 62 + (2.5 * reverseProgress);
            const path = `M ${x1} 70 Q 60 ${70 + curveDepth} ${x2} 70`;
            mouthElement.setAttribute('d', path);
          }
        },
        onComplete: function() {
          // Ensure final clean state
          mouthElement.setAttribute('d', 'M 58 70 L 62 70');
          mouthElement.setAttribute('fill', 'none');
          mouthElement.setAttribute('stroke', '#2E2B3A');
          mouthElement.setAttribute('stroke-width', '3');
        }
      });
  }

  /**
   * Kill all morphing animations on an element
   */
  static killMouthAnimations(mouthElement) {
    gsap.killTweensOf({});
    return gsap.timeline();
  }
}

export default AsymptoteAnimations;