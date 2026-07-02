# Ink Residue Blots — Design

Date: 2026-07-02
Status: approved (spawn model "both", movement "buoyant rise")

## Goal

Extend the master `InkTrail` (`src/components/common/ink-trail.tsx`) so the
inverted ink blob leaves lava-lamp-style residue: droplets detach from the
stream, float upward with a gentle wobble, and dissolve. The trail should read
as real ink — the stroke sheds droplets in motion and dries into separating
blots at rest.

## Behavior

Two spawn paths feed one particle system:

1. **Shed while moving.** While the pointer moves, spawn one small droplet
   (44–68px, random) every 150–250ms. Spawn position is the **tail** of the
   blob chain (the laggiest spring's current x/y), so the goo filter visually
   pinches the droplet off the stream rather than popping it in.
2. **Break-off on idle retract.** When the idle timer fires and the main blot
   begins its 2.6s retract, spawn 2–4 larger droplets (56–88px) scattered
   within ~40px of the resting point.

Sizes are bounded from below by the goo filter's hardening limit: the 18px
Gaussian blur + alpha threshold (`19a − 9`, cutoff ≈ 0.47) cannot re-harden
disks under ~41px diameter — they never cross the threshold and render as
semi-transparent blur haze. All residue must spawn above that limit, and the
dissolve holds near-full scale for ~75% of life before collapsing so the
sub-threshold blur phase stays brief.

Once detached, every droplet:

- rises 80–160px over 4–6s (randomized per droplet, ease-out),
- wobbles side-to-side sinusoidally (±6–12px, via x keyframes),
- dissolves by **scaling to 0** near the end of its life. Never fade opacity —
  the goo filter's alpha threshold (`feColorMatrix … 19 -9`) makes opacity
  fades snap out; a scale-down melts smoothly through the threshold.

## Architecture

Everything lives inside the existing `InkTrail` component and its
goo-filtered, `mix-blend-difference` container:

- Droplets are extra absolutely-positioned `motion.span`s rendered as siblings
  of the existing `Blob`s, so they inherit the inversion blend, the goo melt,
  the z-60 stacking, and the theme-switch/menu-open CSS hiding for free.
- Particle state: a `useState` array of `{ id, x, y, size }`; ids from a
  counter ref. Each droplet self-removes from the array on animation complete.
- The tail position is read from the last blob's spring motion values
  (exposed via a ref), not the raw pointer, so droplets detach where the
  stream actually is.
- A spawn-throttle ref (timestamp of last shed) gates the moving-shed path.

No canvas, no second component. A canvas layer could scale to hundreds of
particles but cannot share the SVG goo filter, and the goo pinch-off is the
entire effect.

## Restraint guards

- Hard cap of 12 concurrent droplets; spawns beyond the cap are skipped.
- Reduced motion: unchanged — the component already returns `null`.
- `active === false` (menu open, theme switching): no new spawns; existing
  droplets finish out under the existing CSS hide.
- Randomness via `Math.random()` in the client component only.

## Testing

Manual, in the running app (the trail is pointer-driven and visual):

- Move the pointer: droplets shed from the tail, rise, wobble, dissolve.
- Stop moving: 2–4 larger droplets break off as the blot retracts.
- Open the menu / switch theme mid-flight: everything hides, no orphans.
- Confirm droplets invert content beneath them identically to the main blob
  (light + dark), and that no droplet lingers past ~6s.
- `prefers-reduced-motion`: no trail, no residue.
- Lint passes (`npm run lint`).
