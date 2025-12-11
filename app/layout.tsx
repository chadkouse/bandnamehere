import type { Metadata, Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { appConfig } from '@/config/app';
import './globals.css';

const sourceSans = Source_Sans_3({
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.subTitle,
  icons: {
    icon: [
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'facebook-domain-verification': '4zy7ndto5dchkv0ioo8uwplr90vhgj',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className="relative min-h-screen">
        {children}
      </body>
    </html>
  );
}
