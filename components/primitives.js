import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const button = {
  base: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors duration-150",
  primary: "bg-accent text-surface hover:bg-accent-hover",
  secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
};

export function ButtonLink({ href, children, variant = "primary", external = false }) {
  const className = `${button.base} ${button[variant]}`;
  if (!external) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

export function Tag({ children, href }) {
  if (!href) {
    return (
      <span className="inline-flex items-center rounded-md border border-line bg-canvas px-2 py-0.5 font-mono text-xs text-muted">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="inline-flex min-h-6 items-center rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent transition-colors duration-150 hover:bg-accent hover:text-surface"
    >
      {children}
    </Link>
  );
}

export function SectionHeading({ title, description, id, as: Heading = "h2" }) {
  const isH1 = Heading === "h1";
  return (
    <div className="max-w-2xl">
      <Heading
        id={id}
        className={
          isH1
            ? "text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl"
            : "text-2xl font-semibold tracking-tight text-ink"
        }
      >
        {title}
      </Heading>
      {description && (
        <p className={isH1 ? "mt-3 text-lg leading-8 text-muted" : "mt-2 text-base leading-7 text-muted"}>
          {description}
        </p>
      )}
    </div>
  );
}
