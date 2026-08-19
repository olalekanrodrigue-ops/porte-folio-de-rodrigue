'use client'

import Link from 'next/link'
import { useRef, type MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/project'

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const tags = project.domains || project.category?.split(', ') || []

  function handleMouse(e: MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    cardRef.current.style.transform = `perspective(800px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateZ(6px)`
  }

  function handleLeave() {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="group relative block overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-900/8 hover:-translate-y-1"
      style={{ transition: 'transform 0.15s ease-out, box-shadow 0.4s, border-color 0.3s' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
          {project.section || project.status}
        </span>
        {project.demo && (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-blue-600 sm:text-xl">
        {project.title}
      </h3>
      <p className="mb-5 text-sm leading-relaxed text-neutral-600 line-clamp-3">{project.description}</p>

      {tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900 transition-colors group-hover:text-blue-600">
        Voir le projet
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>

      {/* Bottom glow on hover */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-500 group-hover:w-full" />
    </Link>
  )
}
