import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/header/header";
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

export const metadata: Metadata = {
  title: "Ziedrick Ruen Giron",
  description: "Senior UX designer + front-end engineer. 17 years, Manila.",
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
      className={`${generalSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
