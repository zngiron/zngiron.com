import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { featuredProjects, projects } from "@/data/projects";
import { WorkCard } from "./work-card";
import { WorkRail } from "./work-rail";

// 002_work — the signature section. Monochrome chrome; the work is the only
// thing that turns on. Headline from the approved carousel mockup.
export function WorkSection() {
  const count = String(featuredProjects.length).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");

  return (
    <section
      id="work"
      className="border-line border-t px-6 py-24 sm:px-12 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          index="002"
          id="work"
          title="Where the color lives."
          meta={
            <span>
              n={count} / {total}
              {/* False claim on touch — there, the centered card colors. */}
              <span className="pointer-coarse:hidden">
                {" "}
                · hover reveals color
              </span>
            </span>
          }
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <WorkRail>
          {featuredProjects.map((featured) => (
            <WorkCard
              key={`${featured.project.brand}-${featured.project.project}`}
              featured={featured}
            />
          ))}

          {/* Terminal end card — the rail resolves into the full index. */}
          <li className="w-[80vw] max-w-105 shrink-0 snap-start sm:w-105 lg:w-120 lg:max-w-none">
            <a
              href="#projects"
              data-work-card=""
              className="group flex aspect-[16/10] flex-col justify-between border border-line p-6 transition-colors hover:border-mute focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <p className="font-mono text-xs text-mute">
                <span aria-hidden="true">$</span> open index
              </p>
              <p className="font-mono text-4xl tracking-tight text-ink sm:text-5xl">
                [ 005 ]
              </p>
              <p className="flex items-center gap-2 font-mono text-xs text-mute transition-colors group-hover:text-ink group-focus-visible:text-ink">
                view all {projects.length} projects
                <ArrowRightIcon aria-hidden="true" size={13} weight="thin" />
              </p>
            </a>
          </li>
        </WorkRail>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
        <span aria-hidden="true">← drag · scroll · arrows →</span>
        <a
          href="#projects"
          className="transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          full index [ 005 ] →
        </a>
      </div>
    </section>
  );
}
