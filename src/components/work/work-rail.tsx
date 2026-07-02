// biome-ignore-all lint/a11y/noNoninteractiveTabindex: the rail is a keyboard-scrollable region — WCAG requires scrollable containers to be focusable so arrow keys can drive them
"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Client shell for the 002 rail: native horizontal scroll with snap (no JS
// carousel — momentum, drag, and swipe come free and stay accessible), plus
// the two behaviors CSS can't do:
//  1. Arrow-key scrolling when the rail itself is focused.
//  2. On hover-less (touch) devices, the card nearest the viewport center
//     gets `data-active` so the grayscale→color signature still fires —
//     otherwise phones would never see the color.
export function WorkRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch-device color: watch cards cross a center band of the viewport.
    if (!window.matchMedia("(hover: none)").matches) return;
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-work-card]"),
    );
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.setAttribute("data-active", "true");
          else el.removeAttribute("data-active");
        }
      },
      // A narrow horizontal band around the center of the rail's viewport.
      { root: rail, rootMargin: "0px -35% 0px -35%", threshold: 0 },
    );
    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-work-card]");
    const step = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      ref={railRef}
      aria-label="Selected work"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollByCard(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollByCard(-1);
        }
      }}
      className="-mx-6 sm:-mx-12 snap-x snap-mandatory overflow-x-auto scroll-px-6 px-6 sm:scroll-px-12 sm:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <ul className="flex w-max gap-6 pb-2">{children}</ul>
    </section>
  );
}
