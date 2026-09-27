import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import CopyEmailButton from "./CopyEmailButton";

export const metadata = { title: "Contact", description: site.availability };

const contactRow = "grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-6";
const contactLink =
  "inline-flex min-h-6 items-center gap-1.5 break-words font-medium text-accent underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-accent-hover";
const dt = "text-sm font-medium text-muted";

export default function ContactPage() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">Contact</h1>
        <p className="mt-3 text-lg leading-8 text-muted">{site.availability}</p>
        <dl className="mt-10 divide-y divide-line border-y border-line">
          <div className={contactRow}>
            <dt className={dt}>Email</dt>
            <dd className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3 text-base text-ink">
              <a href={`mailto:${site.email}`} className={contactLink}>
                {site.email}
              </a>
              <CopyEmailButton email={site.email} />
            </dd>
          </div>
          {site.socials.map(({ label, href }) => (
            <div key={label} className={contactRow}>
              <dt className={dt}>{label}</dt>
              <dd className="min-w-0 text-base text-ink">
                <a href={href} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  {href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </dd>
            </div>
          ))}
          <div className={contactRow}>
            <dt className={dt}>Location</dt>
            <dd className="text-base text-ink">{site.location}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
