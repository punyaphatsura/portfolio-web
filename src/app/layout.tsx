import './globals.css';
import NavBar from '@/components/NavBar';
import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import JsonLd from './components/JsonLd';

export const metadata: Metadata = {
  title: 'Punyaphat Surakiatkamjorn | Software Engineer Portfolio',
  description:
    'Explore the portfolio of Punyaphat Surakiatkamjorn, a software engineer specializing in the Next.js ecosystem. Discover my projects, experience, and expertise.',
  keywords: [
    'web developer',
    'portfolio',
    'frontend developer',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'software engineer',
  ],
  authors: [{ name: 'Punyaphat Surakiatkamjorn' }],
  creator: 'Punyaphat Surakiatkamjorn',
  publisher: 'Punyaphat Surakiatkamjorn',
  metadataBase: new URL('https://punyaphat-portfolio.vercel.app'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://punyaphat-portfolio.vercel.app',
    title: 'Punyaphat Surakiatkamjorn | Software Engineer Portfolio',
    description:
      'Software engineer building products in the Next.js ecosystem. Currently at Top Gun, Bangkok.',
    siteName: 'Punyaphat Surakiatkamjorn Portfolio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable}`}
        style={{ fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
        <JsonLd />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
