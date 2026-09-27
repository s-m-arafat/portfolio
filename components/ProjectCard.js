import Link from "next/link";
import { FIELDS } from "@/lib/site";

const label = (slug) => FIELDS.find((f) => f.slug === slug)?.label;

export default function ProjectCard({ project }) {
  const { slug, title, summary, fields, tools } = project;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex w-full flex-col rounded-xl border border-line bg-surface p-5 transition duration-150 hover:border-line-strong hover:shadow-sm sm:p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{fields.map(label).join(" · ")}</p>
      <h3 className="mt-2 text-base font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-accent sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tools.slice(0, 4).map((tool) => (
          <li key={tool} className="rounded-md border border-line bg-canvas px-2 py-0.5 font-mono text-xs text-muted">
            {tool}
          </li>
        ))}
        {tools.length > 4 && <li className="px-1 py-0.5 font-mono text-xs text-muted">+{tools.length - 4} more</li>}
      </ul>
    </Link>
  );
}

export function ProjectGrid({ projects }) {
  return (
    <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.slug} className="flex">
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  );
}
