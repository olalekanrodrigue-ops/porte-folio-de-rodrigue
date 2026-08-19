'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'
import type { Project } from '@/types/project'

gsap.registerPlugin(ScrollTrigger)

export function ProjectCaseStudy({ project }: { project: Project }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const items = headerRef.current.querySelectorAll('.cs-item')
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2,
          }
        )
      }

      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.6,
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const tags = project.domains || project.category?.split(', ') || []

  return (
    <article>
      {/* Header */}
      <header ref={headerRef} className="mb-10">
        <p className="cs-item mb-3 text-sm font-medium text-blue-600 opacity-0">{project.section}</p>
        <h1 className="cs-item mb-4 text-2xl font-bold tracking-tight opacity-0 sm:text-3xl md:text-4xl lg:text-5xl">{project.title}</h1>
        <p className="cs-item mb-6 max-w-2xl text-base leading-relaxed text-neutral-600 opacity-0 sm:text-lg">{project.description}</p>

        <div className="cs-item mb-6 flex flex-wrap gap-2 opacity-0">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              {tag}
            </span>
          ))}
        </div>

        {project.demo && (
          <div className="cs-item opacity-0">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg"
            >
              <ExternalLink size={14} />
              Voir en ligne
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        )}
      </header>

      {/* Meta */}
      <dl ref={metaRef} className="mb-10 grid gap-4 border-y border-neutral-200 py-6 sm:grid-cols-3 sm:gap-6 opacity-0">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">Statut</dt>
          <dd className="mt-1 text-sm text-neutral-700">{project.status}</dd>
        </div>
        {project.stack.length > 0 && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">Stack</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5 text-sm text-neutral-700">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium">
                  {tech}
                </span>
              ))}
            </dd>
          </div>
        )}
        {project.targetMarket && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">Marché</dt>
            <dd className="mt-1 text-sm text-neutral-700">{project.targetMarket}</dd>
          </div>
        )}
      </dl>
    </article>
  )
}
