import React from "react";
import Card from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

export default function AsymptotePage() {
  return (
    <div className="min-h-screen p-4 lg:p-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-title mb-4">
          Asymptote
        </h1>
        <p className="text-paragraph text-lg max-w-3xl mx-auto">
          Meet Asymptote [Asy] - A playable SVG character that you can interact with and
          explore various animations and actions, for now. Or think of it as
          your personal SVG mascot ready to go.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-8 justify-items-center">
          {/* Playground Card */}
          <Card
            icon={<PlayCircle size={25} />}
            title="Interactive Playground"
            content="Experiment with Asymptote code in real-time. Create mathematical diagrams, plots, and scientific illustrations with immediate visual feedback."
            link="/asymptote/playground"
            buttonText="Launch Playground"
          />
        </div>
      </div>


    </div>
  );
}
