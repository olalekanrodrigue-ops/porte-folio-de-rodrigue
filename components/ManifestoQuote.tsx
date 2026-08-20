'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTE = '« Le meilleur de la vie n’est pas l’espoir de devenir parfait, mais la volonté d’être toujours meilleur. »'

export function ManifestoQuote() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia()

      motion.add('(prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current
        if (!section) return

        const label = section.querySelector('[data-manifesto-label]')
        const rule = section.querySelector('[data-manifesto-rule]')
        const letters = section.querySelectorAll<HTMLElement>('[data-manifesto-letter]')
        const cursor = section.querySelector('[data-manifesto-cursor]')

        gsap.set([label, rule], { opacity: 0, y: 16 })
        gsap.set(letters, { opacity: 0, y: 9 })
        gsap.set(cursor, { opacity: 0 })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        })

        timeline
          .to(label, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
          .to(rule, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.24')
          .to(cursor, { opacity: 1, duration: 0.12 }, '-=0.15')
          .to(letters, { opacity: 1, y: 0, duration: 0.032, ease: 'none', stagger: 0.026 }, '-=0.04')
          .to(cursor, { opacity: 0, duration: 0.14 })

        return () => timeline.kill()
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-neutral-200 bg-[#f1f3f5] pb-14 pt-16 text-slate-900 sm:pb-20 sm:pt-24" aria-labelledby="manifesto-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.62),rgba(226,232,240,0.28))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-gradient-to-b from-blue-400/0 via-blue-400/35 to-blue-400/0" />

      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <div data-manifesto-label className="flex items-center justify-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-blue-600 sm:gap-6 sm:text-xs">
          <span className="h-px w-10 bg-blue-300 sm:w-16" />
          <span id="manifesto-title">Manifeste</span>
          <span className="h-px w-10 bg-blue-300 sm:w-16" />
        </div>

        <blockquote className="mx-auto mt-9 max-w-4xl font-serif text-[clamp(1.55rem,4.2vw,3.55rem)] italic leading-[1.2] tracking-[-0.02em] text-slate-800 sm:mt-12">
          <span aria-label={QUOTE}>
            {Array.from(QUOTE).map((character, index) => (
              <span key={`${character}-${index}`} data-manifesto-letter aria-hidden="true" className="inline-block min-w-[0.015em]">
                {character === ' ' ? '\u00A0' : character}
              </span>
            ))}
          </span>
          <span data-manifesto-cursor aria-hidden="true" className="ml-1 inline-block h-[0.86em] w-px translate-y-[0.08em] bg-blue-600 align-baseline" />
        </blockquote>

        <div data-manifesto-rule className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent sm:mt-12" />
      </div>
    </section>
  )
}
