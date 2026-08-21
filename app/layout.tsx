import type { Metadata } from 'next'
import './globals.css'
import { ClientProviders } from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: {
    default: 'Rodrigue Olalékan ASSOGBA — Finance & Digital Product Builder',
    template: '%s — Rodrigue Olalékan ASSOGBA',
  },
  description:
    "Portfolio de Rodrigue Olalékan ASSOGBA — Finance, microfinance, data et produits numériques. Je conçois des solutions à l'intersection de la finance, de la donnée et des technologies.",
  keywords: ['Rodrigue ASSOGBA', 'finance', 'data', 'digital', 'fintech', 'microfinance', 'Bénin', 'portfolio', 'développeur', 'analyste'],
  applicationName: 'ASSOGBA.tech',
  category: 'technology',
  authors: [{ name: 'Rodrigue Olalékan ASSOGBA', url: 'https://assogba.tech' }],
  creator: 'Rodrigue Olalékan ASSOGBA',
  publisher: 'ASSOGBA.tech',
  robots: { index: true, follow: true },
  openGraph: {
    url: 'https://assogba.tech',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Rodrigue Olalékan ASSOGBA',
    title: 'Rodrigue Olalékan ASSOGBA — Finance & Digital Product Builder',
    description: 'Je conçois des solutions numériques à l\'intersection de la finance, de la donnée et des technologies.',
    images: [
      {
        url: '/images/profile/photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Rodrigue Olalékan ASSOGBA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rodrigue Olalékan ASSOGBA',
    description: 'Finance × Data × Digital',
    images: ['/images/profile/photo.jpg'],
  },
  metadataBase: new URL('https://assogba.tech'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Rodrigue Olalékan ASSOGBA',
      url: 'https://assogba.tech',
      email: 'rodrigue@assogba.tech',
      jobTitle: 'Développeur web full-stack, analyste financier et entrepreneur digital',
      sameAs: [
        'https://github.com/olalekanrodrigue-ops',
        'https://www.linkedin.com/in/olalékan-rodrigue-assogba-741945281',
        'https://www.facebook.com/wouraolao',
        'https://www.instagram.com/olaola.234',
        'https://www.tiktok.com/@ola.le.financier',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'ASSOGBA.tech',
      url: 'https://assogba.tech',
      inLanguage: 'fr-FR',
      description: 'Portfolio de Rodrigue ASSOGBA — Finance, Data et Digital.',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="overflow-x-hidden bg-white text-neutral-900 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
