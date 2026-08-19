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
  keywords: ['finance', 'data', 'digital', 'fintech', 'microfinance', 'Bénin', 'portfolio', 'développeur', 'analyste'],
  authors: [{ name: 'Rodrigue Olalékan ASSOGBA' }],
  openGraph: {
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
  metadataBase: new URL('https://rodrigue-assogba.dev'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="overflow-x-hidden bg-white text-neutral-900 antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
