import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Fredoka } from 'next/font/google';
import './globals.css';
import { siteConfig } from '../shared/config';

const inter = Fredoka({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: [{ url: '/images/logo.svg', href: '/images/logo.svg' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
