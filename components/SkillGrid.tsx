'use client'

import { useRef, type MouseEvent } from 'react'
import { Landmark, BarChart3, Monitor, Briefcase, Cpu, FileText } from 'lucide-react'

const CATEGORIES = [
  {
    icon: Landmark,
    title: 'Finance',
    color: 'text-blue-600',
    bg: 'bg-blue-500/5',
    border: 'hover:border-blue-200',
    skills: ['Finance d\'entreprise', 'Banque', 'Microfinance', 'Comptabilité (OHADA)', 'Assurance', 'Finance quantitative'],
  },
  {
    icon: BarChart3,
    title: 'Data',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/5',
    border: 'hover:border-emerald-200',
    skills: ['Statistiques', 'Économétrie', 'Analyse de données', 'Excel avancé', 'Recherche appliquée', 'Conception d\'enquêtes'],
  },
  {
    icon: Monitor,
    title: 'Technologie',
    color: 'text-violet-600',
    bg: 'bg-violet-500/5',
    border: 'hover:border-violet-200',
    skills: ['React, Next.js, TypeScript', 'Node.js, APIs', 'PostgreSQL, Prisma', 'Vercel, Cloudflare', 'Git, GitHub', 'Architecture full-stack'],
  },
  {
    icon: Briefcase,
    title: 'Business',
    color: 'text-amber-600',
    bg: 'bg-amber-500/5',
    border: 'hover:border-amber-200',
    skills: ['Entrepreneuriat', 'Fintech', 'Product Management', 'Stratégie digitale', 'E-learning', 'Digital Products'],
  },
  {
    icon: Cpu,
    title: 'E-learning',
    color: 'text-rose-600',
    bg: 'bg-rose-500/5',
    border: 'hover:border-rose-200',
    skills: ['Quiz interactifs', 'Parcours pédagogiques', 'Contenus multimédias', 'UX / Accessibilité', 'Ingénierie pédagogique', 'Motion design'],
  },
  {
    icon: FileText,
    title: 'Business Engineering',
    color: 'text-indigo-600',
    bg: 'bg-indigo-500/5',
    border: 'hover:border-indigo-200',
    skills: ['Business Plans (Word)', 'Modèles financiers 5 ans', 'TRI / VAN / ROI', 'Contrats d\'investissement', 'Architecture SI', 'Pitch decks investisseurs'],
  },
]

function SkillCard({ icon: Icon, title, color, bg, border, skills }: typeof CATEGORIES[number]) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    cardRef.current.style.transform = `perspective(600px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) translateZ(4px)`
  }

  function handleLeave() {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`skill-card-item group relative overflow-hidden rounded-2xl border border-neutral-200 ${bg} ${border} p-6 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1`}
      style={{ transition: 'transform 0.15s ease-out, box-shadow 0.3s, border-color 0.3s' }}
    >
      <div className={`mb-4 inline-flex rounded-xl bg-white p-2.5 shadow-sm ${color}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3 className="mb-4 text-base font-semibold sm:text-lg">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill} className="flex items-center gap-2 text-sm text-neutral-600">
            <span className="h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
            {skill}
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}

export function SkillGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((cat) => (
        <SkillCard key={cat.title} {...cat} />
      ))}
    </div>
  )
}
