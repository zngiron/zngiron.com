import { ScrambleText } from "./scramble-text";

const roles = ["Front-End Engineer", "UX Designer"];

// The identity terminal readout, rendered in two stacked, pixel-identical
// layers so the red underscore can stay red while everything else inverts:
//
//  - ink (default): the real layer. Black text + scramble; the _ is transparent.
//    Lives BELOW the trail (z-10) so it inverts as the trail sweeps.
//  - ghost: an aria-hidden overlay. Everything transparent EXCEPT the red _.
//    Lives ABOVE the trail (z-30) so the red _ never inverts. Static text (no
//    scramble) so its width matches the settled ink layer and the _ lines up.
export function IdentityReadout({ ghost = false }: { ghost?: boolean }) {
  const mute = ghost ? "text-transparent" : "text-mute";

  return (
    <div className={ghost ? "text-transparent" : undefined}>
      <p className={`font-mono text-sm ${mute}`}>
        <span aria-hidden="true">$</span> whoami
      </p>

      <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-7xl">
        {ghost ? (
          <>
            Ziedrick Ruen
            <br />
            Giron
          </>
        ) : (
          <>
            <ScrambleText text="Ziedrick Ruen" />
            <br />
            <ScrambleText text="Giron" />
          </>
        )}
        <span
          className={
            ghost
              ? "text-accent animate-blink motion-reduce:animate-none"
              : "text-transparent"
          }
        >
          _
        </span>
      </h1>

      <div className={`mt-8 font-mono text-sm ${mute}`}>
        <p>
          <span aria-hidden="true">$</span> role
        </p>
        <div className="mt-1 space-y-0.5">
          {roles.map((role) => (
            <p key={role}>{ghost ? role : <ScrambleText text={role} />}</p>
          ))}
        </div>
      </div>

      {/* Availability — the 8-second recruiter skim: name, role, available,
          CTA. Text stays mute; only the dot is red, painted by the ghost
          layer (z-70) so it never inverts under the master trail. */}
      <p className={`mt-8 flex items-baseline gap-2 font-mono text-sm ${mute}`}>
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

      <div className="mt-8">
        {ghost ? (
          <span className="inline-flex items-baseline gap-1 rounded-full px-5 py-3 text-sm font-medium">
            let&apos;s work together
            <span>▋</span>
          </span>
        ) : (
          // Inverted chrome (bg-ink/text-bg), not the constant bg-panel: panel is
          // near-identical to the dark page bg, so the CTA vanished in dark mode.
          // ink/bg swap across themes — dark pill on light, light pill on dark.
          <a
            href="#contact"
            className="inline-flex items-baseline gap-1 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            let&apos;s work together
            <span
              aria-hidden="true"
              className="animate-blink motion-reduce:animate-none"
            >
              ▋
            </span>
          </a>
        )}
      </div>

      <div className={`mt-8 font-mono text-xs tracking-wide ${mute}`}>
        <p>
          <span aria-hidden="true">$</span> location
        </p>
        <p className="mt-1">14°35′N 120°59′E — MNL, PH</p>
      </div>
    </div>
  );
}
