import './globals.css';
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
      <body className={inter.className + ' max-w-screen overflow-x-hidden'}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
