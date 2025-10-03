import { gsap } from 'gsap';

/**
 * Asymptote Character Animation Library
 * Specialized GSAP animations for the Asymptote character
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
   * Happy animation combining smile, blush, and eyes
   */
  static happyAnimation({ smile, blush, eyes }) {
    return gsap.timeline()
      .to(smile, {
        duration: 0.3,
        scaleX: 1.3,
        scaleY: 1.2,
        ease: "back.out(1.7)"
      })
      .to(blush, {
        duration: 0.3,
        opacity: 1,
        scale: 1.2,
        ease: "power2.out"
      }, 0)
      .to(eyes, {
        duration: 0.2,
        scaleX: 0.8,
        scaleY: 1.1,
        ease: "power2.out"
      }, 0.1)
      .to([smile, blush, eyes], {
        duration: 0.4,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        opacity: 0.6,
        ease: "elastic.out(1, 0.3)"
      }, 0.5);
  }

  /**
   * Excited animation with bounce and scaling
   */
  static excitedAnimation({ container, eyes, smile }) {
    return gsap.timeline()
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
        scaleX: 1.2,
        rotation: 5,
        ease: "power2.out"
      }, 0.1)
      .to([eyes, smile], {
        duration: 0.3,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
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
}

export default AsymptoteAnimations;