'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import type { Project } from '@/types/project'

gsap.registerPlugin(ScrollTrigger)

export function ProjectEvidence({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null)
  const images = [project.proofImage, ...(project.proofImages ?? [])].filter(
    (src): src is string => Boolean(src),
  )
  const altTexts = project.proofImage
    ? [project.proofAlt, ...(project.proofAlts ?? [])]
    : (project.proofAlts ?? [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.evidence-reveal')
      if (!items?.length) return

      gsap.fromTo(
        items,
        { y: 36, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.16,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!images.length) return null

  return (
    <section ref={sectionRef} className="mt-14 border-y border-neutral-200 py-10 sm:py-14">
      <div className="evidence-reveal mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
            <ShieldCheck size={14} strokeWidth={1.8} />
            Preuve du projet
          </div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Aperçu en situation réelle</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
            Captures de l’interface publique et des éléments réalisés pour ce projet.
          </p>
        </div>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-blue-600"
          >
            Ouvrir le site
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div className={`grid gap-5 ${images.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {images.map((src, index) => (
          <figure
            key={src}
            className="evidence-reveal overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-2xl shadow-neutral-900/10"
          >
            <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-white px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className="ml-3 min-w-0 truncate rounded-md bg-neutral-50 px-3 py-1 text-[11px] text-neutral-400">
                {project.demo || `preuve-${index + 1}`}
              </span>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <Image
                src={src}
                alt={altTexts[index] || `Preuve visuelle ${index + 1} du projet ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-top"
              />
            </div>
            <figcaption className="border-t border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-500">
              {altTexts[index] || `Capture de ${project.title}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
