import './globals.css';
import DynamicScrollbar from '@/components/DynamicScrollbar';
import NavBar from '@/components/NavBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio - Punyaphat',
  description:
    'This is a portfolio website of Punyaphat. Feel free to explore my projects and experiences in web development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' min-w-screen max-w-screen overflow-x-hidden'}>
        <main>
          <NavBar />
          <DynamicScrollbar />
          <div className="flex w-screen">
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
