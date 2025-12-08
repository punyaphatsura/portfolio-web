import './globals.css';
import DynamicScrollbar from '@/components/DynamicScrollbar';
import NavBar from '@/components/NavBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import JsonLd from './components/JsonLd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Punyaphat Surakiatkamjorn | Web Developer Portfolio',
  description:
    'Explore the portfolio of Punyaphat Surakiatkamjorn, a skilled web developer specializing in modern web technologies. Discover my projects, experience, and expertise in creating responsive and dynamic web applications.',
  keywords: [
    'web developer',
    'portfolio',
    'frontend developer',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'web design',
    'full-stack engineer',
    'UI designer',
    'software engineer',
  ],
  authors: [{ name: 'Punyaphat Surakiatkamjorn' }],
  creator: 'Punyaphat Surakiatkamjorn',
  publisher: 'Punyaphat Surakiatkamjorn',
  metadataBase: new URL('https://punyaphat-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://punyaphat-portfolio.vercel.app',
    title: 'Punyaphat Surakiatkamjorn | Web Developer Portfolio',
    description:
      'Explore the portfolio of Punyaphat Surakiatkamjorn, a skilled web developer specializing in modern web technologies.',
    siteName: 'Punyaphat Surakiatkamjorn Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Punyaphat Surakiatkamjorn - Full-Stack Engineer & UI Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punyaphat Surakiatkamjorn | Web Developer Portfolio',
    description:
      'Explore the portfolio of Punyaphat Surakiatkamjorn, a skilled web developer specializing in modern web technologies.',
    creator: '@punyaphat',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' min-w-screen max-w-screen overflow-x-hidden'}>
        <JsonLd />
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
