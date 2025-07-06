import React from "react";
import ResearchCard from "@/components/ui/research-card";
import { BookOpen, FileText, Award } from "lucide-react";
import { Research } from "@/lib/data";

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header Section */}
      <div className="relative pt-10 px-5 lg:px-10">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-cyan-400 mb-4">
            {Research.name}
          </h1>
          <p className="text-md text-cyan-700 font-['Fira_Code'] mb-8">
            {Research.description}
          </p>
        </div>
      </div>
      {/* Research Areas Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Award className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">Research Areas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                Computer Architecture
              </h3>
              <p className="text-cyan-700 text-sm">
                RISC-V processor design, pipeline optimization, and low-power
                computing architectures.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                Machine Learning
              </h3>
              <p className="text-cyan-700 text-sm">
                Deep learning for computer vision, satellite image analysis, and
                neural network optimization.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                Digital Signal Processing
              </h3>
              <p className="text-cyan-700 text-sm">
                FPGA-based real-time signal processing, audio applications, and
                DSP algorithm implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Publications Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <BookOpen className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">Publications</h2>
          </div>

          <div className="space-y-6">
            {Research.items.map((publication, index) => (
              <ResearchCard
                key={index}
                title={publication.title}
                authors={publication.authors}
                journal={publication.journal}
                year={publication.year}
                abstract={publication.abstract}
                keywords={publication.keywords}
                doi={publication.doi}
                pdfLink={publication.pdfLink}
                codeLink={publication.codeLink}
                featured={publication.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Research Collaboration
          </h2>
          <p className="text-cyan-700 mb-6 max-w-2xl mx-auto">
            I&apos;m always interested in research collaborations and academic
            partnerships. If you&apos;re working on related topics, let&apos;s
            connect!
          </p>
          <div className="flex space-x-4 justify-center">
            <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
              Contact for Collaboration
            </button>
            <button className="px-6 py-2 bg-white/5 border border-cyan-800/20 text-cyan-300 rounded-lg hover:border-cyan-600/40 transition-colors">
              View Full CV
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
