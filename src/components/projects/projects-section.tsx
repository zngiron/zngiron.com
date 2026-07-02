import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { projects } from "@/data/projects";
import { ProjectIndex } from "./project-index";

// 005_projects — the complete record behind 002's curation. Dense by design:
// the volume is the point.
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="border-line border-t px-6 py-24 sm:px-12 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          index="005"
          id="projects"
          title="Every project on record."
          meta={<span>n={projects.length} · 2009 — present</span>}
        />
      </Reveal>

      {/* No Reveal on the 56-row index — same slab-curtain rationale as 004. */}
      <div className="mt-10">
        <ProjectIndex />
      </div>
    </section>
  );
}
