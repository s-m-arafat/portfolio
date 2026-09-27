"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, site } from "@/lib/site";

const desktopLink =
  "relative inline-flex min-h-10 items-center rounded-md px-3 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-3 after:-bottom-3 after:h-0.5 after:rounded-full aria-[current=page]:after:bg-accent forced-colors:after:forced-color-adjust-none forced-colors:aria-[current=page]:after:bg-[color:Highlight]";
const mobileLink =
  "flex min-h-11 items-center border-l-2 border-transparent px-3 text-base font-medium text-muted transition-colors duration-150 hover:text-ink aria-[current=page]:border-accent aria-[current=page]:text-ink";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus(); // the focused link is being hidden; return focus to the toggle
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface [@media(max-height:30rem)]:static">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-sm py-2 text-base font-semibold tracking-tight text-ink transition-colors duration-150 hover:text-accent"
        >
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={desktopLink} aria-current={isActive(href) ? "page" : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Menu"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line-strong text-ink transition-colors duration-150 hover:border-ink md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-line md:hidden">
        <ul className="container flex flex-col py-2">
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={mobileLink}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
