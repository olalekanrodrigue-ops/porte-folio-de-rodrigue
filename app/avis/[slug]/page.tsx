import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, MessageSquareQuote } from 'lucide-react'
import Link from 'next/link'
import { getPublicReview } from '@/lib/reviews'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const review = await getPublicReview(slug)
  if (!review) return { title: 'Avis client introuvable', robots: { index: false, follow: false } }

  return {
    title: `Avis de ${review.name}`,
    description: `${review.name} partage son expérience du projet ${review.project} réalisé par Rodrigue ASSOGBA.`,
    alternates: { canonical: `/avis/${review.slug}` },
    openGraph: {
      type: 'article',
      title: `Avis de ${review.name} — ${review.project}`,
      description: review.content,
      images: review.client_photo_url ? [{ url: review.client_photo_url, alt: `Photo de ${review.name}` }] : undefined,
    },
  }
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const review = await getPublicReview(slug)
  if (!review) notFound()

  const publishedDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(review.created_at))

  return (
    <article className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-blue-600"><ArrowLeft size={15} /> Retour à l’accueil</Link>
        <header className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-7 sm:p-12">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600"><MessageSquareQuote size={16} /> Avis client</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">L’expérience de {review.name}</h1>
          <p className="mt-4 text-lg text-neutral-500">Projet concerné : <strong className="text-neutral-800">{review.project}</strong></p>
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-neutral-500"><span>{[review.company, review.role].filter(Boolean).join(' · ')}</span><span className="inline-flex items-center gap-1.5"><CalendarDays size={15} /> {publishedDate}</span></div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
          <div>{review.client_photo_url ? <img src={review.client_photo_url} alt={`Photo de ${review.name}`} className="aspect-square w-full rounded-3xl object-cover shadow-lg" /> : <div className="flex aspect-square items-center justify-center rounded-3xl bg-blue-50 text-6xl font-bold text-blue-600">{review.name.slice(0, 1).toUpperCase()}</div>}</div>
          <blockquote className="flex items-center rounded-3xl border border-neutral-200 bg-white p-8 text-xl leading-relaxed text-neutral-700 shadow-sm sm:p-10">“{review.content}”</blockquote>
        </section>

        {review.project_photo_urls?.length > 0 && <section className="mt-10"><h2 className="text-2xl font-bold tracking-tight">Réalisations du projet</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">{review.project_photo_urls.slice(0, 2).map((url, index) => <img key={url} src={url} alt={`Réalisation ${index + 1} du projet ${review.project}`} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm" />)}</div></section>}

      </div>
    </article>
  )
}
