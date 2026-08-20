'use client'

import { Component, useEffect, useRef, Suspense, type ErrorInfo, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(
  () => import('./three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
)

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('La scène 3D est désactivée dans cet environnement.', error, info)
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

function HeroVisualFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-[4%] top-[18%] hidden h-[18rem] w-[18rem] md:block md:h-[22rem] md:w-[22rem] lg:right-[8%] lg:top-[14%] lg:h-[24rem] lg:w-[24rem]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(96,165,250,0.42),rgba(37,99,235,0.12)_42%,transparent_72%)] blur-sm" />
      <div className="absolute inset-[12%] rounded-full border border-blue-400/25 bg-gradient-to-br from-blue-400/20 via-blue-600/10 to-transparent shadow-[0_0_100px_rgba(37,99,235,0.18)]" />
      <div className="absolute inset-[24%] rounded-full border-2 border-dashed border-blue-400/25 animate-[spin_18s_linear_infinite]" />
      <div className="absolute left-[18%] top-[24%] h-2 w-2 rounded-full bg-blue-400/70 shadow-[0_0_20px_rgba(96,165,250,0.9)]" />
      <div className="absolute bottom-[24%] right-[20%] h-3 w-3 rounded-full bg-cyan-300/60 shadow-[0_0_24px_rgba(103,232,249,0.85)]" />
    </div>
  )
}

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
  const photoFrameRef = useRef<HTMLDivElement>(null)
  const photoBurstRef = useRef<HTMLDivElement>(null)
  const photoSweepRef = useRef<HTMLDivElement>(null)

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
      tl.fromTo(
        photoRef.current,
        { x: 150, y: -28, scale: 0.45, opacity: 0, rotation: -8, filter: 'blur(14px)' },
        { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, filter: 'blur(0px)', duration: 1.05, ease: 'back.out(1.7)' },
        '-=1.5'
      )
      tl.fromTo(
        photoFrameRef.current,
        { scale: 0.82, boxShadow: '0 0 0 rgba(37, 99, 235, 0)' },
        { scale: 1.08, boxShadow: '0 0 75px rgba(37, 99, 235, 0.38)', duration: 0.45, ease: 'power4.out' },
        '-=0.85'
      )
      tl.to(
        photoFrameRef.current,
        { scale: 1, boxShadow: '0 0 26px rgba(37, 99, 235, 0.16)', duration: 0.65, ease: 'elastic.out(1, 0.55)' },
        '-=0.05'
      )
      tl.fromTo(
        photoBurstRef.current,
        { scale: 0.5, opacity: 0, rotation: -35 },
        { scale: 1.12, opacity: 0.75, rotation: 0, duration: 0.55, ease: 'power4.out' },
        '-=0.85'
      )
      tl.to(photoBurstRef.current, { scale: 1.3, opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.25')
      tl.fromTo(
        photoSweepRef.current,
        { xPercent: -140, opacity: 0 },
        { xPercent: 130, opacity: 0.75, duration: 0.8, ease: 'power2.inOut' },
        '-=0.55'
      )
      tl.to(photoSweepRef.current, { opacity: 0, duration: 0.2, ease: 'power1.out' }, '-=0.1')
      tl.fromTo(sceneRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=1.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const firstName = 'Rodrigue Olalékan'
  const lastName = 'ASSOGBA'

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      {/* Professional background image: deliberately subdued so the 3D remains dominant. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50 saturate-[0.55] brightness-[0.92] sm:opacity-55 lg:object-right lg:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 lg:from-white/95 lg:via-white/40 lg:to-transparent" />
      </div>

      {/* Background 3D — kept above the photo and overlay. */}
      <div ref={sceneRef} className="pointer-events-none absolute inset-0 z-[5] opacity-100 lg:left-auto lg:right-[-5%] lg:top-[5%] lg:bottom-auto lg:h-[90%] lg:w-[55%]">
        <HeroVisualFallback />
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <HeroScene className="h-full w-full" />
          </Suspense>
        </SceneErrorBoundary>
      </div>

      {/* Final text-protection layer, below the 3D scene but above the photo. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white/35 via-white/10 to-transparent lg:from-white/20 lg:via-transparent lg:to-transparent" />

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
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-700 sm:text-4xl lg:text-6xl">
              <span className="text-blue-600">{lastName}</span>
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
            <a href="/cv/index.html" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-lg">
              Voir mon CV
              <ExternalLink size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Photo */}
        <div ref={photoRef} className="relative mx-auto opacity-0 lg:mx-0">
          <div ref={photoFrameRef} className="relative aspect-[4/5] w-56 overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl shadow-neutral-900/10 will-change-transform sm:w-80 lg:w-[25rem]">
            <Image src="/images/profile/photo.jpg" alt="Rodrigue Olalékan ASSOGBA" fill className="object-contain" priority sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px" />
            <div ref={photoSweepRef} aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-0 mix-blend-overlay" />
          </div>
          <div ref={photoBurstRef} aria-hidden="true" className="pointer-events-none absolute -inset-5 rounded-[2rem] border-2 border-blue-400/40 opacity-0" />
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
