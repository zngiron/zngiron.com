import type { Metadata, Viewport } from 'next';
import type { ReactElement } from 'react';

import { Geist, Geist_Mono } from 'next/font/google';

import { ButtonBackToTop } from '@/components/common/button-back-to-top';
import { GridBackground } from '@/components/common/grid';
import { Providers } from '@/components/core/providers';
import { Scripts } from '@/components/core/scripts';
import { Header } from '@/components/layout/header';

import { env } from '@/lib/env';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

const sans = Geist({
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const mono = Geist_Mono({
  display: 'swap',
  variable: '--font-mono',
  weight: ['500', '700'],
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: 'Zuen Giron — Front-End Developer & UX Designer',
    template: '%s | Zuen Giron',
  },
  description:
    'Senior Front-End Developer and UX Designer with 15+ years of experience delivering user-centered, scalable digital products across fintech, blockchain, and e-commerce.',
  openGraph: {
    title: 'Zuen Giron — Front-End Developer & UX Designer',
    description:
      'Senior Front-End Developer and UX Designer with 15+ years of experience delivering user-centered, scalable digital products across fintech, blockchain, and e-commerce.',
    type: 'website',
    url: env.SITE_URL,
    siteName: 'Zuen Giron',
    images: [
      {
        url: '/static/zngiron-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Zuen Giron — Front-End Developer & UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zuen Giron — Front-End Developer & UX Designer',
    description:
      'Senior Front-End Developer and UX Designer with 15+ years of experience delivering user-centered, scalable digital products.',
    images: ['/static/zngiron-thumbnail.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/static/frontend-dev-icon.png',
  },
};

function RootLayout({ children }: LayoutProps<'/'>): ReactElement {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(sans.variable, mono.variable, 'flex min-h-dvh flex-col', 'font-sans antialiased')}>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:inline-flex focus:h-9 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <GridBackground />
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <ButtonBackToTop />
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
