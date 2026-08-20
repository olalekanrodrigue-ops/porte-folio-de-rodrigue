'use client'

import Image from 'next/image'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DigitalProducts() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const card = sectionRef.current?.querySelector('.digital-product-card')
      if (!card) return

      gsap.fromTo(
        card,
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-neutral-200 bg-gradient-to-b from-white to-blue-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
            <BookOpen size={15} strokeWidth={1.8} /> Produits digitaux
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Des idées utiles, publiées en digital.</h2>
          <p className="mt-3 text-neutral-500">Un premier produit éditorial développé avec Ola Digital Store pour accompagner les entrepreneurs africains.</p>
        </div>

        <article className="digital-product-card grid overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5 lg:grid-cols-[minmax(220px,300px)_1fr]">
          <div className="relative min-h-[21rem] overflow-hidden bg-[#f4f0e7] p-6 sm:min-h-[26rem] lg:min-h-full">
            <Image
              src="/images/digital-products/50-idees-business-cover.jpg"
              alt="Couverture du livre Cinquante idées de business rentables en Afrique"
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-contain p-5 transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Ola Digital Store · Ebook</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">50 Idées de Business Rentables en Afrique</h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600">Un guide pratique pour entrepreneurs africains : idées détaillées, budgets réels, étapes de lancement, exemples terrain et méthodes pour trouver ses premiers clients.</p>
            <div className="mt-7 grid grid-cols-3 gap-3 border-y border-neutral-200 py-5 text-center sm:max-w-md">
              <div><p className="text-2xl font-bold text-blue-600">50</p><p className="mt-1 text-xs text-neutral-500">idées</p></div>
              <div><p className="text-2xl font-bold text-blue-600">5</p><p className="mt-1 text-xs text-neutral-500">catégories</p></div>
              <div><p className="text-2xl font-bold text-blue-600">3</p><p className="mt-1 text-xs text-neutral-500">étapes/idée</p></div>
            </div>
            <a
              href="https://ola-digital-stock.mychariow.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
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
