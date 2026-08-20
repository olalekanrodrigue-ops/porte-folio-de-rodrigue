import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos de Rodrigue Olalékan ASSOGBA — Finance, Data & Technologie',
  description:
    'Découvrez le parcours de Rodrigue Olalékan ASSOGBA, son expertise en finance, statistiques, économétrie, développement full-stack et entrepreneuriat numérique au Bénin.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'À propos de Rodrigue Olalékan ASSOGBA',
    description:
      'Parcours, expertise et vision de Rodrigue Olalékan ASSOGBA à l’intersection de la finance, de la donnée et de la technologie.',
    url: 'https://assogba.tech/about',
    type: 'profile',
    images: [{ url: '/images/profile/photo.jpg', alt: 'Rodrigue Olalékan ASSOGBA' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
