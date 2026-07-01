import { GridBackground } from "@/components/common/grid";
import { CursorTrail } from "@/components/hero/cursor-trail";
import { IdentityReadout } from "@/components/hero/identity-readout";
import { PortraitLineArt } from "@/components/hero/portrait-lineart";
import { cn } from "@/lib/utils";

// Hero (001_identity): breathing grid + organic inverted ink trail. The line-art
// portrait fills the left columns (1–5) near full height; the identity readout
// sits on the right (cols 7–12). Layering under the trail (z-20): grid, paper,
// ruler, and the ink identity (z-0/z-10) invert as it passes. The line-art
// portrait and the ghost identity (z-30) stay above — the portrait reads as a
// soft theme-aware gray (never inverted) and the red _ never inverts. Native
// cursor stays visible.

const GRID = "grid grid-cols-2 gap-6 px-6 sm:grid-cols-4 lg:grid-cols-12";
const CONTENT_COL = "col-span-2 sm:col-span-4 lg:col-span-6 lg:col-start-7";

const columnTicks = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  const visibility = i < 2 ? "" : i < 4 ? "hidden sm:block" : "hidden lg:block";
  return { n, visibility, key: `col-${n}` };
});

const sections = [
  { id: "work", index: "002", label: "Selected Work" },
  { id: "about", index: "003", label: "About" },
  { id: "experience", index: "004", label: "Experience" },
  { id: "projects", index: "005", label: "Project Index" },
  { id: "contact", index: "006", label: "Contact" },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        id="top"
        className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-bg pt-28 pb-8"
      >
        <GridBackground />
        <CursorTrail />

        {/* Portrait line art — left columns (1–5), extends almost to the top.
            z-10 → sits below the trail, so the ink trail inverts the crisp
            vector line art like the rest of the UI. */}
        <div className="pointer-events-none absolute inset-x-0 top-8 bottom-8 z-10 hidden lg:block">
          <div className={cn(GRID, "h-full")}>
            <div className="col-span-5 col-start-1 h-full">
              <PortraitLineArt />
            </div>
          </div>
        </div>

        {/* Top spec row: label + column ruler. z-10 → inverts under the trail. */}
        <div className="relative z-10">
          <p className="px-6 font-mono text-xs tracking-wide text-mute">
            001 Identity
          </p>
          <div className={cn(GRID, "mt-4")}>
            {columnTicks.map((tick) => (
              <span
                key={tick.key}
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] text-mute tabular-nums",
                  tick.visibility,
                )}
              >
                {tick.n}
              </span>
            ))}
          </div>
        </div>

        {/* Identity ink layer — right columns (7–12), bottom. z-10 inverts. */}
        <div className={cn(GRID, "relative z-10")}>
          <div className={CONTENT_COL}>
            <IdentityReadout />
          </div>
        </div>

        {/* Identity ghost layer — overlays the ink layer exactly and contributes
            only the red underscore, kept above the trail (z-30) so it never
            inverts. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30"
        >
          <div className={GRID}>
            <div className={CONTENT_COL}>
              <IdentityReadout ghost />
            </div>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen flex-col justify-center border-line border-t px-6 sm:px-12"
        >
          <p className="font-mono text-xs tracking-wide text-mute">
            {section.index}_{section.id}
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-mute sm:text-4xl">
            {section.label}
          </h2>
        </section>
      ))}
    </main>
  );
}
