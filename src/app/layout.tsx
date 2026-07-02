import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { InkTrail } from "@/components/common/ink-trail";
import { Header } from "@/components/header/header";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import "./globals.css";

const generalSans = localFont({
  src: [
    {
      path: "./fonts/general-sans-variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "./fonts/general-sans-variable-italic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteTitle =
  "Ziedrick Ruen Giron — Senior UX Designer + Front-End Engineer";
const siteDescription =
  "Senior UX designer and front-end engineer with 17 years across fintech, blockchain, gaming, e-commerce, and media — design systems to shipped code. Manila, Philippines.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zngiron.com"),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "zngiron.com",
    locale: "en_US",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Ziedrick Ruen Giron", url: "https://zngiron.com" }],
  creator: "Ziedrick Ruen Giron",
  keywords: [
    "UX designer",
    "front-end engineer",
    "design systems",
    "React",
    "Next.js",
    "Manila",
    "portfolio",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${generalSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          // Applies the persisted/system theme before first paint (no flash).
          // stored -> system -> light. See DESIGN.md §Color.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Next.js no-flash pattern
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Header />
        {/* Standalone theme switcher, upper-right corner. Click or press T. */}
        <ThemeToggle />
        {children}
        {/* Master ink trail: ONE global inverted goo blob for the whole page.
            Mounted last and at z-60 (> the header's z-50) so it sits above every
            layer — header, hero, and each section all react to the same pointer.
            Its mix-blend-difference blends against the full composited page, so
            inversion is uniform everywhere (this replaced the old split
            hero + pill-scoped trails). Red underscores are branding and opt out
            via pixel-identical ghosts above the trail (z-70): the hero identity
            ghost (page.tsx) and the logo-underscore ghost (header.tsx). Hidden
            during theme switches and while the menu is open via [data-ink-trail]
            rules in globals.css. */}
        <InkTrail
          filterId="trail-goo"
          className="pointer-events-none fixed inset-0 z-60"
        />
      </body>
    </html>
  );
}
