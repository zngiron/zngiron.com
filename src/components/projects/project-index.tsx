"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { type Project, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

// 005 index table: every project on record, filterable by type. Filters are
// inline mono text (not pill buttons); the active one carries the ink _
// cursor (ink, not accent: red is capped at the brand cursor + availability
// status, and un-ghosted red would flip cyan under the ink trail right where
// the pointer clicks). Rows are links only when a live URL exists; everything
// else renders as plain rows (no fake affordances).

const typeFilters = (() => {
  const counts = new Map<string, number>();
  for (const project of projects) {
    counts.set(project.type, (counts.get(project.type) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
})();

function RowContent({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <span className="font-mono text-xs text-mute tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium sm:text-base">
          {project.brand}
          {project.subBrand && (
            <span className="text-mute"> / {project.subBrand}</span>
          )}
          <span className="hidden text-mute sm:inline">
            {" "}
            — {project.project}
          </span>
        </span>
        <span className="mt-0.5 block font-mono text-[10px] tracking-wide text-mute sm:hidden">
          {project.project} · {project.industry}
        </span>
      </span>
      <span className="hidden font-mono text-xs text-mute lg:block">
        {project.industry}
      </span>
      <span className="hidden font-mono text-xs text-mute sm:block">
        {project.type}
      </span>
      <span className="flex justify-end">
        {project.url ? (
          <ArrowUpRightIcon
            aria-hidden="true"
            size={13}
            weight="thin"
            className="text-mute transition-colors group-hover:text-ink group-focus-visible:text-ink"
          />
        ) : (
          <span aria-hidden="true" className="font-mono text-xs text-mute/50">
            —
          </span>
        )}
      </span>
    </>
  );
}

export function ProjectIndex() {
  const [activeType, setActiveType] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeType
        ? projects.filter((project) => project.type === activeType)
        : projects,
    [activeType],
  );

  const rowClasses =
    "grid grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] items-center gap-x-4 border-line border-b py-3 sm:grid-cols-[2.25rem_minmax(0,1fr)_6.5rem_1.25rem] lg:grid-cols-[2.25rem_minmax(0,1fr)_11rem_6.5rem_1.25rem]";

  return (
    <div>
      {/* Type filters — inline mono text links with live counts. */}
      {/* py-2/-my-1 grows each button's touch target without moving the
          text; gap-y-3 keeps the extended hit areas from overlapping. */}
      <fieldset className="flex flex-wrap gap-x-5 gap-y-3 border-0 font-mono text-xs">
        <legend className="sr-only">Filter projects by type</legend>
        <button
          type="button"
          onClick={() => setActiveType(null)}
          aria-pressed={activeType === null}
          className={cn(
            "-my-1 cursor-pointer rounded-sm py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            activeType === null ? "text-ink" : "text-mute hover:text-ink",
          )}
        >
          all {projects.length}
          {activeType === null && <span aria-hidden="true">_</span>}
        </button>
        {typeFilters.map(([type, count]) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            aria-pressed={activeType === type}
            className={cn(
              "-my-1 cursor-pointer rounded-sm py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              activeType === type ? "text-ink" : "text-mute hover:text-ink",
            )}
          >
            {type.toLowerCase()} {count}
            {activeType === type && <span aria-hidden="true">_</span>}
          </button>
        ))}
      </fieldset>

      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} of {projects.length} projects
      </p>

      <ul className="mt-6 border-line border-t">
        {filtered.map((project) => {
          const index = projects.indexOf(project);
          const key = `${project.client}-${project.brand}-${project.subBrand ?? ""}-${project.project}`;
          return (
            <li key={key}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.brand} — ${project.project} (opens live site)`}
                  className={cn(
                    rowClasses,
                    "group transition-colors hover:bg-line/25 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                  )}
                >
                  <RowContent project={project} index={index} />
                </a>
              ) : (
                <div className={rowClasses}>
                  <RowContent project={project} index={index} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
