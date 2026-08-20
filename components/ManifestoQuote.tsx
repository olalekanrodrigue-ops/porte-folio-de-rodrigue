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

        gsap.set([label, rule], { opacity: 0, y: 18 })
        gsap.set(letters, { opacity: 0, y: 10 })
        gsap.set(cursor, { opacity: 0 })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            end: 'bottom 18%',
            toggleActions: 'play reverse play reverse',
          },
        })

        timeline
          .to(label, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
          .to(rule, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3')
          .to(cursor, { opacity: 1, duration: 0.15 }, '-=0.18')
          .to(letters, { opacity: 1, y: 0, duration: 0.035, ease: 'none', stagger: 0.028 }, '-=0.05')
          .to(cursor, { opacity: 0, duration: 0.15 })

        return () => timeline.kill()
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-[#4d202d] bg-[#2d0e19] py-24 text-[#f7eee7] sm:py-32" aria-labelledby="manifesto-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(172,126,54,0.12),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.025),transparent_42%,rgba(0,0,0,0.16))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-px -translate-x-1/2 bg-gradient-to-b from-[#c9a15a]/0 via-[#c9a15a]/35 to-[#c9a15a]/0" />

      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <div data-manifesto-label className="flex items-center justify-center gap-5 text-[0.65rem] font-medium uppercase tracking-[0.42em] text-[#d0ae6b] sm:gap-7 sm:text-xs">
          <span className="h-px w-10 bg-[#c9a15a]/70 sm:w-16" />
          <span id="manifesto-title">Manifeste</span>
          <span className="h-px w-10 bg-[#c9a15a]/70 sm:w-16" />
        </div>

        <blockquote className="mx-auto mt-12 max-w-4xl font-serif text-[clamp(1.8rem,4.6vw,4rem)] italic leading-[1.18] tracking-[-0.025em] text-[#fff8f1] sm:mt-14">
          <span aria-label={QUOTE}>
            {Array.from(QUOTE).map((character, index) => (
              <span key={`${character}-${index}`} data-manifesto-letter aria-hidden="true" className="inline-block min-w-[0.015em]">
                {character === ' ' ? '\u00A0' : character}
              </span>
            ))}
          </span>
          <span data-manifesto-cursor aria-hidden="true" className="ml-1 inline-block h-[0.85em] w-px translate-y-[0.08em] bg-[#d0ae6b] align-baseline" />
        </blockquote>

        <div data-manifesto-rule className="mx-auto mt-14 h-px w-24 bg-gradient-to-r from-transparent via-[#c9a15a] to-transparent sm:mt-16" />
      </div>
    </section>
  )
}
