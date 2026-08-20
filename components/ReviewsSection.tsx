'use client'

import Link from 'next/link'
import { ArrowUpRight, MessageSquareQuote } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Review } from '@/types/review'

gsap.registerPlugin(ScrollTrigger)

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current
        if (!section) return

        const header = section.querySelector('[data-review-header]')
        const cards = gsap.utils.toArray<HTMLElement>('.review-card', section)
        const emptyState = section.querySelector('[data-review-empty]')

        gsap.set(header, { y: 32, opacity: 0 })
        gsap.set(cards, { y: 50, opacity: 0, transformPerspective: 1100 })
        gsap.set(emptyState, { y: 32, opacity: 0, scale: 0.98 })

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            end: 'bottom 18%',
            toggleActions: 'play reverse play reverse',
          },
        })

        reveal.to(header, { y: 0, opacity: 1, duration: 0.62, ease: 'power3.out' })

        if (cards.length > 0) {
          reveal.to(cards, { y: 0, opacity: 1, duration: 0.76, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
        } else {
          reveal.to(emptyState, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.15)' }, '-=0.25')
        }

        const cleanups = cards.map((card) => {
          const xTo = gsap.quickTo(card, 'x', { duration: 0.34, ease: 'power3.out' })
          const yTo = gsap.quickTo(card, 'y', { duration: 0.34, ease: 'power3.out' })
          const rotateXTo = gsap.quickTo(card, 'rotateX', { duration: 0.34, ease: 'power3.out' })
          const rotateYTo = gsap.quickTo(card, 'rotateY', { duration: 0.34, ease: 'power3.out' })

          const onPointerMove = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width - 0.5
            const y = (event.clientY - bounds.top) / bounds.height - 0.5
            xTo(x * 8)
            yTo(y * 8)
            rotateXTo(y * -4)
            rotateYTo(x * 4)
          }

          const onPointerLeave = () => {
            gsap.to(card, {
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 0.62,
              ease: 'elastic.out(1, 0.55)',
              overwrite: 'auto',
            })
          }

          card.addEventListener('pointermove', onPointerMove)
          card.addEventListener('pointerleave', onPointerLeave)

          return () => {
            card.removeEventListener('pointermove', onPointerMove)
            card.removeEventListener('pointerleave', onPointerLeave)
          }
        })

        return () => cleanups.forEach((cleanup) => cleanup())
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reviews.length])

  return (
    <section ref={sectionRef} className="border-t border-neutral-200 bg-neutral-50/70 py-20 sm:py-24" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-6">
        <div data-review-header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600"><MessageSquareQuote size={15} /> Avis clients</p>
            <h2 id="reviews-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Des expériences qui parlent du travail.</h2>
            <p className="mt-3 text-neutral-500">Retours de clients et partenaires sur les projets réalisés.</p>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="review-card overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm will-change-transform">
                <div className="p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      {review.client_photo_url ? <img src={review.client_photo_url} alt={`Photo de ${review.name}`} className="h-14 w-14 shrink-0 rounded-2xl object-cover" /> : <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600">{review.name.slice(0, 1).toUpperCase()}</div>}
                      <div className="min-w-0"><h3 className="truncate font-semibold text-neutral-900">{review.name}</h3><p className="truncate text-sm text-neutral-500">{[review.company, review.role].filter(Boolean).join(' · ') || review.project}</p></div>
                    </div>
                    <MessageSquareQuote className="shrink-0 text-blue-200" size={25} />
                  </div>
                  <blockquote className="mt-6 text-[1.05rem] leading-relaxed text-neutral-700">“{review.content}”</blockquote>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-100 pt-4"><span className="text-xs font-medium uppercase tracking-wider text-neutral-400">{review.project}</span><Link href={`/avis/${review.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.97]">Lire l’avis <ArrowUpRight size={14} /></Link></div>
                </div>
                {review.project_photo_urls?.length > 0 && <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 bg-neutral-50 p-3">{review.project_photo_urls.slice(0, 2).map((url, index) => <img key={url} src={url} alt={`Réalisation du projet ${review.project}, photo ${index + 1}`} className="h-32 w-full rounded-xl object-cover" />)}</div>}
              </article>
            ))}
          </div>
        ) : (
          <div data-review-empty className="rounded-3xl border border-dashed border-neutral-300 bg-white p-8 text-center sm:p-12"><MessageSquareQuote className="mx-auto text-blue-300" size={34} /><h3 className="mt-4 text-xl font-semibold text-neutral-900">Les premiers avis apparaîtront ici.</h3></div>
        )}
      </div>
    </section>
  )
}
