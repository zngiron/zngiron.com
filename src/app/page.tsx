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
      {/* Hero placeholder — real hero is a later spec. Gives the pill something to sit over. */}
      <section
        id="top"
        className="flex min-h-screen flex-col justify-end px-6 pb-16 sm:px-12"
      >
        <p className="font-mono text-xs tracking-wide text-mute">
          001_identity / senior ux designer + front-end engineer
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-7xl">
          Ziedrick Ruen Giron
          <span className="text-accent">_</span>
        </h1>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen flex-col justify-center border-t border-line px-6 sm:px-12"
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
