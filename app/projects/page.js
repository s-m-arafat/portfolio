import { Suspense } from "react";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectCard";
import ProjectFilter from "./ProjectFilter";

export const metadata = { title: "Projects", description: "Analog IC, digital verification, embedded and research projects." };

export default function ProjectsPage() {
  const projects = getAllProjects().map(({ slug, title, summary, fields, tools }) => ({ slug, title, summary, fields, tools }));
  return (
    <div className="container py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">
        Projects in analog IC design, digital design and verification, embedded systems and PCB, and neuromorphic research.
      </p>
      <div className="mt-8">
        <Suspense fallback={<ProjectGrid projects={projects} />}>
          <ProjectFilter projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
