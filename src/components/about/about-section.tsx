import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { employers } from "@/data/experience";
import {
  about,
  designCapabilities,
  education,
  engineeringCapabilities,
  identity,
} from "@/data/profile";
import { projects } from "@/data/projects";

const stats = [
  { label: "years", value: String(identity.experienceYears) },
  { label: "employers", value: String(employers.length).padStart(2, "0") },
  { label: "projects", value: String(projects.length) },
  { label: "disciplines", value: "02" },
];

function CapabilityColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; tools: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
        {title}
        <span className="text-ink">_</span>
      </h3>
      <ul className="mt-4">
        {items.map((item, i) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-4 border-line border-t py-3"
          >
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-mute tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </span>
            <span className="text-right font-mono text-xs text-mute">
              {item.tools}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 003_about — statement first, proof compressed. The editorial lead carries
// the thesis in ink and the detail in mute (approved mockup pattern); the
// portrait extends the grayscale→color signature to the human behind it.
export function AboutSection() {
  return (
    <section
      id="about"
      className="border-line border-t px-6 py-24 sm:px-12 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          index="003"
          id="about"
          title="One person, one path."
          meta={<span>est. 2009 · {identity.coordinates}</span>}
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="max-w-[38ch] text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {about.lead} <span className="text-mute">{about.body}</span>
          </p>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-mute sm:text-lg">
            {about.focus}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-bg px-4 py-5">
                <dd className="font-mono text-2xl tracking-tight tabular-nums sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <figure className="group relative aspect-square overflow-hidden border border-line">
            <Image
              src="/work/portrait.png"
              alt={`${identity.name}, portrait`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 motion-reduce:transition-none"
            />
            <figcaption className="absolute top-3 left-3 bg-ink px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-bg">
              fig.02 / portrait
            </figcaption>
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-3 bg-ink px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-bg"
            >
              hover → color
            </span>
          </figure>
        </Reveal>
      </div>

      <Reveal className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
        <CapabilityColumn title="design" items={designCapabilities} />
        <CapabilityColumn title="engineering" items={engineeringCapabilities} />
      </Reveal>

      <Reveal className="mt-14 flex flex-col gap-1.5 font-mono text-xs leading-relaxed text-mute">
        <p>
          <span aria-hidden="true">$</span> education —{" "}
          {education
            .map((entry) => `${entry.school} (${entry.program})`)
            .join(" · ")}
        </p>
        <p>
          <span aria-hidden="true">$</span> languages —{" "}
          {identity.languages.join(" · ").toLowerCase()}
        </p>
      </Reveal>
    </section>
  );
}
