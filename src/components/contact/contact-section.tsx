import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/common/reveal";
import { contact, identity } from "@/data/profile";
import { CopyEmail } from "./copy-email";
import { LocalTime } from "./local-time";

const connectLinks = [
  { label: "github", href: contact.github, kind: "external" as const },
  { label: "linkedin", href: contact.linkedin, kind: "external" as const },
  { label: "download cv", href: "/cv.pdf", kind: "download" as const },
];

// The kicker + display heading, rendered twice: once as the real ink layer
// (red parts transparent) and once as an aria-hidden ghost that paints ONLY
// the red glyphs — the status dot and the heading underscore — at z-70,
// above the master ink trail, so brand red never inverts (DESIGN.md §Motion).
// Both layers share this exact markup; only the color split differs. The
// ghost lives outside any Reveal: motion transforms would create a stacking
// context and trap it below the trail.
function ContactHeadline({ ghost = false }: { ghost?: boolean }) {
  const mute = ghost ? "text-transparent" : "text-mute";

  return (
    <div className={ghost ? "text-transparent" : undefined}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className={`font-mono text-xs tracking-wide ${mute}`}>006_contact</p>
        <p className={`flex items-baseline gap-2 font-mono text-xs ${mute}`}>
          <span
            aria-hidden="true"
            className={`size-1.5 translate-y-px self-center rounded-full ${
              ghost
                ? "bg-accent animate-blink motion-reduce:animate-none"
                : "bg-transparent"
            }`}
          />
          [ available for select work ]
        </p>
      </div>

      <h2 className="mt-10 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
        Fill in the blank
        <span
          className={
            ghost
              ? "text-accent animate-blink motion-reduce:animate-none"
              : "text-transparent"
          }
        >
          _
        </span>
      </h2>
    </div>
  );
}

// 006_contact — the site resolves into one action. Email is the display
// element (the most-cloned award-footer combo is a big CTA pill + local time
// in a dark rounded panel — deliberately not this). Spec chrome carries the
// rest: availability, coordinates, Manila clock, edition line.
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-between border-line border-t px-6 pt-24 pb-8 sm:px-12"
    >
      <div>
        {/* Ink layer (real, readable) — red glyphs transparent. */}
        <ContactHeadline />

        {/* Ghost layer — paints only the red glyphs above the ink trail. */}
        <div
          aria-hidden="true"
          data-red-ghost=""
          className="pointer-events-none absolute inset-x-0 top-24 z-70 px-6 sm:px-12"
        >
          <ContactHeadline ghost />
        </div>

        <Reveal className="mt-6">
          <p className="max-w-[44ch] text-base leading-relaxed text-mute sm:text-lg">
            Design roles, front-end builds, or the whole path from figma to
            production — say what you're making.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <p className="font-mono text-sm text-mute">
            <span aria-hidden="true">$</span> mail
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <a
              href={`mailto:${contact.email}`}
              className="break-all font-mono text-2xl tracking-tight transition-colors hover:text-mute focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-4xl lg:text-5xl"
            >
              {contact.email}
            </a>
            <CopyEmail email={contact.email} />
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <p className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
            connect<span className="text-ink">_</span>
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
            {connectLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.kind === "external"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : { download: true })}
                  className="group inline-flex items-center gap-1.5 rounded-sm py-2 font-mono text-sm text-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                  {link.kind === "external" ? (
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      size={13}
                      weight="thin"
                    />
                  ) : (
                    <ArrowDownIcon aria-hidden="true" size={13} weight="thin" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Footer spec strip. */}
      <footer className="mt-16 border-line border-t pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 font-mono text-[10px] tracking-wide text-mute">
          <p>© 2026 {identity.name}</p>
          <p className="hidden sm:block">
            designed &amp; built in-house — next.js · tailwind · motion
          </p>
          <p>
            MNL {identity.coordinates} · <LocalTime />
          </p>
          <a
            href="#top"
            className="-my-2 inline-flex items-center gap-1 py-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            back to 001
            <ArrowUpIcon aria-hidden="true" size={11} weight="thin" />
          </a>
        </div>
      </footer>
    </section>
  );
}
