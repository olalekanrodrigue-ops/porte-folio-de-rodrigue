'use client'

import Image from 'next/image'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DigitalProducts() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardRef.current || !coverRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia()

      motion.add('(prefers-reduced-motion: no-preference)', () => {
        const headerItems = headerRef.current?.querySelectorAll('[data-product-header-reveal]')
        const contentItems = contentRef.current?.querySelectorAll('[data-product-reveal]')
        const statItems = contentRef.current?.querySelectorAll('[data-product-stat]')
        if (!headerItems || !contentItems || !statItems) return

        gsap.set(headerItems, { y: 28, opacity: 0 })
        gsap.set(cardRef.current, { y: 56, opacity: 0, transformPerspective: 1200 })
        gsap.set(coverRef.current, { x: -42, opacity: 0, rotateY: -12, scale: 0.96, transformPerspective: 1000 })
        gsap.set(contentItems, { y: 26, opacity: 0 })
        gsap.set(statItems, { y: 18, opacity: 0, scale: 0.94, transformOrigin: 'center bottom' })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'bottom 18%',
            toggleActions: 'play reverse play reverse',
          },
        })

        timeline
          .to(headerItems, { y: 0, opacity: 1, duration: 0.62, ease: 'power3.out', stagger: 0.1 })
          .to(cardRef.current, { y: 0, opacity: 1, duration: 0.78, ease: 'power3.out' }, '-=0.38')
          .to(coverRef.current, { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 0.9, ease: 'back.out(1.25)' }, '-=0.42')
          .to(contentItems, { y: 0, opacity: 1, duration: 0.58, ease: 'power3.out', stagger: 0.08 }, '-=0.54')
          .to(statItems, { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: 'back.out(1.35)', stagger: 0.08 }, '-=0.28')

        const card = cardRef.current
        const cover = coverRef.current
        if (!card || !cover) return

        const onEnter = () => {
          gsap.to(card, { y: -8, duration: 0.38, ease: 'power3.out', overwrite: 'auto' })
          gsap.to(cover, { scale: 1.035, rotateY: 2, duration: 0.62, ease: 'power3.out', overwrite: 'auto' })
        }
        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
          gsap.to(cover, { scale: 1, rotateY: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
        }

        card.addEventListener('pointerenter', onEnter)
        card.addEventListener('pointerleave', onLeave)

        return () => {
          card.removeEventListener('pointerenter', onEnter)
          card.removeEventListener('pointerleave', onLeave)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-neutral-200 bg-gradient-to-b from-white to-blue-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="mb-10 max-w-2xl">
          <div data-product-header-reveal className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
            <BookOpen size={15} strokeWidth={1.8} /> Produits digitaux
          </div>
          <h2 data-product-header-reveal className="text-2xl font-bold tracking-tight sm:text-3xl">Des idées utiles, publiées en digital.</h2>
          <p data-product-header-reveal className="mt-3 text-neutral-500">Un premier produit éditorial développé avec Ola Digital Store pour accompagner les entrepreneurs africains.</p>
        </div>

        <article ref={cardRef} className="digital-product-card grid overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5 lg:grid-cols-[minmax(220px,300px)_1fr]">
          <div ref={coverRef} className="relative min-h-[21rem] overflow-hidden bg-[#f4f0e7] p-6 sm:min-h-[26rem] lg:min-h-full">
            <Image
              src="/images/digital-products/50-idees-business-cover.jpg"
              alt="Couverture du livre Cinquante idées de business rentables en Afrique"
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-contain p-5"
            />
          </div>
          <div ref={contentRef} className="flex flex-col justify-center p-7 sm:p-10">
            <p data-product-reveal className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Ola Digital Store · Ebook</p>
            <h3 data-product-reveal className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">50 Idées de Business Rentables en Afrique</h3>
            <p data-product-reveal className="mt-4 max-w-2xl leading-relaxed text-neutral-600">Un guide pratique pour entrepreneurs africains : idées détaillées, budgets réels, étapes de lancement, exemples terrain et méthodes pour trouver ses premiers clients.</p>
            <div data-product-reveal className="mt-7 grid grid-cols-3 gap-3 border-y border-neutral-200 py-5 text-center sm:max-w-md">
              <div data-product-stat><p className="text-2xl font-bold text-blue-600">50</p><p className="mt-1 text-xs text-neutral-500">idées</p></div>
              <div data-product-stat><p className="text-2xl font-bold text-blue-600">5</p><p className="mt-1 text-xs text-neutral-500">catégories</p></div>
              <div data-product-stat><p className="text-2xl font-bold text-blue-600">3</p><p className="mt-1 text-xs text-neutral-500">étapes/idée</p></div>
            </div>
            <a
              data-product-reveal
              href="https://ola-digital-stock.mychariow.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Découvrir sur Ola Digital Store
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
