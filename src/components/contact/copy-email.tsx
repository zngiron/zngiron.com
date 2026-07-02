"use client";

import { useEffect, useRef, useState } from "react";

// Terminal-style copy affordance next to the display email. Click writes the
// address to the clipboard and confirms in-place; the confirmation is
// announced politely for screen readers.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — the mailto link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="cursor-pointer rounded-sm font-mono text-xs text-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-live="polite">
        {copied ? "$ copied to clipboard" : "[ copy ]"}
      </span>
    </button>
  );
}
