@AGENTS.md

## Design System

Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Style with the `@theme` tokens (bg-bg, text-ink, border-line, bg-panel, text-accent),
never raw hex. Filenames are lowercase kebab-case; components export PascalCase.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.
