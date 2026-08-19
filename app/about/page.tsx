'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Timeline } from '@/components/Timeline'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo — cinematic zoom in
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { scale: 1.15, opacity: 0, filter: 'blur(10px)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photoRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // Bio text — stagger
      if (bioRef.current) {
        const items = bioRef.current.querySelectorAll('.bio-line')
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // Quote
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* Header */}
      <div ref={heroRef} className="mb-16 sm:mb-20">
        <TextReveal
          text="À propos"
          as="h1"
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        />
        <ScrollReveal delay={0.3}>
          <p className="max-w-xl text-lg text-neutral-500">
            Qui suis-je, d&apos;où je viens, et où je vais.
          </p>
        </ScrollReveal>
      </div>

      {/* Présentation */}
      <section className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Photo */}
        <div ref={photoRef} className="flex justify-center opacity-0">
          <div className="relative h-64 w-64 overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl shadow-neutral-900/10 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <Image
              src="/images/profile/photo.jpg"
              alt="Rodrigue Olalékan ASSOGBA"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
            />
          </div>
        </div>

        {/* Bio */}
        <div ref={bioRef} className="space-y-5">
          <div className="bio-line">
            <h3 className="mb-4 text-2xl font-bold tracking-tight">
              Rodrigue Olalékan ASSOGBA
            </h3>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Profil hybride à l&apos;intersection de la <strong className="font-semibold text-neutral-900">finance</strong>,
              de la <strong className="font-semibold text-neutral-900">donnée</strong> et de la <strong className="font-semibold text-neutral-900">technologie</strong>.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Avec une formation en statistiques, économétrie et finance, j&apos;ai développé
              une vision transversale qui me permet de concevoir des solutions numériques
              à la fois robustes et adaptées aux réalités métier.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Mon objectif : construire des produits et des outils qui rapprochent
              la finance, la donnée et la technologie des besoins réels des entreprises
              et des utilisateurs.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Je conçois et développe moi-même des applications web complètes — frontend, backend,
              bases de données, API et déploiement — en m&apos;appuyant sur l&apos;IA comme outil
              d&apos;accélération, jamais comme substitut à la compréhension technique.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section ref={quoteRef} className="mb-20 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-10 opacity-0">
        <blockquote className="text-lg italic leading-relaxed text-neutral-700 sm:text-xl">
          &ldquo;Construire des solutions qui rapprochent la finance, la donnée et la
          technologie des besoins réels des entreprises et des utilisateurs.&rdquo;
        </blockquote>
      </section>

      {/* Timeline */}
      <section>
        <TextReveal
          text="Mon parcours"
          as="h2"
          className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl"
        />
        <ScrollReveal delay={0.2}>
          <p className="mb-10 text-neutral-500">De la formation académique à l&apos;entrepreneuriat numérique.</p>
        </ScrollReveal>
        <Timeline />
      </section>
    </div>
  )
}
