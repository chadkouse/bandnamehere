import type { Metadata } from 'next';
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
    icon: '/images/punch-icon.png',
  },
  other: {
    'facebook-domain-verification': '4zy7ndto5dchkv0ioo8uwplr90vhgj',
  },
};

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
