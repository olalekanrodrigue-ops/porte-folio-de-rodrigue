'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SkillGrid } from '@/components/SkillGrid'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsPage() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.skill-card-item')

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <div>
      <div className="mb-16 sm:mb-20">
        <TextReveal
          text="Compétences"
          as="h1"
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        />
        <ScrollReveal delay={0.2}>
          <p className="max-w-xl text-lg text-neutral-500">
            Un profil transversal alliant finance, données et technologie.
          </p>
        </ScrollReveal>
      </div>
      <div ref={gridRef}>
        <SkillGrid />
      </div>
    </div>
  )
}
