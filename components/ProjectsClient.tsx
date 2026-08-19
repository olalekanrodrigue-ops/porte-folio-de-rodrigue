'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from '@/components/animations/TextReveal'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project } from '@/types/project'

gsap.registerPlugin(ScrollTrigger)

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.project-card-wrap')

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
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
          text="Projets"
          as="h1"
          className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        />
        <ScrollReveal delay={0.2}>
          <p className="max-w-xl text-lg text-neutral-500">
            Études de cas détaillées de mes réalisations.
          </p>
        </ScrollReveal>
      </div>

      {projects.length > 0 ? (
        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug} className="project-card-wrap">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-500">Aucun projet pour le moment.</p>
      )}
    </div>
  )
}
