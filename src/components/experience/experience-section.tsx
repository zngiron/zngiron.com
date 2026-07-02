import { Fragment } from "react";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { employers } from "@/data/experience";

// 004_experience — the recruiter's "where", as a specification table. Rows are
// deliberately art-directed away from the bare read.cv format: mono index +
// period column, role progression arrows, red [ current ] marker. Rows aren't
// links, so hover only deepens the text — no pointer, no cursor motif (the _
// is reserved for interactive text).
export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="border-line border-t px-6 py-24 sm:px-12 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          index="004"
          id="experience"
          title="Seventeen years, eleven rooms."
          meta={<span>2009 — present</span>}
        />
      </Reveal>

      <Reveal className="mt-10">
        <ol>
          {employers.map((employer, i) => (
            <li
              key={employer.company}
              className="group grid grid-cols-2 gap-x-4 gap-y-1 border-line border-b py-5 sm:grid-cols-12 sm:items-baseline"
            >
              <p className="col-span-2 flex items-baseline gap-3 font-mono text-xs text-mute tabular-nums sm:col-span-3">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{employer.period}</span>
                {employer.current && (
                  <span className="inline-flex items-baseline gap-1.5 text-accent">
                    <span
                      aria-hidden="true"
                      className="size-1.5 translate-y-px self-center rounded-full bg-accent animate-blink motion-reduce:animate-none"
                    />
                    [ current ]
                  </span>
                )}
              </p>

              <div className="col-span-2 mt-1 sm:col-span-5 sm:mt-0">
                <h3 className="text-lg font-medium tracking-tight transition-colors sm:text-xl">
                  {employer.company}
                </h3>
                <p className="mt-0.5 text-sm text-mute">
                  {employer.roles.map((role, r) => (
                    <Fragment key={role}>
                      {r > 0 && <span aria-hidden="true"> → </span>}
                      <span>{role}</span>
                    </Fragment>
                  ))}
                </p>
              </div>

              <p className="col-span-2 mt-1 font-mono text-xs text-mute sm:col-span-4 sm:mt-0 sm:text-right">
                {employer.industry} · {employer.mode} · {employer.workType}
                <span className="mt-0.5 block text-mute/70">
                  {employer.location}
                </span>
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 font-mono text-xs leading-relaxed text-mute">
          <span aria-hidden="true">$</span> freelance — 2009 – present ·
          independent brand, web, and product work runs alongside everything
          above · full record in [ 005 ]
        </p>
      </Reveal>
    </section>
  );
}
