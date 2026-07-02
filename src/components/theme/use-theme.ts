"use client";

import { useCallback, useState } from "react";

type Theme = "light" | "dark";

// startViewTransition may be missing from the ambient DOM types depending on the
// TS lib version, so narrow it locally instead of augmenting globals.
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function useTheme() {
  // Initialized from the DOM, which the head script set before paint.
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggle = useCallback((e: { clientX: number; clientY: number }) => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}

    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };

    const doc = document as ViewTransitionDocument;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !doc.startViewTransition) {
      apply();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    // Distance from the click to the furthest viewport corner = final radius.
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // The pointer ink-trail is a position:fixed mix-blend-difference layer; if it
    // stays visible it bakes into the view-transition snapshot as a frozen white
    // goo over the header. Hide every ink-trail for the switch, restore on finish.
    const root = document.documentElement;
    root.setAttribute("data-theme-switching", "");
    const transition = doc.startViewTransition(apply);
    transition.finished.finally(() => {
      root.removeAttribute("data-theme-switching");
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, []);

  return { theme, toggle };
}
