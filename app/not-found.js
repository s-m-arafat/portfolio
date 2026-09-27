import { ButtonLink } from "@/components/primitives";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container py-20 sm:py-28">
      <p className="font-mono text-sm font-medium text-muted">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">This page doesn’t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/projects">Browse projects</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Go to home
        </ButtonLink>
      </div>
    </div>
  );
}
