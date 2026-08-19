'use client'

import { useEffect, useRef, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(
  () => import('./three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' })

      tl.fromTo(tagRef.current, { y: 30, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }, '-=0.5')

      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char')
        tl.fromTo(chars, { y: 60, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.03 }, '-=0.4')
      }

      tl.fromTo(titleRef.current, { y: 25, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }, '-=0.3')
      tl.fromTo(roleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
      tl.fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
      tl.fromTo(photoRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=1.5')
      tl.fromTo(sceneRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=1.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const firstName = 'Rodrigue Olalékan'
  const lastName = 'ASSOGBA'

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background 3D */}
      <div ref={sceneRef} className="pointer-events-none absolute inset-0 z-0 opacity-0 lg:right-[-5%] lg:top-[5%] lg:h-[90%] lg:w-[55%]">
        <Suspense fallback={null}>
          <HeroScene className="h-full w-full" />
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white lg:via-white/60 lg:to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 px-6 py-24 sm:py-32 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div ref={lineRef} className="mb-8 h-px w-16 origin-left bg-blue-600" />

          <p ref={tagRef} className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-blue-600 opacity-0">
            Finance × Data × Digital Product
          </p>

          <div ref={nameRef} className="mb-4 overflow-hidden">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
              {firstName.split('').map((char, i) => (
                <span key={i} className="char inline-block opacity-0">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>

          <div ref={titleRef} className="mb-6 overflow-hidden opacity-0">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-300 sm:text-4xl lg:text-6xl">
              {lastName}
            </h2>
          </div>

          <p ref={roleRef} className="mb-4 max-w-lg text-base text-neutral-600 opacity-0 sm:text-lg">
            Développeur web full-stack · Analyste financier · Entrepreneur digital
          </p>

          <p ref={descRef} className="mb-10 max-w-xl text-base leading-relaxed text-neutral-500 opacity-0 sm:text-lg">
            Je conçois et développe des solutions numériques à l&apos;intersection
            de la finance, de la donnée et des technologies.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <Link href="/projects" className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20">
              Explorer mes projets
              <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-lg">
              Voir mon CV
              <ExternalLink size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Photo */}
        <div ref={photoRef} className="relative mx-auto opacity-0 lg:mx-0">
          <div className="relative h-56 w-56 overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl shadow-neutral-900/10 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <Image src="/images/profile/photo.jpg" alt="Rodrigue Olalékan ASSOGBA" fill className="object-cover" priority sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px" />
          </div>
          <div className="absolute -bottom-3 -right-3 h-24 w-24 rounded-2xl bg-blue-600/10" />
          <div className="absolute -left-3 -top-3 h-16 w-16 rounded-xl bg-blue-600/5" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">Scroll</span>
          <div className="h-10 w-px animate-pulse bg-neutral-300" />
        </div>
      </div>
    </section>
  )
}
