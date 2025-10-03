"use client";

import React, { useState, useRef } from "react";
// import Image from "next/image";
import {
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  Eye,
  Smile,
  Zap,
  ArrowUpDown,
  RotateCw as Rotate,
  Heart,
} from "lucide-react";
import { InteractiveAsymptoteCharacter } from "@/components/asymptote";

export default function PlaygroundPage() {
  const characterRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const playAnimation = async (animationType) => {
    if (isAnimating || !characterRef.current) return;

    setIsAnimating(true);

    try {
      switch (animationType) {
        case "wink":
          await characterRef.current.playWink();
          break;
        case "happy":
          await characterRef.current.playHappy();
          break;
        case "excited":
          await characterRef.current.playExcited();
          break;
        case "bounce":
          await characterRef.current.playBounce();
          break;
        case "rotate":
          await characterRef.current.playRotate();
          break;
        case "pulse":
          await characterRef.current.playPulse();
          break;
        case "shake":
          await characterRef.current.playShake();
          break;
        case "morph":
          await characterRef.current.playMorph("squeeze");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Animation error:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Main Viewport */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-cyan-800/20 p-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <h3 className="text-lg sm:text-xl font-semibold text-title">
                Asymptote Playground
              </h3>
            </div>

            {/* Animation Controls */}
            <div className="flex flex-wrap gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-800/20 rounded-lg border border-gray-700/20">
              <span className="text-xs sm:text-sm text-gray-400 font-medium w-full sm:w-auto mb-2 sm:mb-0 sm:mr-4">
                Interactive Animations:
              </span>

              {/* Animation Button Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full sm:w-auto">
                <button
                  onClick={() => playAnimation("wink")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Wink Animation"
                >
                  <Eye size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Wink</span>
                </button>

                <button
                  onClick={() => playAnimation("happy")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Happy Animation"
                >
                  <Heart size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Happy</span>
                </button>

                <button
                  onClick={() => playAnimation("excited")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Excited Animation"
                >
                  <Zap size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Excited</span>
                </button>

                <button
                  onClick={() => playAnimation("bounce")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Bounce Animation"
                >
                  <ArrowUpDown size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Bounce</span>
                </button>

                <button
                  onClick={() => playAnimation("rotate")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Rotate Animation"
                >
                  <Rotate size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Rotate</span>
                </button>

                <button
                  onClick={() => playAnimation("pulse")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Pulse Animation"
                >
                  <Heart size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Pulse</span>
                </button>

                <button
                  onClick={() => playAnimation("shake")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Shake Animation"
                >
                  <Zap size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Shake</span>
                </button>

                <button
                  onClick={() => playAnimation("morph")}
                  disabled={isAnimating}
                  className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 min-h-[36px] sm:min-h-[32px]"
                  title="Morph Animation"
                >
                  <RotateCw size={16} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Morph</span>
                </button>
              </div>
            </div>
          </div>

          {/* SVG Display Area */}
          <div className="bg-white rounded-lg border-2 border-gray-200 min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] flex items-center justify-center overflow-hidden">
            <div
              className="transition-all duration-300 ease-in-out"
              style={{
                transformOrigin: "center",
              }}
            >
              <div>
                <InteractiveAsymptoteCharacter
                  ref={characterRef}
                  enableMouseTracking={true}
                  enableIdleAnimations={true}
                  enableContinuousBlinking={true}
                  blinkInterval={1500}
                  interactionIntensity={1}
                  size={500}
                  onInteraction={(type) => console.log(`Interaction: ${type}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 bg-blue-800/10 rounded-lg border border-blue-700/20">
        <div className="text-xs sm:text-sm text-blue-300 mb-2 font-semibold">
          Interactive Features:
        </div>
        <ul className="text-xs sm:text-sm text-blue-200 space-y-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-1 gap-x-4">
          <li>• Hover to see mouse tracking</li>
          <li>• Eyes follow cursor movement</li>
          <li>• Continuous blinking every 3s</li>
          <li>• Idle animations when inactive</li>
          <li>• Smooth animation transitions</li>
        </ul>
      </div>
    </div>
  );
}
