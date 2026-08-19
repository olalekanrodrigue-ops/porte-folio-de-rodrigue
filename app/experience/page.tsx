'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const FORMATION = [
  {
    period: '2021 — 2024',
    title: 'Statistiques & Économétrie',
    org: 'Formation universitaire',
    desc: 'Modélisation statistique, analyse de données, probabilités, économétrie appliquée.',
  },
  {
    period: '2023 — 2026',
    title: 'Licence Professionnelle — Banque, Finance & Assurance',
    org: 'FASEG — Université d\'Abomey-Calavi (UAC), Bénin',
    desc: 'Banque, finance, assurance, comptabilité, microfinance, analyse financière, statistiques, économétrie, gestion des risques.',
  },
  {
    period: '2024 — 2025',
    title: 'Microfinance & Finance digitale',
    org: 'Environnement microfinance',
    desc: 'Conception de solutions financières innovantes, KYC, paiements mobiles.',
  },
]

const EXPERIENCE = [
  {
    period: '2025 — 2026',
    title: 'Stagiaire — Service Comptabilité',
    org: 'PADME (Agence de Pobè, Bénin)',
    desc: 'Participation aux activités comptables, traitement de données financières, classement et analyse de documents comptables.',
  },
  {
    period: '2024 — Présent',
    title: 'Développeur web full-stack',
    org: 'Projets personnels & clients',
    desc: 'Conception d\'applications web complètes avec TypeScript, React, Next.js, Node.js, PostgreSQL. Déploiement Vercel, Render, Railway.',
  },
  {
    period: '2025 — Présent',
    title: 'Fondateur — African Future Group',
    org: 'Entrepreneuriat numérique',
    desc: 'Écosystème entrepreneurial numérique. Finance digitale, éducation financière, services web, solutions pour utilisateurs africains.',
  },
]

export default function ExperiencePage() {
  const formationRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Formation items
      if (formationRef.current) {
        const items = formationRef.current.querySelectorAll('.exp-item')
        gsap.fromTo(
          items,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: formationRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Experience items
      if (experienceRef.current) {
        const items = experienceRef.current.querySelectorAll('.exp-item')
        gsap.fromTo(
          items,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: experienceRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Vision
      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visionRef.current,
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
      <div className="mb-16 sm:mb-20">
        <TextReveal
          text="Formation & Expérience"
          as="h1"
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        />
        <ScrollReveal delay={0.2}>
          <p className="max-w-xl text-lg text-neutral-500">
            Mon parcours académique et professionnel.
          </p>
        </ScrollReveal>
      </div>

      {/* Formation */}
      <section ref={formationRef} className="mb-16">
        <h3 className="mb-8 text-lg font-semibold text-neutral-900">Formation</h3>
        <div className="space-y-0">
          {FORMATION.map(({ period, title, org, desc }, i) => (
            <div key={i} className="exp-item relative border-l-2 border-blue-200 pl-6 pb-8 last:pb-0 opacity-0">
              <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full border-2 border-blue-600 bg-white" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">{period}</span>
              <h4 className="mt-1 text-base font-semibold sm:text-lg">{title}</h4>
              <p className="text-sm text-neutral-500">{org}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expériences */}
      <section ref={experienceRef} className="mb-16">
        <h3 className="mb-8 text-lg font-semibold text-neutral-900">Expériences</h3>
        <div className="space-y-0">
          {EXPERIENCE.map(({ period, title, org, desc }, i) => (
            <div key={i} className="exp-item relative border-l-2 border-emerald-200 pl-6 pb-8 last:pb-0 opacity-0">
              <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full border-2 border-emerald-600 bg-white" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">{period}</span>
              <h4 className="mt-1 text-base font-semibold sm:text-lg">{title}</h4>
              <p className="text-sm text-neutral-500">{org}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section ref={visionRef} className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 sm:p-10 opacity-0">
        <h3 className="mb-4 text-lg font-semibold">Vision</h3>
        <p className="leading-relaxed text-neutral-600 italic">
          &ldquo;Construire des solutions qui rapprochent la finance, la donnée et la
          technologie des besoins réels des entreprises et des utilisateurs.&rdquo;
        </p>
      </section>
    </div>
  )
}
