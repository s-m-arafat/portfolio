import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { FIELDS, site } from "@/lib/site";
import { ProjectGrid } from "@/components/ProjectCard";
import { ButtonLink, SectionHeading } from "@/components/primitives";

const icons = { LinkedIn: Linkedin, GitHub: Github };
const iconLink =
  "inline-flex size-11 items-center justify-center rounded-lg border border-line-strong bg-surface text-muted transition-colors duration-150 hover:border-ink hover:text-accent";

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const count = (slug) => projects.filter((p) => p.fields.includes(slug)).length;
  const fieldCards = FIELDS.filter((f) => f.slug !== "research");
  const { title, org, period } = site.currentRole;

  return (
    <>
      <section className="container pb-12 pt-12 sm:pb-16 sm:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">{site.name}</h1>
          <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">{site.headline}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4" aria-hidden="true" />
            {site.location}
          </p>
          <p className="mt-6 flex flex-col gap-1 border-l-2 border-accent pl-4 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">Current role</span>
            <span className="text-sm font-medium text-ink">
              {title} · {org} · {period}
            </span>
          </p>
          <p className="mt-6 text-base leading-7 text-muted sm:text-lg sm:leading-8">{site.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">View projects</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
          <ul className="mt-6 flex items-center gap-2">
            {site.socials.map(({ label, href }) => {
              const Icon = icons[label];
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={iconLink}>
                    <Icon className="size-5" aria-hidden="true" />
                    <span className="sr-only">{label} (opens in new tab)</span>
                  </a>
                </li>
              );
            })}
            <li>
              <a href={`mailto:${site.email}`} className={iconLink}>
                <Mail className="size-5" aria-hidden="true" />
                <span className="sr-only">Email</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="selected-projects" className="container py-12 sm:py-16">
        <SectionHeading
          id="selected-projects"
          title="Selected projects"
          description="One project from each field, plus my BSc thesis."
        />
        <div className="mt-8">
          <ProjectGrid projects={featured} />
        </div>
        <Link
          href="/projects"
          className="mt-8 inline-flex min-h-6 items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline"
        >
          View all {projects.length} projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      <section aria-labelledby="browse-by-field" className="container py-12 sm:py-16">
        <SectionHeading
          id="browse-by-field"
          title="Browse by field"
          description="Each field opens the project list filtered to that field."
        />
        <ul role="list" className="mt-8 grid gap-4 md:grid-cols-3">
          {fieldCards.map((f) => {
            const n = count(f.slug);
            return (
              <li key={f.slug} className="flex">
                <Link
                  href={`/projects?field=${f.slug}`}
                  className="group flex w-full flex-col rounded-xl border border-line bg-surface p-6 transition duration-150 hover:border-line-strong hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold leading-snug text-ink transition-colors duration-150 group-hover:text-accent sm:text-lg">
                    {f.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">{f.blurb}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                    {n} {n === 1 ? "project" : "projects"}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="get-in-touch" className="container py-12 sm:py-16">
        <div className="flex flex-col gap-6 rounded-xl border border-line bg-surface p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 id="get-in-touch" className="text-2xl font-semibold tracking-tight text-ink">
              Get in touch
            </h2>
            <p className="mt-2 text-base leading-7 text-muted">{site.availability}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              All contact details
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
