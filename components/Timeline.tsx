'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EVENTS = [
  { year: '2017', title: 'Baccalauréat', desc: 'Formation scientifique — série D' },
  { year: '2019', title: 'Formation scientifique', desc: 'Mathématiques, Physique, Sciences' },
  { year: '2021', title: 'Licence — Statistiques & Économétrie', desc: 'Modélisation, analyse de données, probabilités' },
  { year: '2023', title: 'Banque • Finance • Assurance', desc: 'Professionnalisation en milieu bancaire' },
  { year: '2024', title: 'Microfinance & Finance digitale', desc: 'Conception de solutions financières innovantes' },
  { year: '2025', title: 'Développeur full-stack & Entrepreneur', desc: 'Développement de produits digitaux' },
  { year: '2026', title: 'Aujourd\'hui', desc: 'Finance × Data × Digital — Solutions complètes' },
]

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      // Animate the vertical line drawing
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1,
          },
        }
      )

      // Animate each event
      const events = timelineRef.current.querySelectorAll('.timeline-event')
      gsap.fromTo(
        events,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={timelineRef} className="relative">
      {/* Ligne verticale animée */}
      <div
        ref={lineRef}
        className="absolute left-[18px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-blue-600 via-blue-300 to-neutral-200 sm:left-5 md:left-1/2"
      />

      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {EVENTS.map(({ year, title, desc }, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={year}
              className={`timeline-event relative flex items-start gap-3 sm:gap-4 md:items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Point */}
              <div className="absolute left-[18px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue-600 bg-white shadow-sm sm:left-5 md:left-1/2 md:top-1" />

              {/* Contenu */}
              <div className={`ml-[36px] sm:ml-[44px] md:ml-0 md:w-1/2 ${isEven ? 'md:pr-10 md:text-right lg:pr-12' : 'md:pl-10 lg:pl-12'}`}>
                <span className="mb-1 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 sm:px-3">
                  {year}
                </span>
                <h3 className="text-sm font-semibold tracking-tight sm:text-base md:text-lg">{title}</h3>
                <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">{desc}</p>
              </div>

              {/* Espace reserve */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
