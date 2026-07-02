import { AboutSection } from "@/components/about/about-section";
import { GridBackground } from "@/components/common/grid";
import { ContactSection } from "@/components/contact/contact-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { IdentityReadout } from "@/components/hero/identity-readout";
import { PortraitLineArt } from "@/components/hero/portrait-lineart";
import { ProjectsSection } from "@/components/projects/projects-section";
import { WorkSection } from "@/components/work/work-section";
import { cn } from "@/lib/utils";

// Hero (001_identity): breathing grid + identity readout. The single master ink
// trail lives globally in layout.tsx (z-60, above everything) — this section just
// lays out the layers it passes over. The line-art portrait fills the left columns
// (1–5) near full height; the identity readout sits on the right (cols 7–12).
// Everything here (grid, ruler, portrait, ink identity at z-0/z-10) inverts under
// the master trail. The lone exception is the red _ ghost (z-70), lifted above the
// trail so the brand red never inverts. Native cursor stays visible.

const GRID = "grid grid-cols-2 gap-6 px-6 sm:grid-cols-4 lg:grid-cols-12";
const CONTENT_COL = "col-span-2 sm:col-span-4 lg:col-span-6 lg:col-start-7";

const columnTicks = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  const visibility = i < 2 ? "" : i < 4 ? "hidden sm:block" : "hidden lg:block";
  return { n, visibility, key: `col-${n}` };
});

// Person schema — machine-readable identity for search and link unfurls.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ziedrick Ruen Giron",
  alternateName: "Zuen Giron",
  jobTitle: "Senior UX Designer & Front-End Engineer",
  url: "https://zngiron.com",
  email: "mailto:zngiron@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manila",
    addressCountry: "PH",
  },
  sameAs: ["https://github.com/zngiron", "https://linkedin.com/in/zngiron"],
  knowsAbout: [
    "UX Design",
    "Design Systems",
    "Front-End Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Accessibility",
  ],
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section
        id="top"
        className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-bg pt-28 pb-8"
      >
        <GridBackground />

        {/* Portrait line art — left columns (1–5), extends almost to the top.
            z-10 → sits below the master trail, so it inverts the crisp vector
            line art like the rest of the UI. */}
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
            only the red underscore, kept above the master trail (z-70 > z-60) so
            the brand red never inverts. This is the one deliberate opt-out from
            the otherwise-global inversion. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-8 z-70"
        >
          <div className={GRID}>
            <div className={CONTENT_COL}>
              <IdentityReadout ghost />
            </div>
          </div>
        </div>
      </section>

      <WorkSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
