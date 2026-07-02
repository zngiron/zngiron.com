import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import type { FeaturedProject } from "@/data/projects";
import { projectIndex } from "@/data/projects";

// One work card on the 002 rail. The whole card is a link (live site when a
// URL exists, otherwise the full index). Shots rest grayscale and bloom to
// color on hover / keyboard focus — the site's signature interaction — plus
// `data-active` set by the rail's center-watcher on touch devices, where
// hover doesn't exist. The `05.NN` chip is the project's real row number in
// the 005 index — spec cross-referencing, not decoration.
export function WorkCard({ featured }: { featured: FeaturedProject }) {
  const { project, image, note } = featured;
  const external = Boolean(project.url);
  const tag = project.tags?.[0];

  return (
    <li className="w-[80vw] max-w-105 shrink-0 snap-start sm:w-105 lg:w-120 lg:max-w-none">
      <a
        href={project.url ?? "#projects"}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-work-card=""
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`${project.brand} — ${project.project}${external ? " (opens live site)" : ""}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden border border-line">
          <Image
            src={image}
            alt={`${project.brand} ${project.project} — interface screenshot`}
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 80vw"
            className="object-cover object-top grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-visible:grayscale-0 group-data-[active=true]:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute top-3 left-3 bg-ink px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-bg">
            05.{projectIndex(project)}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 pt-4">
          <div>
            <h3 className="text-lg font-medium tracking-tight">
              {project.brand}
            </h3>
            <p className="mt-0.5 text-sm text-mute">
              {project.industry} · {project.project}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-1">
            {tag && (
              <span className="font-mono text-xs text-accent">{tag}</span>
            )}
            {external && (
              <ArrowUpRightIcon
                size={14}
                weight="thin"
                className="text-mute transition-colors group-hover:text-ink group-focus-visible:text-ink"
              />
            )}
          </div>
        </div>
        <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-mute">
          {note}
        </p>
      </a>
    </li>
  );
}
