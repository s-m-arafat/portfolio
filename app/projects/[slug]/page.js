import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllProjects, getProject } from "@/lib/projects";
import { FIELDS } from "@/lib/site";
import { Tag } from "@/components/primitives";

const h2 = "text-lg font-semibold text-ink";
const pagerLink = "group flex flex-col rounded-xl border border-line bg-surface p-4 transition duration-150 hover:border-line-strong hover:shadow-sm";
const pagerLabel = "inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted";
const pagerTitle = "mt-1 text-sm font-semibold text-ink transition-colors duration-150 group-hover:text-accent";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function LinkSection({ id, title, items }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2 id={id} className={h2}>
        {title}
      </h2>
      <ul className="mt-4 flex flex-col items-start gap-2">
        {items.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center gap-1.5 font-medium text-accent underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-accent-hover"
            >
              {label}
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[index - 1];
  const next = projects[index + 1];
  const meta = [project.context, project.period].filter(Boolean).join(" · ");

  return (
    <div className="container pb-12 pt-8 sm:pb-16 sm:pt-10">
      <article className="max-w-3xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex min-w-0 items-center gap-2 text-sm">
            <li className="shrink-0">
              <Link
                href="/projects"
                className="font-medium text-accent underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="shrink-0 text-muted">
              ›
            </li>
            <li aria-current="page" className="min-w-0 truncate text-muted">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">{project.title}</h1>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.fields.map((field) => (
              <li key={field}>
                <Tag href={`/projects?field=${field}`}>{FIELDS.find((f) => f.slug === field).label}</Tag>
              </li>
            ))}
          </ul>
          {meta && <p className="mt-3 font-mono text-[0.8125rem] leading-5 text-muted">{meta}</p>}
          <p className="mt-4 text-lg leading-8 text-muted">{project.summary}</p>
        </header>

        <section aria-labelledby="key-work" className="mt-10">
          <h2 id="key-work" className={h2}>
            Key work
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-ink marker:text-accent">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tools" className="mt-10">
          <h2 id="tools" className={h2}>
            Tools & skills
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li key={tool}>
                <Tag>{tool}</Tag>
              </li>
            ))}
          </ul>
        </section>

        <LinkSection id="links" title="Links" items={project.links} />
        <LinkSection id="files" title="Files" items={project.files} />

        {project.body && (
          <section aria-labelledby="overview" className="mt-10">
            <h2 id="overview" className={h2}>
              Overview
            </h2>
            <div className="mt-4 max-w-prose text-base leading-7 text-ink [&_p]:mt-4 [&_p:first-child]:mt-0 [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
              <Markdown remarkPlugins={[remarkGfm]}>{project.body}</Markdown>
            </div>
          </section>
        )}

        <nav aria-label="More projects" className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prev && (
            <Link href={`/projects/${prev.slug}`} className={pagerLink}>
              <span className={pagerLabel}>
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Previous project
              </span>
              <span className={pagerTitle}>{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className={`${pagerLink} sm:col-start-2 sm:items-end sm:text-right`}>
              <span className={pagerLabel}>
                Next project
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className={pagerTitle}>{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
