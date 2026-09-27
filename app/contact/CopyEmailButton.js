"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-sm font-medium text-ink transition-colors duration-150 hover:border-ink"
    >
      {copied ? (
        <Check className="size-4 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="size-4 text-muted" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Email copied" : "Copy email"}</span>
    </button>
  );
}
