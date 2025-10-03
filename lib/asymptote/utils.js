import { gsap } from 'gsap';

/**
 * Asymptote Character Utility Functions
 * Helper functions for managing GSAP animations specific to Asymptote character
 */

export class AsymptoteUtils {
  /**
   * Kill all animations on multiple elements
   */
  static killAllAnimations(elements) {
    elements.forEach(element => {
      if (element) {
        gsap.killTweensOf(element);
      }
    });
  }

  /**
   * Reset all elements to default state
   */
  static resetToDefaults(elements) {
    elements.forEach(element => {
      if (element) {
        gsap.set(element, {
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          x: 0,
          y: 0,
          opacity: 1
        });
      }
    });
  }

  /**
   * Set initial transformOrigin for all character elements
   */
  static initializeElements(elements) {
    elements.forEach(element => {
      if (element) {
        gsap.set(element, {
          transformOrigin: "center center"
        });
      }
    });
  }

  /**
   * Create a random delay for natural blinking patterns
   */
  static getRandomBlinkDelay(baseInterval = 3000, variance = 1000) {
    return baseInterval + (Math.random() * variance * 2 - variance);
  }

  /**
   * Check if an element is currently being animated
   */
  static isAnimating(element) {
    return gsap.isTweening(element);
  }

  /**
   * Pause all animations on elements
   */
  static pauseAllAnimations(elements) {
    elements.forEach(element => {
      if (element) {
        gsap.pauseAll();
      }
    });
  }

  /**
   * Resume all animations on elements
   */
  static resumeAllAnimations(elements) {
    elements.forEach(element => {
      if (element) {
        gsap.resumeAll();
      }
    });
  }

  /**
   * Get the current transform values of an element
   */
  static getTransformValues(element) {
    if (!element) return null;
    
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.transform;
    
    if (transform === 'none') {
      return {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0
      };
    }

    // Parse matrix values (this is a simplified version)
    const values = transform.match(/matrix.*\((.+)\)/);
    if (values) {
      const matrixValues = values[1].split(', ').map(Number);
      return {
        x: matrixValues[4] || 0,
        y: matrixValues[5] || 0,
        scaleX: Math.sqrt(matrixValues[0] * matrixValues[0] + matrixValues[1] * matrixValues[1]),
        scaleY: Math.sqrt(matrixValues[2] * matrixValues[2] + matrixValues[3] * matrixValues[3]),
        rotation: Math.atan2(matrixValues[1], matrixValues[0]) * (180 / Math.PI)
      };
    }

    return null;
  }

  /**
   * Create a staggered animation for multiple character elements
   */
  static createStaggeredAnimation(elements, animationParams, stagger = 0.1) {
    const validElements = elements.filter(el => el !== null);
    
    return gsap.to(validElements, {
      ...animationParams,
      stagger: stagger
    });
  }

  /**
   * Create a sequence of animations that play one after another
   */
  static createAnimationSequence(animations) {
    const timeline = gsap.timeline();
    
    animations.forEach((animation, index) => {
      if (typeof animation === 'function') {
        timeline.add(animation(), index > 0 ? "+=0.1" : 0);
      } else {
        timeline.add(animation, index > 0 ? "+=0.1" : 0);
      }
    });

    return timeline;
  }

  /**
   * Create a hover effect handler
   */
  static createHoverEffect(element, hoverParams = {}) {
    const { 
      scale = 1.05, 
      rotation = 2, 
      duration = 0.3,
      ease = "power2.out" 
    } = hoverParams;

    const hoverIn = () => {
      gsap.to(element, {
        duration: duration,
        scale: scale,
        rotation: rotation,
        ease: ease
      });
    };

    const hoverOut = () => {
      gsap.to(element, {
        duration: duration,
        scale: 1,
        rotation: 0,
        ease: ease
      });
    };

    return { hoverIn, hoverOut };
  }

  /**
   * Calculate mouse position relative to element center
   */
  static getRelativeMousePosition(element, mouseEvent) {
    if (!element) return { deltaX: 0, deltaY: 0 };

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (mouseEvent.clientX - centerX) / rect.width;
    const deltaY = (mouseEvent.clientY - centerY) / rect.height;

    return { deltaX, deltaY };
  }

  /**
   * Create a timeline with proper cleanup
   */
  static createManagedTimeline(options = {}) {
    const timeline = gsap.timeline(options);
    
    // Add cleanup method
    timeline.cleanup = () => {
      timeline.kill();
    };

    return timeline;
  }

  /**
   * Validate that all required elements exist
   */
  static validateElements(elementRefs) {
    const missing = [];
    
    Object.entries(elementRefs).forEach(([key, ref]) => {
      if (!ref || !ref.current) {
        missing.push(key);
      }
    });

    if (missing.length > 0) {
      console.warn(`Missing element refs: ${missing.join(', ')}`);
      return false;
    }

    return true;
  }

  /**
   * Create performance-optimized animation settings
   */
  static getOptimizedSettings() {
    return {
      force3D: true,
      transformOrigin: "center center",
      willChange: "transform",
      backfaceVisibility: "hidden",
      perspective: 1000
    };
  }

  /**
   * Debounce function for performance optimization
   */
  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }
}

export default AsymptoteUtils;