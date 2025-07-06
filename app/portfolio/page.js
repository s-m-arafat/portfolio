import React from "react";
import Image from "next/image";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import PortfolioCard from "@/components/ui/portfolio-card";
import SkillCard from "@/components/ui/skill-card";
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  BrainCog,
  Microchip,
  MemoryStick,
  Cpu,
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react";
import { Experience, Education, Skills, Projects } from "@/lib/data";

// Icon mapping for dynamic icon rendering
const iconMap = {
  BrainCog,
  Microchip,
  MemoryStick,
  Cpu,
  Globe,
  Database
};

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      {/* Header Section */}
      <div className="relative pt-10 px-5 lg:px-10">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-cyan-400 mb-4">
            Portfolio
          </h1>
          <p className="text-md text-cyan-700 font-['Fira_Code'] mb-8">
            My professional journey, skills, and achievements
          </p>
        </div>
      </div>

      {/* Experience Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Briefcase className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">{Experience.name}</h2>
          </div>
          
          {Experience.content.map((exp, index) => (
            <PortfolioCard
              key={index}
              title={exp.title}
              subtitle={exp.institute}
              dateRange={`${exp.startDate} - ${exp.endDate}`}
              location={exp.location}
              description={exp.description}
              className="mb-6"
            />
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <GraduationCap className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">{Education.name}</h2>
          </div>
          
          {Education.content.map((edu, index) => (
            <PortfolioCard
              key={index}
              title={edu.title}
              subtitle={edu.institute}
              dateRange={`${edu.startDate} - ${edu.endDate}`}
              description={edu.description}
              className="mb-6"
            />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Code className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">{Skills.name}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Skills.categories.map((category, index) => {
              const IconComponent = iconMap[category.icon];
              return (
                <SkillCard
                  key={index}
                  title={category.name}
                  icon={IconComponent}
                  skills={category.skills}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Smartphone className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">{Projects.name}</h2>
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

      {/* Contact Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-cyan-700 mb-6 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="flex space-x-4 justify-center">
            <Button link="/contact" hideicon>
              Get In Touch
            </Button>
            <Button link="/#explore">
              View More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
