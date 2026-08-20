import type { Metadata } from 'next'
import { MessageSquareQuote, ShieldCheck, Sparkles } from 'lucide-react'
import { ReviewForm } from '@/components/ReviewForm'

export const metadata: Metadata = {
  title: 'Partager votre avis',
  description: 'Partagez votre expérience d’un projet réalisé par Rodrigue ASSOGBA et ajoutez vos photos de réalisation.',
  alternates: { canonical: '/ola' },
}

export default function OlaReviewPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600"><MessageSquareQuote size={15} /> Espace clients</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Votre retour compte.</h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-500">Vous avez travaillé avec Rodrigue ? Partagez votre expérience, le projet concerné et les résultats obtenus. Votre témoignage pourra être présenté sur ASSOGBA.tech avec votre accord.</p>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5"><Sparkles className="text-blue-600" size={20} /><p className="mt-3 text-sm leading-relaxed text-neutral-700">Ajoutez une photo de vous et jusqu’à deux images des réalisations.</p></div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5"><ShieldCheck className="text-emerald-600" size={20} /><p className="mt-3 text-sm leading-relaxed text-neutral-700">L’affichage public se fait uniquement avec votre consentement explicite.</p></div>
        </div>

        <ReviewForm />
      </div>
    </div>
  )
}
