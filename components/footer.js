import { site } from "@/lib/site";

const link =
  "inline-flex min-h-6 items-center text-sm text-muted underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface pt-8 pb-[calc(7rem+env(safe-area-inset-bottom))]">
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {site.socials.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                {label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className={link}>
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
