"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FIELDS } from "@/lib/site";
import { ProjectGrid } from "@/components/ProjectCard";

export default function ProjectFilter({ projects }) {
  const router = useRouter();
  const requested = useSearchParams().get("field");
  const active = FIELDS.some((f) => f.slug === requested) ? requested : null;
  const shown = active ? projects.filter((p) => p.fields.includes(active)) : projects;
  const count = (slug) => projects.filter((p) => p.fields.includes(slug)).length;
  const select = (slug) => router.replace(slug ? `/projects?field=${slug}` : "/projects", { scroll: false });

  const chips = [{ slug: null, label: "All", n: projects.length }, ...FIELDS.map((f) => ({ ...f, n: count(f.slug) }))];
  const n = shown.length;
  const resultLine =
    n === 0
      ? "No projects in this field yet. Choose All to see every project."
      : active
        ? `Showing ${n} ${FIELDS.find((f) => f.slug === active).label} project${n === 1 ? "" : "s"}`
        : `Showing all ${n} projects`;

  return (
    <>
      <div role="group" aria-label="Filter by field" className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            aria-pressed={active === chip.slug}
            onClick={() => select(chip.slug)}
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-ink transition-colors duration-150 hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-surface aria-pressed:hover:border-accent forced-colors:aria-pressed:forced-color-adjust-none forced-colors:aria-pressed:border-[color:Highlight] forced-colors:aria-pressed:bg-[color:Highlight] forced-colors:aria-pressed:text-[color:HighlightText]"
          >
            {chip.label}{" "}
            <span className="font-mono text-xs text-muted group-aria-pressed:text-accent-soft forced-colors:group-aria-pressed:text-[color:HighlightText]">
              {chip.n}
            </span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {resultLine}
      </p>
      <h2 className="sr-only">Project list</h2>
      {n > 0 && (
        <div className="mt-6">
          <ProjectGrid projects={shown} />
        </div>
      )}
    </>
  );
}
