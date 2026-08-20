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
            Profil hybride à la croisée de la finance, de la donnée et de la technologie.
          </p>
        </ScrollReveal>
      </div>

      {/* Présentation */}
      <section className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Photo */}
        <div ref={photoRef} className="flex justify-center opacity-0">
          <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl shadow-neutral-900/10 sm:w-80 lg:w-96">
            <Image
              src="/images/profile/photo.jpg"
              alt="Rodrigue Olalékan ASSOGBA"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
            />
          </div>
        </div>

        {/* Bio */}
        <div ref={bioRef} className="space-y-5">
          <div className="bio-line">
            <h3 className="mb-4 text-2xl font-bold tracking-tight">
              Rodrigue Olalékan <span className="text-[#0b1f3a]">ASSOGBA</span>
            </h3>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Je suis Rodrigue Olalékan Assogba, un profil hybride à la croisée de la finance, de la donnée et de la technologie.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Mon parcours en gestion financière m&apos;a appris à analyser les problématiques économiques et financières avec rigueur. Ma formation en statistiques et en économétrie a renforcé ma capacité à exploiter les données, à comprendre les relations entre les variables et à appuyer mes analyses sur des éléments mesurables.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              Cette combinaison nourrit une conviction : les meilleurs outils ne sont pas seulement techniquement performants, ils doivent surtout répondre à des besoins métier concrets.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              C&apos;est cette vision qui guide mon travail. Avec mon équipe, je conçois et développe des applications web full-stack, du frontend au backend, en passant par les API, les bases de données et le déploiement. Je m&apos;intéresse autant à la technologie qu&apos;à la compréhension du problème que le produit doit résoudre.
            </p>
          </div>
          <div className="bio-line">
            <p className="leading-relaxed text-neutral-600">
              J&apos;utilise l&apos;intelligence artificielle comme un outil d&apos;accélération, tout en conservant la maîtrise de la logique, de l&apos;architecture et des choix techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Académique & professionnel */}
      <section ref={quoteRef} className="mb-20 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-10 opacity-0">
        <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">Académique &amp; professionnel</h2>
        <div className="space-y-5 text-neutral-600">
          <p className="leading-relaxed">
            Je suis actuellement en 3ᵉ année de Licence Professionnelle Banque, Finance et Assurance à la FASEG/UAC, avec une expérience au service comptabilité de PADME, agence de Pobè.
          </p>
          <p className="leading-relaxed">
            Mon parcours m&apos;a permis de développer des compétences en gestion financière, comptabilité OHADA, microfinance, assurance, fiscalité, analyse financière et gestion des risques, avec une approche progressivement orientée vers la donnée et les outils numériques.
          </p>
        </div>
      </section>

      {/* Entrepreneuriat & développement */}
      <section className="mb-20 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Entrepreneuriat</h2>
          <div className="space-y-5 text-neutral-600">
            <p className="leading-relaxed">
              Je porte African Future Group (AFG), une vision entrepreneuriale à long terme autour de la Finance, de la Tech, du Digital, de l&apos;Éducation, du Commerce et de l&apos;IA.
            </p>
            <p className="leading-relaxed">
              Je suis également à l&apos;origine de Ola Digital Store, orienté vers les produits numériques et l&apos;éducation, ainsi que de Ola Finance, un projet FinTech indépendant.
            </p>
            <p className="leading-relaxed">
              À travers @ola.le.financier, je partage également des contenus d&apos;éducation financière autour de sujets liés à l&apos;investissement, à l&apos;épargne et à la gestion financière.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold tracking-tight">Développement &amp; technologie</h2>
          <div className="space-y-5 text-neutral-600">
            <p className="leading-relaxed">
              Je travaille sur des projets full-stack avec notamment React, API, PostgreSQL et MySQL, ainsi que sur des architectures utilisant des services comme Vercel, Render et Cloudflare R2.
            </p>
            <p className="leading-relaxed">
              Je m&apos;intéresse également à l&apos;architecture logicielle, aux bases de données, aux systèmes de paiement, au déploiement, à l&apos;expérience utilisateur et à la conception de produits numériques.
            </p>
            <p className="leading-relaxed">
              Ma démarche : comprendre le besoin, mobiliser la donnée et la technologie, puis construire une solution réellement utile.
            </p>
          </div>
        </div>
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
