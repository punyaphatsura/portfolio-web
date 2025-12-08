import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Punyaphat Surakiatkamjorn Portfolio',
    short_name: 'Punyaphat',
    description: 'Web Developer Portfolio of Punyaphat Surakiatkamjorn',
    start_url: '/',
    display: 'standalone',
    background_color: '#080e21',
    theme_color: '#0B122A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Add more icon sizes if available
      // {
      //   src: '/icon-192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      // },
      // {
      //   src: '/icon-512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      // },
    ],
  };
} 