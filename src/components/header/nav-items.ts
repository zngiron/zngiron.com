export type NavItem = {
  id: string;
  index: string;
  label: string;
  href: string;
};

// Site IA (design doc §6). Numbering follows site order — Work leads at 002.
export const navItems: NavItem[] = [
  { id: "work", index: "002", label: "Work", href: "#work" },
  { id: "about", index: "003", label: "About", href: "#about" },
  { id: "experience", index: "004", label: "Experience", href: "#experience" },
  { id: "projects", index: "005", label: "Projects", href: "#projects" },
  { id: "contact", index: "006", label: "Contact", href: "#contact" },
];

// Stable module-level array for the IntersectionObserver hook dependency.
export const sectionIds: string[] = navItems.map((item) => item.id);

export type ConnectId = "github" | "linkedin" | "email" | "cv";

export type ConnectItem = {
  id: ConnectId;
  label: string;
  href: string;
  kind: "external" | "download";
};

// Handles/URLs from Obsidian `Portfolio/07 - Contact` (source of truth).
export const connectItems: ConnectItem[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/zngiron",
    kind: "external",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zngiron",
    kind: "external",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:zngiron@gmail.com",
    kind: "external",
  },
  { id: "cv", label: "Download CV", href: "/cv.pdf", kind: "download" },
];
