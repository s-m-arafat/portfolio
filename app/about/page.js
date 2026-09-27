import { ArrowUpRight } from "lucide-react";
import { activities, certifications, coursework, education, experience, site, skills } from "@/lib/site";
import { Tag } from "@/components/primitives";

export const metadata = { title: "About", description: site.summary };

const h2 = "text-2xl font-semibold tracking-tight text-ink";
const section = "mt-12 border-t border-line pt-10 sm:mt-16 sm:pt-12";
const rowList = "mt-6 max-w-3xl divide-y divide-line border-y border-line";

function Timeline({ items }) {
  return (
    <ol role="list" className="mt-8 max-w-3xl space-y-10 border-l border-line">
      {items.map((item) => (
        <li
          key={item.title}
          className="relative pl-6 before:absolute before:-left-[5.5px] before:top-2 before:size-2.5 before:rounded-full before:border-2 before:border-accent before:bg-canvas"
        >
          <h3 className="text-lg font-semibold leading-snug text-ink">{item.title}</h3>
          <p className="mt-1 text-base font-medium text-ink">
            {item.orgUrl ? (
              <a
                href={item.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline"
              >
                {item.org}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
              item.org
            )}
          </p>
          <p className="mt-1 font-mono text-[0.8125rem] leading-5 text-muted">
            {[item.location, item.period].filter(Boolean).join(" · ")}
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-7 text-ink marker:text-muted">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {item.skills && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {item.skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  return (
    <div className="container py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">About</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{site.summary}</p>

      <section aria-labelledby="experience" className={section}>
        <h2 id="experience" className={h2}>
          Experience
        </h2>
        <Timeline items={experience} />
      </section>

      <section aria-labelledby="skills" className={section}>
        <h2 id="skills" className={h2}>
          Skills
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {skills.map(({ group, items }) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-ink">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="education" className={section}>
        <h2 id="education" className={h2}>
          Education
        </h2>
        <ul role="list" className={rowList}>
          {education.map(({ degree, detail, institution, year }) => (
            <li
              key={degree}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="text-base font-semibold leading-7 text-ink">{degree}</p>
                {detail && <p className="text-sm leading-6 text-muted">{detail}</p>}
                <p className="text-sm leading-6 text-muted">{institution}</p>
              </div>
              <p className="font-mono text-[0.8125rem] leading-5 text-muted sm:shrink-0">{year}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="coursework" className={section}>
        <h2 id="coursework" className={h2}>
          Coursework
        </h2>
        <ul role="list" className={rowList}>
          {coursework.map(({ name, topics }) => (
            <li key={name} className="grid gap-1 py-4 sm:grid-cols-[15rem_1fr] sm:gap-6">
              <p className="text-base font-semibold leading-7 text-ink">{name}</p>
              {topics && <p className="text-sm leading-6 text-muted sm:pt-0.5">{topics}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="certifications" className={section}>
        <h2 id="certifications" className={h2}>
          Certifications &amp; training
        </h2>
        <ul role="list" className={rowList}>
          {certifications.map(({ name, issuer }) => (
            <li key={name} className="py-3 text-base leading-7 text-ink">
              {name}
              {issuer && <span className="text-muted"> — {issuer}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="activities" className={section}>
        <h2 id="activities" className={h2}>
          Leadership &amp; activities
        </h2>
        <Timeline items={activities} />
      </section>
    </div>
  );
}
