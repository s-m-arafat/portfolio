import React from "react";
import PortfolioCard from "@/components/ui/portfolio-card";
import { Smartphone, Code, Filter } from "lucide-react";
import { Projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header Section */}
      <div className="relative pt-10 px-5 lg:px-10">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-cyan-400 mb-4">
            {Projects.name}
          </h1>
          <p className="text-md text-cyan-700 font-['Fira_Code'] mb-8">
            A collection of my projects showcasing skills in software development, 
            hardware design, and machine learning applications.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Smartphone className="text-cyan-400 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-cyan-400">All Projects</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-cyan-400" size={20} />
              <select className="bg-white/5 border border-cyan-800/20 rounded-lg px-3 py-1 text-cyan-300 text-sm focus:outline-none focus:border-cyan-500/50">
                <option value="all">All Categories</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="ml">Machine Learning</option>
                <option value="web">Web Development</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Projects.items.map((project, index) => (
              <PortfolioCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                viewLink={project.viewLink}
                githubLink={project.githubLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Categories Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Code className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">Project Categories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 text-center">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Hardware Design
              </h3>
              <p className="text-cyan-700 text-sm">
                FPGA, VLSI, and processor design projects
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 text-center">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Machine Learning
              </h3>
              <p className="text-cyan-700 text-sm">
                AI/ML models and computer vision applications
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 text-center">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Web Development
              </h3>
              <p className="text-cyan-700 text-sm">
                Full-stack web applications and APIs
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 text-center">
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                Research Projects
              </h3>
              <p className="text-cyan-700 text-sm">
                Academic and experimental projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-cyan-700 mb-6 max-w-2xl mx-auto">
            I&apos;m always open to new project opportunities and collaborations. 
            Whether you have an idea or need help with an existing project, let&apos;s discuss!
          </p>
          <div className="flex space-x-4 justify-center">
            <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
              Start a Project
            </button>
            <button className="px-6 py-2 bg-white/5 border border-cyan-800/20 text-cyan-300 rounded-lg hover:border-cyan-600/40 transition-colors">
              View GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
