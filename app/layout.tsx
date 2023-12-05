import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';

const inter = Fredoka({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Taskify Workspace'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
