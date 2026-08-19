'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, Landmark, LineChart, Layers, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero } from '@/components/Hero'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CountUp } from '@/components/animations/CountUp'
import type { Project } from '@/types/project'
import { ProjectCard } from '@/components/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const AXES = [
  {
    icon: Landmark,
    title: 'Finance',
    items: ['Banque', 'Microfinance', 'Analyse financière'],
    color: 'from-blue-500/10 to-transparent',
    accent: 'text-blue-600',
  },
  {
    icon: LineChart,
    title: 'Data',
    items: ['Statistiques', 'Économétrie', 'Analyse de données'],
    color: 'from-emerald-500/10 to-transparent',
    accent: 'text-emerald-600',
  },
  {
    icon: Layers,
    title: 'Digital',
    items: ['Web', 'Mobile', 'Fintech', 'Produits numériques'],
    color: 'from-violet-500/10 to-transparent',
    accent: 'text-violet-600',
  },
]

const STATS = [
  { value: 14, suffix: '+', label: 'Projets réalisés' },
  { value: 3, suffix: '', label: 'Domaines d\'expertise' },
  { value: 2, suffix: '+', label: 'Années d\'expérience' },
  { value: 1, suffix: '', label: 'Startup lancée' },
]

export function HomeClient({ featured }: { featured: Project[] }) {
  const expertiseRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (expertiseRef.current) {
        const cards = expertiseRef.current.querySelectorAll('.expertise-card')
        gsap.fromTo(cards, { y: 80, opacity: 0, scale: 0.95 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: expertiseRef.current, start: 'top 80%', once: true },
        })
      }

      if (statsRef.current) {
        gsap.fromTo(statsRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        })
      }

      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll('.project-card-wrap')
        gsap.fromTo(cards, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: projectsRef.current, start: 'top 80%', once: true },
        })
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: 40, opacity: 0, scale: 0.98 }, {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', once: true },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <Hero />

      <section ref={expertiseRef} className="border-t border-neutral-200 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <TextReveal text="Mon expertise" as="h2" className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl" />
          <ScrollReveal delay={0.2}>
            <p className="mb-12 max-w-xl text-neutral-500">Finance · Data · Digital — trois domaines complémentaires au service de solutions concrètes.</p>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {AXES.map(({ icon: Icon, title, items, color, accent }) => (
              <div key={title} className={`expertise-card group relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br p-7 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1 ${color}`}>
                <div className={`mb-5 inline-flex rounded-xl bg-white p-3 shadow-sm ${accent}`}><Icon size={22} strokeWidth={1.5} /></div>
                <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                <ul className="space-y-2">{items.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-neutral-600"><span className="h-1 w-1 shrink-0 rounded-full bg-neutral-400" />{item}</li>))}</ul>
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl"><CountUp end={value} suffix={suffix} /></p>
                <p className="mt-2 text-sm text-neutral-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section ref={projectsRef} className="border-t border-neutral-200 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <TextReveal text="Projets phares" as="h2" className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl" />
                <p className="text-neutral-500">Sélection de projets représentatifs de mon parcours.</p>
              </div>
              <Link href="/projects" className="mb-8 hidden items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 sm:inline-flex">Tous les projets<ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featured.map((project) => (<div key={project.slug} className="project-card-wrap"><ProjectCard project={project} /></div>))}
            </div>
            <Link href="/projects" className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 sm:hidden">Voir tous les projets<ArrowRight size={14} /></Link>
          </div>
        </section>
      )}

      <section ref={ctaRef} className="border-t border-neutral-200 bg-neutral-900 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <TextReveal text="Vous avez un projet ?" as="h2" className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl" />
          <TextReveal text="Construisons quelque chose d'exceptionnel." as="p" delay={0.3} className="mb-10 text-lg text-neutral-400" />
          <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-neutral-900 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:scale-105">
            Me contacter
            <ArrowUpRight size={16} strokeWidth={1.75} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
