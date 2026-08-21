import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rodrigue ASSOGBA — Finance × Data × Digital',
    short_name: 'ASSOGBA.tech',
    description: 'Portfolio professionnel de Rodrigue Olalékan ASSOGBA.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07152f',
    theme_color: '#07152f',
    lang: 'fr-FR',
    icons: [
      { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
