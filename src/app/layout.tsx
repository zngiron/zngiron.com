import type { Metadata, Viewport } from 'next';
import type { ReactElement } from 'react';

import { Geist, Geist_Mono } from 'next/font/google';

import { dehydrate } from '@tanstack/react-query';

import { GridBackground } from '@/components/common/grid';
import { Providers } from '@/components/core/providers';
import { Scripts } from '@/components/core/scripts';
import { Header } from '@/components/layout/header';

import { getQueryClient } from '@/lib/client';
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
  maximumScale: 1,
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
  const client = getQueryClient();
  const dehydratedState = dehydrate(client);

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn(sans.variable, mono.variable, 'flex min-h-dvh flex-col', 'font-sans antialiased')}>
        <GridBackground />
        <Providers dehydratedState={dehydratedState}>
          <Header />
          <main className="grow">{children}</main>
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
